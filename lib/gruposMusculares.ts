// Grupos musculares de la página /ejercicios-por-musculo.
// Cada grupo resalta en el modelo 3D las piezas cuyo nombre (en inglés, de BodyParts3D)
// coincide con `piezas`. Una pieza puede pertenecer a más de un grupo.
//
// Limitaciones del modelo BodyParts3D: no incluye recto abdominal, transverso del abdomen,
// oblicuo interno, dorsal ancho, multífidos ni cuadrado lumbar.

export type GrupoId =
  | 'cuello'
  | 'espalda-alta'
  | 'abdomen'
  | 'zona-lumbar'
  | 'gluteo-mayor'
  | 'cadera-lateral'
  | 'cuadriceps'
  | 'isquiotibiales'
  | 'pantorrilla'
  | 'planta-pie';

export type GrupoMuscular = {
  id: GrupoId;
  nombre: string;
  /** Qué hace el grupo, en lenguaje sencillo. */
  funcion: string;
  /** Músculos que se resaltan, en español. */
  musculos: string[];
  /** Nota visible cuando el modelo no muestra todo el grupo. */
  nota?: string;
  /** Expresión que reconoce las piezas del modelo 3D por su nombre en inglés. */
  piezas: RegExp;
  /** Dirección desde la que se ve mejor: frente o espalda. */
  vista: 'frente' | 'espalda';
};

export const GRUPOS: GrupoMuscular[] = [
  {
    id: 'cuello',
    nombre: 'Cuello',
    funcion: 'Sostienen y mueven la cabeza. Se cargan con la pantalla baja y el celular.',
    musculos: ['Esternocleidomastoideo', 'Escalenos', 'Esplenio', 'Semiespinoso', 'Trapecio superior', 'Elevador de la escápula'],
    piezas:
      /sternocleidomastoid|scalenus|splenius|semispinalis (capitis|cervicis)|longus colli|longus capitis|rectus capitis|obliquus capitis|longissimus (capitis|cervicis)|iliocostalis cervicis|descending part of .*trapezius|levator scapulae/i,
    vista: 'espalda',
  },
  {
    id: 'espalda-alta',
    nombre: 'Espalda alta y hombros',
    funcion: 'Estabilizan los omóplatos y la postura de los hombros. Se tensan al trabajar encorvado.',
    musculos: ['Trapecio', 'Romboides', 'Elevador de la escápula', 'Supraespinoso', 'Infraespinoso', 'Redondos', 'Deltoides posterior', 'Iliocostal torácico'],
    piezas:
      /trapezius|rhomboid|levator scapulae|supraspinatus|infraspinatus|teres (major|minor)|spinal part of .*deltoid|serratus posterior superior|iliocostalis thoracis/i,
    vista: 'espalda',
  },
  {
    id: 'abdomen',
    nombre: 'Abdomen',
    funcion: 'Estabilizan el tronco y protegen la zona lumbar al moverte.',
    musculos: ['Oblicuo externo'],
    nota: 'El modelo 3D no incluye el recto ni el transverso del abdomen, que también trabajan en estos ejercicios.',
    piezas: /external oblique/i,
    vista: 'frente',
  },
  {
    id: 'zona-lumbar',
    nombre: 'Zona lumbar',
    funcion: 'Extienden y estabilizan la columna. Se cargan al pasar muchas horas sentado.',
    musculos: ['Iliocostal lumbar', 'Longísimo', 'Espinoso', 'Músculos cortos de la columna lumbar'],
    nota: 'El modelo 3D no incluye los multífidos ni el cuadrado lumbar.',
    piezas: /iliocostalis lumborum|longissimus thoracis|(^|\s)spinalis( thoracis)?$|interspinales lumborum|lumbar rotator|lumbar intertransversarius/i,
    vista: 'espalda',
  },
  {
    id: 'gluteo-mayor',
    nombre: 'Glúteo mayor',
    funcion: 'Extiende la cadera: te levanta de la silla y te impulsa al subir escaleras.',
    musculos: ['Glúteo mayor'],
    piezas: /gluteus maximus/i,
    vista: 'espalda',
  },
  {
    id: 'cadera-lateral',
    nombre: 'Glúteo medio y cadera lateral',
    funcion: 'Mantienen la pelvis nivelada al apoyarte en una pierna y evitan que la rodilla se vaya hacia adentro.',
    musculos: ['Glúteo medio', 'Glúteo menor', 'Tensor de la fascia lata', 'Cintilla iliotibial', 'Piriforme y rotadores profundos'],
    piezas: /gluteus (medius|minimus)|tensor fasciae latae|iliotibial tract|piriformis|gemellus|obturator internus|quadratus femoris/i,
    vista: 'espalda',
  },
  {
    id: 'cuadriceps',
    nombre: 'Cuádriceps',
    funcion: 'Extiende la rodilla y la protege al caminar, subir escalones y levantarte.',
    musculos: ['Recto femoral', 'Vasto lateral', 'Vasto medial', 'Vasto intermedio'],
    piezas: /rectus femoris|vastus (lateralis|medialis|intermedius)/i,
    vista: 'frente',
  },
  {
    id: 'isquiotibiales',
    nombre: 'Isquiotibiales',
    funcion: 'Doblan la rodilla y extienden la cadera. Se acortan con muchas horas sentado.',
    musculos: ['Bíceps femoral', 'Semitendinoso', 'Semimembranoso'],
    piezas: /biceps femoris|semitendinosus|semimembranosus/i,
    vista: 'espalda',
  },
  {
    id: 'pantorrilla',
    nombre: 'Pantorrilla',
    funcion: 'Impulsan el paso y estabilizan el tobillo.',
    musculos: ['Gastrocnemio (gemelos)', 'Sóleo', 'Plantar delgado'],
    piezas: /gastrocnemius|soleus|plantaris/i,
    vista: 'espalda',
  },
  {
    id: 'planta-pie',
    nombre: 'Planta del pie',
    funcion: 'Sostienen el arco del pie y ayudan al equilibrio.',
    musculos: ['Abductor del dedo gordo', 'Flexor corto de los dedos', 'Cuadrado plantar', 'Músculos cortos del pie'],
    piezas:
      /abductor hallucis|flexor digitorum brevis|flexor accessorius|of (left|right) foot|flexor hallucis brevis|adductor hallucis/i,
    vista: 'frente',
  },
];

export const GRUPO_POR_ID = Object.fromEntries(GRUPOS.map((g) => [g.id, g])) as Record<GrupoId, GrupoMuscular>;

/** Grupos a los que pertenece un músculo del modelo, según su nombre en inglés. Solo aplica a la capa de músculos. */
export function gruposDePieza(nombre: string): GrupoId[] {
  return GRUPOS.filter((g) => g.piezas.test(nombre)).map((g) => g.id);
}
