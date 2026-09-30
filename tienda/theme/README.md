# Sección "BienEstar · Inicio" para Shopify

Archivo: `sections/bienestar-landing.liquid`

Adaptación del brief "Align Clinic" (React + Vite + Framer Motion) a una sección nativa de Shopify para el tema **Horizon**: Liquid + CSS + JavaScript sin dependencias. Mantiene la estética del brief (blanco, azul marino `#1a2440`, azul eléctrico `#1a8cd4`, DM Serif Display + Plus Jakarta Sans) con el contenido real de BienEstar en Casa.

## Qué incluye
1. **Portada**: etiqueta, título, texto, 2 botones, tarjeta flotante con el curso destacado e imagen editable.
2. **Franja de confianza** en movimiento (un dato por línea, solo datos reales).
3. **Temas**: hasta 6 tarjetas con icono y enlace a cada curso (efecto azul al pasar el cursor).
4. **Cómo funciona**: 3 pasos con número de fondo difuminado.
5. **Cursos**: se llena sola con los productos de la colección que elijas, con su precio real de Shopify.
6. **Revisión médica**: nombre, registro médico RETHUS y foto opcional.
7. **Testimonios**: solo aparece si agregas reseñas reales.
8. **Llamado final** y aviso de contenido educativo.

Las animaciones de Framer Motion se reemplazaron por transiciones CSS activadas al hacer scroll, y se desactivan si el visitante tiene activado "reducir movimiento".

## Cómo instalarla (en una copia del tema, sin tocar la tienda publicada)
1. Shopify → **Tienda online → Temas** → en la copia sin publicar de Horizon, **⋯ → Editar código**.
2. Carpeta **sections** → **Agregar una nueva sección** → nombre `bienestar-landing` → pega el contenido del archivo y guarda.
3. **Personalizar** esa copia → Página de inicio → **Agregar sección** → "BienEstar · Inicio".
4. En la sección: elige la colección **Cursos en línea**, sube la imagen de portada y pon los enlaces de cada tema y botón.
5. Revisa en celular y computador con la vista previa. Cuando te guste, **publica** esa copia.

## Revisado con Shopify Theme Check
Sin errores. Quedan 3 avisos por cargar las fuentes desde Google Fonts, que el brief pide expresamente.
