import { NextResponse } from 'next/server';
import { enviarAccesoCurso } from '@/lib/correo';
import { leerReferencia } from '@/lib/cursos';
import { eventoValido, type EventoWompi } from '@/lib/wompi';

// Webhook de Wompi (URL de eventos en el panel de Wompi → Desarrolladores):
//   https://<tu-dominio>/api/wompi/eventos
// Wompi reintenta el envío si no recibe un 200, así que se responde 200 a todo evento
// con firma válida, aunque no requiera acción.
export async function POST(request: Request) {
  let evento: EventoWompi;
  try {
    evento = (await request.json()) as EventoWompi;
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!eventoValido(evento, request.headers.get('x-event-checksum'))) {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
  }

  const transaccion = evento.data?.transaction;
  if (evento.event !== 'transaction.updated' || !transaccion || transaccion.status !== 'APPROVED') {
    return NextResponse.json({ ok: true });
  }

  const compra = leerReferencia(transaccion.reference);
  const curso = compra?.curso;
  if (!compra || !curso || transaccion.currency !== 'COP' || transaccion.amount_in_cents !== curso.precioCOP * 100) {
    console.warn(`[wompi] transacción ${transaccion.id} aprobada pero no coincide con ningún curso: ${transaccion.reference} ${transaccion.amount_in_cents}`);
    return NextResponse.json({ ok: true });
  }

  if (transaccion.customer_email) {
    await enviarAccesoCurso({ correo: transaccion.customer_email, curso, referencia: transaccion.reference, idioma: compra.idioma });
  } else {
    console.warn(`[wompi] ${transaccion.reference} aprobada sin correo del cliente`);
  }
  return NextResponse.json({ ok: true });
}
