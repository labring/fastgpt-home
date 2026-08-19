import { describe, expect, it, vi } from 'vitest';
import {
  buildUploadPlaceholder,
  decorateHtmlWithClipboardUploads,
  getMediaFileStem,
  isFeishuRemoteMediaSource,
  mightContainFeishuRemoteMedia,
  parseFrontmatter
} from './clipboard';

describe('editor media clipboard helpers', () => {
  it('parses supported frontmatter and returns body content', () => {
    expect(parseFrontmatter('---\nname: 客服助手\ndescription: 自动回复\n---\n正文')).toEqual({
      name: '客服助手',
      description: '自动回复',
      body: '\n正文'
    });
    expect(parseFrontmatter('plain text')).toBeNull();
  });

  it('builds stable upload placeholders when given an id', () => {
    expect(buildUploadPlaceholder('image', 'abc')).toBe('![正在上传图片... abc]()');
    expect(buildUploadPlaceholder('video', 'abc')).toBe('> [正在上传视频... abc]');
    expect(buildUploadPlaceholder('file', 'abc')).toBe('[正在上传文件... abc]()');
  });

  it('detects Feishu remote media domains', () => {
    expect(mightContainFeishuRemoteMedia('<img src="https://foo.feishu.cn/a.png">')).toBe(true);
    expect(isFeishuRemoteMediaSource('https://assets.larksuitecdn.com/a.png')).toBe(true);
    expect(isFeishuRemoteMediaSource('https://example.com/a.png')).toBe(false);
  });

  it('decorates unresolved pasted media with upload placeholders', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.123456);

    const imageFile = new File(['image'], 'paste.png', { type: 'image/png' });
    const result = decorateHtmlWithClipboardUploads(
      '<p><img alt="示意图"></p><p><img src="https://example.com/keep.png"></p>',
      [imageFile]
    );

    expect(result.uploadTasks).toHaveLength(1);
    expect(result.uploadTasks[0]).toMatchObject({
      file: imageFile,
      contentKind: 'image',
      contentLabel: '示意图'
    });
    expect(result.html).toContain('data-markdown-placeholder');
    expect(result.html).toContain('https://example.com/keep.png');
  });

  it('normalizes media file stems from labels', () => {
    expect(getMediaFileStem('image', ' POC 报告 图 1 ', 0)).toBe('POC-1');
    expect(getMediaFileStem('video', '', 2)).toBe('feishu-video-3');
  });
});
