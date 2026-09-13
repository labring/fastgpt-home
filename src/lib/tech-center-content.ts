import 'server-only';

import fs from 'node:fs';
import stageReturns from '@/content/tech-center/stage-returns.json';
import path from 'node:path';
import {
  TECH_ENTRIES,
  getTechEntriesForLocale,
  getTechnicalPageIdentity,
  type TechEntry
} from '@/components/tech-center/data';
import { techPublishedLocaleCodes, type TechPublishedLocale } from '@/lib/publishedLocales';
import { currentSiteVariant, getLocaleOwner, type SiteVariant } from '@/lib/siteRouting';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content/tech-center');

export type TechArticle = TechEntry & {
  contentType: 'Article' | 'TechArticle';
  dateModified?: string;
  datePublished?: string;
  image?: {
    alt: string;
    height: number;
    path: string;
    width: number;
  };
  keywords: string[];
  metaTitle: string;
  pageType: string;
  markdown: string;
  stageReturn?: { path: string; title: string };
  publishedLocales: TechPublishedLocale[];
  seoDescription: string;
};

export type TechArticleParams = {
  lang: TechPublishedLocale;
  section: string;
  slug: string;
};

function parseFrontMatter(markdown: string) {
  const normalized = markdown.replace(/\r\n?/g, '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error('Tech article is missing front matter');
  }

  const end = normalized.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error('Tech article has an unterminated front matter block');
  }

  const values: Record<string, string> = {};
  for (const line of normalized.slice(4, end).split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  return {
    metadata: values,
    body: normalized.slice(end + 4).trim()
  };
}

function getEntryPath(entry: Pick<TechEntry, 'slug'>) {
  const identity = getTechnicalPageIdentity(entry);
  const segments = identity.canonicalPath.split('/');
  if (
    !techPublishedLocaleCodes.includes(identity.locale as TechPublishedLocale) ||
    segments.length !== 3 ||
    !segments[1] ||
    !segments[2]
  ) {
    throw new Error(`Unsupported tech article slug: ${entry.slug}`);
  }

  const localizedPath = path.join(CONTENT_ROOT, identity.locale, segments[1], `${segments[2]}.md`);
  if (fs.existsSync(localizedPath)) return localizedPath;
  if (identity.locale === 'zh') return path.join(CONTENT_ROOT, segments[1], `${segments[2]}.md`);
  return localizedPath;
}

const DESCRIPTION_LIMIT = 155;

function stripMarkdown(text: string) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/([:：;；])\s*\d+[.)、．]\s+(?=\S)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateDescription(text: string) {
  if (text.length <= DESCRIPTION_LIMIT) return text;

  const slice = text.slice(0, DESCRIPTION_LIMIT);
  let sentenceEnd = -1;
  // Inspect the full text so a cut inside a version or decimal is never a sentence end.
  for (const match of text.matchAll(/[。！？]|[.!?](?=\s|$)/g)) {
    if (match.index >= DESCRIPTION_LIMIT) break;
    sentenceEnd = match.index;
  }

  if (sentenceEnd >= 48) return slice.slice(0, sentenceEnd + 1).trim();
  return `${slice.slice(0, DESCRIPTION_LIMIT - 1).trim()}…`;
}

/** Build a complete, concise description from the published summary or article body. */
export function getTechArticleDescription(
  entry: Pick<TechEntry, 'title' | 'summary' | 'categoryLabel'>,
  markdown: string
) {
  const existing = stripMarkdown(entry.summary || '');
  if (existing && !existing.endsWith('…') && !existing.endsWith('...')) {
    return truncateDescription(existing);
  }

  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const prose: string[] = [];
  let codeFence = '';

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const fence = line.match(/^(`{3,}|~{3,})/);
    if (fence) {
      if (!codeFence) codeFence = fence[1];
      else if (fence[1][0] === codeFence[0] && fence[1].length >= codeFence.length) codeFence = '';
      continue;
    }
    if (codeFence || !line || /^>\s*(来源|source)[:：]/i.test(line)) continue;

    const heading = line.match(/^#{1,6}\s+(.+?)\s*#*$/);
    if (heading) {
      const headingText = stripMarkdown(heading[1]);
      if (headingText && headingText !== entry.title && headingText.length > 18) {
        prose.push(headingText);
      }
      continue;
    }

    if (/^>\s?/.test(line) || /^\|/.test(line) || /^[-*_]{3,}$/.test(line)) continue;
    prose.push(
      stripMarkdown(
        line.replace(
          /^(?:[-*+]\s+|\d+[.)、．](?!\d)\s*|[（(][\d一二三四五六七八九十百]+[）)]\s*|[一二三四五六七八九十百]+[、.]\s*)/,
          ''
        )
      )
    );
  }

  const derived = truncateDescription(prose.filter(Boolean).join(' '));
  return (
    derived ||
    `${entry.title}，提供 FastGPT ${entry.categoryLabel} 的操作步骤、参数说明与排查信息。`
  );
}

function readTechArticle(entry: TechEntry): TechArticle {
  const filePath = getEntryPath(entry);
  const source = fs.readFileSync(filePath, 'utf8');
  const { metadata, body } = parseFrontMatter(source);

  if (metadata.slug !== entry.slug) {
    throw new Error(`Tech article slug mismatch: ${filePath}`);
  }

  return {
    ...entry,
    publishedLocales: getTechArticlePublishedLocales(entry),
    stageReturn: getStageReturn(entry),
    contentType: metadata.schema_type === 'Article' ? 'Article' : 'TechArticle',
    dateModified: metadata.date_modified,
    datePublished: metadata.date_published,
    image: metadata.image
      ? {
          alt: metadata.image_alt || entry.title,
          height: Number(metadata.image_height) || 630,
          path: metadata.image,
          width: Number(metadata.image_width) || 1200
        }
      : undefined,
    keywords: metadata.keywords
      ? metadata.keywords
          .split(',')
          .map((keyword) => keyword.trim())
          .filter(Boolean)
      : [],
    metaTitle:
      metadata.meta_title ||
      `${entry.title}${
        getTechnicalPageIdentity(entry).locale === 'en'
          ? ' | FastGPT Technical Center'
          : '｜FastGPT 技术中心'
      }`,
    pageType: metadata.page_type || entry.categoryLabel,
    markdown: body,
    seoDescription: metadata.meta_description || getTechArticleDescription(entry, body)
  };
}

const entriesBySlug = new Map(TECH_ENTRIES.map((entry) => [entry.slug, entry]));
const returnPaths: Record<string, string> = stageReturns;

function getStageReturn(entry: TechEntry) {
  const target = returnPaths[entry.slug];
  if (!target) return undefined;
  const stage = entriesBySlug.get(target);
  if (!stage) throw new Error(`Unresolved article stage: ${entry.slug} -> ${target}`);
  return { path: getTechnicalPageIdentity(stage).canonicalPath, title: stage.title };
}

export function getTechArticlePublishedLocales(entry: TechEntry) {
  const { canonicalPath } = getTechnicalPageIdentity(entry);
  return techPublishedLocaleCodes.filter((locale) =>
    entriesBySlug.has(`/${locale}${canonicalPath}`)
  );
}

export function getTechEntry(section: string, slug: string, locale: TechPublishedLocale = 'zh') {
  return entriesBySlug.get(`/${locale}/${section}/${slug}`);
}

export function getTechArticle(section: string, slug: string, locale: TechPublishedLocale = 'zh') {
  const entry = getTechEntry(section, slug, locale);
  return entry ? readTechArticle(entry) : null;
}

export function getTechArticleLastModified(article: TechEntry) {
  const fileModified = fs.statSync(getEntryPath(article)).mtime;
  if (article.sourceType !== '深度场景内容') return fileModified;

  const dateModified = readTechArticle(article).dateModified;
  return dateModified ? new Date(`${dateModified}T00:00:00Z`) : fileModified;
}

export function getTechCenterLastModified(locale?: TechPublishedLocale) {
  const entries = locale ? getTechEntriesForLocale(locale) : TECH_ENTRIES;
  if (!entries.length) return undefined;
  return new Date(Math.max(...entries.map((entry) => getTechArticleLastModified(entry).getTime())));
}

export function getRelatedTechArticles(article: TechEntry, limit = 3) {
  const related = getTechEntriesForLocale(article.slug.split('/')[1]).filter(
    (entry) => entry.category === article.category
  );
  const currentIndex = related.findIndex((entry) => entry.slug === article.slug);
  if (currentIndex === -1) return related.slice(0, limit);

  const candidates = related.filter((entry) => entry.slug !== article.slug);
  if (!candidates.length) return [];
  const startIndex = currentIndex % candidates.length;
  return Array.from({ length: Math.min(limit, candidates.length) }, (_, index) => {
    return candidates[(startIndex + index) % candidates.length];
  });
}

export function getTechArticleParams(): TechArticleParams[] {
  return TECH_ENTRIES.map((entry) => {
    const identity = getTechnicalPageIdentity(entry);
    const [, section, slug] = identity.canonicalPath.split('/');
    if (
      !techPublishedLocaleCodes.includes(identity.locale as TechPublishedLocale) ||
      !section ||
      !slug
    ) {
      throw new Error(`Invalid tech article slug: ${entry.slug}`);
    }
    return { lang: identity.locale as TechPublishedLocale, section, slug };
  });
}

export function getTechArticleReviewParams(
  variant: SiteVariant = currentSiteVariant
): TechArticleParams[] {
  const params = getTechArticleParams();
  if (variant === 'preview') return params;
  const ownerParams = params.filter((param) => getLocaleOwner(param.lang) === variant);
  return ownerParams.length ? ownerParams : params.slice(0, 1);
}

export function getTechArticleOwnerParams(
  section: string,
  variant: SiteVariant = currentSiteVariant
) {
  const params = getTechArticleParams().filter((param) => param.section === section);
  if (variant === 'preview') return params.slice(0, 1).map(({ slug }) => ({ slug }));
  const ownerParams = params.filter((param) => getLocaleOwner(param.lang) === variant);
  // Static export requires one seed param when this variant owns no route in the section.
  const slugs = (ownerParams.length ? ownerParams : params.slice(0, 1)).map((param) => param.slug);
  return [...new Set(slugs)].map((slug) => ({ slug }));
}
