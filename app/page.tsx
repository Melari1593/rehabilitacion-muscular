import Link from 'next/link';
import { Activity, Camera, CircleDot, Dumbbell, HeartPulse, Monitor, ShieldCheck, Snowflake } from 'lucide-react';
import { Aparecer } from '@/components/Aparecer';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { TarjetaProducto } from '@/components/TarjetaProducto';
import { obtenerColeccion } from '@/lib/shopify';

const REGISTRO = 'Registro médico RETHUS 1018459438';
const COLECCION_CURSOS = process.env.SHOPIFY_COLECCION_CURSOS ?? 'cursos-en-linea';
const COLECCION_PRODUCTOS = process.env.SHOPIFY_COLECCION_PRODUCTOS ?? 'rehabilitacion-y-bienestar';

export const revalidate = 300;

const TEMAS = [
  { icono: Monitor, titulo: 'Espalda y cuello', texto: 'Para quien pasa muchas horas sentado.' },
  { icono: Activity, titulo: 'Rodillas fuertes', texto: 'Fortalece los músculos que protegen tus rodillas.' },
  { icono: CircleDot, titulo: 'Recuperación muscular', texto: 'Automasaje con rodillo y pelota, sin dolor.' },
  { icono: Dumbbell, titulo: 'Fuerza en casa', texto: 'Entrena con bandas elásticas, desde cero.' },
  { icono: Snowflake, titulo: 'Frío o calor', texto: 'Cómo manejar molestias musculares en casa.' },
  { icono: HeartPulse, titulo: 'Productos de bienestar', texto: 'Todo lo que necesitas para tu rutina.' },
];

const PASOS = [
  { titulo: 'Elige tu curso', texto: 'Espalda, rodillas, recuperación muscular o fuerza en casa. Cada curso explica para quién es y qué incluye.', nota: 'Cursos desde 14,90 USD' },
  { titulo: 'Paga en línea', texto: 'Pagas en el checkout seguro de Shopify. Al confirmarse el pago recibes en tu correo las instrucciones de acceso.', nota: 'Sin envíos ni esperas' },
  { titulo: 'Practica a tu ritmo', texto: 'Videos cortos y un plan descargable para seguir tu progreso. Cada curso incluye señales de alerta para saber cuándo consultar.', nota: '10 a 25 minutos por sesión' },
];

const FRANJA = [
  'Contenido revisado por un médico',
  REGISTRO,
  'Pago en línea seguro',
  'Acceso digital a los cursos',
  'Guías descargables en PDF',
  'Productos con envío a domicilio',
];

const ERRORES: Record<string, string> = {
  checkout: 'No pudimos abrir el pago en este momento. Inténtalo de nuevo en unos minutos.',
  producto: 'Ese producto no está disponible. Elige otro de la lista.',
};

const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento';
const h2 = 'mb-14 max-w-3xl font-serif text-[clamp(30px,4vw,48px)] leading-[1.1]';
const btnNavy =
  'inline-block rounded-lg border-[1.5px] border-tinta bg-tinta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-acento hover:bg-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento';
const btnLinea =
  'inline-block rounded-lg border-[1.5px] border-tinta px-7 py-3.5 text-sm font-semibold text-tinta transition-colors hover:border-acento hover:text-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento';

export default async function Inicio({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [{ error }, cursos, productos] = await Promise.all([
    searchParams,
    obtenerColeccion(COLECCION_CURSOS, 9),
    obtenerColeccion(COLECCION_PRODUCTOS, 12),
  ]);
  const productosFisicos = productos.filter((p) => !p.titulo.startsWith('Curso:'));
  const mensajeError = error ? ERRORES[error] : undefined;

  return (
    <>
      <Encabezado />

      <main id="contenido" className="pt-[68px]">
        {mensajeError && (
          <p role="alert" className="bg-red-50 px-[6%] py-3 text-center text-sm text-red-800">
            {mensajeError}
          </p>
        )}

        {/* 1. Portada */}
        <section aria-labelledby="titulo" className="grid min-h-[min(calc(100vh-68px),820px)] lg:grid-cols-[48%_52%]">
          <div className="flex flex-col justify-center px-[6%] py-16 lg:pl-[8%]">
            <div className="max-w-[560px]">
              <Aparecer alCargar>
                <span className="inline-block rounded-full bg-acento/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-acento">
                  Cursos en línea · Revisados por un médico
                </span>
                <h1 id="titulo" className="my-5 font-serif text-[clamp(42px,6vw,88px)] leading-none">
                  Muévete mejor desde casa.
                </h1>
              </Aparecer>
              <Aparecer alCargar retraso={0.15}>
                <p className="mb-9 text-base leading-relaxed text-suave">
                  Cursos cortos en video y guías descargables para cuidar tu espalda, tus rodillas y tus músculos a tu ritmo. Más
                  productos para acompañar tu rutina.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#cursos" className={btnNavy}>Ver cursos</a>
                  <a href="#productos" className={btnLinea}>Productos de bienestar</a>
                </div>
              </Aparecer>
              <Aparecer alCargar escala retraso={0.5}>
                <a
                  href="#cursos"
                  className="mt-8 block max-w-[340px] rounded-xl border-[0.5px] border-borde bg-white px-5 py-4 shadow-[0_8px_32px_rgba(47,42,39,0.10)]"
                >
                  <span className="inline-block rounded-full bg-acento/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-acento">
                    Curso destacado
                  </span>
                  <strong className="mt-2.5 block text-sm font-semibold">Espalda sana · 5 días, 10 min al día</strong>
                  <small className="mt-1 block text-xs font-light text-suave">Pago en línea · Acceso digital · Plan en PDF</small>
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
        <div className="overflow-hidden bg-tinta py-7 hover:[&>div]:[animation-play-state:paused]" role="region" aria-label="Datos de la tienda">
          <div className="flex w-max animate-marquesina">
            {[0, 1].map((copia) => (
              <ul key={copia} className="flex shrink-0" aria-hidden={copia === 1 || undefined}>
                {[...FRANJA, ...FRANJA].map((dato, i) => (
                  <li key={i} className="whitespace-nowrap px-5 text-[13px] text-white/85 after:ml-10 after:text-acento-claro after:content-['·']">
                    {dato}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* 3. Temas */}
        <section aria-labelledby="temas" className="bg-arena px-[6%] py-24">
          <p className={eyebrow}>¿Qué quieres mejorar?</p>
          <h2 id="temas" className={h2}>Elige por dónde empezar a cuidarte.</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMAS.map(({ icono: Icono, titulo, texto }, i) => (
              <Aparecer as="li" key={titulo} retraso={i * 0.07}>
                <a
                  href={titulo === 'Productos de bienestar' ? '#productos' : '#cursos'}
                  className="group block h-full rounded-lg border border-borde bg-white px-5 py-6 transition-all duration-200 hover:border-transparent hover:bg-acento hover:text-white hover:shadow-[0_4px_16px_rgba(86,112,74,0.25)] focus-visible:border-transparent focus-visible:bg-acento focus-visible:text-white focus-visible:outline-none"
                >
                  <Icono className="h-[22px] w-[22px] text-acento transition-colors group-hover:text-white group-focus-visible:text-white" aria-hidden="true" />
                  <h3 className="mb-1.5 mt-3.5 text-[15px] font-semibold">{titulo}</h3>
                  <p className="text-[13px] font-light leading-normal text-suave transition-colors group-hover:text-white/85 group-focus-visible:text-white/85">
                    {texto}
                  </p>
                </a>
              </Aparecer>
            ))}
          </ul>
        </section>

        {/* 4. Cómo funciona */}
        <section id="como-funciona" aria-labelledby="pasos" className="scroll-mt-20 px-[6%] py-24">
          <p className={eyebrow}>Cómo funciona</p>
          <h2 id="pasos" className={h2}>Empieza hoy en tres pasos.</h2>
          <ol className="grid gap-10 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <Aparecer as="li" key={paso.titulo} retraso={i * 0.15} className="relative pt-2">
                <span className="pointer-events-none absolute -top-2 left-0 select-none text-7xl font-semibold leading-none text-tinta/5" aria-hidden="true">
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
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento-claro">Gratis · Con tu cámara</p>
              <h2 id="titulo-postura" className="mb-5 font-serif text-[clamp(30px,4vw,48px)] leading-[1.1]">Analiza tu postura mientras haces ejercicio.</h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/75">
                Ponte frente a la cámara, elige un ejercicio y la app cuenta tus repeticiones y te avisa al instante si el movimiento sale
                del rango correcto. Empieza con la sentadilla y la elevación de brazo.
              </p>
              <Link
                href="/analisis-postura"
                className="inline-block rounded-lg bg-acento px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-acento-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-claro"
              >
                Probar el análisis de postura
              </Link>
            </Aparecer>
            <Aparecer retraso={0.15}>
              <ul className="grid gap-4">
                {[
                  { icono: Camera, titulo: 'Solo necesitas tu cámara', texto: 'Funciona en el navegador del celular o del computador, sin instalar nada.' },
                  { icono: ShieldCheck, titulo: 'Tu video no sale de tu equipo', texto: 'La detección de postura ocurre en tu navegador. No grabamos ni enviamos tu video.' },
                  { icono: Activity, titulo: 'Te dice qué corregir', texto: 'Cuenta repeticiones, marca las correctas y te muestra un resumen al terminar.' },
                ].map(({ icono: Icono, titulo, texto }) => (
                  <li key={titulo} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                    <Icono className="mt-0.5 h-5 w-5 shrink-0 text-acento-claro" aria-hidden="true" />
                    <div>
                      <h3 className="text-[15px] font-semibold">{titulo}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/70">{texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Aparecer>
          </div>
        </section>

        {/* 6. Cursos (Shopify) */}
        <section id="cursos" aria-labelledby="titulo-cursos" className="scroll-mt-20 bg-arena px-[6%] py-24">
          <p className={eyebrow}>Cursos en línea</p>
          <h2 id="titulo-cursos" className={h2}>Aprende a cuidarte, paso a paso.</h2>
          {cursos.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cursos.map((curso, i) => (
                <Aparecer as="li" key={curso.id} retraso={i * 0.12}>
                  <TarjetaProducto producto={curso} etiqueta="Curso en línea" />
                </Aparecer>
              ))}
            </ul>
          ) : (
            <p className="text-suave">Muy pronto: estamos preparando nuestros cursos.</p>
          )}
          <p className="mt-8 text-[13px] font-light text-suave">
            El pago se hace en el checkout seguro de Shopify. Los cursos son digitales: no tienen envío ni pago contra entrega.
          </p>
        </section>

        {/* 7. Productos (Shopify) */}
        {productosFisicos.length > 0 && (
          <section id="productos" aria-labelledby="titulo-productos" className="scroll-mt-20 px-[6%] py-24">
            <p className={eyebrow}>Productos de bienestar</p>
            <h2 id="titulo-productos" className={h2}>Lo que necesitas para tu rutina.</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productosFisicos.map((producto, i) => (
                <Aparecer as="li" key={producto.id} retraso={Math.min(i, 5) * 0.08}>
                  <TarjetaProducto producto={producto} etiqueta="Envío a domicilio" />
                </Aparecer>
              ))}
            </ul>
          </section>
        )}

        {/* 8. Revisión médica */}
        <section id="revision" aria-labelledby="titulo-revision" className="scroll-mt-20 bg-arena px-[6%] py-24">
          <p className={eyebrow}>Quién revisa el contenido</p>
          <h2 id="titulo-revision" className={h2}>Ejercicios sencillos, revisados por un médico.</h2>
          <Aparecer className="max-w-3xl rounded-xl border border-borde bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Médico revisor</h3>
            <span className="inline-block rounded-full bg-acento/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-acento">{REGISTRO}</span>
            <p className="mt-3 text-sm leading-relaxed text-suave">
              Todo el contenido de los cursos es revisado por un médico antes de publicarse. Los cursos son educativos y no reemplazan una
              valoración profesional presencial.
            </p>
          </Aparecer>
        </section>

        {/* 9. Llamado final */}
        <section aria-labelledby="titulo-cta" className="bg-tinta px-[6%] py-28 text-center text-white">
          <Aparecer>
            <h2 id="titulo-cta" className="font-serif text-[clamp(30px,4.5vw,64px)] leading-tight">¿Listo para moverte mejor?</h2>
            <p className="mb-10 mt-4 text-lg text-white/75">Cursos cortos, a tu ritmo y desde casa.</p>
            <a href="#cursos" className="inline-block rounded-lg bg-acento px-10 py-4 text-[15px] font-semibold transition-colors hover:bg-acento-hover">
              Ver los cursos
            </a>
            <small className="mt-4 block text-[13px] font-light text-white/60">Pago en línea · Acceso digital · Contenido revisado por un médico</small>
          </Aparecer>
        </section>
      </main>

      <PiePagina />
    </>
  );
}
