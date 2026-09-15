import type { BlogListPost } from '../blogPagination';
import PostCard from './PostCard';

type PostsGridProps = {
  posts: BlogListPost[];
  locale: string;
  categoryLabels: Record<string, string>;
  readMoreLabel: string;
  emptyLabel: string;
};

export default function PostsGrid({
  posts,
  locale,
  categoryLabels,
  readMoreLabel,
  emptyLabel
}: PostsGridProps) {
  if (!posts.length) {
    return <p className="py-12 text-center text-base leading-6 text-slate-500">{emptyLabel}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
      {posts.map((post) => (
        <PostCard
          key={`${post.locale}/${post.slug}`}
          post={post}
          locale={locale}
          categoryLabel={categoryLabels[post.category] || post.category}
          readMoreLabel={readMoreLabel}
        />
      ))}
    </div>
  );
}
