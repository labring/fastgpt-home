import TrashList from '@/customers/components/admin/trash/TrashList';
import { getTrashedSolutions } from '@/app/customers/admin/actions/solutions';
import type { AdminSolutionListData } from '@/customers/components/admin/solution-list/types';

export const dynamic = 'force-dynamic';

export default async function AdminTrashPage() {
  const result = await getTrashedSolutions();

  if (!result.success || !result.data) {
    const errorMessage = result.success ? '暂无数据' : result.error;
    return (
      <div className="p-8 text-center text-red-500">
        加载回收站数据失败：{errorMessage}
      </div>
    );
  }

  return <TrashList initialData={result.data as AdminSolutionListData} />;
}
