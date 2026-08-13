import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { TECH_ENTRIES, type TechEntry } from '@/components/tech-center/data';

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
  seoDescription: string;
};

export type TechArticleParams = {
  lang: 'zh';
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
  const segments = entry.slug.split('/');
  if (segments.length !== 4 || segments[1] !== 'zh') {
    throw new Error(`Unsupported tech article slug: ${entry.slug}`);
  }

  return path.join(CONTENT_ROOT, segments[2], `${segments[3]}.md`);
}

const DESCRIPTION_LIMIT = 155;

function stripMarkdown(text: string) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateDescription(text: string) {
  if (text.length <= DESCRIPTION_LIMIT) return text;

  const slice = text.slice(0, DESCRIPTION_LIMIT);
  const sentenceEnd = Math.max(
    slice.lastIndexOf('。'),
    slice.lastIndexOf('！'),
    slice.lastIndexOf('？'),
    slice.lastIndexOf('. '),
    slice.lastIndexOf('! '),
    slice.lastIndexOf('? ')
  );

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
  let inCode = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode || !line || /^>\s*(来源|source)[:：]/i.test(line)) continue;

    const heading = line.match(/^#{1,6}\s+(.+?)\s*#*$/);
    if (heading) {
      const headingText = stripMarkdown(heading[1]);
      if (headingText && headingText !== entry.title && headingText.length > 18) {
        prose.push(headingText);
      }
      continue;
    }

    if (/^>\s?/.test(line) || /^\|/.test(line) || /^[-*_]{3,}$/.test(line)) continue;
    prose.push(stripMarkdown(line.replace(/^[-*]\s+/, '')));
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
    metaTitle: metadata.meta_title || `${entry.title}｜FastGPT 技术中心`,
    pageType: metadata.page_type || entry.categoryLabel,
    markdown: body,
    seoDescription: metadata.meta_description || getTechArticleDescription(entry, body)
  };
}

export function getTechArticle(section: string, slug: string) {
  const entry = TECH_ENTRIES.find((item) => item.slug === `/zh/${section}/${slug}`);
  return entry ? readTechArticle(entry) : null;
}

export function getTechArticleLastModified(article: TechEntry) {
  const fileModified = fs.statSync(getEntryPath(article)).mtime;
  if (article.sourceType !== '深度场景内容') return fileModified;

  const dateModified = readTechArticle(article).dateModified;
  return dateModified ? new Date(`${dateModified}T00:00:00Z`) : fileModified;
}

export function getTechCenterLastModified() {
  return new Date(
    Math.max(...TECH_ENTRIES.map((entry) => getTechArticleLastModified(entry).getTime()))
  );
}

export function getRelatedTechArticles(article: TechEntry, limit = 3) {
  const related = TECH_ENTRIES.filter((entry) => entry.category === article.category);
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
    const [, lang, section, slug] = entry.slug.split('/');
    if (lang !== 'zh' || !section || !slug) {
      throw new Error(`Invalid tech article slug: ${entry.slug}`);
    }
    return { lang, section, slug };
  });
}
