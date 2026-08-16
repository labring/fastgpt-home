import {
  faqContentLocaleCodes,
  getFaqData,
  getFaqIds,
  getFaqItem,
  getFaqRouteKey,
  getFaqTranslationLocales,
  resolveFaqContentId,
  resolveFaqLocale
} from '@/faq';
import { notFound } from 'next/navigation';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getFaqAlternates, localeMap } from '@/lib/seo';
import { normalizeFaqMetadata } from '@/lib/faqMetadata';
import {
  currentSiteBaseUrl,
  getOwnedFaqUrl,
  getOwnedLocaleUrl,
  getBuildLocaleCodes
} from '@/lib/siteRouting';
import { getFaqPath } from '@/lib/localizedRoutes';
import { ArrowLeft, ArrowRight, ArrowUpRight, Workflow } from 'lucide-react';
import FAQCard from '@/components/faq/FAQCard';
import CloudEntryLink from '@/components/home/CloudEntryLink';
import Navbar from '@/components/home/Navbar';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import GradientBlobs from '@/components/home/GradientBlobs';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/JsonLd';

function decodeFaqId(id: string): string | undefined {
  try {
    const decoded = decodeURIComponent(id);
    return decoded || undefined;
  } catch {
    return undefined;
  }
}

export default async function FAQDetailPage({
  params
}: {
  params: Promise<{ lang?: string; id: string }>;
}) {
  const { lang, id } = await params;
  const langName = lang || defaultLocale;
  const faqLangName = resolveFaqLocale(langName);
  const dict = await getDictionary(faqLangName);
  const faqId = decodeFaqId(id);
  if (!faqId) notFound();

  const contentId = resolveFaqContentId(faqId, faqLangName);
  const routeKey = contentId ? getFaqRouteKey(contentId, faqLangName) : undefined;
  const faqItem = routeKey ? getFaqItem(routeKey, faqLangName) : undefined;

  if (!faqId || !contentId || !routeKey || !faqItem) {
    notFound();
  }

  const localizedFaq = getFaqData(faqLangName);
  const relatedFAQs = Object.entries(localizedFaq)
    .filter(([key, item]) => item.Category === faqItem.Category && key !== routeKey)
    .slice(0, 4);

  const paragraphs = faqItem.Answers.split('\n\n');
  const summary = paragraphs[0] || '';
  const answerParagraphs = paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs;
  const keywords = faqItem.Keywords.split(', ');
  return (
    <div className="home overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: getOwnedLocaleUrl(langName) },
          { name: dict.FAQ?.title || 'FAQ', url: getOwnedFaqUrl(langName) },
          { name: faqItem.Question, url: getOwnedFaqUrl(langName, routeKey) }
        ]}
      />
      <FAQJsonLd items={[{ question: faqItem.Question, answer: faqItem.Answers }]} />
      <HomeThemeFix />
      <Navbar
        links={dict.links}
        t={dict.Home.navCta}
        publishedLocales={getFaqTranslationLocales(routeKey, faqLangName)}
      />

      <main className="relative px-[16px] pb-[80px] md:px-[32px]">
        <GradientBlobs />

        <div className="relative z-[1] mx-auto w-full max-w-[1240px] pt-[96px] md:pt-[128px]">
          <a
            href={getFaqPath(langName)}
            className="group mb-10 inline-flex items-center gap-2 text-[14px] font-medium text-slate-500 transition-colors duration-200 hover:text-[#020617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>{dict.FAQ?.backToList || 'Back to FAQ'}</span>
          </a>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 xl:gap-14">
            <article className="min-w-0 lg:col-start-1 lg:row-start-1">
              <header className="max-w-[820px]">
                <div className="mb-5 flex items-center gap-3 text-[12px] leading-4 text-slate-500">
                  <span className="inline-flex min-h-7 items-center rounded-[6px] bg-slate-100 px-3 font-semibold text-slate-700">
                    {faqItem.Category}
                  </span>
                  <span>{dict.FAQ?.badge || 'FAQ'}</span>
                </div>
                <h1 className="m-0 break-words text-[36px] font-semibold leading-[45px] text-[#020617] [text-wrap:balance] md:text-[48px] md:leading-[58px]">
                  {faqItem.Question}
                </h1>
                <p className="mt-7 max-w-[760px] text-[17px] leading-[30px] text-slate-600 [text-wrap:pretty] md:text-[18px] md:leading-[32px]">
                  {summary}
                </p>
              </header>

              <section
                className="mt-12 border-t border-slate-200 pt-10"
                aria-label={dict.FAQ.answerTitle}
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#070d1d] text-[12px] font-semibold text-white">
                    01
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold leading-4 text-slate-500">
                      {dict.FAQ.answerLabel}
                    </p>
                    <p className="mt-1 text-[26px] font-semibold leading-8 text-[#020617]">
                      {dict.FAQ.answerTitle}
                    </p>
                  </div>
                </div>

                <div className="max-w-[790px] text-[17px] leading-[31px] text-slate-600 md:text-[18px] md:leading-[34px]">
                  {answerParagraphs.map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0 [text-wrap:pretty]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {keywords.length > 0 && (
                <section
                  className="mt-11 rounded-[8px] bg-slate-50 px-5 py-5 ring-1 ring-inset ring-slate-200"
                  aria-label={dict.FAQ.keywordsTitle}
                >
                  <p className="mb-4 text-[12px] font-semibold leading-4 text-[#020617]">
                    {dict.FAQ.keywordsTitle}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-[6px] bg-white px-3 py-2 text-[12px] leading-4 text-slate-600 ring-1 ring-inset ring-slate-200"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </article>

            <aside
              className="self-start lg:sticky lg:top-[104px] lg:col-start-2 lg:row-span-2 lg:row-start-1"
              aria-label={dict.FAQ.sidebarTitle}
            >
              <section
                className="relative overflow-hidden rounded-[8px] bg-[#070d1d] px-6 pb-6 pt-7 text-white shadow-[0_20px_45px_rgba(15,23,42,0.16)]"
                aria-labelledby="faq-sidebar-title"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                    maskImage: 'linear-gradient(to bottom left, black, transparent 68%)',
                    WebkitMaskImage: 'linear-gradient(to bottom left, black, transparent 68%)'
                  }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10">
                    <Workflow className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <p className="mb-3 text-[11px] font-semibold leading-4 text-white/60">
                    {dict.FAQ.sidebarEyebrow}
                  </p>
                  <p
                    id="faq-sidebar-title"
                    className="mb-3 text-[24px] font-semibold leading-[32px] text-white [text-wrap:balance]"
                  >
                    {dict.FAQ.sidebarTitle}
                  </p>
                  <p className="mb-6 text-[14px] leading-[22px] text-white/65 [text-wrap:pretty]">
                    {dict.FAQ.sidebarDescription}
                  </p>
                  <CloudEntryLink
                    source="faq_detail_sidebar_trial"
                    data-rybbit-prop-category={faqItem.Category}
                    rel="noopener noreferrer nofollow"
                    aria-label={`${dict.FAQ.sidebarCta}: ${dict.FAQ.sidebarTitle}`}
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-[14px] font-semibold text-[#070d1d] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#f1f5f9] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#070d1d]"
                  >
                    <span>{dict.FAQ.sidebarCta}</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </CloudEntryLink>
                </div>
              </section>

              {relatedFAQs.length > 0 && (
                <nav
                  className="mt-4 hidden rounded-[8px] bg-white px-5 py-5 shadow-[0_12px_34px_rgba(65,78,100,0.07)] ring-1 ring-slate-200/70 lg:block"
                  aria-labelledby="faq-sidebar-related"
                >
                  <p
                    id="faq-sidebar-related"
                    className="mb-2 text-[13px] font-semibold leading-5 text-[#020617]"
                  >
                    {dict.FAQ.relatedQuestions}
                  </p>
                  <div>
                    {relatedFAQs.slice(0, 3).map(([relatedId, item]) => (
                      <a
                        key={relatedId}
                        href={getFaqPath(langName, relatedId)}
                        className="block border-b border-slate-100 py-3 text-[13px] leading-5 text-slate-500 transition-colors duration-200 hover:text-[#020617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        {item.Question}
                      </a>
                    ))}
                  </div>
                  <a
                    href={getFaqPath(langName)}
                    className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#020617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span>{dict.FAQ.viewMore}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                </nav>
              )}
            </aside>

            {relatedFAQs.length > 0 && (
              <section className="pb-10 pt-6 lg:col-start-1 lg:row-start-2 lg:pt-20">
                <div className="mb-10 flex flex-col items-start gap-3">
                  <span className="text-[12px] font-semibold leading-4 text-slate-500">
                    {dict.FAQ.badge}
                  </span>
                  <h2 className="m-0 text-[32px] font-semibold leading-[40px] text-[#020617] md:text-[38px] md:leading-[48px]">
                    {dict.FAQ?.relatedQuestions || 'Related questions'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
                  {relatedFAQs.map(([key, item]) => (
                    <FAQCard
                      key={key}
                      id={key}
                      data={{ ...item, Answers: item.Answers.substring(0, 100) }}
                      langName={langName}
                      locale={dict.FAQ}
                      headingLevel="h3"
                    />
                  ))}
                </div>

                <a
                  href={getFaqPath(langName)}
                  className="mt-14 inline-flex h-11 items-center justify-center rounded-[6px] border border-slate-300 bg-white px-6 text-[14px] font-semibold text-slate-700 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {dict.FAQ?.backToList || 'Back to FAQ'}
                </a>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const localizedFaqLocales = getBuildLocaleCodes().filter((lang) =>
    faqContentLocaleCodes.includes(lang as (typeof faqContentLocaleCodes)[number])
  );
  if (!localizedFaqLocales.length) {
    const [probeId] = getFaqIds(defaultLocale);
    return probeId ? [{ lang: defaultLocale, id: probeId }] : [];
  }

  return localizedFaqLocales.flatMap((lang) => getFaqIds(lang).map((id) => ({ lang, id })));
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
  const faqId = decodeFaqId(id);
  const contentId = faqId ? resolveFaqContentId(faqId, faqLangName) : undefined;
  const routeKey = contentId ? getFaqRouteKey(contentId, faqLangName) : undefined;
  const faqItem = routeKey ? getFaqItem(routeKey, faqLangName) : undefined;
  const baseUrl = currentSiteBaseUrl;
  const socialImageUrl = `${baseUrl}/faq-social-preview.png`;

  if (!faqId || !faqItem) {
    return {
      title: 'FAQ Not Found',
      description: 'The requested FAQ could not be found.',
      robots: { index: false, follow: false }
    };
  }

  const metadata = normalizeFaqMetadata(faqItem);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: faqItem.Keywords.split(', '),
    alternates: getFaqAlternates(
      faqLangName,
      contentId,
      getFaqTranslationLocales(routeKey || faqId, faqLangName)
    ),
    robots:
      !lang || faqLangName !== langName
        ? { index: true, follow: true }
        : { index: false, follow: true },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      locale: localeMap[faqLangName] || 'en_US',
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: `${faqItem.Question} - FastGPT FAQ`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [socialImageUrl]
    }
  };
}
