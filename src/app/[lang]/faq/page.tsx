import { faqContentLocaleCodes, getFaqData, resolveFaqLocale } from '@/faq';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getFaqAlternates, localeMap } from '@/lib/seo';
import {
  currentSiteBaseUrl,
  getBuildLocaleCodes,
  getOwnedFaqUrl,
  getOwnedLocaleUrl
} from '@/lib/siteRouting';
import FAQList from '@/components/faq/FAQList';
import Navbar from '@/components/home/Navbar';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import GradientBlobs from '@/components/home/GradientBlobs';
import FadeIn from '@/components/home/motion/FadeIn';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/JsonLd';

export default async function FAQPage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const faqLangName = resolveFaqLocale(langName);
  const dict = await getDictionary(faqLangName);

  const faq = getFaqData(faqLangName);
  const trimmedFaq: Record<string, { Category: string; Question: string; Answers: string }> = {};
  for (const [id, item] of Object.entries(faq)) {
    trimmedFaq[id] = {
      Category: item.Category,
      Question: item.Question,
      Answers: item.Answers.substring(0, 100)
    };
  }
  const faqSchemaItems = Object.values(faq)
    .slice(0, 30)
    .map((item) => ({
      question: item.Question,
      answer: item.Answers
    }));

  return (
    <div className="home overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: getOwnedLocaleUrl(langName) },
          { name: dict.FAQ?.title || 'FAQ', url: getOwnedFaqUrl(langName) }
        ]}
      />
      <FAQJsonLd items={faqSchemaItems} />
      <HomeThemeFix />
      <Navbar
        links={dict.links}
        t={dict.Home.navCta}
        locale={langName}
        publishedLocales={faqContentLocaleCodes}
      />
      <main className="pb-[80px] px-[16px] md:px-[32px] relative">
        {/* Background blobs layer */}
        <GradientBlobs />

        {/* Content layer */}
        <div
          className="max-w-[min(92vw,1340px)] md:max-w-[min(85vw,1340px)] mx-auto relative pt-[200px]"
          style={{ zIndex: 1 }}
        >
          <div className="mb-12">
            <FadeIn className="text-center flex flex-col items-center" style={{ rowGap: 24 }}>
              <span
                className="inline-flex flex-col md:flex-row items-center gap-0 md:gap-[12px] rounded-full border bg-white/40 text-[12px] leading-[18px]"
                style={{
                  padding: '6px 12px',
                  borderColor: '#e5e7eb',
                  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)',
                  color: 'rgb(71, 85, 105)'
                }}
              >
                <span>{dict.Home.faq.badge}</span>
                <a
                  href={dict.Home.faq.badgeLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-0.5 text-primary hover:text-primary-dark"
                >
                  {dict.Home.faq.badgeLink}
                </a>
              </span>
              <h1
                className="
                  text-ink font-semibold
                  text-[28px] leading-[36px] tracking-[-0.56px]
                  md:text-[64px] md:leading-[78px] md:tracking-[-1.92px]
                "
              >
                {dict.FAQ?.title || 'Frequently Asked Questions'}
              </h1>
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
  const faqLocales = getBuildLocaleCodes().filter((lang) =>
    faqContentLocaleCodes.includes(lang as (typeof faqContentLocaleCodes)[number])
  );

  return (faqLocales.length ? faqLocales : [defaultLocale]).map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const faqLangName = resolveFaqLocale(langName);
  const dict = await getDictionary(faqLangName);
  const baseUrl = currentSiteBaseUrl;
  const socialImageUrl = `${baseUrl}/faq-social-preview.png`;
  const socialImageAlt = `${dict.FAQ?.title || 'FAQ'} - FastGPT`;

  return {
    title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
    description:
      dict.FAQ?.description || 'Find answers to frequently asked questions about FastGPT.',
    keywords: ['FastGPT', 'FAQ', 'AI Agent', 'Knowledge Base', 'Customer Support', 'AI Platform'],
    alternates: getFaqAlternates(faqLangName, undefined, faqContentLocaleCodes),
    robots:
      !lang || faqLangName !== langName
        ? { index: true, follow: true }
        : { index: false, follow: true },
    openGraph: {
      title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
      description:
        dict.FAQ?.description || 'Find answers to frequently asked questions about FastGPT.',
      type: 'website',
      locale: localeMap[faqLangName] || 'en_US',
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: socialImageAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.FAQ?.title || 'FAQ'} - FastGPT`,
      description:
        dict.FAQ?.description || 'Find answers to frequently asked questions about FastGPT.',
      images: [socialImageUrl]
    }
  };
}
