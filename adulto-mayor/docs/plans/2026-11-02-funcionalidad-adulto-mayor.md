# Plan: Funcionalidad en casa para adulto mayor

Fecha: 2026-11-02

## 1. Objetivo

Construir una aplicación que la persona mayor usa sola en casa para hacer un programa de equilibrio y fuerza con doble tarea cognitiva, guiado por el esfuerzo que percibe, con el pulso como límite de seguridad y avisos al cuidador y al equipo de salud cuando algo sale mal.

## 2. Contexto del problema

La Resolución 3280 de 2018 valora caídas, fragilidad y cognición en la consulta de vejez, pero entre consultas la persona mayor no tiene acompañamiento. Los programas de ejercicio en casa se abandonan con frecuencia y hacer ejercicio sin guía tiene riesgo de caída. La evidencia indica que el ejercicio de equilibrio y funcional reduce la tasa de caídas 24 %, que la dosis recomendada es de 3 sesiones por semana, y que el entrenamiento cognitivo funciona mejor como doble tarea que como módulo aparte.

## 3. Spec de referencia

- Spec: `adulto-mayor/spec.md` (aprobado el 2026-11-02). Usa el formato de la skill de specs, no las seis secciones de design-spec.
- Evidencia: `adulto-mayor/investigacion-ejercicio.md`.

## 4. Lista de tareas a implementar con detalles

No hay stack decidido. Los componentes se nombran de forma lógica; cuando exista el repositorio, se reemplazan por rutas reales.

**Orden y dependencias**
- La Tarea 0 bloquea todo lo demás.
- La Fase A (prototipo y prueba con usuarios) va antes de construir. Su resultado puede cambiar el spec.
- B → C → D es estricta: no hay sesión sin registro ni sin filtro de seguridad.
- La Fase E (avisos) se construye junto con la D, porque los botones de alarma de la sesión dependen de ella.
- Las Fases F y G corren en paralelo con D y E.
- La Fase H va al final.

---

### Tarea 0 — Decisiones previas (bloqueante)

**0.1 Plataforma y sensor**
- **Qué hacer:** decidir la plataforma (teléfono, tableta o ambos; sistema operativo) y el sensor de pulso (muñeca o pecho). Comprobar que el sensor entrega lectura de pulso a la aplicación en tiempo real.
- **Componentes:** registro de decisión en `adulto-mayor/docs/decisiones/`.
- **Hecho cuando:** la decisión está escrita y aprobada, y una prueba de banco muestra lectura continua del pulso en la aplicación durante 10 minutos de movimiento.

**0.2 Programa de ejercicio, licencia y parámetros clínicos**
- **Qué hacer:** con el equipo clínico:
  1. Elegir el programa base. El candidato es Otago.
  2. Verificar el permiso de uso del programa y sus materiales en un producto comercial.
  3. Traducir la progresión del programa a niveles numerados, con criterios de equilibrio desafiante.
  4. Fijar el rango objetivo de esfuerzo percibido; la síntesis propone Borg 12–14.
  5. Fijar la fórmula del límite de pulso de seguridad.
  6. Definir cuántas sesiones seguidas sin síntomas suben de nivel y cuántas respuestas "difícil" lo bajan.
- **Componentes:** documento clínico del programa; licencia.
- **Hecho cuando:** el documento está firmado por el equipo clínico, con los seis puntos resueltos y el permiso de uso por escrito.

**0.3 Equipo de salud receptor y plazos**
- **Qué hacer:** definir qué prestador recibe avisos, solicitudes de prescripción y resúmenes, con qué horario, y el plazo de confirmación del cuidador antes de escalar al equipo.
- **Componentes:** acuerdo operativo con el prestador.
- **Hecho cuando:** existe un prestador con nombre, horario escrito y plazo de escalamiento fijado.

**0.4 Texto de autorización de datos**
- **Qué hacer:** redactar la autorización de tratamiento de datos de salud (Ley 1581 de 2012) y el texto que explica qué ve el cuidador.
- **Componentes:** textos legales del registro.
- **Hecho cuando:** los textos están revisados por asesoría legal y en lenguaje simple.

**0.5 Ambigüedad a resolver: medición de Fried**
- **Qué hacer:** decidir si Fried se mide en todas las personas o solo en las prefrágiles y frágiles. En una persona robusta, Fried vale 0 y no puede mejorar, lo que distorsiona el indicador secundario de éxito. El spec aprobado no lo resuelve.
- **Componentes:** sección Éxito del spec.
- **Hecho cuando:** la decisión queda escrita en el spec.

---

### Fase A — Prototipo y prueba con usuarios

**A1 Prototipo navegable**
- **Qué hacer:** construir un prototipo navegable, sin lógica real, de registro, filtro de seguridad, autoevaluación y una sesión completa con escala de esfuerzo, doble tarea y botón "Me siento mal".
- **Componentes:** prototipo de interfaz.
- **Hecho cuando:** el recorrido completo se puede navegar de principio a fin.

**A2 Prueba con personas mayores**
- **Qué hacer:** probar el prototipo con al menos 5 personas de 60 años o más, con distintos niveles de experiencia digital. Registrar dónde se atascan.
- **Componentes:** informe de prueba con usuarios.
- **Hecho cuando:** al menos 4 de 5 personas completan el registro y una sesión sin ayuda; cada problema encontrado tiene una corrección decidida. Si un problema cambia el comportamiento, se corrige el spec.

---

### Fase B — Registro y vínculos

**B1 Registro y autorización**
- **Qué hacer:** registro de la persona con aceptación expresa de la autorización de datos.
- **Componentes:** módulo de registro; almacenamiento de consentimiento con fecha y versión del texto.
- **Hecho cuando:** sin aceptar la autorización no se puede seguir, y cada aceptación queda guardada con fecha y versión.

**B2 Cuidador designado y permisos**
- **Qué hacer:** designar cuidador con nombre y teléfono, y elegir qué información recibe. Permitir no designar a nadie, con advertencia.
- **Componentes:** módulo de contactos; control de permisos.
- **Hecho cuando:** el cuidador recibe solo los avisos y la información autorizada; sin cuidador, la aplicación muestra la advertencia y programa el recordatorio mensual.

**B3 Vínculo con el equipo de salud**
- **Qué hacer:** vincular a la persona con el prestador definido en 0.3.
- **Componentes:** módulo de vínculo; interfaz del equipo de salud (ver E5).
- **Hecho cuando:** la persona aparece en la lista del equipo de salud al terminar el registro.

**B4 Emparejamiento del sensor**
- **Qué hacer:** emparejar el sensor y confirmar que lee el pulso antes de seguir.
- **Componentes:** integración con el sensor.
- **Hecho cuando:** si el sensor no entrega pulso, la aplicación no avanza y explica qué hacer.

---

### Fase C — Filtro de seguridad y nivel inicial

**C1 Filtro de seguridad**
- **Qué hacer:** las seis preguntas del spec, una por pantalla, con la lógica de salida:
  - Todas no → autoevaluación.
  - Sí a cualquiera de las cinco primeras → bloqueo del ejercicio, solicitud de prescripción al equipo y acceso a tareas cognitivas sentadas.
  - Sí a la sexta → modo sin límite de pulso.
- **Componentes:** módulo de filtro; motor de reglas.
- **Hecho cuando:** una prueba con las combinaciones de respuestas produce siempre la salida que fija el spec, y una persona bloqueada no puede abrir una sesión de pie.

**C2 Prescripción médica del nivel inicial**
- **Qué hacer:** el equipo de salud recibe la solicitud, fija el nivel inicial y lo envía a la aplicación.
- **Componentes:** interfaz del equipo de salud; módulo de prescripción.
- **Hecho cuando:** al registrar la prescripción, la persona se desbloquea con ese nivel y queda registro de quién prescribió y cuándo.

**C3 Autoevaluación guiada**
- **Qué hacer:** las dos pruebas (levantarse de la silla y equilibrio con apoyo), con confirmación previa de silla y apoyo, audio e imagen. Sin repetición si no se completa: nivel más bajo y sugerencia de hablar con el médico.
- **Componentes:** módulo de autoevaluación.
- **Hecho cuando:** sin confirmar silla y apoyo no empieza la prueba; el resultado asigna un nivel según la tabla del documento 0.2.

**C4 Repetición del filtro**
- **Qué hacer:** repetir el filtro después de un evento "Me caí" o de un síntoma nuevo.
- **Componentes:** motor de reglas.
- **Hecho cuando:** tras un evento "Me caí", la sesión siguiente no abre sin pasar por el filtro.

---

### Fase D — Sesión de ejercicio

**D1 Biblioteca de ejercicios por nivel**
- **Qué hacer:** cargar los ejercicios del programa elegido, por nivel, con una instrucción por pantalla, audio, imagen y botón de repetir audio.
- **Componentes:** biblioteca de contenidos.
- **Hecho cuando:** cada nivel del documento 0.2 tiene todos sus ejercicios con audio e imagen.

**D2 Esfuerzo percibido por bloque**
- **Qué hacer:** al final de cada bloque, preguntar el esfuerzo con una escala de imágenes y ajustar la intensidad del bloque siguiente según el rango objetivo.
- **Componentes:** módulo de sesión; motor de ajuste.
- **Hecho cuando:** una respuesta por encima del rango baja la intensidad del bloque siguiente y una por debajo la sube, dentro del nivel.

**D3 Pulso como límite de seguridad**
- **Qué hacer:**
  - Si el pulso supera el límite, pausa.
  - Si no baja tras la pausa, termina la sesión, indica reposo y avisa al cuidador.
  - Si la persona toma medicamentos que bajan el pulso, o la señal es mala o irregular, la sesión sigue sin límite de pulso y lo registra sin mencionar arritmia.
- **Componentes:** módulo de sesión; integración con el sensor.
- **Hecho cuando:** una simulación de pulso alto produce la pausa; una simulación de pulso que no baja produce el fin de la sesión y el aviso; el modo sin pulso nunca pausa por pulso.

**D4 Botones de alarma**
- **Qué hacer:** "Me siento mal" y "Me caí", siempre visibles, con los flujos del spec: detener, preguntar, mostrar el 123 ante síntomas de alarma, avisar al cuidador y registrar para el equipo.
- **Componentes:** módulo de sesión; motor de avisos (E1).
- **Hecho cuando:** cada botón detiene la sesión en menos de 1 segundo y genera aviso y registro.

**D5 Pregunta final y progresión**
- **Qué hacer:** preguntar fácil, bien o difícil al terminar. Subir o bajar de nivel según las reglas del documento 0.2. Nunca subir en una sesión con síntomas.
- **Componentes:** motor de progresión.
- **Hecho cuando:** una secuencia simulada de sesiones produce los cambios de nivel esperados, y una sesión con síntomas no sube de nivel.

**D6 Doble tarea cognitiva**
- **Qué hacer:** agregar una tarea cognitiva (contar hacia atrás, nombrar palabras de una categoría, recordar una lista corta) solo a ejercicios de equilibrio cuya versión simple ya es fácil. Si la persona falla la tarea o pierde el equilibrio, volver a la versión simple en la sesión siguiente.
- **Componentes:** banco de tareas cognitivas; motor de progresión.
- **Hecho cuando:** la doble tarea nunca aparece en un ejercicio que la persona no domina, y un fallo registrado la retira en la sesión siguiente.

**D7 Tareas cognitivas sentadas**
- **Qué hacer:** ofrecer tareas cognitivas sentadas a quien espera prescripción médica.
- **Componentes:** banco de tareas cognitivas.
- **Hecho cuando:** una persona bloqueada en C1 puede hacerlas y no puede abrir ejercicio de pie.

**D8 Programación semanal y recordatorios**
- **Qué hacer:** programar 3 sesiones por semana en los días que la persona elige, con recordatorio el día de la sesión.
- **Componentes:** módulo de programación; notificaciones.
- **Hecho cuando:** la persona elige 3 días y recibe el recordatorio esos días.

---

### Fase E — Avisos y seguimiento

**E1 Motor de avisos**
- **Qué hacer:** enviar avisos inmediatos al cuidador y registros al equipo. Si el cuidador no confirma en el plazo de 0.3, marcar el aviso como no atendido y enviarlo al equipo como prioritario.
- **Componentes:** servicio de avisos.
- **Hecho cuando:** un aviso sin confirmación llega al equipo como prioritario al vencer el plazo, y todo aviso queda registrado con hora de envío y de confirmación.

**E2 Abandono**
- **Qué hacer:** a los 7 días sin sesiones, recordatorio a la persona; a los 14, aviso al cuidador si la persona lo autorizó.
- **Componentes:** proceso programado; servicio de avisos.
- **Hecho cuando:** una persona simulada sin sesiones recibe el recordatorio el día 7 y su cuidador el aviso el día 14 solo si hay autorización.

**E3 Persona sin cuidador**
- **Qué hacer:** enviar los avisos solo al equipo y recordar cada mes la opción de designar cuidador.
- **Componentes:** servicio de avisos.
- **Hecho cuando:** sin cuidador, ningún aviso se pierde y el recordatorio mensual se envía.

**E4 Resumen para la consulta**
- **Qué hacer:** antes de cada consulta de vejez, generar un resumen con adherencia, nivel actual, sesiones con síntomas y avisos del periodo.
- **Componentes:** generador de resúmenes.
- **Hecho cuando:** el resumen de una persona de prueba coincide con sus registros del periodo.

**E5 Interfaz del equipo de salud**
- **Qué hacer:** interfaz mínima para recibir avisos, solicitudes de prescripción y resúmenes, y para registrar la prescripción del nivel inicial y los ajustes de nivel tras la consulta.
- **Componentes:** interfaz web del equipo de salud.
- **Hecho cuando:** el equipo ve los avisos prioritarios primero, registra una prescripción y la persona la recibe.

---

### Fase F — Accesibilidad y privacidad

**F1 Revisión de accesibilidad**
- **Qué hacer:** revisar todas las pantallas contra los requisitos del spec: texto grande, audio con repetición, botones grandes, una acción por pantalla, sin límite de tiempo salvo ejercicios cronometrados.
- **Componentes:** todas las pantallas.
- **Hecho cuando:** ninguna pantalla incumple un requisito en la revisión.

**F2 Revisión de permisos**
- **Qué hacer:** comprobar que el cuidador solo ve lo autorizado y que nadie fuera del equipo vinculado ve datos de salud.
- **Componentes:** control de permisos.
- **Hecho cuando:** una prueba con un cuidador y un usuario ajeno no expone información no autorizada.

---

### Fase G — Indicadores

**G1 Indicadores de éxito y seguridad**
- **Qué hacer:** calcular:
  - Proporción de personas activas: al menos 2 de 3 sesiones semanales en las semanas 10 a 12.
  - Porcentaje de sesiones prescritas completadas.
  - Proporción de eventos "Me siento mal" y "Me caí" con aviso entregado y registro.
  - Personas que empezaron el ejercicio sin prescripción registrada tras responder sí en el filtro.
  - Caídas durante sesiones.
- **Componentes:** módulo de reportes.
- **Hecho cuando:** los indicadores se calculan sobre datos de prueba y coinciden con un cálculo manual.

---

### Fase H — Aceptación

**H1 Prueba de punta a punta**
- **Qué hacer:** recorrer con personas reales los flujos del spec: registro, filtro con bloqueo, prescripción, autoevaluación, sesión con ajuste por esfuerzo, doble tarea, ambos botones de alarma, abandono y resumen. Aplicar el skill `verify-after-changes`.
- **Componentes:** sistema completo.
- **Hecho cuando:** todos los flujos se completan sin intervención técnica y todos los criterios medibles del spec se cumplen.

**H2 Piloto de 12 semanas**
- **Qué hacer:** piloto con el prestador de 0.3 para medir adherencia a las 12 semanas y "levántese y ande" y Fried en consulta al inicio y a los 3 meses.
- **Componentes:** sistema completo; equipo clínico.
- **Hecho cuando:** se reportan los indicadores de G1 y los resultados funcionales. Si el piloto se plantea como investigación, requiere aprobación de comité de ética antes de empezar.
