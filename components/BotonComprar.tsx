'use client';

import { useId } from 'react';
import { useFormStatus } from 'react-dom';
import { comprar } from '@/app/actions';

type OpcionVariante = { id: string; nombre: string; disponible: boolean };

export type TextosCompra = { comprar: string; abriendo: string; agotado: string; elige: string; etiquetaOpciones: string; sufijoAgotado: string };

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

// Envía al checkout de Shopify. Si el producto tiene varias variantes (color, talla),
// el cliente debe elegir una antes de comprar. Sin variantes disponibles, el botón queda desactivado.
export function BotonComprar({ variantes, idioma, textos }: { variantes: OpcionVariante[]; idioma: string; textos: TextosCompra }) {
  const idSelector = useId();
  const disponibles = variantes.filter((v) => v.disponible);
  if (disponibles.length === 0) {
    return (
      <button type="button" disabled className="w-full cursor-not-allowed rounded-lg border border-borde px-6 py-3 text-sm font-semibold text-suave">
        {textos.agotado}
      </button>
    );
  }
  return (
    <form action={comprar} className="flex flex-col gap-3">
      <input type="hidden" name="idioma" value={idioma} />
      {variantes.length > 1 ? (
        <>
          <label htmlFor={idSelector} className="text-xs font-semibold text-suave">
            {textos.etiquetaOpciones}
          </label>
          <select
            id={idSelector}
            name="varianteId"
            required
            defaultValue=""
            className="w-full rounded-lg border border-borde bg-white px-3 py-2.5 text-sm text-tinta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
          >
            <option value="" disabled>
              {textos.elige}
            </option>
            {variantes.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.disponible}>
                {v.nombre}
                {v.disponible ? '' : textos.sufijoAgotado}
              </option>
            ))}
          </select>
        </>
      ) : (
        <input type="hidden" name="varianteId" value={disponibles[0].id} />
      )}
      <Boton etiqueta={textos.comprar} abriendo={textos.abriendo} />
    </form>
  );
}
