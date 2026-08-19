import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { normalizeSolutionFolderName } from '@/customers/lib/solution-storage';

interface AdminSolutionListItem {
  categoryId?:
    | {
        color?: string;
        name?: string;
        slug?: string;
      }
    | string
    | null;
  categoryName?: string;
  categorySlug?: string;
}

interface CollectCurrentMediaUrlsOptions {
  content: string;
  imageUrl: string;
  thumbnailUrl?: string;
}

interface DiffMediaUrlsOptions {
  currentUrls: string[];
  previousUrls?: string[];
  newlyUploadedUrls?: string[];
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function cleanMediaUrl(url: string) {
  return url.trim().replace(/`/g, '');
}

export function cleanMediaUrls(urls: string[]) {
  return urls.map(cleanMediaUrl).filter(Boolean);
}

function extractUrlsByRegex(markdown: string, pattern: RegExp) {
  const urls: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(markdown)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
    }
  }

  return urls;
}

export function extractMediaUrlsFromMarkdown(markdown: string): string[] {
  const markdownImageUrls = extractUrlsByRegex(markdown, /!\[.*?\]\((.*?)\)/g);
  const markdownLinkUrls = extractUrlsByRegex(markdown, /\[.*?\]\((.*?)\)/g).filter(
    (url) => !url.startsWith('#') && url.includes('uploads/')
  );
  const htmlMediaUrls = [
    ...extractUrlsByRegex(markdown, /<video\b[^>]*\bsrc\s*=\s*['"]([^'"]*?)['"][^>]*>/gi),
    ...extractUrlsByRegex(markdown, /<img\b[^>]*\bsrc\s*=\s*['"]([^'"]*?)['"][^>]*>/gi),
    ...extractUrlsByRegex(
      markdown,
      /<attachment-file\b[^>]*\bhref\s*=\s*['"]([^'"]*?)['"][^>]*>/gi
    )
  ];

  return [
    ...new Set(cleanMediaUrls([...markdownImageUrls, ...markdownLinkUrls, ...htmlMediaUrls]))
  ];
}

export function collectCurrentMediaUrls({
  content,
  imageUrl,
  thumbnailUrl
}: CollectCurrentMediaUrlsOptions) {
  const urls = extractMediaUrlsFromMarkdown(content);

  if (imageUrl && imageUrl !== '/fastgpt.svg') {
    urls.push(imageUrl);
  }

  if (thumbnailUrl && thumbnailUrl !== '/fastgpt.svg' && thumbnailUrl !== imageUrl) {
    urls.push(thumbnailUrl);
  }

  return [...new Set(cleanMediaUrls(urls))];
}

export function diffRemovedMediaUrls({
  currentUrls,
  previousUrls = [],
  newlyUploadedUrls = []
}: DiffMediaUrlsOptions) {
  const candidateUrls = [
    ...cleanMediaUrls(previousUrls),
    ...cleanMediaUrls(newlyUploadedUrls)
  ];

  return [...new Set(candidateUrls)].filter((url) => !currentUrls.includes(url));
}

export function resolveStorageFolder(input: unknown) {
  return typeof input === 'string' ? normalizeSolutionFolderName(input) : '';
}

export function normalizeAdminSolutionListItems<T extends AdminSolutionListItem>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    categorySlug:
      item.categorySlug ||
      (item.categoryId && typeof item.categoryId === 'object' ? item.categoryId.slug : undefined),
    categoryId:
      item.categoryId && typeof item.categoryId === 'object'
        ? {
            ...item.categoryId,
            color: normalizeHexColor(
              item.categoryId.color,
              getAutoCategoryColor(item.categoryId.name || item.categoryName || '')
            )
          }
        : item.categoryId
  }));
}
