import type { Metadata } from 'next';
import Link from 'next/link';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';

export const metadata: Metadata = {
  title: 'Analiza tu postura · BienEstar en Casa',
  description:
    'Haz tus ejercicios frente a la cámara: la app cuenta repeticiones y te avisa si el movimiento sale del rango correcto. Tu video no sale de tu equipo.',
};

// La app de análisis de postura vive en /public/postura (HTML + JS + MediaPipe) y se
// muestra aquí dentro de un iframe del mismo dominio, con permiso de cámara.
export default function AnalisisPostura() {
  return (
    <>
      <Encabezado />
      <main className="pt-[68px]">
        <section aria-labelledby="titulo" className="px-[6%] pb-10 pt-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">Gratis · Con tu cámara</p>
          <h1 id="titulo" className="mb-4 max-w-3xl font-serif text-[clamp(34px,5vw,60px)] leading-[1.05]">Analiza tu postura.</h1>
          <p className="max-w-2xl text-base leading-relaxed text-suave">
            Elige un ejercicio, colócate frente a la cámara y muévete. La app detecta tu postura, cuenta las repeticiones y te avisa al
            instante si el movimiento sale del rango correcto.
          </p>
          <ul className="mt-6 grid max-w-3xl gap-2 text-sm text-suave sm:grid-cols-3">
            <li>✓ Permite el acceso a la cámara</li>
            <li>✓ Busca un lugar con buena luz</li>
            <li>✓ Aléjate hasta que se vea tu cuerpo</li>
          </ul>
        </section>

        <section aria-label="Aplicación de análisis de postura" className="px-[6%] pb-8">
          <div className="overflow-hidden rounded-xl border border-borde bg-fondo shadow-[0_8px_32px_rgba(47,42,39,0.08)]">
            <iframe
              src="/postura/index.html"
              title="Análisis de postura con la cámara"
              allow="camera; fullscreen"
              className="block h-[min(1100px,calc(100vh-40px))] min-h-[760px] w-full"
            />
          </div>
          <p className="mt-3 text-[13px] text-suave">
            ¿Se ve pequeña?{' '}
            <a className="font-semibold text-acento underline-offset-4 hover:underline" href="/postura/index.html">
              Ábrela en pantalla completa
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="titulo-privacidad" className="px-[6%] pb-24">
          <div className="grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-borde bg-white p-6">
              <h2 id="titulo-privacidad" className="mb-2 text-lg font-semibold">Tu video no sale de tu equipo</h2>
              <p className="text-sm leading-relaxed text-suave">
                La detección de postura se hace en tu navegador. No grabamos, guardamos ni enviamos tu video a ningún servidor. Solo se
                descarga el modelo de detección la primera vez que usas la app.
              </p>
            </div>
            <div className="rounded-xl border border-borde bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold">Úsala con criterio</h2>
              <p className="text-sm leading-relaxed text-suave">
                Es una herramienta educativa de apoyo y no reemplaza la valoración de un médico o fisioterapeuta. Si sientes dolor, mareo o
                cualquier molestia, detente y consulta.
              </p>
            </div>
          </div>
          <p className="mt-10 text-sm text-suave">
            ¿Quieres una rutina completa?{' '}
            <Link className="font-semibold text-acento underline-offset-4 hover:underline" href="/#cursos">
              Mira nuestros cursos en línea
            </Link>
            .
          </p>
        </section>
      </main>
      <PiePagina />
    </>
  );
}
