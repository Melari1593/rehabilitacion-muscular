import Image from 'next/image';
import { BotonComprar } from './BotonComprar';
import type { Diccionario } from '@/lib/diccionarios';
import type { Idioma } from '@/lib/i18n';
import { formatearPrecio, nombreVariante, type Producto } from '@/lib/shopify';

export function TarjetaProducto({ producto, lang, t }: { producto: Producto; lang: Idioma; t: Diccionario }) {
  const variantes = producto.variantes.map((v) => ({ id: v.id, nombre: nombreVariante(v.titulo, t), disponible: v.disponible }));
  const opciones = producto.opciones.map((o, i) => {
    const nombre = t.productos.opciones[o] ?? o;
    return i > 0 && lang !== 'ar' ? nombre.toLowerCase() : nombre;
  });
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
            {producto.titulo}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="w-fit rounded-full bg-acento/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-acento">{t.productos.chip}</span>
        <h3 className="text-[17px] font-semibold leading-snug">
          <a href={producto.url} className="hover:text-acento hover:underline">
            {producto.titulo}
          </a>
        </h3>
        <p className="mt-auto pt-2 text-xl font-semibold">{formatearPrecio(producto.precio, lang)}</p>
        <BotonComprar
          variantes={variantes}
          idioma={lang}
          textos={{
            comprar: t.productos.comprar,
            abriendo: t.productos.abriendo,
            agotado: t.productos.agotado,
            elige: t.productos.elige,
            etiquetaOpciones: opciones.length > 0 ? opciones.join(` ${t.productos.y} `) : t.productos.opcion,
            sufijoAgotado: t.productos.sufijoAgotado,
          }}
        />
      </div>
    </article>
  );
}
