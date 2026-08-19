import SolutionEditor from '@/customers/components/admin/SolutionEditor';
import { getAdminCategories } from '@/app/customers/admin/actions/categories';
import { getSolutionById, getAdminSolutions } from '@/app/customers/admin/actions/solutions';
import { redirect } from 'next/navigation';

export async function renderEditSolutionPage(id: string) {
  const [catRes, solRes, allRes] = await Promise.all([
    getAdminCategories(),
    getSolutionById(id),
    getAdminSolutions('')
  ]);

  if (solRes.success && !solRes.data) {
    redirect('/customers/admin/customers');
  }

  if (!catRes.success || !solRes.success || !solRes.data) {
    return <div className="p-8 text-center text-red-500">无法加载数据，请重试。</div>;
  }

  const allItems = allRes.success ? allRes.data?.items ?? [] : [];
  const currentIndex = allItems.findIndex(
    (item: { _id: string }) => item._id === (solRes.data._id || id)
  );
  const prevSolution = currentIndex > 0 ? {
    id: allItems[currentIndex - 1]._id,
    slug: allItems[currentIndex - 1].slug,
    title: allItems[currentIndex - 1].title,
    categorySlug: allItems[currentIndex - 1].categorySlug
  } : null;
  const nextSolution = currentIndex >= 0 && currentIndex < allItems.length - 1 ? {
    id: allItems[currentIndex + 1]._id,
    slug: allItems[currentIndex + 1].slug,
    title: allItems[currentIndex + 1].title,
    categorySlug: allItems[currentIndex + 1].categorySlug
  } : null;

  return (
    <SolutionEditor
      categories={catRes.data || []}
      initialData={solRes.data}
      draftId={id}
      prevSolution={prevSolution}
      nextSolution={nextSolution}
    />
  );
}
