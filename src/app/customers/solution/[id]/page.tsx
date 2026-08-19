import { getSolutionByIdPublic, getSolutions } from '@/customers/lib/data';
import SolutionPageClient from './SolutionPageClient';
import SolutionReadableArticle from '@/customers/components/solution/SolutionReadableArticle';
import { absoluteUrl } from '@/customers/lib/site-url';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';
import { buildSolutionJsonLd } from '@/customers/lib/solution-json-ld';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

type SolutionPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = 'force-dynamic';

export type SolutionRouteParams = {
  id: string;
  categorySlug?: string;
};

export async function generateSolutionMetadata(params: SolutionRouteParams): Promise<Metadata> {
  const { id } = params;
  const solution = await getSolutionByIdPublic(id);

  if (!solution) {
    return {
      title: '解决方案不存在 - FastGPT 客户案例中心',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const pageUrl = absoluteUrl(getSolutionPublicHref(solution));
  const imageUrl = solution.imageUrl?.startsWith('http')
    ? solution.imageUrl
    : absoluteUrl(solution.imageUrl || '/fastgpt.svg');

  // 回退链：metaTitle → 站点模板；metaDescription → description；publishedAt → createdAt
  const metaTitle = solution.metaTitle || `${solution.title} - FastGPT 客户案例中心`;
  const metaDescription = solution.metaDescription || solution.description;
  const publishedTime = solution.publishedAt || solution.createdAt;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: pageUrl
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: solution.title,
      description: metaDescription,
      url: pageUrl,
      siteName: 'FastGPT 客户案例中心',
      locale: 'zh_CN',
      type: 'article',
      publishedTime,
      modifiedTime: solution.updatedAt,
      images: [
        {
          url: imageUrl,
          alt: solution.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.title,
      description: metaDescription,
      images: [imageUrl]
    }
  };
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  return generateSolutionMetadata(await params);
}

export async function renderSolutionPage(params: SolutionRouteParams) {
  const { id } = params;
  const [initialSolution, allSolutionsData] = await Promise.all([
    getSolutionByIdPublic(id),
    getSolutions(100),
  ]);

  return (
    <>
      {initialSolution && (
        <>
          <SolutionReadableArticle solution={initialSolution} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildSolutionJsonLd(initialSolution)).replace(/</g, '\\u003c')
            }}
          />
        </>
      )}
      <SolutionPageClient
        id={id}
        initialSolution={initialSolution}
        initialAllSolutions={allSolutionsData}
      />
    </>
  );
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { id } = await params;
  const solution = await getSolutionByIdPublic(id);

  if (!solution) {
    notFound();
  }

  permanentRedirect(getSolutionPublicHref(solution));
}
