'use client';

// Explorador de /ejercicios-por-musculo: modelo 3D + lista de grupos + ejercicios del grupo elegido.
// El grupo elegido queda en la dirección (?grupo=cuadriceps) para poder compartir el enlace.
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { CURSOS, ejerciciosDeGrupo, type Ejercicio, type Papel } from '@/lib/ejercicios';
import { GRUPOS, GRUPO_POR_ID, type GrupoId } from '@/lib/gruposMusculares';

const Musculos3D = dynamic(() => import('@/components/Musculos3D'), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-suave">Cargando el modelo 3D…</div>,
});

const esGrupo = (v: string | null): v is GrupoId => !!v && v in GRUPO_POR_ID;

export function ExploradorMusculos() {
  const [grupo, setGrupo] = useState<GrupoId | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    const inicial = new URLSearchParams(window.location.search).get('grupo');
    if (esGrupo(inicial)) setGrupo(inicial);
  }, []);

  const elegir = useCallback((g: GrupoId | null) => {
    setGrupo(g);
    setAviso(null);
    const url = new URL(window.location.href);
    if (g) url.searchParams.set('grupo', g);
    else url.searchParams.delete('grupo');
    window.history.replaceState(null, '', url);
  }, []);

  const alTocar = useCallback(
    (g: GrupoId | null, tocoMusculo: boolean) => {
      if (g) elegir(g);
      else if (tocoMusculo) setAviso('Ese músculo todavía no tiene ejercicios en nuestros cursos. Prueba con uno de los resaltados.');
    },
    [elegir],
  );

  const activo = grupo ? GRUPO_POR_ID[grupo] : null;
  const ejercicios = grupo ? ejerciciosDeGrupo(grupo) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      {/* Modelo 3D */}
      <div className="lg:sticky lg:top-[88px] lg:self-start">
        <div className="relative h-[440px] overflow-hidden rounded-xl border border-borde bg-arena sm:h-[540px] lg:h-[calc(100vh-120px)] lg:max-h-[760px]">
          <Musculos3D grupo={grupo} onTocar={alTocar} />
          {grupo && (
            <button
              type="button"
              onClick={() => elegir(null)}
              className="absolute right-3 top-3 rounded-md border border-borde bg-white/90 px-3 py-1.5 text-xs font-semibold text-tinta backdrop-blur hover:border-acento hover:text-acento"
            >
              Ver todo el cuerpo
            </button>
          )}
          <p className="pointer-events-none absolute bottom-3 left-3 rounded bg-white/80 px-2 py-1 text-[11px] text-suave backdrop-blur">
            Arrastra para girar · Toca un músculo
          </p>
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-suave" aria-label="Colores del modelo">
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#56704a]" />Grupo elegido</li>
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#c48d7f]" />Con ejercicios</li>
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#dcc6bd]" />Sin ejercicios todavía</li>
        </ul>
        {aviso && (
          <p className="mt-3 rounded-lg border border-borde bg-white px-4 py-3 text-sm text-suave" role="status">
            {aviso}
          </p>
        )}
        {activo && (
          <a href="#ejercicios-del-grupo" className="mt-3 block text-sm font-semibold text-acento lg:hidden">
            {activo.nombre}: ver {ejercicios.length} ejercicios ↓
          </a>
        )}
      </div>

      {/* Grupos y ejercicios */}
      <div>
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">Elige un grupo muscular</h2>
        <ul className="flex flex-wrap gap-2">
          {GRUPOS.map((g) => {
            const elegido = g.id === grupo;
            return (
              <li key={g.id}>
                <button
                  type="button"
                  aria-pressed={elegido}
                  onClick={() => elegir(elegido ? null : g.id)}
                  className={`rounded-full border px-3.5 py-2 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento ${
                    elegido ? 'border-acento bg-acento text-white' : 'border-borde bg-white text-tinta hover:border-acento hover:text-acento'
                  }`}
                >
                  {g.nombre}
                  <span className={`ml-1.5 text-[11px] ${elegido ? 'text-white/80' : 'text-suave'}`}>{ejerciciosDeGrupo(g.id).length}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div id="ejercicios-del-grupo" className="mt-8 scroll-mt-24" aria-live="polite">
          {activo ? (
            <>
              <h3 className="font-serif text-[clamp(28px,3.4vw,40px)] leading-tight">{activo.nombre}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-suave">{activo.funcion}</p>
              <p className="mt-3 text-[13px] text-suave">
                <span className="font-semibold text-tinta">Incluye:</span> {activo.musculos.join(', ')}.
              </p>
              {activo.nota && <p className="mt-2 text-[12px] italic text-suave">{activo.nota}</p>}
              <ListaEjercicios titulo="Ejercicios para este grupo" ejercicios={ejercicios.filter((e) => e.papel === 'principal')} />
              <ListaEjercicios titulo="También lo trabajan" ejercicios={ejercicios.filter((e) => e.papel === 'apoyo')} />
              <p className="mt-6 text-[13px] text-suave">
                Las dosis, el progreso semana a semana y el video de cada ejercicio están en los{' '}
                <Link className="font-semibold text-acento underline-offset-4 hover:underline" href="/#cursos">
                  cursos en línea
                </Link>
                .
              </p>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-borde bg-white px-6 py-8">
              <p className="font-serif text-2xl">¿Qué músculo quieres trabajar?</p>
              <p className="mt-2 text-sm leading-relaxed text-suave">
                Toca un músculo en el modelo o elige un grupo de la lista. Verás qué hace, qué ejercicios de nuestros cursos lo trabajan y cómo
                hacerlos bien.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListaEjercicios({ titulo, ejercicios }: { titulo: string; ejercicios: (Ejercicio & { papel: Papel })[] }) {
  if (!ejercicios.length) return null;
  return (
    <section className="mt-8">
      <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento">
        {titulo} · {ejercicios.length}
      </h4>
      <ul className="space-y-3">
        {ejercicios.map((e) => (
          <li key={`${e.curso}-${e.leccion}`} className="rounded-xl border border-borde bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-[15px] font-semibold">{e.nombre}</p>
              <span className="rounded-full bg-arena px-2.5 py-0.5 text-[11px] font-semibold text-suave">{e.tipo}</span>
            </div>
            <p className="mt-0.5 text-[12px] text-suave">
              Curso {CURSOS[e.curso].corto} · lección {e.leccion}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{e.como}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-suave">
              <span className="font-semibold text-acento">Clave:</span> {e.clave}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
