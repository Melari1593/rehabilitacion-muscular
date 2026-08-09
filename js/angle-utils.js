// Calcula el ángulo (en grados) formado en el punto b por los segmentos b-a y b-c,
// usando coordenadas 3D (x, y, z). Se usa sobre "world landmarks" de MediaPipe.
export function angleAtPoint(a, b, c) {
  if (!a || !b || !c) return null;
  const v1 = { x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) };
  const v2 = { x: c.x - b.x, y: c.y - b.y, z: (c.z || 0) - (b.z || 0) };
  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2 + v1.z ** 2);
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2 + v2.z ** 2);
  if (mag1 === 0 || mag2 === 0) return null;
  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  let cos = dot / (mag1 * mag2);
  cos = Math.min(1, Math.max(-1, cos));
  return (Math.acos(cos) * 180) / Math.PI;
}

// Promedio simple de luminancia de un frame ya dibujado en un canvas (0-255).
export function averageBrightness(ctx, width, height) {
  const { data } = ctx.getImageData(0, 0, width, height);
  let sum = 0;
  const step = 4 * 20; // muestrea 1 de cada 20 píxeles para no pesar la CPU
  let count = 0;
  for (let i = 0; i < data.length; i += step) {
    sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    count++;
  }
  return count ? sum / count : 0;
}
