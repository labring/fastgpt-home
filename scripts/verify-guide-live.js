#!/usr/bin/env node

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { buildGuideExpectation } = require('./verify-guide-export.js');
const manifestIdentityFields = [
  'schemaVersion',
  'variant',
  'expectedHost',
  'sourceCommit',
  'provider',
  'releaseRevision',
  'artifactDigest',
  'treeDigest',
  'rollbackTarget'
];

function fail(message) {
  throw new Error(`[verify-guide-live] ${message}`);
}
function buildExpectedMatrix() {
  return Object.fromEntries(
    ['cn', 'io'].map((variant) => {
      const expectation = buildGuideExpectation(variant);
      return [
        variant,
        {
          host: expectation.host,
          routes: [...expectation.routes.values()].map(({ slug, route, source }) => ({
            slug,
            route,
            h1: source.h1
          }))
        }
      ];
    })
  );
}
function parseArgs(argv) {
  const options = {
    baseUrlCn: 'https://fastgpt.cn',
    baseUrlIo: 'https://fastgpt.io',
    timeoutMs: 10_000,
    providerEvidence: []
  };
  const keys = {
    '--base-url-cn': 'baseUrlCn',
    '--base-url-io': 'baseUrlIo',
    '--manifest': 'manifest',
    '--report': 'report',
    '--timeout-ms': 'timeoutMs',
    '--provider-evidence': 'providerEvidence'
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--allow-blocked-baseline') {
      options.allowBlockedBaseline = true;
      continue;
    }
    const key = keys[token];
    const value = argv[++index];
    if (!key || !value || value.startsWith('--')) fail(`unknown or incomplete argument ${token}`);
    if (key === 'providerEvidence') options.providerEvidence.push(value);
    else options[key] = key === 'timeoutMs' ? Number(value) : value;
  }
  if (!Number.isFinite(options.timeoutMs) || options.timeoutMs < 1)
    fail('timeout must be positive');
  return options;
}
function loadExpectedManifests(filePath) {
  if (!filePath) return {};
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const entries = payload.variants
    ? Object.entries(payload.variants)
    : payload.variant
    ? [[payload.variant, payload]]
    : [];
  if (!entries.length) fail('expected manifest must contain a manifest or variants map');
  return Object.fromEntries(
    entries.map(([variant, manifest]) => {
      if (!['cn', 'io'].includes(variant) || manifest?.variant !== variant)
        fail('expected manifest variant mismatch');
      return [variant, manifest];
    })
  );
}
function validateExpectedManifest(manifest, expected) {
  if (!expected) return;
  for (const key of manifestIdentityFields)
    if (manifest[key] !== expected[key]) fail(`manifest ${key} differs from expected manifest`);
}
function headersOf(headers) {
  return Object.fromEntries(
    [
      'cache-control',
      'etag',
      'last-modified',
      'age',
      'cf-cache-status',
      'x-cache-status',
      'x-release-revision',
      'x-release-artifact'
    ].map((key) => [key, headers.get(key) || undefined])
  );
}
function getTag(html, tag, attr, value) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].find((candidate) =>
    new RegExp(`\\s${attr}=["']${value}["']`, 'i').test(candidate[0])
  )?.[0];
}
function attr(tag, name) {
  return tag?.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'))?.[1];
}
function decodeHtml(value) {
  return value.replace(
    /&(amp|lt|gt|quot|#39|#x27);/g,
    (_, entity) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", '#x27': "'" }[entity])
  );
}
function checkHtml(body, expected, host, hosts) {
  const errors = [];
  const h1 = decodeHtml(
    body
      .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
      ?.replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim() || ''
  );
  if (h1 !== expected.h1) errors.push('h1');
  const canonical = attr(getTag(body, 'link', 'rel', 'canonical'), 'href');
  if (canonical !== `${host}${expected.route}`) errors.push('canonical');
  const alternateTags = [...body.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*>/gi)].map(
    (match) => [attr(match[0], 'hreflang'), attr(match[0], 'href')]
  );
  const alternate = Object.fromEntries(alternateTags);
  const requiredLanguages = ['zh-CN', 'en', 'x-default'];
  if (
    alternateTags.length !== requiredLanguages.length ||
    new Set(alternateTags.map(([language]) => language)).size !== requiredLanguages.length ||
    requiredLanguages.some((language) => !alternate[language])
  )
    errors.push('alternates:keys');
  for (const [lang, url] of Object.entries({
    'zh-CN': `${hosts.cn}${expected.route}`,
    en: `${hosts.io}${expected.route}`,
    'x-default': `${hosts.io}${expected.route}`
  }))
    if (alternate[lang] !== url) errors.push(`alternate:${lang}`);
  const robots = [...body.matchAll(/<meta\b[^>]*>/gi)].find(
    (match) => attr(match[0], 'name')?.toLowerCase() === 'robots'
  );
  if (!robots || /noindex/i.test(attr(robots[0], 'content') || '')) errors.push('robots');
  return errors;
}
function validateProviderReceipt(receipt, manifest) {
  if (!receipt || receipt.schemaVersion !== 1 || receipt.variant !== manifest.variant)
    fail('provider receipt schema/variant mismatch');
  for (const key of [
    'releaseRevision',
    'artifactDigest',
    'treeDigest',
    'archiveDigest',
    'rollbackTarget'
  ])
    if (!receipt[key]) fail(`provider receipt missing ${key}`);
  for (const key of ['releaseRevision', 'artifactDigest', 'treeDigest', 'rollbackTarget'])
    if (receipt[key] !== manifest[key]) fail(`provider receipt ${key} mismatch`);
  if (
    receipt.variant === 'cn' &&
    (!String(receipt.provider?.imageDigest || '').startsWith('sha256:') ||
      !String(receipt.provider?.kubernetesImage || '').includes('@sha256:') ||
      receipt.provider?.rollout?.status !== 'completed')
  )
    fail('provider receipt CN image digest/Kubernetes reference/completed rollout missing');
  if (
    receipt.variant === 'io' &&
    (!receipt.provider?.deploymentId || !receipt.provider?.deploymentUrl)
  )
    fail('provider receipt IO deployment ID/URL missing');
  return receipt;
}
async function fetchWithTimeout(url, timeoutMs, fetchImpl = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { redirect: 'manual', signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
async function runLiveVerification(options, fetchImpl) {
  const matrix = buildExpectedMatrix();
  const startedAt = new Date().toISOString();
  const providerEvidence = options.providerEvidence || [];
  const expectedManifests = loadExpectedManifests(options.manifest);
  const report = {
    schemaVersion: 1,
    startedAt,
    status: 'passed',
    variants: {},
    providerEvidence: providerEvidence.map((filePath) => ({
      path: filePath,
      digest: crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
    })),
    ...(options.manifest
      ? {
          expectedManifest: {
            path: options.manifest,
            digest: crypto
              .createHash('sha256')
              .update(fs.readFileSync(options.manifest))
              .digest('hex')
          }
        }
      : {})
  };
  const receipts = Object.fromEntries(
    providerEvidence.map((filePath) => {
      const receipt = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return [receipt.variant, receipt];
    })
  );
  for (const [variant, expected] of Object.entries(matrix)) {
    const host = variant === 'cn' ? options.baseUrlCn : options.baseUrlIo;
    const result = { surfaces: {}, routes: [], failures: [] };
    let sitemap = '';
    let manifest;
    let manifestHeaders;
    let releaseIdentity;
    for (const surface of ['/sitemap.xml', '/__release/manifest.json']) {
      const surfaceResult = {
        status: null,
        finalUrl: null,
        headers: {},
        bodyDigest: null,
        failures: []
      };
      try {
        const response = await fetchWithTimeout(`${host}${surface}`, options.timeoutMs, fetchImpl);
        const body = await response.text();
        const headers = headersOf(response.headers);
        surfaceResult.status = response.status;
        surfaceResult.finalUrl = response.url || `${host}${surface}`;
        surfaceResult.headers = headers;
        surfaceResult.bodyDigest = crypto.createHash('sha256').update(body).digest('hex');
        if (response.status !== 200) {
          surfaceResult.failures.push(`status=${response.status}`);
          result.failures.push(`${surface}:status=${response.status}`);
        }
        if (surface.endsWith('.xml')) {
          if (response.status === 200) sitemap = body;
        } else if (response.status === 200) {
          try {
            manifest = JSON.parse(body);
            manifestHeaders = headers;
            if (!/no-store/i.test(headers['cache-control'] || '')) {
              surfaceResult.failures.push('cache');
              result.failures.push('/__release/manifest.json:cache');
            }
          } catch (error) {
            surfaceResult.failures.push(`json=${error.name}`);
            result.failures.push(`${surface}:${error.name}`);
          }
        }
      } catch (error) {
        surfaceResult.failures.push(error.name);
        result.failures.push(`${surface}:${error.name}`);
      }
      result.surfaces[surface] = surfaceResult;
    }
    if (manifest) {
      try {
        if (
          manifest.schemaVersion !== 1 ||
          manifest.variant !== variant ||
          manifest.expectedHost !== host
        )
          fail('manifest schema/variant/host mismatch');
        if (
          !manifest.sourceCommit ||
          !manifest.provider ||
          !manifest.releaseRevision ||
          !manifest.artifactDigest ||
          !manifest.treeDigest ||
          !manifest.rollbackTarget
        )
          fail('manifest identity missing');
        releaseIdentity = {
          releaseRevision: manifest.releaseRevision,
          artifactDigest: manifest.artifactDigest
        };
        validateExpectedManifest(manifest, expectedManifests[variant]);
        if (
          !options.allowBlockedBaseline &&
          (manifestHeaders?.['x-release-revision'] !== manifest.releaseRevision ||
            manifestHeaders?.['x-release-artifact'] !== manifest.artifactDigest)
        )
          fail('manifest release headers mismatch');
        if (!options.allowBlockedBaseline) validateProviderReceipt(receipts[variant], manifest);
        result.manifest = {
          schemaVersion: manifest.schemaVersion,
          sourceCommit: manifest.sourceCommit,
          provider: manifest.provider,
          expectedHost: manifest.expectedHost,
          releaseRevision: manifest.releaseRevision,
          artifactDigest: manifest.artifactDigest,
          treeDigest: manifest.treeDigest,
          rollbackTarget: manifest.rollbackTarget,
          headers: manifestHeaders
        };
      } catch (error) {
        result.failures.push(`manifest:${error.message}`);
      }
    }
    for (const expectedRoute of expected.routes) {
      const url = `${host}${expectedRoute.route}`;
      const item = { slug: expectedRoute.slug, path: expectedRoute.route };
      try {
        const response = await fetchWithTimeout(url, options.timeoutMs, fetchImpl);
        const body = await response.text();
        item.status = response.status;
        item.finalUrl = response.url;
        item.headers = headersOf(response.headers);
        item.bodyDigest = crypto.createHash('sha256').update(body).digest('hex');
        const surfaces = [];
        if (response.status !== 200) surfaces.push(`status=${response.status}`);
        if (response.url !== url) surfaces.push('redirect');
        if (response.status === 200)
          surfaces.push(
            ...checkHtml(body, expectedRoute, host, {
              cn: options.baseUrlCn,
              io: options.baseUrlIo
            })
          );
        if (!sitemap.includes(`<loc>${host}${expectedRoute.route}</loc>`)) surfaces.push('sitemap');
        if (
          !/max-age=\d*[1-9]/i.test(item.headers['cache-control'] || '') &&
          !item.headers['cf-cache-status'] &&
          !item.headers['x-cache-status']
        )
          surfaces.push('cache');
        if (!options.allowBlockedBaseline && releaseIdentity) {
          if (item.headers['x-release-revision'] !== releaseIdentity.releaseRevision)
            surfaces.push('release-revision');
          if (item.headers['x-release-artifact'] !== releaseIdentity.artifactDigest)
            surfaces.push('release-artifact');
        }
        if (surfaces.length) {
          item.failures = surfaces;
          result.failures.push(`${expectedRoute.route}:${surfaces.join(',')}`);
        }
      } catch (error) {
        item.failures = [error.name];
        result.failures.push(`${expectedRoute.route}:${error.name}`);
      }
      result.routes.push(item);
    }
    report.variants[variant] = result;
  }
  const failureCount = Object.values(report.variants).reduce(
    (count, result) => count + result.failures.length,
    0
  );
  report.finishedAt = new Date().toISOString();
  report.status = failureCount ? (options.allowBlockedBaseline ? 'blocked' : 'failed') : 'passed';
  return report;
}
async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = await runLiveVerification(options);
  if (options.report) {
    fs.mkdirSync(path.dirname(path.resolve(options.report)), { recursive: true });
    fs.writeFileSync(options.report, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(`${options.report}.txt`, `[verify-guide-live] status=${report.status}\n`);
  }
  console.log(`[verify-guide-live] status=${report.status}`);
  if (report.status === 'blocked') process.exitCode = 2;
  if (report.status === 'failed') process.exitCode = 1;
  return report;
}
if (require.main === module)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
module.exports = {
  buildExpectedMatrix,
  parseArgs,
  loadExpectedManifests,
  validateExpectedManifest,
  validateProviderReceipt,
  fetchWithTimeout,
  runLiveVerification,
  main
};
