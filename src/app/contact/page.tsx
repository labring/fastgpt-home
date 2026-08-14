import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactCopy } from '@/components/contact/contactCopy';
import { defaultLocale } from '@/lib/i18n';

export function generateMetadata(): Metadata {
  const copy = getContactCopy(defaultLocale);
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  return {
    title: `${copy.title} | FastGPT`,
    description: copy.subtitle,
    alternates: { canonical: `${baseUrl}/contact` }
  };
}

export default function DefaultContactPage() {
  return <ContactPage locale={defaultLocale} />;
}
