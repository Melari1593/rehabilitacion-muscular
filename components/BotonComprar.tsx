'use client';

import { useId } from 'react';
import { useFormStatus } from 'react-dom';
import { comprar } from '@/app/actions';

type OpcionVariante = { id: string; nombre: string; disponible: boolean };

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

// Envía al checkout de Shopify. Si el producto tiene varias variantes (color, talla),
// el cliente debe elegir una antes de comprar. Sin variantes disponibles, el botón queda desactivado.
export function BotonComprar({ variantes, opciones, etiqueta = 'Comprar' }: { variantes: OpcionVariante[]; opciones: string[]; etiqueta?: string }) {
  const idSelector = useId();
  const disponibles = variantes.filter((v) => v.disponible);
  if (disponibles.length === 0) {
    return (
      <button type="button" disabled className="w-full cursor-not-allowed rounded-lg border border-borde px-6 py-3 text-sm font-semibold text-suave">
        Agotado
      </button>
    );
  }
  return (
    <form action={comprar} className="flex flex-col gap-3">
      {variantes.length > 1 ? (
        <>
          <label htmlFor={idSelector} className="text-xs font-semibold text-suave">
            {opciones.length > 0 ? opciones.map((o, i) => (i ? o.toLowerCase() : o)).join(' y ') : 'Opción'}
          </label>
          <select
            id={idSelector}
            name="varianteId"
            required
            defaultValue=""
            className="w-full rounded-lg border border-borde bg-white px-3 py-2.5 text-sm text-tinta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {variantes.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.disponible}>
                {v.nombre}
                {v.disponible ? '' : ' (agotado)'}
              </option>
            ))}
          </select>
        </>
      ) : (
        <input type="hidden" name="varianteId" value={disponibles[0].id} />
      )}
      <Boton etiqueta={etiqueta} />
    </form>
  );
}
