'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();

  // 如果没有提供 items，从路径自动生成
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  if (breadcrumbItems.length <= 1) {
    return null; // 首页不显示面包屑
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link
        href="/"
        className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <div key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span
                className="text-gray-900 dark:text-gray-100 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // 移除语言代码（en, zh, ja）
  const langCodes = ['en', 'zh', 'ja'];
  const filteredSegments = segments.filter(seg => !langCodes.includes(seg));

  let currentPath = '';
  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // 格式化标签（首字母大写，替换连字符）
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}

// 预定义的面包屑映射（用于自定义标签）
export const breadcrumbLabels: Record<string, string> = {
  enterprise: 'Enterprise',
  price: 'Pricing',
  faq: 'FAQ',
  blog: 'Blog',
  tutorials: 'Tutorials',
  'use-cases': 'Use Cases',
};
