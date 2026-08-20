import Link from 'next/link';
import {
  ArticleIcon,
  CursorClickIcon,
  FolderOpenIcon,
  HeartIcon,
  SquaresFourIcon
} from '@phosphor-icons/react/ssr';
import { getDashboardStats } from '@/app/customers/admin/actions/dashboard';
import CreateCustomerButton from '@/customers/components/admin/CreateCustomerButton';
import DashboardCharts from '@/customers/components/admin/DashboardCharts';

const createActionClassName =
  'flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-blue-700';
const manageCategoriesClassName =
  'flex items-center gap-2 rounded-xl bg-zinc-100 px-5 py-2.5 font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700';

export default async function AdminDashboardPage() {
  const result = await getDashboardStats();

  if (!result.success || !result.data) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        加载数据失败：{result.error}
      </div>
    );
  }

  const { data } = result;
  const statsCards = [
    {
      title: '总解决方案',
      value: data.totalCustomers,
      desc: `已发布 ${data.publishedCustomers} / 草稿 ${data.draftCustomers}`,
      icon: ArticleIcon,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: '全部分类',
      value: data.totalCategories,
      desc: '当前启用的分类模块',
      icon: FolderOpenIcon,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: '累计点赞',
      value: data.totalLikes,
      desc: '所有方案的点赞总数',
      icon: HeartIcon,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      title: '累计使用',
      value: data.totalUsage,
      desc: '所有方案的使用总数',
      icon: CursorClickIcon,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">数据看板</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            聚合方案、分类与互动数据，帮助你快速掌握后台整体运行状态。
          </p>
        </div>

        <div className="flex gap-3">
          <CreateCustomerButton
            label="发布新方案"
            className={createActionClassName}
          />
          <Link
            href="/customers/admin/categories"
            className={manageCategoriesClassName}
          >
            <SquaresFourIcon size={20} weight="bold" />
            管理分类
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-blue-500/30 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className={`rounded-lg p-3 ${card.bg} ${card.color}`}>
                <Icon size={24} weight="fill" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{card.title}</p>
                <h3 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{card.value}</h3>
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <DashboardCharts
        topCustomers={data.topCustomers}
        categoryStats={data.categoryStats}
        statusStats={{
          published: data.publishedCustomers,
          draft: data.draftCustomers
        }}
        trendStats={data.trendStats}
      />
    </div>
  );
}
