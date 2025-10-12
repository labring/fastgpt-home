import { faq } from '@/faq';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import FAQList from '@/components/faq/FAQList';
import { notFound } from 'next/navigation';
import { showFAQ } from '@/constants';

export default async function FAQPage({
  params: { lang }
}: {
  params: { lang?: string };
}) {
  // Check if FAQ feature is enabled
  if (!showFAQ) {
    notFound();
  }

  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <div className="w-full min-h-screen">
      {/* FAQ Content */}
      <section className="w-full pb-8">
        <div className="container mx-auto px-4">
          {/* Title - Centered */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {dict.FAQ?.title || 'Frequently Asked Questions'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {dict.FAQ?.subtitle ||
                'Find answers to common questions about FastGPT'}
            </p>
          </div>

          {/* FAQ List with integrated search */}
          <FAQList faqData={faq} locale={dict.FAQ} langName={langName} />
        </div>
      </section>
    </div>
  );
}

// Generate static paths for all supported languages
export async function generateStaticParams() {
  // Don't generate static pages if FAQ is disabled
  if (!showFAQ) {
    return [];
  }
  return Object.keys(localeNames).map((lang) => ({ lang }));
}

// Disable dynamic params - only generate pages from generateStaticParams
export const dynamicParams = false;

// Generate metadata for SEO
export async function generateMetadata({
  params: { lang }
}: {
  params: { lang?: string };
}) {
  // Don't generate SEO metadata if FAQ is disabled
  if (!showFAQ) {
    return {
      title: 'Page Not Found',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return {
    title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
    description:
      dict.FAQ?.description ||
      'Find answers to frequently asked questions about FastGPT, the enterprise AI Agent platform.',
    keywords: [
      'FastGPT',
      'FAQ',
      'AI Agent',
      'Knowledge Base',
      'Customer Support',
      'AI Platform'
    ],
    openGraph: {
      title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
      description:
        dict.FAQ?.description ||
        'Find answers to frequently asked questions about FastGPT.',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
      description:
        dict.FAQ?.description ||
        'Find answers to frequently asked questions about FastGPT.'
    }
  };
}
