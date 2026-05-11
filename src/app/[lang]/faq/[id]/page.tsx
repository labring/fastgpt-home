import { faq, faqContentLocaleCodes, getFaqItem, getFaqData, resolveFaqLocale } from '@/faq';
import { notFound } from 'next/navigation';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getAlternates, localeMap } from '@/lib/seo';
import { ArrowLeft } from 'lucide-react';
import FAQCard from '@/components/faq/FAQCard';
import Navbar from '@/components/home/Navbar';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import GradientBlobs from '@/components/home/GradientBlobs';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/JsonLd';

export default async function FAQDetailPage({
  params
}: {
  params: Promise<{ lang?: string; id: string }>;
}) {
  const { lang, id } = await params;
  const langName = lang || defaultLocale;
  const faqLangName = resolveFaqLocale(langName);
  const dict = await getDictionary(faqLangName);

  const faqItem = getFaqItem(id, faqLangName);

  if (!faqItem) {
    notFound();
  }

  const localizedFaq = getFaqData(faqLangName);
  const relatedFAQs = Object.entries(localizedFaq)
    .filter(([key, item]) => item.Category === faqItem.Category && key !== id)
    .slice(0, 4);

  const paragraphs = faqItem.Answers.split('\n\n');
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';

  return (
    <div className="home overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: `${baseUrl}/${langName}` },
          { name: dict.FAQ?.title || 'FAQ', url: `${baseUrl}/${langName}/faq` },
          { name: faqItem.Question, url: `${baseUrl}/${langName}/faq/${encodeURIComponent(id)}` }
        ]}
      />
      <FAQJsonLd items={[{ question: faqItem.Question, answer: faqItem.Answers }]} />
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} />

      <main className="pb-[80px] px-[16px] md:px-[32px] relative">
        <GradientBlobs />

        <div className="max-w-[min(92vw,1340px)] md:max-w-[min(85vw,1340px)] mx-auto relative pt-[80px] md:pt-[160px]" style={{ zIndex: 1 }}>
          {/* Back Link */}
          <a
            href={`/${langName}/faq`}
            className="inline-flex items-center gap-1 text-[16px] font-normal transition-all mb-12 group"
            style={{ color: '#3370ff' }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span style={{ lineHeight: '20px', letterSpacing: '-0.14px' }}>{dict.FAQ?.backToList || '返回'}</span>
          </a>

          {/* Header - centered */}
          <div className="text-center mb-16" style={{ maxWidth: 648, margin: '0 auto' }}>
            <div className="mb-6">
              <span
                className="inline-block text-[12px] font-medium leading-[16px]"
                style={{
                  padding: '4px 8px',
                  borderRadius: 1000,
                  backgroundColor: '#f7f8fa',
                  color: '#667085'
                }}
              >
                {faqItem.Category}
              </span>
            </div>
            <h1
              className="font-medium"
              style={{ fontSize: 44, lineHeight: '56px', color: '#020617', letterSpacing: '-0.88px' }}
            >
              {faqItem.Question}
            </h1>
          </div>

          {/* Answer Content - centered 884px */}
          <div className="mx-auto" style={{ maxWidth: 884, marginTop: 64 }}>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-4"
                style={{ fontSize: 18, lineHeight: '30px', color: 'rgb(71, 85, 105)', letterSpacing: '-0.18px' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Related FAQs */}
          {relatedFAQs.length > 0 && (
            <section className="pt-[120px] pb-[120px]">
              <div className="text-center flex flex-col items-center mb-16" style={{ rowGap: 24 }}>
                <span
                  className="inline-block rounded-full border bg-white/40 text-[12px] leading-[18px]"
                  style={{
                    padding: '6px 12px',
                    borderColor: '#e5e7eb',
                    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)',
                    color: 'rgb(71, 85, 105)'
                  }}
                >
                  {dict.FAQ.badge}
                </span>
                <h2
                  className="font-medium"
                  style={{ fontSize: 44, lineHeight: '56px', color: '#020617', letterSpacing: '-0.88px', maxWidth: 648 }}
                >
                  {dict.FAQ?.relatedQuestions || '相关问题'}
                </h2>
              </div>
              <div className="mx-auto" style={{ maxWidth: 884 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px]">
                  {relatedFAQs.map(([key, item]) => (
                    <FAQCard key={key} id={key} data={{ ...item, Answers: item.Answers.substring(0, 100) }} langName={langName} locale={dict.FAQ} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Back to List Button */}
          <div className="text-center">
            <a
              href={`/${langName}/faq`}
              className="inline-flex items-center justify-center"
              style={{
                height: 44,
                paddingLeft: 32,
                paddingRight: 32,
                borderRadius: 99,
                border: '1px solid #d4d4d4',
                backgroundColor: 'rgba(255,255,255,0.44)',
                color: '#3d3d3d',
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '24px'
              }}
            >
              {dict.FAQ?.backToList || '返回'}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const faqKeys = Object.keys(faq);

  return faqContentLocaleCodes.flatMap((lang) => faqKeys.map((id) => ({ lang, id })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string; id: string }>;
}) {
  const { lang, id } = await params;
  const langName = lang || defaultLocale;
  const faqLangName = resolveFaqLocale(langName);
  const faqItem = getFaqItem(id, faqLangName);

  if (!faqItem) {
    return {
      title: 'FAQ Not Found',
      description: 'The requested FAQ could not be found.',
      robots: { index: false, follow: false }
    };
  }

  return {
    title: faqItem.Title,
    description: faqItem.Description,
    keywords: faqItem.Keywords.split(', '),
    alternates: getAlternates(faqLangName, `/faq/${id}`, faqContentLocaleCodes),
    robots: faqLangName === langName ? undefined : { index: false, follow: true },
    openGraph: {
      title: faqItem.Title,
      description: faqItem.Description,
      type: 'article',
      locale: localeMap[faqLangName] || 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: faqItem.Title,
      description: faqItem.Description
    }
  };
}
