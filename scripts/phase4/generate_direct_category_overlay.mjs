#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const reportPath = path.join(root, 'artifacts/phase4/category-batch-dry-run.json');
const outputPath = path.join(root, 'src/faq/legacyCategories.ts');

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const allowedCategoryIds = new Set(Object.keys({
  'data-and-document-processing': true,
  'deployment-and-security': true,
  'content-and-creativity': true,
  'industry-applications': true,
  'concepts-and-selection': true,
  'office-and-collaboration-automation': true,
  'platform-value-and-trends': true,
  'integration-and-development': true,
  'customer-service-and-support': true,
}));

const rows = report.rows.filter((row) => row.status === 'selected' && row.repo_key);
const entries = [];
const seen = new Set();
for (const row of rows) {
  if (!allowedCategoryIds.has(row.category_id)) {
    throw new Error(`Unknown category ID: ${row.category_id}`);
  }
  if (seen.has(row.repo_key)) {
    throw new Error(`Duplicate runtime FAQ key: ${row.repo_key}`);
  }
  seen.add(row.repo_key);
  entries.push([row.repo_key, row.category_id]);
}

const map = entries
  .map(([key, categoryId]) => `  ${JSON.stringify(key)}: ${JSON.stringify(categoryId)},`)
  .join('\n');

const output = `import type { FaqItem } from './zh';

export const legacyCategoryLabels = {
  en: {
    'data-and-document-processing': 'Data & Document Processing',
    'deployment-and-security': 'Deployment & Security',
    'content-and-creativity': 'Content & Creativity',
    'industry-applications': 'Industry Applications',
    'concepts-and-selection': 'Concepts & Selection',
    'office-and-collaboration-automation': 'Office & Collaboration Automation',
    'platform-value-and-trends': 'Platform Value & Trends',
    'integration-and-development': 'Integration & Development',
    'customer-service-and-support': 'Customer Service & Support',
  },
  zh: {
    'data-and-document-processing': '数据与文档处理',
    'deployment-and-security': '部署与安全',
    'content-and-creativity': '内容创作',
    'industry-applications': '行业应用',
    'concepts-and-selection': '概念与选型',
    'office-and-collaboration-automation': '办公与协作自动化',
    'platform-value-and-trends': '平台价值与趋势',
    'integration-and-development': '集成与开发',
    'customer-service-and-support': '客户服务与支持',
  },
} as const;

export type LegacyCategoryId = keyof typeof legacyCategoryLabels.en;

// Direct-publish override: apply every uniquely matched runtime row from the W2 source report.
// Source SHA-256: ${report.source.source_sha256}
// Runtime coverage: ${entries.length} rows; unresolved source rows remain absent from this static runtime.
export const legacyFaqCategoryIds: Record<string, LegacyCategoryId> = {
${map}
};

export function applyLegacyCategoryOverlay(
  data: Record<string, FaqItem>,
  locale: 'en' | 'zh',
): Record<string, FaqItem> {
  return Object.fromEntries(
    Object.entries(data).map(([id, item]) => {
      const categoryId = legacyFaqCategoryIds[id];
      const category = categoryId ? legacyCategoryLabels[locale][categoryId] : item.Category;
      return [id, category === item.Category ? item : { ...item, Category: category }];
    }),
  );
}
`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log(JSON.stringify({ outputPath, sourceSha256: report.source.source_sha256, runtimeCoverage: entries.length }));
