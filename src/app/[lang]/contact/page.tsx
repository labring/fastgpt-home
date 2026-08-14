import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactCopy } from '@/components/contact/contactCopy';
import { getAlternates } from '@/lib/seo';
import { localeNames, normalizeLocale } from '@/lib/i18n';

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
    alternates: getAlternates(locale, '/contact')
  };
}

export default async function LocalizedContactPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ContactPage locale={lang} />;
}

export function generateStaticParams() {
  return Object.keys(localeNames).map((lang) => ({ lang }));
}
