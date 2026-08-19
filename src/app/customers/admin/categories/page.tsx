import { getAdminCategories } from '../actions/categories';
import CategoryManager from '@/customers/components/admin/CategoryManager';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const res = await getAdminCategories();

  if (!res.success) {
    return (
      <div className="p-8 text-center text-red-500">
        加载分类数据失败：{res.error}
      </div>
    );
  }

  return <CategoryManager initialCategories={res.data || []} />;
}
