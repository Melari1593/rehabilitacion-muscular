import Link from 'next/link';
import { SelectorIdioma } from './SelectorIdioma';
import type { Diccionario } from '@/lib/diccionarios';
import type { Idioma } from '@/lib/i18n';

export function Encabezado({ lang, t }: { lang: Idioma; t: Diccionario }) {
  const enlaces = [
    { href: `/${lang}#cursos`, texto: t.nav.cursos },
    { href: `/${lang}#productos`, texto: t.nav.productos },
    { href: `/${lang}/analisis-postura`, texto: t.nav.postura },
    { href: `/${lang}#revision`, texto: t.nav.revision },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-borde bg-fondo/95 backdrop-blur-md">
      <div className="mx-auto flex h-full items-center justify-between gap-4 px-[6%]">
        <Link href={`/${lang}`} className="shrink-0 text-xl text-tinta" dir="ltr">
          <span className="font-serif">{t.marca.nombre}</span> <span className="font-light">{t.marca.complemento}</span>
        </Link>
        <nav aria-label={t.nav.principal} className="hidden lg:block">
          <ul className="flex gap-8 text-sm">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link className="transition-colors hover:text-acento" href={e.href}>
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <SelectorIdioma actual={lang} etiqueta={t.nav.idioma} />
          <Link
            href={`/${lang}#cursos`}
            className="hidden rounded-md bg-tinta px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-acento sm:inline-block"
          >
            {t.nav.verCursos}
          </Link>
        </div>
      </div>
    </header>
  );
}
