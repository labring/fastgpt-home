#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const UAT_DIR = path.join(ROOT, 'artifacts/phase5/uat');
const OUT_DIR = path.join(ROOT, 'out');
const OUTPUT = path.join(UAT_DIR, 'browser-evidence.json');
const CSS = fs.readFileSync(path.join(ROOT, 'src/styles/globals.css'), 'utf8');

const screenshotSpecs = [
  { id: 'comparison-desktop', file: 'compare-desktop.png', width: 1440, height: 900, route: '/compare/dify-vs-fastgpt' },
  { id: 'comparison-mobile', file: 'compare-mobile-harness.png', width: 390, height: 844, route: '/compare/dify-vs-fastgpt' },
  { id: 'faq-desktop', file: 'faq-desktop.png', width: 1440, height: 900, route: '/en/faq/Can-AI-intelligent-customer-service' }
];

const layoutSpecs = [
  {
    id: 'comparison-mobile',
    file: 'compare-mobile-layout.json',
    requires: ['.comparison-page', '.comparison-page-inner', '.comparison-hero', 'h1', '.comparison-hero-figure', '.comparison-hero-figure img']
  },
  {
    id: 'comparison-desktop',
    file: 'compare-desktop-layout.json',
    requires: ['.comparison-page', '.comparison-page-inner', '.comparison-hero', 'h1', '.comparison-hero-figure', '.comparison-hero-figure img']
  },
  { id: 'faq-desktop', file: 'faq-desktop-layout.json', requires: ['h1', 'main'] }
];

const expectedComputedTheme = {
  background: 'rgb(255, 255, 255)',
  text: 'rgb(2, 6, 23)',
  body: 'rgb(71, 85, 105)',
  navBackground: 'rgba(255, 255, 255, 0.86)',
  tableHeadBackground: 'rgb(241, 245, 249)',
  actionBackground: 'rgb(26, 26, 26)',
  actionText: 'rgb(255, 255, 255)',
  ctaBackground: 'rgb(239, 246, 255)',
  ctaBorder: 'rgb(191, 219, 254)'
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(UAT_DIR, file), 'utf8'));
}

function readHtml(file) {
  return fs.readFileSync(path.join(OUT_DIR, file), 'utf8');
}

async function main() {
  const comparisonThemeStart = CSS.indexOf('.comparison-page-shell {');
  const comparisonThemeEnd = CSS.indexOf('.comparison-page-shell::before {');
  assert.ok(comparisonThemeStart >= 0 && comparisonThemeEnd > comparisonThemeStart, 'comparison theme contract is missing');
  const comparisonTheme = CSS.slice(comparisonThemeStart, comparisonThemeEnd);
  assert.match(comparisonTheme, /--comparison-bg:\s*#ffffff;/);
  assert.match(comparisonTheme, /--comparison-surface:\s*var\(--home-light-bg\);/);
  assert.match(comparisonTheme, /--comparison-text:\s*var\(--home-dark\);/);
  assert.match(comparisonTheme, /--comparison-accent:\s*var\(--home-primary\);/);
  assert.match(comparisonTheme, /--comparison-action:\s*var\(--home-btn-dark\);/);
  assert.doesNotMatch(comparisonTheme, /#0b0f11|#101618|#141b1e/);
  assert.match(CSS, /html:has\(\.comparison-page-shell\)[\s\S]*?color-scheme:\s*light !important;/);
  assert.match(CSS, /body:has\(\.comparison-page-shell\)[\s\S]*?background:\s*#ffffff !important;/);
  assert.match(CSS, /\.comparison-table-head \{ background: #f1f5f9;/);
  assert.match(CSS, /\.comparison-cta \{[\s\S]*?background: #eff6ff;/);
  assert.match(CSS, /\.comparison-button-primary \{[\s\S]*?background: var\(--comparison-action\);/);

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
    if (spec.id.startsWith('comparison-')) {
      const computed = layout.computed;
      assert.ok(computed, `${spec.file} computed color evidence is missing`);
      assert.equal(computed.html.background, expectedComputedTheme.background, `${spec.file} html background mismatch`);
      assert.equal(computed.html.colorScheme, 'light', `${spec.file} color-scheme mismatch`);
      assert.equal(computed.body.background, expectedComputedTheme.background, `${spec.file} body background mismatch`);
      assert.equal(computed.body.color, expectedComputedTheme.text, `${spec.file} body text mismatch`);
      assert.equal(computed.root.background, expectedComputedTheme.background, `${spec.file} comparison root background mismatch`);
      assert.equal(computed.root.color, expectedComputedTheme.text, `${spec.file} comparison root text mismatch`);
      assert.equal(computed.nav.background, expectedComputedTheme.navBackground, `${spec.file} navbar background mismatch`);
      assert.equal(computed.nav.color, expectedComputedTheme.text, `${spec.file} navbar text mismatch`);
      assert.equal(computed.heading.color, expectedComputedTheme.text, `${spec.file} heading color mismatch`);
      assert.equal(computed.bodyText.color, expectedComputedTheme.body, `${spec.file} body copy color mismatch`);
      assert.equal(computed.table.color, expectedComputedTheme.body, `${spec.file} table copy color mismatch`);
      assert.equal(computed.tableHead.background, expectedComputedTheme.tableHeadBackground, `${spec.file} table head background mismatch`);
      assert.equal(computed.primaryButton.background, expectedComputedTheme.actionBackground, `${spec.file} action background mismatch`);
      assert.equal(computed.primaryButton.color, expectedComputedTheme.actionText, `${spec.file} action text mismatch`);
      assert.equal(computed.cta.background, expectedComputedTheme.ctaBackground, `${spec.file} CTA background mismatch`);
      assert.equal(computed.cta.border, expectedComputedTheme.ctaBorder, `${spec.file} CTA border mismatch`);
    }
    layouts[spec.id] = layout;
  }

  const comparisonHtml = readHtml('compare/dify-vs-fastgpt.html');
  const faqHtml = readHtml('en/faq/Can-AI-intelligent-customer-service.html');
  assert.match(comparisonHtml, /Dify 与 FastGPT：四种项目的选型分野/);
  assert.match(comparisonHtml, /全球插件和海外协作生态/);
  assert.match(comparisonHtml, /原厂支持/);
  assert.match(comparisonHtml, /comparison-page-shell/);
  assert.match(comparisonHtml, /comparison-hero-copy/);
  assert.match(comparisonHtml, /comparison-toc/);
  assert.match(comparisonHtml, /comparison-cta/);
  assert.doesNotMatch(comparisonHtml, /comparison-hero-meta/);
  assert.doesNotMatch(comparisonHtml, /comparison-source-footer/);
  assert.match(comparisonHtml, /https:\/\/fastgpt\.cn\/compare\/dify-vs-fastgpt/);
  assert.match(comparisonHtml, /application\/ld\+json/);
  assert.match(faqHtml, /Can AI intelligent customer service platforms really reduce labor costs\?/);
  assert.match(faqHtml, /faq-social-preview\.png/);

  const report = {
    schemaVersion: 'W2-2026-08-08-comparison-palette-v1',
    passed: true,
    capturedWith: 'browser-harness CDP against local static out server',
    screenshots,
    layouts,
    staticDom: {
      comparisonRoute: '/compare/dify-vs-fastgpt',
      faqRoute: '/en/faq/Can-AI-intelligent-customer-service',
      comparisonContent: 'present',
      comparisonPreviewState: 'published',
      comparisonJsonLd: 'present',
      visualTheme: {
        mode: 'light',
        rootBackground: '#ffffff',
        surface: '#f8fafc',
        text: '#020617',
        body: '#475569',
        accent: '#3b82f6',
        action: '#1a1a1a',
        tableHead: '#f1f5f9',
        cta: '#eff6ff'
      },
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
