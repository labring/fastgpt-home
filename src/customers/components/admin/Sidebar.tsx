'use client';

import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/customers/lib/base-path';
import { usePathname } from 'next/navigation';
import {
  SquaresFourIcon,
  ArticleIcon,
  FolderOpenIcon,
  SignOutIcon,
  ListIcon,
  SunIcon,
  MoonIcon,
  DesktopIcon,
  ArrowSquareOutIcon,
  GearSixIcon,
  TrashIcon,
  ChartBarIcon
} from '@phosphor-icons/react';
import { useState, useSyncExternalStore } from 'react';
import { useTheme } from '@/customers/components/theme-provider';
import { getPublicMainUrlSetting } from '@/app/customers/admin/actions/settings';

const navItems = [
  { name: '客户案例管理', href: '/customers/admin/customers', icon: ArticleIcon },
  { name: '回收站', href: '/customers/admin/trash', icon: TrashIcon },
  { name: '数据看板', href: '/customers/admin/dashboard', icon: SquaresFourIcon },
  { name: 'POC 点击分析', href: '/customers/admin/cta-analytics', icon: ChartBarIcon },
  { name: '分类管理', href: '/customers/admin/categories', icon: FolderOpenIcon },
  { name: '系统配置', href: '/customers/admin/settings', icon: GearSixIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
  const sidebarActionButtonClass =
    'flex items-center justify-center w-10 h-10 rounded-xl text-zinc-500 dark:text-[#aeb4bc] hover:bg-zinc-100 dark:hover:bg-[#30343b] hover:text-blue-600 dark:hover:text-[#8ab4f8] transition-all group relative';

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const getThemeIcon = () => {
    if (theme === 'system') return <DesktopIcon size={22} />;
    if (theme === 'dark') return <MoonIcon size={22} weight="fill" />;
    return <SunIcon size={22} />;
  };

  const getThemeTitle = () => {
    if (theme === 'system') return '当前：跟随系统 (点击切换白天模式)';
    if (theme === 'dark') return '当前：黑夜模式 (点击切换跟随系统)';
    return '当前：白天模式 (点击切换黑夜模式)';
  };

  const isNavItemActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-[#2b2f36] rounded-md shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <ListIcon size={24} className="text-zinc-600 dark:text-[#dfe1e5]" />
      </button>

      {/* 移动端遮罩 */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-16
        bg-white dark:bg-[#202124] border-r border-zinc-200 dark:border-[#373c43]
        transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col items-center overflow-x-hidden
      `}>
        <nav className="flex-1 w-full px-2 pt-6 pb-4 space-y-4 overflow-y-auto overflow-x-hidden flex flex-col items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isNavItemActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                title={item.name}
                className={`
                  relative flex items-center justify-center w-10 h-10 rounded-xl transition-all group
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-zinc-500 dark:text-[#aeb4bc] hover:bg-zinc-100 dark:hover:bg-[#30343b] hover:text-zinc-900 dark:hover:text-[#f1f3f5]'}
                `}
              >
                <Icon size={22} weight={isActive ? "fill" : "regular"} />
                {!isActive && (
                  <div className="absolute left-14 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-zinc-200 dark:border-[#373c43] w-full flex flex-col items-center gap-4">
          <button
            type="button"
            className={sidebarActionButtonClass}
            title="访问前台"
            onClick={async () => {
              const currentHost = window.location.host;
              const protocol = window.location.protocol;
              const mainHost = currentHost.replace('3001', '3000');
              const configuredMainUrl = await getPublicMainUrlSetting();
              const targetUrl = configuredMainUrl || `${protocol}//${mainHost}`;
              window.open(targetUrl, '_blank');
            }}
          >
            <ArrowSquareOutIcon size={22} />
            <div className="absolute left-14 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              访问前台
            </div>
          </button>

          <button
            type="button"
            className={sidebarActionButtonClass}
            title={mounted ? getThemeTitle() : '主题切换'}
            onClick={mounted ? cycleTheme : undefined}
            disabled={!mounted}
            aria-label="主题切换"
          >
            {mounted ? (
              getThemeIcon()
            ) : (
              <DesktopIcon size={22} className="opacity-40" />
            )}
            {mounted && (
              <div className="absolute left-14 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {getThemeTitle()}
              </div>
            )}
          </button>

          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-xl text-zinc-500 dark:text-[#aeb4bc] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-300 transition-all group relative"
            title="退出登录"
            onClick={async () => {
              await fetch(withBasePath('/api/admin/logout'), { method: 'POST' });
              window.location.href = '/customers/login';
            }}
          >
            <SignOutIcon size={22} />
            <div className="absolute left-14 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              退出登录
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center h-12 w-full shrink-0">
          <Link href="/customers/admin/customers" className="relative w-7 h-7 transition-transform hover:scale-110 opacity-60 hover:opacity-100">
            <Image src={withBasePath('/fastgpt.svg')} alt="Admin" fill sizes="28px" loading="eager" className="object-contain" />
          </Link>
        </div>
      </aside>
    </>
  );
}
