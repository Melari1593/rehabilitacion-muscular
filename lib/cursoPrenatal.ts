// Contenido del curso de preparación para la maternidad y la paternidad.
// Fuente: guiones en cursos/control-prenatal/ (ajustados a la Res. 3280 de 2018,
// Manual de Obstetricia y Ginecología de Carvajal y Ralph, y revista Creciendo Juntos 2026).

export type Sesion = {
  numero: number;
  semanas: string;
  titulo: string;
  responsable: string;
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

// ---------------------------------------------------------------------------
// English version (/en/prenatal-course). Same clinical content as the Spanish
// version; facilitator scripts are only available in Spanish.
// ---------------------------------------------------------------------------

export const SESIONES_EN: Sesion[] = [
  {
    numero: 1,
    semanas: 'Before week 14',
    titulo: 'Emotional changes during pregnancy',
    responsable: 'Psychology',
    aprenderas: [
      'Which emotions are expected in early pregnancy.',
      'How to tell passing sadness from a symptom that needs a consultation.',
      'How to build your support network and an emotional self-care plan.',
      'Where to get help if there is violence or emotional risk.',
    ],
    mensajes: [
      'Mixed emotions during pregnancy are normal.',
      'Sadness or anxiety that lasts more than 2 weeks needs a consultation.',
      'Asking for help is caring for your baby.',
      'Your partner and family are getting ready too; parenting starts today.',
      'No one deserves violence; help is available.',
    ],
    guion: SESIONES[0].guion,
  },
  {
    numero: 2,
    semanas: 'Weeks 15 to 19',
    titulo: 'Physical changes, self-care and baby’s development',
    responsable: 'Nursing',
    aprenderas: [
      'Why the most common discomforts happen and how to relieve them.',
      'Nutrition, weight gain, supplements and vaccines.',
      'Pelvic floor exercises and good posture.',
      'How your baby grows week by week.',
    ],
    mensajes: [
      'Most discomforts are normal and easy to relieve.',
      'You don’t eat for two: you eat better.',
      'Supplements and vaccines protect both mother and baby.',
      'Don’t self-medicate.',
      'If you notice a warning sign, don’t wait: go to the emergency room.',
    ],
    guion: SESIONES[1].guion,
  },
  {
    numero: 3,
    semanas: 'Weeks 20 to 24',
    titulo: 'Prenatal stimulation and bonding',
    responsable: 'Nursing',
    aprenderas: [
      'What your baby feels and senses inside the womb.',
      'Stimulation through voice, touch and movement.',
      'How to learn your baby’s movement pattern.',
      'Which practices are safe and which to avoid.',
    ],
    mensajes: [
      'Your voice and your touch are the best stimulation.',
      'The goal is bonding, not competition.',
      'No loud volume or bright lights on the belly.',
      'If your baby’s movement pattern changes, seek care the same day.',
      'From the third trimester on, sleep on your side.',
    ],
    guion: SESIONES[2].guion,
  },
  {
    numero: 4,
    semanas: 'Weeks 25 to 27',
    titulo: 'Labor',
    responsable: 'Nursing',
    aprenderas: [
      'How to tell practice contractions from labor contractions.',
      'When to go to the hospital, at term and before term.',
      'The stages of labor and your rights (Colombian Law 2244 of 2022).',
      'Breathing, positions and massage for pain; birth plan and hospital bag.',
    ],
    mensajes: [
      'Regular contractions that don’t ease, leaking fluid or bleeding: go to the hospital.',
      'Before week 37, any regular contractions need a consultation.',
      'Labor has stages; the first one is the longest.',
      'Breathing, movement and support relieve pain; an epidural is also an option.',
      'You have the right to a dignified birth with a companion.',
    ],
    guion: SESIONES[3].guion,
  },
  {
    numero: 5,
    semanas: 'Weeks 28 to 30',
    titulo: 'Newborn care',
    responsable: 'Nursing',
    aprenderas: [
      'What is done for the baby at birth: vaccines, vitamin K and screenings.',
      'Bathing, cord care, diaper changes and dressing (hands-on practice with dolls).',
      'Safe sleep, crying and how to soothe your baby.',
      'Warning signs, check-ups and paperwork for the first days.',
    ],
    mensajes: [
      'Keep the cord clean and dry; no binders or home remedies.',
      'Always put the baby to sleep on their back, in their own crib, with nothing else in it.',
      'Never shake a baby.',
      'Fever, poor feeding, strong yellow color or trouble breathing: emergency room.',
      'Baby’s check-up (with a pediatrician) and mother’s check-up between days 3 and 5 after birth.',
    ],
    guion: SESIONES[4].guion,
  },
  {
    numero: 6,
    semanas: 'Weeks 30 to 32',
    titulo: 'Breastfeeding and family planning',
    responsable: 'Nursing',
    aprenderas: [
      'The benefits of breastfeeding and how milk production works.',
      'Good latch and breastfeeding positions (hands-on practice).',
      'Sore nipples, engorgement, expressing and storing milk.',
      'Contraceptive methods compatible with breastfeeding.',
    ],
    mensajes: [
      'Only breast milk for the first 6 months; continue up to 2 years or more.',
      'If it hurts, check the latch.',
      'Feed on demand: 8 to 12 times a day.',
      'You can get pregnant before your period returns.',
      'Choose your contraceptive method before giving birth.',
    ],
    guion: SESIONES[5].guion,
  },
  {
    numero: 7,
    semanas: 'Week 32',
    titulo: 'Parenting practices',
    responsable: 'Psychology',
    aprenderas: [
      'What secure attachment is and how it is built.',
      'Positive parenting, without physical punishment.',
      'A shared-responsibility agreement for the home.',
      'Baby blues, postpartum depression and warning signs for the mother.',
    ],
    mensajes: [
      'Responding to your baby’s crying builds security, not bad habits.',
      'Talk, read and play with your baby from birth.',
      'Raise children without hitting or humiliation: it’s the law, and it’s what works.',
      'Parenting takes two (or everyone): shared responsibility.',
      'Sadness that lasts more than 2 weeks after birth needs a consultation.',
    ],
    guion: SESIONES[6].guion,
  },
];

export const SIGNOS_ALARMA_EN = [
  'Vaginal bleeding',
  'Fluid leaking from the vagina',
  'Severe headache, blurred vision, seeing spots or ringing in the ears',
  'Swelling of the face, hands or feet that appears suddenly or is there when you wake up',
  'Severe pain in the upper stomach',
  'Fever, or burning when you urinate',
  'Regular contractions before week 37',
  'Your baby moves less than usual or stops moving',
  'Shortness of breath at rest, or one leg that is swollen, red and painful',
  'Vomiting that keeps you from eating or drinking, seizures or fainting',
];
