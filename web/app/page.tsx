import Link from 'next/link';
import { Activity, CircleDot, Dumbbell, HeartPulse, Monitor, Snowflake } from 'lucide-react';
import { Aparecer } from '@/components/Aparecer';
import { TarjetaProducto } from '@/components/TarjetaProducto';
import { obtenerColeccion } from '@/lib/shopify';

const TIENDA = 'https://orquidbio.com';
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

const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-azul';
const h2 = 'mb-14 max-w-3xl font-serif text-[clamp(30px,4vw,48px)] leading-[1.1]';
const btnNavy =
  'inline-block rounded-lg border-[1.5px] border-navy bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-azul hover:bg-azul focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul';
const btnLinea =
  'inline-block rounded-lg border-[1.5px] border-navy px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-azul hover:text-azul focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul';

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
      {/* Navegación */}
      <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-borde bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex h-full items-center justify-between px-[6%]" aria-label="Principal">
          <Link href="/" className="text-xl text-navy">
            <span className="font-serif">BienEstar</span> <span className="font-light">en Casa</span>
          </Link>
          <ul className="hidden gap-8 text-sm md:flex">
            <li><a className="transition-colors hover:text-azul" href="#cursos">Cursos</a></li>
            <li><a className="transition-colors hover:text-azul" href="#productos">Productos</a></li>
            <li><a className="transition-colors hover:text-azul" href="#como-funciona">Cómo funciona</a></li>
            <li><a className="transition-colors hover:text-azul" href="#revision">Revisión médica</a></li>
          </ul>
          <a href="#cursos" className="rounded-md bg-navy px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-azul">
            Ver cursos
          </a>
        </nav>
      </header>

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
                <span className="inline-block rounded-full bg-azul/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-azul">
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
                  className="mt-8 block max-w-[340px] rounded-xl border-[0.5px] border-borde bg-white px-5 py-4 shadow-[0_8px_32px_rgba(26,36,64,0.10)]"
                >
                  <span className="inline-block rounded-full bg-azul/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-azul">
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
            className="relative order-first aspect-[4/3] overflow-hidden bg-gradient-to-br from-gris via-white to-azul/15 lg:order-none lg:aspect-auto"
            aria-hidden="true"
          >
            <div className="absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-azul/15" />
            <div className="absolute bottom-10 left-1/4 h-40 w-40 rounded-full bg-navy/10" />
            <div className="absolute right-1/3 top-10 h-24 w-24 rounded-full border-[10px] border-azul/20" />
          </div>
        </section>

        {/* 2. Franja de confianza */}
        <div className="overflow-hidden bg-navy py-7 hover:[&>div]:[animation-play-state:paused]" role="region" aria-label="Datos de la tienda">
          <div className="flex w-max animate-marquesina">
            {[0, 1].map((copia) => (
              <ul key={copia} className="flex shrink-0" aria-hidden={copia === 1 || undefined}>
                {[...FRANJA, ...FRANJA].map((dato, i) => (
                  <li key={i} className="whitespace-nowrap px-5 text-[13px] text-white/85 after:ml-10 after:text-azul after:content-['·']">
                    {dato}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* 3. Temas */}
        <section aria-labelledby="temas" className="bg-gris px-[6%] py-24">
          <p className={eyebrow}>¿Qué quieres mejorar?</p>
          <h2 id="temas" className={h2}>Elige por dónde empezar a cuidarte.</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMAS.map(({ icono: Icono, titulo, texto }, i) => (
              <Aparecer as="li" key={titulo} retraso={i * 0.07}>
                <a
                  href={titulo === 'Productos de bienestar' ? '#productos' : '#cursos'}
                  className="group block h-full rounded-lg border border-borde bg-white px-5 py-6 transition-all duration-200 hover:border-transparent hover:bg-azul hover:text-white hover:shadow-[0_4px_16px_rgba(26,140,212,0.25)] focus-visible:border-transparent focus-visible:bg-azul focus-visible:text-white focus-visible:outline-none"
                >
                  <Icono className="h-[22px] w-[22px] text-azul transition-colors group-hover:text-white group-focus-visible:text-white" aria-hidden="true" />
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
                <span className="pointer-events-none absolute -top-2 left-0 select-none text-7xl font-semibold leading-none text-navy/5" aria-hidden="true">
                  0{i + 1}
                </span>
                <div className="mb-5 mt-10 h-0.5 w-10 bg-azul" />
                <h3 className="mb-2 text-lg font-semibold">{paso.titulo}</h3>
                <p className="text-[15px] leading-relaxed text-suave">{paso.texto}</p>
                <small className="mt-3 block text-xs font-light text-azul">{paso.nota}</small>
              </Aparecer>
            ))}
          </ol>
        </section>

        {/* 5. Cursos (Shopify) */}
        <section id="cursos" aria-labelledby="titulo-cursos" className="scroll-mt-20 bg-gris px-[6%] py-24">
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

        {/* 6. Productos (Shopify) */}
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

        {/* 7. Revisión médica */}
        <section id="revision" aria-labelledby="titulo-revision" className="scroll-mt-20 bg-gris px-[6%] py-24">
          <p className={eyebrow}>Quién revisa el contenido</p>
          <h2 id="titulo-revision" className={h2}>Ejercicios sencillos, revisados por un médico.</h2>
          <Aparecer className="max-w-3xl rounded-xl border border-borde bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Médico revisor</h3>
            <span className="inline-block rounded-full bg-azul/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-azul">{REGISTRO}</span>
            <p className="mt-3 text-sm leading-relaxed text-suave">
              Todo el contenido de los cursos es revisado por un médico antes de publicarse. Los cursos son educativos y no reemplazan una
              valoración profesional presencial.
            </p>
          </Aparecer>
        </section>

        {/* 8. Llamado final */}
        <section aria-labelledby="titulo-cta" className="bg-navy px-[6%] py-28 text-center text-white">
          <Aparecer>
            <h2 id="titulo-cta" className="font-serif text-[clamp(30px,4.5vw,64px)] leading-tight">¿Listo para moverte mejor?</h2>
            <p className="mb-10 mt-4 text-lg text-white/75">Cursos cortos, a tu ritmo y desde casa.</p>
            <a href="#cursos" className="inline-block rounded-lg bg-azul px-10 py-4 text-[15px] font-semibold transition-colors hover:bg-azul-hover">
              Ver los cursos
            </a>
            <small className="mt-4 block text-[13px] font-light text-white/60">Pago en línea · Acceso digital · Contenido revisado por un médico</small>
          </Aparecer>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="border-t border-borde px-[6%] pb-8 pt-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg"><span className="font-serif">BienEstar</span> <span className="font-light">en Casa</span></p>
            <p className="mt-2 text-[13px] font-light text-suave">Cursos en línea y productos para moverte mejor desde casa.</p>
          </div>
          <div>
            <p className={eyebrow}>Tienda</p>
            <ul className="space-y-2 text-[13px] text-suave">
              <li><a className="hover:text-azul" href="#cursos">Cursos en línea</a></li>
              <li><a className="hover:text-azul" href="#productos">Productos de bienestar</a></li>
            </ul>
          </div>
          <div>
            <p className={eyebrow}>Políticas</p>
            <ul className="space-y-2 text-[13px] text-suave">
              <li><a className="hover:text-azul" href={`${TIENDA}/policies/terms-of-service`}>Términos del servicio</a></li>
              <li><a className="hover:text-azul" href={`${TIENDA}/policies/refund-policy`}>Política de reembolso</a></li>
              <li><a className="hover:text-azul" href={`${TIENDA}/policies/privacy-policy`}>Política de privacidad</a></li>
              <li><a className="hover:text-azul" href={`${TIENDA}/pages/shipping`}>Envíos</a></li>
            </ul>
          </div>
          <div>
            <p className={eyebrow}>Contacto</p>
            <ul className="space-y-2 text-[13px] text-suave">
              <li><a className="hover:text-azul" href={`${TIENDA}/pages/contact`}>Escríbenos</a></li>
              <li>Bogotá, Colombia</li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-center text-xs font-light text-suave">
          Contenido educativo. No reemplaza una consulta, diagnóstico ni tratamiento médico.
        </p>
        <p className="mt-2 text-center text-[11px] font-light text-suave/70">© {new Date().getFullYear()} BienEstar en Casa · Pagos procesados por Shopify</p>
      </footer>
    </>
  );
}
