#!/usr/bin/env node
/**
 * Generates public/robots.txt at build time.
 * Production variants are crawlable; preview HTML and responses carry noindex directives.
 */
const fs = require('fs');
const path = require('path');
const {
  getProductionBaseUrls,
  resolveSiteVariant,
  stripTrailingSlash
} = require('./lib/site-variant');

const variant = resolveSiteVariant();
const configuredBaseUrl = stripTrailingSlash(
  process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io'
);
const { cn: cnUrl, io: ioUrl } = getProductionBaseUrls();
const baseUrl = variant === 'cn' ? cnUrl : variant === 'io' ? ioUrl : configuredBaseUrl;
const isCn = variant === 'cn';
const docUrl = isCn ? 'https://doc.fastgpt.cn' : 'https://doc.fastgpt.io';
const cloudUrl = isCn ? 'https://cloud.fastgpt.cn' : 'https://cloud.fastgpt.io';
const primaryLlmUrl = isCn ? `${cnUrl}/llms.txt` : `${ioUrl}/llms.txt`;

const isPreview = variant === 'preview';
// Explicit groups for major AI crawlers (same policy as `*`; listed so intent is unambiguous).
const aiCrawlers = ['GPTBot', 'ClaudeBot', 'PerplexityBot'];
const aiCrawlerRules = isPreview
  ? ''
  : `\n${aiCrawlers.map((bot) => `User-agent: ${bot}\nAllow: /\n`).join('\n')}`;

const sitemap = variant === 'preview' ? '' : `\nSitemap: ${baseUrl}/sitemap.xml`;
const content = `# robots.txt for FastGPT - ${baseUrl}
#
# This site publishes canonical localized pages for its target audience.
# Both major search engines and AI crawlers may access the site.
#
# Resources:
# - Website:       ${baseUrl}
# - Simplified Chinese website: ${cnUrl}
# - International website: ${ioUrl}
# - Cloud Service: ${cloudUrl}
# - Documentation: ${docUrl}
# - Pricing:       ${baseUrl}/price
# - FAQ:           ${baseUrl}/faq
# - GitHub:        https://github.com/labring/FastGPT
# - LLM Context:   ${primaryLlmUrl}
# - LLM Index:     ${baseUrl}/llms.txt
# - AI Policy:     ${baseUrl}/ai.txt

User-agent: *
Allow: /
${aiCrawlerRules}${sitemap}
`;

const outputPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(outputPath, content, 'utf-8');
console.log(`[generate-robots] Generated ${outputPath} for ${variant} (${baseUrl})`);

const aiTxt = `# ai.txt for FastGPT - ${baseUrl}
# AI crawler / LLM usage guidance. Crawl rules mirror robots.txt.
Site: ${baseUrl}
Name: FastGPT
Description: ${
  isCn
    ? 'FastGPT 是开源的企业级 AI Agent 构建平台，提供知识库、Agentic RAG、可视化工作流、MCP 工具与多模型接入。'
    : 'Free, open-source enterprise AI Agent builder (knowledge bases, Agentic RAG, visual workflows, MCP tools, multi-model integration).'
}
Context: ${baseUrl}/llms.txt
Docs: ${docUrl}
Source: https://github.com/labring/FastGPT
Pricing: ${baseUrl}/price
Contact: ${baseUrl}/contact
Cloud: ${cloudUrl}
${isPreview ? '' : `Sitemap: ${baseUrl}/sitemap.xml\n`}
User-Agent: *
Allow: /
`;

const aiTxtPath = path.join(__dirname, '../public/ai.txt');
fs.writeFileSync(aiTxtPath, aiTxt, 'utf-8');
console.log(`[generate-robots] Generated ${aiTxtPath} for ${variant} (${baseUrl})`);
