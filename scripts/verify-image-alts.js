#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const cases = fs.readFileSync(path.join(root, 'src/components/home/CaseStudies.tsx'), 'utf8');
const brands = fs.readFileSync(path.join(root, 'src/components/home/BrandWall.tsx'), 'utf8');
const videos = fs.readFileSync(
  path.join(root, 'src/components/learning-center/LearningCenterPage.tsx'),
  'utf8'
);

if (!cases.includes('alt={`${data.title}案例展示`}')) {
  throw new Error('Home case images must use case-specific alt text');
}

const brandLogos = [
  ...brands.matchAll(/\[\s*'([^']+\.png)',\s*'([^']+)'\s*\]/g)
].map(([, file, name]) => ({ file, name }));
if (brandLogos.length !== 48) {
  throw new Error(`Brand wall must expose 48 customer logos, found ${brandLogos.length}`);
}
if (
  brands.includes('aria-hidden="true"') ||
  !brands.includes('alt={`${name} 公司 logo`}')
) {
  throw new Error('Brand logos must use company-specific alt text');
}
if (brandLogos.some(({ name }) => !name.trim())) {
  throw new Error('Brand logo names must not be empty');
}

if (
  !videos.includes('role="img"') ||
  !videos.includes('aria-label={`${label}：${video.title}`}')
) {
  throw new Error('Video covers must expose their title to assistive tech');
}

console.log('Image alt verification passed.');
