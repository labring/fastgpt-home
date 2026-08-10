import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import ComparisonPage from '@/components/compare/ComparisonPage';
import type { CompareLocale } from '@/content/competitor';
import { getComparisonPage } from '@/content/competitor';
import { getDictionary } from '@/lib/i18n';
import { localeMap } from '@/lib/locales';
import { getCompareAlternates, getCompareCanonicalUrl } from '@/lib/seo';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';

const articleLanguage: Record<CompareLocale, string> = {
  en: 'en-US',
  zh: 'zh-CN'
};

export async function ComparisonRoute({ locale, slug }: { locale: CompareLocale; slug: string }) {
  const page = getComparisonPage(slug, locale);
  if (!page) notFound();

  const dict = await getDictionary(locale);
  const canonical = getCompareCanonicalUrl(locale, page.slug);
  const image = getOwnedLocaleUrl(locale, page.asset.path);

  return (
    <div className="home overflow-x-hidden comparison-page-shell">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: getOwnedLocaleUrl(locale) },
          { name: page.title, url: canonical }
        ]}
      />
      <ArticleJsonLd
        headline={page.title}
        description={page.description}
        image={image}
        url={canonical}
        inLanguage={articleLanguage[locale]}
        datePublished={page.status === 'published' ? page.dates.datePublished : undefined}
        dateModified={page.dates.dateModified}
      />
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={locale} variant="comparison" />
      <main className="comparison-page">
        <ComparisonPage page={page} />
      </main>
      <div className="comparison-footer">
        <Footer t={dict.Home.footer} />
      </div>
    </div>
  );
}

export function getComparisonMetadata(
  locale: CompareLocale,
  slug: string,
  { indexable = true }: { indexable?: boolean } = {}
): Metadata {
  const page = getComparisonPage(slug, locale);
  if (!page) {
    return { title: 'Comparison page not found', robots: { index: false, follow: false } };
  }

  const canonical = getCompareCanonicalUrl(locale, page.slug);
  const image = getOwnedLocaleUrl(locale, page.asset.path);
  const shouldIndex = indexable && page.status === 'published';

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: getCompareAlternates(locale, page.slug),
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: canonical,
      locale: localeMap[locale] || 'en_US',
      publishedTime: page.status === 'published' ? page.dates.datePublished : undefined,
      modifiedTime: page.dates.dateModified,
      images: [{ url: image, width: page.asset.width, height: page.asset.height, alt: page.asset.alt }]
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [image]
    }
  };
}
