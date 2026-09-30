'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { COPY } from '@/lib/copy';
import { href, type Locale } from '@/lib/i18n';
import { useBag } from './Bag';
import { Logo } from './Logo';

/** The same page in the other language. */
function otherLanguage(lang: Locale, path: string) {
  if (lang === 'ar') return path === '/' ? '/en' : `/en${path}`;
  const bare = path.replace(/^\/en(?=\/|$)/, '');
  return bare === '' ? '/' : bare;
}

/**
 * Transparent over the home film, solid everywhere else and once the film has
 * scrolled away.
 */
export function Header({ lang, overFilm = false }: { lang: Locale; overFilm?: boolean }) {
  const t = COPY[lang].nav;
  const { count, setOpen } = useBag();
  const path = usePathname() || '/';
  const [solid, setSolid] = useState(!overFilm);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!overFilm) return;
    const film = document.querySelector<HTMLElement>('[data-film]');
    const on = () => setSolid(!film || window.scrollY > film.offsetHeight - window.innerHeight * 1.02);
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [overFilm]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  const links = [
    { href: href(lang, '/shop/women'), label: t.women },
    { href: href(lang, '/shop/men'), label: t.men },
    { href: href(lang, '/shop/accessories'), label: t.accessories },
    { href: href(lang, '/story'), label: t.story },
  ];
  const light = !solid && !menu;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ${
          light ? 'border-b border-transparent text-bone' : 'border-b hairline bg-bone/95 text-ink backdrop-blur-sm'
        }`}
      >
        {light && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-ink/35 to-transparent" />}
        <div className="shell relative grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[72px]">
          <nav className="flex items-center gap-7" aria-label={t.menu}>
            <button type="button" className="label -ms-2 p-2 md:hidden" onClick={() => setMenu((v) => !v)} aria-expanded={menu}>
              {menu ? t.close : t.menu}
            </button>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="label hidden opacity-90 transition-opacity hover:opacity-100 md:inline">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href={href(lang)} aria-label="SARAB" className="text-[15px] md:text-[17px]">
            <Logo />
          </Link>
          <div className="flex items-center justify-end gap-6">
            <Link href={otherLanguage(lang, path)} className="label hidden md:inline" lang={lang === 'ar' ? 'en' : 'ar'}>
              {t.lang}
            </Link>
            <button type="button" onClick={() => setOpen(true)} className="label -me-2 p-2">
              {t.bag}
              <span className="tabular-nums"> ({count})</span>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-bone pt-16 transition-opacity duration-300 md:hidden ${menu ? 'opacity-100' : 'pointer-events-none opacity-0'}`} inert={!menu}>
        <nav className="shell flex h-full flex-col pb-10 pt-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenu(false)} className="display border-b hairline py-4 text-[2.4rem]">
              {l.label}
            </Link>
          ))}
          <Link href={otherLanguage(lang, path)} onClick={() => setMenu(false)} className="label mt-auto">
            {t.lang}
          </Link>
        </nav>
      </div>
    </>
  );
}
