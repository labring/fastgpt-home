import type { Metadata } from 'next';
import { generateSolutionMetadata, renderSolutionPage } from '@customers/lib/solution-page';
import { getAllPublishedSolutionDetails } from '@customers/lib/data';

type SemanticSolutionPageProps = { params: Promise<{ categorySlug: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPublishedSolutionDetails().map((solution) => ({
    categorySlug: solution.categorySlug,
    slug: solution.slug
  }));
}

export async function generateMetadata({ params }: SemanticSolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateSolutionMetadata({ id: slug });
}

export default async function SemanticSolutionPage({ params }: SemanticSolutionPageProps) {
  const { slug } = await params;
  return renderSolutionPage({ id: slug });
}
