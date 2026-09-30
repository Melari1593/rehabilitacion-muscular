import { LANDMARKS } from './exercises.js';
import { angleAtPoint } from './angle-utils.js';

const VISIBILITY_OK_THRESHOLD = 0.5;

export function pickSide(normLandmarks, jointNames) {
  const avgVisibility = (side) => {
    const vals = jointNames.map((j) => normLandmarks[LANDMARKS[`${side}_${j}`]]?.visibility ?? 0);
    return vals.reduce((s, v) => s + v, 0) / vals.length;
  };
  const left = avgVisibility('LEFT');
  const right = avgVisibility('RIGHT');
  return left >= right ? { side: 'LEFT', visibility: left } : { side: 'RIGHT', visibility: right };
}

// Visibilidad general del cuerpo para las articulaciones dadas (para la pantalla de "prepárate").
export function visibilityScore(normLandmarks, jointNames) {
  return pickSide(normLandmarks, jointNames).visibility;
}

export function createRepCounter(exerciseConfig) {
  let state = 'rest'; // 'rest' | 'moving'
  let extremeAngle = null;
  const results = []; // { correct: boolean, errorType: 'shallow' | 'deep' | null }

  function evaluate() {
    const { extremeMin, extremeMax, direction } = exerciseConfig;
    if (extremeAngle >= extremeMin && extremeAngle <= extremeMax) {
      return { correct: true, errorType: null };
    }
    if (direction === 'decreasing') {
      return extremeAngle > extremeMax
        ? { correct: false, errorType: 'shallow' }
        : { correct: false, errorType: 'deep' };
    }
    return extremeAngle < extremeMin
      ? { correct: false, errorType: 'shallow' }
      : { correct: false, errorType: 'deep' };
  }

  // Procesa un frame de detección. Devuelve el estado actual para la UI.
  function update(result) {
    if (!result || !result.landmarks?.length || !result.worldLandmarks?.length) {
      return { angle: null, visibilityOk: false, colorState: 'neutral', message: '', repJustCompleted: null };
    }

    const normLandmarks = result.landmarks[0];
    const worldLandmarks = result.worldLandmarks[0];
    const { a, b, c } = exerciseConfig.joint;
    const { side, visibility } = pickSide(normLandmarks, exerciseConfig.visibilityJoints);
    const visibilityOk = visibility >= VISIBILITY_OK_THRESHOLD;

    const pA = worldLandmarks[LANDMARKS[`${side}_${a}`]];
    const pB = worldLandmarks[LANDMARKS[`${side}_${b}`]];
    const pC = worldLandmarks[LANDMARKS[`${side}_${c}`]];
    const angle = angleAtPoint(pA, pB, pC);

    if (angle == null) {
      return { angle: null, visibilityOk, colorState: 'neutral', message: '', repJustCompleted: null };
    }

    const { direction, triggerAngle, returnAngle, extremeMin, extremeMax, tooShallowMsg, tooDeepMsg } =
      exerciseConfig;

    let repJustCompleted = null;
    let colorState = 'neutral';
    let message = '';

    if (state === 'rest') {
      const startedMoving =
        direction === 'decreasing' ? angle <= triggerAngle : angle >= triggerAngle;
      if (startedMoving) {
        state = 'moving';
        extremeAngle = angle;
      }
    }

    if (state === 'moving') {
      extremeAngle = direction === 'decreasing' ? Math.min(extremeAngle, angle) : Math.max(extremeAngle, angle);

      // Feedback en tiempo real mientras se mueve.
      if (angle >= extremeMin && angle <= extremeMax) {
        colorState = 'correct';
      } else if (direction === 'decreasing' && angle < extremeMin) {
        colorState = 'incorrect';
        message = tooDeepMsg;
      } else if (direction === 'increasing' && angle > extremeMax) {
        colorState = 'incorrect';
        message = tooDeepMsg;
      }

      const returnedToRest =
        direction === 'decreasing' ? angle >= returnAngle : angle <= returnAngle;
      if (returnedToRest) {
        const evaluation = evaluate();
        results.push(evaluation);
        repJustCompleted = evaluation;
        if (!evaluation.correct) {
          colorState = 'incorrect';
          message = evaluation.errorType === 'shallow' ? tooShallowMsg : tooDeepMsg;
        } else {
          colorState = 'correct';
          message = '¡Bien!';
        }
        state = 'rest';
        extremeAngle = null;
      }
    }

    return { angle, visibilityOk, colorState, message, repJustCompleted };
  }

  function getSummary() {
    const total = results.length;
    const correct = results.filter((r) => r.correct).length;
    const incorrect = total - correct;
    const errorCounts = {};
    results
      .filter((r) => !r.correct)
      .forEach((r) => {
        errorCounts[r.errorType] = (errorCounts[r.errorType] || 0) + 1;
      });
    let mostCommonError = null;
    let max = 0;
    for (const [type, n] of Object.entries(errorCounts)) {
      if (n > max) {
        max = n;
        mostCommonError = type;
      }
    }
    return { total, correct, incorrect, mostCommonError };
  }

  return { update, getSummary, get count() { return results.length; } };
}
