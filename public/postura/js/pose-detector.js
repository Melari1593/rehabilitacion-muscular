// MediaPipe se carga solo cuando hace falta (al elegir un ejercicio), para que el menú
// aparezca aunque el CDN no responda (conexión lenta, bloqueador de anuncios, etc.).
const MEDIAPIPE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';
const WASM_BASE = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';

let mp = null; // módulo de MediaPipe (PoseLandmarker, FilesetResolver, DrawingUtils)
let landmarker = null;

export async function loadPoseLandmarker() {
  if (landmarker) return landmarker;
  if (!mp) mp = await import(MEDIAPIPE_URL);
  const vision = await mp.FilesetResolver.forVisionTasks(WASM_BASE);
  landmarker = await mp.PoseLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
    runningMode: 'VIDEO',
    numPoses: 1,
  });
  return landmarker;
}

// Detecta la pose en el frame actual del video. Devuelve null si aún no hay detección.
export function detectForVideo(videoEl, timestampMs) {
  if (!landmarker) return null;
  return landmarker.detectForVideo(videoEl, timestampMs);
}

// Dibuja el esqueleto sobre un canvas, con el color indicado ('neutral' | 'correct' | 'incorrect').
export function drawSkeleton(ctx, canvas, result, colorState) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!mp || !result || !result.landmarks || result.landmarks.length === 0) {
    ctx.restore();
    return;
  }
  const colors = {
    neutral: '#b7c79c',
    correct: '#22c55e',
    incorrect: '#ef4444',
  };
  const drawingUtils = new mp.DrawingUtils(ctx);
  const color = colors[colorState] || colors.neutral;
  for (const landmarks of result.landmarks) {
    drawingUtils.drawConnectors(landmarks, mp.PoseLandmarker.POSE_CONNECTIONS, {
      color,
      lineWidth: 4,
    });
    drawingUtils.drawLandmarks(landmarks, { color, radius: 3 });
  }
  ctx.restore();
}
