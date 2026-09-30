import type { Metadata } from 'next';
import Link from 'next/link';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { cursoDeReferencia, formatearCOP } from '@/lib/cursos';
import { obtenerTransaccion, WOMPI_MODO_PRUEBA } from '@/lib/wompi';

export const metadata: Metadata = {
  title: 'Resultado del pago · BienEstar en Casa',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

type Vista = { titulo: string; texto: string; tono: 'ok' | 'espera' | 'error' };

const VISTAS: Record<string, Vista> = {
  APPROVED: {
    titulo: '¡Pago aprobado!',
    texto: 'Gracias por tu compra. En unos minutos recibirás en tu correo el acceso al curso. Si no lo ves, revisa la carpeta de spam.',
    tono: 'ok',
  },
  PENDING: {
    titulo: 'Tu pago está en proceso',
    texto: 'Wompi aún está confirmando el pago. Cuando se apruebe te enviaremos el acceso por correo. Puedes recargar esta página en unos minutos.',
    tono: 'espera',
  },
  DECLINED: { titulo: 'El pago fue rechazado', texto: 'No se realizó ningún cobro. Puedes intentarlo de nuevo con otro medio de pago.', tono: 'error' },
  VOIDED: { titulo: 'El pago fue anulado', texto: 'La transacción se anuló y no se realizó ningún cobro.', tono: 'error' },
  ERROR: { titulo: 'Hubo un error con el pago', texto: 'No se realizó ningún cobro. Inténtalo de nuevo en unos minutos.', tono: 'error' },
};

const NO_ENCONTRADO: Vista = {
  titulo: 'No encontramos el pago',
  texto: 'No pudimos verificar esta transacción. Si hiciste un pago, escríbenos con la referencia que te envió Wompi por correo.',
  tono: 'error',
};

const COLOR: Record<Vista['tono'], string> = {
  ok: 'border-acento bg-acento/10',
  espera: 'border-borde bg-arena',
  error: 'border-[#b3261e]/40 bg-[#b3261e]/5',
};

// Wompi redirige aquí con ?id=<transacción>. El estado se consulta en la API de Wompi:
// nunca se confía en parámetros de la URL. La entrega del curso la hace el webhook (/api/wompi/eventos).
export default async function ResultadoPago({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const transaccion = id ? await obtenerTransaccion(id).catch(() => null) : null;
  const curso = transaccion ? cursoDeReferencia(transaccion.reference) : undefined;
  const coincide = Boolean(transaccion && curso && transaccion.currency === 'COP' && transaccion.amount_in_cents === curso.precioCOP * 100);
  const vista = transaccion && coincide ? (VISTAS[transaccion.status] ?? NO_ENCONTRADO) : NO_ENCONTRADO;

  return (
    <>
      <Encabezado />
      <main className="px-[6%] pb-24 pt-[120px]">
        <section aria-labelledby="titulo" className={`mx-auto max-w-2xl rounded-xl border-[1.5px] p-8 sm:p-10 ${COLOR[vista.tono]}`}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">
            Resultado del pago{WOMPI_MODO_PRUEBA ? ' · Modo de prueba' : ''}
          </p>
          <h1 id="titulo" className="mb-4 font-serif text-[clamp(30px,4vw,44px)] leading-[1.1]">{vista.titulo}</h1>
          <p className="text-base leading-relaxed text-suave">{vista.texto}</p>
          {transaccion && curso && coincide && (
            <dl className="mt-8 grid gap-3 border-t border-borde pt-6 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
              <dt className="font-semibold">Curso</dt>
              <dd>{curso.titulo}</dd>
              <dt className="font-semibold">Valor</dt>
              <dd>{formatearCOP(transaccion.amount_in_cents / 100)} COP</dd>
              <dt className="font-semibold">Referencia</dt>
              <dd className="break-all font-mono text-xs">{transaccion.reference}</dd>
              <dt className="font-semibold">Transacción Wompi</dt>
              <dd className="break-all font-mono text-xs">{transaccion.id}</dd>
            </dl>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#cursos" className="inline-block rounded-lg bg-tinta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-acento">
              {vista.tono === 'error' ? 'Volver a los cursos' : 'Ver más cursos'}
            </Link>
            <a
              href="https://orquidbio.com/pages/contact"
              className="inline-block rounded-lg border-[1.5px] border-tinta px-7 py-3.5 text-sm font-semibold text-tinta transition-colors hover:border-acento hover:text-acento"
            >
              Contáctanos
            </a>
          </div>
        </section>
      </main>
      <PiePagina />
    </>
  );
}
