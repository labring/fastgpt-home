export interface TocItem {
  id: string;
  text: string;
  indent: string;
  size: string;
}

export type SupportedHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export const TOC_HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';
export const TOC_SCROLL_OFFSET_TOP = 140;

const MAX_TOC_HEADING_LEVEL = 6;
const TOC_HEADING_PATTERN = new RegExp(`^(#{1,${MAX_TOC_HEADING_LEVEL}})\\s+(.+?)\\s*#*\\s*$`);
const TOC_HEADING_STYLES: Record<SupportedHeadingLevel, Pick<TocItem, 'indent' | 'size'>> = {
  1: {
    indent: 'pl-3',
    size: 'text-base font-semibold'
  },
  2: {
    indent: 'pl-7',
    size: 'text-[15px] font-medium'
  },
  3: {
    indent: 'pl-11',
    size: 'text-sm'
  },
  4: {
    indent: 'pl-14',
    size: 'text-sm'
  },
  5: {
    indent: 'pl-16',
    size: 'text-[13px] font-normal'
  },
  6: {
    indent: 'pl-[4.5rem]',
    size: 'text-xs font-normal'
  }
};

export function getTocItemStyle(level: number): Pick<TocItem, 'indent' | 'size'> | null {
  if (!Number.isInteger(level) || level < 1 || level > MAX_TOC_HEADING_LEVEL) {
    return null;
  }

  return TOC_HEADING_STYLES[level as SupportedHeadingLevel];
}

export function extractRenderedTocItems(container: ParentNode): TocItem[] {
  const items = Array.from(container.querySelectorAll<HTMLElement>(TOC_HEADING_SELECTOR))
    .map((heading) => {
      const level = Number.parseInt(heading.tagName.slice(1), 10);
      const style = getTocItemStyle(level);
      const text = heading.textContent?.trim();

      if (!style || !heading.id || !text) {
        return null;
      }

      return {
        id: heading.id,
        text,
        indent: style.indent,
        size: style.size
      };
    })
    .filter((item): item is TocItem => item !== null);

  return normalizeTocIndents(items);
}

export function getActiveRenderedTocId(
  container: ParentNode,
  offsetTop = TOC_SCROLL_OFFSET_TOP
): string {
  let currentId = '';

  for (const heading of Array.from(container.querySelectorAll<HTMLElement>(TOC_HEADING_SELECTOR))) {
    if (heading.getBoundingClientRect().top <= offsetTop) {
      currentId = heading.id;
    }
  }

  return currentId;
}

/**
 * 根据实际出现的最小标题层级，将所有条目的缩进左移。
 * 例如：文档没有 h1 时，h2 占据 h1 的缩进位，h3 占据 h2，以此类推。
 */
const LEVEL_TO_INDENT: Record<number, string> = {
  1: 'pl-3',
  2: 'pl-7',
  3: 'pl-11',
  4: 'pl-14',
  5: 'pl-16',
  6: 'pl-[4.5rem]'
};

const INDENT_TO_LEVEL: Record<string, number> = {
  'pl-3': 1,
  'pl-7': 2,
  'pl-11': 3,
  'pl-14': 4,
  'pl-16': 5,
  'pl-[4.5rem]': 6
};

function normalizeTocIndents(items: TocItem[]): TocItem[] {
  if (items.length === 0) return items;

  let minLevel = Infinity;
  for (const item of items) {
    const level = INDENT_TO_LEVEL[item.indent];
    if (level && level < minLevel) {
      minLevel = level;
    }
  }

  if (minLevel <= 1 || !Number.isFinite(minLevel)) return items;

  return items.map((item) => {
    const level = INDENT_TO_LEVEL[item.indent];
    if (!level) return item;
    return { ...item, indent: LEVEL_TO_INDENT[level - minLevel + 1] };
  });
}

export function buildMarkdownTocItems(markdownContent: string): TocItem[] {
  if (!markdownContent) return [];

  const lines = markdownContent.split('\n');
  const items: TocItem[] = [];
  const idCounts: Record<string, number> = {};
  let isInsideFence = false;

  const slugger = (text: string) => {
    const baseId = text
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\u4e00-\u9fa5\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (Object.prototype.hasOwnProperty.call(idCounts, baseId)) {
      idCounts[baseId] += 1;
      return `${baseId}-${idCounts[baseId] - 1}`;
    }

    idCounts[baseId] = 1;
    return baseId;
  };

  lines.forEach((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      isInsideFence = !isInsideFence;
      return;
    }

    if (isInsideFence) {
      return;
    }

    const headingMatch = line.match(TOC_HEADING_PATTERN);
    if (!headingMatch) {
      return;
    }

    const level = headingMatch[1].length as SupportedHeadingLevel;
    const text = headingMatch[2].replace(/\*/g, '').trim();
    const style = getTocItemStyle(level);

    if (!style || !text) {
      return;
    }

    items.push({
      id: slugger(text),
      text,
      indent: style.indent,
      size: style.size
    });
  });

  return normalizeTocIndents(items);
}
