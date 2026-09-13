import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const markdownRemarkPlugins = [remarkGfm];
export const markdownRehypePlugins = [rehypeRaw, rehypeSlug];

export const MARKDOWN_PROSE_CLASSES = [
  'prose',
  'prose-slate',
  '',
  'max-w-none',
  'prose-headings:font-display',
  'prose-headings:font-semibold',
  'prose-headings:tracking-tight',
  'prose-headings:scroll-mt-28',
  'prose-headings:mt-6',
  'prose-headings:mb-3',
  'prose-headings:text-[#1f2329]',
  '',
  'prose-p:my-2',
  'prose-p:leading-[1.75]',
  'prose-p:text-[#2b2f36]',
  '',
  'prose-li:my-0',
  'prose-li:leading-[1.75]',
  'prose-li:text-[#2b2f36]',
  '',
  'prose-ul:my-2',
  'prose-ul:pl-6',
  'prose-ol:my-2',
  'prose-ol:pl-6',
  'prose-a:text-brand-600',
  'hover:prose-a:text-brand-500',
  'prose-img:rounded-2xl',
  'prose-strong:text-[#1f2329]',
  '',
  'prose-video:max-w-3xl',
  'prose-video:mx-auto',
  'prose-video:rounded-xl',
  'prose-iframe:max-w-3xl',
  'prose-iframe:mx-auto',
  'prose-iframe:rounded-xl',
  'prose-hr:border-[#dee0e3]',
  '',
  'text-[#2b2f36]',
  ''
].join(' ');
