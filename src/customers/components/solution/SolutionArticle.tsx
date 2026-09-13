import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '@customers/components/solution/MarkdownComponents';
import {
  MARKDOWN_PROSE_CLASSES,
  markdownRehypePlugins,
  markdownRemarkPlugins
} from '@customers/components/solution/markdownConfig';

export default function SolutionArticle({ content }: { content: string }) {
  return (
    <div className={`${MARKDOWN_PROSE_CLASSES} text-[15px] sm:text-base`}>
      <ReactMarkdown
        remarkPlugins={markdownRemarkPlugins}
        rehypePlugins={markdownRehypePlugins}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
