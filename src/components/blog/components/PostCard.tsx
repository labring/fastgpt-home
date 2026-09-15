import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getReviewLocalePath } from '@/lib/siteRouting';

import type { BlogListPost } from '../blogPagination';

export type { BlogListPost } from '../blogPagination';

type PostCardProps = {
  post: BlogListPost;
  locale: string;
  categoryLabel: string;
  readMoreLabel: string;
};

export default function PostCard({ post, locale, categoryLabel, readMoreLabel }: PostCardProps) {
  const href = post.href || getReviewLocalePath(locale, `/blog/${post.slug}`);

  return (
    <article className="flex min-h-48 min-w-0 flex-col">
      <span className="w-fit rounded-full bg-light-bg px-2 py-1 text-xs text-slate-500">
        {categoryLabel}
      </span>

      <div className="mt-4 h-24 min-w-0">
        <h3 className="h-8 truncate text-xl font-normal text-ink">{post.title}</h3>
        <p className="mt-4 line-clamp-2 h-12 text-base text-gray-500">{post.summary}</p>
      </div>

      <Link
        href={href}
        className="group mt-4 inline-flex h-8 w-fit items-center gap-1 text-xl text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span>{readMoreLabel}</span>
        <ArrowRight
          className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
