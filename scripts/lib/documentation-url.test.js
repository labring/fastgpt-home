const assert = require('node:assert/strict');
const test = require('node:test');
const {
  findLegacyDocumentationUrls,
  normalizeDocumentationUrl,
  normalizeDocumentationUrlsInText
} = require('./documentation-url');

test('normalizeDocumentationUrl normalizes all four owner/locale prefix combinations', () => {
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/content_extract'),
    'https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract'
  );
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.io/zh-CN/self-host/config/env?tab=docker#proxy'),
    'https://doc.fastgpt.cn/self-host/config/env?tab=docker#proxy'
  );
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.cn/en/guide/build/workflow/nodes/content_extract'),
    'https://doc.fastgpt.io/guide/build/workflow/nodes/content_extract'
  );
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.io/en/self-host/config/env#top'),
    'https://doc.fastgpt.io/self-host/config/env#top'
  );
  assert.equal(normalizeDocumentationUrl('https://doc.fastgpt.cn/zh-CN/'), 'https://doc.fastgpt.cn/');
  assert.equal(normalizeDocumentationUrl('https://doc.fastgpt.io/en/'), 'https://doc.fastgpt.io/');
});

test('normalizeDocumentationUrlsInText preserves trailing Chinese prose and ellipsis without encoding', () => {
  const input = [
    'source: https://doc.fastgpt.cn/zh-CN/self-host/config/env',
    '该小节的官方访问路径为https://doc.fastgpt.cn/zh-CN/guide/version/commercial，位于文档目录的版本分类分支下。',
    '总结截断为https://doc.fastgpt.cn/zh-CN/guide/version/commer…',
    'Non-matches: https://doc.fastgpt.cn/enterprise https://doc.fastgpt.io/env https://doc.fastgpt.cn/zh-CN-legacy'
  ].join('\n');

  const expected = [
    'source: https://doc.fastgpt.cn/self-host/config/env',
    '该小节的官方访问路径为https://doc.fastgpt.cn/guide/version/commercial，位于文档目录的版本分类分支下。',
    '总结截断为https://doc.fastgpt.cn/guide/version/commer…',
    'Non-matches: https://doc.fastgpt.cn/enterprise https://doc.fastgpt.io/env https://doc.fastgpt.cn/zh-CN-legacy'
  ].join('\n');

  assert.equal(normalizeDocumentationUrlsInText(input), expected);
  assert.equal(findLegacyDocumentationUrls(input).length, 3);
  assert.deepEqual(findLegacyDocumentationUrls(expected), []);
});
