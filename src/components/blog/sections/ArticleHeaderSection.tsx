import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import type { BlogPost } from '@/content/blog';
import { getReviewLocalePath } from '@/lib/siteRouting';
import GradientBlobs from '@/components/home/GradientBlobs';

import { getDefaultBlogThumbnail } from '../blogThumbnails';

type ArticleHeaderSectionProps = {
  post: BlogPost;
  locale: string;
  backLabel: string;
  categoryLabel: string;
  formatDate: (date: Date) => string;
};

export default function ArticleHeaderSection({
  post,
  locale,
  backLabel,
  categoryLabel,
  formatDate
}: ArticleHeaderSectionProps) {
  const thumbnail = post.thumbnail || getDefaultBlogThumbnail(post.category);

  return (
    <section className="relative col-span-full bg-white lg:row-start-1">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96" aria-hidden="true">
        <div className="relative size-full">
          <GradientBlobs large />
        </div>
      </div>

      <div className="relative pb-0 pt-24 md:pt-28 lg:pt-32">
        <Link
          href={getReviewLocalePath(locale, '/blog')}
          className="inline-flex items-center gap-1 text-lg text-primary no-underline transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 md:text-xl"
        >
          <ArrowLeft className="size-6" strokeWidth={1.5} aria-hidden="true" />
          <span>{backLabel}</span>
        </Link>

        <header className="mt-12 flex flex-col items-center gap-10 md:mt-16 md:gap-16">
          <div className="flex w-full flex-col items-center gap-6">
            <span className="relative rounded-full bg-white/40 px-3 py-1.5 text-xs text-ink-sub ring-1 ring-gray-200 shadow-sm">
              {categoryLabel}
            </span>
            <span
              className="hidden"
              aria-hidden="true"
              data-pagefind-filter="category"
              data-pagefind-meta="category"
            >
              {post.category}
            </span>
            <span
              className="hidden"
              aria-hidden="true"
              data-pagefind-filter="locale"
              data-pagefind-meta="locale"
            >
              {locale}
            </span>
            <span className="hidden" aria-hidden="true" data-pagefind-meta="slug">
              {post.slug}
            </span>
            <span className="hidden" aria-hidden="true" data-pagefind-meta="summary">
              {post.summary}
            </span>
            <h1 className="m-0 max-w-6xl text-center text-4xl font-medium text-ink md:text-5xl text-balance">
              {post.title}
            </h1>
            <div className="flex flex-col items-center gap-2 text-base text-ink-sub">
              {post.authorRecord ? (
                <div className="flex max-md:flex-col-reverse flex-wrap items-center justify-center gap-2 md:flex-nowrap">
                  <div className="flex items-center gap-2 text-ink">
                    <Image
                      src={post.authorRecord.avatar}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover ring-1 ring-gray-200"
                    />
                    <span>{post.authorRecord.name}</span>
                  </div>
                  <span className="text-gray-300 max-md:hidden" aria-hidden="true">
                    •
                  </span>
                  <time dateTime={post.date.toISOString()} data-pagefind-meta="date[datetime]">
                    {formatDate(post.date)}
                  </time>
                </div>
              ) : (
                <time dateTime={post.date.toISOString()} data-pagefind-meta="date[datetime]">
                  {formatDate(post.date)}
                </time>
              )}
              {post.authorRecord?.description && (
                <p className="m-0 text-center text-xs text-ink-muted">
                  {post.authorRecord.description}
                </p>
              )}
            </div>
          </div>

          <div className="relative h-[30rem] w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/10 md:aspect-video md:h-auto">
            <Image src={thumbnail} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        </header>
      </div>
    </section>
  );
}
