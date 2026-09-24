import { readFile } from 'fs/promises';
import { join } from 'path';
import type { ReactElement } from 'react';
import satori from 'satori';
import sharp from 'sharp';

import { getBlogCopy } from '@/components/blog/blogCopy';
import {
  FEATURED_DEFAULT_THUMBNAIL,
  getDefaultBlogThumbnail
} from '@/components/blog/blogThumbnails';
import { getBlog, getBlogBuildParams, type BlogPost } from '@/content/blog';

export const BLOG_THUMBNAIL_CACHE_CONTROL = 'public, max-age=86400';

export const DEFAULT_WIDTH = 800;
export const DEFAULT_HEIGHT = 600;
export const MIN_DIM = 64;
export const MAX_DIM = 4000;
export const MAX_DPR = 3;

// <width>x<height>[@dpr][.option[...(.options)]].(png|svg)
const FORMAT_REGEX = /^(\d{2,5})x(\d{2,5})(?:@(\d(?:\.\d+)?)x)?((?:\.[a-z0-9-]+)*)\.(png|svg)$/i;

export const SUPPORTED_THUMBNAIL_OPTIONS = ['notitle', 'featured'] as const;
export type BlogThumbnailOption = (typeof SUPPORTED_THUMBNAIL_OPTIONS)[number];

export type BlogThumbnailFormat = {
  type: 'png' | 'svg';
  width: number;
  height: number;
  dpr: number;
  options: BlogThumbnailOption[];
};

export const PREGENERATED_THUMBNAIL_FORMATS: BlogThumbnailFormat[] = [
  { type: 'png', width: 1200, height: 630, dpr: 3, options: [] },
  { type: 'svg', width: 800, height: 600, dpr: 1, options: ['notitle'] },
  { type: 'svg', width: 800, height: 600, dpr: 1, options: ['notitle', 'featured'] }
];

export type BlogThumbnailRenderInput = {
  locale: string;
  post: BlogPost;
  parsed: BlogThumbnailFormat;
};

function clampDimension(value: number, fallback: number) {
  return Number.isFinite(value) ? Math.min(Math.max(value, MIN_DIM), MAX_DIM) : fallback;
}

export function formatBlogThumbnailSegment(format: BlogThumbnailFormat) {
  const dprSuffix = format.dpr !== 1 ? `@${format.dpr}x` : '';
  const optionSuffix = format.options.map((option) => `.${option}`).join('');
  return `${format.width}x${format.height}${dprSuffix}${optionSuffix}.${format.type}`;
}

export function parseBlogThumbnailFormat(segment: string): BlogThumbnailFormat | null {
  const match = FORMAT_REGEX.exec(segment);
  if (!match) return null;

  const [, widthGroup, heightGroup, dprGroup, optionGroup, typeGroup] = match;
  const options = optionGroup
    ? (optionGroup.split('.').filter(Boolean) as BlogThumbnailOption[])
    : [];
  if (options.some((option) => !SUPPORTED_THUMBNAIL_OPTIONS.includes(option))) return null;

  const width = clampDimension(Number(widthGroup), DEFAULT_WIDTH);
  const height = clampDimension(Number(heightGroup), DEFAULT_HEIGHT);
  const dprRaw = dprGroup ? Number(dprGroup) : 1;
  const dpr = Number.isFinite(dprRaw) ? Math.min(Math.max(dprRaw, 1), MAX_DPR) : 1;

  return {
    type: (typeGroup.toLowerCase() === 'svg' ? 'svg' : 'png') as 'png' | 'svg',
    width,
    height,
    dpr,
    options
  };
}

export function getBlogThumbnailStaticParams() {
  return getBlogBuildParams(true).flatMap(({ lang, slug }) =>
    PREGENERATED_THUMBNAIL_FORMATS.map((format) => ({
      locale: lang,
      slug,
      format: formatBlogThumbnailSegment(format)
    }))
  );
}

export function resolveBlogThumbnailPost(locale: string, slug: string): BlogPost | undefined {
  return getBlog(locale, slug);
}

const RENDER_FONT_PATH = 'fonts/NotoSansSC-Regular.ttf';
const RENDER_FONT_FAMILY = 'Noto Sans SC';

let fontCache: ArrayBuffer | null = null;

async function getRenderFonts() {
  if (fontCache) {
    return [
      { name: RENDER_FONT_FAMILY, data: fontCache, weight: 400 as const, style: 'normal' as const }
    ];
  }
  const buffer = await readFile(join(process.cwd(), RENDER_FONT_PATH));
  fontCache = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  return [
    { name: RENDER_FONT_FAMILY, data: fontCache, weight: 400 as const, style: 'normal' as const }
  ];
}

type TemplateProps = {
  title: string;
  category: string;
  baseWidth: number;
  baseHeight: number;
};

// Designed against the light blog background artworks: ink title, primary accent meta.
function BlogThumbnailTemplate({
  title,
  // unused for now.
  category: _category,
  baseWidth,
  baseHeight
}: TemplateProps) {
  const pad = Math.round(baseHeight * 0.04);
  const titleSize = Math.max(12, Math.round(baseHeight * 0.12));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: baseWidth,
        height: baseHeight,
        fontFamily: RENDER_FONT_FAMILY,
        fontWeight: 400
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          // width: '95%',
          bottom: '0',
          padding: pad
        }}
      >
        <span style={{ color: '#020617', fontSize: titleSize, lineHeight: 1.28 }}>{title}</span>
      </div>
    </div>
  );
}

function renderThumbnailElement({
  title,
  category,
  parsed
}: {
  title: string;
  category: string;
  parsed: BlogThumbnailFormat;
}): ReactElement {
  const baseWidth = Math.max(Math.round(parsed.width / parsed.dpr), MIN_DIM);
  const baseHeight = Math.max(Math.round(parsed.height / parsed.dpr), MIN_DIM);

  return (
    <div
      style={{
        display: 'flex',
        width: baseWidth,
        height: baseHeight,
        transform: `scale(${parsed.dpr})`,
        transformOrigin: 'top left'
      }}
    >
      <BlogThumbnailTemplate
        title={title}
        category={category}
        baseWidth={baseWidth}
        baseHeight={baseHeight}
      />
    </div>
  );
}

function getCategoryLabel(locale: string, post: BlogPost) {
  return getBlogCopy(locale).allPosts.categoryLabels[post.category] ?? post.category;
}

function getBackgroundPath(post: BlogPost, parsed: BlogThumbnailFormat) {
  return parsed.options.includes('featured')
    ? FEATURED_DEFAULT_THUMBNAIL
    : getDefaultBlogThumbnail(post.category);
}

const backgroundContentCache = new Map<string, string>();

// Inline the artwork so generated SVGs stay self-contained for any consumer.
async function getBackgroundMarkup(post: BlogPost, parsed: BlogThumbnailFormat) {
  const backgroundPath = getBackgroundPath(post, parsed);
  let inner = backgroundContentCache.get(backgroundPath);
  if (inner === undefined) {
    const file = await readFile(join(process.cwd(), 'public', backgroundPath), 'utf8');
    const matched = /^<svg[^>]*>([\s\S]*)<\/svg>\s*$/.exec(file);
    if (!matched) throw new Error(`Invalid blog background SVG: ${backgroundPath}`);
    inner = matched[1];
    backgroundContentCache.set(backgroundPath, inner);
  }

  return `<svg viewBox="0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}" width="${parsed.width}" height="${parsed.height}" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
}

export async function renderBlogThumbnailSvg(input: BlogThumbnailRenderInput): Promise<string> {
  const { locale, post, parsed } = input;
  const hasTitle = !parsed.options.includes('notitle');

  const overlay = hasTitle
    ? await satori(
        renderThumbnailElement({
          title: post.title,
          category: getCategoryLabel(locale, post),
          parsed
        }),
        { width: parsed.width, height: parsed.height, fonts: await getRenderFonts() }
      )
    : '';

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${parsed.width}" height="${parsed.height}" viewBox="0 0 ${parsed.width} ${parsed.height}">`,
    await getBackgroundMarkup(post, parsed),
    overlay,
    '</svg>'
  ].join('');
}

export async function renderBlogThumbnailPng(input: BlogThumbnailRenderInput): Promise<Buffer> {
  const { locale, post, parsed } = input;
  const backgroundFile = await readFile(
    join(process.cwd(), 'public', getBackgroundPath(post, parsed))
  );

  // Rasterize the 800x600 vector background at cover resolution for the target box.
  const scale = Math.max(parsed.width / DEFAULT_WIDTH, parsed.height / DEFAULT_HEIGHT);
  const background = await sharp(backgroundFile, { density: Math.round(96 * scale) })
    .resize(parsed.width, parsed.height, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();

  if (parsed.options.includes('notitle')) {
    return background;
  }

  const overlaySvg = await satori(
    renderThumbnailElement({
      title: post.title,
      category: getCategoryLabel(locale, post),
      parsed
    }),
    { width: parsed.width, height: parsed.height, fonts: await getRenderFonts() }
  );
  const overlay = await sharp(Buffer.from(overlaySvg)).png().toBuffer();

  return sharp(background)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toBuffer();
}
