import { redirect } from 'next/navigation';
import { getSolutionById } from '@/app/customers/admin/actions/solutions';
import { buildAdminSolutionEditHref } from '@/customers/lib/admin-solution-routing';
import { renderEditSolutionPage } from '@/app/customers/admin/customers/_edit-page';

type LegacyEditSolutionPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export default async function LegacyEditSolutionPage({
  params
}: LegacyEditSolutionPageProps) {
  const { categorySlug: id } = await params;
  const solutionRes = await getSolutionById(id);
  const solution = solutionRes.success ? solutionRes.data : null;

  if (solution?.categorySlug) {
    redirect(buildAdminSolutionEditHref({
      id,
      categorySlug: solution.categorySlug
    }));
  }

  return renderEditSolutionPage(id);
}
