'use client';

import { useEffect, useState } from 'react';
import { COPY } from '@/lib/copy';
import type { Locale } from '@/lib/i18n';
import { riyadhSunset } from '@/lib/sun';
import { Mark } from './Mark';

/** Today's real sunset in Riyadh, worked out in the browser. Before and after it, the line changes. */
export function Sunset({ lang }: { lang: Locale }) {
  const t = COPY[lang].home;
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const set = riyadhSunset(now);
      const time = set.toLocaleTimeString(lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US', { timeZone: 'Asia/Riyadh', hour: 'numeric', minute: '2-digit' });
      setLine(now < set ? t.sunsetAhead(time) : t.sunsetPast(time));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [lang, t]);

  return (
    <p className="mt-8 flex min-h-6 items-center gap-3 text-[13px] text-bone/65">
      <Mark shimmer className="h-6 w-6 shrink-0 text-sand" />
      <span className={`transition-opacity duration-700 ${line ? 'opacity-100' : 'opacity-0'}`}>{line ?? ' '}</span>
    </p>
  );
}
