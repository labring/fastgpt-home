import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { getContactCopy } from '@/components/contact/contactCopy';
import { normalizeLocale } from '@/lib/i18n';
import { getContactLocale } from '@/lib/contact';
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
  const locale = getContactLocale(normalizeLocale(lang));
  const copy = getContactCopy(locale);

  return (
    <main data-contact-embed="true" className="home min-h-screen bg-white font-sans text-ink">
      <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
        <header className="mb-6">
          <p className="m-0 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-muted">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-[28px] font-semibold leading-9 tracking-[-0.04em] text-ink">
            {copy.title}
          </h1>
          <p className="mt-2 text-[14px] leading-6 text-ink-sub">{copy.subtitle}</p>
        </header>
        <section className="overflow-hidden rounded-2xl border border-hairline-soft bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <ContactForm locale={locale} variant="modal" />
        </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return getBuildLocaleCodes()
    .filter(isContactPublishedLocale)
    .map((lang) => ({ lang }));
}

export const dynamicParams = false;
