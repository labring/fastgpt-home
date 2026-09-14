import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/content/blog';
import { getReviewLocalePath } from '@/lib/siteRouting';

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export default function BlogCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      {post.thumbnail && (
        <Image
          src={post.thumbnail}
          alt=""
          width={1200}
          height={630}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {post.category}
        </p>
        <h2 className="text-xl font-semibold leading-tight text-slate-900">
          <Link
            href={getReviewLocalePath(locale, `/blog/${post.slug}`)}
            className="hover:text-blue-600"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-sm leading-6 text-slate-600">{post.summary}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{post.authorRecord.name}</span>
          <time dateTime={post.date.toISOString()}>{formatDate(post.date, locale)}</time>
        </div>
      </div>
    </article>
  );
}
