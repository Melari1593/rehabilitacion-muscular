import Link from 'next/link';
import type { Diccionario } from '@/lib/diccionarios';
import type { Idioma } from '@/lib/i18n';

const TIENDA = 'https://orquidbio.com';
const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento';

export function PiePagina({ lang, t }: { lang: Idioma; t: Diccionario }) {
  return (
    <footer className="border-t border-borde px-[6%] pb-8 pt-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <p className="text-lg" dir="ltr">
            <span className="font-serif">{t.marca.nombre}</span> <span className="font-light">{t.marca.complemento}</span>
          </p>
          <p className="mt-2 text-[13px] font-light text-suave">{t.pie.lema}</p>
        </div>
        <div>
          <p className={eyebrow}>{t.pie.tienda}</p>
          <ul className="space-y-2 text-[13px] text-suave">
            <li><Link className="hover:text-acento" href={`/${lang}#cursos`}>{t.pie.cursos}</Link></li>
            <li><Link className="hover:text-acento" href={`/${lang}#productos`}>{t.pie.productos}</Link></li>
            <li><Link className="hover:text-acento" href={`/${lang}/analisis-postura`}>{t.pie.postura}</Link></li>
          </ul>
        </div>
        <div>
          <p className={eyebrow}>{t.pie.politicas}</p>
          <ul className="space-y-2 text-[13px] text-suave">
            <li><a className="hover:text-acento" href={`${TIENDA}/policies/terms-of-service`}>{t.pie.terminos}</a></li>
            <li><a className="hover:text-acento" href={`${TIENDA}/policies/refund-policy`}>{t.pie.reembolso}</a></li>
            <li><a className="hover:text-acento" href={`${TIENDA}/policies/privacy-policy`}>{t.pie.privacidad}</a></li>
            <li><a className="hover:text-acento" href={`${TIENDA}/pages/shipping`}>{t.pie.envios}</a></li>
          </ul>
        </div>
        <div>
          <p className={eyebrow}>{t.pie.contacto}</p>
          <ul className="space-y-2 text-[13px] text-suave">
            <li><a className="hover:text-acento" href={`${TIENDA}/pages/contact`}>{t.pie.escribenos}</a></li>
            <li>{t.pie.ciudad}</li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-center text-xs font-light text-suave">{t.pie.aviso}</p>
      <p className="mt-2 text-center text-[11px] font-light text-suave/70">
        © {new Date().getFullYear()} BienEstar en Casa · {t.pie.pagos}
      </p>
    </footer>
  );
}
