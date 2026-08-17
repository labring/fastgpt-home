import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactCopy } from '@/components/contact/contactCopy';
import { normalizeLocale } from '@/lib/i18n';
import { isContactPublishedLocale } from '@/lib/publishedLocales';
import { getBuildLocaleCodes } from '@/lib/siteRouting';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const copy = getContactCopy(locale);
  return {
    title: `${copy.title} | FastGPT`,
    description: copy.subtitle,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function LocalizedContactEmbedPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ContactPage locale={lang} embedded />;
}

export function generateStaticParams() {
  return getBuildLocaleCodes()
    .filter(isContactPublishedLocale)
    .map((lang) => ({ lang }));
}

export const dynamicParams = false;
