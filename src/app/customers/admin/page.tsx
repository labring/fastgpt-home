import { getAdminCustomers } from './actions/customers';
import { getAdminCategories } from './actions/categories';
import CustomerList from '@/customers/components/admin/CustomerList';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : '';

  const [res, catRes] = await Promise.all([
    getAdminCustomers(search),
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

  return <CustomerList initialData={res.data} categories={categories} />;
}
