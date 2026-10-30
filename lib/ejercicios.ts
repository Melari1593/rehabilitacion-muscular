// Ejercicios de los cursos, agrupados por músculo para /ejercicios-por-musculo.
//
// Fuente: los diccionarios EJERCICIOS y TECNICAS de cursos/pdf/generar_rutina_rodillas.py,
// generar_plan_espalda.py y generar_guia_automasaje.py. Si cambias un ejercicio allí,
// cámbialo también aquí (el número es el de la lección del curso).
import type { GrupoId } from '@/lib/gruposMusculares';

export type CursoId = 'rodillas' | 'espalda' | 'automasaje';

export const CURSOS: Record<CursoId, { nombre: string; corto: string }> = {
  rodillas: { nombre: 'Rodillas fuertes, prevención y cuidado', corto: 'Rodillas fuertes' },
  espalda: { nombre: 'Espalda sana para quien trabaja sentado', corto: 'Espalda sana' },
  automasaje: { nombre: 'Automasaje y recuperación muscular', corto: 'Automasaje' },
};

export type TipoEjercicio = 'Fuerza' | 'Estiramiento' | 'Movilidad' | 'Equilibrio' | 'Automasaje';

/** principal: el músculo que más trabaja · apoyo: participa, pero no es el objetivo. */
export type Papel = 'principal' | 'apoyo';

export type Ejercicio = {
  curso: CursoId;
  leccion: string;
  nombre: string;
  tipo: TipoEjercicio;
  como: string;
  clave: string;
  grupos: Partial<Record<GrupoId, Papel>>;
};

export const EJERCICIOS: Ejercicio[] = [
  // Rodillas fuertes
  {
    curso: 'rodillas', leccion: '2.1', nombre: 'Contracción de cuádriceps con toalla', tipo: 'Fuerza',
    como: 'Sentado con la pierna estirada y una toalla enrollada bajo la rodilla. Aprieta el muslo contra la toalla 5 s y relaja.',
    clave: 'Respira normal. El trabajo es del muslo.',
    grupos: { cuadriceps: 'principal' },
  },
  {
    curso: 'rodillas', leccion: '2.2', nombre: 'Elevación de pierna recta', tipo: 'Fuerza',
    como: 'Boca arriba, una rodilla doblada. Aprieta el muslo de la pierna estirada y súbela hasta la altura de la otra rodilla. Baja en 3 s.',
    clave: 'Si la rodilla se dobla, sube menos.',
    grupos: { cuadriceps: 'principal', abdomen: 'apoyo' },
  },
  {
    curso: 'rodillas', leccion: '2.3', nombre: 'Sentarse y levantarse de la silla', tipo: 'Fuerza',
    como: 'Pies al ancho de la cadera. Inclina el tronco y levántate sin impulso. Baja despacio llevando la cadera hacia atrás.',
    clave: 'Rodillas en línea con la punta de los pies.',
    grupos: { cuadriceps: 'principal', 'gluteo-mayor': 'principal', 'cadera-lateral': 'apoyo' },
  },
  {
    curso: 'rodillas', leccion: '3.1', nombre: 'Puente de glúteos', tipo: 'Fuerza',
    como: 'Boca arriba, rodillas dobladas. Aprieta glúteos y sube la cadera hasta alinear hombros, cadera y rodillas. 2 s arriba.',
    clave: 'No arquees la zona lumbar.',
    grupos: { 'gluteo-mayor': 'principal', isquiotibiales: 'apoyo', 'zona-lumbar': 'apoyo' },
  },
  {
    curso: 'rodillas', leccion: '3.2', nombre: 'Almeja (clamshell)', tipo: 'Fuerza',
    como: 'De lado, rodillas dobladas y pies juntos. Abre la rodilla de arriba sin separar los pies ni girar la cadera.',
    clave: 'Movimiento lento y controlado.',
    grupos: { 'cadera-lateral': 'principal' },
  },
  {
    curso: 'rodillas', leccion: '3.3', nombre: 'Abducción de cadera de pie', tipo: 'Fuerza',
    como: 'Apoyado en una silla, lleva una pierna hacia el lado con el tronco recto y vuelve despacio.',
    clave: 'No te inclines hacia el otro lado.',
    grupos: { 'cadera-lateral': 'principal' },
  },
  {
    curso: 'rodillas', leccion: '4.1', nombre: 'Apoyo sobre una pierna', tipo: 'Equilibrio',
    como: 'Junto a una pared, levanta un pie y mantén el equilibrio con la rodilla de apoyo ligeramente flexionada.',
    clave: 'Siempre con un apoyo cerca.',
    grupos: { 'cadera-lateral': 'principal', pantorrilla: 'apoyo', 'planta-pie': 'apoyo' },
  },
  {
    curso: 'rodillas', leccion: '4.2', nombre: 'Subir un escalón', tipo: 'Fuerza',
    como: 'Sube un escalón bajo empujando con el talón. Baja despacio, controlando.',
    clave: 'La rodilla no se va hacia adentro.',
    grupos: { cuadriceps: 'principal', 'gluteo-mayor': 'principal', 'cadera-lateral': 'apoyo' },
  },
  {
    curso: 'rodillas', leccion: '4.3', nombre: 'Minisentadilla a una pierna (opcional)', tipo: 'Fuerza',
    como: 'Apoyado en la pared, sobre una pierna, dobla un poco la rodilla (unos 30°) y vuelve a subir.',
    clave: 'Solo si lo anterior es fácil y sin dolor.',
    grupos: { cuadriceps: 'principal', 'cadera-lateral': 'apoyo', 'gluteo-mayor': 'apoyo' },
  },

  // Espalda sana
  {
    curso: 'espalda', leccion: '2.1', nombre: 'Círculos de hombros', tipo: 'Movilidad',
    como: 'Sube los hombros hacia las orejas, llévalos atrás y bájalos. Círculos lentos y amplios.',
    clave: '10 hacia atrás.',
    grupos: { 'espalda-alta': 'principal', cuello: 'apoyo' },
  },
  {
    curso: 'espalda', leccion: '2.2', nombre: 'Retracción de mentón', tipo: 'Movilidad',
    como: 'Mirando al frente, lleva la cabeza hacia atrás como haciendo papada. Mantén 3 s y suelta.',
    clave: 'No bajes la barbilla al pecho. 8 repeticiones.',
    grupos: { cuello: 'principal' },
  },
  {
    curso: 'espalda', leccion: '2.3', nombre: 'Extensión de pie', tipo: 'Movilidad',
    como: 'Manos en la cintura, inclínate suavemente hacia atrás mirando al frente y vuelve.',
    clave: 'Pequeño y cómodo. Si el dolor baja por la pierna, sáltalo. 5 repeticiones.',
    grupos: { 'zona-lumbar': 'principal' },
  },
  {
    curso: 'espalda', leccion: '3.1', nombre: 'Inclinación lateral de cuello', tipo: 'Estiramiento',
    como: 'Sujeta la silla con una mano e inclina la oreja contraria hacia su hombro, sin girar la cara.',
    clave: 'Sin tirar de la cabeza. 20-30 s por lado.',
    grupos: { cuello: 'principal' },
  },
  {
    curso: 'espalda', leccion: '3.2', nombre: 'Rotación de tronco sentado', tipo: 'Movilidad',
    como: 'Brazos cruzados sobre el pecho, gira el tronco desde la cintura y vuelve al centro.',
    clave: 'Cadera y rodillas miran al frente. 5 por lado.',
    grupos: { abdomen: 'principal', 'zona-lumbar': 'apoyo' },
  },
  {
    curso: 'espalda', leccion: '3.3', nombre: 'Gato-camello', tipo: 'Movilidad',
    como: 'En cuatro apoyos, redondea la espalda al soltar el aire y deja bajar el abdomen al tomarlo.',
    clave: 'Lento, vértebra a vértebra. 8-10 repeticiones.',
    grupos: { 'zona-lumbar': 'principal', 'espalda-alta': 'apoyo', abdomen: 'apoyo' },
  },
  {
    curso: 'espalda', leccion: '3.4', nombre: 'Rodillas al pecho', tipo: 'Estiramiento',
    como: 'Boca arriba, abraza las rodillas. Puedes balancearte suavemente de lado a lado.',
    clave: 'Versión suave: una rodilla a la vez.',
    grupos: { 'zona-lumbar': 'principal', 'gluteo-mayor': 'apoyo' },
  },
  {
    curso: 'espalda', leccion: '3.5', nombre: 'Postura del niño', tipo: 'Estiramiento',
    como: 'Sentado sobre los talones, lleva el tronco adelante con los brazos estirados y la frente apoyada.',
    clave: 'Con molestias de rodilla, usa rodillas al pecho.',
    grupos: { 'zona-lumbar': 'principal', 'espalda-alta': 'apoyo' },
  },
  {
    curso: 'espalda', leccion: '4.1', nombre: 'Activación abdominal', tipo: 'Fuerza',
    como: 'Boca arriba, mete suavemente el ombligo hacia dentro y mantén respirando normal.',
    clave: 'Esfuerzo del 30%, sin contener el aire.',
    grupos: { abdomen: 'principal' },
  },
  {
    curso: 'espalda', leccion: '4.2', nombre: 'Bicho muerto', tipo: 'Fuerza',
    como: 'Piernas a 90° y brazos al techo. Baja un brazo y la pierna contraria sin despegar la zona lumbar.',
    clave: 'Versión suave: solo las piernas.',
    grupos: { abdomen: 'principal' },
  },
  {
    curso: 'espalda', leccion: '4.3', nombre: 'Perro de muestra', tipo: 'Fuerza',
    como: 'En cuatro apoyos, estira un brazo y la pierna contraria en línea con el tronco. 3 s.',
    clave: 'Como si llevaras un vaso en la espalda.',
    grupos: { 'zona-lumbar': 'principal', 'gluteo-mayor': 'principal', abdomen: 'apoyo', 'espalda-alta': 'apoyo' },
  },
  {
    curso: 'espalda', leccion: '4.4', nombre: 'Puente de glúteos', tipo: 'Fuerza',
    como: 'Boca arriba, aprieta los glúteos y sube la cadera hasta alinear hombros, cadera y rodillas.',
    clave: 'No arquees la zona lumbar.',
    grupos: { 'gluteo-mayor': 'principal', isquiotibiales: 'apoyo', 'zona-lumbar': 'apoyo' },
  },

  // Automasaje y recuperación muscular
  {
    curso: 'automasaje', leccion: '2.1', nombre: 'Pantorrillas con rodillo', tipo: 'Automasaje',
    como: 'Sentado, manos atrás, cadera arriba. Rueda desde encima del tobillo hasta debajo de la rodilla. Gira la pierna para los lados.',
    clave: '30-60 s por pierna. Evita el tendón de Aquiles y la parte de atrás de la rodilla.',
    grupos: { pantorrilla: 'principal' },
  },
  {
    curso: 'automasaje', leccion: '2.2', nombre: 'Isquiotibiales con rodillo', tipo: 'Automasaje',
    como: 'Rodillo bajo la parte de atrás de los muslos. Rueda desde encima de la rodilla hasta debajo del glúteo.',
    clave: '30-60 s por pierna. Evita la parte de atrás de la rodilla.',
    grupos: { isquiotibiales: 'principal' },
  },
  {
    curso: 'automasaje', leccion: '2.3', nombre: 'Cuádriceps con rodillo', tipo: 'Automasaje',
    como: 'Boca abajo sobre los antebrazos, abdomen activo. Rueda desde debajo de la cadera hasta un palmo antes de la rótula.',
    clave: '30-60 s por pierna. No hundas la zona lumbar ni ruedes sobre la rótula.',
    grupos: { cuadriceps: 'principal' },
  },
  {
    curso: 'automasaje', leccion: '2.4', nombre: 'Lateral del muslo con rodillo', tipo: 'Automasaje',
    como: 'De lado, pierna de arriba cruzada delante con el pie apoyado para quitar peso. Rueda despacio.',
    clave: '30 s por pierna, suave. Es una zona muy sensible: evita la presión alta.',
    grupos: { 'cadera-lateral': 'principal', cuadriceps: 'apoyo' },
  },
  {
    curso: 'automasaje', leccion: '3.1', nombre: 'Espalda alta con rodillo', tipo: 'Automasaje',
    como: 'Boca arriba, rodillo atravesado bajo los omóplatos, manos sosteniendo la cabeza. Rueda de mitad de espalda a omóplatos.',
    clave: '30-60 s. No bajes a la zona lumbar ni tires del cuello.',
    grupos: { 'espalda-alta': 'principal' },
  },
  {
    curso: 'automasaje', leccion: '3.2', nombre: 'Glúteos con pelota', tipo: 'Automasaje',
    como: 'Sentado sobre la pelota, tobillo cruzado sobre la rodilla contraria. Círculos pequeños. Versión suave: contra la pared.',
    clave: '45-60 s por lado. Para si notas hormigueo o corriente en la pierna.',
    grupos: { 'gluteo-mayor': 'principal', 'cadera-lateral': 'principal' },
  },
  {
    curso: 'automasaje', leccion: '3.3', nombre: 'Planta del pie con pelota', tipo: 'Automasaje',
    como: 'De pie con apoyo, o sentado. Rueda del talón a la base de los dedos, a lo largo y de lado a lado.',
    clave: '30-60 s por pie. Si el dolor de talón dura semanas, consulta.',
    grupos: { 'planta-pie': 'principal' },
  },
  {
    curso: 'automasaje', leccion: '3.4', nombre: 'Espalda alta y hombros con pelota en la pared', tipo: 'Automasaje',
    como: 'De espaldas a la pared, pelota entre el omóplato y la columna. Dobla un poco las rodillas y muévete arriba y abajo.',
    clave: '30-60 s por lado. No pongas la pelota sobre la columna.',
    grupos: { 'espalda-alta': 'principal' },
  },
];

/** Ejercicios de un grupo: primero los que lo trabajan como músculo principal. */
export function ejerciciosDeGrupo(grupo: GrupoId): (Ejercicio & { papel: Papel })[] {
  return EJERCICIOS.filter((e) => e.grupos[grupo])
    .map((e) => ({ ...e, papel: e.grupos[grupo]! }))
    .sort((a, b) => (a.papel === b.papel ? 0 : a.papel === 'principal' ? -1 : 1));
}
