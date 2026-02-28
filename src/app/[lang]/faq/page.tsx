import { getFaqData } from '@/faq';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { getAlternates, localeMap } from '@/lib/seo';
import FAQList from '@/components/faq/FAQList';
import { notFound } from 'next/navigation';
import { showFAQ } from '@/constants';

export default async function FAQPage({
  params
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  // Check if FAQ feature is enabled
  if (!showFAQ) {
    notFound();
  }

  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  // Trim FAQ data for list page - only send fields needed for cards
  // This reduces page size from ~4.8MB to ~300KB
  const faq = getFaqData(langName);
  const trimmedFaq: Record<string, { Category: string; Question: string; Answers: string }> = {};
  for (const [id, item] of Object.entries(faq)) {
    trimmedFaq[id] = {
      Category: item.Category,
      Question: item.Question,
      Answers: item.Answers.substring(0, 100),
    };
  }

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
          <FAQList faqData={trimmedFaq} locale={dict.FAQ} langName={langName} />
        </div>
      </section>
    </div>
  );
}

// Generate static paths for all supported languages
export async function generateStaticParams() {
  return Object.keys(localeNames).map((lang) => ({ lang }));
}

// Disable dynamic params - only generate pages from generateStaticParams
export const dynamicParams = false;

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string }>;
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

  const { lang } = await params;
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
    alternates: getAlternates(langName, '/faq'),
    openGraph: {
      title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
      description:
        dict.FAQ?.description ||
        'Find answers to frequently asked questions about FastGPT.',
      type: 'website',
      locale: localeMap[langName] || 'en_US'
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
