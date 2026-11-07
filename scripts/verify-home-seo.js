#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const hero = fs.readFileSync(path.join(root, 'src/components/home/Hero.tsx'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'src/components/home/Footer.tsx'), 'utf8');
const cases = fs.readFileSync(path.join(root, 'src/components/home/CaseStudies.tsx'), 'utf8');

assert.equal((hero.match(/<h1\b/g) || []).length, 1, 'home must render exactly one H1');

for (const locale of ['zh', 'en']) {
  const dictionary = JSON.parse(
    fs.readFileSync(path.join(root, `src/locales/${locale}.json`), 'utf8')
  );
  const title = dictionary.Home.hero.title;
  assert.match(title, locale === 'zh' ? /知识库/ : /Knowledge Base/i, `${locale} H1 topic`);
  assert.match(title, /RAG/i, `${locale} H1 RAG topic`);
}

for (const href of [
  "href: '/price'",
  "href: getReviewLocalePath(guideLocale, '/industry')",
  "href: '/wiki'",
  "href: '/troubleshoot'"
]) {
  assert(footer.includes(href), `footer is missing ${href}`);
}
for (const href of [
  "getPublicationUrls('https://doc.fastgpt.io/docs/introduction')",
  "href: normalizedLocale === 'zh' ? '/videos' : 'https://video.fastgpt.cn/videos'",
  "href: normalizedLocale === 'zh' ? '/customers' : 'https://fastgpt.cn/customers'",
  "getDefaultLocalePath(faqLocale, '/faq')"
]) {
  assert(footer.includes(href), `footer is missing ${href}`);
}

for (const [key, href] of [
  ['cetc', '/customers/finance-insurance-wealth-management/securities-ai-platform-fastgpt'],
  ['cms', '/customers/manufacturing-production-processing/isap-it-ops-robot-solution'],
  ['snow', '/customers/e-commerce-retail-trade/retail-ai-dispatch-platform'],
  [
    'zhaozhao',
    '/customers/education-training-research-study/ai-intelligent-customer-service'
  ]
]) {
  assert(cases.includes(`${key}: '${href}'`), `case ${key} is missing its detail link`);
}

console.log('Home SEO and discovery link verification passed');
