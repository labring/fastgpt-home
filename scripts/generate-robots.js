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
const customersUrl = `${cnUrl}/customers`;

const sitemap =
  variant === 'preview'
    ? ''
    : `\nSitemap: ${baseUrl}/sitemap.xml${isCn ? `\nSitemap: ${customersUrl}/sitemap.xml` : ''}`;
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
# - Customer Stories: ${customersUrl}
# - GitHub:        https://github.com/labring/FastGPT
# - LLM Context:   ${primaryLlmUrl}
# - LLM Index:     ${baseUrl}/llms.txt

User-agent: *
Allow: /
${sitemap}
`;

const outputPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(outputPath, content, 'utf-8');
console.log(`[generate-robots] Generated ${outputPath} for ${variant} (${baseUrl})`);
