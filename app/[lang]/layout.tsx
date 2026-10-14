import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DM_Serif_Display, Noto_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import { diccionario } from '@/lib/diccionarios';
import { direccion, esIdioma, IDIOMAS, OG_LOCALE } from '@/lib/i18n';
import '../globals.css';

const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ weight: ['300', '400', '600'], subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
// Letras árabes: solo se aplica (y se descarga) en la versión en árabe.
const arabe = Noto_Sans_Arabic({ weight: ['300', '400', '600'], subsets: ['arabic'], variable: '--font-arabe', display: 'swap', preload: false });

export const dynamicParams = false;

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = diccionario(lang);
  return {
    title: t.meta.titulo,
    description: t.meta.descripcion,
    alternates: { languages: Object.fromEntries(IDIOMAS.map((i) => [i, `/${i}`])) },
    openGraph: {
      title: 'BienEstar en Casa',
      description: t.meta.ogDescripcion,
      locale: OG_LOCALE[lang],
      alternateLocale: IDIOMAS.filter((i) => i !== lang).map((i) => OG_LOCALE[i]),
      type: 'website',
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const fuentes = [dmSerif.variable, jakarta.variable, lang === 'ar' ? arabe.variable : ''].join(' ');
  return (
    <html lang={lang} dir={direccion(lang)} className={fuentes}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
