import Link from 'next/link';

export type Idioma = 'es' | 'en';

const TEXTOS = {
  es: {
    enlaces: [
      { href: '/#cursos', texto: 'Cursos' },
      { href: '/#productos', texto: 'Productos' },
      { href: '/analisis-postura', texto: 'Analiza tu postura' },
      { href: '/control-prenatal', texto: 'Control prenatal' },
      { href: '/#revision', texto: 'Revisión médica' },
    ],
    boton: { href: '/#cursos', texto: 'Ver cursos' },
    nav: 'Principal',
  },
  en: {
    enlaces: [
      { href: '/#cursos', texto: 'Courses' },
      { href: '/#productos', texto: 'Products' },
      { href: '/analisis-postura', texto: 'Posture analysis' },
      { href: '/en/prenatal-course', texto: 'Prenatal course' },
      { href: '/#revision', texto: 'Medical review' },
    ],
    boton: { href: '/#cursos', texto: 'See courses' },
    nav: 'Main',
  },
} as const;

export function Encabezado({ idioma = 'es' }: { idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-borde bg-fondo/95 backdrop-blur-md">
      <nav className="mx-auto flex h-full items-center justify-between px-[6%]" aria-label={t.nav}>
        <Link href="/" className="text-xl text-tinta">
          <span className="font-serif">BienEstar</span> <span className="font-light">en Casa</span>
        </Link>
        <ul className="hidden gap-8 text-sm md:flex">
          {t.enlaces.map((e) => (
            <li key={e.href}>
              <Link className="transition-colors hover:text-acento" href={e.href}>
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={t.boton.href} className="rounded-md bg-tinta px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-acento">
          {t.boton.texto}
        </Link>
      </nav>
    </header>
  );
}
