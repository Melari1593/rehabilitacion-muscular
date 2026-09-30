import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ weight: ['300', '400', '600'], subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  title: 'BienEstar en Casa · Cursos en línea para moverte mejor',
  description:
    'Cursos cortos en video y guías descargables para cuidar tu espalda, tus rodillas y tus músculos desde casa. Contenido revisado por un médico. Pago en línea.',
  openGraph: {
    title: 'BienEstar en Casa',
    description: 'Cursos en línea para moverte mejor desde casa. Contenido revisado por un médico.',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${dmSerif.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
