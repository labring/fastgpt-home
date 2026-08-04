#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const UAT_DIR = path.join(ROOT, 'artifacts/phase5/uat');
const OUT_DIR = path.join(ROOT, 'out');
const OUTPUT = path.join(UAT_DIR, 'browser-evidence.json');

const screenshotSpecs = [
  { id: 'comparison-desktop', file: 'compare-desktop.png', width: 1440, height: 900, route: '/zh/compare/dify-vs-fastgpt' },
  { id: 'comparison-mobile', file: 'compare-mobile-harness.png', width: 390, height: 844, route: '/zh/compare/dify-vs-fastgpt' },
  { id: 'faq-desktop', file: 'faq-desktop.png', width: 1440, height: 900, route: '/en/faq/Can-AI-intelligent-customer-service' }
];

const layoutSpecs = [
  { id: 'comparison-mobile', file: 'compare-mobile-layout.json', requires: ['page', 'inner', 'hero', 'h1', 'figure', 'image'] },
  { id: 'comparison-desktop', file: 'compare-desktop-layout.json', requires: ['page', 'inner', 'hero', 'h1', 'figure', 'image'] },
  { id: 'faq-desktop', file: 'faq-desktop-layout.json', requires: ['h1', 'main'] }
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(UAT_DIR, file), 'utf8'));
}

function readHtml(file) {
  return fs.readFileSync(path.join(OUT_DIR, file), 'utf8');
}

async function main() {
  const screenshots = [];
  for (const spec of screenshotSpecs) {
    const file = path.join(UAT_DIR, spec.file);
    assert.equal(fs.existsSync(file), true, `missing screenshot: ${spec.file}`);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.width, spec.width, `${spec.file} width mismatch`);
    assert.equal(metadata.height, spec.height, `${spec.file} height mismatch`);
    screenshots.push({ ...spec, path: path.relative(ROOT, file), width: metadata.width, height: metadata.height });
  }

  const layouts = {};
  for (const spec of layoutSpecs) {
    const layout = readJson(spec.file);
    assert.equal(layout.route, screenshotSpecs.find((item) => item.id === spec.id).route, `${spec.file} route mismatch`);
    assert.equal(layout.document.scrollWidth <= layout.viewport.width, true, `${spec.file} document overflows viewport`);
    assert.equal(layout.document.bodyScrollWidth <= layout.viewport.width, true, `${spec.file} body overflows viewport`);
    for (const key of spec.requires) assert.ok(layout.elements?.[key] || layout[key], `${spec.file} missing ${key} bounds`);
    const elements = layout.elements || layout;
    for (const key of spec.requires) {
      const bounds = elements[key];
      if (!bounds) continue;
      assert.equal(bounds.left >= 0, true, `${spec.file} ${key} starts outside viewport`);
      assert.equal(bounds.right <= layout.viewport.width, true, `${spec.file} ${key} exceeds viewport`);
    }
    layouts[spec.id] = layout;
  }

  const comparisonHtml = readHtml('zh/compare/dify-vs-fastgpt.html');
  const faqHtml = readHtml('en/faq/Can-AI-intelligent-customer-service.html');
  assert.match(comparisonHtml, /Dify 与 FastGPT 怎么选/);
  assert.match(comparisonHtml, /预览页面/);
  assert.match(comparisonHtml, /application\/ld\+json/);
  assert.match(faqHtml, /Can AI intelligent customer service platforms really reduce labor costs\?/);
  assert.match(faqHtml, /faq-social-preview\.png/);

  const report = {
    schemaVersion: 'W2-2026-08-04-browser-v1',
    passed: true,
    capturedWith: 'browser-harness CDP against local static out server',
    screenshots,
    layouts,
    staticDom: {
      comparisonRoute: '/zh/compare/dify-vs-fastgpt',
      faqRoute: '/en/faq/Can-AI-intelligent-customer-service',
      comparisonContent: 'present',
      comparisonPreviewState: 'present',
      comparisonJsonLd: 'present',
      faqTitle: 'present',
      faqSocialImage: 'present'
    }
  };
  fs.mkdirSync(UAT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ passed: report.passed, screenshots: screenshots.length, layouts: Object.keys(layouts).length }));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
