import Link from 'next/link';
import { COPY, SIMA_URL } from '@/lib/copy';
import { href, type Locale } from '@/lib/i18n';
import { Logo } from './Logo';

export function Footer({ lang }: { lang: Locale }) {
  const t = COPY[lang];
  const f = t.footer;
  const help = ['/story#delivery', '/story#delivery', '/product/dahna-coat#size', '/story#care'];
  const house = ['/story', '/shop'];
  return (
    <footer className="border-t hairline bg-bone">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Logo className="text-[18px]" />
          <p className="mt-6 max-w-[42ch] text-[13px] leading-relaxed text-ash">{f.demo}</p>
        </div>
        <div>
          <p className="label text-ash">{f.help}</p>
          <ul className="mt-4 space-y-2">
            {f.helpLinks.map((l, i) => (
              <li key={l}>
                <Link href={href(lang, help[i])} className="hover:underline underline-offset-4">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-ash">{f.house}</p>
          <ul className="mt-4 space-y-2">
            {f.houseLinks.map((l, i) => (
              <li key={l}>
                <Link href={href(lang, house[i])} className="hover:underline underline-offset-4">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-ash">{t.nav.shopAll}</p>
          <ul className="mt-4 space-y-2">
            {(['women', 'men', 'accessories'] as const).map((c) => (
              <li key={c}>
                <Link href={href(lang, `/shop/${c}`)} className="hover:underline underline-offset-4">
                  {t.category[c]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell flex flex-wrap items-center justify-between gap-4 border-t hairline py-6 text-[13px] text-ash">
        <p>{f.rights}</p>
        <p>
          {f.by}{' '}
          <a href={SIMA_URL} className="text-ink underline-offset-4 hover:underline" dir="ltr">
            SIMA Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
