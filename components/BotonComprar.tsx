'use client';

import { useFormStatus } from 'react-dom';
import { comprar } from '@/app/actions';

function Boton({ etiqueta }: { etiqueta: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-tinta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? 'Abriendo pago seguro…' : etiqueta}
    </button>
  );
}

// Envía al checkout de Shopify. Si el producto no está disponible, muestra un botón desactivado.
export function BotonComprar({ varianteId, disponible, etiqueta = 'Comprar' }: { varianteId: string | null; disponible: boolean; etiqueta?: string }) {
  if (!varianteId || !disponible) {
    return (
      <button type="button" disabled className="w-full cursor-not-allowed rounded-lg border border-borde px-6 py-3 text-sm font-semibold text-suave">
        Disponible pronto
      </button>
    );
  }
  return (
    <form action={comprar}>
      <input type="hidden" name="varianteId" value={varianteId} />
      <Boton etiqueta={etiqueta} />
    </form>
  );
}
