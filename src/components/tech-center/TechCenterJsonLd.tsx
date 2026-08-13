import type { JsonLdCopy } from '@/components/JsonLd';
import { JsonLdScript } from '@/components/JsonLd';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';
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
  description
}: {
  schema: JsonLdCopy;
  title: string;
  description: string;
}) {
  const hubUrl = getOwnedLocaleUrl('zh', '/tech-center');
  const siteUrl = new URL(hubUrl).origin;
  const homeUrl = getOwnedLocaleUrl('zh');

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${hubUrl}#webpage`,
            url: hubUrl,
            name: title,
            description,
            inLanguage: 'zh-CN',
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
              { name: '技术中心', url: hubUrl }
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
  const articleUrl = getOwnedLocaleUrl('zh', article.slug);
  const hubUrl = getOwnedLocaleUrl('zh', '/tech-center');
  const siteUrl = new URL(articleUrl).origin;
  const homeUrl = getOwnedLocaleUrl('zh');
  const imageUrl = article.image ? getOwnedLocaleUrl('zh', article.image.path) : undefined;

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
            inLanguage: 'zh-CN',
            articleSection: article.categoryLabel,
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
              name: 'FastGPT 技术中心',
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
              { name: '技术中心', url: hubUrl },
              { name: article.title, url: articleUrl }
            ])
          }
        ]
      }}
    />
  );
}
