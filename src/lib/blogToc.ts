import GithubSlugger from 'github-slugger';

export type BlogTocItem = {
  id: string;
  title: string;
  depth: number;
};

function stripMarkdown(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\\([\\`*_[\]{}()#+.!<>~-])/g, '$1')
    .replace(/[\*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function collectBlogTocFromMarkdown(markdown: string): BlogTocItem[] {
  const slugger = new GithubSlugger();
  const items: BlogTocItem[] = [];
  let fence: '`' | '~' | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1][0] as '`' | '~';
      fence = fence === null ? marker : fence === marker ? null : fence;
      continue;
    }
    if (fence !== null) continue;

    const headingMatch = /^ {0,3}(#{2,4})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!headingMatch) continue;

    const title = stripMarkdown(headingMatch[2]);
    if (!title) continue;

    items.push({
      id: slugger.slug(title),
      title,
      depth: headingMatch[1].length
    });
  }

  return items;
}
