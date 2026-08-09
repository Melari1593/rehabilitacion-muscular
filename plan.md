# Plan: App de seguimiento de postura y análisis de movimiento (v1)
Fecha: 2026-08-08

## Objetivo
Construir la v1 funcional descrita en el spec: una app web de una sola sesión (sin cuentas) donde un paciente hace sentadillas o elevación de brazo frente a la cámara y recibe conteo automático de repeticiones y feedback inmediato (correcto/incorrecto) sobre su ejecución.

## Contexto del problema
Los pacientes en rehabilitación osteomuscular hacen sus ejercicios en casa sin un fisioterapeuta presente y no tienen forma de saber si están ejecutando el movimiento correctamente entre sesiones clínicas. La v1 resuelve esto con detección de postura por cámara (sin hardware adicional) que da retroalimentación al momento, usando un modelo de pose ya entrenado en vez de construir IA propia, dado el tiempo y nivel técnico disponibles.

## Spec de referencia
`spec.md` (raíz del proyecto). Puntos clave: app web, sin login/cuentas, procesamiento 100% en el navegador (nada se sube a servidor), 2 ejercicios en v1 (sentadilla y elevación de brazo/hombro), análisis en tiempo real con conteo automático de repeticiones, feedback combinado (color/ícono + texto corto), validación de encuadre/luz antes de empezar (bloqueante) y advertencia no bloqueante si la detección se degrada durante el ejercicio, y una pantalla de resumen al finalizar.

**Supuesto técnico** (no especificado en el spec, decidido aquí porque el spec no cubre tecnología): la v1 se construye como una app web estática de un solo cliente — HTML/CSS/JavaScript plano, sin backend ni base de datos (no hace falta: no hay cuentas ni historial persistente) — usando **MediaPipe Pose Landmarker (Tasks Vision API de Google, vía CDN)** como modelo de detección de postura ya entrenado, corriendo enteramente en el navegador. Si prefieres otro stack (ej. React), dímelo antes de implementar y ajusto el plan.

## Lista de tareas a implementar con detalles

### 1. Definir los datos de cada ejercicio
- **Qué hacer:** Crear una estructura de datos (ej. `exercises.js`) con un objeto por ejercicio: nombre, instrucciones cortas, imagen/ilustración de referencia, las articulaciones/landmarks relevantes a trackear, el rango de ángulo considerado "correcto" en el punto máximo del movimiento, y los mensajes de error asociados a los desvíos más comunes (ej. "baja más la cadera", "sube más el brazo").
- **Archivos/componentes:** Módulo de datos `exercises.js` (o `.json`) con las entradas de "sentadilla" y "elevación de brazo".
- **Criterio de hecho:** Ambos ejercicios están definidos con sus ángulos de referencia y mensajes, y se pueden importar/leer desde el resto de la app sin hardcodear valores repetidos.

### 2. Pantalla de inicio con selección de ejercicio
- **Qué hacer:** Construir la vista inicial que muestra las 2 tarjetas de ejercicio (imagen + nombre + instrucción breve) y permite elegir una para continuar.
- **Archivos/componentes:** Vista/componente "Inicio" (ej. `index.html` + sección de selección).
- **Criterio de hecho:** Al cargar la app se ven las 2 opciones con su referencia visual, y al hacer clic en una se navega a la pantalla de preparación con ese ejercicio seleccionado.
- **Depende de:** Tarea 1.

### 3. Captura de cámara y pantalla de "prepárate"
- **Qué hacer:** Solicitar permiso de cámara, mostrar el stream en un `<video>` en modo espejo (flip horizontal), y correr la detección de pose en esta pantalla solo para validar que: (a) los landmarks clave del cuerpo completo son visibles, y (b) el nivel de brillo del frame es suficiente. Mientras no se cumplan ambas condiciones, el botón "empezar" permanece deshabilitado y se muestra el mensaje guía correspondiente ("acércate más", "necesitamos más luz").
- **Archivos/componentes:** Vista "Prepárate" + módulo de acceso a cámara (`camera.js`) + chequeo de visibilidad/luz.
- **Criterio de hecho:** Con mala luz o el cuerpo fuera de encuadre, el botón "empezar" está bloqueado y se ve el mensaje correcto; al corregir la posición/luz, el botón se habilita solo.
- **Depende de:** Tarea 2.

### 4. Integración de MediaPipe Pose y overlay de esqueleto
- **Qué hacer:** Cargar el modelo de Pose Landmarker, correrlo por cada frame del video, y dibujar en un `<canvas>` superpuesto al video la silueta/puntos del esqueleto detectado en tiempo real.
- **Archivos/componentes:** Módulo `pose-detector.js` (inicialización del modelo, loop de detección por frame) + canvas de overlay en la vista de ejercicio.
- **Criterio de hecho:** Durante la grabación se ve el esqueleto/silueta superpuesto sobre el video, siguiendo el movimiento del paciente en tiempo real sin retraso perceptible.
- **Depende de:** Tarea 3.

### 5. Cálculo de ángulos articulares y conteo automático de repeticiones
- **Qué hacer:** A partir de los landmarks de cada frame, calcular el ángulo relevante por ejercicio (ángulo de rodilla para sentadilla, ángulo de hombro/brazo para elevación de brazo) y usar una máquina de estados simple (ej. "abajo" → "arriba" → "abajo") sobre esos ángulos para detectar y contar cada repetición completa automáticamente.
- **Archivos/componentes:** Módulo `angle-utils.js` (cálculo de ángulos entre 3 landmarks) + módulo `rep-counter.js` (máquina de estados y conteo).
- **Criterio de hecho:** Al hacer repeticiones reales frente a la cámara, el contador en pantalla aumenta en 1 por cada repetición completa, sin contar de más ni de menos en movimientos normales de prueba.
- **Depende de:** Tarea 4.

### 6. Feedback inmediato combinado (visual + texto)
- **Qué hacer:** En cada frame, comparar el ángulo actual contra el rango "correcto" definido para el ejercicio (Tarea 1). Si está fuera de rango, cambiar el color del overlay/silueta a un color de alerta y mostrar el mensaje de texto corto correspondiente al tipo de desvío; si está dentro de rango, mostrar el color de "correcto". Registrar el resultado (correcto/incorrecto + tipo de error) de cada repetición contada.
- **Archivos/componentes:** Extiende `pose-detector.js`/`rep-counter.js` con lógica de evaluación + UI de mensaje de texto sobre el video.
- **Criterio de hecho:** Al ejecutar el movimiento mal a propósito (ej. sentadilla muy superficial), el overlay cambia de color y aparece el mensaje de corrección esperado casi al instante; al corregirlo, vuelve al color de "correcto".
- **Depende de:** Tarea 5.

### 7. Advertencia no bloqueante por baja confianza de detección
- **Qué hacer:** Durante el ejercicio (a diferencia de la pantalla de "prepárate", que sí bloquea), si la confianza de detección de landmarks clave cae por debajo de un umbral o el paciente sale parcialmente del encuadre, mostrar una advertencia visible sin detener el conteo, y marcar esa repetición/tramo como "baja confianza" para el resumen final.
- **Archivos/componentes:** Extiende `pose-detector.js` con chequeo de confianza por frame + componente de advertencia en la UI.
- **Criterio de hecho:** Al taparse parcialmente o salirse del encuadre durante el ejercicio, aparece la advertencia pero el contador sigue funcionando; esa parte queda reflejada como baja confianza en el resumen.
- **Depende de:** Tarea 5.

### 8. Manejo de permiso de cámara denegado y de "sin repeticiones detectadas"
- **Qué hacer:** Si el navegador deniega el permiso de cámara, mostrar una pantalla de error con instrucciones para habilitarlo. Si pasa un tiempo razonable (ej. 30-45 segundos) sin que se detecte ninguna repetición completa, mostrar un mensaje sugiriendo ajustar posición o iluminación.
- **Archivos/componentes:** Manejo de errores en `camera.js` + temporizador de inactividad en la vista de ejercicio.
- **Criterio de hecho:** Al negar el permiso de cámara se ve el mensaje con instrucciones (no una pantalla rota); al no moverse durante el tiempo definido, aparece el mensaje sugerido.
- **Depende de:** Tarea 3 (permiso de cámara) y Tarea 5 (conteo de repeticiones).

### 9. Pantalla de resumen de sesión
- **Qué hacer:** Agregar un botón "detener" visible durante el ejercicio. Al presionarlo (o al cerrar el ejercicio), mostrar una pantalla de resumen con: repeticiones totales, cuántas correctas, cuántas incorrectas, el tipo de error más frecuente, y si hubo tramos de baja confianza. Incluir un botón para volver al inicio.
- **Archivos/componentes:** Vista "Resumen" + acumulador de resultados por repetición (alimentado por Tareas 6 y 7).
- **Criterio de hecho:** Al detener una sesión de prueba con repeticiones correctas e incorrectas mezcladas, el resumen muestra los conteos correctos y permite volver a la pantalla de inicio para elegir ejercicio de nuevo.
- **Depende de:** Tareas 6, 7 y 2 (navegación de vuelta al inicio).
