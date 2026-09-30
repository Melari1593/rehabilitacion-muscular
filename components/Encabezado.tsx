import Link from 'next/link';

const ENLACES = [
  { href: '/#cursos', texto: 'Cursos' },
  { href: '/#productos', texto: 'Productos' },
  { href: '/analisis-postura', texto: 'Analiza tu postura' },
  { href: '/#revision', texto: 'Revisión médica' },
];

export function Encabezado() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-borde bg-fondo/95 backdrop-blur-md">
      <nav className="mx-auto flex h-full items-center justify-between px-[6%]" aria-label="Principal">
        <Link href="/" className="text-xl text-tinta">
          <span className="font-serif">BienEstar</span> <span className="font-light">en Casa</span>
        </Link>
        <ul className="hidden gap-8 text-sm md:flex">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <Link className="transition-colors hover:text-acento" href={e.href}>
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/#cursos" className="rounded-md bg-tinta px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-acento">
          Ver cursos
        </Link>
      </nav>
    </header>
  );
}
