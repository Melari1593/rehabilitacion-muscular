# Roadmap: App de seguimiento de postura y análisis de movimiento para rehabilitación osteomuscular
Fecha: 2026-08-08

## La idea en una frase
Una app web que usa la cámara del celular/laptop para analizar en tiempo real la postura y el movimiento de un paciente mientras hace sus ejercicios de rehabilitación en casa, dándole feedback inmediato sobre si lo está haciendo bien.

## La acción core
Grabar un ejercicio con la cámara y recibir feedback sobre si la postura/movimiento fue correcto. Todo lo demás (planes, historial, panel del fisio) existe para alimentar o aprovechar esta acción.

## Fase 1 — Lanzamiento
| # | Feature | Por qué va primero | Depende de |
|---|---------|--------------------|------------|
| 1 | Catálogo mínimo de ejercicios con referencia (2-3 ejercicios comunes de rehabilitación, con video/imagen de cómo se hacen bien) | Sin una definición de "cómo se ve correcto", no hay nada contra qué comparar el movimiento del paciente | — |
| 2 | Captura de video vía cámara del navegador | Es el input crudo que necesita el análisis; sin esto no hay datos que procesar | #1 |
| 3 | Detección de postura y análisis del movimiento (usando un modelo ya entrenado, tipo MediaPipe Pose, comparando ángulos articulares contra los rangos esperados del ejercicio) | Es el corazón del producto: la parte que convierte video en información útil | #2 |
| 4 | Feedback inmediato al paciente (correcto / incorrecto + qué ajustar, ej. "sube más la rodilla") | Cierra el ciclo de valor: sin feedback, el análisis no le sirve de nada al paciente | #3 |

Nota sobre alcance técnico: dado que el tiempo y nivel técnico disponibles son limitados, la Fase 1 se apoya en un modelo de pose estimation ya entrenado y disponible (MediaPipe Pose corre en el navegador, es gratuito y no requiere entrenar nada desde cero) en vez de construir o entrenar modelos propios de visión por computadora. Los "rangos correctos" de cada ejercicio se pueden definir a mano (reglas simples de ángulos), no con IA.

## Fase 2 — Mejora
| # | Feature | Por qué | Depende de |
|---|---------|---------|------------|
| 5 | Planes de ejercicio prescritos por un fisioterapeuta (secuencia de varios ejercicios con series/repeticiones asignadas) | Convierte la app de "un ejercicio suelto" a "un programa de rehabilitación" real, que es el caso de uso completo | Catálogo (#1) y análisis (#3) funcionando |
| 6 | Historial y gráficas de progreso (repeticiones correctas vs. incorrectas, evolución del rango de movimiento por sesión) | El paciente y el fisio necesitan ver si hay mejora a lo largo del tiempo; requiere tener sesiones guardadas, algo que ya genera la Fase 1 | Feedback (#4) guardando resultados de cada sesión |
| 7 | Ampliar el catálogo de ejercicios más allá de los 2-3 iniciales | Una vez validado que el análisis funciona bien para un ejercicio, escalar a más es principalmente repetir el patrón | Catálogo (#1), análisis (#3) validados |
| 8 | Vista del fisioterapeuta para un paciente individual (revisar el historial y ajustar el plan) | Antes de pensar en multi-paciente, vale más validar que un fisio saca valor real revisando a un solo paciente | Plan prescrito (#5), historial (#6) |

## Backlog
- **Panel multi-paciente para el fisioterapeuta (telerehabilitación completa):** tiene sentido después de validar que el modelo de "un fisio revisando a un paciente" (#8) funciona; construirlo antes es asumir infraestructura de cuentas/roles que aún no se necesita.
- **Recordatorios y gamificación (rachas, puntos, notificaciones):** es una feature de retención, no de valor central — no acerca al paciente a hacer bien su ejercicio, solo a hacerlo más veces. Solo vale la pena una vez que ya sabes que el análisis funciona y la gente lo usa.
- **Sensores wearables / IMU:** más precisión, pero requiere hardware adicional y mayor complejidad; se descartó para el lanzamiento a favor de cámara + visión por computadora, que es accesible sin comprar nada.
- **App móvil nativa (iOS/Android):** mejor acceso a cámara y mejor experiencia, pero más tiempo de desarrollo; la app web ya resuelve la validación inicial sin instalar nada.
- **Modelos propios de IA entrenados con datos clínicos:** interesante a futuro para mayor precisión clínica, pero no es necesario para validar la idea — MediaPipe ya entrenado cubre la Fase 1 y 2.

## Siguiente paso
Convertir la Fase 1 en spec con /crear-specs, usando este roadmap como contexto.
