import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticleRoute from '@/components/blog/BlogArticleRoute';
import { getBlog, getBlogDefaultLocale, getBlogSlugs, type BlogLocale } from '@/content/blog';
import { getBlogMetadata } from '@/lib/blogSeo';

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = getBlogDefaultLocale();
  if (!getBlog(locale, slug)) notFound();
  return <BlogArticleRoute locale={locale as BlogLocale} slug={slug} />;
}

export function generateStaticParams() {
  const locale = getBlogDefaultLocale();
  return getBlogSlugs(locale).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getBlogMetadata(getBlogDefaultLocale(), slug);
}
