const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');

/**
 * Seam 2 regression for the ads lead-form attribution assembly
 * (src/lib/adsAttribution.ts). The module is dependency-free, so it loads with
 * a plain transpile-and-run and the tests exercise pure input/output behavior.
 */

const source = fs.readFileSync(path.join(root, 'src/lib/adsAttribution.ts'), 'utf8');
const adsAttributionModule = { exports: {} };
const output = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  fileName: 'adsAttribution.ts'
}).outputText;
vm.runInNewContext(`(function(require, module, exports){${output}\n})`, {}, {
  filename: 'adsAttribution.ts'
})(require, adsAttributionModule, adsAttributionModule.exports);

const {
  ADS_ATTRIBUTION_FIELDS,
  ADS_CONSENT_VERSION,
  buildAdsAttributionFields
} = adsAttributionModule.exports;

function urlUtm(overrides = {}) {
  return {
    utm_source: 'bing',
    utm_medium: 'cpc',
    utm_campaign: 'dify-vs-fastgpt',
    utm_term: 'dify 对比',
    utm_content: 'Exact',
    ...overrides
  };
}

test('attribution field set is exactly the nine contract fields', () => {
  assert.deepEqual([...ADS_ATTRIBUTION_FIELDS].sort(), [
    'consent_at',
    'consent_version',
    'source_page_path',
    'utm_campaign',
    'utm_content',
    'utm_medium',
    'utm_source',
    'utm_term',
    'visitor_id'
  ]);
});

test('consent version is the fixed bing-ads-2026-09 constant', () => {
  const fields = buildAdsAttributionFields({
    urlUtm: urlUtm(),
    storedUtm: null,
    sourcePagePath: '/ads/dify-vs-fastgpt',
    visitorId: 'visitor-1',
    consentAt: '2026-09-14T08:00:00.000Z'
  });
  assert.equal(ADS_CONSENT_VERSION, 'bing-ads-2026-09');
  assert.equal(fields.consent_version, 'bing-ads-2026-09');
});

test('URL utm parameters win over the stored last-touch snapshot per field', () => {
  const fields = buildAdsAttributionFields({
    urlUtm: urlUtm({ utm_term: 'dify 企业版' }),
    storedUtm: urlUtm({
      utm_source: 'google',
      utm_term: 'stale-keyword'
    }),
    sourcePagePath: '/ads/dify-vs-fastgpt',
    visitorId: 'visitor-1',
    consentAt: '2026-09-14T08:00:00.000Z'
  });

  assert.equal(fields.utm_source, 'bing');
  assert.equal(fields.utm_medium, 'cpc');
  assert.equal(fields.utm_campaign, 'dify-vs-fastgpt');
  assert.equal(fields.utm_term, 'dify 企业版');
  assert.equal(fields.utm_content, 'Exact');
});

test('missing URL utm parameters fall back to the stored snapshot', () => {
  const fields = buildAdsAttributionFields({
    urlUtm: {},
    storedUtm: urlUtm(),
    sourcePagePath: '/ads/brand',
    visitorId: 'visitor-2',
    consentAt: '2026-09-14T08:00:00.000Z'
  });

  assert.equal(fields.utm_source, 'bing');
  assert.equal(fields.utm_campaign, 'dify-vs-fastgpt');
  assert.equal(fields.utm_term, 'dify 对比');
});

test('parameter-less visits without storage produce empty utm fields', () => {
  const fields = buildAdsAttributionFields({
    urlUtm: {},
    storedUtm: null,
    sourcePagePath: '/ads/brand',
    visitorId: 'visitor-3',
    consentAt: ''
  });

  for (const field of ADS_ATTRIBUTION_FIELDS) {
    assert.equal(typeof fields[field], 'string');
  }
  assert.equal(fields.utm_source, '');
  assert.equal(fields.consent_at, '');
  assert.equal(fields.source_page_path, '/ads/brand');
  assert.equal(fields.visitor_id, 'visitor-3');
});

test('values are trimmed and capped at the CRM field limits', () => {
  const longTerm = '  ' + 'k'.repeat(300) + '  ';
  const fields = buildAdsAttributionFields({
    urlUtm: urlUtm({ utm_term: longTerm, utm_source: '  bing  ' }),
    storedUtm: null,
    sourcePagePath: '/ads/private-deployment',
    visitorId: 'v'.repeat(100),
    consentAt: '2026-09-14T08:00:00.000Z'
  });

  assert.equal(fields.utm_source, 'bing');
  assert.equal(fields.utm_term, 'k'.repeat(256));
  assert.equal(fields.visitor_id, 'v'.repeat(64));
});
