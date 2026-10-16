import type { Metadata } from 'next';
import { CursoPrenatal } from '@/components/CursoPrenatal';

export const metadata: Metadata = {
  title: 'Childbirth and parenting preparation course · BienEstar en Casa',
  description:
    'Seven sessions that go along with prenatal care: emotions, body changes, bonding with your baby, labor, newborn care, breastfeeding and parenting. Content reviewed by a physician.',
  alternates: { languages: { 'es-CO': '/control-prenatal', en: '/en/prenatal-course' } },
  openGraph: {
    title: 'Prenatal course · BienEstar en Casa',
    description: 'Seven sessions to get ready for your baby’s arrival. Content reviewed by a physician.',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PrenatalCourse() {
  return <CursoPrenatal idioma="en" />;
}
