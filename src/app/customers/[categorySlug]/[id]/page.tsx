import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  generateSolutionMetadata,
  renderSolutionPage,
  type SolutionRouteParams
} from '@/app/customers/solution/[id]/page';
import { getSolutionByIdPublic } from '@/customers/lib/data';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';
import { isValidObjectId } from '@/customers/lib/object-id';

type SemanticSolutionPageProps = {
  params: Promise<SolutionRouteParams>;
};

// Content is cached for five minutes. Visitor state remains in no-store client requests.
export const revalidate = 300;

export async function generateMetadata({ params }: SemanticSolutionPageProps): Promise<Metadata> {
  return generateSolutionMetadata(await params);
}

export default async function SemanticSolutionPage({ params }: SemanticSolutionPageProps) {
  const routeParams = await params;
  const solution = await getSolutionByIdPublic(routeParams.id);

  if (!solution) {
    notFound();
  }

  if (isValidObjectId(routeParams.id) && solution.slug) {
    permanentRedirect(getSolutionPublicHref(solution));
  }

  if (solution.slug && routeParams.id !== solution.slug) {
    permanentRedirect(getSolutionPublicHref(solution));
  }

  if (solution.categorySlug !== routeParams.categorySlug) {
    permanentRedirect(getSolutionPublicHref(solution));
  }

  return renderSolutionPage(routeParams);
}
