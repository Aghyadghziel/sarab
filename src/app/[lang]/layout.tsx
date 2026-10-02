import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { BagDrawer, BagProvider } from '@/components/Bag';
import { SmoothScroll } from '@/components/SmoothScroll';
import { COPY, SITE_URL } from '@/lib/copy';
import { fontVariables } from '@/lib/fonts';
import { LOCALES, dirOf, isLocale } from '@/lib/i18n';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = COPY[lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.title, template: `%s — ${lang === 'ar' ? 'سراب' : 'SARAB'}` },
    description: t.description,
    alternates: { languages: { ar: '/', en: '/en' } },
    openGraph: { title: t.title, description: t.description, images: ['/img/p/dahna-sand-campaign.webp'], locale: lang === 'ar' ? 'ar_SA' : 'en_SA' },
  };
}

export const viewport: Viewport = { themeColor: '#f3eee6' };

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} dir={dirOf(lang)} className={`${fontVariables} antialiased`}>
      <body>
        <BagProvider>
          <SmoothScroll />
          {children}
          <BagDrawer lang={lang} />
        </BagProvider>
      </body>
    </html>
  );
}
