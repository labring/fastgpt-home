import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactCopy } from '@/components/contact/contactCopy';
import { getAlternates } from '@/lib/seo';
import { getContactLocale } from '@/lib/contact';
import { getDictionary, normalizeLocale } from '@/lib/i18n';
import {
  getBuildLocaleCodes,
  currentSiteVariant
} from '@/lib/siteRouting';
import { contactPublishedLocaleCodes } from '@/lib/publishedLocales';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const contactLocale = getContactLocale(locale);
  const copy = getContactCopy(contactLocale);
  return {
    title: `${copy.title} | FastGPT`,
    description: copy.subtitle,
    robots:
      currentSiteVariant === 'preview'
        ? { index: false, follow: false }
        : locale === contactLocale
        ? { index: true, follow: true }
        : { index: false, follow: true },
    alternates: getAlternates(contactLocale, '/contact', contactPublishedLocaleCodes)
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
  return getBuildLocaleCodes().map((lang) => ({ lang }));
}

export const dynamicParams = false;
