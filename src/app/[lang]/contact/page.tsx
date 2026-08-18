import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactCopy } from '@/components/contact/contactCopy';
import { getAlternates } from '@/lib/seo';
import { getDictionary, normalizeLocale } from '@/lib/i18n';
import { getBuildLocaleCodes } from '@/lib/siteRouting';
import { contactPublishedLocaleCodes, isContactPublishedLocale } from '@/lib/publishedLocales';

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
    alternates: getAlternates(locale, '/contact', contactPublishedLocaleCodes)
  };
}

export default async function LocalizedContactPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ContactPage locale={lang} dict={dict} />;
}

export function generateStaticParams() {
  return getBuildLocaleCodes()
    .filter(isContactPublishedLocale)
    .map((lang) => ({ lang }));
}

export const dynamicParams = false;
