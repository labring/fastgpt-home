import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactCopy } from '@/components/contact/contactCopy';
import { defaultLocale } from '@/lib/i18n';
import { contactPublishedLocaleCodes } from '@/lib/publishedLocales';
import { getAlternates } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const copy = getContactCopy(defaultLocale);
  return {
    title: `${copy.title} | FastGPT`,
    description: copy.subtitle,
    alternates: getAlternates(defaultLocale, '/contact', contactPublishedLocaleCodes)
  };
}

export default function DefaultContactPage() {
  return <ContactPage locale={defaultLocale} />;
}
