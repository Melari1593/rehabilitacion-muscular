// Extrae músculos y huesos del atlas anatómico de Human Atlas (BodyParts3D 4.0, CC BY 4.0)
// y los empaqueta en un solo archivo liviano para /ejercicios-por-musculo.
//
// Uso:
//   git clone --depth 1 https://github.com/ashemag/human-atlas ../human-atlas
//   node scripts/musculos/extraer-modelo.mjs ../human-atlas
//
// Escribe public/musculos/modelo.json (índice) y public/musculos/modelo.bin.gz (geometría).
// Formato del .bin (sin comprimir), todas las partes concatenadas en el orden del índice:
//   1. posiciones  Uint16 × 3 por vértice, cuantizadas en la caja `limites` del índice
//   2. normales    Int8   × 3 por vértice (normalizadas a 127)
//   3. relleno hasta múltiplo de 2 bytes
//   4. índices     Uint16 por parte (relativos al primer vértice de la parte)
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { MeshoptSimplifier } from 'meshoptimizer';

const origen = process.argv[2];
if (!origen) {
  console.error('Uso: node scripts/musculos/extraer-modelo.mjs <ruta a human-atlas>');
  process.exit(1);
}
const carpetaModelos = path.join(origen, 'public', 'models');
const atlas = JSON.parse(fs.readFileSync(path.join(carpetaModelos, 'atlas.json'), 'utf8'));
const destino = new URL('../../public/musculos/', import.meta.url);
fs.mkdirSync(destino, { recursive: true });

// Músculos que no aportan a una página de ejercicios (cara, ojo, laringe, lengua, paladar,
// corazón, periné y músculos profundos del tórax que no se ven).
const EXCLUIR_MUSCULOS = new RegExp(
  [
    'papillary', 'rectus$', '(inferior|superior) oblique$', 'levator palpebrae', 'arytenoid', 'crico', 'thyro-arytenoid', 'vocalis',
    'aryepiglotticus', 'glossus', 'geniohyoid', 'mylohyoid', 'stylohyoid', 'digastric', 'veli palatini', 'uvular',
    'platysma', 'sphincter', 'perineal', 'coccygeus', 'pubococcygeus', 'puborectalis', 'iliococcygeus',
    'innermost intercostal', 'internal intercostal', 'transversus thoracis', 'diaphragm',
  ].join('|'),
  'i',
);
// Partes etiquetadas como hueso o tejido conectivo en el atlas que en realidad son músculos o fascias
// (hombro, pierna y cara lateral del muslo).
const MUSCULOS_FUERA_DE_SISTEMA =
  /levator scapulae|subscapularis|fibularis|tibialis anterior|tibialis posterior|iliotibial tract|tensor fasciae latae/i;
// Del esqueleto solo dejamos huesos y cartílagos: sin dientes ni encías.
const EXCLUIR_HUESOS = /tooth|teeth|incisor|canine|molar|gingiva/i;

function capaDe(parte) {
  if (MUSCULOS_FUERA_DE_SISTEMA.test(parte.name)) return 'musculos';
  if (parte.system === 'muscular') return EXCLUIR_MUSCULOS.test(parte.name) ? null : 'musculos';
  if (parte.system === 'skeletal') return EXCLUIR_HUESOS.test(parte.name) ? null : 'huesos';
  return null;
}

// Fracción de triángulos que se conserva por capa, y error geométrico máximo (relativo al tamaño de la parte).
const SIMPLIFICACION = { musculos: { fraccion: 0.32, error: 0.01 }, huesos: { fraccion: 0.22, error: 0.012 } };

await MeshoptSimplifier.ready;
const bloques = atlas.chunks.map((c) => fs.readFileSync(path.join(carpetaModelos, path.basename(c.url))));

const partes = [];
for (const p of atlas.parts) {
  const capa = capaDe(p);
  if (!capa) continue;
  const b = bloques[p.chunk];
  const pos = new Float32Array(b.buffer, b.byteOffset + p.positions, p.vertexCount * 3);
  const nor = new Int16Array(b.buffer, b.byteOffset + p.normals, p.vertexCount * 3);
  const idx = new Uint32Array(b.buffer, b.byteOffset + p.indices, p.indexCount);
  const { fraccion, error } = SIMPLIFICACION[capa];
  const objetivo = Math.max(60, Math.floor((p.indexCount * fraccion) / 3) * 3);
  const [simplificado] = MeshoptSimplifier.simplify(idx, pos, 3, Math.min(idx.length, objetivo), error);
  const [mapa, cuenta] = MeshoptSimplifier.compactMesh(simplificado);
  const posiciones = new Float32Array(cuenta * 3);
  const normales = new Int8Array(cuenta * 3);
  for (let viejo = 0; viejo < mapa.length; viejo++) {
    const nuevo = mapa[viejo];
    if (nuevo === 0xffffffff) continue;
    for (let a = 0; a < 3; a++) {
      posiciones[nuevo * 3 + a] = pos[viejo * 3 + a];
      normales[nuevo * 3 + a] = Math.round((nor[viejo * 3 + a] / 32767) * 127);
    }
  }
  if (cuenta > 0xffff) throw new Error(`${p.name}: demasiados vértices para índices de 16 bits (${cuenta})`);
  partes.push({ p, capa, posiciones, normales, indices: Uint16Array.from(simplificado) });
}

// Caja global para cuantizar posiciones
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
for (const { posiciones } of partes) {
  for (let i = 0; i < posiciones.length; i += 3) {
    for (let a = 0; a < 3; a++) {
      min[a] = Math.min(min[a], posiciones[i + a]);
      max[a] = Math.max(max[a], posiciones[i + a]);
    }
  }
}

const totalVertices = partes.reduce((n, x) => n + x.posiciones.length / 3, 0);
const totalIndices = partes.reduce((n, x) => n + x.indices.length, 0);
const bytesPos = totalVertices * 6;
const bytesNor = totalVertices * 3;
const inicioIndices = bytesPos + bytesNor + ((bytesPos + bytesNor) % 2);
const salida = Buffer.alloc(inicioIndices + totalIndices * 2);
const vPos = new Uint16Array(salida.buffer, salida.byteOffset, totalVertices * 3);
const vNor = new Int8Array(salida.buffer, salida.byteOffset + bytesPos, totalVertices * 3);
const vIdx = new Uint16Array(salida.buffer, salida.byteOffset + inicioIndices, totalIndices);

let v = 0;
let i = 0;
const indice = [];
for (const { p, capa, posiciones, normales, indices } of partes) {
  const n = posiciones.length / 3;
  for (let k = 0; k < posiciones.length; k++) {
    const a = k % 3;
    vPos[v * 3 + k] = Math.round(((posiciones[k] - min[a]) / (max[a] - min[a])) * 65535);
  }
  vNor.set(normales, v * 3);
  vIdx.set(indices, i);
  indice.push({ id: p.id, nombre: p.name, capa, v, nv: n, i, ni: indices.length });
  v += n;
  i += indices.length;
}

const comprimido = zlib.gzipSync(salida, { level: 9 });
fs.writeFileSync(new URL('modelo.bin.gz', destino), comprimido);
const manifiesto = {
  fuente: `${atlas.version} vía Human Atlas (github.com/ashemag/human-atlas)`,
  licencia: 'BodyParts3D © The Database Center for Life Science, CC BY 4.0',
  limites: [min, max],
  vertices: totalVertices,
  indices: totalIndices,
  inicioIndices,
  bytes: salida.length,
  archivo: '/musculos/modelo.bin.gz',
  partes: indice,
};
fs.writeFileSync(new URL('modelo.json', destino), JSON.stringify(manifiesto));
const cuenta = (capa) => indice.filter((x) => x.capa === capa).length;
console.log(
  JSON.stringify({
    musculos: cuenta('musculos'),
    huesos: cuenta('huesos'),
    triangulos: totalIndices / 3,
    bytes: salida.length,
    gzip: comprimido.length,
  }),
);
