import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TechArticlePage from '@/components/tech-center/TechArticlePage';
import { TechArticleJsonLd } from '@/components/tech-center/TechCenterJsonLd';
import { getTechEntryPath } from '@/components/tech-center/data';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import {
  getRelatedTechArticles,
  getTechArticle,
  getTechArticleParams
} from '@/lib/tech-center-content';
import { normalizeLocale } from '@/lib/locales';
import { currentSiteVariant, getOwnedLocaleUrl } from '@/lib/siteRouting';

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
  const article = locale === 'zh' ? getTechArticle(section, slug) : null;

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
          label: dict.FAQ.sidebarCta
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
  const article = locale === 'zh' ? getTechArticle(section, slug) : null;

  if (!article) return {};

  const canonical = getOwnedLocaleUrl('zh', getTechEntryPath(article));
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
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title,
      description: article.seoDescription,
      type: 'article',
      locale: 'zh_CN',
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
  const params = getTechArticleParams();
  return currentSiteVariant === 'preview' ? params : params.slice(0, 1);
}

export const dynamicParams = false;
