import { getCtaStats } from '@/app/customers/admin/actions/cta';
import CtaCharts from './CtaCharts';

export default async function CtaAnalyticsPage() {
  const result = await getCtaStats(30);

  if (!result.success || !result.data) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        加载数据失败：{result.error}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          POC 点击分析
        </h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          追踪各入口&quot;申请 POC&quot;按钮的点击次数与趋势。概览卡片为历史累计数据，折线图展示近 30 天趋势。
        </p>
      </div>

      <CtaCharts data={result.data} days={30} />
    </div>
  );
}
