import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';

// Integración con Wompi (Bancolombia) usando el Web Checkout:
// el cliente paga en la página de Wompi; este sitio nunca ve datos de tarjetas.
// Llaves en el panel de Wompi → Desarrolladores (modo prueba: pub_test_, test_integrity_, test_events_).

const LLAVE_PUBLICA = process.env.WOMPI_PUBLIC_KEY ?? '';
const SECRETO_INTEGRIDAD = process.env.WOMPI_INTEGRITY_SECRET ?? '';
const SECRETO_EVENTOS = process.env.WOMPI_EVENTS_SECRET ?? '';

export const WOMPI_CONFIGURADO = Boolean(LLAVE_PUBLICA && SECRETO_INTEGRIDAD);
export const WOMPI_MODO_PRUEBA = LLAVE_PUBLICA.startsWith('pub_test_');

const CHECKOUT_URL = 'https://checkout.wompi.co/p/';
const API_URL = WOMPI_MODO_PRUEBA ? 'https://sandbox.wompi.co/v1' : 'https://production.wompi.co/v1';

const sha256 = (texto: string) => createHash('sha256').update(texto, 'utf8').digest('hex');

// Firma de integridad: SHA256(referencia + montoEnCentavos + moneda + secretoDeIntegridad)
export function firmaIntegridad(referencia: string, montoCentavos: number, moneda = 'COP'): string {
  return sha256(`${referencia}${montoCentavos}${moneda}${SECRETO_INTEGRIDAD}`);
}

export function urlCheckout({
  referencia,
  montoCentavos,
  urlRegreso,
}: {
  referencia: string;
  montoCentavos: number;
  urlRegreso: string;
}): string {
  if (!WOMPI_CONFIGURADO) throw new Error('Faltan WOMPI_PUBLIC_KEY o WOMPI_INTEGRITY_SECRET');
  const params = new URLSearchParams({
    'public-key': LLAVE_PUBLICA,
    currency: 'COP',
    'amount-in-cents': String(montoCentavos),
    reference: referencia,
    'signature:integrity': firmaIntegridad(referencia, montoCentavos),
    'redirect-url': urlRegreso,
  });
  return `${CHECKOUT_URL}?${params.toString()}`;
}

export type EstadoTransaccion = 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR' | 'PENDING';

export type Transaccion = {
  id: string;
  status: EstadoTransaccion;
  reference: string;
  amount_in_cents: number;
  currency: string;
  customer_email?: string;
  payment_method_type?: string;
};

// Consulta el estado real de una transacción en Wompi (no se confía en los parámetros de la URL).
export async function obtenerTransaccion(id: string): Promise<Transaccion | null> {
  if (!/^[\w-]+$/.test(id)) return null;
  const res = await fetch(`${API_URL}/transactions/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: Transaccion };
  return json.data ?? null;
}

export type EventoWompi = {
  event: string;
  data: { transaction?: Transaccion } & Record<string, unknown>;
  environment?: string;
  signature?: { properties?: string[]; checksum?: string };
  timestamp?: number;
  sent_at?: string;
};

function valorEnRuta(objeto: unknown, ruta: string): unknown {
  return ruta.split('.').reduce<unknown>((acc, clave) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[clave] : undefined), objeto);
}

// Valida un evento de Wompi: SHA256(valores de signature.properties + timestamp + secretoDeEventos).
// Las rutas de signature.properties son relativas a `data` (ej. "transaction.id").
export function eventoValido(evento: EventoWompi, checksumCabecera?: string | null): boolean {
  if (!SECRETO_EVENTOS) return false;
  const propiedades = evento.signature?.properties;
  const checksum = (checksumCabecera || evento.signature?.checksum || '').toLowerCase();
  if (!Array.isArray(propiedades) || !checksum || typeof evento.timestamp !== 'number') return false;
  const concatenado = propiedades.map((p) => String(valorEnRuta(evento.data, p) ?? '')).join('') + evento.timestamp + SECRETO_EVENTOS;
  const esperado = Buffer.from(sha256(concatenado), 'hex');
  const recibido = Buffer.from(checksum, 'hex');
  return esperado.length === recibido.length && timingSafeEqual(esperado, recibido);
}
