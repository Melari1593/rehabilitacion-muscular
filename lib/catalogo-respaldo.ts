import type { Producto } from './shopify';

// Copia del catálogo de la colección "Rehabilitación y bienestar" (productos activos, 7 oct 2026).
// Solo se usa si la Storefront API no responde. El precio final siempre lo confirma el checkout de Shopify.
// Para actualizarla, copia los datos desde Shopify → Productos.

const precio = (monto: string) => ({ monto, moneda: 'USD' });

export const RESPALDO_PRODUCTOS: Producto[] = [
  {
    id: 'gid://shopify/Product/10386836554010',
    handle: 'cloud-steps-tu-companero-infatigable',
    titulo: 'CLOUD STEPS - Tu Compañero Infatigable',
    imagen: { url: 'https://cdn.shopify.com/s/files/1/1012/2038/5050/files/1-2025-05-19T133213.832.png?v=1788539784', alt: 'CLOUD STEPS - Tu Compañero Infatigable' },
    precio: precio('46.99'),
    opciones: ['Color', 'Talla del calzado'],
    url: 'https://orquidbio.com/products/cloud-steps-tu-companero-infatigable',
    variantes: [
      { id: 'gid://shopify/ProductVariant/52795181695258', titulo: 'negro-2 / 36', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181760794', titulo: 'negro-2 / 37', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181793562', titulo: 'negro-2 / 38', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181826330', titulo: 'negro-2 / 39', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181859098', titulo: 'negro-2 / 40', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181891866', titulo: 'negro-2 / 41', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181924634', titulo: 'negro-2 / 42', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181957402', titulo: 'negro-2 / 43', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795181990170', titulo: 'negro-2 / 44', disponible: true, precio: precio('46.99') },
      { id: 'gid://shopify/ProductVariant/52795182022938', titulo: 'beige / 36', disponible: true, precio: precio('46.99') },
    ],
  },
  {
    id: 'gid://shopify/Product/10386836586778',
    handle: 'comfort-steps',
    titulo: 'COMFORT STEPS',
    imagen: { url: 'https://cdn.shopify.com/s/files/1/1012/2038/5050/files/1-2025-05-17T110039.548.png?v=1788539785', alt: 'COMFORT STEPS' },
    precio: precio('45.99'),
    opciones: ['Color', 'Talla del calzado'],
    url: 'https://orquidbio.com/products/comfort-steps',
    variantes: [
      { id: 'gid://shopify/ProductVariant/52795182055706', titulo: 'celeste / 35', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182088474', titulo: 'celeste / 36', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182121242', titulo: 'celeste / 37', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182154010', titulo: 'celeste / 38', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182186778', titulo: 'celeste / 39', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182219546', titulo: 'celeste / 40', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182252314', titulo: 'celeste / 41', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182285082', titulo: 'celeste / 42', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182317850', titulo: 'marron / 35', disponible: true, precio: precio('45.99') },
      { id: 'gid://shopify/ProductVariant/52795182350618', titulo: 'marron / 36', disponible: true, precio: precio('45.99') },
    ],
  },
];
