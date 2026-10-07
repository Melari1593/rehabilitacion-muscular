// Catálogo de cursos que se cobran con Wompi.
// El precio se define AQUÍ, en el servidor: nunca se toma del navegador.
// Wompi cobra solo en pesos colombianos (COP).
// Precio base: 14,90 USD × 3.500 COP/USD = 52.150 COP.

import { esIdioma, IDIOMA_POR_DEFECTO, LOCALE, type Idioma } from './i18n';

// Los títulos y resúmenes de cada curso, por idioma, están en lib/diccionarios (sección "catalogo").
export type Curso = {
  slug: string;
  precioCOP: number; // pesos enteros
};

export const CURSOS: Curso[] = [
  { slug: 'espalda-sana', precioCOP: 52150 },
  { slug: 'rodillas-fuertes', precioCOP: 52150 },
  { slug: 'automasaje', precioCOP: 52150 },
  { slug: 'bandas-elasticas', precioCOP: 52150 },
  { slug: 'frio-o-calor', precioCOP: 52150 },
];

export function buscarCurso(slug: string): Curso | undefined {
  return CURSOS.find((c) => c.slug === slug);
}

export function formatearCOP(pesos: number, idioma: Idioma = IDIOMA_POR_DEFECTO): string {
  return new Intl.NumberFormat(LOCALE[idioma], { style: 'currency', currency: 'COP', currencyDisplay: 'code', maximumFractionDigits: 0 }).format(pesos);
}

// Referencia de pago: identifica el idioma de la compra y el curso, y es única por intento.
// Formato: BEC-<idioma>-<slug>-<marca de tiempo>-<aleatorio>
export function crearReferencia(slug: string, idioma: Idioma): string {
  const aleatorio = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  return `BEC-${idioma}-${slug}-${Date.now().toString(36)}-${aleatorio}`;
}

// Lee el curso y el idioma de una referencia (también acepta el formato anterior, sin idioma).
export function leerReferencia(referencia: string): { curso: Curso; idioma: Idioma } | undefined {
  const m = /^BEC-(?:([a-z]{2})-)?([a-z0-9-]+)-[a-z0-9]+-[a-z0-9]+$/.exec(referencia);
  if (!m) return undefined;
  const conIdioma = m[1] && esIdioma(m[1]) ? m[1] : undefined;
  // Si los dos primeros caracteres no son un idioma, forman parte del slug (formato anterior).
  const slug = conIdioma ? m[2] : m[1] ? `${m[1]}-${m[2]}` : m[2];
  const curso = buscarCurso(slug);
  return curso ? { curso, idioma: conIdioma ?? IDIOMA_POR_DEFECTO } : undefined;
}
