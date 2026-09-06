const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const entry = {
  title: 'Description example',
  slug: '/zh/troubleshoot/description-example',
  summary: 'Truncated import…',
  categoryLabel: 'Troubleshooting'
};
const source = fs.readFileSync(path.join(__dirname, '../src/lib/tech-center-content.ts'), 'utf8');
const context = {
  exports: {},
  process,
  require(name) {
    if (name === 'node:fs') {
      return {
        existsSync: () => true,
        readFileSync: () =>
          `---\nslug: ${entry.slug}\nmeta_description: Approved explicit description.\n---\nFallback body.`
      };
    }
    if (name.startsWith('node:')) return require(name);
    if (name.endsWith('/data')) {
      return {
        TECH_ENTRIES: [entry],
        getTechnicalPageIdentity: () => ({
          locale: 'zh',
          canonicalPath: '/troubleshoot/description-example'
        })
      };
    }
    return { techPublishedLocaleCodes: ['zh', 'en'] };
  }
};
vm.runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText,
  context
);
const { getTechArticleDescription, getTechArticle } = context.exports;

test('descriptions remove Chinese and English list markers and skip code and quotations', () => {
  for (const marker of ['1. ', '2) ', '3、', '4．', '五、', '（六）', '(7)', '8.']) {
    const body = `# ${entry.title}\n> Quoted material.\n\n\`\`\`js\nIgnored code.\n\`\`\`\n~~~\nIgnored code.\n~~~\n${marker}Check the model version.\n- Verify the response.`;
    assert.equal(
      getTechArticleDescription(entry, body),
      'Check the model version. Verify the response.'
    );
  }
});

test('sentence boundaries preserve versions and decimals in both languages', () => {
  const inlineList =
    '检查部署状态并确认配置文件、环境变量与当前发布的应用保持一致，随后核对模型服务与代理地址：1. 验证连接。；2. ' +
    '继续核对'.repeat(50);
  assert.equal(
    getTechArticleDescription(entry, inlineList),
    '检查部署状态并确认配置文件、环境变量与当前发布的应用保持一致，随后核对模型服务与代理地址：验证连接。'
  );
  const zh =
    '确认服务使用 v4.8.12，并将相似度阈值设为 0.75，记录模型名称及调用日志后，继续检查请求路径与参数。';
  const en =
    'Inspect the request and verify the model configuration for v4.8.12 at a threshold of 0.75.';
  for (const sentence of [zh, en]) {
    assert.equal(
      getTechArticleDescription(entry, `${sentence}\n1. ${'Continue checking '.repeat(20)}`),
      sentence
    );
  }
  assert.equal(
    getTechArticleDescription(entry, '4.8.12 is supported.\n0.75 is the threshold.'),
    '4.8.12 is supported. 0.75 is the threshold.'
  );
  const clippedVersion = `${'x'.repeat(151)} v4.8.12 ${'tail '.repeat(10)}`;
  const clippedDecimal = `${'x'.repeat(151)} 0.75 ${'tail '.repeat(10)}`;
  for (const body of [clippedVersion, clippedDecimal]) {
    const description = getTechArticleDescription(entry, body);
    assert.equal(description.length, 155);
    assert.ok(description.endsWith('…'));
  }
});

test('published summaries and explicit descriptions retain precedence', () => {
  assert.equal(
    getTechArticleDescription({ ...entry, summary: 'Published summary.' }, 'Other text.'),
    'Published summary.'
  );
  assert.equal(
    getTechArticle('troubleshoot', 'description-example').seoDescription,
    'Approved explicit description.'
  );
});
