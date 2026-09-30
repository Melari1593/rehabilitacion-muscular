// Catálogo de cursos que se cobran con Wompi.
// El precio se define AQUÍ, en el servidor: nunca se toma del navegador.
// Wompi cobra solo en pesos colombianos (COP).
// Precio base: 14,90 USD × 3.500 COP/USD = 52.150 COP.

export type Curso = {
  slug: string;
  titulo: string;
  resumen: string;
  precioCOP: number; // pesos enteros
};

export const CURSOS: Curso[] = [
  {
    slug: 'espalda-sana',
    titulo: 'Espalda sana para quien trabaja sentado',
    resumen: 'Mini curso de 5 días, 10 minutos al día. Incluye plan en PDF.',
    precioCOP: 52150,
  },
  {
    slug: 'rodillas-fuertes',
    titulo: 'Rodillas fuertes, prevención y cuidado',
    resumen: '6 lecciones en video y rutina de 4 semanas en PDF.',
    precioCOP: 52150,
  },
  {
    slug: 'automasaje',
    titulo: 'Automasaje y recuperación muscular',
    resumen: '4 videos y guía visual con 2 rutinas.',
    precioCOP: 52150,
  },
  {
    slug: 'bandas-elasticas',
    titulo: 'Fortalece en casa con bandas elásticas',
    resumen: '5 videos cortos y rutina semanal en PDF.',
    precioCOP: 52150,
  },
  {
    slug: 'frio-o-calor',
    titulo: 'Frío o calor: cómo manejar molestias musculares en casa',
    resumen: '1 video de 20 minutos e infografía descargable.',
    precioCOP: 52150,
  },
];

export function buscarCurso(slug: string): Curso | undefined {
  return CURSOS.find((c) => c.slug === slug);
}

export function formatearCOP(pesos: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(pesos);
}

// Referencia de pago: identifica el curso y es única por intento.
// Formato: BEC-<slug>-<marca de tiempo>-<aleatorio>
export function crearReferencia(slug: string): string {
  const aleatorio = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  return `BEC-${slug}-${Date.now().toString(36)}-${aleatorio}`;
}

export function cursoDeReferencia(referencia: string): Curso | undefined {
  const m = /^BEC-([a-z0-9-]+)-[a-z0-9]+-[a-z0-9]+$/.exec(referencia);
  return m ? buscarCurso(m[1]) : undefined;
}
