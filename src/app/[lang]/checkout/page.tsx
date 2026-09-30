import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Checkout } from '@/components/Checkout';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { COPY } from '@/lib/copy';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/checkout'>): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: COPY[lang].checkout.title, robots: { index: false } } : {};
}

export default async function CheckoutPage({ params }: PageProps<'/[lang]/checkout'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <Header lang={lang} />
      <main className="shell pb-24 pt-28 md:pt-36">
        <h1 className="display mb-12 text-[clamp(2.6rem,5vw,4.6rem)]">{COPY[lang].checkout.title}</h1>
        <Checkout lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
