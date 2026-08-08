import type { JsonLdCopy } from '@/components/JsonLd';
import { JsonLdScript } from '@/components/JsonLd';
import type { TechArticle } from '@/lib/tech-center-content';

const baseUrl = () => (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');

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
  const siteUrl = baseUrl();
  const hubUrl = `${siteUrl}/zh/tech-center`;

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
              { name: schema.breadcrumbHome, url: `${siteUrl}/zh` },
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
  const siteUrl = baseUrl();
  const articleUrl = `${siteUrl}${article.slug}`;
  const hubUrl = `${siteUrl}/zh/tech-center`;

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            '@id': `${articleUrl}#tech-article`,
            url: articleUrl,
            headline: article.title,
            description: article.seoDescription,
            inLanguage: 'zh-CN',
            articleSection: article.categoryLabel,
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
            citation: article.source
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems([
              { name: schema.breadcrumbHome, url: `${siteUrl}/zh` },
              { name: '技术中心', url: hubUrl },
              { name: article.title, url: articleUrl }
            ])
          }
        ]
      }}
    />
  );
}
