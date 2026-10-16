import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import type { BlogPost } from '@/content/blog';
import type { BlogListPost } from '@/components/blog/blogPagination';
import { getHostLocalePath } from '@/lib/siteRouting';

import BlogArticleCta from '../components/BlogArticleCta';
import BlogArticleToc from '../components/BlogArticleToc';
import ArticleContentSection from './ArticleContentSection';
import ArticleHeaderSection from './ArticleHeaderSection';
import RelatedPostsSection from './RelatedPostsSection';

type ArticleLayoutSectionProps = {
  post: BlogPost;
  locale: string;
  backLabel: string;
  categoryLabel: string;
  onThisPage: string;
  formatDate: (date: Date) => string;
  relatedPosts: BlogListPost[];
  relatedTitle: string;
  relatedReadMoreLabel: string;
  relatedCategoryLabels: Record<string, string>;
  cta: {
    title: string;
    description: string;
    consultLabel: string;
    trialLabel: string;
  };
};

export default function ArticleLayoutSection({
  post,
  locale,
  backLabel,
  categoryLabel,
  onThisPage,
  formatDate,
  relatedPosts,
  relatedTitle,
  relatedReadMoreLabel,
  relatedCategoryLabels,
  cta
}: ArticleLayoutSectionProps) {
  return (
    <section className="relative z-10 bg-white pb-20 md:pb-32 lg:pb-48 pt-20 lg:pt-0">
      <div className="relative z-10 container grid max-w-screen-2xl grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-y-16">
        <Link
          href={getHostLocalePath(locale, '/blog')}
          className="col-span-full inline-flex items-center gap-1 self-start text-lg text-primary no-underline transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:pt-32 md:text-xl"
        >
          <ArrowLeft className="size-6" strokeWidth={1.5} aria-hidden="true" />
          <span>{backLabel}</span>
        </Link>

        <div className="contents" data-pagefind-body>
          <ArticleHeaderSection
            post={post}
            locale={locale}
            categoryLabel={categoryLabel}
            formatDate={formatDate}
          />
          <ArticleContentSection post={post} />
        </div>
        <BlogArticleToc
          items={post.toc}
          label={onThisPage}
          footer={
            <BlogArticleCta
              locale={locale}
              title={cta.title}
              description={cta.description}
              consultLabel={cta.consultLabel}
              trialLabel={cta.trialLabel}
              category={post.category}
              slug={post.slug}
            />
          }
        />
        <RelatedPostsSection
          posts={relatedPosts}
          locale={locale}
          title={relatedTitle}
          readMoreLabel={relatedReadMoreLabel}
          categoryLabels={relatedCategoryLabels}
        />
      </div>
    </section>
  );
}
