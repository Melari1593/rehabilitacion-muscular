# BienEstar en Casa · sitio web (Vercel + Wompi + Shopify)

Sitio en **Next.js** para publicar en **Vercel**. Cobra los **cursos con Wompi** (directo, sin Shopify), vende los **productos físicos con el checkout de Shopify** e incluye la app de **análisis de postura** con la cámara.

## Estructura del repositorio
- `app/`, `components/`, `lib/`: el sitio (Next.js).
- `app/analisis-postura/`: página que muestra la app de postura.
- `public/postura/`: la app de análisis de postura (HTML + JavaScript + MediaPipe, sin dependencias). También funciona sola en `/postura/index.html`.
- `cursos/`: guiones, PDFs y prompts de los cursos.
- `tienda/`: sección para el tema de Shopify, prompt del sitio y textos legales.
- `spec.md`, `roadmap.md`, `plan.md`: documentación de la app de postura.

## Cómo funciona el pago

### Cursos → Wompi (Web Checkout)
1. El catálogo y el precio de los cursos están en `lib/cursos.ts` (52.150 COP = 14,90 USD × 3.500). Wompi solo cobra en COP.
2. El cliente pulsa **Comprar curso**. El servidor crea una referencia única (`BEC-<curso>-…`), calcula la **firma de integridad** `SHA256(referencia + monto en centavos + COP + secreto de integridad)` y lo redirige a `https://checkout.wompi.co/p/`.
3. El cliente paga en Wompi (tarjeta, PSE, Nequi, Bancolombia…). Wompi lo devuelve a `/pago/resultado?id=<transacción>`, donde el sitio **consulta el estado en la API de Wompi** y comprueba que la referencia y el monto coinciden con el curso.
4. Wompi envía el evento `transaction.updated` a `/api/wompi/eventos`. El sitio verifica el **checksum** con el secreto de eventos y, si el pago está `APPROVED`, envía al cliente el correo con el acceso (Resend, opcional; si no está configurado, el pedido queda en los logs de Vercel).

Referencias: [Widget y Web Checkout](https://docs.wompi.co/en/docs/colombia/widget-checkout-web/), [Eventos](https://docs.wompi.co/docs/en/eventos), [Datos de prueba](https://docs.wompi.co/docs/en/datos-de-prueba-en-sandbox).

### Productos físicos → Shopify
1. El sitio lee los productos de Shopify (Storefront API) en el servidor.
2. **Comprar** crea un carrito en Shopify (`cartCreate`) y redirige a su `checkoutUrl`; el pedido aparece en Shopify.

El sitio nunca ve ni guarda datos de tarjetas. Los secretos de Wompi y el token de Shopify solo se usan en el servidor.

## 0. Preparar Wompi en modo de prueba
1. Crea tu cuenta de comercio en [comercios.wompi.co](https://comercios.wompi.co).
2. En **Desarrolladores**, con el interruptor en **Modo pruebas / Sandbox**, copia: llave pública (`pub_test_…`), secreto de integridad (`test_integrity_…`) y secreto de eventos (`test_events_…`). La llave privada (`prv_test_…`) no hace falta.
3. En la misma pantalla, en **URL de eventos**, pon `https://<tu-dominio-de-vercel>/api/wompi/eventos`.
4. Agrega las variables en Vercel (tabla de abajo) y vuelve a desplegar. Mientras la llave empiece por `pub_test_`, el sitio muestra el aviso **Modo de prueba** y no se cobra dinero real.
5. Prueba con los datos del sandbox de Wompi: tarjeta `4242 4242 4242 4242` (aprobada; las demás tarjetas y escenarios están en *Datos de prueba*), cualquier fecha futura y CVC de 3 dígitos.
6. Para cobrar de verdad: cambia a las llaves de producción (`pub_prod_…`, `prod_integrity_…`, `prod_events_…`) y actualiza la URL de eventos del modo producción.

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
2. En *Settings → Environment Variables* agrega (ver `.env.example`):

| Variable | Valor |
|---|---|
| `WOMPI_PUBLIC_KEY` | `pub_test_…` (paso 0.2) |
| `WOMPI_INTEGRITY_SECRET` | `test_integrity_…` |
| `WOMPI_EVENTS_SECRET` | `test_events_…` |
| `RESEND_API_KEY`, `CORREO_REMITENTE`, `CURSO_ACCESO_<CURSO>` | opcionales: correo automático con el acceso |
| `SHOPIFY_STORE_DOMAIN` | `ndhgpy-aw.myshopify.com` |
| `SHOPIFY_STOREFRONT_TOKEN` | el token público del paso 1.3 |
| `SHOPIFY_API_VERSION` | `2026-07` |
| `SHOPIFY_COLECCION_CURSOS` | `cursos-en-linea` |
| `SHOPIFY_COLECCION_PRODUCTOS` | `rehabilitacion-y-bienestar` |

3. Vuelve a desplegar (*Deployments → Redeploy*). Después puedes conectar un dominio propio en *Settings → Domains*.

## Desarrollo local
```bash
npm install
cp .env.example .env.local   # y pon las llaves de Wompi y el token de Shopify
npm run dev                  # http://localhost:3000
```
Sin token puedes ver el diseño con datos de ejemplo: `MOCK_CATALOG=1 npm run dev` (los botones de compra quedan desactivados).

## Archivos principales
- `app/page.tsx`: la página de inicio (portada, temas, pasos, análisis de postura, cursos, productos, revisión médica, llamado final).
- `components/Encabezado.tsx` y `components/PiePagina.tsx`: menú y pie compartidos por todas las páginas.
- `app/actions.ts`: `pagarCurso` (→ Wompi) y `comprar` (→ checkout de Shopify).
- `lib/cursos.ts`: catálogo y precios de los cursos. `lib/wompi.ts`: firma, URL de checkout, consulta de transacciones y verificación de eventos. `lib/correo.ts`: correo con el acceso.
- `app/pago/resultado/page.tsx`: página de regreso de Wompi. `app/api/wompi/eventos/route.ts`: webhook de Wompi.
- `lib/shopify.ts`: consultas a la Storefront API (catálogo cacheado 5 minutos; el carrito nunca se cachea).
- `components/`: animaciones (Framer Motion / `motion`), tarjeta de producto y botón de compra.
- Imagen de portada: pon la foto en `public/portada.jpg` y sigue el comentario en `app/page.tsx`.

## Contenido
Solo datos reales: sin testimonios, cifras ni urgencia inventados, y sin promesas de salud. El registro del médico revisor (**Registro médico RETHUS 1018459438**) está en `app/page.tsx`.
