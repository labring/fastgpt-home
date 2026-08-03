import limits from './faqMetadata.constants.json';

export const TITLE_MAX_LENGTH = limits.TITLE_MAX_LENGTH;
export const DESCRIPTION_MAX_LENGTH = limits.DESCRIPTION_MAX_LENGTH;

const FAQ_BRAND_SUFFIX = ' - FastGPT';
const FAQ_BRAND_SUFFIX_PATTERN = /\s*(?:[-|｜]\s*)?FastGPT\s*$/i;
const SENTENCE_BOUNDARIES = new Set(['.', '!', '?', '。', '！', '？', ';', '；']);

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function truncateAtBoundary(value: string, maxLength: number) {
  const characters = Array.from(value);
  if (characters.length <= maxLength) return value;

  const marker = '...';
  const contentLength = Math.max(1, maxLength - marker.length);
  const prefix = characters.slice(0, contentLength);
  let sentenceBoundary = -1;

  for (let index = 0; index < prefix.length; index += 1) {
    if (SENTENCE_BOUNDARIES.has(prefix[index])) sentenceBoundary = index;
  }

  const whitespaceBoundary = prefix.lastIndexOf(' ');
  const minimumBoundary = Math.floor(contentLength * 0.6);
  const boundary =
    sentenceBoundary >= minimumBoundary
      ? sentenceBoundary + 1
      : whitespaceBoundary >= minimumBoundary
        ? whitespaceBoundary
        : contentLength;

  return `${prefix.slice(0, boundary).join('').trimEnd()}${marker}`;
}

function normalizeTitle(title: string) {
  const titleBase = normalizeWhitespace(title).replace(FAQ_BRAND_SUFFIX_PATTERN, '').trim();
  if (!titleBase) return 'FastGPT';

  const titleBudget = TITLE_MAX_LENGTH - FAQ_BRAND_SUFFIX.length;
  const boundedTitle = truncateAtBoundary(titleBase, titleBudget);

  return `${boundedTitle}${FAQ_BRAND_SUFFIX}`;
}

type FaqMetadataInput =
  | { title: string; description: string }
  | { Title: string; Description: string };

export function normalizeFaqMetadata(input: FaqMetadataInput) {
  const title = 'title' in input ? input.title : input.Title;
  const description = 'description' in input ? input.description : input.Description;

  return {
    title: normalizeTitle(title),
    description: truncateAtBoundary(
      normalizeWhitespace(description),
      DESCRIPTION_MAX_LENGTH
    )
  };
}
