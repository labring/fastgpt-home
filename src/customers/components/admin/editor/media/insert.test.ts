import { describe, expect, it } from 'vitest';
import { insertMarkdownBlockAtSelection, insertTextAtSelection } from './insert';

describe('editor media insertion helpers', () => {
  it('inserts text at the current textarea selection', () => {
    expect(insertTextAtSelection('hello world', 'FastGPT', 6, 11)).toEqual({
      content: 'hello FastGPT',
      cursor: 13
    });
  });

  it('inserts markdown blocks with needed line breaks', () => {
    expect(insertMarkdownBlockAtSelection('标题\n结尾', '![图](/a.png)', 2, 2)).toEqual({
      content: '标题\n![图](/a.png)\n结尾',
      cursor: 15
    });

    expect(insertMarkdownBlockAtSelection('', '内容', 0, 0)).toEqual({
      content: '内容',
      cursor: 2
    });
  });
});
