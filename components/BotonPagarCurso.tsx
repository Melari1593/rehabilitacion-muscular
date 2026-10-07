'use client';

import { useFormStatus } from 'react-dom';
import { pagarCurso } from '@/app/actions';

function Boton({ etiqueta, abriendo }: { etiqueta: string; abriendo: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-tinta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? abriendo : etiqueta}
    </button>
  );
}

// Envía al Web Checkout de Wompi. El monto no viaja desde el navegador: el servidor lo toma del catálogo.
export function BotonPagarCurso({
  slug,
  activo,
  idioma,
  textos,
}: {
  slug: string;
  activo: boolean;
  idioma: string;
  textos: { comprar: string; abriendo: string; pronto: string };
}) {
  if (!activo) {
    return (
      <button type="button" disabled className="w-full cursor-not-allowed rounded-lg border border-borde px-6 py-3 text-sm font-semibold text-suave">
        {textos.pronto}
      </button>
    );
  }
  return (
    <form action={pagarCurso}>
      <input type="hidden" name="curso" value={slug} />
      <input type="hidden" name="idioma" value={idioma} />
      <Boton etiqueta={textos.comprar} abriendo={textos.abriendo} />
    </form>
  );
}
