import { getAdminSolutions } from '../actions/solutions';
import { getAdminCategories } from '../actions/categories';
import SolutionList from '@/customers/components/admin/SolutionList';

export const dynamic = 'force-dynamic';

export default async function AdminSolutionsPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : '';

  const [res, catRes] = await Promise.all([
    getAdminSolutions(search),
    getAdminCategories()
  ]);

  if (!res.success || !res.data) {
    return (
      <div className="p-8 text-center text-red-500">
        加载客户案例数据失败：{res.error}
      </div>
    );
  }

  const categories = catRes.success && catRes.data ? catRes.data : [];

  return <SolutionList initialData={res.data} categories={categories} />;
}
