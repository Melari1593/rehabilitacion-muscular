import { t } from './i18n.js';

export const LANDMARKS = {
  LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13, RIGHT_ELBOW: 14,
  LEFT_WRIST: 15, RIGHT_WRIST: 16,
  LEFT_HIP: 23, RIGHT_HIP: 24,
  LEFT_KNEE: 25, RIGHT_KNEE: 26,
  LEFT_ANKLE: 27, RIGHT_ANKLE: 28,
};

// Cada ejercicio define el ángulo articular que se mide (a-b-c, ángulo en b)
// y los umbrales para contar repeticiones y evaluar si el movimiento fue correcto.
export const EXERCISES = {
  squat: {
    id: 'squat',
    name: t('squatNombre'),
    icon: '🏋️',
    instructions: t('squatInstrucciones'),
    joint: { a: 'SHOULDER', b: 'HIP', c: 'KNEE' }, // ángulo de cadera (flexión de tronco)
    visibilityJoints: ['SHOULDER', 'HIP', 'KNEE'],
    direction: 'decreasing', // el ángulo baja al ejecutar el movimiento
    restAngle: 155,          // de pie, casi extendido
    triggerAngle: 135,       // a partir de aquí se considera que empezó a bajar
    returnAngle: 145,        // al volver a este ángulo se cierra la repetición
    extremeMin: 70,
    extremeMax: 100,         // rango correcto de profundidad de la sentadilla
    tooShallowMsg: t('squatPoco'),
    tooDeepMsg: t('squatMucho'),
  },
  armRaise: {
    id: 'armRaise',
    name: t('brazoNombre'),
    icon: '🙆',
    instructions: t('brazoInstrucciones'),
    joint: { a: 'HIP', b: 'SHOULDER', c: 'ELBOW' }, // ángulo de hombro
    visibilityJoints: ['HIP', 'SHOULDER', 'ELBOW'],
    direction: 'increasing', // el ángulo sube al ejecutar el movimiento
    restAngle: 25,           // brazo abajo
    triggerAngle: 45,        // a partir de aquí se considera que empezó a subir
    returnAngle: 35,         // al volver a este ángulo se cierra la repetición
    extremeMin: 80,
    extremeMax: 110,         // rango correcto de elevación (aprox. altura del hombro)
    tooShallowMsg: t('brazoPoco'),
    tooDeepMsg: t('brazoMucho'),
  },
};
