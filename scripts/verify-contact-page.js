const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'out');

const titles = {
  en: 'Contact FastGPT Sales',
  zh: 'FastGPT 商务咨询',
  'zh-hant': 'FastGPT 商務諮詢'
};
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

const pages = [
  ['contact.html', titles[defaultLocale] || titles.en],
  ['zh/contact.html', 'FastGPT 商务咨询'],
  ['en/contact.html', 'Contact FastGPT Sales'],
  ['zh-hant/contact.html', 'FastGPT 商務諮詢']
];

for (const [file, title] of pages) {
  const content = fs.readFileSync(path.join(output, file), 'utf8');
  assert.match(content, new RegExp(title), `${file} is missing its localized title`);
  assert.ok(
    content.includes('rgba(59,130,246,0.12)') && content.includes('[background-size:48px_48px]'),
    `${file} is missing the unified contact hero treatment`
  );
  assert.ok(
    !content.includes('rgba(251,208,223'),
    `${file} still contains the legacy purple contact treatment`
  );
}

const homepageLinks = [
  ['zh.html', '/zh/contact'],
  ['en.html', '/en/contact'],
  ['zh-hant.html', '/zh-hant/contact'],
  ['ja.html', '/en/contact']
];

for (const [file, href] of homepageLinks) {
  const content = fs.readFileSync(path.join(output, file), 'utf8');
  assert.ok(content.includes(href), `${file} is missing ${href}`);
}

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [target] : [];
  });
}

for (const file of sourceFiles(path.join(root, 'src'))) {
  const content = fs.readFileSync(file, 'utf8');
  assert.ok(
    !content.includes('fael3z0zfze.feishu.cn/share/base/form'),
    `${path.relative(root, file)} still links to the legacy form`
  );
}

console.log(
  'Contact page verification passed: 4 routes, 4 localized entry paths, 0 legacy form links.'
);
