import 'server-only';
import { RESPALDO_PRODUCTOS } from './catalogo-respaldo';

// Cliente mínimo de la Storefront API de Shopify (solo en el servidor).
// Funciona SIN token: Shopify permite leer productos y crear carritos con acceso "tokenless".
// Si se configura SHOPIFY_STOREFRONT_TOKEN (canal Headless), se usa y tiene límites más altos.

const DOMINIO = process.env.SHOPIFY_STORE_DOMAIN ?? 'ndhgpy-aw.myshopify.com';
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION ?? '2026-07';
// Dominio público de la tienda, para el enlace directo al checkout si la API no responde.
const DOMINIO_TIENDA = process.env.SHOPIFY_DOMINIO_PUBLICO ?? 'orquidbio.com';

export type Variante = { id: string; titulo: string; disponible: boolean; precio: { monto: string; moneda: string } };

export type Producto = {
  id: string;
  handle: string;
  titulo: string;
  imagen: { url: string; alt: string } | null;
  precio: { monto: string; moneda: string };
  variantes: Variante[];
  // Nombres de las opciones (ej. "Color", "Talla del calzado") cuando el producto tiene más de una variante.
  opciones: string[];
  url: string;
};

type RespuestaGraphQL<T> = { data?: T; errors?: { message: string }[] };

async function storefront<T>(query: string, variables: Record<string, unknown>, cache: RequestCache | 'isr' = 'isr'): Promise<T> {
  const res = await fetch(`https://${DOMINIO}/api/${VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(TOKEN ? { 'X-Shopify-Storefront-Access-Token': TOKEN } : {}),
    },
    body: JSON.stringify({ query, variables }),
    // El catálogo se revalida cada 5 minutos; el carrito nunca se cachea.
    ...(cache === 'isr' ? { next: { revalidate: 300 } } : { cache }),
  });
  if (!res.ok) {
    throw new Error(`Storefront API respondió ${res.status}`);
  }
  const json = (await res.json()) as RespuestaGraphQL<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data as T;
}

const QUERY_COLECCION = /* GraphQL */ `
  query Coleccion($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        nodes {
          id
          handle
          title
          onlineStoreUrl
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          options { name }
          variants(first: 50) { nodes { id title availableForSale price { amount currencyCode } } }
        }
      }
    }
  }
`;

type NodoProducto = {
  id: string;
  handle: string;
  title: string;
  onlineStoreUrl: string | null;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  options: { name: string }[];
  variants: { nodes: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } }[] };
};

// Shopify a veces guarda IDs internos como texto alternativo; en ese caso se usa el título.
const textoAlt = (alt: string | null, titulo: string) => (alt && !alt.startsWith('gid://') ? alt : titulo);

export async function obtenerColeccion(handle: string, cantidad = 12): Promise<Producto[]> {
  try {
    const data = await storefront<{ collection: { products: { nodes: NodoProducto[] } } | null }>(QUERY_COLECCION, { handle, first: cantidad });
    const productos = (data.collection?.products.nodes ?? []).map((p) => ({
      id: p.id,
      handle: p.handle,
      titulo: p.title,
      imagen: p.featuredImage ? { url: p.featuredImage.url, alt: textoAlt(p.featuredImage.altText, p.title) } : null,
      precio: { monto: p.priceRange.minVariantPrice.amount, moneda: p.priceRange.minVariantPrice.currencyCode },
      variantes: p.variants.nodes.map((v) => ({
        id: v.id,
        titulo: v.title,
        disponible: v.availableForSale,
        precio: { monto: v.price.amount, moneda: v.price.currencyCode },
      })),
      opciones: p.variants.nodes.length > 1 ? p.options.map((o) => o.name) : [],
      url: p.onlineStoreUrl ?? `https://${DOMINIO_TIENDA}/products/${p.handle}`,
    }));
    return productos.length > 0 ? productos : RESPALDO_PRODUCTOS;
  } catch (error) {
    // Si Shopify no responde, se muestra la copia del catálogo; el precio final lo confirma el checkout de Shopify.
    console.error(`No se pudo cargar la colección ${handle}; se usa el catálogo de respaldo:`, error);
    return RESPALDO_PRODUCTOS;
  }
}

const MUTATION_CARRITO = /* GraphQL */ `
  mutation CrearCarrito($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

// Enlace permanente de carrito de Shopify: lleva directo al checkout con la variante elegida.
export function enlaceCarrito(varianteId: string, cantidad = 1): string {
  const numero = varianteId.split('/').pop();
  return `https://${DOMINIO_TIENDA}/cart/${numero}:${cantidad}`;
}

// Crea un carrito en Shopify y devuelve la URL del checkout de Shopify.
// Si la API falla, usa el enlace permanente de carrito (mismo checkout, sin API).
export async function crearCheckout(varianteId: string, cantidad = 1): Promise<string> {
  try {
    const data = await storefront<{
      cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
    }>(MUTATION_CARRITO, { lines: [{ merchandiseId: varianteId, quantity: cantidad }] }, 'no-store');
    const { cart, userErrors } = data.cartCreate;
    if (cart && !userErrors.length) return cart.checkoutUrl;
    console.error('cartCreate devolvió errores:', userErrors);
  } catch (error) {
    console.error('No se pudo crear el carrito por API; se usa el enlace de carrito:', error);
  }
  return enlaceCarrito(varianteId, cantidad);
}

export function formatearPrecio({ monto, moneda }: Producto['precio']): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: moneda, minimumFractionDigits: 2 }).format(Number(monto));
}

// "negro-2 / 36" → "Negro / 36"
export function nombreVariante(titulo: string): string {
  return titulo
    .split(' / ')
    .map((parte) => parte.replace(/-\d+$/, '').replace(/^\p{L}/u, (l) => l.toUpperCase()))
    .join(' / ');
}
