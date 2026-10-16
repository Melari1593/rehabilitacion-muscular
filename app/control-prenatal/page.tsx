import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Baby, CalendarCheck, Download, HeartHandshake, Users } from 'lucide-react';
import { Aparecer } from '@/components/Aparecer';
import { Encabezado } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { SESIONES, SIGNOS_ALARMA } from '@/lib/cursoPrenatal';

export const metadata: Metadata = {
  title: 'Curso de preparación para la maternidad y la paternidad · BienEstar en Casa',
  description:
    'Siete sesiones para acompañar el control prenatal: emociones, cambios del embarazo, vínculo con el bebé, parto, recién nacido, lactancia y crianza. Contenido revisado por un médico.',
};

const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento';
const h2 = 'mb-10 max-w-3xl font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.1]';

const CLAVES = [
  { icono: CalendarCheck, titulo: '7 sesiones', texto: '1 antes de la semana 14, 3 en el segundo trimestre y 3 en el tercero.' },
  { icono: Users, titulo: 'Con tu acompañante', texto: 'Tu pareja, tu familia o la persona más cercana a ti pueden asistir contigo.' },
  { icono: HeartHandshake, titulo: 'Teoría y práctica', texto: 'Respiración, posiciones, piso pélvico, baño del bebé y agarre para amamantar.' },
];

export default function ControlPrenatal() {
  return (
    <>
      <Encabezado />
      <main id="contenido" className="pt-[68px]">
        {/* Portada */}
        <section aria-labelledby="titulo" className="px-[6%] pb-16 pt-14">
          <Aparecer alCargar>
            <span className="inline-block rounded-full bg-acento/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-acento">
              Control prenatal · Curso de preparación
            </span>
            <h1 id="titulo" className="my-5 max-w-4xl font-serif text-[clamp(36px,5.5vw,72px)] leading-[1.02]">
              Prepárate para la maternidad y la paternidad.
            </h1>
          </Aparecer>
          <Aparecer alCargar retraso={0.15}>
            <p className="max-w-2xl text-base leading-relaxed text-suave">
              Siete sesiones que acompañan tu control prenatal, desde las primeras semanas hasta la llegada del bebé: emociones, cambios
              del embarazo, vínculo, parto, cuidados del recién nacido, lactancia y crianza.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#sesiones"
                className="inline-block rounded-lg border-[1.5px] border-tinta bg-tinta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-acento hover:bg-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
              >
                Ver las sesiones
              </a>
              <a
                href="#alarma"
                className="inline-block rounded-lg border-[1.5px] border-tinta px-7 py-3.5 text-sm font-semibold text-tinta transition-colors hover:border-acento hover:text-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
              >
                Signos de alarma
              </a>
            </div>
          </Aparecer>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {CLAVES.map(({ icono: Icono, titulo, texto }, i) => (
              <Aparecer as="li" key={titulo} retraso={0.25 + i * 0.08} className="rounded-xl border border-borde bg-white p-5">
                <Icono className="h-5 w-5 text-acento" aria-hidden="true" />
                <h2 className="mb-1 mt-3 text-[15px] font-semibold">{titulo}</h2>
                <p className="text-[13px] leading-relaxed text-suave">{texto}</p>
              </Aparecer>
            ))}
          </ul>
        </section>

        {/* Sesiones */}
        <section id="sesiones" aria-labelledby="titulo-sesiones" className="scroll-mt-20 bg-arena px-[6%] py-24">
          <p className={eyebrow}>Programa</p>
          <h2 id="titulo-sesiones" className={h2}>Una sesión para cada etapa de tu embarazo.</h2>
          <ol className="grid gap-4">
            {SESIONES.map((s, i) => (
              <Aparecer as="li" key={s.numero} retraso={Math.min(i, 4) * 0.06}>
                <details className="group rounded-xl border border-borde bg-white open:shadow-[0_8px_32px_rgba(47,42,39,0.08)]">
                  <summary className="flex cursor-pointer list-none items-start gap-5 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento sm:items-center sm:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-4xl leading-none text-acento/40" aria-hidden="true">
                      {String(s.numero).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-acento">
                        Sesión {s.numero} · {s.semanas} · {s.responsable}
                      </span>
                      <span className="mt-1 block text-lg font-semibold leading-snug">{s.titulo}</span>
                    </span>
                    <span
                      className="mt-1 text-2xl font-light leading-none text-suave transition-transform group-open:rotate-45 sm:mt-0"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="grid gap-8 border-t border-borde px-5 pb-6 pt-5 sm:px-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-suave">Lo que aprenderás</h3>
                      <ul className="space-y-2 text-[14px] leading-relaxed">
                        {s.aprenderas.map((a) => (
                          <li key={a} className="flex gap-2">
                            <span className="text-acento" aria-hidden="true">✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-suave">Para llevar a casa</h3>
                      <ul className="space-y-2 text-[14px] leading-relaxed text-suave">
                        {s.mensajes.map((m) => (
                          <li key={m} className="border-l-2 border-acento/40 pl-3">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              </Aparecer>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-[13px] font-light leading-relaxed text-suave">
            Cada sesión dura 2 horas y combina conversación, práctica y un repaso al final. Si te pierdes una, puedes tomarla en el
            siguiente ciclo del curso. Consulta los horarios y sedes con tu IPS.
          </p>
        </section>

        {/* Signos de alarma */}
        <section id="alarma" aria-labelledby="titulo-alarma" className="scroll-mt-20 bg-tinta px-[6%] py-24 text-white">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Aparecer>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento-claro">No esperes al próximo control</p>
              <h2 id="titulo-alarma" className="mb-5 font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.1]">
                Signos de alarma en el embarazo.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-white/75">
                Si tienes alguno de estos signos, ve a urgencias de inmediato o llama al <strong className="text-white">123</strong>.
              </p>
            </Aparecer>
            <Aparecer retraso={0.15}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {SIGNOS_ALARMA.map((signo) => (
                  <li key={signo} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-[14px] leading-snug">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-acento-claro" aria-hidden="true" />
                    {signo}
                  </li>
                ))}
              </ul>
            </Aparecer>
          </div>
        </section>

        {/* Material para facilitadores */}
        <section id="facilitadores" aria-labelledby="titulo-facilitadores" className="scroll-mt-20 px-[6%] py-24">
          <p className={eyebrow}>Para el equipo de salud</p>
          <h2 id="titulo-facilitadores" className={h2}>Guiones de las sesiones.</h2>
          <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-suave">
            Guiones completos para enfermería y psicología: objetivos, agenda minuto a minuto, dinámicas, pre-test y post-test, notas para
            el facilitador y referencias. Ajustados a la Resolución 3280 de 2018 (Ruta Materno Perinatal).
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SESIONES.map((s) => (
              <li key={s.numero}>
                <a
                  href={s.guion}
                  download
                  className="group flex h-full items-start gap-3 rounded-lg border border-borde bg-white p-4 transition-colors hover:border-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
                >
                  <Download className="mt-0.5 h-4 w-4 shrink-0 text-acento" aria-hidden="true" />
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-suave">Sesión {s.numero}</span>
                    <span className="block text-[14px] font-semibold group-hover:text-acento">{s.titulo}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-3xl rounded-xl border border-borde bg-arena p-6">
            <h3 className="mb-2 flex items-center gap-2 text-[15px] font-semibold">
              <Baby className="h-4 w-4 text-acento" aria-hidden="true" /> Fuentes
            </h3>
            <p className="text-[13px] leading-relaxed text-suave">
              Ministerio de Salud y Protección Social, Resolución 3280 de 2018 (modificada por la Res. 276 de 2019). Carvajal J, Ralph C.
              Manual de Obstetricia y Ginecología, 8.ª ed., 2017. Ley 2244 de 2022. Ley 1980 de 2019. OMS. Material complementario de la
              revista Creciendo Juntos (2026), parafraseado y citado.
            </p>
          </div>
          <p className="mt-10 text-[13px] font-light text-suave">
            Contenido educativo revisado por un médico. No reemplaza tus controles prenatales ni la valoración de tu equipo de salud.{' '}
            <Link className="font-semibold text-acento underline-offset-4 hover:underline" href="/#revision">
              Quién revisa el contenido
            </Link>
            .
          </p>
        </section>
      </main>
      <PiePagina />
    </>
  );
}
