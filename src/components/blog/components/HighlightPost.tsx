import Image from 'next/image';
import Link from 'next/link';

import type { BlogListPost } from './PostCard';
import { getReviewLocalePath } from '@/lib/siteRouting';
import { cn } from '@/lib/utils';

type HighlightPostProps = {
  post: BlogListPost;
  locale: string;
  categoryLabel: string;
  large?: boolean;
};

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'zh' || locale === 'zh-hant' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

export default function HighlightPost({
  post,
  locale,
  categoryLabel,
  large = false
}: HighlightPostProps) {
  return (
    <article className="min-w-0">
      <Link
        href={getReviewLocalePath(locale, `/blog/${post.slug}`)}
        className={cn(
          'group block min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4',
          large && 'lg:flex lg:flex-col'
        )}
      >
        <div
          className={cn(
            'relative h-[12.5rem] overflow-hidden rounded-2xl bg-light-bg shadow-sm ring-1 ring-gray-200',
            large && 'h-[30rem]'
          )}
        >
          {post.thumbnail && (
            <Image
              src={post.thumbnail}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-base text-ink-sub">
            <span className="rounded-full bg-light-bg px-2 py-1 text-xs text-slate-500">
              {categoryLabel}
            </span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </div>
          <h2
            className={`m-0 h-8 line-clamp-1 font-normal text-ink ${
              large ? 'text-2xl' : 'text-xl'
            }`}
          >
            {post.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}
