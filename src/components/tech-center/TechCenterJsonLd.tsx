import type { JsonLdCopy } from '@/components/JsonLd';
import { JsonLdScript } from '@/components/JsonLd';
import { getTechCategoryLabelForLocale } from '@/components/tech-center/data';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';
import { getTechCenterPagePath, getTechnicalCanonicalUrl } from '@/lib/technicalRouting';
import type { TechArticle } from '@/lib/tech-center-content';

function breadcrumbItems(items: { name: string; url: string }[]) {
  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }));
}

export function TechCenterHubJsonLd({
  schema,
  title,
  description,
  locale = 'zh',
  page = 1
}: {
  schema: JsonLdCopy;
  title: string;
  description: string;
  locale?: string;
  page?: number;
}) {
  const hubUrl = getOwnedLocaleUrl(locale, '/tech-center');
  const pageUrl = getOwnedLocaleUrl(locale, getTechCenterPagePath(page));
  const siteUrl = new URL(hubUrl).origin;
  const homeUrl = getOwnedLocaleUrl(locale);

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: title,
            description,
            inLanguage: locale === 'zh' ? 'zh-CN' : locale,
            isPartOf: {
              '@type': 'WebSite',
              '@id': `${siteUrl}#website`,
              name: schema.siteName,
              url: siteUrl
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems([
              { name: schema.breadcrumbHome, url: homeUrl },
              { name: locale === 'zh' ? '技术中心' : 'Technical Center', url: hubUrl },
              ...(page > 1
                ? [{ name: locale === 'zh' ? `第 ${page} 页` : `Page ${page}`, url: pageUrl }]
                : [])
            ])
          }
        ]
      }}
    />
  );
}

export function TechArticleJsonLd({
  schema,
  article
}: {
  schema: JsonLdCopy;
  article: TechArticle;
}) {
  const articleUrl = getTechnicalCanonicalUrl(article);
  const locale = article.slug.split('/')[1] || 'zh';
  const hubUrl = getOwnedLocaleUrl(locale, '/tech-center');
  const siteUrl = new URL(articleUrl).origin;
  const homeUrl = getOwnedLocaleUrl(locale);
  const imageUrl = article.image ? getOwnedLocaleUrl(locale, article.image.path) : undefined;

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': article.contentType,
            '@id': `${articleUrl}#tech-article`,
            url: articleUrl,
            headline: article.title,
            description: article.seoDescription,
            inLanguage: locale === 'zh' ? 'zh-CN' : locale,
            articleSection: getTechCategoryLabelForLocale(article.category, locale),
            ...(article.datePublished ? { datePublished: article.datePublished } : {}),
            ...(article.dateModified ? { dateModified: article.dateModified } : {}),
            ...(imageUrl ? { image: [imageUrl] } : {}),
            ...(article.keywords.length ? { keywords: article.keywords.join(', ') } : {}),
            author: {
              '@type': 'Organization',
              name: schema.authorName,
              url: 'https://github.com/labring/FastGPT'
            },
            publisher: {
              '@type': 'Organization',
              name: schema.organizationName,
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.svg`
              }
            },
            isPartOf: {
              '@type': 'CollectionPage',
              '@id': `${hubUrl}#webpage`,
              name: locale === 'zh' ? 'FastGPT 技术中心' : 'FastGPT Technical Center',
              url: hubUrl
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': articleUrl
            },
            ...(article.source ? { citation: article.source } : {})
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems([
              { name: schema.breadcrumbHome, url: homeUrl },
              { name: locale === 'zh' ? '技术中心' : 'Technical Center', url: hubUrl },
              { name: article.title, url: articleUrl }
            ])
          }
        ]
      }}
    />
  );
}
