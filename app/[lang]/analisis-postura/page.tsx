import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { diccionario } from '@/lib/diccionarios';
import { esIdioma, IDIOMAS } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/analisis-postura'>): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = diccionario(lang);
  return {
    title: t.paginaPostura.metaTitulo,
    description: t.paginaPostura.metaDescripcion,
    alternates: { languages: Object.fromEntries(IDIOMAS.map((i) => [i, `/${i}/analisis-postura`])) },
  };
}

// La app de análisis de postura vive en /public/postura (HTML + JS + MediaPipe) y se
// muestra aquí dentro de un iframe del mismo dominio, con permiso de cámara. Recibe el idioma con ?lang=.
export default async function AnalisisPostura({ params }: PageProps<'/[lang]/analisis-postura'>) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = diccionario(lang);
  const p = t.paginaPostura;
  const app = `/postura/index.html?lang=${lang}`;
  return (
    <>
      <Encabezado lang={lang} t={t} />
      <main className="pt-[68px]">
        <section aria-labelledby="titulo" className="px-[6%] pb-10 pt-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">{p.eyebrow}</p>
          <h1 id="titulo" className="mb-4 max-w-3xl font-serif text-[clamp(34px,5vw,60px)] leading-[1.05]">{p.titulo}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-suave">{p.texto}</p>
          <ul className="mt-6 grid max-w-3xl gap-2 text-sm text-suave sm:grid-cols-3">
            {p.consejos.map((consejo) => (
              <li key={consejo}>✓ {consejo}</li>
            ))}
          </ul>
        </section>

        <section aria-label={p.appAria} className="px-[6%] pb-8">
          <div className="overflow-hidden rounded-xl border border-borde bg-fondo shadow-[0_8px_32px_rgba(47,42,39,0.08)]">
            <iframe src={app} title={p.iframeTitulo} allow="camera; fullscreen" className="block h-[min(1100px,calc(100vh-40px))] min-h-[760px] w-full" />
          </div>
          <p className="mt-3 text-[13px] text-suave">
            {p.pequena}{' '}
            <a className="font-semibold text-acento underline-offset-4 hover:underline" href={app}>
              {p.pantallaCompleta}
            </a>
          </p>
        </section>

        <section aria-labelledby="titulo-privacidad" className="px-[6%] pb-24">
          <div className="grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-borde bg-white p-6">
              <h2 id="titulo-privacidad" className="mb-2 text-lg font-semibold">{p.privTitulo}</h2>
              <p className="text-sm leading-relaxed text-suave">{p.privTexto}</p>
            </div>
            <div className="rounded-xl border border-borde bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold">{p.criterioTitulo}</h2>
              <p className="text-sm leading-relaxed text-suave">{p.criterioTexto}</p>
            </div>
          </div>
          <p className="mt-10 text-sm text-suave">
            {p.rutina}{' '}
            <Link className="font-semibold text-acento underline-offset-4 hover:underline" href={`/${lang}#cursos`}>
              {p.verCursos}
            </Link>
          </p>
        </section>
      </main>
      <PiePagina lang={lang} t={t} />
    </>
  );
}
