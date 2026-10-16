import Link from 'next/link';
import { AlertTriangle, Baby, CalendarCheck, Download, HeartHandshake, Languages, Users } from 'lucide-react';
import { Aparecer } from '@/components/Aparecer';
import { Encabezado, type Idioma } from '@/components/Encabezado';
import { PiePagina } from '@/components/PiePagina';
import { SESIONES, SESIONES_EN, SIGNOS_ALARMA, SIGNOS_ALARMA_EN } from '@/lib/cursoPrenatal';

// Página del curso de preparación para la maternidad y la paternidad, en español
// (/control-prenatal) e inglés (/en/prenatal-course). El contenido clínico es el mismo.

const TEXTOS = {
  es: {
    otroIdioma: { href: '/en/prenatal-course', texto: 'Read in English', lang: 'en' },
    etiqueta: 'Control prenatal · Curso de preparación',
    titulo: 'Prepárate para la maternidad y la paternidad.',
    intro:
      'Siete sesiones que acompañan tu control prenatal, desde las primeras semanas hasta la llegada del bebé: emociones, cambios del embarazo, vínculo, parto, cuidados del recién nacido, lactancia y crianza.',
    verSesiones: 'Ver las sesiones',
    verAlarma: 'Signos de alarma',
    claves: [
      { titulo: '7 sesiones', texto: '1 antes de la semana 14, 3 en el segundo trimestre y 3 en el tercero.' },
      { titulo: 'Con tu acompañante', texto: 'Tu pareja, tu familia o la persona más cercana a ti pueden asistir contigo.' },
      { titulo: 'Teoría y práctica', texto: 'Respiración, posiciones, piso pélvico, baño del bebé y agarre para amamantar.' },
    ],
    programa: 'Programa',
    tituloSesiones: 'Una sesión para cada etapa de tu embarazo.',
    sesion: 'Sesión',
    aprenderas: 'Lo que aprenderás',
    paraCasa: 'Para llevar a casa',
    notaSesiones:
      'Cada sesión dura 2 horas y combina conversación, práctica y un repaso al final. Si te pierdes una, puedes tomarla en el siguiente ciclo del curso. Consulta los horarios y sedes con tu IPS.',
    alarmaEtiqueta: 'No esperes al próximo control',
    alarmaTitulo: 'Signos de alarma en el embarazo.',
    alarmaAntes: 'Si tienes alguno de estos signos, ve a urgencias de inmediato o llama al ',
    alarmaDespues: '.',
    equipo: 'Para el equipo de salud',
    tituloGuiones: 'Guiones de las sesiones.',
    introGuiones:
      'Guiones completos para enfermería y psicología: objetivos, agenda minuto a minuto, dinámicas, pre-test y post-test, notas para el facilitador y referencias. Ajustados a la Resolución 3280 de 2018 (Ruta Materno Perinatal).',
    fuentes: 'Fuentes',
    textoFuentes:
      'Ministerio de Salud y Protección Social, Resolución 3280 de 2018 (modificada por la Res. 276 de 2019). Carvajal J, Ralph C. Manual de Obstetricia y Ginecología, 8.ª ed., 2017. Ley 2244 de 2022. Ley 1980 de 2019. OMS. Material complementario de la revista Creciendo Juntos (2026), parafraseado y citado.',
    aviso: 'Contenido educativo revisado por un médico. No reemplaza tus controles prenatales ni la valoración de tu equipo de salud.',
    quienRevisa: 'Quién revisa el contenido',
  },
  en: {
    otroIdioma: { href: '/control-prenatal', texto: 'Leer en español', lang: 'es' },
    etiqueta: 'Prenatal care · Childbirth preparation course',
    titulo: 'Get ready for motherhood and fatherhood.',
    intro:
      'Seven sessions that go along with your prenatal check-ups, from the first weeks until your baby arrives: emotions, body changes, bonding, labor, newborn care, breastfeeding and parenting.',
    verSesiones: 'See the sessions',
    verAlarma: 'Warning signs',
    claves: [
      { titulo: '7 sessions', texto: '1 before week 14, 3 in the second trimester and 3 in the third.' },
      { titulo: 'Bring a companion', texto: 'Your partner, a family member or the person closest to you can attend with you.' },
      { titulo: 'Theory and practice', texto: 'Breathing, positions, pelvic floor, bathing the baby and breastfeeding latch.' },
    ],
    programa: 'Program',
    tituloSesiones: 'One session for each stage of your pregnancy.',
    sesion: 'Session',
    aprenderas: 'What you will learn',
    paraCasa: 'Take-home messages',
    notaSesiones:
      'Each session lasts 2 hours and combines conversation, hands-on practice and a review at the end. If you miss one, you can take it in the next round of the course. Ask your health provider (IPS) for schedules and locations. Sessions are taught in Spanish.',
    alarmaEtiqueta: 'Don’t wait for your next check-up',
    alarmaTitulo: 'Warning signs during pregnancy.',
    alarmaAntes: 'If you have any of these signs, go to the emergency room right away or call ',
    alarmaDespues: ' (emergency line in Colombia).',
    equipo: 'For health professionals',
    tituloGuiones: 'Session scripts.',
    introGuiones:
      'Complete scripts for nursing and psychology staff: objectives, minute-by-minute agenda, activities, pre- and post-tests, facilitator notes and references. Aligned with Colombian Resolution 3280 of 2018 (Maternal and Perinatal Care Pathway). The scripts are available in Spanish only.',
    fuentes: 'Sources',
    textoFuentes:
      'Colombian Ministry of Health and Social Protection, Resolution 3280 of 2018 (amended by Resolution 276 of 2019). Carvajal J, Ralph C. Manual de Obstetricia y Ginecología, 8th ed., 2017. Colombian Law 2244 of 2022. Colombian Law 1980 of 2019. World Health Organization. Supplementary material from Creciendo Juntos magazine (2026), paraphrased and cited.',
    aviso: 'Educational content reviewed by a physician. It does not replace your prenatal check-ups or your health team’s assessment.',
    quienRevisa: 'Who reviews the content',
  },
} as const;

const ICONOS_CLAVES = [CalendarCheck, Users, HeartHandshake];
const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento';
const h2 = 'mb-10 max-w-3xl font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.1]';

export function CursoPrenatal({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma];
  const sesiones = idioma === 'en' ? SESIONES_EN : SESIONES;
  const signos = idioma === 'en' ? SIGNOS_ALARMA_EN : SIGNOS_ALARMA;

  return (
    <>
      <Encabezado idioma={idioma} />
      <main id="contenido" lang={idioma === 'en' ? 'en' : undefined} className="pt-[68px]">
        {/* Portada */}
        <section aria-labelledby="titulo" className="px-[6%] pb-16 pt-14">
          <Aparecer alCargar>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full bg-acento/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-acento">
                {t.etiqueta}
              </span>
              <Link
                href={t.otroIdioma.href}
                hrefLang={t.otroIdioma.lang}
                lang={t.otroIdioma.lang}
                className="inline-flex items-center gap-1.5 rounded-full border border-borde px-3 py-1.5 text-[12px] font-semibold text-suave transition-colors hover:border-acento hover:text-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
              >
                <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                {t.otroIdioma.texto}
              </Link>
            </div>
            <h1 id="titulo" className="my-5 max-w-4xl font-serif text-[clamp(36px,5.5vw,72px)] leading-[1.02]">
              {t.titulo}
            </h1>
          </Aparecer>
          <Aparecer alCargar retraso={0.15}>
            <p className="max-w-2xl text-base leading-relaxed text-suave">{t.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#sesiones"
                className="inline-block rounded-lg border-[1.5px] border-tinta bg-tinta px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-acento hover:bg-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
              >
                {t.verSesiones}
              </a>
              <a
                href="#alarma"
                className="inline-block rounded-lg border-[1.5px] border-tinta px-7 py-3.5 text-sm font-semibold text-tinta transition-colors hover:border-acento hover:text-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
              >
                {t.verAlarma}
              </a>
            </div>
          </Aparecer>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {t.claves.map(({ titulo, texto }, i) => {
              const Icono = ICONOS_CLAVES[i];
              return (
                <Aparecer as="li" key={titulo} retraso={0.25 + i * 0.08} className="rounded-xl border border-borde bg-white p-5">
                  <Icono className="h-5 w-5 text-acento" aria-hidden="true" />
                  <h2 className="mb-1 mt-3 text-[15px] font-semibold">{titulo}</h2>
                  <p className="text-[13px] leading-relaxed text-suave">{texto}</p>
                </Aparecer>
              );
            })}
          </ul>
        </section>

        {/* Sesiones */}
        <section id="sesiones" aria-labelledby="titulo-sesiones" className="scroll-mt-20 bg-arena px-[6%] py-24">
          <p className={eyebrow}>{t.programa}</p>
          <h2 id="titulo-sesiones" className={h2}>{t.tituloSesiones}</h2>
          <ol className="grid gap-4">
            {sesiones.map((s, i) => (
              <Aparecer as="li" key={s.numero} retraso={Math.min(i, 4) * 0.06}>
                <details className="group rounded-xl border border-borde bg-white open:shadow-[0_8px_32px_rgba(47,42,39,0.08)]">
                  <summary className="flex cursor-pointer list-none items-start gap-5 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento sm:items-center sm:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-4xl leading-none text-acento/40" aria-hidden="true">
                      {String(s.numero).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-acento">
                        {t.sesion} {s.numero} · {s.semanas} · {s.responsable}
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
                      <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-suave">{t.aprenderas}</h3>
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
                      <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-suave">{t.paraCasa}</h3>
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
          <p className="mt-8 max-w-3xl text-[13px] font-light leading-relaxed text-suave">{t.notaSesiones}</p>
        </section>

        {/* Signos de alarma */}
        <section id="alarma" aria-labelledby="titulo-alarma" className="scroll-mt-20 bg-tinta px-[6%] py-24 text-white">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Aparecer>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento-claro">{t.alarmaEtiqueta}</p>
              <h2 id="titulo-alarma" className="mb-5 font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.1]">
                {t.alarmaTitulo}
              </h2>
              <p className="max-w-md text-base leading-relaxed text-white/75">
                {t.alarmaAntes}
                <strong className="text-white">123</strong>
                {t.alarmaDespues}
              </p>
            </Aparecer>
            <Aparecer retraso={0.15}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {signos.map((signo) => (
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
          <p className={eyebrow}>{t.equipo}</p>
          <h2 id="titulo-facilitadores" className={h2}>{t.tituloGuiones}</h2>
          <p className="mb-8 max-w-3xl text-[15px] leading-relaxed text-suave">{t.introGuiones}</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sesiones.map((s) => (
              <li key={s.numero}>
                <a
                  href={s.guion}
                  download
                  hrefLang="es"
                  className="group flex h-full items-start gap-3 rounded-lg border border-borde bg-white p-4 transition-colors hover:border-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
                >
                  <Download className="mt-0.5 h-4 w-4 shrink-0 text-acento" aria-hidden="true" />
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-suave">
                      {t.sesion} {s.numero}
                    </span>
                    <span className="block text-[14px] font-semibold group-hover:text-acento">{s.titulo}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-3xl rounded-xl border border-borde bg-arena p-6">
            <h3 className="mb-2 flex items-center gap-2 text-[15px] font-semibold">
              <Baby className="h-4 w-4 text-acento" aria-hidden="true" /> {t.fuentes}
            </h3>
            <p className="text-[13px] leading-relaxed text-suave">{t.textoFuentes}</p>
          </div>
          <p className="mt-10 text-[13px] font-light text-suave">
            {t.aviso}{' '}
            <Link className="font-semibold text-acento underline-offset-4 hover:underline" href="/#revision">
              {t.quienRevisa}
            </Link>
            .
          </p>
        </section>
      </main>
      <PiePagina idioma={idioma} />
    </>
  );
}
