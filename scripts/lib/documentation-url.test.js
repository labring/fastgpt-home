const assert = require('node:assert/strict');
const test = require('node:test');
const {
  findLegacyDocumentationUrls,
  normalizeDocumentationUrl,
  normalizeDocumentationUrlsInText
} = require('./documentation-url');

test('normalizeDocumentationUrl normalizes all four prefixed owner/locale combinations', () => {
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
});

test('normalizeDocumentationUrl resolves bare /zh-CN and /en roots to getting-started', () => {
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.cn/zh-CN'),
    'https://doc.fastgpt.cn/guide/getting-started'
  );
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.cn/zh-CN/'),
    'https://doc.fastgpt.cn/guide/getting-started'
  );
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.io/en'),
    'https://doc.fastgpt.io/guide/getting-started'
  );
  assert.equal(
    normalizeDocumentationUrl('https://doc.fastgpt.io/en/'),
    'https://doc.fastgpt.io/guide/getting-started'
  );
});

test('normalizeDocumentationUrl leaves canonical and unrelated URLs unchanged', () => {
  for (const unchanged of [
    'https://doc.fastgpt.cn/guide/getting-started',
    'https://doc.fastgpt.io/guide/getting-started',
    'https://fastgpt.cn/zh/faq',
    'https://fastgpt.io/en/guide',
    'https://github.com/labring/FastGPT',
    'not-a-url'
  ]) {
    assert.equal(normalizeDocumentationUrl(unchanged), unchanged);
  }
});

test('normalizeDocumentationUrlsInText handles markdown links, citations, front matter, and punctuation', () => {
  const input = [
    '---',
    'source: https://doc.fastgpt.cn/zh-CN/self-host/config/env',
    '---',
    '',
    '参考 https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2。',
    '- [Variables](https://doc.fastgpt.cn/en/guide/build/workflow/variables?a=1#b)',
    '> 来源：[FastGPT 官方文档](https://doc.fastgpt.io/zh-CN/guide/dataset)',
    'Already clean: https://doc.fastgpt.cn/guide/getting-started'
  ].join('\n');

  const expected = [
    '---',
    'source: https://doc.fastgpt.cn/self-host/config/env',
    '---',
    '',
    '参考 https://doc.fastgpt.cn/self-host/custom-models/chatglm2。',
    '- [Variables](https://doc.fastgpt.io/guide/build/workflow/variables?a=1#b)',
    '> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset)',
    'Already clean: https://doc.fastgpt.cn/guide/getting-started'
  ].join('\n');

  assert.equal(normalizeDocumentationUrlsInText(input), expected);
  assert.deepEqual(findLegacyDocumentationUrls(input), [
    'https://doc.fastgpt.cn/zh-CN/self-host/config/env',
    'https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2',
    'https://doc.fastgpt.cn/en/guide/build/workflow/variables?a=1#b',
    'https://doc.fastgpt.io/zh-CN/guide/dataset'
  ]);
  assert.deepEqual(findLegacyDocumentationUrls(expected), []);
});
