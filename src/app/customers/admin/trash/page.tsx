import TrashList from '@/customers/components/admin/trash/TrashList';
import { getTrashedCustomers } from '@/app/customers/admin/actions/customers';
import type { AdminCustomerListData } from '@/customers/components/admin/customer-list/types';

export const dynamic = 'force-dynamic';

export default async function AdminTrashPage() {
  const result = await getTrashedCustomers();

  if (!result.success || !result.data) {
    const errorMessage = result.success ? '暂无数据' : result.error;
    return (
      <div className="p-8 text-center text-red-500">
        加载回收站数据失败：{errorMessage}
      </div>
    );
  }

  return <TrashList initialData={result.data as AdminCustomerListData} />;
}
