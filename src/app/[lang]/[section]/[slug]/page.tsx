import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TechArticlePage from '@/components/tech-center/TechArticlePage';
import { TechArticleJsonLd } from '@/components/tech-center/TechCenterJsonLd';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import {
  getRelatedTechArticles,
  getTechArticle,
  getTechArticleReviewParams
} from '@/lib/tech-center-content';
import { normalizeLocale } from '@/lib/locales';
import { techPublishedLocaleCodes, type TechPublishedLocale } from '@/lib/publishedLocales';
import { currentSiteVariant, getLocaleHreflang } from '@/lib/siteRouting';
import { getTechnicalCanonicalUrl } from '@/lib/technicalRouting';

type TechArticleRouteParams = {
  lang: string;
  section: string;
  slug: string;
};

export default async function TechArticleRoute({
  params
}: {
  params: Promise<TechArticleRouteParams>;
}) {
  const { lang, section, slug } = await params;
  const locale = normalizeLocale(lang || defaultLocale);
  const article = techPublishedLocaleCodes.includes(locale as TechPublishedLocale)
    ? getTechArticle(section, slug, locale as TechPublishedLocale)
    : null;

  if (!article) notFound();

  const dict = await getDictionary(locale);
  const relatedArticles = getRelatedTechArticles(article);
  return (
    <>
      <TechArticleJsonLd schema={dict.JsonLd} article={article} />
      <TechArticlePage
        article={article}
        locale={locale}
        links={dict.links}
        navCta={dict.Home.navCta}
        footer={dict.Home.footer}
        relatedArticles={relatedArticles}
        cta={{
          eyebrow: dict.FAQ.sidebarEyebrow,
          title: dict.FAQ.sidebarTitle,
          description: dict.FAQ.sidebarDescription,
          consultLabel: dict.Home.navCta.consult,
          trialLabel: dict.FAQ.sidebarCta
        }}
      />
    </>
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<TechArticleRouteParams>;
}): Promise<Metadata> {
  const { lang, section, slug } = await params;
  const locale = normalizeLocale(lang || defaultLocale);
  const article = techPublishedLocaleCodes.includes(locale as TechPublishedLocale)
    ? getTechArticle(section, slug, locale as TechPublishedLocale)
    : null;

  if (!article) return {};

  const canonical = getTechnicalCanonicalUrl(article);
  const baseUrl = new URL(canonical).origin;
  const title = article.metaTitle;
  const openGraphImage = article.image
    ? {
        url: `${baseUrl}${article.image.path}`,
        width: article.image.width,
        height: article.image.height,
        alt: article.image.alt
      }
    : { url: `${baseUrl}/opengraph-image.png` };

  return {
    title,
    description: article.seoDescription,
    ...(article.keywords.length ? { keywords: article.keywords } : {}),
    robots:
      currentSiteVariant === 'preview'
        ? { index: false, follow: false }
        : { index: true, follow: true },
    alternates: { canonical, languages: { [getLocaleHreflang(locale)]: canonical } },
    openGraph: {
      title,
      description: article.seoDescription,
      type: 'article',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: canonical,
      ...(article.datePublished ? { publishedTime: article.datePublished } : {}),
      ...(article.dateModified ? { modifiedTime: article.dateModified } : {}),
      images: [openGraphImage]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: article.seoDescription,
      images: [article.image ? openGraphImage.url : `${baseUrl}/twitter-image.png`]
    }
  };
}

export function generateStaticParams() {
  return getTechArticleReviewParams(currentSiteVariant);
}

export const dynamicParams = false;
