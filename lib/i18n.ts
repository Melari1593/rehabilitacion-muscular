// Idiomas del sitio. Cada ruta empieza por el idioma: /es, /en, /fr, /ar.
// El español es el idioma por defecto y el original de los textos.

export const IDIOMAS = ['es', 'en', 'fr', 'ar'] as const;
export type Idioma = (typeof IDIOMAS)[number];
export const IDIOMA_POR_DEFECTO: Idioma = 'es';

export const esIdioma = (valor: string): valor is Idioma => (IDIOMAS as readonly string[]).includes(valor);

// Árabe se escribe de derecha a izquierda.
export const direccion = (idioma: Idioma): 'rtl' | 'ltr' => (idioma === 'ar' ? 'rtl' : 'ltr');

// Nombre de cada idioma escrito en su propio idioma (para el selector).
export const NOMBRE_IDIOMA: Record<Idioma, string> = { es: 'Español', en: 'English', fr: 'Français', ar: 'العربية' };

// Configuración regional para fechas, números y precios. En árabe se usan cifras latinas en los precios.
export const LOCALE: Record<Idioma, string> = { es: 'es-CO', en: 'en-US', fr: 'fr-FR', ar: 'ar-u-nu-latn' };

// Etiqueta Open Graph de cada idioma.
export const OG_LOCALE: Record<Idioma, string> = { es: 'es_CO', en: 'en_US', fr: 'fr_FR', ar: 'ar_AR' };

// Código de idioma de Shopify (Storefront API, directiva @inContext).
export const IDIOMA_SHOPIFY: Record<Idioma, string> = { es: 'ES', en: 'EN', fr: 'FR', ar: 'AR' };

// Elige el idioma a partir de la cabecera Accept-Language del navegador.
export function idiomaPreferido(acceptLanguage: string | null): Idioma {
  if (!acceptLanguage) return IDIOMA_POR_DEFECTO;
  const preferencias = acceptLanguage
    .split(',')
    .map((parte) => {
      const [codigo, ...params] = parte.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { codigo: codigo.toLowerCase().split('-')[0], q: q ? Number(q.split('=')[1]) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return preferencias.find((p) => esIdioma(p.codigo))?.codigo as Idioma | undefined ?? IDIOMA_POR_DEFECTO;
}

// Ruta con idioma: ruta('en', '/analisis-postura') → '/en/analisis-postura'
export const ruta = (idioma: Idioma, camino = '') => `/${idioma}${camino}`;
