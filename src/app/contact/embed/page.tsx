import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactCopy } from '@/components/contact/contactCopy';
import { defaultLocale } from '@/lib/i18n';

export function generateMetadata(): Metadata {
  const copy = getContactCopy(defaultLocale);
  return {
    title: `${copy.title} | FastGPT`,
    description: copy.subtitle,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default function DefaultContactEmbedPage() {
  return <ContactPage locale={defaultLocale} embedded />;
}
