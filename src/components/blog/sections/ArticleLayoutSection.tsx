import type { BlogPost } from '@/content/blog';
import type { BlogListPost } from '@/components/blog/blogPagination';

import ArticleContentSection from './ArticleContentSection';
import ArticleHeaderSection from './ArticleHeaderSection';
import RelatedPostsSection from './RelatedPostsSection';

type ArticleLayoutSectionProps = {
  post: BlogPost;
  locale: string;
  backLabel: string;
  categoryLabel: string;
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
  formatDate,
  relatedPosts,
  relatedTitle,
  relatedReadMoreLabel,
  relatedCategoryLabels,
  cta
}: ArticleLayoutSectionProps) {
  return (
    <section className="bg-white pb-20 md:pb-32 lg:pb-48">
      <div className="container grid max-w-screen-2xl grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-y-16">
        <div className="contents" data-pagefind-body>
          <ArticleHeaderSection
            post={post}
            locale={locale}
            backLabel={backLabel}
            categoryLabel={categoryLabel}
            formatDate={formatDate}
          />
          <ArticleContentSection post={post} locale={locale} cta={cta} />
        </div>
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
