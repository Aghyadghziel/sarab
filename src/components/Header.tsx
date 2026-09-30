import Link from 'next/link';

type Props = {
  home: string;
  nav: { collection: string; cloth: string; looks: string; night: string; lang: string; langHref: string };
};

/** Blends against whatever is behind it, so it reads on cloth, sky and night alike. */
export function Header({ home, nav }: Props) {
  const links = [
    { href: '#collection', label: nav.collection },
    { href: '#cloth', label: nav.cloth },
    { href: '#looks', label: nav.looks },
    { href: '#night', label: nav.night },
  ];
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="shell pointer-events-auto flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href={home} dir="ltr" className="font-(family-name:--f-display) text-2xl tracking-[0.18em]">
          SARAB
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="opacity-80 transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
        </nav>
        <Link href={nav.langHref} className="grid h-10 min-w-10 place-items-center rounded-full border border-white/50 px-3 text-sm transition-colors hover:bg-white hover:text-black">
          {nav.lang}
        </Link>
      </div>
    </header>
  );
}
