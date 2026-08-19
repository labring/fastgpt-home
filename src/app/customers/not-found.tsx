import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase text-brand-600">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-surface-900 dark:text-surface-50">
          页面不存在
        </h1>
        <p className="mt-4 text-base leading-7 text-surface-600 dark:text-surface-300">
          该客户案例可能已调整地址、尚未发布，或链接有误。
        </p>
        <Link
          href="/customers"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          返回客户案例中心
        </Link>
      </div>
    </main>
  );
}
