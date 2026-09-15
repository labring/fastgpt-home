import HighlightPost from '@/components/blog/components/HighlightPost';
import type { BlogListPost } from '@/components/blog/blogPagination';

type HighlightsSectionProps = {
  posts: BlogListPost[];
  locale: string;
  categoryLabels: Record<string, string>;
};

export default function HighlightsSection({
  posts,
  locale,
  categoryLabels
}: HighlightsSectionProps) {
  const [featured, ...secondary] = posts;

  if (!featured) return null;

  return (
    <section className="container grid gap-8 px-4 pb-16 pt-20 sm:px-8 md:pt-32 lg:grid-cols-7">
      <div className="lg:col-span-4">
        <HighlightPost
          post={featured}
          locale={locale}
          categoryLabel={categoryLabels[featured.category] || featured.category}
          large
        />
      </div>
      {secondary.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
          {secondary.map((post) => (
            <HighlightPost
              key={`${post.locale}/${post.slug}`}
              post={post}
              locale={locale}
              categoryLabel={categoryLabels[post.category] || post.category}
            />
          ))}
        </div>
      )}
    </section>
  );
}
