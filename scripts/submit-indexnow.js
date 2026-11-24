#!/usr/bin/env node
/**
 * IndexNow submission CLI for fastgpt.cn (cn) and fastgpt.io (io).
 * Keys live in scripts/lib/site-variant.js (INDEXNOW_KEYS) and are written to out/<key>.txt by clean-locale-output.js.
 * Usage:
 *   node scripts/submit-indexnow.js --snapshot --variant <cn|io> --out <file>
 *   node scripts/submit-indexnow.js --diff --variant <cn|io> --out-dir <dir> --before <file> [--dry-run]
 *   node scripts/submit-indexnow.js --submit --variant <cn|io> --urls "https://..." [--dry-run]
 */

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const { INDEXNOW_KEYS, getProductionBaseUrls } = require('./lib/site-variant');

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10_000;

function sleep(ms) {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

function isEligibleUrl(rawUrl, host) {
  try {
    const { protocol, hostname, search, hash } = new URL(String(rawUrl).trim());
    return protocol === 'https:' && hostname === host && !search && !hash;
  } catch {
    return false;
  }
}

function isIndustryUrl(url) {
  const segments = new URL(url).pathname.split('/').filter(Boolean);
  const index = segments.indexOf('industry');
  return index >= 0 && index < segments.length - 1;
}

function decodeXmlText(value) {
  return value
    .trim()
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function withCacheBuster(rawUrl, stamp) {
  const parsed = new URL(rawUrl);
  parsed.searchParams.set('v', String(stamp));
  return parsed.href;
}

async function fetchWithRetry(
  url,
  init = {},
  { fetchImpl = globalThis.fetch, retries = 2, retryDelayMs = 500, timeoutMs = 15_000 } = {}
) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        ...init,
        headers: { 'user-agent': 'FastGPT-IndexNow-CI/1.0', ...init.headers },
        signal: AbortSignal.timeout(timeoutMs)
      });
      if (response.ok) return response;
      const detail = (await response.text().catch(() => '')).slice(0, 200);
      const error = new Error(`HTTP ${response.status}${detail ? `: ${detail}` : ''}`);
      error.status = response.status;
      if (response.status !== 429 && response.status < 500) {
        error.nonRetryable = true;
      }
      throw error;
    } catch (error) {
      lastError = error;
      if (error.nonRetryable || attempt >= retries) break;
      await sleep(retryDelayMs * 2 ** attempt);
    }
  }
  throw lastError;
}

async function loadSitemap(readXml, baseUrl) {
  const { origin, hostname: host } = new URL(baseUrl);
  const rootXml = await readXml(`${origin}/sitemap.xml`);
  let urlsetXmls = [rootXml];

  if (/<sitemapindex\b/i.test(rootXml)) {
    const shardUrls = [];
    for (const match of rootXml.matchAll(/<sitemap\b[\s\S]*?<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)) {
      const shardUrl = decodeXmlText(match[1]);
      if (new URL(shardUrl).origin !== origin) {
        throw new Error(`Sitemap shard uses another origin: ${shardUrl}`);
      }
      shardUrls.push(shardUrl);
    }
    if (!shardUrls.length) throw new Error(`Sitemap index has no shards for ${origin}`);
    urlsetXmls = await Promise.all(shardUrls.map((shardUrl) => readXml(shardUrl)));
  }

  const entries = {};
  for (const xml of urlsetXmls) {
    for (const match of xml.matchAll(/<url\b[\s\S]*?<\/url>/gi)) {
      const block = match[0];
      const locMatch = block.match(/<loc\b[^>]*>([\s\S]*?)<\/loc>/i);
      if (!locMatch) continue;
      const loc = decodeXmlText(locMatch[1]);
      if (!isEligibleUrl(loc, host)) continue;
      const lastmodMatch = block.match(/<lastmod\b[^>]*>([\s\S]*?)<\/lastmod>/i);
      entries[loc] = lastmodMatch ? decodeXmlText(lastmodMatch[1]) : null;
    }
  }
  return entries;
}

function diffSitemaps(before = {}, after = {}) {
  const added = [];
  const modified = [];
  const removed = [];
  for (const [url, lastmod] of Object.entries(after)) {
    if (!Object.hasOwn(before, url)) added.push(url);
    else if (lastmod && lastmod !== before[url]) modified.push(url);
  }
  for (const url of Object.keys(before)) {
    if (!Object.hasOwn(after, url)) removed.push(url);
  }
  return { added, modified, removed };
}

function selectPrioritizedUrls(urls, host) {
  const seen = new Set();
  const eligible = [];
  for (const rawUrl of urls) {
    const url = String(rawUrl || '').trim();
    if (!url || seen.has(url) || !isEligibleUrl(url, host)) continue;
    seen.add(url);
    eligible.push(url);
  }
  eligible.sort((left, right) => (isIndustryUrl(left) ? 1 : 0) - (isIndustryUrl(right) ? 1 : 0));
  const capped = eligible.slice(0, MAX_URLS);
  return { urls: capped, total: eligible.length, truncated: eligible.length - capped.length };
}

async function postIndexNow({
  host,
  key,
  keyLocation,
  urls,
  endpoint = INDEXNOW_ENDPOINT,
  dryRun = false,
  ...fetchOpts
}) {
  if (!urls.length) return { status: 'skipped', planned: 0, submitted: 0, httpStatus: null };
  if (urls.length > MAX_URLS) {
    throw new Error(`IndexNow single batch limit is ${MAX_URLS}, received ${urls.length}`);
  }
  if (dryRun) return { status: 'dry-run', planned: urls.length, submitted: 0, httpStatus: null };

  try {
    const response = await fetchWithRetry(
      endpoint,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host, key, keyLocation, urlList: urls })
      },
      { retryDelayMs: 1_000, ...fetchOpts }
    );
    return { status: 'submitted', planned: urls.length, submitted: urls.length, httpStatus: response.status };
  } catch (error) {
    return {
      status: 'failed',
      planned: urls.length,
      submitted: 0,
      httpStatus: error.status ?? null,
      error: error.message
    };
  }
}

async function main(argv = process.argv.slice(2), deps = {}) {
  const { values } = parseArgs({
    args: argv,
    strict: true,
    allowPositionals: false,
    options: {
      snapshot: { type: 'boolean' },
      diff: { type: 'boolean' },
      submit: { type: 'boolean' },
      variant: { type: 'string' },
      out: { type: 'string' },
      'out-dir': { type: 'string' },
      before: { type: 'string' },
      urls: { type: 'string' },
      'dry-run': { type: 'boolean' }
    }
  });

  const modes = ['snapshot', 'diff', 'submit'].filter((name) => values[name]);
  if (modes.length !== 1) throw new Error('Specify exactly one mode: --snapshot, --diff, or --submit');
  const mode = modes[0];
  if (!Object.hasOwn(INDEXNOW_KEYS, values.variant || '')) {
    throw new Error(`--variant must be one of: ${Object.keys(INDEXNOW_KEYS).join(', ')}`);
  }

  const key = INDEXNOW_KEYS[values.variant];
  const baseUrl = getProductionBaseUrls()[values.variant];
  const host = new URL(baseUrl).hostname;
  const keyLocation = `${baseUrl}/${key}.txt`;

  if (mode === 'snapshot') {
    if (!values.out) throw new Error('--snapshot requires --out <file>');
    const stamp = deps.stamp ?? Date.now();
    const readRemote = async (url) => {
      const response = await fetchWithRetry(
        withCacheBuster(url, stamp),
        { method: 'GET', cache: 'no-store', headers: { 'cache-control': 'no-cache' } },
        deps
      );
      return response.text();
    };
    const snapshot = await loadSitemap(readRemote, baseUrl);
    const outPath = path.resolve(values.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
    console.log(`[indexnow] snapshot variant=${values.variant} urls=${Object.keys(snapshot).length}`);
    return 0;
  }

  let selected;
  if (mode === 'diff') {
    if (!values['out-dir'] || !values.before) {
      throw new Error('--diff requires --out-dir <dir> and --before <file>');
    }
    const beforePath = path.resolve(values.before);
    const before = JSON.parse(fs.readFileSync(beforePath, 'utf8'));
    if (!before || typeof before !== 'object' || Array.isArray(before)) {
      throw new Error(`Invalid pre-deploy snapshot: ${beforePath}`);
    }
    const resolvedOut = path.resolve(values['out-dir']);
    const after = await loadSitemap(
      (url) => fs.readFileSync(path.join(resolvedOut, new URL(url).pathname.replace(/^\/+/, '')), 'utf8'),
      baseUrl
    );
    const diff = diffSitemaps(before, after);
    selected = selectPrioritizedUrls([...diff.added, ...diff.modified, ...diff.removed], host);
  } else {
    if (!values.urls) throw new Error('--submit requires --urls "..."');
    const list = values.urls.split(/[\s,]+/).filter(Boolean);
    if (!list.length) throw new Error('--urls must contain at least one URL');
    const invalid = list.filter((entry) => !isEligibleUrl(entry, host));
    if (invalid.length) {
      throw new Error(`Invalid or out-of-scope URL(s) for ${host}: ${invalid.slice(0, 5).join(', ')}`);
    }
    selected = selectPrioritizedUrls(list, host);
  }

  const result = await postIndexNow({
    host,
    key,
    keyLocation,
    urls: selected.urls,
    dryRun: Boolean(values['dry-run']),
    ...deps
  });

  if (selected.truncated > 0) {
    console.warn(`[indexnow] truncated ${selected.truncated} URL(s) above limit=${MAX_URLS} (total=${selected.total})`);
  }
  console.log(
    `[indexnow] variant=${values.variant} mode=${mode} status=${result.status} planned=${result.planned} submitted=${result.submitted} truncated=${selected.truncated}`
  );
  for (const sample of selected.urls.slice(0, 10)) {
    console.log(`  - ${sample}`);
  }

  if (result.status === 'failed') {
    console.error(`[indexnow] submit failed for ${host}: ${result.error}`);
    return 1;
  }
  return 0;
}

if (require.main === module) {
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      console.error(`[indexnow] ${error.message}`);
      process.exitCode = 1;
    }
  );
}

module.exports = {
  INDEXNOW_ENDPOINT,
  diffSitemaps,
  loadSitemap,
  main,
  postIndexNow
};
