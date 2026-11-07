import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/JsonLd';
import TechArticlePage from '@/components/tech-center/TechArticlePage';
import type { TechArticle } from '@/lib/tech-center-content';
import { getDictionary } from '@/lib/i18n';
import { getAlternates } from '@/lib/seo';
import { currentSiteVariant, getOwnedLocaleUrl } from '@/lib/siteRouting';

const WIKI_TITLE = 'FastGPT 百科 - AI 智能体、RAG、知识库概念详解';
const WIKI_DESCRIPTION =
  'FastGPT 百科介绍 AI 智能体、RAG 检索增强生成与知识库的核心概念，并说明 FastGPT 如何通过可视化工作流、工具调用和权限治理，帮助企业构建可落地的 AI 应用。';
const WIKI_DATE_MODIFIED = '2026-09-21';
const WIKI_URL = getOwnedLocaleUrl('zh', '/wiki');
const WIKI_SOURCE_PATH = path.join(process.cwd(), 'src/content/wiki/fastgpt.md');

function getWikiArticle(): TechArticle {
  return {
    title: 'FastGPT',
    slug: '/zh/wiki',
    category: 'reference',
    categoryLabel: '百科',
    sourceType: '深度场景内容',
    summary: WIKI_DESCRIPTION,
    minutes: 12,
    dateModified: WIKI_DATE_MODIFIED,
    contentType: 'Article',
    keywords: ['FastGPT', 'AI Agent', '知识库', '工作流', 'MCP', '开源软件'],
    metaTitle: WIKI_TITLE,
    pageType: '百科',
    markdown: fs.readFileSync(WIKI_SOURCE_PATH, 'utf8').trim(),
    relatedLinks: [],
    publishedLocales: ['zh'],
    seoDescription: WIKI_DESCRIPTION
  };
}

export default async function WikiPage() {
  const dict = await getDictionary('zh');
  const article = getWikiArticle();
  const homeUrl = getOwnedLocaleUrl('zh');

  return (
    <>
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              '@id': `${WIKI_URL}#article`,
              url: WIKI_URL,
              headline: WIKI_TITLE,
              description: WIKI_DESCRIPTION,
              inLanguage: 'zh-CN',
              articleSection: '百科',
              dateModified: WIKI_DATE_MODIFIED,
              author: {
                '@type': 'Organization',
                name: dict.JsonLd.organizationName,
                url: 'https://github.com/labring/FastGPT'
              },
              publisher: {
                '@type': 'Organization',
                name: dict.JsonLd.organizationName,
                url: new URL(WIKI_URL).origin
              },
              mainEntityOfPage: { '@type': 'WebPage', '@id': WIKI_URL }
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: dict.JsonLd.breadcrumbHome,
                  item: homeUrl
                },
                { '@type': 'ListItem', position: 2, name: WIKI_TITLE, item: WIKI_URL }
              ]
            }
          ]
        }}
      />
      <TechArticlePage
        article={article}
        locale="zh"
        links={dict.links}
        navCta={dict.Home.navCta}
        footer={dict.Home.footer}
        relatedArticles={[]}
        showBreadcrumbs={false}
        showMeta={false}
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

export function generateMetadata(): Metadata {
  return {
    title: WIKI_TITLE,
    description: WIKI_DESCRIPTION,
    keywords: ['FastGPT', 'AI Agent', '知识库', '工作流', 'MCP', '开源软件'],
    robots:
      currentSiteVariant === 'preview'
        ? { index: false, follow: false }
        : { index: true, follow: true },
    alternates: getAlternates('zh', '/wiki', ['zh']),
    openGraph: {
      title: WIKI_TITLE,
      description: WIKI_DESCRIPTION,
      type: 'article',
      locale: 'zh_CN',
      url: WIKI_URL,
      modifiedTime: WIKI_DATE_MODIFIED
    },
    twitter: {
      card: 'summary',
      title: WIKI_TITLE,
      description: WIKI_DESCRIPTION
    }
  };
}
