#!/usr/bin/env node
/**
 * Generates public/robots.txt at build time.
 * Both site variants are crawlable; canonical and hreflang metadata handle duplication.
 */
const fs = require('fs');
const path = require('path');

const baseUrl = (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');
const isCn = new URL(baseUrl).hostname.endsWith('.cn');
const cnUrl = 'https://fastgpt.cn';
const ioUrl = 'https://fastgpt.io';
const docUrl = isCn ? 'https://doc.fastgpt.cn' : 'https://doc.fastgpt.io';
const cloudUrl = isCn ? 'https://cloud.fastgpt.cn' : 'https://cloud.fastgpt.io';
const primaryLlmUrl = isCn ? `${cnUrl}/llms.txt` : `${ioUrl}/llms.txt`;

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

User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

const outputPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(outputPath, content, 'utf-8');
console.log(`[generate-robots] Generated ${outputPath} for ${baseUrl}`);
