import { NextResponse, type NextRequest } from 'next/server';
import { esIdioma, idiomaPreferido } from '@/lib/i18n';

// Redirige las rutas sin idioma (/, /analisis-postura, /pago/resultado…) a la versión
// en el idioma del visitante: primero el que eligió antes (cookie), si no el de su navegador.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const primerSegmento = pathname.split('/')[1] ?? '';
  if (esIdioma(primerSegmento)) return;

  const elegido = request.cookies.get('idioma')?.value;
  const idioma = elegido && esIdioma(elegido) ? elegido : idiomaPreferido(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = `/${idioma}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // No se aplica a la API, a los archivos internos de Next ni a archivos con extensión (app de postura, imágenes…).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
