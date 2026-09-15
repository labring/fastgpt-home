import 'server-only';

import { MDXContent } from '@content-collections/mdx/react';
import { getBlog, resolveBlogLocale } from '@/content/blog';

export default async function BlogArticleRoute({ locale, slug }: { locale: string; slug: string }) {
  const localeResolution = resolveBlogLocale(locale);
  const post = getBlog(locale, slug);
  if (!post) return null;

  return (
    <main className="min-h-screen bg-white p-6 text-slate-900 sm:p-10">
      <article className="prose prose-slate mx-auto max-w-4xl">
        <p className="text-sm text-slate-500">
          {localeResolution.contentLocale} · {post.title}
        </p>
        <MDXContent code={post.mdx} />
      </article>
    </main>
  );
}
