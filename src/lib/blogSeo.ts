import type { Metadata } from 'next';
import { BLOG_OG_THUMBNAIL_SEGMENT, getBlogThumbnailUrl } from '@/components/blog/blogThumbnails';
import { getBlog, resolveBlogLocale } from '@/content/blog';
import { supportedLocaleCodes } from '@/lib/locales';
import { getLocaleHreflang, getOwnedLocaleUrl } from '@/lib/siteRouting';

export function getBlogCanonicalUrl(locale: string, slug: string) {
  return getOwnedLocaleUrl(locale, `/blog/${slug}`);
}

export function getBlogAlternates(locale: string, slug: string): Metadata['alternates'] {
  const { contentLocale } = resolveBlogLocale(locale);
  const availableLocales = supportedLocaleCodes.filter(
    (candidate) =>
      resolveBlogLocale(candidate).contentLocale === contentLocale && getBlog(candidate, slug)
  );
  const languages = Object.fromEntries(
    availableLocales.map((candidate) => [
      getLocaleHreflang(candidate),
      getBlogCanonicalUrl(candidate, slug)
    ])
  );

  return {
    canonical: getBlogCanonicalUrl(locale, slug),
    languages: {
      ...languages,
      'x-default': getBlogCanonicalUrl(contentLocale, slug)
    }
  };
}

function getImageUrl(locale: string, slug: string, thumbnail?: string) {
  if (thumbnail) {
    return /^https?:\/\//i.test(thumbnail) ? thumbnail : getOwnedLocaleUrl(locale, thumbnail);
  }
  return getBlogThumbnailUrl(locale, slug, BLOG_OG_THUMBNAIL_SEGMENT);
}

export function getBlogMetadata(locale: string, slug: string): Metadata {
  const blog = getBlog(locale, slug);
  if (!blog) return { title: 'Blog post not found', robots: { index: false, follow: false } };

  const canonical = getBlogCanonicalUrl(locale, slug);
  const image = getImageUrl(locale, slug, blog.thumbnail);
  const dateModified = blog.dateModified || blog.date;

  return {
    title: blog.title,
    description: blog.summary,
    ...(blog.authorRecord ? { authors: [{ name: blog.authorRecord.name }] } : {}),
    alternates: getBlogAlternates(locale, slug),
    openGraph: {
      title: blog.title,
      description: blog.summary,
      type: 'article',
      url: canonical,
      publishedTime: blog.date.toISOString(),
      modifiedTime: dateModified.toISOString(),
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.summary,
      images: [image]
    }
  };
}
