// Contenido del curso de preparación para la maternidad y la paternidad.
// Fuente: guiones en cursos/control-prenatal/ (ajustados a la Res. 3280 de 2018,
// Manual de Obstetricia y Ginecología de Carvajal y Ralph, y revista Creciendo Juntos 2026).

export type Sesion = {
  numero: number;
  semanas: string;
  titulo: string;
  responsable: 'Psicología' | 'Enfermería';
  aprenderas: string[];
  mensajes: string[];
  guion: string;
};

const RUTA = '/cursos/control-prenatal/';

export const SESIONES: Sesion[] = [
  {
    numero: 1,
    semanas: 'Antes de la semana 14',
    titulo: 'Cambios psicológicos durante el embarazo',
    responsable: 'Psicología',
    aprenderas: [
      'Qué emociones son esperables al inicio del embarazo.',
      'Diferenciar una tristeza pasajera de un síntoma que se consulta.',
      'Armar tu red de apoyo y un plan de autocuidado emocional.',
      'Cuáles son las rutas de atención si hay violencia o riesgo emocional.',
    ],
    mensajes: [
      'Sentir emociones mezcladas en el embarazo es normal.',
      'La tristeza o la angustia que dura más de 2 semanas se consulta.',
      'Pedir ayuda es cuidar al bebé.',
      'La pareja y la familia también se preparan; la crianza empieza hoy.',
      'Nadie merece violencia; hay rutas de atención.',
    ],
    guion: `${RUTA}sesion_1_cambios_psicologicos.txt`,
  },
  {
    numero: 2,
    semanas: 'Semanas 15 a 19',
    titulo: 'Cambios físicos, cuidados y desarrollo del bebé',
    responsable: 'Enfermería',
    aprenderas: [
      'Por qué aparecen las molestias más comunes y cómo aliviarlas.',
      'Alimentación, ganancia de peso, suplementos y vacunas.',
      'Ejercicios de piso pélvico y buena postura.',
      'Cómo crece tu bebé semana a semana.',
    ],
    mensajes: [
      'La mayoría de molestias son normales y tienen alivio sencillo.',
      'No se come por dos: se come mejor.',
      'Suplementos y vacunas protegen a la madre y al bebé.',
      'No automedicarse.',
      'Ante un signo de alarma, no esperar: ir a urgencias.',
    ],
    guion: `${RUTA}sesion_2_cambios_fisicos_desarrollo_fetal.txt`,
  },
  {
    numero: 3,
    semanas: 'Semanas 20 a 24',
    titulo: 'Estimulación intrauterina y vínculo',
    responsable: 'Enfermería',
    aprenderas: [
      'Qué siente y percibe tu bebé dentro del útero.',
      'Estimulación con la voz, el tacto y el movimiento.',
      'Cómo conocer el patrón de movimientos de tu bebé.',
      'Qué prácticas son seguras y cuáles evitar.',
    ],
    mensajes: [
      'Su voz y sus caricias son el mejor estímulo.',
      'El objetivo es el vínculo, no la competencia.',
      'Nada de volumen alto ni luces intensas sobre el abdomen.',
      'Si el patrón de movimientos de su bebé cambia, consulte el mismo día.',
      'Desde el tercer trimestre, a dormir de lado.',
    ],
    guion: `${RUTA}sesion_3_estimulacion_intrauterina.txt`,
  },
  {
    numero: 4,
    semanas: 'Semanas 25 a 27',
    titulo: 'Trabajo de parto',
    responsable: 'Enfermería',
    aprenderas: [
      'Diferenciar las contracciones de práctica de las de parto.',
      'Cuándo ir a la clínica, a término y antes de término.',
      'Las etapas del parto y tus derechos (Ley 2244 de 2022).',
      'Respiración, posiciones y masajes para el dolor; plan de parto y maleta.',
    ],
    mensajes: [
      'Contracciones regulares que no ceden, salida de líquido o sangrado: ir a la clínica.',
      'Antes de la semana 37, cualquier contracción regular se consulta.',
      'El parto tiene etapas; la primera es la más larga.',
      'Respiración, movimiento y acompañamiento alivian el dolor; la epidural también es una opción.',
      'Tienes derecho a un parto digno y acompañado.',
    ],
    guion: `${RUTA}sesion_4_trabajo_de_parto.txt`,
  },
  {
    numero: 5,
    semanas: 'Semanas 28 a 30',
    titulo: 'Cuidados del recién nacido',
    responsable: 'Enfermería',
    aprenderas: [
      'Qué se le hace al bebé al nacer: vacunas, vitamina K y tamizajes.',
      'Baño, cuidado del ombligo, cambio de pañal y vestido (práctica con muñecos).',
      'Sueño seguro, llanto y cómo calmar al bebé.',
      'Signos de alarma, controles y trámites de los primeros días.',
    ],
    mensajes: [
      'Ombligo limpio y seco; sin fajeros ni remedios caseros.',
      'A dormir siempre boca arriba, en su cuna, sin objetos.',
      'Nunca sacudir a un bebé.',
      'Fiebre, mal comer, color amarillo intenso o dificultad para respirar: urgencias.',
      'Control del bebé (con pediatra) y de la madre entre los días 3 y 5 después del parto.',
    ],
    guion: `${RUTA}sesion_5_cuidados_recien_nacido.txt`,
  },
  {
    numero: 6,
    semanas: 'Semanas 30 a 32',
    titulo: 'Lactancia materna y planificación familiar',
    responsable: 'Enfermería',
    aprenderas: [
      'Beneficios de la lactancia y cómo funciona la producción de leche.',
      'Buen agarre y posiciones para amamantar (práctica).',
      'Grietas, congestión, extracción y conservación de la leche.',
      'Métodos de planificación compatibles con la lactancia.',
    ],
    mensajes: [
      'Solo leche materna los primeros 6 meses; continuar hasta 2 años o más.',
      'Si duele, revisa el agarre.',
      'Libre demanda: 8 a 12 veces al día.',
      'Puedes quedar embarazada antes de que regrese la menstruación.',
      'Elige tu método de planificación antes del parto.',
    ],
    guion: `${RUTA}sesion_6_lactancia_y_planificacion.txt`,
  },
  {
    numero: 7,
    semanas: 'Semana 32',
    titulo: 'Prácticas de crianza',
    responsable: 'Psicología',
    aprenderas: [
      'Qué es el apego seguro y cómo se construye.',
      'Crianza positiva, sin castigo físico.',
      'Acuerdo de corresponsabilidad en el hogar.',
      'Tristeza posparto, depresión posparto y signos de alarma de la madre.',
    ],
    mensajes: [
      'Responder al llanto del bebé construye seguridad, no malcrianza.',
      'Hablar, leer y jugar con el bebé desde el nacimiento.',
      'Criar sin golpes ni humillaciones: es la ley y es lo que funciona.',
      'La crianza es de dos (o de todos): corresponsabilidad.',
      'La tristeza que dura más de 2 semanas en el posparto se consulta.',
    ],
    guion: `${RUTA}sesion_7_practicas_de_crianza.txt`,
  },
];

// Signos de alarma en el embarazo (Res. 3280 de 2018, num. 4.3.6).
export const SIGNOS_ALARMA = [
  'Sangrado vaginal',
  'Salida de líquido por la vagina',
  'Dolor de cabeza fuerte, visión borrosa, lucecitas o zumbido en los oídos',
  'Hinchazón de cara, manos o pies que aparece de repente o desde que te levantas',
  'Dolor fuerte en la boca del estómago',
  'Fiebre, o ardor al orinar',
  'Contracciones regulares antes de la semana 37',
  'Disminución o ausencia de los movimientos del bebé',
  'Dificultad para respirar en reposo, o una pierna hinchada, roja y dolorosa',
  'Vómito que no te deja comer ni beber, convulsiones o desmayo',
];
