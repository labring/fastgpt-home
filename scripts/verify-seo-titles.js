#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pages = [
  ['src/app/customers/layout.tsx', 'FastGPT 客户案例 - 企业 AI 知识库与智能体落地实践'],
  ['src/app/videos/page.tsx', 'FastGPT 视频教程 - AI 知识库、RAG 与工作流搭建学习中心'],
  ['src/app/wiki/page.tsx', 'FastGPT 百科 - AI 智能体、RAG、知识库概念详解']
];

for (const [relativePath, title] of pages) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  assert(source.includes(title), `${relativePath} is missing the approved SEO title`);
}

const videoSource = fs.readFileSync(path.join(root, 'src/app/videos/page.tsx'), 'utf8');
assert(
  (videoSource.match(/AI 知识库、RAG、Agent 与工作流搭建/g) || []).length >= 1,
  'video page description lost its topic coverage'
);

console.log('SEO title verification passed');
