import { MDXContent } from '@content-collections/mdx/react';

import type { BlogPost } from '@/content/blog';

import BlogArticleCta from '../components/BlogArticleCta';

type ArticleContentSectionProps = {
  post: BlogPost;
  locale: string;
  cta: {
    title: string;
    description: string;
    consultLabel: string;
    trialLabel: string;
  };
};

export default function ArticleContentSection({ post, locale, cta }: ArticleContentSectionProps) {
  return (
    <section className="contents">
      <div
        className="hidden lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:block"
        aria-hidden="true"
      />
      <article className="container px-0 prose prose-headings:scroll-mt-48 col-span-full mx-auto min-w-0 max-w-5xl text-base text-ink-sub md:text-lg lg:col-span-8 lg:col-start-3 lg:row-start-2">
        <MDXContent code={post.mdx} />
      </article>
      <aside
        className="hidden self-start lg:sticky lg:top-24 lg:col-span-2 lg:col-start-11 lg:row-span-2 lg:row-start-2 lg:block"
        data-pagefind-ignore
      >
        <BlogArticleCta
          locale={locale}
          title={cta.title}
          description={cta.description}
          consultLabel={cta.consultLabel}
          trialLabel={cta.trialLabel}
          category={post.category}
          slug={post.slug}
        />
      </aside>
    </section>
  );
}
