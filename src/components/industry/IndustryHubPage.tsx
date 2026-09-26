import Link from 'next/link';

import guideStyles from '@/components/guide/GuideHubPage.module.css';
import { industryArticles, getIndustryPath, type IndustryLocale } from '@/lib/industryContent';
import { industryHubCopy } from '@/lib/industrySeo';
import { getReviewLocalePath } from '@/lib/siteRouting';

type IndustryHubGroup = {
  key: string;
  pageType: string;
  heading: string;
  description: string;
};

const hubGroups: Record<IndustryLocale, IndustryHubGroup[]> = {
  en: [
    {
      key: 'scenarios',
      pageType: 'Industry scenario page',
      heading: 'Industry scenarios',
      description:
        'Explore AI configuration patterns for real industry workflows and business roles.'
    }
  ],
  zh: [
    {
      key: 'questions',
      pageType: '行业问题页',
      heading: '行业问题页',
      description: '从服务对象行业与业务方向进入具体的 AI 配置问题。'
    },
    {
      key: 'scenarios',
      pageType: '行业场景页',
      heading: '行业场景页',
      description: '按金融业务品类浏览材料、约束和 FastGPT 配置建议。'
    },
    {
      key: 'workflows',
      pageType: '行业作业环节页',
      heading: '行业作业环节页',
      description: '聚焦具体作业步骤，识别适合系统承接的工作边界。'
    }
  ]
};

const hubCopy = {
  en: {
    home: 'Home',
    industry: 'Industry',
    heading: industryHubCopy.en.title,
    description: industryHubCopy.en.description,
    readArticle: 'Read article',
    pageCount: (count: number) => `${count.toLocaleString('en-US')} pages`
  },
  zh: {
    home: '首页',
    industry: '行业内容',
    heading: industryHubCopy.zh.title,
    description: industryHubCopy.zh.description,
    readArticle: '阅读文章',
    pageCount: (count: number) => `${count.toLocaleString('zh-CN')} 篇`
  }
} as const;

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0');
}

export function getIndustryHubCopy(locale: IndustryLocale) {
  return hubCopy[locale];
}

export default function IndustryHubPage({ locale }: { locale: IndustryLocale }) {
  const copy = getIndustryHubCopy(locale);

  return (
    <main className={guideStyles.page}>
      <div className={guideStyles.container}>
        <nav aria-label={copy.industry} className={guideStyles.breadcrumb}>
          <ol>
            <li>
              <Link href={getReviewLocalePath(locale)}>{copy.home}</Link>
            </li>
            <li aria-current="page">{copy.industry}</li>
          </ol>
        </nav>
        <header className={guideStyles.hero}>
          <h1>{copy.heading}</h1>
          <p>{copy.description}</p>
        </header>
        {hubGroups[locale].map((group, groupIndex) => {
          const groupArticles = industryArticles.filter(
            (article) => article.locale === locale && article.pageType === group.pageType
          );
          const articles = groupArticles.slice(0, 4);
          const count = groupArticles.length;

          return (
            <section
              aria-labelledby={`industry-group-${group.key}`}
              className={guideStyles.group}
              key={group.key}
            >
              <div className={guideStyles.groupHeader}>
                <span className={guideStyles.groupIndex}>{formatIndex(groupIndex)}</span>
                <h2 id={`industry-group-${group.key}`}>{group.heading}</h2>
                <p>{group.description}</p>
                <p>{copy.pageCount(count)}</p>
              </div>
              <ul className={guideStyles.cardGrid}>
                {articles.map((article, index) => (
                  <li
                    className={index === 0 ? guideStyles.featuredCardItem : undefined}
                    key={article.slug}
                  >
                    <Link
                      className={
                        guideStyles.card + (index === 0 ? ' ' + guideStyles.featuredCard : '')
                      }
                      href={getReviewLocalePath(locale, getIndustryPath(article.slug))}
                    >
                      <div className={guideStyles.cardTopline}>
                        <span>{formatIndex(index)}</span>
                        <span>{group.heading}</span>
                      </div>
                      <div>
                        <h3>{article.title}</h3>
                        <p>{article.metaDescription}</p>
                      </div>
                      <span className={guideStyles.cardAction}>
                        {copy.readArticle}
                        <span aria-hidden="true">↗</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
