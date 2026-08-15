import type { Metadata } from 'next';
import { BreadcrumbJsonLd, JsonLdScript } from '@/components/JsonLd';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getComparisonPagesForLocale, type CompareLocale } from '@/content/competitor';
import { getDictionary } from '@/lib/i18n';
import { localeMap } from '@/lib/locales';
import {
  getCompareHubAlternates,
  getCompareHubCanonicalUrl
} from '@/lib/seo';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';
import { comparisonPublishedLocaleCodes } from '@/lib/publishedLocales';
import ComparisonHubPage from './ComparisonHubPage';

const hubLanguage: Record<CompareLocale, string> = {
  en: 'en-US',
  zh: 'zh-CN'
};

export async function ComparisonHubRoute({ locale }: { locale: CompareLocale }) {
  const dict = await getDictionary(locale);
  const canonical = getCompareHubCanonicalUrl(locale);

  return (
    <div className="home overflow-x-hidden comparison-page-shell">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: getOwnedLocaleUrl(locale) },
          { name: locale === 'zh' ? '竞品对比' : 'Compare', url: canonical }
        ]}
      />
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ItemList',
              '@id': `${canonical}#item-list`,
              itemListElement: getComparisonPagesForLocale(locale).map((page, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: page.title,
                url: getOwnedLocaleUrl(locale, `/compare/${page.slug}`)
              }))
            },
            {
              '@type': 'CollectionPage',
              '@id': `${canonical}#webpage`,
              url: canonical,
              name: locale === 'zh' ? 'FastGPT 竞品对比' : 'FastGPT Comparison Hub',
              description:
                locale === 'zh'
                  ? '汇总 FastGPT 与 Dify、RAGFlow、MaxKB 及自研方案的对比页，按插件生态、复杂文档、采购可预测性、支持边界和三年 TCO 进入细页核对。'
                  : 'Browse FastGPT with Dify, RAGFlow, MaxKB, and build-vs-buy pages from one indexable hub. Jump into fit, POC, support, and TCO checks you need for each route.',
              inLanguage: hubLanguage[locale],
              isPartOf: {
                '@type': 'WebSite',
                name: dict.JsonLd.siteName,
                url: new URL(canonical).origin
              }
            }
          ]
        }}
      />
      <HomeThemeFix />
      <Navbar
        links={dict.links}
        t={dict.Home.navCta}
        locale={locale}
        variant="comparison"
        publishedLocales={comparisonPublishedLocaleCodes}
      />
      <main className="comparison-page">
        <ComparisonHubPage locale={locale} />
      </main>
      <div className="comparison-footer">
        <Footer t={dict.Home.footer} locale={locale} />
      </div>
    </div>
  );
}

export function getComparisonHubMetadata(
  locale: CompareLocale,
  { indexable = true }: { indexable?: boolean } = {}
): Metadata {
  const canonical = getCompareHubCanonicalUrl(locale);
  const coverPage = getComparisonPagesForLocale(locale)[0];
  const coverImage = coverPage ? getOwnedLocaleUrl(locale, coverPage.asset.path) : undefined;
  const shouldIndex = indexable;

  const title =
    locale === 'zh'
      ? 'FastGPT 竞品对比：Dify、RAGFlow、MaxKB'
      : 'FastGPT Comparison Hub: Dify, RAGFlow, MaxKB, Build vs Buy';
  const description =
    locale === 'zh'
      ? '汇总 FastGPT 与 Dify、RAGFlow、MaxKB 及自研方案的对比页，按插件生态、复杂文档、采购可预测性、支持边界和三年 TCO 进入细页核对。'
      : 'Browse FastGPT with Dify, RAGFlow, MaxKB, and build-vs-buy pages from one indexable hub. Jump into fit, POC, support, and TCO checks you need for each route.';

  return {
    title,
    description,
    alternates: getCompareHubAlternates(locale),
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      locale: localeMap[locale] || 'en_US',
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 630,
              alt: coverPage?.asset.alt || title
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: coverImage ? [coverImage] : undefined
    }
  };
}
