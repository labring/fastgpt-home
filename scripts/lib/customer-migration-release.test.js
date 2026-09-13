const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { readCustomerMigrationAuthority } = require('./customer-migration');
const legacyAssets = require('../fixtures/customer-migration-legacy-assets');
const {
  OBSERVATION_HOURS,
  runCustomerMigrationRelease,
  verifyCustomerMigrationReleaseEvidence
} = require('./customer-migration-release');

const ROOT = path.resolve(__dirname, '../..');

function releaseContract(authority) {
  const environment = (name) => ({
    legacyTarget: `https://${name}-legacy.example.com`,
    terminalTarget: `https://${name}.example.com`,
    approvedLegacyTarget: `https://${name}-legacy.example.com`,
    approvedTerminalTarget: `https://${name}.example.com`
  });
  return {
    schemaVersion: 1,
    kind: 'customer-migration-release',
    authority: 'customer-migration',
    authorityDigest: authority.authority.digest,
    repository: { url: 'https://github.com/labring/fastgpt-home' },
    revision: 'abcdef1234567',
    environments: { preview: environment('preview'), production: environment('production') },
    rollback: {
      status: 'ready',
      tested: true,
      previousIngressRevision: '1665072',
      migrationDigest: authority.authority.digest,
      releaseUnits: { redirects: 'ready', legacyManifest: 'ready' },
      restorePaths: [
        'src/config/customer-migration-authority.json',
        'src/config/customer-migration-projection.json'
      ]
    },
    observation: {
      status: 'passed',
      startedAt: '2026-08-25T00:00:00.000Z',
      endedAt: '2026-08-28T00:00:00.000Z',
      metrics: {
        notFound: 0,
        serverErrors: 0,
        redirects: authority.records.length,
        preservedAssets: authority.preservedAssets.length,
        canonicalMismatches: 0
      },
      crawlFiles: { robots: 'passed', sitemap: 'passed', llms: 'passed' }
    }
  };
}

function mockFetchForAuthority(authority) {
  const sitemap = authority.routeAuthority.paths
    .map((routePath) => `<url><loc>{origin}${routePath}</loc></url>`)
    .join('');
  const originalFetch = global.fetch;
  global.fetch = async (input) => {
    const url = new URL(input);
    const origin = url.origin;
    if (url.hostname.endsWith('-legacy.example.com')) {
      if (url.pathname === '/robots.txt') {
        return new Response(
          `User-agent: *\nAllow: /\nSitemap: ${origin.replace('-legacy', '')}/sitemap.xml\n`,
          { status: 200, headers: { 'content-type': 'text/plain' } }
        );
      }
      if (url.pathname === '/sitemap.xml' || url.pathname === '/llms.txt') {
        return new Response('', {
          status: 301,
          headers: { location: `${origin.replace('-legacy', '')}${url.pathname}${url.search}` }
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
        headers: {
          location: `${origin.replace('-legacy', '')}${source.targetPath}${url.search}`
        }
      });
    }
    if (url.pathname === '/sitemap.xml') {
      return new Response(sitemap.replaceAll('{origin}', origin), {
        status: 200,
        headers: { 'content-type': 'text/xml' }
      });
    }
    if (url.pathname === '/llms.txt') {
      const body = [
        '## Customer Case Center',
        `- Customer Case Center: ${origin}${authority.routeAuthority.hub}`,
        ...authority.routeAuthority.details.map(
          (detail) => `- ${detail.title}: ${origin}${detail.path}`
        )
      ].join('\n');
      return new Response(body, { status: 200, headers: { 'content-type': 'text/plain' } });
    }
    return new Response(`<link rel="canonical" href="${origin}${url.pathname}">`, {
      status: 200,
      headers: { 'content-type': 'text/html' }
    });
  };
  return () => {
    global.fetch = originalFetch;
  };
}

test('release runner closes preview and production evidence with rollback and observation', async () => {
  const authority = readCustomerMigrationAuthority(ROOT);
  const artifactRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'customer-migration-release-'));
  const restoreFetch = mockFetchForAuthority(authority);
  try {
    const result = await runCustomerMigrationRelease({
      contract: releaseContract(authority),
      rootDir: ROOT,
      artifactDirectory: artifactRoot
    });
    assert.equal(result.status, 'passed');
    assert.equal(result.exitStatus, 0);
    assert.equal(result.sourceCount, 230);
    assert.equal(result.preservedAssetCount, 1);
    assert.equal(result.targetCount, 107);
    assert.deepEqual(result.routeSurface, {
      hub: '/customers',
      categories: 17,
      details: 89,
      routes: 107
    });
    assert.equal(result.environments.preview.status, 'passed');
    assert.equal(result.environments.production.status, 'passed');
    assert.equal(result.environments.preview.exitStatus, 0);
    assert.equal(result.rollback.tested, true);
    assert.deepEqual(result.rollback.releaseUnits, {
      redirects: 'ready',
      legacyManifest: 'ready'
    });
    assert.deepEqual(result.releaseUnits.legacyManifest, {
      count: 1,
      referencedAssetCount: 2,
      observationStatus: 'passed',
      rollbackStatus: 'ready'
    });
    assert.equal(result.observation.windowHours, OBSERVATION_HOURS * 1);
    assert.match(result.digest, /^[a-f0-9]{64}$/);
    assert.equal(result.environments.preview.responses[0].name, 'legacy-llms');
    assert.equal(
      result.environments.preview.responses.find((response) => response.name === 'target-107')
        .requestPath,
      authority.targetPaths[106]
    );
    assert(fs.existsSync(path.join(artifactRoot, 'preview/responses/source-001.body')));
    assert(fs.existsSync(path.join(artifactRoot, 'production/responses/target-001.body')));
    assert.doesNotThrow(() =>
      verifyCustomerMigrationReleaseEvidence(result, authority, { evidenceRoot: artifactRoot })
    );
  } finally {
    restoreFetch();
    fs.rmSync(artifactRoot, { recursive: true, force: true });
  }
});

test('release contract rejects a short observation and a stale rollback digest', async () => {
  const authority = readCustomerMigrationAuthority(ROOT);
  const contract = releaseContract(authority);
  contract.rollback.migrationDigest = 'a'.repeat(64);
  contract.observation.endedAt = '2026-08-27T00:00:00.000Z';
  await assert.rejects(
    () => runCustomerMigrationRelease({ contract, rootDir: ROOT }),
    /rollback-digest-mismatch|observation-window-short/
  );
});
