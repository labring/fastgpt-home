import { permanentRedirect, redirect } from 'next/navigation';
import { getSolutionById } from '@/app/customers/admin/actions/solutions';
import { buildAdminSolutionEditHref } from '@/customers/lib/admin-solution-routing';
import { renderEditSolutionPage } from '@/app/customers/admin/customers/_edit-page';

type EditSolutionWithCategoryPageProps = {
  params: Promise<{ categorySlug: string; id: string }>;
};

export default async function EditSolutionWithCategoryPage({
  params
}: EditSolutionWithCategoryPageProps) {
  const resolvedParams = await params;
  const solutionRes = await getSolutionById(resolvedParams.id);
  const solution = solutionRes.success ? solutionRes.data : null;

  // 旧 ObjectId / 非规范 URL → 语义 slug URL（与前台 URL 对齐）
  if (solution?.slug && resolvedParams.id !== solution.slug) {
    permanentRedirect(buildAdminSolutionEditHref({
      id: solution.slug,
      slug: solution.slug,
      categorySlug: solution.categorySlug
    }));
  }

  if (solution?.categorySlug && solution.categorySlug !== resolvedParams.categorySlug) {
    redirect(buildAdminSolutionEditHref({
      id: solution.slug || resolvedParams.id,
      slug: solution.slug,
      categorySlug: solution.categorySlug
    }));
  }

  return renderEditSolutionPage(resolvedParams.id);
}
