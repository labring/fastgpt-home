#!/usr/bin/env node
/**
 * generate-robots.js
 * Generates public/robots.txt at build time based on environment variables.
 * Runs as part of the prebuild step.
 */
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
const isCn = baseUrl.includes('.cn');

const docUrl = 'https://doc.fastgpt.io';
const faqUrl = isCn ? `${baseUrl}/zh/faq` : `${baseUrl}/en/faq`;
const cloudUrl = isCn ? 'https://cloud.fastgpt.cn' : 'https://cloud.fastgpt.io';

const content = `# robots.txt for FastGPT (${baseUrl})
#
# FastGPT is a free, open-source enterprise AI Agent builder.
# It provides Agentic RAG retrieval, AI-powered workflows, and MCP tools
# to help teams build powerful AI Agents — no coding required.
#
# Key Resources:
# - Documentation: ${docUrl}
# - FAQ:           ${faqUrl}
# - GitHub:        https://github.com/labring/FastGPT
# - Cloud Service: ${cloudUrl}

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap-base.xml
Sitemap: ${baseUrl}/sitemap-faq.xml
`;

const outputPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(outputPath, content, 'utf-8');
console.log(`[generate-robots] Generated ${outputPath} for ${baseUrl}`);
