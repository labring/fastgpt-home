const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {
  CUSTOMER_HTTP_KIND,
  CUSTOMER_HTTP_SCHEMA_VERSION,
  runCustomerMigrationHttpContract
} = require('./customer-migration-http');
const { readCustomerMigrationAuthority } = require('./customer-migration');
const legacyAssets = require('../fixtures/customer-migration-legacy-assets');

const ROOT = path.resolve(__dirname, '../..');

test('customer HTTP contract checks every source class and terminal route', async () => {
  const authority = readCustomerMigrationAuthority(ROOT);
  const contract = JSON.parse(
    fs.readFileSync(
      path.join(ROOT, 'scripts/fixtures/customer-migration-http-contract.json'),
      'utf8'
    )
  );
  const sitemap = authority.routeAuthority.paths
    .map((routePath) => `<url><loc>https://terminal.example.com${routePath}</loc></url>`)
    .join('');
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (input) => {
    const url = new URL(input);
    calls.push(url.href);
    if (url.pathname === '/sitemap.xml') return new Response(`<urlset>${sitemap}</urlset>`);
    if (url.hostname === 'legacy.example.com') {
      const asset = legacyAssets[url.pathname];
      if (asset) {
        return new Response(asset.body, {
          status: 200,
          headers: { 'content-type': asset.contentType }
        });
      }
      const source = authority.records.find((record) => record.sourcePath === url.pathname);
      assert(source, `unexpected source request: ${url.pathname}`);
      return new Response('', {
        status: 301,
        headers: { location: `https://terminal.example.com${source.targetPath}${url.search}` }
      });
    }
    assert.equal(url.hostname, 'terminal.example.com');
    return new Response(
      `<link rel="canonical" href="https://terminal.example.com${url.pathname}">`,
      { status: 200 }
    );
  };
  contract.kind = CUSTOMER_HTTP_KIND;
  contract.schemaVersion = CUSTOMER_HTTP_SCHEMA_VERSION;
  contract.legacyOrigin = 'https://legacy.example.com';
  contract.terminalOrigin = 'https://terminal.example.com';
  try {
    const result = await runCustomerMigrationHttpContract({
      legacyTarget: 'https://legacy.example.com',
      terminalTarget: 'https://terminal.example.com',
      approvedLegacyTarget: 'https://legacy.example.com',
      approvedTerminalTarget: 'https://terminal.example.com',
      contract,
      rootDir: ROOT,
      concurrency: 4
    });
    assert.equal(result.status, 'passed');
    assert.equal(result.checks.length, 234);
    assert.equal(result.responses.length, 341);
    assert.deepEqual(
      Object.fromEntries(
        Object.entries(result.sourceClasses).map(([name, summary]) => [name, summary.sources])
      ),
      authority.sourceClassCounts
    );
    assert.equal(calls.length, 341);
  } finally {
    global.fetch = originalFetch;
  }
});

test('customer HTTP contract checks legacy crawl files and the canonical llms projection', async () => {
  const authority = readCustomerMigrationAuthority(ROOT);
  const contract = JSON.parse(
    fs.readFileSync(
      path.join(ROOT, 'scripts/fixtures/customer-migration-http-contract.json'),
      'utf8'
    )
  );
  const legacyOrigin = 'https://legacy.example.com';
  const terminalOrigin = 'https://terminal.example.com';
  const sitemap = authority.routeAuthority.paths
    .map((routePath) => `<url><loc>${terminalOrigin}${routePath}</loc></url>`)
    .join('');
  const llms = [
    '## Customer Case Center',
    `- Customer Case Center: ${terminalOrigin}${authority.routeAuthority.hub}`,
    ...authority.routeAuthority.details.map(
      (detail) => `- ${detail.title}: ${terminalOrigin}${detail.path}`
    )
  ].join('\n');
  const originalFetch = global.fetch;
  global.fetch = async (input) => {
    const url = new URL(input);
    if (url.hostname === 'legacy.example.com') {
      if (url.pathname === '/robots.txt') {
        return new Response(`User-agent: *\nAllow: /\nSitemap: ${terminalOrigin}/sitemap.xml\n`, {
          status: 200,
          headers: { 'content-type': 'text/plain' }
        });
      }
      if (url.pathname === '/sitemap.xml' || url.pathname === '/llms.txt') {
        return new Response('', {
          status: 301,
          headers: { location: `${terminalOrigin}${url.pathname}${url.search}` }
        });
      }
      const asset = legacyAssets[url.pathname];
      if (asset) {
        return new Response(asset.body, {
          status: 200,
          headers: { 'content-type': asset.contentType }
        });
      }
      const source = authority.records.find((record) => record.sourcePath === url.pathname);
      assert(source, `unexpected source request: ${url.pathname}`);
      return new Response('', {
        status: 301,
        headers: { location: `${terminalOrigin}${source.targetPath}${url.search}` }
      });
    }
    if (url.pathname === '/sitemap.xml') return new Response(`<urlset>${sitemap}</urlset>`);
    if (url.pathname === '/llms.txt') {
      return new Response(llms, { status: 200, headers: { 'content-type': 'text/plain' } });
    }
    return new Response(`<link rel="canonical" href="${terminalOrigin}${url.pathname}">`, {
      status: 200
    });
  };
  contract.legacyOrigin = legacyOrigin;
  contract.terminalOrigin = terminalOrigin;
  contract.legacyDiscovery = {};
  contract.llmsPath = '/llms.txt';
  try {
    const result = await runCustomerMigrationHttpContract({
      legacyTarget: legacyOrigin,
      terminalTarget: terminalOrigin,
      approvedLegacyTarget: legacyOrigin,
      approvedTerminalTarget: terminalOrigin,
      contract,
      rootDir: ROOT,
      concurrency: 4
    });
    assert.equal(result.status, 'passed');
    assert.equal(result.checks.length, 238);
    assert.equal(result.responses.length, 345);
    assert.equal(result.checks.find((check) => check.name === 'legacy-robots').status, 'passed');
    assert.equal(result.checks.find((check) => check.name === 'legacy-sitemap').status, 'passed');
    assert.equal(result.checks.find((check) => check.name === 'legacy-llms').status, 'passed');
    assert.equal(result.checks.find((check) => check.name === 'terminal-llms').status, 'passed');
  } finally {
    global.fetch = originalFetch;
  }
});
