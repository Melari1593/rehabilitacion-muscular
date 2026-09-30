import { BotonPagarCurso } from './BotonPagarCurso';
import { formatearCOP, type Curso } from '@/lib/cursos';

export function TarjetaCurso({ curso, activo }: { curso: Curso; activo: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-borde bg-white transition-shadow hover:shadow-[0_8px_32px_rgba(47,42,39,0.10)]">
      <div className="flex aspect-[4/3] items-center justify-center bg-fondo p-8 text-center font-serif text-2xl text-tinta/35" aria-hidden="true">
        {curso.titulo}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="w-fit rounded-full bg-acento/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-acento">Curso en línea</span>
        <h3 className="text-[17px] font-semibold leading-snug">{curso.titulo}</h3>
        <p className="text-sm text-suave">{curso.resumen}</p>
        <p className="mt-auto pt-2 text-xl font-semibold">
          {formatearCOP(curso.precioCOP)} <span className="text-xs font-normal text-suave">COP</span>
        </p>
        <BotonPagarCurso slug={curso.slug} activo={activo} />
      </div>
    </article>
  );
}
