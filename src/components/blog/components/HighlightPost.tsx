import Image from 'next/image';
import Link from 'next/link';

import type { BlogListPost } from './PostCard';
import { getBlogCoverPath, getBlogFeaturedCoverPath } from '../blogThumbnails';
import { getBlogCopy } from '../blogCopy';
import { getHostLocalePath } from '@/lib/siteRouting';
import { cn } from '@/lib/utils';

type HighlightPostProps = {
  post: BlogListPost;
  locale: string;
  categoryLabel: string;
  large?: boolean;
};

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(getBlogCopy(locale).article.dateLocale, {
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
  const thumbnail =
    post.thumbnail ||
    (large
      ? getBlogFeaturedCoverPath(post.locale, post.slug)
      : getBlogCoverPath(post.locale, post.slug));

  return (
    <article className="min-w-0 h-full">
      <Link
        href={getHostLocalePath(locale, `/blog/${post.slug}`)}
        className={cn(
          'group block min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 h-full',
          large && 'lg:flex lg:flex-col'
        )}
      >
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-base text-ink-sub">
            <span className="rounded-full bg-light-bg px-2 py-1 text-xs text-slate-500">
              {categoryLabel}
            </span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </div>
          <h2
            className={cn(
              'm-0 h-8 line-clamp-1 font-normal text-ink transition-colors group-hover:text-primary',
              large ? 'text-2xl' : 'text-xl'
            )}
          >
            {post.title}
          </h2>
        </div>

        <div
          className={cn(
            'relative min-h-[12.5rem] overflow-hidden rounded-2xl bg-light-bg shadow-sm ring-1 ring-gray-200',
            large && 'min-h-[30rem] lg:flex-grow lg:h-full'
          )}
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.2]"
          />
        </div>
      </Link>
    </article>
  );
}
