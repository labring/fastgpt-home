import {
  getCategories,
  getAllPublishedSolutions,
  getAllPublishedSolutionDirectoryEntries,
  getSiteSettings
} from '@customers/lib/data';
import { getSolutionPublicHref } from '@customers/lib/solution-url';
import { absoluteUrl } from '@customers/lib/site-url';
import { getGitHubStars } from '@/lib/githubStars';
import {
  buildHomeDirectoryJsonLd,
  splitDirectoryEntries
} from '@customers/lib/ai-readable-directory';
import HomeClient from './HomeClient';

export async function HomePageContent({
  categorySlug,
  renderHomeDirectoryJsonLd = false
}: {
  categorySlug?: string;
  renderHomeDirectoryJsonLd?: boolean;
} = {}) {
  const initialCategories = getCategories();
  const allSolutions = getAllPublishedSolutions();
  const settings = getSiteSettings();
  const stars = await getGitHubStars();

  const homeDirectoryJsonLd = renderHomeDirectoryJsonLd
    ? (() => {
        const directory = splitDirectoryEntries(getAllPublishedSolutionDirectoryEntries());
        return buildHomeDirectoryJsonLd({
          cases: directory.cases,
          solutions: directory.solutions,
          absoluteUrlOf: (entry) => absoluteUrl(getSolutionPublicHref(entry))
        });
      })()
    : null;
  const overviewStats = settings.overviewStats?.length
    ? settings.overviewStats
    : [{ value: '100+', label: '行业定制模板' }];

  return (
    <>
      {renderHomeDirectoryJsonLd && homeDirectoryJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeDirectoryJsonLd).replace(/</g, '\\u003c')
          }}
        />
      )}
      <HomeClient
        initialCategories={initialCategories}
        initialSolutions={allSolutions}
        overviewStats={overviewStats}
        stars={stars}
        initialCategorySlug={categorySlug}
      />
    </>
  );
}

export default async function Home() {
  return <HomePageContent renderHomeDirectoryJsonLd />;
}
