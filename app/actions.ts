'use server';

import { redirect } from 'next/navigation';
import { crearCheckout } from '@/lib/shopify';

const FORMATO_VARIANTE = /^gid:\/\/shopify\/ProductVariant\/\d+$/;

// Acción del botón "Comprar": crea el carrito en Shopify y envía al cliente
// al checkout de Shopify. El pago (tarjeta, PSE, Nequi, etc.) ocurre allí,
// con las pasarelas configuradas en Configuración → Pagos.
export async function comprar(formData: FormData) {
  const varianteId = String(formData.get('varianteId') ?? '');
  if (!FORMATO_VARIANTE.test(varianteId)) {
    redirect('/?error=producto');
  }

  let checkoutUrl: string;
  try {
    checkoutUrl = await crearCheckout(varianteId);
  } catch (error) {
    console.error('Error al crear el checkout:', error);
    redirect('/?error=checkout');
  }
  redirect(checkoutUrl);
}
