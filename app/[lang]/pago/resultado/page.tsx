import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { formatearCOP, leerReferencia } from '@/lib/cursos';
import { diccionario } from '@/lib/diccionarios';
import { esIdioma } from '@/lib/i18n';
import { obtenerTransaccion, WOMPI_MODO_PRUEBA } from '@/lib/wompi';

export const dynamic = 'force-dynamic';

type Tono = 'ok' | 'espera' | 'error';

const TONO: Record<string, Tono> = { APPROVED: 'ok', PENDING: 'espera', DECLINED: 'error', VOIDED: 'error', ERROR: 'error' };

const COLOR: Record<Tono, string> = {
  ok: 'border-acento bg-acento/10',
  espera: 'border-borde bg-arena',
  error: 'border-[#b3261e]/40 bg-[#b3261e]/5',
};

export async function generateMetadata({ params }: PageProps<'/[lang]/pago/resultado'>): Promise<Metadata> {
  const { lang } = await params;
  return { title: esIdioma(lang) ? diccionario(lang).resultado.metaTitulo : undefined, robots: { index: false } };
}

// Wompi redirige aquí con ?id=<transacción>. El estado se consulta en la API de Wompi:
// nunca se confía en parámetros de la URL. La entrega del curso la hace el webhook (/api/wompi/eventos).
export default async function ResultadoPago({ params, searchParams }: PageProps<'/[lang]/pago/resultado'>) {
  const [{ lang }, { id }] = await Promise.all([params, searchParams]);
  if (!esIdioma(lang)) notFound();
  const t = diccionario(lang);
  const r = t.resultado;
  const transaccion = typeof id === 'string' ? await obtenerTransaccion(id).catch(() => null) : null;
  const curso = transaccion ? leerReferencia(transaccion.reference)?.curso : undefined;
  const coincide = Boolean(transaccion && curso && transaccion.currency === 'COP' && transaccion.amount_in_cents === curso.precioCOP * 100);
  const estado = transaccion && coincide && transaccion.status in r.estados ? (transaccion.status as keyof typeof r.estados) : null;
  const vista = estado ? { ...r.estados[estado], tono: TONO[estado] } : { ...r.noEncontrado, tono: 'error' as Tono };

  return (
    <>
      <Encabezado lang={lang} t={t} />
      <main className="px-[6%] pb-24 pt-[120px]">
        <section aria-labelledby="titulo" className={`mx-auto max-w-2xl rounded-xl border-[1.5px] p-8 sm:p-10 ${COLOR[vista.tono]}`}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">
            {r.eyebrow}
            {WOMPI_MODO_PRUEBA ? ` · ${r.modoPrueba}` : ''}
          </p>
          <h1 id="titulo" className="mb-4 font-serif text-[clamp(30px,4vw,44px)] leading-[1.1]">{vista.titulo}</h1>
          <p className="text-base leading-relaxed text-suave">{vista.texto}</p>
          {transaccion && curso && coincide && (
            <dl className="mt-8 grid gap-3 border-t border-borde pt-6 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
              <dt className="font-semibold">{r.curso}</dt>
              <dd>{t.catalogo[curso.slug].titulo}</dd>
              <dt className="font-semibold">{r.valor}</dt>
              <dd>{formatearCOP(transaccion.amount_in_cents / 100, lang)}</dd>
              <dt className="font-semibold">{r.referencia}</dt>
              <dd className="break-all font-mono text-xs" dir="ltr">{transaccion.reference}</dd>
              <dt className="font-semibold">{r.transaccion}</dt>
              <dd className="break-all font-mono text-xs" dir="ltr">{transaccion.id}</dd>
            </dl>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/${lang}#cursos`} className="inline-block rounded-lg bg-tinta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-acento">
              {vista.tono === 'error' ? r.volver : r.verMas}
            </Link>
            <a
              href="https://orquidbio.com/pages/contact"
              className="inline-block rounded-lg border-[1.5px] border-tinta px-7 py-3.5 text-sm font-semibold text-tinta transition-colors hover:border-acento hover:text-acento"
            >
              {r.contacto}
            </a>
          </div>
        </section>
      </main>
      <PiePagina lang={lang} t={t} />
    </>
  );
}
