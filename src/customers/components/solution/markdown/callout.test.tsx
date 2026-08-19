import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { markdownComponents } from '../MarkdownComponents';

function renderMarkdown(markdown: string) {
  return renderToStaticMarkup(
    React.createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeRaw],
        components: markdownComponents
      },
      markdown
    )
  );
}

describe('高亮块（callout）标题渲染', () => {
  it('标题行中的 <mark> 保持黄色高亮，且不吞掉换行后的正文', () => {
    const html = renderMarkdown(
      '> [!blue] 覆盖<mark>70%</mark>用户检索需求，客服咨询量下降<mark>60%</mark>。\n> 第二行补充正文。'
    );

    expect(html).toMatch(/<mark[^>]*class="[^"]*bg-yellow-100[^"]*"/);
    expect(html).toMatch(/<mark[^>]*class="[^"]*text-inherit[^"]*"/);
    expect(html).toMatch(/<mark[^>]*class="(?!.*text-slate-900)[^"]*"/);
    expect(html).toContain('>70%<');
    expect(html).toContain('>60%<');
    expect(html).toContain('第二行补充正文');
    expect(html).toContain('用户检索需求');
  });

  it('纯文本标题行与后续正文正常渲染', () => {
    const html = renderMarkdown('> [!red] 核心痛点一句话\n> 补充说明。');

    expect(html).toContain('核心痛点一句话');
    expect(html).toContain('补充说明');
    expect(html).not.toContain('[!red]');
  });

  it('标题与正文为独立段落时（中间空行），标题与正文都保留', () => {
    const html = renderMarkdown('> [!green] 落地价值一句话\n>\n> 独立段落正文。');

    expect(html).toContain('落地价值一句话');
    expect(html).toContain('独立段落正文');
    expect(html).not.toContain('[!green]');
  });

  it('正文 **加粗** 渲染为 font-bold 的 strong 标签', () => {
    const html = renderMarkdown('正文里的 **重点内容** 需要突出显示。');

    expect(html).toContain('<strong class="font-bold">重点内容</strong>');
  });

  it('黄色高亮与加粗可以叠加使用（mark 内嵌 strong）', () => {
    const html = renderMarkdown('覆盖<mark>**70%**</mark>用户检索需求');

    expect(html).toMatch(/<mark[^>]*bg-yellow-100[^>]*><strong class="font-bold">70%<\/strong><\/mark>/);
  });

  it('加粗包裹黄色高亮（strong 内嵌 mark）不会被 markdown 解析，星号保持字面量', () => {
    const html = renderMarkdown('覆盖**<mark>70%</mark>**用户检索需求');

    expect(html).toContain('**<mark');
    expect(html).toContain('</mark>**');
    expect(html).not.toContain('<strong class="font-bold"><mark');
  });
});
