# Spec: Funcionalidad en casa para adulto mayor (nombre provisional)
Fecha: 2026-11-02
Evidencia: `investigacion-ejercicio.md` (síntesis del 2026-11-02)

## Overview

Una aplicación que la persona mayor usa por sí misma para mantener su funcionalidad física y cognitiva en casa. Ofrece un programa guiado de ejercicio de equilibrio y fuerza, entrenamiento cognitivo de doble tarea dentro del mismo ejercicio, y un sensor de pulso que actúa como límite de seguridad. La intensidad se guía por el esfuerzo que la persona percibe. Cuando algo sale mal, avisa a un familiar o cuidador y deja registro para el equipo de salud.

El producto sigue la ruta de vejez de la Resolución 3280 de 2018: población desde los 60 años, foco en capacidad funcional, caídas, fragilidad y cognición. La norma ordena educación grupal en entrenamiento cognitivo; este producto lleva ese trabajo a la casa, de forma individual.

## Usuarios objetivo

**Usuaria principal: la persona mayor.**
- Tiene 60 años o más, vive en su casa y puede usar la aplicación por sí misma.
- Hoy recibe su valoración de caídas, fragilidad y cognición en la consulta de vejez. Entre consultas no tiene acompañamiento.
- Los programas de ejercicio en casa se abandonan con frecuencia, y hacer ejercicio sin guía tiene riesgo de caída.
- Puede tener baja visión, baja audición, poca destreza en los dedos o poca experiencia con aplicaciones. El producto se diseña para esas condiciones desde el inicio, no como ajuste posterior.

**Usuario secundario: el familiar o cuidador designado.**
- La persona mayor lo elige al registrarse.
- Recibe avisos cuando algo sale mal. No ve todo el historial: ve lo que la persona autoriza.

**Usuario secundario: el equipo de salud.**
- Recibe los registros de alarma y el resumen antes de la consulta.
- Prescribe el nivel inicial de ejercicio cuando el filtro de seguridad lo exige.

**Fuera de la v1:** personas con deterioro cognitivo que no pueden usar la aplicación solas. Necesitan un modo dirigido por el cuidador, que va a la V2.

## Alcance

### La v1 SÍ hace

1. **Programa de ejercicio de equilibrio y fuerza**, guiado y con progresión según la persona.
2. **Entrenamiento cognitivo de doble tarea**, integrado en la sesión de ejercicio.
3. **Frecuencia cardíaca con sensor durante el ejercicio**, como límite secundario de seguridad. El criterio principal para dosificar la intensidad es el esfuerzo percibido.

Las tres funcionalidades comparten dos mecanismos: el **filtro de seguridad** al iniciar y los **avisos** al cuidador y al equipo de salud.

### La v1 NO hace

- **No estima la presión arterial.** El sensor solo mide frecuencia cardíaca. La presión arterial va a la V2 como piloto de investigación.
- **No diagnostica arritmias** ni ninguna otra condición a partir del pulso.
- **No aplica ni reemplaza escalas clínicas.** Minimental, Barthel, Lawton-Brody, Fried y "levántese y ande" los aplica el profesional en la consulta.
- **No interpreta el rendimiento cognitivo como deterioro.** Muestra progreso, no un diagnóstico.
- **No promete prevenir la demencia ni mejorar la memoria.** El efecto del entrenamiento cognitivo es pequeño y transfiere poco a la vida diaria. Los textos hablan de "practicar".
- **No ofrece un módulo cognitivo aparte en pantalla.** El entrenamiento cognitivo ocurre dentro de la sesión de ejercicio. La única excepción son las tareas cognitivas sentadas para quien espera la prescripción médica.
- **No reemplaza la consulta de vejez** ni cambia su frecuencia.
- **No registra caídas fuera de las sesiones** ni las detecta de forma automática.
- **No maneja medicamentos.**
- **No atiende a personas que no pueden usarla solas.**
- No incluye comunidad, chat, pagos ni contenido de video largo.

## Comportamiento esperado

### 1. Registro

1. La persona instala la aplicación y se registra, sola o con ayuda.
2. Lee y acepta la autorización de tratamiento de sus datos de salud.
3. Designa a un familiar o cuidador, con nombre y teléfono. Puede decidir qué información recibe esa persona.
4. Vincula su equipo de salud.
5. Empareja el sensor de pulso. La aplicación confirma que lee el pulso antes de seguir.

### 2. Filtro de seguridad

La aplicación hace preguntas cortas, una por pantalla, con respuesta sí o no:

- ¿Se ha caído en los últimos 12 meses?
- ¿Siente dolor en el pecho, falta de aire o mareo cuando hace esfuerzo?
- ¿Se ha desmayado alguna vez haciendo esfuerzo?
- ¿Algún médico le ha dicho que no haga ejercicio?
- ¿Le han dicho que tiene fragilidad?
- ¿Toma algún medicamento para el corazón o la presión que baje el pulso?

Resultado:

- **Si todas las respuestas son no:** la persona pasa a la autoevaluación.
- **Si responde sí a cualquiera de las cinco primeras:** la aplicación no le deja empezar sola. Le explica que su médico debe fijar el nivel inicial, y envía la solicitud al equipo de salud. Mientras tanto, la aplicación le ofrece las tareas cognitivas en posición sentada, sin ejercicio de pie.
- **Si responde sí a la última:** puede empezar. El pulso no se usa como límite, porque el medicamento lo baja. La sesión se guía solo por el esfuerzo percibido.

### 3. Autoevaluación guiada

- La aplicación guía dos pruebas cortas, con una silla estable y un punto de apoyo al lado.
- La primera prueba es levantarse de la silla y sentarse varias veces.
- La segunda es mantener el equilibrio de pie con apoyo.
- Cada prueba se explica con audio y con una imagen.
- La aplicación pide confirmar que hay una silla y un apoyo antes de empezar.
- El resultado fija el nivel inicial del programa.
- Si la persona no puede completar una prueba, la aplicación no la repite. Asigna el nivel más bajo y sugiere hablar con su médico.

### 4. Sesión de ejercicio

1. La persona abre la sesión del día.
2. La aplicación confirma que el sensor lee el pulso.
3. Cada ejercicio se presenta con una sola instrucción por pantalla, con audio y con imagen.
4. Después de cada bloque, la aplicación pregunta qué tan fuerte siente el esfuerzo, con una escala simple de imágenes. La respuesta ajusta la intensidad del bloque siguiente.
5. El pulso aparece en pantalla, pero no guía la intensidad. Solo actúa como límite de seguridad: si supera el límite personal, la aplicación hace una pausa.
6. Si la persona ya domina un ejercicio de equilibrio en su versión simple, la aplicación le agrega una tarea cognitiva al mismo tiempo. Ejemplos: contar hacia atrás, nombrar palabras de una categoría, recordar una lista corta.
7. Hay un botón grande, siempre visible: **"Me siento mal"**.
8. Al terminar, la persona responde una pregunta: ¿qué tan difícil fue? Tiene tres opciones: fácil, bien, difícil.

### 5. Progresión

- El programa sube de nivel cuando la persona completa varias sesiones seguidas sin síntomas y las reporta como fáciles o bien.
- El programa nunca sube de nivel en una sesión en que hubo síntomas.
- Si la persona reporta "difícil" varias veces seguidas, el programa baja de nivel.

### 6. Entrenamiento cognitivo de doble tarea

- La tarea cognitiva se hace al mismo tiempo que el ejercicio, no en una pantalla aparte. Es el diseño con mejor evidencia.
- La doble tarea solo se agrega cuando la versión simple del ejercicio de equilibrio es fácil para la persona.
- Durante la doble tarea, el apoyo siempre está al alcance de la mano, porque sumar una tarea cognitiva aumenta el desafío del equilibrio.
- Si la persona falla la tarea cognitiva o pierde el equilibrio, la aplicación vuelve a la versión simple en la sesión siguiente.
- La aplicación muestra el progreso como constancia: días practicados, ejercicios completados.
- La aplicación no muestra puntajes comparados con otras personas ni mensajes sobre deterioro.

### 7. Resumen para la consulta

- Antes de cada consulta de vejez, la aplicación prepara un resumen para el equipo de salud con adherencia, nivel actual, sesiones con síntomas y avisos del periodo.
- El médico aplica "levántese y ande" y Fried en la consulta, como ordena la norma. Con esos resultados puede ajustar el nivel del programa.

## Errores y seguridad

| Situación | Qué hace el producto |
|---|---|
| La persona toca "Me siento mal" | Detiene la sesión. Pregunta qué siente. Si es dolor en el pecho, falta de aire, mareo fuerte o desmayo, muestra el número de emergencias **123** en grande, avisa de inmediato al cuidador y deja registro para el equipo de salud. |
| La persona se cae durante la sesión | Hay una opción "Me caí". Detiene la sesión, pregunta si puede levantarse, avisa de inmediato al cuidador y registra el evento. La próxima sesión exige pasar de nuevo por el filtro de seguridad. |
| El pulso no baja tras una pausa | Termina la sesión, indica reposo y avisa al cuidador. |
| El sensor no lee bien el pulso o el pulso es irregular | La sesión sigue guiada por el esfuerzo percibido, sin límite de pulso. La aplicación registra el hecho para el equipo de salud y no dice que hay una arritmia. |
| La persona no designó cuidador | Los avisos van solo al equipo de salud. La aplicación le advierte esto al registrarse y le recuerda la opción cada mes. |
| El cuidador no confirma un aviso dentro del plazo | El aviso queda marcado como no atendido y llega al equipo de salud como prioritario. |
| Aviso fuera del horario del equipo de salud | El mensaje de síntomas de alarma siempre incluye el 123. La aplicación nunca promete una respuesta inmediata del equipo de salud. |
| La persona deja de usar la aplicación | A los 7 días sin sesiones, la aplicación le envía un recordatorio. A los 14 días, avisa al cuidador, si la persona lo autorizó. |
| Aparece una caída o un síntoma nuevo después de empezar | El filtro de seguridad se repite. Si la respuesta lo exige, la persona necesita prescripción médica para seguir con el ejercicio. |
| La persona no entiende una instrucción | Cada pantalla tiene un botón para repetir el audio. Ninguna acción tiene límite de tiempo, salvo los ejercicios cronometrados. |

**Datos que se protegen.** Los datos de salud son datos sensibles bajo la Ley 1581 de 2012. La persona autoriza su tratamiento de forma expresa. La persona decide qué ve su cuidador. El cuidador no ve el historial completo, solo los avisos y lo que la persona comparte.

## Éxito

**Indicador principal: adherencia.**
- El programa prescribe **3 sesiones por semana**, como recomienda la OMS para equilibrio y fuerza en personas mayores.
- Una persona está **activa** si completa al menos 2 de esas sesiones por semana en las semanas 10 a 12.
- Se mide también el porcentaje de sesiones prescritas que se completaron, para poder comparar con la literatura.
- Meta propuesta: al menos el 60 % de quienes empezaron siguen activos en la semana 12. *La meta debe confirmarse con el equipo clínico antes del piloto.*

**Indicador secundario: funcionalidad medida en consulta.**
- El médico aplica "levántese y ande" y Fried al inicio y a los 3 meses.
- Se mide la proporción de personas que mejoran o se mantienen en cada prueba.
- Se mide también la proporción de personas con "levántese y ande" mayor de 15 segundos al inicio que bajan de ese umbral a los 3 meses.

**Indicadores de seguridad, obligatorios:**
- El 100 % de los eventos "Me siento mal" y "Me caí" generan un aviso entregado y un registro.
- Ninguna persona que respondió sí a cualquiera de las cinco primeras preguntas del filtro de seguridad empieza el ejercicio sin prescripción médica registrada. Responder sí solo a la sexta no exige prescripción: activa el modo sin límite de pulso.
- Se cuentan las caídas durante las sesiones. Cualquier caída con lesión se revisa caso por caso.

## V2

- **Señal de tendencia de presión arterial** como piloto de investigación, adaptando el módulo de HCP Digital (`docs/specs/2026-11-02-hcp-tendencia-presion-arterial.md`). En adulto mayor cambian tres cosas. La rigidez arterial altera la relación entre pulso y presión. La fibrilación auricular, más frecuente con la edad, degrada la señal. Y el foco clínico incluye la hipotensión ortostática y el sobretratamiento, no solo la hipertensión.
- **Registro de caídas fuera de las sesiones** y aviso.
- **Modo dirigido por el cuidador** para personas con deterioro cognitivo.
- **Manejo de medicamentos**, con alerta de polifarmacia desde 3 medicamentos y de automedicación, como pide la norma.
- **Detección de cambios** en el rendimiento cognitivo o físico, para avisar al equipo de salud.
- **Sesiones supervisadas por videollamada**, unas 3 en 12 semanas con fisioterapeuta. La evidencia indica que el ejercicio sin supervisión mejora menos el equilibrio y la fuerza, y que pocas sesiones supervisadas cierran gran parte de esa diferencia. Requiere un prestador que las dé.

## Decisiones pendientes

1. **Programa de ejercicio.** Elegir un programa de prevención de caídas con evidencia publicada, en vez de diseñar uno propio. La frecuencia ya está fijada en 3 sesiones por semana; el programa fija la progresión. Debe priorizar el equilibrio desafiante: según la revisión Cochrane de 2019, el ejercicio de equilibrio y funcional reduce la tasa de caídas 24 %, y la fuerza sola en casa no las redujo. El programa Otago es el candidato principal. Cuatro hechos de la evidencia que afectan este spec:
   - **Adherencia real:** en un metaanálisis de 7 ensayos, solo el 36,7 % de quienes seguían en los estudios a los 12 meses hacía el ejercicio 3 o más veces por semana. La meta propuesta del 60 % a las 12 semanas debe revisarse contra ese dato.
   - **Entrega por video:** en un metaanálisis de 13 ensayos, la entrega con apoyo de video mejoró más el equilibrio y la movilidad que la entrega presencial. Es un argumento a favor de la aplicación, aunque no prueba una aplicación sin instructor.
   - **Población con más beneficio:** las personas de 80 años o más y las que ya se cayeron. Esas personas pasan por el filtro de seguridad y necesitan prescripción médica, así que el mayor valor del producto depende de que la ruta médica funcione.
   - **Equipo y licencia:** el programa usa pesas de tobillo y fue diseñado para entregarse con un instructor capacitado. Hay que verificar el permiso de uso del programa y sus materiales en un producto comercial.
2. **Rango de esfuerzo percibido y límite de pulso de seguridad.** Definir con el equipo clínico el rango objetivo de esfuerzo percibido (la síntesis de evidencia propone Borg 12–14, sin verificar en población con betabloqueadores) y cómo se calcula el límite de pulso de seguridad.
3. **Plazo de confirmación del cuidador** antes de escalar el aviso al equipo de salud.
4. **Equipo de salud que recibe.** Al ser un producto nuevo, hay que definir qué prestador recibe los avisos y la solicitud de prescripción, y con qué horario.
5. **Prueba con usuarios.** Antes de construir, probar las pantallas con al menos cinco personas mayores de 60 años con distintos niveles de experiencia digital.
