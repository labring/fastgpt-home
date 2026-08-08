import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TechArticlePage from '@/components/tech-center/TechArticlePage';
import { TechArticleJsonLd } from '@/components/tech-center/TechCenterJsonLd';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import {
  getRelatedTechArticles,
  getTechArticle,
  getTechArticleParams
} from '@/lib/tech-center-content';
import { normalizeLocale } from '@/lib/locales';

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

  const baseUrl = (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');
  const canonical = `${baseUrl}${article.slug}`;
  const title = `${article.title}｜FastGPT 技术中心`;

  return {
    title,
    description: article.seoDescription,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title,
      description: article.seoDescription,
      type: 'article',
      locale: 'zh_CN',
      url: canonical,
      images: [{ url: `${baseUrl}/opengraph-image.png` }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: article.seoDescription,
      images: [`${baseUrl}/twitter-image.png`]
    }
  };
}

export function generateStaticParams() {
  return getTechArticleParams();
}

export const dynamicParams = false;
