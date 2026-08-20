import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const markdownRemarkPlugins = [remarkGfm];
export const markdownRehypePlugins = [rehypeRaw, rehypeSlug];

export const MARKDOWN_PROSE_CLASSES = [
  'prose',
  'prose-slate',
  'dark:prose-invert',
  'max-w-none',
  'prose-headings:font-display',
  'prose-headings:font-semibold',
  'prose-headings:tracking-tight',
  'prose-headings:scroll-mt-28',
  'prose-headings:mt-6',
  'prose-headings:mb-3',
  'prose-headings:text-[#1f2329]',
  'dark:prose-headings:text-[#f1f3f5]',
  'prose-p:my-2',
  'prose-p:leading-[1.75]',
  'prose-p:text-[#2b2f36]',
  'dark:prose-p:text-[#dfe1e5]',
  'prose-li:my-0',
  'prose-li:leading-[1.75]',
  'prose-li:text-[#2b2f36]',
  'dark:prose-li:text-[#dfe1e5]',
  'prose-ul:my-2',
  'prose-ul:pl-6',
  'prose-ol:my-2',
  'prose-ol:pl-6',
  'prose-a:text-brand-600',
  'hover:prose-a:text-brand-500',
  'prose-img:rounded-2xl',
  'prose-strong:text-[#1f2329]',
  'dark:prose-strong:text-[#f1f3f5]',
  'prose-video:max-w-3xl',
  'prose-video:mx-auto',
  'prose-video:rounded-xl',
  'prose-iframe:max-w-3xl',
  'prose-iframe:mx-auto',
  'prose-iframe:rounded-xl',
  'prose-hr:border-[#dee0e3]',
  'dark:prose-hr:border-[#373c43]',
  'text-[#2b2f36]',
  'dark:text-[#dfe1e5]'
].join(' ');

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function splitMarkdownByFencedCode(markdown: string) {
  return markdown.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g);
}

function isWrappedByStandaloneLine(source: string, start: number, end: number) {
  const before = source.slice(0, start);
  const after = source.slice(end);
  const previousLine = before.slice(before.lastIndexOf('\n') + 1);
  const nextLineBreakIndex = after.indexOf('\n');
  const nextLine = nextLineBreakIndex === -1 ? after : after.slice(0, nextLineBreakIndex);

  return previousLine.trim() === '' && nextLine.trim() === '';
}

function transformMathOutsideCode(markdown: string) {
  return splitMarkdownByFencedCode(markdown)
    .map((segment, index) => {
      if (index % 2 === 1) {
        return segment;
      }

      const displayReplaced = segment.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula, offset) => {
        const start = Number(offset);
        const end = start + match.length;
        const escapedFormula = escapeHtmlAttribute(String(formula).trim());

        return isWrappedByStandaloneLine(segment, start, end)
          ? `\n<math-block data-formula="${escapedFormula}"></math-block>\n`
          : `<math-inline data-formula="${escapedFormula}" data-display="true"></math-inline>`;
      });

      return displayReplaced.replace(
        /(^|[^\\$])\$([^\n$][\s\S]*?[^\n$])\$/g,
        (_match, prefix, formula) =>
          `${prefix}<math-inline data-formula="${escapeHtmlAttribute(
            String(formula).trim()
          )}"></math-inline>`
      );
    })
    .join('');
}

export function prepareMarkdownContent(markdown: string) {
  if (!markdown.trim()) {
    return markdown;
  }

  return transformMathOutsideCode(markdown);
}
