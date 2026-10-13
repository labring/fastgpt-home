import Link from 'next/link';

import guideStyles from '@/components/guide/GuideHubPage.module.css';
import type { IndustryLocale } from '@/lib/industryContent';
import type { IndustryAreaCounts, IndustrySummary } from '@/lib/industryListing';
import IndustryBrowser from '@/components/industry/IndustryBrowser';
import { industryHubCopy } from '@/lib/industrySeo';
import { getReviewLocalePath } from '@/lib/siteRouting';

const hubCopy = {
  en: {
    home: 'Home',
    industry: 'Industry',
    heading: industryHubCopy.en.title,
    description: industryHubCopy.en.description
  },
  zh: {
    home: '首页',
    industry: '行业内容',
    heading: industryHubCopy.zh.title,
    description: industryHubCopy.zh.description
  }
} as const;

export function getIndustryHubCopy(locale: IndustryLocale) {
  return hubCopy[locale];
}

export default function IndustryHubPage({
  locale,
  initialEntries,
  counts
}: {
  locale: IndustryLocale;
  initialEntries: IndustrySummary[];
  counts: IndustryAreaCounts;
}) {
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
        <IndustryBrowser
          locale={locale}
          initialEntries={initialEntries}
          counts={counts}
          indexPath={`/industry-index/${locale}/index.json`}
          articlePrefix={`${getReviewLocalePath(locale, '/industry')}/`}
        />
      </div>
    </main>
  );
}
