'use client';

// Visor 3D de músculos y huesos para /ejercicios-por-musculo.
// Carga el modelo que genera scripts/musculos/extraer-modelo.mjs (BodyParts3D, CC BY 4.0),
// resalta el grupo muscular elegido y avisa qué grupo se tocó en el modelo.
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GRUPO_POR_ID, gruposDePieza, type GrupoId } from '@/lib/gruposMusculares';

type Parte = { id: string; nombre: string; capa: 'musculos' | 'huesos'; v: number; nv: number; i: number; ni: number };
type Manifiesto = {
  limites: [number[], number[]];
  vertices: number;
  indices: number;
  inicioIndices: number;
  bytes: number;
  archivo: string;
  partes: Parte[];
};
type Modelo = { manifiesto: Manifiesto; datos: ArrayBuffer };

const COLOR_HUESO = new THREE.Color('#e9e1d0');
const COLOR_MUSCULO = new THREE.Color('#c48d7f'); // músculos con ejercicios en los cursos
const COLOR_SIN_GRUPO = new THREE.Color('#dcc6bd'); // músculos sin ejercicios todavía
const COLOR_ACTIVO = new THREE.Color('#56704a'); // verde salvia de la marca

// Una sola descarga por visita, aunque el componente se monte varias veces.
let cargaModelo: Promise<Modelo> | null = null;
const avisosProgreso = new Set<(n: number) => void>();

async function descargarModelo(): Promise<Modelo> {
  const manifiesto: Manifiesto = await fetch('/musculos/modelo.json').then((r) => {
    if (!r.ok) throw new Error('No se pudo cargar el índice del modelo.');
    return r.json();
  });
  const respuesta = await fetch(manifiesto.archivo);
  if (!respuesta.ok || !respuesta.body) throw new Error('No se pudo descargar el modelo 3D.');
  const total = Number(respuesta.headers.get('content-length')) || 0;
  const lector = respuesta.body.getReader();
  const trozos: Uint8Array[] = [];
  let recibido = 0;
  for (;;) {
    const { done, value } = await lector.read();
    if (done) break;
    trozos.push(value);
    recibido += value.length;
    if (total) avisosProgreso.forEach((f) => f(Math.min(99, Math.round((recibido / total) * 100))));
  }
  const bytes = new Uint8Array(recibido);
  let o = 0;
  for (const t of trozos) {
    bytes.set(t, o);
    o += t.length;
  }
  // Algunos servidores entregan el .gz ya descomprimido; solo se descomprime si aún es gzip.
  let datos: ArrayBuffer = bytes.buffer;
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    if (typeof DecompressionStream === 'undefined') throw new Error('Este navegador no puede abrir el modelo 3D. Actualízalo para verlo.');
    datos = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }
  if (datos.byteLength !== manifiesto.bytes) throw new Error('El modelo 3D llegó incompleto. Recarga la página.');
  avisosProgreso.forEach((f) => f(100));
  return { manifiesto, datos };
}

function cargar(onProgreso: (n: number) => void) {
  avisosProgreso.add(onProgreso);
  cargaModelo ??= descargarModelo().catch((e) => {
    cargaModelo = null;
    throw e;
  });
  return cargaModelo.finally(() => avisosProgreso.delete(onProgreso));
}

/** Une todas las partes de una capa en una sola geometría (un solo dibujo por capa). */
function construirCapa({ manifiesto: m, datos }: Modelo, capa: Parte['capa']) {
  const partes = m.partes.filter((p) => p.capa === capa);
  const nv = partes.reduce((n, p) => n + p.nv, 0);
  const ni = partes.reduce((n, p) => n + p.ni, 0);
  const fuentePos = new Uint16Array(datos, 0, m.vertices * 3);
  const fuenteNor = new Int8Array(datos, m.vertices * 6, m.vertices * 3);
  const fuenteIdx = new Uint16Array(datos, m.inicioIndices, m.indices);
  const pos = new Uint16Array(nv * 3);
  const nor = new Int8Array(nv * 3);
  const idx = new Uint32Array(ni);
  const parteDeVertice = new Uint16Array(nv);
  let v = 0;
  let i = 0;
  partes.forEach((p, k) => {
    pos.set(fuentePos.subarray(p.v * 3, (p.v + p.nv) * 3), v * 3);
    nor.set(fuenteNor.subarray(p.v * 3, (p.v + p.nv) * 3), v * 3);
    for (let j = 0; j < p.ni; j++) idx[i + j] = fuenteIdx[p.i + j] + v;
    parteDeVertice.fill(k, v, v + p.nv);
    v += p.nv;
    i += p.ni;
  });
  const geometria = new THREE.BufferGeometry();
  // Posiciones cuantizadas: el atributo normalizado da valores 0..1 y la malla las lleva a metros.
  geometria.setAttribute('position', new THREE.BufferAttribute(pos, 3, true));
  geometria.setAttribute('normal', new THREE.BufferAttribute(nor, 3, true));
  geometria.setIndex(new THREE.BufferAttribute(idx, 1));
  geometria.computeBoundingSphere();
  geometria.computeBoundingBox();
  return { geometria, partes, parteDeVertice };
}

type Props = {
  grupo: GrupoId | null;
  /** Se llama al tocar el modelo: el grupo del músculo tocado (null si no tiene ejercicios) y si se tocó un músculo. */
  onTocar: (grupo: GrupoId | null, tocoMusculo: boolean) => void;
};

export default function Musculos3D({ grupo, onTocar }: Props) {
  const contenedor = useRef<HTMLDivElement>(null);
  const grupoActual = useRef(grupo);
  const avisarToque = useRef(onTocar);
  const aplicarGrupo = useRef<(g: GrupoId | null) => void>(() => {});
  const [progreso, setProgreso] = useState(0);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    grupoActual.current = grupo;
    avisarToque.current = onTocar;
  });

  useEffect(() => {
    const host = contenedor.current!;
    let cancelado = false;
    let cuadro = 0;
    let sucio = true;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setError('Tu navegador no puede mostrar el modelo 3D. Igual puedes elegir el grupo muscular en la lista.');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.display = 'block';
    renderer.domElement.setAttribute('role', 'img');
    renderer.domElement.setAttribute(
      'aria-label',
      'Modelo 3D del cuerpo humano con músculos y huesos. Arrastra para girarlo y toca un músculo para ver sus ejercicios.',
    );
    host.appendChild(renderer.domElement);

    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(32, 1, 0.01, 50);
    const controles = new OrbitControls(camara, renderer.domElement);
    controles.enableDamping = true;
    controles.dampingFactor = 0.09;
    controles.enablePan = false;
    controles.minDistance = 0.35;
    controles.maxDistance = 5;
    controles.addEventListener('change', () => (sucio = true));

    escena.add(new THREE.HemisphereLight(0xfffaf2, 0xb9b0a6, 1.6));
    const luz = new THREE.DirectionalLight(0xffffff, 1.9);
    luz.position.set(-1.5, 3, 2.5);
    escena.add(luz);
    const contraluz = new THREE.DirectionalLight(0xf3efe8, 1.2);
    contraluz.position.set(1.5, 2, -2.5);
    escena.add(contraluz);

    // Encuadre: toda la figura, o la caja del grupo elegido, de frente o de espaldas.
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animacion: { desde: THREE.Vector3; hasta: THREE.Vector3; mirarDesde: THREE.Vector3; mirarHasta: THREE.Vector3; t0: number } | null = null;
    const cajaCuerpo = new THREE.Box3(new THREE.Vector3(-0.33, 0, -0.13), new THREE.Vector3(0.33, 1.72, 0.14));
    const cajasGrupo = new Map<GrupoId, THREE.Box3>();

    function encuadrar(caja: THREE.Box3, vista: 'frente' | 'espalda', inmediato = false) {
      const centro = caja.getCenter(new THREE.Vector3());
      const radio = Math.max(caja.getSize(new THREE.Vector3()).length() / 2, 0.12);
      const estrecho = Math.min(camara.aspect, 1);
      // Más margen alrededor de un grupo que alrededor del cuerpo entero, para ver la zona en contexto.
      const holgura = caja === cajaCuerpo ? 1.05 : 1.5;
      const distancia = (radio / Math.sin(THREE.MathUtils.degToRad(camara.fov / 2))) * (holgura / Math.sqrt(estrecho));
      const direccion = new THREE.Vector3(vista === 'frente' ? 0.35 : -0.35, 0.12, vista === 'frente' ? 1 : -1).normalize();
      const hasta = centro.clone().addScaledVector(direccion, distancia);
      if (inmediato || reducirMovimiento) {
        animacion = null;
        camara.position.copy(hasta);
        controles.target.copy(centro);
        controles.update();
        sucio = true;
        return;
      }
      animacion = { desde: camara.position.clone(), hasta, mirarDesde: controles.target.clone(), mirarHasta: centro, t0: performance.now() };
    }

    const tamano = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camara.aspect = w / h;
      camara.updateProjectionMatrix();
      sucio = true;
    };
    const observador = new ResizeObserver(tamano);
    observador.observe(host);
    tamano();
    encuadrar(cajaCuerpo, 'frente', true);

    const desechar: { dispose: () => void }[] = [];

    cargar((n) => {
      if (!cancelado) setProgreso(n);
    })
      .then((modelo) => {
        if (cancelado) return;
        const [min, max] = modelo.manifiesto.limites;
        const ubicar = (malla: THREE.Mesh) => {
          malla.position.set(min[0], min[1], min[2]);
          malla.scale.set(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
          malla.updateMatrixWorld();
          escena.add(malla);
        };

        const huesos = construirCapa(modelo, 'huesos');
        const materialHuesos = new THREE.MeshStandardMaterial({ color: COLOR_HUESO, roughness: 0.75, metalness: 0 });
        const mallaHuesos = new THREE.Mesh(huesos.geometria, materialHuesos);
        ubicar(mallaHuesos);

        const musculos = construirCapa(modelo, 'musculos');
        const gruposDeParte = musculos.partes.map((p) => gruposDePieza(p.nombre));
        const colores = new Uint8Array(musculos.parteDeVertice.length * 3);
        musculos.geometria.setAttribute('color', new THREE.BufferAttribute(colores, 3, true));
        const materialMusculos = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0 });
        const mallaMusculos = new THREE.Mesh(musculos.geometria, materialMusculos);
        ubicar(mallaMusculos);
        desechar.push(huesos.geometria, materialHuesos, musculos.geometria, materialMusculos);

        // Caja de cada grupo en metros, para acercar la cámara al grupo elegido.
        const posicion = musculos.geometria.getAttribute('position') as THREE.BufferAttribute;
        const punto = new THREE.Vector3();
        for (let v = 0; v < musculos.parteDeVertice.length; v++) {
          const grupos = gruposDeParte[musculos.parteDeVertice[v]];
          if (!grupos.length) continue;
          punto.fromBufferAttribute(posicion, v).applyMatrix4(mallaMusculos.matrixWorld);
          for (const g of grupos) {
            if (!cajasGrupo.has(g)) cajasGrupo.set(g, new THREE.Box3());
            cajasGrupo.get(g)!.expandByPoint(punto);
          }
        }

        const rgb = (c: THREE.Color) => [Math.round(c.r * 255), Math.round(c.g * 255), Math.round(c.b * 255)];
        const [base, sinGrupo, activo] = [rgb(COLOR_MUSCULO), rgb(COLOR_SIN_GRUPO), rgb(COLOR_ACTIVO)];
        const pintar = (g: GrupoId | null) => {
          for (let v = 0; v < musculos.parteDeVertice.length; v++) {
            const grupos = gruposDeParte[musculos.parteDeVertice[v]];
            const c = g && grupos.includes(g) ? activo : grupos.length ? base : sinGrupo;
            colores[v * 3] = c[0];
            colores[v * 3 + 1] = c[1];
            colores[v * 3 + 2] = c[2];
          }
          musculos.geometria.getAttribute('color').needsUpdate = true;
          sucio = true;
        };
        const encuadrarGrupo = (g: GrupoId | null, inmediato = false) =>
          g ? encuadrar(cajasGrupo.get(g) ?? cajaCuerpo, GRUPO_POR_ID[g].vista, inmediato) : encuadrar(cajaCuerpo, 'frente', inmediato);
        aplicarGrupo.current = (g) => {
          pintar(g);
          encuadrarGrupo(g);
        };
        pintar(grupoActual.current);
        encuadrarGrupo(grupoActual.current, true);

        // Toque o clic (sin arrastrar) sobre un músculo: avisa su grupo.
        const rayo = new THREE.Raycaster();
        let inicio: { x: number; y: number; t: number } | null = null;
        const alPresionar = (e: PointerEvent) => {
          inicio = e.isPrimary ? { x: e.clientX, y: e.clientY, t: performance.now() } : null;
        };
        const alSoltar = (e: PointerEvent) => {
          if (!inicio || !e.isPrimary) return;
          const movido = Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y);
          const lento = performance.now() - inicio.t > 600;
          inicio = null;
          if (movido > 6 || lento) return;
          const r = renderer.domElement.getBoundingClientRect();
          rayo.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camara);
          const golpe = rayo.intersectObjects([mallaMusculos, mallaHuesos], false)[0];
          if (!golpe || golpe.object !== mallaMusculos || golpe.face == null) {
            avisarToque.current(null, false);
            return;
          }
          const grupos = gruposDeParte[musculos.parteDeVertice[golpe.face.a]];
          const actual = grupoActual.current;
          avisarToque.current(actual && grupos.includes(actual) ? actual : (grupos[0] ?? null), true);
        };
        renderer.domElement.addEventListener('pointerdown', alPresionar);
        renderer.domElement.addEventListener('pointerup', alSoltar);
        desechar.push({
          dispose: () => {
            renderer.domElement.removeEventListener('pointerdown', alPresionar);
            renderer.domElement.removeEventListener('pointerup', alSoltar);
          },
        });

        setListo(true);
        sucio = true;
      })
      .catch((e) => {
        if (!cancelado) setError(e instanceof Error ? e.message : 'No se pudo cargar el modelo 3D.');
      });

    const dibujar = (ahora: number) => {
      cuadro = requestAnimationFrame(dibujar);
      if (animacion) {
        const t = Math.min(1, (ahora - animacion.t0) / 750);
        const k = 1 - Math.pow(1 - t, 3);
        camara.position.lerpVectors(animacion.desde, animacion.hasta, k);
        controles.target.lerpVectors(animacion.mirarDesde, animacion.mirarHasta, k);
        if (t === 1) animacion = null;
        sucio = true;
      }
      if (controles.update()) sucio = true;
      if (!sucio) return;
      sucio = false;
      renderer.render(escena, camara);
    };
    cuadro = requestAnimationFrame(dibujar);

    return () => {
      cancelado = true;
      cancelAnimationFrame(cuadro);
      observador.disconnect();
      controles.dispose();
      desechar.forEach((d) => d.dispose());
      aplicarGrupo.current = () => {};
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    aplicarGrupo.current(grupo);
  }, [grupo]);

  return (
    <div ref={contenedor} className="relative h-full w-full select-none">
      {!listo && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-suave" role="status">
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-borde">
            <div className="h-full bg-acento transition-[width] duration-200" style={{ width: `${progreso}%` }} />
          </div>
          Cargando el modelo 3D{progreso ? ` · ${progreso}%` : '…'}
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-suave" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
