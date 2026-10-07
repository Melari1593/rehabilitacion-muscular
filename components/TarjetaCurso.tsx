import { BotonPagarCurso } from './BotonPagarCurso';
import { VideoCurso } from './VideoCurso';
import { formatearCOP, type Curso } from '@/lib/cursos';
import type { Diccionario } from '@/lib/diccionarios';
import type { Idioma } from '@/lib/i18n';

export function TarjetaCurso({ curso, activo, lang, t }: { curso: Curso; activo: boolean; lang: Idioma; t: Diccionario }) {
  const { titulo, resumen, alt } = t.catalogo[curso.slug];
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-borde bg-white transition-shadow hover:shadow-[0_8px_32px_rgba(47,42,39,0.10)]">
      {curso.medio ? (
        <div className="aspect-video bg-arena">
          <VideoCurso {...curso.medio} alt={alt ?? titulo} />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-fondo p-8 text-center font-serif text-2xl text-tinta/35" aria-hidden="true">
          {titulo}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="w-fit rounded-full bg-acento/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-acento">{t.cursos.chip}</span>
        <h3 className="text-[17px] font-semibold leading-snug">{titulo}</h3>
        <p className="text-sm text-suave">{resumen}</p>
        <p className="mt-auto pt-2 text-xl font-semibold">{formatearCOP(curso.precioCOP, lang)}</p>
        <BotonPagarCurso
          slug={curso.slug}
          activo={activo}
          idioma={lang}
          textos={{ comprar: t.cursos.comprar, abriendo: t.cursos.abriendo, pronto: t.cursos.pronto }}
        />
      </div>
    </article>
  );
}
