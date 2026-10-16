import { MDXContent } from '@content-collections/mdx/react';

import type { BlogPost } from '@/content/blog';

type ArticleContentSectionProps = {
  post: BlogPost;
};

export default function ArticleContentSection({ post }: ArticleContentSectionProps) {
  return (
    <section className="contents">
      <article
        id="blog-article-content"
        className="relative container px-0 prose prose-headings:scroll-mt-48 col-span-full mx-auto min-w-0 max-w-5xl text-base text-ink-sub md:text-lg lg:col-span-8 lg:col-start-3 lg:row-start-2"
      >
        <MDXContent code={post.mdx} />
      </article>
    </section>
  );
}
