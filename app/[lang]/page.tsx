import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Activity, Camera, CircleDot, Dumbbell, HeartPulse, Monitor, ShieldCheck, Snowflake } from 'lucide-react';
import { Aparecer } from '@/components/Aparecer';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { TarjetaCurso } from '@/components/TarjetaCurso';
import { TarjetaProducto } from '@/components/TarjetaProducto';
import { CURSOS } from '@/lib/cursos';
import { diccionario } from '@/lib/diccionarios';
import { esIdioma } from '@/lib/i18n';
import { obtenerColeccion } from '@/lib/shopify';
import { WOMPI_CONFIGURADO, WOMPI_MODO_PRUEBA } from '@/lib/wompi';

const COLECCION_PRODUCTOS = process.env.SHOPIFY_COLECCION_PRODUCTOS ?? 'rehabilitacion-y-bienestar';

export const revalidate = 300;

// Íconos y destino de cada tema (los textos están en el diccionario, en el mismo orden).
const TEMAS = [
  { icono: Monitor, ancla: '#cursos' },
  { icono: Activity, ancla: '#cursos' },
  { icono: CircleDot, ancla: '#cursos' },
  { icono: Dumbbell, ancla: '#cursos' },
  { icono: Snowflake, ancla: '#cursos' },
  { icono: HeartPulse, ancla: '#productos' },
];
const ICONOS_POSTURA = [Camera, ShieldCheck, Activity];

const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento';
const h2 = 'mb-14 max-w-3xl font-serif text-[clamp(30px,4vw,48px)] leading-[1.1]';
const btnNavy =
  'inline-block rounded-lg border-[1.5px] border-tinta bg-tinta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-acento hover:bg-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento';
const btnLinea =
  'inline-block rounded-lg border-[1.5px] border-tinta px-7 py-3.5 text-sm font-semibold text-tinta transition-colors hover:border-acento hover:text-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento';

export default async function Inicio({ params, searchParams }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = diccionario(lang);
  const [{ error }, productos] = await Promise.all([searchParams, obtenerColeccion(COLECCION_PRODUCTOS, 12, lang)]);
  // Los cursos de Shopify se cobran con Wompi: se excluyen por su handle (no cambia con la traducción).
  const productosFisicos = productos.filter((p) => !p.handle.startsWith('curso-'));
  const mensajeError = typeof error === 'string' && (error === 'checkout' || error === 'producto') ? t.errores[error] : undefined;

  return (
    <>
      <Encabezado lang={lang} t={t} />

      <main id="contenido" className="pt-[68px]">
        {mensajeError && (
          <p role="alert" className="bg-red-50 px-[6%] py-3 text-center text-sm text-red-800">
            {mensajeError}
          </p>
        )}

        {/* 1. Portada */}
        <section aria-labelledby="titulo" className="grid min-h-[min(calc(100vh-68px),820px)] lg:grid-cols-[48%_52%]">
          <div className="flex flex-col justify-center px-[6%] py-16 lg:ps-[8%]">
            <div className="max-w-[560px]">
              <Aparecer alCargar>
                <span className="inline-block rounded-full bg-acento/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-acento">
                  {t.portada.chip}
                </span>
                <h1 id="titulo" className="my-5 font-serif text-[clamp(42px,6vw,88px)] leading-none">
                  {t.portada.titulo}
                </h1>
              </Aparecer>
              <Aparecer alCargar retraso={0.15}>
                <p className="mb-9 text-base leading-relaxed text-suave">{t.portada.texto}</p>
                <div className="flex flex-wrap gap-3">
                  <a href="#cursos" className={btnNavy}>{t.portada.verCursos}</a>
                  <a href="#productos" className={btnLinea}>{t.portada.productos}</a>
                </div>
              </Aparecer>
              <Aparecer alCargar escala retraso={0.5}>
                <a
                  href="#cursos"
                  className="mt-8 block max-w-[340px] rounded-xl border-[0.5px] border-borde bg-white px-5 py-4 shadow-[0_8px_32px_rgba(47,42,39,0.10)]"
                >
                  <span className="inline-block rounded-full bg-acento/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-acento">
                    {t.portada.destacadoChip}
                  </span>
                  <strong className="mt-2.5 block text-sm font-semibold">{t.portada.destacadoTitulo}</strong>
                  <small className="mt-1 block text-xs font-light text-suave">{t.portada.destacadoTexto}</small>
                </a>
              </Aparecer>
            </div>
          </div>
          {/*
            Imagen de portada: reemplaza este bloque por
            <Image src="/portada.jpg" alt="Personas estirando en una sala luminosa" fill priority className="object-cover" sizes="(min-width:1024px) 52vw, 100vw" />
            cuando tengas la foto en /public/portada.jpg (por ejemplo, la generada con Nano Banana).
          */}
          <div
            className="relative order-first aspect-[4/3] overflow-hidden bg-gradient-to-br from-arena via-fondo to-acento/15 lg:order-none lg:aspect-auto"
            aria-hidden="true"
          >
            <div className="absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-acento/15" />
            <div className="absolute bottom-10 left-1/4 h-40 w-40 rounded-full bg-tinta/10" />
            <div className="absolute right-1/3 top-10 h-24 w-24 rounded-full border-[10px] border-acento/20" />
          </div>
        </section>

        {/* 2. Franja de confianza */}
        <div className="overflow-hidden bg-tinta py-7 hover:[&>div]:[animation-play-state:paused]" role="region" aria-label={t.franja.aria}>
          {/* La franja se desplaza siempre hacia la izquierda, también en árabe */}
          <div className="flex w-max animate-marquesina" dir="ltr">
            {[0, 1].map((copia) => (
              <ul key={copia} className="flex shrink-0" aria-hidden={copia === 1 || undefined}>
                {[...t.franja.datos, ...t.franja.datos].map((dato, i) => (
                  <li key={i} dir="auto" className="whitespace-nowrap px-5 text-[13px] text-white/85 after:ms-10 after:text-acento-claro after:content-['·']">
                    {dato}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* 3. Temas */}
        <section aria-labelledby="temas" className="bg-arena px-[6%] py-24">
          <p className={eyebrow}>{t.temas.eyebrow}</p>
          <h2 id="temas" className={h2}>{t.temas.titulo}</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.temas.items.map(({ titulo, texto }, i) => {
              const { icono: Icono, ancla } = TEMAS[i];
              return (
              <Aparecer as="li" key={titulo} retraso={i * 0.07}>
                <a
                  href={ancla}
                  className="group block h-full rounded-lg border border-borde bg-white px-5 py-6 transition-all duration-200 hover:border-transparent hover:bg-acento hover:text-white hover:shadow-[0_4px_16px_rgba(86,112,74,0.25)] focus-visible:border-transparent focus-visible:bg-acento focus-visible:text-white focus-visible:outline-none"
                >
                  <Icono className="h-[22px] w-[22px] text-acento transition-colors group-hover:text-white group-focus-visible:text-white" aria-hidden="true" />
                  <h3 className="mb-1.5 mt-3.5 text-[15px] font-semibold">{titulo}</h3>
                  <p className="text-[13px] font-light leading-normal text-suave transition-colors group-hover:text-white/85 group-focus-visible:text-white/85">
                    {texto}
                  </p>
                </a>
              </Aparecer>
              );
            })}
          </ul>
        </section>

        {/* 4. Cómo funciona */}
        <section id="como-funciona" aria-labelledby="pasos" className="scroll-mt-20 px-[6%] py-24">
          <p className={eyebrow}>{t.pasos.eyebrow}</p>
          <h2 id="pasos" className={h2}>{t.pasos.titulo}</h2>
          <ol className="grid gap-10 md:grid-cols-3">
            {t.pasos.items.map((paso, i) => (
              <Aparecer as="li" key={paso.titulo} retraso={i * 0.15} className="relative pt-2">
                <span className="pointer-events-none absolute -top-2 start-0 select-none text-7xl font-semibold leading-none text-tinta/5" aria-hidden="true">
                  0{i + 1}
                </span>
                <div className="mb-5 mt-10 h-0.5 w-10 bg-acento" />
                <h3 className="mb-2 text-lg font-semibold">{paso.titulo}</h3>
                <p className="text-[15px] leading-relaxed text-suave">{paso.texto}</p>
                <small className="mt-3 block text-xs font-light text-acento">{paso.nota}</small>
              </Aparecer>
            ))}
          </ol>
        </section>

        {/* 5. Análisis de postura (app de rehabilitación) */}
        <section aria-labelledby="titulo-postura" className="bg-tinta px-[6%] py-24 text-white">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Aparecer>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento-claro">{t.seccionPostura.eyebrow}</p>
              <h2 id="titulo-postura" className="mb-5 font-serif text-[clamp(30px,4vw,48px)] leading-[1.1]">{t.seccionPostura.titulo}</h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/75">{t.seccionPostura.texto}</p>
              <Link
                href={`/${lang}/analisis-postura`}
                className="inline-block rounded-lg bg-acento px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-acento-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-claro"
              >
                {t.seccionPostura.boton}
              </Link>
            </Aparecer>
            <Aparecer retraso={0.15}>
              <ul className="grid gap-4">
                {t.seccionPostura.items.map(({ titulo, texto }, i) => {
                  const Icono = ICONOS_POSTURA[i];
                  return (
                  <li key={titulo} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                    <Icono className="mt-0.5 h-5 w-5 shrink-0 text-acento-claro" aria-hidden="true" />
                    <div>
                      <h3 className="text-[15px] font-semibold">{titulo}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/70">{texto}</p>
                    </div>
                  </li>
                  );
                })}
              </ul>
            </Aparecer>
          </div>
        </section>

        {/* 6. Cursos (pago con Wompi) */}
        <section id="cursos" aria-labelledby="titulo-cursos" className="scroll-mt-20 bg-arena px-[6%] py-24">
          <p className={eyebrow}>{t.cursos.eyebrow}</p>
          <h2 id="titulo-cursos" className={h2}>{t.cursos.titulo}</h2>
          {WOMPI_MODO_PRUEBA && (
            <p role="note" className="mb-8 max-w-3xl rounded-lg border border-dashed border-acento bg-white/70 px-5 py-4 text-sm text-tinta">
              <strong>{t.cursos.avisoPruebaTitulo}</strong> {t.cursos.avisoPrueba}
            </p>
          )}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CURSOS.map((curso, i) => (
              <Aparecer as="li" key={curso.slug} retraso={Math.min(i, 5) * 0.1}>
                <TarjetaCurso curso={curso} activo={WOMPI_CONFIGURADO} lang={lang} t={t} />
              </Aparecer>
            ))}
          </ul>
          <p className="mt-8 text-[13px] font-light text-suave">
            {t.cursos.nota}
            {t.cursos.idiomaContenido && <strong className="mt-2 block font-semibold text-tinta">{t.cursos.idiomaContenido}</strong>}
          </p>
        </section>

        {/* 7. Productos (Shopify) */}
        {productosFisicos.length > 0 && (
          <section id="productos" aria-labelledby="titulo-productos" className="scroll-mt-20 px-[6%] py-24">
            <p className={eyebrow}>{t.productos.eyebrow}</p>
            <h2 id="titulo-productos" className={h2}>{t.productos.titulo}</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productosFisicos.map((producto, i) => (
                <Aparecer as="li" key={producto.id} retraso={Math.min(i, 5) * 0.08}>
                  <TarjetaProducto producto={producto} lang={lang} t={t} />
                </Aparecer>
              ))}
            </ul>
            <p className="mt-8 text-[13px] font-light text-suave">{t.productos.nota}</p>
          </section>
        )}

        {/* 8. Revisión médica */}
        <section id="revision" aria-labelledby="titulo-revision" className="scroll-mt-20 bg-arena px-[6%] py-24">
          <p className={eyebrow}>{t.revision.eyebrow}</p>
          <h2 id="titulo-revision" className={h2}>{t.revision.titulo}</h2>
          <Aparecer className="max-w-3xl rounded-xl border border-borde bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">{t.revision.subtitulo}</h3>
            <span className="inline-block rounded-full bg-acento/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-acento" dir="auto">{t.registro}</span>
            <p className="mt-3 text-sm leading-relaxed text-suave">{t.revision.texto}</p>
          </Aparecer>
        </section>

        {/* 9. Llamado final */}
        <section aria-labelledby="titulo-cta" className="bg-tinta px-[6%] py-28 text-center text-white">
          <Aparecer>
            <h2 id="titulo-cta" className="font-serif text-[clamp(30px,4.5vw,64px)] leading-tight">{t.cta.titulo}</h2>
            <p className="mb-10 mt-4 text-lg text-white/75">{t.cta.texto}</p>
            <a href="#cursos" className="inline-block rounded-lg bg-acento px-10 py-4 text-[15px] font-semibold transition-colors hover:bg-acento-hover">
              {t.cta.boton}
            </a>
            <small className="mt-4 block text-[13px] font-light text-white/60">{t.cta.nota}</small>
          </Aparecer>
        </section>
      </main>

      <PiePagina lang={lang} t={t} />
    </>
  );
}
