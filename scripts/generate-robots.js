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

const docUrl = isCn ? 'https://doc.fastgpt.cn' : 'https://doc.fastgpt.io';
const faqUrl = isCn ? `${baseUrl}/zh/faq` : `${baseUrl}/en/faq`;
const cloudUrl = isCn ? 'https://cloud.fastgpt.cn' : 'https://cloud.fastgpt.io';
const priceUrl = isCn ? `${baseUrl}/zh/price` : `${baseUrl}/en/price`;

const content = `# robots.txt for FastGPT — ${baseUrl}
#
# FastGPT is a free, open-source enterprise AI Agent builder.
# It provides Agentic RAG retrieval, AI-powered workflows, and MCP tools
# to help teams build powerful AI Agents — no coding required.
#
# Resources:
# - Website:       ${baseUrl}
# - Cloud Service: ${cloudUrl}
# - Pricing:       ${priceUrl}
# - Documentation: ${docUrl}
# - FAQ:           ${faqUrl}
# - GitHub:        https://github.com/labring/FastGPT
# - LLM Context:   ${baseUrl}/llms.txt

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap-base.xml
Sitemap: ${baseUrl}/sitemap-faq.xml
`;

const outputPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(outputPath, content, 'utf-8');
console.log(`[generate-robots] Generated ${outputPath} for ${baseUrl}`);
