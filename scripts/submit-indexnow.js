#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const indexnowKeys = require('../src/config/indexnow.json');
const { getProductionBaseUrls } = require('./lib/site-variant');
const { bucketForLoc, parseSitemapIndex, parseUrlset } = require('./split-sitemap');

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_BATCH = 10_000;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function sleep(ms) {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

function isEligibleUrl(rawUrl, host) {
  try {
    const parsed = new URL(String(rawUrl).trim());
    if (parsed.protocol !== 'https:' || parsed.hostname !== host || parsed.search || parsed.hash) {
      return false;
    }
    const pathname = parsed.pathname.toLowerCase();
    if (/^\/(?:[a-z]{2}(?:-[a-z0-9]+)?\/)?ads(?:\/|$)/.test(pathname)) return false;
    if (pathname === '/_next' || pathname.startsWith('/_next/')) return false;
    return !/\.(?:txt|xml|json|md|gz|ico|png|svg|jpe?g|webp|avif|gif|js|css|woff2?|map)$/.test(
      pathname
    );
  } catch {
    return false;
  }
}

function withCacheBuster(rawUrl, stamp) {
  const parsed = new URL(rawUrl);
  parsed.searchParams.set('v', String(stamp));
  return parsed.href;
}

function extractLastmods(xml, site, host) {
  const { entries } = parseUrlset(xml, site);
  const result = {};
  for (const entry of entries) {
    if (!isEligibleUrl(entry.loc, host)) continue;
    const match = entry.xml.match(/<lastmod\b[^>]*>([^<]+)<\/lastmod>/i);
    result[entry.loc] = match ? match[1].trim() : null;
  }
  return result;
}

async function fetchText(
  url,
  { fetchImpl = globalThis.fetch, retries = 2, retryDelayMs = 500, timeoutMs = 15_000 } = {}
) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'cache-control': 'no-cache',
          'user-agent': 'FastGPT-IndexNow-CI/1.0'
        },
        signal: AbortSignal.timeout(timeoutMs)
      });
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`HTTP ${response.status} fetching ${url}`);
      }
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status} fetching ${url}`);
        error.nonRetryable = true;
        throw error;
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (error.nonRetryable || attempt >= retries) break;
      await sleep(retryDelayMs * 2 ** attempt);
    }
  }
  throw lastError;
}

async function fetchLiveSitemap(baseUrl, options = {}) {
  const origin = new URL(baseUrl).origin;
  const host = new URL(baseUrl).hostname;
  const stamp = options.stamp ?? Date.now();
  const rootXml = await fetchText(withCacheBuster(`${origin}/sitemap.xml`, stamp), options);

  if (!/<sitemapindex\b/.test(rootXml)) {
    return extractLastmods(rootXml, origin, host);
  }

  const shardUrls = parseSitemapIndex(rootXml, origin);
  const shardXmls = await Promise.all(
    shardUrls.map((shardUrl) => fetchText(withCacheBuster(shardUrl, stamp), options))
  );
  const entries = {};
  for (const xml of shardXmls) {
    Object.assign(entries, extractLastmods(xml, origin, host));
  }
  return entries;
}

function readLocalSitemap(outDir, baseUrl) {
  const resolvedOut = path.resolve(outDir);
  const origin = new URL(baseUrl).origin;
  const host = new URL(baseUrl).hostname;
  const rootXml = fs.readFileSync(path.join(resolvedOut, 'sitemap.xml'), 'utf8');

  if (!/<sitemapindex\b/.test(rootXml)) {
    return extractLastmods(rootXml, origin, host);
  }

  const entries = {};
  for (const shardUrl of parseSitemapIndex(rootXml, origin)) {
    const relPath = new URL(shardUrl).pathname.replace(/^\/+/, '');
    const shardPath = path.resolve(resolvedOut, relPath);
    if (!shardPath.startsWith(`${resolvedOut}${path.sep}`)) {
      throw new Error(`Refusing shard path outside outDir: ${relPath}`);
    }
    Object.assign(entries, extractLastmods(fs.readFileSync(shardPath, 'utf8'), origin, host));
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

function prioritizeAndCap(urls, host, limit = MAX_URLS_PER_BATCH) {
  const seen = new Set();
  const eligible = [];
  for (const rawUrl of urls) {
    const url = String(rawUrl || '').trim();
    if (!url || seen.has(url) || !isEligibleUrl(url, host)) continue;
    seen.add(url);
    eligible.push(url);
  }

  eligible.sort(
    (left, right) =>
      (bucketForLoc(left) === 'industry' ? 1 : 0) - (bucketForLoc(right) === 'industry' ? 1 : 0)
  );

  const cap = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 0;
  const capped = cap > 0 ? eligible.slice(0, cap) : eligible;
  return { urls: capped, total: eligible.length, truncated: eligible.length - capped.length };
}

function selectSubmitUrls({ since, urls, entries = {}, host, limit = MAX_URLS_PER_BATCH }) {
  if (urls !== undefined) {
    const list = (Array.isArray(urls) ? urls : String(urls).split(/[\s,]+/))
      .map((entry) => entry.trim())
      .filter(Boolean);
    if (!list.length) throw new Error('--urls must contain at least one URL');
    const invalid = list.filter((entry) => !isEligibleUrl(entry, host));
    if (invalid.length) {
      throw new Error(`Invalid or out-of-scope URL(s) for ${host}: ${invalid.slice(0, 5).join(', ')}`);
    }
    return prioritizeAndCap(list, host, limit);
  }

  if (since !== undefined) {
    const cutoff = String(since).trim();
    if (!ISO_DATE_RE.test(cutoff)) {
      throw new Error(`Invalid --since "${since}": expected YYYY-MM-DD`);
    }
    const matched = Object.entries(entries)
      .filter(([, lastmod]) => typeof lastmod === 'string' && lastmod.slice(0, 10) >= cutoff)
      .sort(([, left], [, right]) => (right || '').slice(0, 10).localeCompare((left || '').slice(0, 10)))
      .map(([url]) => url);
    return prioritizeAndCap(matched, host, limit);
  }

  throw new Error('--submit requires --since YYYY-MM-DD or --urls "..."');
}

async function postIndexNow({
  host,
  key,
  keyLocation,
  urls,
  endpoint = INDEXNOW_ENDPOINT,
  dryRun = false,
  fetchImpl = globalThis.fetch,
  retries = 2,
  retryDelayMs = 1_000,
  timeoutMs = 15_000
}) {
  if (!urls.length) return { status: 'skipped', planned: 0, submitted: 0, statuses: [] };
  if (dryRun) return { status: 'dry-run', planned: urls.length, submitted: 0, statuses: [] };

  let submitted = 0;
  const statuses = [];
  for (let offset = 0; offset < urls.length; offset += MAX_URLS_PER_BATCH) {
    const batch = urls.slice(offset, offset + MAX_URLS_PER_BATCH);
    let batchStatus = null;
    let lastError = null;
    let ok = false;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const response = await fetchImpl(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'user-agent': 'FastGPT-IndexNow-CI/1.0'
          },
          body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
          signal: AbortSignal.timeout(timeoutMs)
        });
        batchStatus = response.status;
        if (response.status >= 200 && response.status < 300) {
          ok = true;
          submitted += batch.length;
          break;
        }
        const detail = (await response.text().catch(() => '')).slice(0, 200);
        lastError = `HTTP ${response.status}${detail ? `: ${detail}` : ''}`;
        if (response.status !== 429 && response.status < 500) break;
      } catch (error) {
        batchStatus = null;
        lastError = error.message;
      }
      if (attempt < retries) await sleep(retryDelayMs * 2 ** attempt);
    }

    statuses.push(batchStatus);
    if (!ok) {
      return { status: 'failed', planned: urls.length, submitted, statuses, error: lastError };
    }
  }

  return { status: 'submitted', planned: urls.length, submitted, statuses };
}

function parseArgs(argv) {
  const options = {
    mode: undefined,
    variant: undefined,
    out: undefined,
    outDir: undefined,
    before: undefined,
    since: undefined,
    urls: undefined,
    limit: MAX_URLS_PER_BATCH,
    dryRun: false,
    softFail: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const readVal = () => {
      const value = argv[++index];
      if (value === undefined || value.startsWith('--')) {
        throw new Error(`${token} requires a value`);
      }
      return value;
    };

    if (token === '--snapshot' || token === '--diff' || token === '--submit') {
      if (options.mode) throw new Error(`Conflicting modes: --${options.mode} and ${token}`);
      options.mode = token.slice(2);
    } else if (token === '--variant') options.variant = readVal();
    else if (token === '--out') options.out = readVal();
    else if (token === '--out-dir') options.outDir = readVal();
    else if (token === '--before') options.before = readVal();
    else if (token === '--since') options.since = readVal();
    else if (token === '--urls') options.urls = readVal();
    else if (token === '--limit') options.limit = Number(readVal());
    else if (token === '--dry-run') options.dryRun = true;
    else if (token === '--soft-fail') options.softFail = true;
    else throw new Error(`Unknown argument: ${token}`);
  }

  return options;
}

async function main(argv = process.argv.slice(2), deps = {}) {
  const options = parseArgs(argv);
  if (!options.mode) throw new Error('Specify one mode: --snapshot, --diff, or --submit');
  if (!Object.hasOwn(indexnowKeys, options.variant || '')) {
    throw new Error(`--variant must be one of: ${Object.keys(indexnowKeys).join(', ')}`);
  }

  const key = indexnowKeys[options.variant];
  const baseUrl = getProductionBaseUrls()[options.variant];
  const host = new URL(baseUrl).hostname;
  const keyLocation = `${baseUrl}/${key}.txt`;
  const failOrWarn = (message) => {
    if (options.softFail) {
      console.warn(`::warning::${message}`);
      return 0;
    }
    console.error(message);
    return 1;
  };

  if (options.mode === 'snapshot') {
    if (!options.out) throw new Error('--snapshot requires --out <file>');
    try {
      const snapshot = await fetchLiveSitemap(baseUrl, deps);
      const outPath = path.resolve(options.out);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
      console.log(`[indexnow] snapshot variant=${options.variant} urls=${Object.keys(snapshot).length}`);
      return 0;
    } catch (error) {
      return failOrWarn(`[indexnow] snapshot failed for ${baseUrl}: ${error.message}`);
    }
  }

  let selected;
  if (options.mode === 'diff') {
    if (!options.outDir || !options.before) {
      throw new Error('--diff requires --out-dir <dir> and --before <file>');
    }
    const beforePath = path.resolve(options.before);
    if (!fs.existsSync(beforePath)) {
      console.warn(`[indexnow] Missing pre-deploy snapshot ${beforePath}; skipping diff submission`);
      return 0;
    }
    let before;
    try {
      before = JSON.parse(fs.readFileSync(beforePath, 'utf8'));
    } catch (error) {
      console.warn(`[indexnow] Unreadable pre-deploy snapshot ${beforePath} (${error.message}); skipping`);
      return 0;
    }
    if (!before || typeof before !== 'object' || Array.isArray(before)) {
      console.warn(`[indexnow] Invalid pre-deploy snapshot ${beforePath}; skipping`);
      return 0;
    }
    const after = readLocalSitemap(options.outDir, baseUrl);
    const diff = diffSitemaps(before, after);
    selected = prioritizeAndCap(
      [...diff.added, ...diff.modified, ...diff.removed],
      host,
      options.limit
    );
  } else {
    const entries =
      options.urls !== undefined
        ? {}
        : options.outDir
          ? readLocalSitemap(options.outDir, baseUrl)
          : await fetchLiveSitemap(baseUrl, deps);
    selected = selectSubmitUrls({
      since: options.since,
      urls: options.urls,
      entries,
      host,
      limit: options.limit
    });
  }

  const result = await postIndexNow({
    host,
    key,
    keyLocation,
    urls: selected.urls,
    dryRun: options.dryRun,
    ...deps
  });

  if (selected.truncated > 0) {
    console.warn(
      `[indexnow] truncated ${selected.truncated} URL(s) above limit=${options.limit} (total=${selected.total})`
    );
  }
  console.log(
    `[indexnow] variant=${options.variant} mode=${options.mode} status=${result.status} planned=${result.planned} submitted=${result.submitted} truncated=${selected.truncated}`
  );
  if (selected.urls.length) {
    for (const sample of selected.urls.slice(0, 10)) {
      console.log(`  - ${sample}`);
    }
  }

  if (result.status === 'failed') {
    return failOrWarn(`[indexnow] submit failed for ${host}: ${result.error}`);
  }
  return 0;
}

if (require.main === module) {
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      if (process.argv.includes('--soft-fail')) {
        console.warn(`::warning::[indexnow] ${error.message}`);
        process.exitCode = 0;
      } else {
        console.error(`[indexnow] ${error.message}`);
        process.exitCode = 1;
      }
    }
  );
}

module.exports = {
  INDEXNOW_ENDPOINT,
  MAX_URLS_PER_BATCH,
  diffSitemaps,
  extractLastmods,
  fetchLiveSitemap,
  isEligibleUrl,
  main,
  parseArgs,
  postIndexNow,
  prioritizeAndCap,
  readLocalSitemap,
  selectSubmitUrls,
  withCacheBuster
};
