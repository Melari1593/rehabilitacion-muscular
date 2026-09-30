'use client';

import { useFormStatus } from 'react-dom';
import { pagarCurso } from '@/app/actions';

function Boton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-tinta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? 'Abriendo pago seguro…' : 'Comprar curso'}
    </button>
  );
}

// Envía al Web Checkout de Wompi. El monto no viaja desde el navegador: el servidor lo toma del catálogo.
export function BotonPagarCurso({ slug, activo }: { slug: string; activo: boolean }) {
  if (!activo) {
    return (
      <button type="button" disabled className="w-full cursor-not-allowed rounded-lg border border-borde px-6 py-3 text-sm font-semibold text-suave">
        Disponible pronto
      </button>
    );
  }
  return (
    <form action={pagarCurso}>
      <input type="hidden" name="curso" value={slug} />
      <Boton />
    </form>
  );
}
