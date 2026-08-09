import { EXERCISES } from './exercises.js';
import { startCamera, stopCamera } from './camera.js';
import { loadPoseLandmarker, detectForVideo, drawSkeleton } from './pose-detector.js';
import { createRepCounter, visibilityScore } from './rep-counter.js';
import { averageBrightness } from './angle-utils.js';

const BRIGHTNESS_THRESHOLD = 55; // 0-255
const VISIBILITY_THRESHOLD = 0.5;
const STABLE_FRAMES_NEEDED = 15; // ~0.5s a 30fps
const INACTIVITY_MS = 40000;

const views = {
  home: document.getElementById('view-home'),
  prepare: document.getElementById('view-prepare'),
  exercise: document.getElementById('view-exercise'),
  summary: document.getElementById('view-summary'),
  cameraError: document.getElementById('view-camera-error'),
};

function showView(name) {
  Object.values(views).forEach((v) => v.classList.add('hidden'));
  views[name].classList.remove('hidden');
}

let cameraStream = null;
let selectedExercise = null;
let prepareLoopId = null;
let exerciseLoopId = null;

const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

function sampleBrightness(videoEl) {
  offscreenCanvas.width = 80;
  offscreenCanvas.height = 60;
  offscreenCtx.drawImage(videoEl, 0, 0, 80, 60);
  return averageBrightness(offscreenCtx, 80, 60);
}

// ---------- Pantalla de inicio ----------

function renderHome() {
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';
  Object.values(EXERCISES).forEach((ex) => {
    const btn = document.createElement('button');
    btn.className = 'exercise-card';
    btn.innerHTML = `<span class="icon">${ex.icon}</span><span class="name">${ex.name}</span>`;
    btn.addEventListener('click', () => goToPrepare(ex));
    list.appendChild(btn);
  });
}

async function ensureCamera(videoEl) {
  if (!cameraStream) {
    cameraStream = await startCamera(videoEl);
  } else {
    videoEl.srcObject = cameraStream;
  }
}

async function goToPrepare(exercise) {
  selectedExercise = exercise;
  document.getElementById('prepare-title').textContent = exercise.name;
  document.getElementById('prepare-instructions').textContent = exercise.instructions;
  const btnStart = document.getElementById('btn-start-exercise');
  btnStart.disabled = true;

  showView('prepare');

  const video = document.getElementById('prepare-video');
  try {
    await ensureCamera(video);
  } catch (err) {
    showView('cameraError');
    return;
  }

  await loadPoseLandmarker();
  runPrepareLoop();
}

function runPrepareLoop() {
  const video = document.getElementById('prepare-video');
  const canvas = document.getElementById('prepare-canvas');
  const ctx = canvas.getContext('2d');
  const msgEl = document.getElementById('prepare-message');
  const btnStart = document.getElementById('btn-start-exercise');

  let stableOkFrames = 0;

  function loop() {
    if (video.readyState >= 2) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const result = detectForVideo(video, performance.now());
      drawSkeleton(ctx, canvas, result, 'neutral');

      const brightness = sampleBrightness(video);
      const hasPose = result && result.landmarks && result.landmarks.length > 0;
      const visibility = hasPose ? visibilityScore(result.landmarks[0], selectedExercise.visibilityJoints) : 0;

      let ok = true;
      if (brightness < BRIGHTNESS_THRESHOLD) {
        msgEl.textContent = 'Necesitamos más luz. Busca un lugar mejor iluminado.';
        ok = false;
      } else if (!hasPose || visibility < VISIBILITY_THRESHOLD) {
        msgEl.textContent = 'Ajusta la cámara para que se vea tu cuerpo completo.';
        ok = false;
      } else {
        msgEl.textContent = '¡Listo! Te vemos bien.';
      }

      stableOkFrames = ok ? stableOkFrames + 1 : 0;
      btnStart.disabled = stableOkFrames < STABLE_FRAMES_NEEDED;
    }
    prepareLoopId = requestAnimationFrame(loop);
  }
  loop();
}

function stopPrepareLoop() {
  if (prepareLoopId) cancelAnimationFrame(prepareLoopId);
  prepareLoopId = null;
}

document.getElementById('btn-back-home').addEventListener('click', () => {
  stopPrepareLoop();
  stopCamera(cameraStream);
  cameraStream = null;
  showView('home');
});

// ---------- Pantalla de ejercicio ----------

document.getElementById('btn-start-exercise').addEventListener('click', async () => {
  stopPrepareLoop();
  const video = document.getElementById('exercise-video');
  video.srcObject = cameraStream;
  document.getElementById('exercise-title').textContent = selectedExercise.name;
  document.getElementById('rep-counter-badge').textContent = '0';
  document.getElementById('inactivity-message').classList.add('hidden');
  document.getElementById('low-confidence-warning').classList.add('hidden');
  document.getElementById('feedback-message').classList.add('hidden');
  showView('exercise');
  runExerciseLoop();
});

function runExerciseLoop() {
  const video = document.getElementById('exercise-video');
  const canvas = document.getElementById('exercise-canvas');
  const ctx = canvas.getContext('2d');
  const badge = document.getElementById('rep-counter-badge');
  const feedbackEl = document.getElementById('feedback-message');
  const lowConfEl = document.getElementById('low-confidence-warning');
  const inactivityEl = document.getElementById('inactivity-message');

  const repCounter = createRepCounter(selectedExercise);
  let lowConfidenceOccurred = false;
  let lastRepTimestamp = performance.now();
  let feedbackText = '';
  let feedbackClass = '';
  let feedbackHoldUntil = 0;

  function loop() {
    if (video.readyState >= 2) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const result = detectForVideo(video, performance.now());
      const { colorState, message, visibilityOk, repJustCompleted } = repCounter.update(result);

      drawSkeleton(ctx, canvas, result, colorState);
      badge.textContent = String(repCounter.count);

      if (!visibilityOk) {
        lowConfidenceOccurred = true;
        lowConfEl.classList.remove('hidden');
      } else {
        lowConfEl.classList.add('hidden');
      }

      const now = performance.now();
      if (repJustCompleted) {
        lastRepTimestamp = now;
        inactivityEl.classList.add('hidden');
        feedbackText = message;
        feedbackClass = repJustCompleted.correct ? 'correct' : 'incorrect';
        feedbackHoldUntil = now + 1500;
      } else if (colorState === 'incorrect' && message) {
        feedbackText = message;
        feedbackClass = 'incorrect';
        feedbackHoldUntil = now + 300;
      }

      if (now < feedbackHoldUntil) {
        feedbackEl.textContent = feedbackText;
        feedbackEl.className = `feedback-message ${feedbackClass}`;
      } else {
        feedbackEl.classList.add('hidden');
      }

      if (now - lastRepTimestamp > INACTIVITY_MS) {
        inactivityEl.classList.remove('hidden');
      }

      video.dataset.lowConfidenceOccurred = lowConfidenceOccurred ? '1' : '0';
    }
    exerciseLoopId = requestAnimationFrame(loop);
  }
  loop();

  document.getElementById('btn-stop-exercise').onclick = () => {
    cancelAnimationFrame(exerciseLoopId);
    exerciseLoopId = null;
    showSummary(repCounter.getSummary(), lowConfidenceOccurred);
  };
}

// ---------- Pantalla de resumen ----------

const ERROR_LABELS = { shallow: 'movimiento incompleto', deep: 'movimiento excesivo' };

function showSummary(summary, lowConfidenceOccurred) {
  document.getElementById('summary-total').textContent = String(summary.total);
  document.getElementById('summary-correct').textContent = String(summary.correct);
  document.getElementById('summary-incorrect').textContent = String(summary.incorrect);

  const errorTypeEl = document.getElementById('summary-error-type');
  if (summary.mostCommonError) {
    errorTypeEl.textContent = `El error más frecuente fue: ${ERROR_LABELS[summary.mostCommonError]}.`;
  } else if (summary.total > 0) {
    errorTypeEl.textContent = '¡Todas las repeticiones fueron correctas!';
  } else {
    errorTypeEl.textContent = 'No se detectaron repeticiones en esta sesión.';
  }

  document.getElementById('summary-low-confidence').classList.toggle('hidden', !lowConfidenceOccurred);

  showView('summary');
}

document.getElementById('btn-summary-home').addEventListener('click', () => {
  stopCamera(cameraStream);
  cameraStream = null;
  showView('home');
});

// ---------- Error de cámara ----------

document.getElementById('btn-camera-error-retry').addEventListener('click', () => {
  if (selectedExercise) goToPrepare(selectedExercise);
});

document.getElementById('btn-camera-error-home').addEventListener('click', () => {
  showView('home');
});

// ---------- Arranque ----------

renderHome();
showView('home');
