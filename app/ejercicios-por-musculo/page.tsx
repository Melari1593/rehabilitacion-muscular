import type { Metadata } from 'next';
import Link from 'next/link';
import { Encabezado } from '@/components/Encabezado';
import { ExploradorMusculos } from '@/components/ExploradorMusculos';
import { PiePagina } from '@/components/PiePagina';

export const metadata: Metadata = {
  title: 'Ejercicios por grupo muscular · BienEstar en Casa',
  description:
    'Explora el cuerpo en 3D, toca un músculo y descubre qué ejercicios de nuestros cursos lo fortalecen, lo estiran o lo relajan.',
};

const SEMAFORO = [
  { rango: '0 - 3', accion: 'Sigue', texto: 'Molestia leve que desaparece al terminar o al día siguiente.', color: 'bg-[#5f8a4e]' },
  { rango: '4 - 5', accion: 'Ajusta', texto: 'Reduce repeticiones o recorrido, o vuelve al ejercicio anterior.', color: 'bg-[#d9a23a]' },
  { rango: '6 o más', accion: 'Para', texto: 'Detén la sesión. Si dura más de 24 h o hay hinchazón, consulta.', color: 'bg-[#c8483b]' },
];

export default function EjerciciosPorMusculo() {
  return (
    <>
      <Encabezado />
      <main className="pt-[68px]">
        <section aria-labelledby="titulo" className="px-[6%] pb-10 pt-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">Gratis · Modelo 3D</p>
          <h1 id="titulo" className="mb-4 max-w-3xl font-serif text-[clamp(34px,5vw,60px)] leading-[1.05]">
            Ejercicios por grupo muscular.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-suave">
            Gira el cuerpo, toca el músculo que quieres trabajar y mira qué ejercicios de nuestros cursos lo fortalecen, lo estiran o lo
            relajan.
          </p>
        </section>

        <section aria-label="Explorador de músculos y ejercicios" className="px-[6%] pb-20">
          <ExploradorMusculos />
        </section>

        <section aria-labelledby="titulo-seguridad" className="bg-arena px-[6%] py-20">
          <div className="grid max-w-5xl gap-10 md:grid-cols-2">
            <div>
              <h2 id="titulo-seguridad" className="mb-2 font-serif text-[clamp(26px,3vw,36px)] leading-tight">
                Semáforo del dolor
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-suave">Durante y después de cada ejercicio, puntúa tu dolor de 0 (nada) a 10.</p>
              <ul className="space-y-3">
                {SEMAFORO.map((s) => (
                  <li key={s.rango} className="flex gap-4 rounded-lg border border-borde bg-white p-4">
                    <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${s.color}`} aria-hidden="true" />
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold">
                        {s.rango} · {s.accion}.
                      </span>{' '}
                      <span className="text-suave">{s.texto}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-borde bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold">Úsalo con criterio</h2>
              <p className="text-sm leading-relaxed text-suave">
                Es una guía educativa y no reemplaza la valoración de un médico o fisioterapeuta. Si tienes una lesión reciente, una cirugía en
                los últimos 3 meses o un dolor que te despierta por la noche, consulta antes de empezar.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-suave">
                <span className="font-semibold text-tinta">Consulta de urgencia</span> si hay hinchazón importante tras un golpe, fiebre con una
                articulación roja y caliente, o una pantorrilla hinchada, caliente y dolorosa.
              </p>
              <p className="mt-6 text-sm text-suave">
                ¿Quieres comprobar tu técnica?{' '}
                <Link className="font-semibold text-acento underline-offset-4 hover:underline" href="/analisis-postura">
                  Analiza tu postura con la cámara
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <p className="px-[6%] py-6 text-[11px] leading-relaxed text-suave/80">
          Modelo anatómico: BodyParts3D 4.0 © The Database Center for Life Science, licencia{' '}
          <a className="underline underline-offset-2" href="https://creativecommons.org/licenses/by/4.0/deed.es">
            CC BY 4.0
          </a>
          , simplificado a partir de{' '}
          <a className="underline underline-offset-2" href="https://github.com/ashemag/human-atlas">
            Human Atlas
          </a>
          . Representa un cuerpo adulto de referencia y no incluye todos los músculos.
        </p>
      </main>
      <PiePagina />
    </>
  );
}
