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
    name: 'Sentadilla',
    icon: '🏋️',
    instructions: 'Ponte de pie, de perfil o de frente a la cámara, con el cuerpo completo visible. Baja doblando rodillas y cadera como si te sentaras, y vuelve a subir.',
    joint: { a: 'HIP', b: 'KNEE', c: 'ANKLE' }, // ángulo de rodilla
    visibilityJoints: ['HIP', 'KNEE', 'ANKLE'],
    direction: 'decreasing', // el ángulo baja al ejecutar el movimiento
    restAngle: 155,          // de pie, casi extendido
    triggerAngle: 135,       // a partir de aquí se considera que empezó a bajar
    returnAngle: 145,        // al volver a este ángulo se cierra la repetición
    extremeMin: 70,
    extremeMax: 100,         // rango correcto de profundidad de la sentadilla
    tooShallowMsg: 'Baja más la cadera',
    tooDeepMsg: 'No bajes tanto, cuida tus rodillas',
  },
  armRaise: {
    id: 'armRaise',
    name: 'Elevación de brazo',
    icon: '🙆',
    instructions: 'Ponte de pie de frente a la cámara con los brazos abajo. Eleva un brazo estirado hasta la altura del hombro, y vuelve a bajar.',
    joint: { a: 'HIP', b: 'SHOULDER', c: 'ELBOW' }, // ángulo de hombro
    visibilityJoints: ['HIP', 'SHOULDER', 'ELBOW', 'WRIST'],
    direction: 'increasing', // el ángulo sube al ejecutar el movimiento
    restAngle: 25,           // brazo abajo
    triggerAngle: 45,        // a partir de aquí se considera que empezó a subir
    returnAngle: 35,         // al volver a este ángulo se cierra la repetición
    extremeMin: 80,
    extremeMax: 110,         // rango correcto de elevación (aprox. altura del hombro)
    tooShallowMsg: 'Sube más el brazo',
    tooDeepMsg: 'No subas tanto el brazo',
  },
};
