import { NextResponse } from 'next/server';

import {
  BLOG_THUMBNAIL_CACHE_CONTROL,
  getBlogThumbnailStaticParams,
  parseBlogThumbnailFormat,
  renderBlogThumbnailPng,
  renderBlogThumbnailSvg,
  resolveBlogThumbnailPost
} from '@/lib/blogThumbnailRenderer';

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogThumbnailStaticParams();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string; format: string }> }
) {
  const { locale, slug, format } = await params;
  const parsed = parseBlogThumbnailFormat(decodeURIComponent(format));
  if (!parsed) {
    return NextResponse.json(
      { error: 'Invalid format. Use <width>x<height>[@dpr][.option...].(png|svg).' },
      { status: 400 }
    );
  }

  const post = resolveBlogThumbnailPost(locale, decodeURIComponent(slug));
  if (!post) return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });

  try {
    if (parsed.type === 'svg') {
      const svg = await renderBlogThumbnailSvg({ locale, post, parsed });
      return new NextResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': BLOG_THUMBNAIL_CACHE_CONTROL
        }
      });
    }

    const png = await renderBlogThumbnailPng({ locale, post, parsed });
    return new NextResponse(new Uint8Array(png), {
      headers: { 'Content-Type': 'image/png', 'Cache-Control': BLOG_THUMBNAIL_CACHE_CONTROL }
    });
  } catch (error) {
    console.error('Error generating blog thumbnail:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
