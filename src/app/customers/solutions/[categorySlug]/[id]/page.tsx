import { notFound, permanentRedirect } from 'next/navigation';
import type { SolutionRouteParams } from '@/app/customers/solution/[id]/page';
import { getSolutionByIdPublic } from '@/customers/lib/data';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';

type SemanticSolutionPageProps = {
  params: Promise<SolutionRouteParams>;
};

export default async function LegacyPrefixedSolutionPage({ params }: SemanticSolutionPageProps) {
  const routeParams = await params;
  const solution = await getSolutionByIdPublic(routeParams.id);

  if (!solution) {
    notFound();
  }

  permanentRedirect(getSolutionPublicHref(solution));
}
