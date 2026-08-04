#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import ts from 'typescript';
import { readInputs } from './validate_w2_faq.mjs';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const SEO_FILE = path.join(REPO_ROOT, 'src/lib/seo.ts');
const DETAIL_FILE = path.join(REPO_ROOT, 'src/app/[lang]/faq/[id]/page.tsx');
const SITEMAP_FILE = path.join(REPO_ROOT, 'src/app/sitemap.ts');

function loadSeoModule() {
  const source = fs.readFileSync(SEO_FILE, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: SEO_FILE,
  }).outputText;
  const seoModule = new Module(SEO_FILE);
  seoModule.filename = SEO_FILE;
  seoModule.paths = Module._nodeModulePaths(path.dirname(SEO_FILE));
  const originalRequire = seoModule.require.bind(seoModule);
  seoModule.require = (request) => {
    if (request === '@/lib/locales') {
      return { localeMap: { en: 'en_US', zh: 'zh_CN' }, supportedLocaleCodes: ['en', 'zh'] };
    }
    return originalRequire(request);
  };
  seoModule._compile(compiled, SEO_FILE);
  return seoModule.exports;
}

const { runtime: w2, english } = readInputs();
assert.equal(Object.keys(english).length, 1400);
assert.equal(Object.keys(w2).length, 60);
assert.equal(Object.keys(w2).every((slug) => !(slug in english)), true);
assert.equal(Object.keys(english).length + Object.keys(w2).length, 1460);

const detailSource = fs.readFileSync(DETAIL_FILE, 'utf8');
const sitemapSource = fs.readFileSync(SITEMAP_FILE, 'utf8');
assert.match(detailSource, /getFaqIds\(lang\)/);
assert.match(detailSource, /getFaqAlternates/);
assert.match(sitemapSource, /getFaqIds\(locale\)/);
assert.match(sitemapSource, /getFaqCanonicalUrl/);

const seo = loadSeoModule();
delete process.env.NEXT_PUBLIC_HOME_URL;
delete process.env.NEXT_PUBLIC_IO_HOME_URL;
delete process.env.NEXT_PUBLIC_CN_HOME_URL;

assert.equal(
  seo.getFaqCanonicalUrl('zh', '/faq/private-deployment-data-boundary'),
  'https://fastgpt.cn/zh/faq/private-deployment-data-boundary',
);
assert.equal(
  seo.getFaqCanonicalUrl('en', '/faq/Can-AI-intelligent-customer-service'),
  'https://fastgpt.io/en/faq/Can-AI-intelligent-customer-service',
);

const translated = seo.getFaqAlternates('zh', '/faq/Can-AI-intelligent-customer-service', true);
assert.equal(translated.canonical, 'https://fastgpt.cn/zh/faq/Can-AI-intelligent-customer-service');
assert.equal(translated.languages.zh, translated.canonical);
assert.equal(translated.languages['zh-CN'], translated.canonical);
assert.equal(translated.languages.en, 'https://fastgpt.io/en/faq/Can-AI-intelligent-customer-service');
assert.equal(translated.languages['x-default'], translated.languages.en);

const chineseOnly = seo.getFaqAlternates('zh', '/faq/private-deployment-data-boundary', false);
assert.equal(chineseOnly.canonical, 'https://fastgpt.cn/zh/faq/private-deployment-data-boundary');
assert.equal('en' in chineseOnly.languages, false);
assert.equal(chineseOnly.languages['x-default'], chineseOnly.canonical);

process.env.NEXT_PUBLIC_IO_HOME_URL = 'https://preview.example.io';
process.env.NEXT_PUBLIC_CN_HOME_URL = 'https://preview.example.cn';
assert.equal(
  seo.getFaqCanonicalUrl('zh', '/faq/foo'),
  'https://preview.example.cn/zh/faq/foo',
);
assert.equal(
  seo.getFaqCanonicalUrl('en', '/faq/foo'),
  'https://preview.example.io/en/faq/foo',
);

console.log('FAQ route and dual-domain SEO tests passed');
