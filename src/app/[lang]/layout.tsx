import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { SmoothScroll } from '@/components/SmoothScroll';
import { COPY, LOCALES, dirOf, isLocale } from '@/lib/content';
import { fontVariables } from '@/lib/fonts';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = COPY[lang].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: lang === 'ar' ? '/' : '/en', languages: { ar: '/', en: '/en' } },
    openGraph: { title: t.title, description: t.description, images: ['/img/wide.webp'], locale: lang === 'ar' ? 'ar_SA' : 'en_SA' },
  };
}

export const viewport: Viewport = { themeColor: '#15130f' };

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} dir={dirOf(lang)} className={`${fontVariables} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
