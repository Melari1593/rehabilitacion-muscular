# Spec: App de seguimiento de postura y análisis de movimiento para rehabilitación osteomuscular
Fecha: 2026-08-08

## Overview
Una app web que un paciente abre desde su celular o laptop para hacer sus ejercicios de rehabilitación en casa frente a la cámara. La app detecta su postura en tiempo real, cuenta las repeticiones automáticamente y le avisa al instante si el movimiento fue correcto o no, incluyendo qué corregir. El objetivo es que el paciente sepa, sin necesidad de un fisioterapeuta presente, si está haciendo bien su ejercicio entre sesiones clínicas.

## Usuarios objetivo
Pacientes en un programa de rehabilitación osteomuscular que hacen sus ejercicios en casa, sin supervisión directa de un fisioterapeuta en ese momento. Hoy, entre sesiones con su fisio, no tienen forma de saber si están ejecutando el movimiento correctamente — solo cuentan con instrucciones verbales o un papel/video de referencia, sin retroalimentación sobre su propia ejecución.

## Alcance

### La v1 SÍ hace
1. **Catálogo de 2 ejercicios** (sentadilla y elevación de brazo/hombro), cada uno con una referencia visual de cómo se hace correctamente.
2. **Captura de video en vivo vía cámara del navegador**, con el paciente viéndose en pantalla en tiempo real (efecto espejo).
3. **Detección de postura y conteo automático de repeticiones**, comparando el movimiento contra los rangos de ángulos correctos definidos para cada ejercicio, sin que el paciente tenga que indicar nada manualmente.
4. **Feedback inmediato combinado** (señal visual de color/ícono + mensaje de texto corto) cuando el movimiento se sale del rango correcto.

### La v1 NO hace
- No requiere cuentas ni login; no guarda historial entre sesiones.
- No incluye planes de ejercicio prescritos por un fisioterapeuta.
- No tiene panel para el fisioterapeuta ni telerehabilitación.
- No tiene recordatorios, notificaciones ni gamificación.
- No usa sensores wearables/IMU (solo cámara).
- No es app móvil nativa (es app web, funciona en el navegador).
- No incluye puente de glúteos ni flexión de rodilla de pie (quedan para V2).
- No entrena modelos propios de IA: usa un modelo de detección de postura ya entrenado y disponible públicamente.

## Comportamiento esperado
1. El paciente abre la app en el navegador (celular o laptop) y otorga permiso de cámara.
2. Ve una pantalla de inicio con los dos ejercicios disponibles (sentadilla, elevación de brazo), cada uno con una imagen/instrucción breve de cómo hacerlo bien.
3. Elige un ejercicio y entra a una pantalla de "prepárate": la app verifica con la cámara que el cuerpo completo entra en el encuadre y que hay suficiente luz, guiando con mensajes (ej. "aléjate un poco", "necesitamos más luz") antes de habilitar el botón de inicio.
4. El paciente presiona "empezar" y ve su propio video en tiempo real, con una silueta o esqueleto superpuesto marcando los puntos del cuerpo detectados.
5. El paciente empieza a moverse; la app cuenta automáticamente cada repetición completa.
6. Si el ángulo del movimiento se sale del rango correcto durante una repetición, la silueta/ícono cambia a un color de alerta y aparece un mensaje corto indicando qué corregir (ej. "baja más la cadera").
7. Si el paciente se sale del encuadre o la luz empeora durante el ejercicio, aparece una advertencia superpuesta, pero el conteo sigue (no se bloquea el ejercicio).
8. Cuando el paciente termina y presiona "detener", ve un resumen de la sesión: repeticiones totales, cuántas fueron correctas, cuántas tuvieron error, y el tipo de error más frecuente.
9. El paciente puede volver al inicio y repetir el mismo ejercicio o elegir el otro.

## Errores y seguridad
- **Sin permiso de cámara:** mensaje claro pidiendo activarlo, con instrucciones de cómo hacerlo en el navegador.
- **Mala luz o cuerpo fuera de encuadre antes de empezar:** bloquea el botón de inicio con un mensaje guía hasta que se corrija.
- **Mala luz o pérdida parcial de detección durante el ejercicio:** muestra una advertencia visible pero no bloquea el ejercicio; esa parte queda marcada como "baja confianza" en el resumen final.
- **No se detecta ninguna repetición en un tiempo razonable:** mensaje sugiriendo ajustar la posición o la iluminación.
- **Privacidad:** no hay cuentas ni guardado de historial en v1, por lo que no se almacena video ni datos personales más allá de la sesión activa; el procesamiento del video ocurre en el propio dispositivo/navegador, no se sube a ningún servidor.

## Éxito
Un paciente puede completar una sesión de sentadillas o de elevación de brazo, ver que la app cuenta correctamente sus repeticiones, y recibir feedback (correcto/incorrecto + qué corregir) que coincide con lo que diría un ojo clínico entrenado sobre el mismo movimiento. Se considera validado cuando al menos un fisioterapeuta revisa el feedback dado por la app en varias sesiones de prueba y lo confirma como clínicamente razonable.

## V2
- Agregar los ejercicios restantes: puente de glúteos y flexión de rodilla de pie.
- Planes de ejercicio prescritos por un fisioterapeuta (secuencia de ejercicios con series/repeticiones asignadas).
- Cuentas de usuario, historial y gráficas de progreso entre sesiones.
- Vista del fisioterapeuta para revisar el progreso de un paciente individual.
- Panel multi-paciente / telerehabilitación completa.
- Recordatorios y gamificación.
