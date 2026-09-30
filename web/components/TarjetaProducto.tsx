import Image from 'next/image';
import { BotonComprar } from './BotonComprar';
import { formatearPrecio, type Producto } from '@/lib/shopify';

export function TarjetaProducto({ producto, etiqueta }: { producto: Producto; etiqueta: string }) {
  const titulo = producto.titulo.replace(/^Curso:\s*/, '');
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-borde bg-white transition-shadow hover:shadow-[0_8px_32px_rgba(47,42,39,0.10)]">
      <div className="relative aspect-square bg-arena">
        {producto.imagen ? (
          <Image
            src={producto.imagen.url}
            alt={producto.imagen.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center font-serif text-2xl text-tinta/30" aria-hidden="true">
            {titulo}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="w-fit rounded-full bg-acento/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-acento">{etiqueta}</span>
        <h3 className="text-[17px] font-semibold leading-snug">{titulo}</h3>
        <p className="mt-auto pt-2 text-xl font-semibold">{formatearPrecio(producto.precio)}</p>
        <BotonComprar varianteId={producto.varianteId} disponible={producto.disponible} />
      </div>
    </article>
  );
}
