'use client';

import Link from 'next/link';
import { COPY, SIMA_URL } from '@/lib/copy';
import { href, price, type Locale } from '@/lib/i18n';
import { BagLines, useBag } from './Bag';

/**
 * The bag is real; the payment is not. Before anyone could pay, the page says
 * this is a demo and shows what would connect here on a live store.
 */
export function Checkout({ lang }: { lang: Locale }) {
  const t = COPY[lang].checkout;
  const { count, subtotal, setOpen } = useBag();
  const shipping = subtotal >= 1000 || subtotal === 0 ? 0 : 35;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-20">
      <section className="order-last bg-night p-[clamp(1.5rem,4vw,3.5rem)] text-bone lg:order-first">
        <p className="label text-bone/60">{t.demoKicker}</p>
        <h2 className="display mt-5 max-w-[18ch] text-[clamp(2rem,3.4vw,3.2rem)]">{t.demoTitle}</h2>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-bone/80">{t.demoBody}</p>
        <ul className="mt-8 grid grid-cols-1 gap-px bg-bone/15 sm:grid-cols-2">
          {t.demoList.map((x) => (
            <li key={x} className="bg-night py-4 pe-4 text-[14px] sm:ps-0">
              {x}
            </li>
          ))}
        </ul>
        <a href={SIMA_URL} className="label mt-10 inline-flex bg-bone px-7 py-4 text-ink transition-opacity hover:opacity-85">
          {t.demoCta}
        </a>
      </section>

      <aside>
        <h2 className="label">{t.summary}</h2>
        {count === 0 ? (
          <p className="mt-6 text-ash">{t.empty}</p>
        ) : (
          <>
            <BagLines lang={lang} compact />
            <dl className="space-y-2 border-t hairline pt-5 text-[14px]">
              <div className="flex justify-between">
                <dt>{COPY[lang].bag.subtotal}</dt>
                <dd className="tabular-nums">{price(lang, subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t.delivery}</dt>
                <dd className="tabular-nums">{shipping === 0 ? t.free : price(lang, shipping)}</dd>
              </div>
              <div className="flex justify-between border-t hairline pt-3 text-[16px]">
                <dt>{t.total}</dt>
                <dd className="tabular-nums">{price(lang, subtotal + shipping)}</dd>
              </div>
            </dl>
          </>
        )}
        <Link href={href(lang, '/shop')} onClick={() => count > 0 && setOpen(true)} className="mt-8 inline-block text-[13px] text-ash underline underline-offset-4 hover:text-ink">
          {t.back}
        </Link>
      </aside>
    </div>
  );
}
