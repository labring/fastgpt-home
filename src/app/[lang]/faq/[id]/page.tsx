import { faq, getFaqItem, getFaqData } from '@/faq';
import { notFound } from 'next/navigation';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { getAlternates, localeMap } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FAQCard from '@/components/faq/FAQCard';
import { FaqDetailJsonLd } from '@/components/JsonLd';
import { showFAQ } from '@/constants';

export default async function FAQDetailPage({
  params
}: {
  params: Promise<{ lang?: string; id: string }>;
}) {
  const { lang, id } = await params;
  // Check if FAQ feature is enabled
  if (!showFAQ) {
    notFound();
  }

  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  // Get FAQ item (localized, fallback to English)
  const faqItem = getFaqItem(id, langName);

  if (!faqItem) {
    notFound();
  }

  // Get related FAQs (same category, excluding current, in same language)
  const localizedFaq = getFaqData(langName);
  const relatedFAQs = Object.entries(localizedFaq)
    .filter(([key, item]) => item.Category === faqItem.Category && key !== id)
    .slice(0, 4);

  // Split answer into paragraphs
  const paragraphs = faqItem.Answers.split('\n\n');

  return (
    <article className="w-full max-w-4xl mx-auto">
      {/* JSON-LD: FAQ + Breadcrumb Schema */}
      <FaqDetailJsonLd
        lang={langName}
        id={id}
        question={faqItem.Question}
        answer={faqItem.Answers}
        category={faqItem.Category}
      />

      {/* Back Button */}
      <Link
        href={`/${langName}/faq`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{dict.FAQ?.backToList || 'Back to FAQ'}</span>
      </Link>

      {/* Main Content */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {faqItem.Category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{faqItem.Question}</h1>
      </header>

      {/* Answer Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed text-foreground/90">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Related FAQs */}
      {relatedFAQs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {dict.FAQ?.relatedQuestions || 'Related Questions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedFAQs.map(([key, item]) => (
              <FAQCard key={key} id={key} data={item} langName={langName} locale={dict.FAQ} />
            ))}
          </div>
        </section>
      )}

      {/* Back to Top */}
      <div className="mt-12 text-center">
        <Link
          href={`/${langName}/faq`}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {dict.FAQ?.backToList || 'Back to All FAQs'}
        </Link>
      </div>
    </article>
  );
}

// Generate static paths for all FAQs in all languages
export async function generateStaticParams() {
  const faqKeys = Object.keys(faq);
  const languages = Object.keys(localeNames);

  return languages.flatMap((lang) => faqKeys.map((id) => ({ lang, id })));
}

// Disable dynamic params - only generate pages from generateStaticParams
export const dynamicParams = false;

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string; id: string }>;
}) {
  const { lang, id } = await params;
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
  const faqItem = getFaqItem(id, langName);

  if (!faqItem) {
    return {
      title: 'FAQ Not Found',
      description: 'The requested FAQ could not be found.',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  return {
    title: faqItem.Title,
    description: faqItem.Description,
    keywords: faqItem.Keywords.split(', '),
    alternates: getAlternates(langName, `/faq/${id}`),
    openGraph: {
      title: faqItem.Title,
      description: faqItem.Description,
      type: 'article',
      locale: localeMap[langName] || 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: faqItem.Title,
      description: faqItem.Description
    }
  };
}
