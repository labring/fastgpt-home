import Link from 'next/link';

import { guideEntries, type GuidePublicationGroup } from '@/content/guides/registry';
import { getGuidePath, type GuidePublishedLocale } from '@/lib/guideSeo';
import { getOwnedLocalePath } from '@/lib/siteRouting';
import styles from './GuideHubPage.module.css';

const HUB_GROUPS: GuidePublicationGroup[] = ['decision', 'implementation', 'industry'];

const hubCopy: Record<
  GuidePublishedLocale,
  {
    breadcrumbHome: string;
    breadcrumbGuide: string;
    heading: string;
    description: string;
    readGuide: string;
    groups: Record<GuidePublicationGroup, { heading: string; description: string }>;
  }
> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbGuide: 'Guides',
    heading: 'FastGPT Guides',
    description: 'Practical enterprise AI implementation and decision guides.',
    readGuide: 'Read guide',
    groups: {
      decision: {
        heading: 'Decision guides',
        description:
          'Evaluate fit, ownership, cost, and readiness before committing to an AI program.'
      },
      implementation: {
        heading: 'Implementation guides',
        description: 'Turn a defined support use case into an auditable implementation plan.'
      },
      industry: {
        heading: 'Industry guides',
        description: 'Apply enterprise AI patterns to high-context operational workflows.'
      }
    }
  },
  zh: {
    breadcrumbHome: '首页',
    breadcrumbGuide: '指南',
    heading: 'FastGPT 指南',
    description: '企业 AI 落地与选型实践指南。',
    readGuide: '阅读指南',
    groups: {
      decision: {
        heading: '决策指南',
        description: '在启动企业 AI 项目前评估适配性、责任边界、成本与准备度。'
      },
      implementation: {
        heading: '实施指南',
        description: '将明确的支持场景转化为可审计的实施方案。'
      },
      industry: {
        heading: '行业指南',
        description: '把企业 AI 模式应用于高上下文的业务运营流程。'
      }
    }
  }
};

export function getGuideHubCopy(locale: GuidePublishedLocale) {
  return hubCopy[locale];
}

export default function GuideHubPage({ locale }: { locale: GuidePublishedLocale }) {
  const copy = getGuideHubCopy(locale);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav aria-label={copy.breadcrumbGuide} className={styles.breadcrumb}>
          <ol>
            <li>
              <Link href={getOwnedLocalePath(locale, '/')}>{copy.breadcrumbHome}</Link>
            </li>
            <li aria-current="page">{copy.breadcrumbGuide}</li>
          </ol>
        </nav>
        <header className={styles.hero}>
          <h1>{copy.heading}</h1>
          <p>{copy.description}</p>
        </header>
        {HUB_GROUPS.map((group, groupIndex) => {
          const groupCopy = copy.groups[group];
          const cards = guideEntries.filter((entry) => entry.group === group);

          return (
            <section aria-labelledby={`guide-group-${group}`} className={styles.group} key={group}>
              <div className={styles.groupHeader}>
                <span className={styles.groupIndex}>{String(groupIndex + 1).padStart(2, '0')}</span>
                <h2 id={`guide-group-${group}`}>{groupCopy.heading}</h2>
                <p>{groupCopy.description}</p>
              </div>
              <ul className={styles.cardGrid}>
                {cards.map((entry, index) => {
                  const source = entry[locale];

                  return (
                    <li
                      className={index === 0 ? styles.featuredCardItem : undefined}
                      key={entry.slug}
                    >
                      <Link
                        className={styles.card + (index === 0 ? ' ' + styles.featuredCard : '')}
                        href={getOwnedLocalePath(locale, getGuidePath(entry.slug))}
                      >
                        <div className={styles.cardTopline}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <span>{groupCopy.heading}</span>
                        </div>
                        <div>
                          <h3>{source.h1}</h3>
                          <p>{source.metaDescription}</p>
                        </div>
                        <span className={styles.cardAction}>
                          {copy.readGuide}
                          <span aria-hidden="true">↗</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
