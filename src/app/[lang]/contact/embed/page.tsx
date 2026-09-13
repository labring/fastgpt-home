import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { getContactCopy } from '@/components/contact/contactCopy';
import { normalizeLocale } from '@/lib/i18n';
import { getContactLocale } from '@/lib/contact';
import { getBuildLocaleCodes } from '@/lib/siteRouting';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  const copy = getContactCopy(getContactLocale(locale));
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
  const locale = getContactLocale(normalizeLocale(lang));

  return (
    <main data-contact-embed="true" className="home min-h-screen bg-white font-sans text-ink">
      <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
        <section className="overflow-hidden rounded-2xl border border-hairline-soft bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <ContactForm locale={locale} variant="modal" />
        </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return getBuildLocaleCodes().map((lang) => ({ lang }));
}

export const dynamicParams = false;
