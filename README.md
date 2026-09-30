# BienEstar en Casa · sitio web (Vercel + Shopify)

Sitio en **Next.js** para publicar en **Vercel**. Muestra los cursos y productos de la tienda de Shopify, cobra con el **checkout de Shopify** e incluye la app de **análisis de postura** con la cámara.

## Estructura del repositorio
- `app/`, `components/`, `lib/`: el sitio (Next.js).
- `app/analisis-postura/`: página que muestra la app de postura.
- `public/postura/`: la app de análisis de postura (HTML + JavaScript + MediaPipe, sin dependencias). También funciona sola en `/postura/index.html`.
- `cursos/`: guiones, PDFs y prompts de los cursos.
- `tienda/`: sección para el tema de Shopify, prompt del sitio y textos legales.
- `spec.md`, `roadmap.md`, `plan.md`: documentación de la app de postura.

## Cómo funciona el pago
1. El sitio lee los productos de Shopify (Storefront API) en el servidor: títulos, fotos y precios siempre al día.
2. El cliente pulsa **Comprar**. El servidor crea un carrito en Shopify (`cartCreate`) y lo redirige a su `checkoutUrl`.
3. El cliente paga en el **checkout de Shopify** con las pasarelas activas en *Configuración → Pagos* (Wompi, Mercado Pago, PayU, ePayco, Bold…).
4. El pedido aparece en Shopify como cualquier otro pedido.

El sitio nunca ve ni guarda datos de tarjetas. El token de Shopify solo se usa en el servidor.

## 1. Preparar Shopify (una sola vez)
1. **Activar una pasarela de pago en línea**: Configuración → Pagos.
2. **Instalar el canal Headless**: en la tienda de apps de Shopify busca "Headless" (app oficial de Shopify) → Agregar canal → Crear storefront.
3. En el storefront creado, copia el **token de acceso público** de la Storefront API.
4. En Storefront API → Permisos, verifica que estén activos los de productos, colecciones y carrito (`unauthenticated_read_product_listings`, `unauthenticated_write_checkouts` / `unauthenticated_read_checkouts`).
5. **Publicar los productos en el canal Headless**: selecciona los cursos y productos → Más acciones → *Incluir en canales de ventas* → Headless.
6. Los productos deben estar **Activos** (no borrador) para aparecer y poder comprarse.

## 2. Publicar en Vercel
El proyecto `rehabilitacion-muscular` de Vercel ya está conectado a este repositorio y publica desde la raíz. `vercel.json` le indica que es un proyecto Next.js, así que no hace falta cambiar nada en Vercel: cada cambio que llegue a `master` se publica solo.

1. Si el proyecto tiene configurado otro *Framework Preset* u *Output Directory* en Vercel, déjalos en automático (*Settings → Build and Deployment*).
2. Para la tienda, en *Settings → Environment Variables* agrega (ver `.env.example`):

| Variable | Valor |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | `ndhgpy-aw.myshopify.com` |
| `SHOPIFY_STOREFRONT_TOKEN` | el token público del paso 1.3 |
| `SHOPIFY_API_VERSION` | `2026-07` |
| `SHOPIFY_COLECCION_CURSOS` | `cursos-en-linea` |
| `SHOPIFY_COLECCION_PRODUCTOS` | `rehabilitacion-y-bienestar` |

3. Vuelve a desplegar (*Deployments → Redeploy*). Después puedes conectar un dominio propio en *Settings → Domains*.

## Desarrollo local
```bash
npm install
cp .env.example .env.local   # y pon el token
npm run dev                  # http://localhost:3000
```
Sin token puedes ver el diseño con datos de ejemplo: `MOCK_CATALOG=1 npm run dev` (los botones de compra quedan desactivados).

## Archivos principales
- `app/page.tsx`: la página de inicio (portada, temas, pasos, análisis de postura, cursos, productos, revisión médica, llamado final).
- `components/Encabezado.tsx` y `components/PiePagina.tsx`: menú y pie compartidos por todas las páginas.
- `app/actions.ts`: acción del botón **Comprar** → carrito → checkout de Shopify.
- `lib/shopify.ts`: consultas a la Storefront API (catálogo cacheado 5 minutos; el carrito nunca se cachea).
- `components/`: animaciones (Framer Motion / `motion`), tarjeta de producto y botón de compra.
- Imagen de portada: pon la foto en `public/portada.jpg` y sigue el comentario en `app/page.tsx`.

## Contenido
Solo datos reales: sin testimonios, cifras ni urgencia inventados, y sin promesas de salud. El registro del médico revisor (**Registro médico RETHUS 1018459438**) está en `app/page.tsx`.
