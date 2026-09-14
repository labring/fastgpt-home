import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticleRoute from '@/components/blog/BlogArticleRoute';
import { getBlog, getBlogBuildParams } from '@/content/blog';
import { isSupportedLocale } from '@/lib/locales';
import { getBlogMetadata } from '@/lib/blogSeo';

export default async function LocalizedBlogArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isSupportedLocale(lang)) notFound();
  if (!getBlog(lang, slug)) notFound();
  return <BlogArticleRoute locale={lang} slug={slug} />;
}

export function generateStaticParams() {
  return getBlogBuildParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isSupportedLocale(lang)) return { title: 'Blog post not found' };
  return getBlogMetadata(lang, slug);
}
