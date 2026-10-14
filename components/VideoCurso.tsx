'use client';

import { useEffect, useRef } from 'react';

// Clip corto en bucle (sin sonido) para la tarjeta de un curso.
// Si el visitante pidió reducir el movimiento, se queda en la imagen fija.
export function VideoCurso({ webm, mp4, poster, alt }: { webm: string; mp4: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aplicar = () => {
      if (consulta.matches) el.pause();
      else el.play().catch(() => {});
    };
    aplicar();
    consulta.addEventListener('change', aplicar);
    return () => consulta.removeEventListener('change', aplicar);
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    >
      {/* WebM (VP9) pesa menos; MP4 (H.264) para Safari y equipos sin VP9 */}
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
