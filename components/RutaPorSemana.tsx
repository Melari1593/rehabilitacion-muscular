'use client';

import { useId, useState } from 'react';
import { AlertTriangle, BookOpen, Route, Users } from 'lucide-react';
import type { Idioma } from '@/components/Encabezado';
import {
  GUIONES_RUTA,
  GUIONES_RUTA_EN,
  SEMANA_MAXIMA,
  SEMANA_MINIMA,
  SESIONES,
  SESIONES_EN,
  rutaPorSemana,
  type ModoPaso,
  type PasoRuta,
} from '@/lib/cursoPrenatal';

// Selector "¿En qué semana estás?": muestra el orden recomendado de sesiones
// según la semana de gestación, para quien empieza el curso tarde. No guarda
// la semana en ningún lado.

const TEXTOS = {
  es: {
    etiqueta: 'Tu ruta en el curso',
    titulo: '¿En qué semana de embarazo estás?',
    intro:
      'Si empiezas el curso tarde, no tienes que ver las sesiones en orden. Escribe tu semana y te mostramos qué tomar primero para llegar preparada al parto.',
    campo: 'Semana de embarazo',
    ayuda: `Escribe un número entre ${SEMANA_MINIMA} y ${SEMANA_MAXIMA}.`,
    fueraDeRango: `Escribe una semana entre ${SEMANA_MINIMA} y ${SEMANA_MAXIMA}.`,
    resultado: (s: number) => `Tu ruta desde la semana ${s}`,
    sesion: 'Sesión',
    modos: {
      grupo: 'En grupo',
      resumen: 'Resumen al inicio de tu primera sesión',
      lectura: 'Material para leer en casa',
      posparto: 'En tu control posparto',
    } satisfies Record<ModoPaso, string>,
    reglasTitulo: 'Para todas, sin importar la semana',
    reglas: [
      'Los signos de alarma se repasan en la primera sesión que tomes.',
      'Si todavía no estás en control prenatal, inscríbete ya: en esa primera consulta se hacen todos los exámenes y valoraciones pendientes.',
      'En tu primer contacto te preguntarán por tu ánimo y por violencia, aunque no tomes la sesión 1.',
    ],
    semana41: 'Si ya pasaste la semana 40, en tu control te explicarán las opciones. Desde la semana 41 consulta sin esperar: ningún embarazo debe pasar de la semana 42.',
    verSesion: 'Ver la sesión',
  },
  en: {
    etiqueta: 'Your path through the course',
    titulo: 'How many weeks pregnant are you?',
    intro:
      'If you start the course late, you don’t have to follow the sessions in order. Enter your week and we’ll show you what to take first so you’re ready for the birth.',
    campo: 'Week of pregnancy',
    ayuda: `Enter a number between ${SEMANA_MINIMA} and ${SEMANA_MAXIMA}.`,
    fueraDeRango: `Enter a week between ${SEMANA_MINIMA} and ${SEMANA_MAXIMA}.`,
    resultado: (s: number) => `Your path from week ${s}`,
    sesion: 'Session',
    modos: {
      grupo: 'In a group',
      resumen: 'Summary at the start of your first session',
      lectura: 'Reading material for home',
      posparto: 'At your postpartum check-up',
    } satisfies Record<ModoPaso, string>,
    reglasTitulo: 'For everyone, whatever the week',
    reglas: [
      'Warning signs are reviewed in the first session you attend.',
      'If you are not yet in prenatal care, sign up now: all pending tests and assessments are done at that first visit.',
      'At your first contact you will be asked about your mood and about violence, even if you skip session 1.',
    ],
    semana41: 'If you are past week 40, your health team will explain your options at your check-up. From week 41, seek care without waiting: no pregnancy should go beyond week 42.',
    verSesion: 'See the session',
  },
} as const;

const ICONO_MODO: Record<ModoPaso, typeof Users> = {
  grupo: Users,
  resumen: AlertTriangle,
  lectura: BookOpen,
  posparto: Route,
};

export function RutaPorSemana({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma];
  const sesiones = idioma === 'en' ? SESIONES_EN : SESIONES;
  const guiones = idioma === 'en' ? GUIONES_RUTA_EN : GUIONES_RUTA;
  const idCampo = useId();
  const idAyuda = useId();
  const [valor, setValor] = useState('');

  const semana = valor.trim() === '' ? undefined : Number(valor);
  const tramo = semana === undefined ? undefined : rutaPorSemana(semana);
  const invalida = semana !== undefined && !tramo;

  const describir = (paso: PasoRuta) => {
    if ('guion' in paso) {
      const g = guiones.find((x) => x.clave === paso.guion);
      return { titulo: g?.titulo ?? '', ancla: undefined };
    }
    const s = sesiones.find((x) => x.numero === paso.sesion);
    return { titulo: `${t.sesion} ${paso.sesion}: ${s?.titulo ?? ''}`, ancla: `#sesion-${paso.sesion}` };
  };

  return (
    <section aria-labelledby="titulo-ruta" className="px-[6%] py-20">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">{t.etiqueta}</p>
      <h2 id="titulo-ruta" className="mb-4 max-w-3xl font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.1]">
        {t.titulo}
      </h2>
      <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-suave">{t.intro}</p>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <label htmlFor={idCampo} className="mb-2 block text-[13px] font-semibold">
            {t.campo}
          </label>
          <input
            id={idCampo}
            type="number"
            inputMode="numeric"
            min={SEMANA_MINIMA}
            max={SEMANA_MAXIMA}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            aria-describedby={idAyuda}
            aria-invalid={invalida || undefined}
            className="w-32 rounded-lg border-[1.5px] border-borde bg-white px-4 py-3 text-lg focus-visible:border-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
          />
          <p id={idAyuda} className={`mt-2 text-[13px] ${invalida ? 'font-semibold text-acento' : 'text-suave'}`}>
            {invalida ? t.fueraDeRango : t.ayuda}
          </p>

          <div className="mt-8 rounded-xl border border-borde bg-arena p-5">
            <h3 className="mb-3 text-[14px] font-semibold">{t.reglasTitulo}</h3>
            <ul className="space-y-2 text-[13px] leading-relaxed text-suave">
              {t.reglas.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-acento" aria-hidden="true">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-live="polite">
          {tramo && semana !== undefined && (
            <>
              <h3 className="mb-4 text-[15px] font-semibold">{t.resultado(semana)}</h3>
              <ol className="grid gap-3">
                {tramo.pasos.map((paso, i) => {
                  const { titulo, ancla } = describir(paso);
                  const Icono = ICONO_MODO[paso.modo];
                  return (
                    <li key={`${i}-${titulo}`} className="flex items-start gap-4 rounded-xl border border-borde bg-white p-4">
                      <span className="font-serif text-2xl leading-none text-acento/50" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-acento">
                          <Icono className="h-3.5 w-3.5" aria-hidden="true" />
                          {t.modos[paso.modo]}
                        </span>
                        <span className="mt-1 block text-[15px] font-semibold leading-snug">{titulo}</span>
                        {ancla && (
                          <a
                            href={ancla}
                            className="mt-1 inline-block text-[13px] font-semibold text-acento underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
                          >
                            {t.verSesion}
                          </a>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {semana >= 40 && (
                <p className="mt-4 flex gap-2 rounded-xl border border-acento/30 bg-acento/5 p-4 text-[13px] leading-relaxed">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-acento" aria-hidden="true" />
                  {t.semana41}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
