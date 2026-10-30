import Link from 'next/link';
import type { Idioma } from '@/components/Encabezado';

const TIENDA = 'https://orquidbio.com';
const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento';

const TEXTOS = {
  es: {
    lema: 'Cursos en línea y productos para moverte mejor desde casa.',
    tienda: 'Tienda',
    enlaces: [
      { href: '/#cursos', texto: 'Cursos en línea' },
      { href: '/#productos', texto: 'Productos de bienestar' },
      { href: '/ejercicios-por-musculo', texto: 'Ejercicios por músculo' },
      { href: '/analisis-postura', texto: 'Analiza tu postura' },
      { href: '/control-prenatal', texto: 'Curso de control prenatal' },
    ],
    politicas: 'Políticas',
    legales: ['Términos del servicio', 'Política de reembolso', 'Política de privacidad', 'Envíos'],
    contacto: 'Contacto',
    escribenos: 'Escríbenos',
    aviso: 'Contenido educativo. No reemplaza una consulta, diagnóstico ni tratamiento médico.',
    pagos: 'Pagos procesados por Shopify',
  },
  en: {
    lema: 'Online courses and products to help you move better at home.',
    tienda: 'Shop',
    enlaces: [
      { href: '/#cursos', texto: 'Online courses' },
      { href: '/#productos', texto: 'Wellness products' },
      { href: '/analisis-postura', texto: 'Posture analysis' },
      { href: '/en/prenatal-course', texto: 'Prenatal course' },
    ],
    politicas: 'Policies',
    legales: ['Terms of service', 'Refund policy', 'Privacy policy', 'Shipping'],
    contacto: 'Contact',
    escribenos: 'Write to us',
    aviso: 'Educational content. It does not replace medical consultation, diagnosis or treatment.',
    pagos: 'Payments processed by Shopify',
  },
} as const;

const RUTAS_LEGALES = ['/policies/terms-of-service', '/policies/refund-policy', '/policies/privacy-policy', '/pages/shipping'];

export function PiePagina({ idioma = 'es' }: { idioma?: Idioma }) {
  const t = TEXTOS[idioma];
  return (
    <footer className="border-t border-borde px-[6%] pb-8 pt-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <p className="text-lg"><span className="font-serif">BienEstar</span> <span className="font-light">en Casa</span></p>
          <p className="mt-2 text-[13px] font-light text-suave">{t.lema}</p>
        </div>
        <div>
          <p className={eyebrow}>{t.tienda}</p>
          <ul className="space-y-2 text-[13px] text-suave">
            {t.enlaces.map((e) => (
              <li key={e.href}><Link className="hover:text-acento" href={e.href}>{e.texto}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className={eyebrow}>{t.politicas}</p>
          <ul className="space-y-2 text-[13px] text-suave">
            {t.legales.map((texto, i) => (
              <li key={texto}><a className="hover:text-acento" href={`${TIENDA}${RUTAS_LEGALES[i]}`}>{texto}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className={eyebrow}>{t.contacto}</p>
          <ul className="space-y-2 text-[13px] text-suave">
            <li><a className="hover:text-acento" href={`${TIENDA}/pages/contact`}>{t.escribenos}</a></li>
            <li>Bogotá, Colombia</li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-center text-xs font-light text-suave">{t.aviso}</p>
      <p className="mt-2 text-center text-[11px] font-light text-suave/70">© {new Date().getFullYear()} BienEstar en Casa · {t.pagos}</p>
    </footer>
  );
}
