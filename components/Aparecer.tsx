'use client';

import { motion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  retraso?: number;
  escala?: boolean;
  alCargar?: boolean;
  as?: 'div' | 'li' | 'figure';
};

// Aparición suave al entrar en pantalla (una sola vez).
// Con "reducir movimiento" activado, globals.css muestra el contenido sin animación
// (se hace en CSS para que el HTML del servidor y del navegador coincidan).
export function Aparecer({ children, className, retraso = 0, escala = false, alCargar = false, as = 'div' }: Props) {
  const Componente = motion[as];
  const inicial = escala ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: 20 };
  const final = escala ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 };
  return (
    <Componente
      data-aparecer=""
      className={className}
      initial={inicial}
      {...(alCargar ? { animate: final } : { whileInView: final, viewport: { once: true, margin: '0px 0px -10% 0px' } })}
      transition={{ duration: alCargar ? 0.85 : 0.6, delay: retraso, ease: EASE }}
    >
      {children}
    </Componente>
  );
}
