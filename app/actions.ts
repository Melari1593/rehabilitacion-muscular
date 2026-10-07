'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { buscarCurso, crearReferencia } from '@/lib/cursos';
import { esIdioma, IDIOMA_POR_DEFECTO, type Idioma } from '@/lib/i18n';
import { crearCheckout } from '@/lib/shopify';
import { urlCheckout, WOMPI_CONFIGURADO } from '@/lib/wompi';

const FORMATO_VARIANTE = /^gid:\/\/shopify\/ProductVariant\/\d+$/;

// Idioma de la página desde la que se compra (campo oculto del formulario).
const idiomaDe = (formData: FormData): Idioma => {
  const valor = String(formData.get('idioma') ?? '');
  return esIdioma(valor) ? valor : IDIOMA_POR_DEFECTO;
};

// Acción del botón "Comprar": crea el carrito en Shopify y envía al cliente
// al checkout de Shopify. El pago (tarjeta, PSE, Nequi, etc.) ocurre allí,
// con las pasarelas configuradas en Configuración → Pagos.
export async function comprar(formData: FormData) {
  const idioma = idiomaDe(formData);
  const varianteId = String(formData.get('varianteId') ?? '');
  if (!FORMATO_VARIANTE.test(varianteId)) {
    redirect(`/${idioma}?error=producto#productos`);
  }

  let checkoutUrl: string;
  try {
    checkoutUrl = await crearCheckout(varianteId, idioma);
  } catch (error) {
    console.error('Error al crear el checkout:', error);
    redirect(`/${idioma}?error=checkout#productos`);
  }
  redirect(checkoutUrl);
}

// Acción del botón de los cursos: crea una referencia única, firma el monto
// (calculado en el servidor desde lib/cursos.ts) y envía al cliente al
// Web Checkout de Wompi. Wompi regresa a /<idioma>/pago/resultado?id=<transacción>.
export async function pagarCurso(formData: FormData) {
  const idioma = idiomaDe(formData);
  const curso = buscarCurso(String(formData.get('curso') ?? ''));
  if (!curso) redirect(`/${idioma}?error=producto#cursos`);
  if (!WOMPI_CONFIGURADO) redirect(`/${idioma}?error=checkout#cursos`);

  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const protocolo = h.get('x-forwarded-proto') ?? (host?.startsWith('localhost') ? 'http' : 'https');
  const base = process.env.SITE_URL ?? `${protocolo}://${host}`;

  const url = urlCheckout({
    referencia: crearReferencia(curso.slug, idioma),
    montoCentavos: curso.precioCOP * 100,
    urlRegreso: `${base.replace(/\/$/, '')}/${idioma}/pago/resultado`,
  });
  redirect(url);
}
