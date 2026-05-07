import { getFaqData } from '@/faq';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { getAlternates, localeMap } from '@/lib/seo';
import FAQList from '@/components/faq/FAQList';
import Navbar from '@/components/home/Navbar';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import GradientBlobs from '@/components/home/GradientBlobs';
import FadeIn from '@/components/home/motion/FadeIn';
import { notFound } from 'next/navigation';
import { showFAQ } from '@/constants';

export default async function FAQPage({
  params
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  if (!showFAQ) {
    notFound();
  }

  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

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
    <div className="home">
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} />
      <main className="pt-[80px] pb-[80px] px-[32px] relative">
        {/* Background blobs layer */}
        <GradientBlobs />

        {/* Content layer */}
        <div className="max-w-[min(92vw,1340px)] md:max-w-[min(85vw,1340px)] mx-auto relative" style={{ zIndex: 1 }}>
          <div className="mb-12">
            <FadeIn className="text-center flex flex-col items-center" style={{ rowGap: 24 }}>
              <h2
                className="
                  text-ink font-semibold
                  text-[28px] leading-[36px] tracking-[-0.56px]
                  md:text-[64px] md:leading-[78px] md:tracking-[-1.92px]
                "
              >
                {dict.FAQ?.title || 'Frequently Asked Questions'}
              </h2>
              {dict.FAQ?.subtitle && (
                <p
                  className="
                    text-[15px] leading-[24px] tracking-[-0.15px]
                    md:text-[20px] md:leading-[32px] md:tracking-[-0.2px]
                  "
                  style={{ color: '#292f38' }}
                >
                  {dict.FAQ.subtitle}
                </p>
              )}
            </FadeIn>
          </div>

          <FAQList faqData={trimmedFaq} locale={dict.FAQ} langName={langName} />
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  if (!showFAQ) {
    return [];
  }
  return Object.keys(localeNames).map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string }>;
}) {
  if (!showFAQ) {
    return {
      title: 'Page Not Found',
      robots: { index: false, follow: false }
    };
  }

  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return {
    title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
    description: dict.FAQ?.description || 'Find answers to frequently asked questions about FastGPT.',
    keywords: ['FastGPT', 'FAQ', 'AI Agent', 'Knowledge Base', 'Customer Support', 'AI Platform'],
    alternates: getAlternates(langName, '/faq'),
    openGraph: {
      title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
      description: dict.FAQ?.description || 'Find answers to frequently asked questions about FastGPT.',
      type: 'website',
      locale: localeMap[langName] || 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
      description: dict.FAQ?.description || 'Find answers to frequently asked questions about FastGPT.'
    }
  };
}
