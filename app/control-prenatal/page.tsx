import type { Metadata } from 'next';
import { CursoPrenatal } from '@/components/CursoPrenatal';

export const metadata: Metadata = {
  title: 'Curso de preparación para la maternidad y la paternidad · BienEstar en Casa',
  description:
    'Siete sesiones para acompañar el control prenatal: emociones, cambios del embarazo, vínculo con el bebé, parto, recién nacido, lactancia y crianza. Contenido revisado por un médico.',
  alternates: { languages: { 'es-CO': '/control-prenatal', en: '/en/prenatal-course' } },
};

export default function ControlPrenatal() {
  return <CursoPrenatal idioma="es" />;
}
