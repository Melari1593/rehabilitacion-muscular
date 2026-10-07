'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { buscarCurso, crearReferencia } from '@/lib/cursos';
import { crearCheckout } from '@/lib/shopify';
import { urlCheckout, WOMPI_CONFIGURADO } from '@/lib/wompi';

const FORMATO_VARIANTE = /^gid:\/\/shopify\/ProductVariant\/\d+$/;

// Acción del botón "Comprar": crea el carrito en Shopify y envía al cliente
// al checkout de Shopify. El pago (tarjeta, PSE, Nequi, etc.) ocurre allí,
// con las pasarelas configuradas en Configuración → Pagos.
export async function comprar(formData: FormData) {
  const varianteId = String(formData.get('varianteId') ?? '');
  if (!FORMATO_VARIANTE.test(varianteId)) {
    redirect('/?error=producto#productos');
  }

  let checkoutUrl: string;
  try {
    checkoutUrl = await crearCheckout(varianteId);
  } catch (error) {
    console.error('Error al crear el checkout:', error);
    redirect('/?error=checkout#productos');
  }
  redirect(checkoutUrl);
}

// Acción del botón de los cursos: crea una referencia única, firma el monto
// (calculado en el servidor desde lib/cursos.ts) y envía al cliente al
// Web Checkout de Wompi. Wompi regresa a /pago/resultado?id=<transacción>.
export async function pagarCurso(formData: FormData) {
  const curso = buscarCurso(String(formData.get('curso') ?? ''));
  if (!curso) redirect('/?error=producto#cursos');
  if (!WOMPI_CONFIGURADO) redirect('/?error=checkout#cursos');

  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const protocolo = h.get('x-forwarded-proto') ?? (host?.startsWith('localhost') ? 'http' : 'https');
  const base = process.env.SITE_URL ?? `${protocolo}://${host}`;

  const url = urlCheckout({
    referencia: crearReferencia(curso.slug),
    montoCentavos: curso.precioCOP * 100,
    urlRegreso: `${base.replace(/\/$/, '')}/pago/resultado`,
  });
  redirect(url);
}
