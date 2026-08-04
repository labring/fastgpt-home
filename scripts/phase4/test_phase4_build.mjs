#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { extractFaqObjects } from './meta_overlay.mjs';

const root = process.cwd();
const outDir = path.join(root, 'out');
const report = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/phase4/meta-overlay-report.json'), 'utf8'));
const matched = report.rows.filter((row) => row.status === 'matched');
assert(matched.length > 0, 'Meta report has no matched rows');

function resolveHtml(route) {
  const normalized = route.replace(/^\//, '');
  const candidates = [path.join(outDir, `${normalized}.html`), path.join(outDir, normalized, 'index.html')];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  assert(file, `Missing static page for ${route}`);
  return fs.readFileSync(file, 'utf8');
}

function meta(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]*)"`, 'i'));
  assert(match, `Missing ${name} metadata`);
  return match[1].replaceAll('&amp;', '&').replaceAll('&quot;', '"');
}

const sample = matched[0];
const html = resolveHtml(`/en/faq/${encodeURIComponent(sample.repo_key)}`);
const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1];
assert(title?.startsWith(`${sample.source_fields.title} - FastGPT`), 'Meta overlay title is absent from static HTML');
assert.equal(meta(html, 'description'), sample.source_fields.description);
const original = extractFaqObjects().find((item) => item.repo_key === sample.repo_key);
assert(original, `Missing original FAQ object for ${sample.repo_key}`);
assert.equal(meta(html, 'keywords'), original.Keywords.replaceAll(', ', ','));
assert(html.includes('"@type":"FAQPage"'), 'FAQ structured data is missing');

const output = {
  passed: true,
  sample_repo_key: sample.repo_key,
  checked_fields: ['title', 'description', 'existing-keywords', 'FAQPage'],
  matched_rows: matched.length,
  generated_at: new Date().toISOString(),
};
fs.mkdirSync(path.join(root, 'artifacts/phase4'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/phase4/phase4-build-report.json'), `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`Phase 4 build audit passed: ${sample.repo_key} exposes source Meta fields in static HTML.`);
