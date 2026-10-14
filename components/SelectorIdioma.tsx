'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IDIOMAS, NOMBRE_IDIOMA, type Idioma } from '@/lib/i18n';

const CORTO: Record<Idioma, string> = { es: 'ES', en: 'EN', fr: 'FR', ar: 'ع' };

// Cambia de idioma conservando la página actual y recuerda la elección (cookie "idioma", 1 año).
export function SelectorIdioma({ actual, etiqueta }: { actual: Idioma; etiqueta: string }) {
  const camino = usePathname() ?? `/${actual}`;
  const resto = camino.replace(/^\/[^/]+/, '');
  return (
    <nav aria-label={etiqueta}>
      <ul className="flex items-center gap-1 text-xs font-semibold">
        {IDIOMAS.map((idioma) => (
          <li key={idioma}>
            <Link
              href={`/${idioma}${resto}`}
              hrefLang={idioma}
              lang={idioma}
              title={NOMBRE_IDIOMA[idioma]}
              aria-current={idioma === actual ? 'true' : undefined}
              onClick={() => {
                document.cookie = `idioma=${idioma}; path=/; max-age=31536000; samesite=lax`;
              }}
              className={`block rounded px-2 py-1.5 transition-colors ${
                idioma === actual ? 'bg-tinta text-white' : 'text-suave hover:bg-arena hover:text-tinta'
              }`}
            >
              <span aria-hidden="true">{CORTO[idioma]}</span>
              <span className="sr-only">{NOMBRE_IDIOMA[idioma]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
