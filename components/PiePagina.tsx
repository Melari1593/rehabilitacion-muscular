import Link from 'next/link';

const TIENDA = 'https://orquidbio.com';
const eyebrow = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-acento';

export function PiePagina() {
  return (
    <footer className="border-t border-borde px-[6%] pb-8 pt-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div>
          <p className="text-lg"><span className="font-serif">BienEstar</span> <span className="font-light">en Casa</span></p>
          <p className="mt-2 text-[13px] font-light text-suave">Cursos en línea y productos para moverte mejor desde casa.</p>
        </div>
        <div>
          <p className={eyebrow}>Tienda</p>
          <ul className="space-y-2 text-[13px] text-suave">
            <li><Link className="hover:text-acento" href="/#cursos">Cursos en línea</Link></li>
            <li><Link className="hover:text-acento" href="/#productos">Productos de bienestar</Link></li>
            <li><Link className="hover:text-acento" href="/analisis-postura">Analiza tu postura</Link></li>
          </ul>
        </div>
        <div>
          <p className={eyebrow}>Políticas</p>
          <ul className="space-y-2 text-[13px] text-suave">
            <li><a className="hover:text-acento" href={`${TIENDA}/policies/terms-of-service`}>Términos del servicio</a></li>
            <li><a className="hover:text-acento" href={`${TIENDA}/policies/refund-policy`}>Política de reembolso</a></li>
            <li><a className="hover:text-acento" href={`${TIENDA}/policies/privacy-policy`}>Política de privacidad</a></li>
            <li><a className="hover:text-acento" href={`${TIENDA}/pages/shipping`}>Envíos</a></li>
          </ul>
        </div>
        <div>
          <p className={eyebrow}>Contacto</p>
          <ul className="space-y-2 text-[13px] text-suave">
            <li><a className="hover:text-acento" href={`${TIENDA}/pages/contact`}>Escríbenos</a></li>
            <li>Bogotá, Colombia</li>
          </ul>
        </div>
      </div>
      <p className="mt-12 text-center text-xs font-light text-suave">
        Contenido educativo. No reemplaza una consulta, diagnóstico ni tratamiento médico.
      </p>
      <p className="mt-2 text-center text-[11px] font-light text-suave/70">© {new Date().getFullYear()} BienEstar en Casa · Pagos procesados por Shopify</p>
    </footer>
  );
}
