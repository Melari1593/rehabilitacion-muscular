import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { diccionario } from '@/lib/diccionarios';
import { esIdioma, IDIOMAS } from '@/lib/i18n';
import { APP_TRIAGE, RUTA_TRIAGE, TRIAGE_PUBLICO } from '@/lib/triage';

export async function generateMetadata({ params }: PageProps<'/[lang]/orientacion'>): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = diccionario(lang).triage;
  return {
    title: t.metaTitulo,
    description: t.metaDescripcion,
    // Mientras los guiones están en revisión médica, la página no se indexa.
    robots: TRIAGE_PUBLICO ? undefined : { index: false, follow: false },
    alternates: { languages: Object.fromEntries(IDIOMAS.map((i) => [i, `/${i}${RUTA_TRIAGE}`])) },
  };
}

// Chat de orientación de triage (HTML autónomo en /public/triage), mostrado en un iframe del mismo dominio.
// El contenido clínico existe solo en español: en los otros idiomas se explica y se enlaza a /es.
export default async function Orientacion({ params }: PageProps<'/[lang]/orientacion'>) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = diccionario(lang);
  const tr = t.triage;
  return (
    <>
      <Encabezado lang={lang} t={t} />
      <main className="pt-[68px]">
        <section aria-labelledby="titulo" className="px-[6%] pb-8 pt-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">{tr.eyebrow}</p>
          <h1 id="titulo" className="mb-4 max-w-3xl font-serif text-[clamp(34px,5vw,60px)] leading-[1.05]">{tr.titulo}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-suave">{tr.texto}</p>
          <p className="mt-3 max-w-2xl text-sm text-suave">{tr.motivos}</p>

          <div className="mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
            <div role="alert" className="rounded-xl border-[1.5px] border-[#b3261e] bg-[#b3261e]/5 p-5">
              <h2 className="mb-1 text-base font-semibold text-[#8c1d17]">{tr.emergenciaTitulo}</h2>
              <p className="text-sm leading-relaxed text-tinta">{tr.emergencia}</p>
              <a
                href="tel:123"
                className="mt-3 inline-block rounded-lg bg-[#b3261e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8c1d17]"
                dir="ltr"
              >
                ☎ 123
              </a>
            </div>
            <div className="rounded-xl border border-dashed border-acento bg-white p-5">
              <h2 className="mb-1 text-base font-semibold">{tr.avisoTitulo}</h2>
              <p className="text-sm leading-relaxed text-suave">{tr.aviso}</p>
            </div>
          </div>
        </section>

        <section aria-label={tr.iframeTitulo} className="px-[6%] pb-24">
          {tr.soloEspanol ? (
            <div className="max-w-3xl rounded-xl border border-borde bg-arena p-6">
              <p className="text-sm leading-relaxed text-tinta">{tr.soloEspanol}</p>
              <Link
                href={`/es${RUTA_TRIAGE}`}
                hrefLang="es"
                className="mt-4 inline-block rounded-lg bg-tinta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-acento"
              >
                {tr.irEspanol}
              </Link>
            </div>
          ) : (
            <>
              <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-borde bg-fondo shadow-[0_8px_32px_rgba(47,42,39,0.08)]">
                <iframe src={APP_TRIAGE} title={tr.iframeTitulo} className="block h-[min(860px,calc(100vh-90px))] min-h-[640px] w-full" />
              </div>
              <p className="mx-auto mt-3 max-w-3xl text-[13px] text-suave">
                <a className="font-semibold text-acento underline-offset-4 hover:underline" href={APP_TRIAGE}>
                  {tr.pantallaCompleta}
                </a>
              </p>
            </>
          )}
        </section>
      </main>
      <PiePagina lang={lang} t={t} />
    </>
  );
}
