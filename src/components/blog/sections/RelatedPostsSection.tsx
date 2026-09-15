import { getBlogPostKey, type BlogListPost } from '@/components/blog/blogPagination';

import PostCard from '../components/PostCard';

type RelatedPostsSectionProps = {
  posts: BlogListPost[];
  locale: string;
  title: string;
  readMoreLabel: string;
  categoryLabels: Record<string, string>;
};

export default function RelatedPostsSection({
  posts,
  locale,
  title,
  readMoreLabel,
  categoryLabels
}: RelatedPostsSectionProps) {
  if (posts.length !== 2) return null;

  return (
    <section className="col-span-full pt-20 md:pt-32 lg:col-span-8 lg:col-start-3 lg:row-start-3 lg:pt-48">
      <h2 className="m-0 text-center text-4xl font-medium text-ink md:text-5xl">{title}</h2>
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 md:mt-16 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={getBlogPostKey(post)}
            post={post}
            locale={locale}
            categoryLabel={categoryLabels[post.category] || post.category}
            readMoreLabel={readMoreLabel}
          />
        ))}
      </div>
    </section>
  );
}
