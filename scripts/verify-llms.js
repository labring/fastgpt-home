#!/usr/bin/env node
/** Verify reader-facing LLM discovery files against the customer route authority. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { getCustomerRouteAuthority } = require('./lib/customer-migration');

const DISCOVERY_FILES = ['llms.txt', 'en/llms.txt', 'zh-hant/llms.txt', 'zh/llms.txt'];
const INTERNAL_FIELD_PATTERN =
  /\b(?:evidenceSource|sourceSha256|sourceRow|sourceClass|rawTargetUrl|sourceUrl|provenance|disposition)\b/;
const LEGACY_PROJECTION_PATTERN = /\/solutions\/|\/customers\/solution\/[^\s)]+\/markdown/;

function getDiscoveryLinks(content) {
  return [...content.matchAll(/^- .+: (https:\/\/fastgpt\.cn\/customers(?:\/[^\s]+)?)$/gm)].map(
    (match) => match[1]
  );
}

function verifyDiscoveryFile(filePath, expectedHub, expectedDetails) {
  const content = fs.readFileSync(filePath, 'utf8');
  assert(!INTERNAL_FIELD_PATTERN.test(content), `${filePath} exposes migration metadata`);
  assert(!LEGACY_PROJECTION_PATTERN.test(content), `${filePath} exposes a legacy projection URL`);

  if (!content.includes('## Customer Case Center')) return { hasCustomerDirectory: false };

  const links = getDiscoveryLinks(content);
  assert.equal(
    links.filter((link) => link === expectedHub).length,
    1,
    `${filePath} must expose the customer hub once`
  );
  const detailLinks = links.filter((link) => link !== expectedHub);
  assert.equal(
    new Set(detailLinks).size,
    expectedDetails.length,
    `${filePath} has duplicate detail URLs`
  );
  assert.deepEqual(
    [...new Set(detailLinks)].sort(),
    expectedDetails.slice().sort(),
    `${filePath} detail URLs drifted from the customer authority`
  );
  return { hasCustomerDirectory: true, customerLinks: detailLinks.length };
}

function verifyLlms(root = path.resolve(__dirname, '..')) {
  const routeAuthority = getCustomerRouteAuthority(root);
  const expectedHub = 'https://fastgpt.cn/customers';
  const expectedDetails = routeAuthority.details.map(
    (detail) => `https://fastgpt.cn${detail.path}`
  );
  const results = [];

  for (const relativePath of DISCOVERY_FILES) {
    const filePath = path.join(root, 'public', relativePath);
    assert(fs.existsSync(filePath), `missing LLM context: ${relativePath}`);
    results.push(verifyDiscoveryFile(filePath, expectedHub, expectedDetails));
  }

  const llmsFiles = [];
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filePath = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(filePath);
      else if (entry.name === 'llms.txt') llmsFiles.push(filePath);
    }
  };
  visit(path.join(root, 'public'));
  for (const filePath of llmsFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    assert(!INTERNAL_FIELD_PATTERN.test(content), `${filePath} exposes migration metadata`);
    assert(!LEGACY_PROJECTION_PATTERN.test(content), `${filePath} exposes a legacy projection URL`);
  }

  const directoryCount = results.filter((result) => result.hasCustomerDirectory).length;
  assert.equal(
    directoryCount,
    DISCOVERY_FILES.length,
    'canonical LLM contexts must expose customer discovery'
  );
  return {
    customerLinks: expectedDetails.length,
    discoveryFiles: directoryCount,
    llmsFiles: llmsFiles.length
  };
}

if (require.main === module) {
  try {
    const result = verifyLlms();
    console.log(
      `[verify-llms] passed: ${result.discoveryFiles} discovery files expose hub plus ${result.customerLinks} detail URLs`
    );
  } catch (error) {
    console.error(`[verify-llms] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { verifyLlms };
