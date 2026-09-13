const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { verifyImport } = require('./import-week06-guides');

test('Week06 import check detects document and configured-link drift', () => {
  const targetRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'week06-guide-import-'));
  const entry = {
    slug: 'week06-check',
    group: 'implementation',
    zh: {
      configuredInternalLinks: [{ label: 'API 文档', target: '/guide/api' }]
    },
    en: {
      configuredInternalLinks: [{ label: 'API documentation', target: '/guide/api' }]
    }
  };
  const generated = [
    {
      entry,
      documents: { zh: '# 中文\n', en: '# English\n' }
    }
  ];

  try {
    for (const locale of ['zh', 'en']) {
      const directory = path.join(targetRoot, locale);
      fs.mkdirSync(directory, { recursive: true });
      fs.writeFileSync(
        path.join(directory, `week06-check.${locale}.md`),
        generated[0].documents[locale]
      );
    }

    verifyImport(generated, { entries: [structuredClone(entry)] }, targetRoot);

    const drifted = structuredClone(entry);
    drifted.en.configuredInternalLinks[0].target = '/guide/other';
    assert.throws(
      () => verifyImport(generated, { entries: [drifted] }, targetRoot),
      /registry snapshot differs/
    );
  } finally {
    fs.rmSync(targetRoot, { recursive: true, force: true });
  }
});
