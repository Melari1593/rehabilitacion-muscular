import 'server-only';

// Cliente mínimo de la Storefront API de Shopify.
// Solo se usa en el servidor: el token nunca llega al navegador.

const DOMINIO = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION ?? '2026-07';

export const MODO_EJEMPLO = process.env.MOCK_CATALOG === '1';

export type Producto = {
  id: string;
  handle: string;
  titulo: string;
  descripcion: string;
  imagen: { url: string; alt: string; ancho: number; alto: number } | null;
  precio: { monto: string; moneda: string };
  varianteId: string | null;
  disponible: boolean;
};

type RespuestaGraphQL<T> = { data?: T; errors?: { message: string }[] };

async function storefront<T>(query: string, variables: Record<string, unknown>, cache: RequestCache | 'isr' = 'isr'): Promise<T> {
  if (!DOMINIO || !TOKEN) {
    throw new Error('Faltan SHOPIFY_STORE_DOMAIN o SHOPIFY_STOREFRONT_TOKEN');
  }
  const res = await fetch(`https://${DOMINIO}/api/${VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
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
      title
      products(first: $first) {
        nodes {
          id
          handle
          title
          description
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 1) { nodes { id availableForSale } }
        }
      }
    }
  }
`;

type NodoProducto = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string; altText: string | null; width: number; height: number } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: { id: string; availableForSale: boolean }[] };
};

export async function obtenerColeccion(handle: string, cantidad = 9): Promise<Producto[]> {
  if (MODO_EJEMPLO) return ejemplo(handle);
  try {
    const data = await storefront<{ collection: { products: { nodes: NodoProducto[] } } | null }>(
      QUERY_COLECCION,
      { handle, first: cantidad },
    );
    return (data.collection?.products.nodes ?? []).map((p) => ({
      id: p.id,
      handle: p.handle,
      titulo: p.title,
      descripcion: p.description,
      imagen: p.featuredImage
        ? { url: p.featuredImage.url, alt: p.featuredImage.altText ?? p.title, ancho: p.featuredImage.width, alto: p.featuredImage.height }
        : null,
      precio: { monto: p.priceRange.minVariantPrice.amount, moneda: p.priceRange.minVariantPrice.currencyCode },
      varianteId: p.variants.nodes[0]?.id ?? null,
      disponible: p.variants.nodes[0]?.availableForSale ?? false,
    }));
  } catch (error) {
    // Si Shopify no responde, la página se muestra igual con el mensaje "Muy pronto".
    console.error(`No se pudo cargar la colección ${handle}:`, error);
    return [];
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

// Crea un carrito en Shopify y devuelve la URL del checkout de Shopify,
// donde el cliente paga con las pasarelas activadas en la tienda.
export async function crearCheckout(varianteId: string, cantidad = 1): Promise<string> {
  const data = await storefront<{
    cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
  }>(MUTATION_CARRITO, { lines: [{ merchandiseId: varianteId, quantity: cantidad }] }, 'no-store');
  const { cart, userErrors } = data.cartCreate;
  if (!cart || userErrors.length) {
    throw new Error(userErrors.map((e) => e.message).join('; ') || 'No se pudo crear el carrito');
  }
  return cart.checkoutUrl;
}

export function formatearPrecio({ monto, moneda }: Producto['precio']): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: moneda, minimumFractionDigits: 2 }).format(Number(monto));
}

// Datos de ejemplo para desarrollo local sin token (títulos y precios reales de la tienda).
function ejemplo(handle: string): Producto[] {
  const base = (id: number, titulo: string, monto: string): Producto => ({
    id: `ejemplo-${id}`,
    handle: `ejemplo-${id}`,
    titulo,
    descripcion: '',
    imagen: null,
    precio: { monto, moneda: 'USD' },
    varianteId: null,
    disponible: false,
  });
  if (handle === process.env.SHOPIFY_COLECCION_CURSOS) {
    return [
      base(1, 'Curso: Espalda sana para quien trabaja sentado', '14.90'),
      base(2, 'Curso: Rodillas fuertes, prevención y cuidado', '14.90'),
      base(3, 'Curso: Automasaje y recuperación muscular', '14.90'),
      base(4, 'Curso: Fortalece en casa con bandas elásticas', '14.90'),
      base(5, 'Curso: Frío o calor, cómo manejar molestias musculares en casa', '14.90'),
    ];
  }
  return [
    base(11, 'CLOUD STEPS - Tu Compañero Infatigable', '46.99'),
    base(12, 'COMFORT STEPS', '45.99'),
  ];
}
