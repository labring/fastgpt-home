const fs = require('node:fs');
const path = require('node:path');
const { DOMParser } = require('@xmldom/xmldom');
const indexnowConfig = require('../../src/config/indexnow.json');
const {
  getDefaultLocale,
  getProductionBaseUrls,
  getPublishedLocaleCodes,
  localeCodes
} = require('./site-variant');

const INDEXNOW_KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;
const ZERO_SHA = /^0+$/;
const GIT_SHA_PATTERN = /^[a-f0-9]{40}$/i;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CONTACT_PUBLISHED_LOCALES = ['en', 'zh', 'zh-hant'];
const FAQ_PUBLISHED_LOCALES = ['en', 'zh'];
const DISALLOWED_SUFFIXES = [
  '.txt',
  '.xml',
  '.json',
  '.md',
  '.gz',
  '.ico',
  '.png',
  '.svg',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.gif',
  '.js',
  '.css',
  '.woff',
  '.woff2',
  '.map'
];

/** Validate an IndexNow key against protocol character and length constraints. */
function validateIndexNowKey(key) {
  if (typeof key !== 'string' || !INDEXNOW_KEY_PATTERN.test(key)) {
    throw new Error(
      `Invalid IndexNow key "${String(key)}": expected 8-128 ASCII alphanumeric or hyphen characters`
    );
  }
  return key;
}

/** Return all configured variant keys across cn and io. */
function getConfiguredIndexNowKeys() {
  return Object.values(indexnowConfig.variants || {})
    .map((entry) => entry?.key)
    .filter((key) => typeof key === 'string' && key.length > 0);
}

/** Resolve active IndexNow runtime configuration for a Site Variant, or null when disabled. */
function resolveIndexNowConfig(variant, env = process.env) {
  if (!variant || !Object.hasOwn(indexnowConfig.variants, variant)) {
    return null;
  }

  const variantConfig = indexnowConfig.variants[variant];
  const envKeyName = `${variant.toUpperCase()}_INDEXNOW_KEY`;
  const rawKey =
    (env[envKeyName] && env[envKeyName].trim()) ||
    (env.INDEXNOW_KEY && env.INDEXNOW_KEY.trim()) ||
    variantConfig.key;
  const key = validateIndexNowKey(rawKey);

  const baseUrls = getProductionBaseUrls(env);
  const baseUrl = baseUrls[variant];
  const host = new URL(baseUrl).hostname;
  const keyFileName = `${key}.txt`;

  return {
    variant,
    baseUrl,
    host,
    key,
    keyFileName,
    keyLocation: `${baseUrl}/${keyFileName}`,
    endpoint: (env.INDEXNOW_ENDPOINT && env.INDEXNOW_ENDPOINT.trim()) || indexnowConfig.endpoint,
    maxBatchSize: indexnowConfig.maxBatchSize,
    defaultChunkSize: indexnowConfig.defaultChunkSize,
    defaultAutoLimit: indexnowConfig.defaultAutoLimit
  };
}

/** Emit the variant's root <key>.txt into outDir while removing stale/other variant key files. */
function emitIndexNowKeyFile(outDir, variant, env = process.env) {
  const keysToClean = new Set(getConfiguredIndexNowKeys());
  for (const envName of ['CN_INDEXNOW_KEY', 'IO_INDEXNOW_KEY', 'INDEXNOW_KEY']) {
    const candidate = env[envName]?.trim();
    if (candidate && INDEXNOW_KEY_PATTERN.test(candidate)) {
      keysToClean.add(candidate);
    }
  }

  for (const key of keysToClean) {
    fs.rmSync(path.join(outDir, `${key}.txt`), { force: true });
  }

  const config = resolveIndexNowConfig(variant, env);
  if (!config) {
    return { written: false, keyFileName: null, key: null };
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, config.keyFileName), config.key, 'utf8');
  return { written: true, keyFileName: config.keyFileName, key: config.key };
}

function getChildElements(node, localName) {
  const matches = [];
  if (!node?.childNodes) return matches;
  for (let index = 0; index < node.childNodes.length; index += 1) {
    const child = node.childNodes[index];
    if (child.nodeType !== 1) continue;
    if (child.localName === localName || child.nodeName === localName) {
      matches.push(child);
    }
  }
  return matches;
}

function getFirstChildText(node, localName) {
  const match = getChildElements(node, localName)[0];
  return match?.textContent ? match.textContent.trim() : '';
}

/** Parse a sitemapindex or urlset XML document scoped to expectedOrigin. */
function parseSitemapXml(xmlText, expectedOrigin) {
  if (typeof xmlText !== 'string' || !xmlText.trim()) {
    throw new Error('Sitemap XML payload is empty');
  }
  if (/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(xmlText)) {
    throw new Error('Sitemap XML must not contain DTD or entity declarations');
  }

  const errors = [];
  let doc;
  try {
    doc = new DOMParser({
      onError: (level, message) => errors.push(`${level}: ${message}`)
    }).parseFromString(xmlText, 'application/xml');
  } catch (error) {
    throw new Error(`Invalid sitemap XML: ${error.message || error}`);
  }

  const root = doc?.documentElement;
  if (!root || errors.length > 0) {
    throw new Error(`Invalid sitemap XML: ${errors[0] || 'missing document root'}`);
  }

  const normalizedOrigin = new URL(expectedOrigin).origin;
  const rootName = root.localName || root.nodeName;

  if (rootName === 'sitemapindex') {
    const shards = [];
    for (const sitemapNode of getChildElements(root, 'sitemap')) {
      const loc = getFirstChildText(sitemapNode, 'loc');
      if (!loc) continue;
      let parsed;
      try {
        parsed = new URL(loc);
      } catch {
        continue;
      }
      if (parsed.origin === normalizedOrigin) {
        shards.push(parsed.href);
      }
    }
    return { kind: 'index', shards };
  }

  if (rootName === 'urlset') {
    const entries = new Map();
    for (const urlNode of getChildElements(root, 'url')) {
      const loc = getFirstChildText(urlNode, 'loc');
      if (!loc) continue;
      let parsed;
      try {
        parsed = new URL(loc);
      } catch {
        continue;
      }
      if (parsed.origin !== normalizedOrigin) continue;
      const lastmod = getFirstChildText(urlNode, 'lastmod') || null;
      entries.set(parsed.href, { lastmod });
    }
    return { kind: 'urlset', entries };
  }

  throw new Error(`Unsupported sitemap root element <${rootName}>`);
}

/** Return true if a URL is an indexable HTML page on expectedHost eligible for IndexNow. */
function isEligibleIndexNowUrl(rawUrl, expectedHost) {
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) return false;
  let parsed;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return false;
  }

  if (parsed.protocol !== 'https:' || parsed.hostname !== expectedHost) return false;
  if (parsed.search || parsed.hash) return false;

  const pathname = parsed.pathname.toLowerCase();
  if (pathname === '/ads' || pathname.startsWith('/ads/')) return false;
  if (pathname === '/_next' || pathname.startsWith('/_next/')) return false;
  if (/^\/[a-z]{2}(?:-[a-z0-9]+)?\/ads(?:\/|$)/.test(pathname)) return false;

  for (const suffix of DISALLOWED_SUFFIXES) {
    if (pathname.endsWith(suffix)) return false;
  }

  return true;
}

/** Classify a URL into high-value 'content' or bulk 'industry' priority buckets. */
function bucketForUrl(rawUrl, shardName = '') {
  if (typeof shardName === 'string' && /sitemap-industry-/i.test(shardName)) {
    return 'industry';
  }
  try {
    const { pathname } = new URL(rawUrl);
    if (/^\/(?:[a-z]{2}(?:-[a-z]+)?\/)?industry(?:\/|$)/i.test(pathname)) {
      return 'industry';
    }
  } catch {
    // Fall through to content bucket on invalid URLs (filtered separately).
  }
  return 'content';
}

function entriesObjectToMap(entriesOrObject) {
  if (entriesOrObject instanceof Map) return entriesOrObject;
  const map = new Map();
  if (!entriesOrObject || typeof entriesOrObject !== 'object') return map;
  for (const [url, meta] of Object.entries(entriesOrObject)) {
    map.set(url, {
      lastmod: meta?.lastmod || null,
      bucket: meta?.bucket || bucketForUrl(url)
    });
  }
  return map;
}

/** Load sitemap entries from a built static export directory (out/). */
function loadLocalSitemapEntries(outDir, baseUrl) {
  const resolvedOut = path.resolve(outDir);
  const origin = new URL(baseUrl).origin;
  const host = new URL(baseUrl).hostname;
  const indexPath = path.join(resolvedOut, 'sitemap.xml');

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Missing sitemap.xml in export directory: ${indexPath}`);
  }

  const parsedRoot = parseSitemapXml(fs.readFileSync(indexPath, 'utf8'), origin);
  const entries = new Map();

  const recordEntries = (urlsetEntries, shardName) => {
    for (const [url, meta] of urlsetEntries) {
      if (!isEligibleIndexNowUrl(url, host)) continue;
      entries.set(url, {
        lastmod: meta.lastmod || null,
        bucket: bucketForUrl(url, shardName)
      });
    }
  };

  if (parsedRoot.kind === 'urlset') {
    recordEntries(parsedRoot.entries, 'sitemap.xml');
    return { entries, shardCount: 1 };
  }

  for (const shardUrl of parsedRoot.shards) {
    const relativePath = new URL(shardUrl).pathname.replace(/^\/+/, '');
    const shardPath = path.resolve(resolvedOut, relativePath);
    if (!shardPath.startsWith(`${resolvedOut}${path.sep}`)) {
      throw new Error(`Refusing sitemap shard path outside outDir: ${relativePath}`);
    }
    if (!fs.existsSync(shardPath)) {
      throw new Error(`Missing local sitemap shard referenced by sitemap.xml: ${shardPath}`);
    }
    const parsedShard = parseSitemapXml(fs.readFileSync(shardPath, 'utf8'), origin);
    if (parsedShard.kind !== 'urlset') {
      throw new Error(`Expected <urlset> in shard ${relativePath}`);
    }
    recordEntries(parsedShard.entries, path.basename(shardPath));
  }

  return { entries, shardCount: parsedRoot.shards.length };
}

function sleep(ms) {
  if (!ms || ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchTextWithRetry(url, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const retries = options.retries ?? 2;
  const timeoutMs = options.timeoutMs ?? 15_000;
  const retryDelayMs = options.retryDelayMs ?? 400;
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        method: 'GET',
        cache: 'no-store',
        headers: { 'user-agent': 'FastGPT-IndexNow-CI/1.0' },
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

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function runWorker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }

  const workerCount = Math.min(Math.max(1, concurrency), Math.max(1, items.length));
  await Promise.all(Array.from({ length: workerCount }, () => runWorker()));
  return results;
}

/** Fetch and flatten the live sitemap (and all shards) for baseUrl into a JSON-safe snapshot. */
async function fetchLiveSitemapSnapshot(baseUrl, options = {}) {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const origin = new URL(normalizedBase).origin;
  const host = new URL(normalizedBase).hostname;
  const capturedAt = new Date().toISOString();

  try {
    const rootXml = await fetchTextWithRetry(`${normalizedBase}/sitemap.xml`, options);
    const parsedRoot = parseSitemapXml(rootXml, origin);
    const urls = {};

    const collect = (urlsetEntries, shardName) => {
      for (const [url, meta] of urlsetEntries) {
        if (!isEligibleIndexNowUrl(url, host)) continue;
        urls[url] = {
          lastmod: meta.lastmod || null,
          bucket: bucketForUrl(url, shardName)
        };
      }
    };

    if (parsedRoot.kind === 'urlset') {
      collect(parsedRoot.entries, 'sitemap.xml');
      return { ok: true, capturedAt, baseUrl: normalizedBase, host, shardCount: 1, urls };
    }

    const concurrency = options.concurrency ?? 4;
    const shardPayloads = await mapWithConcurrency(parsedRoot.shards, concurrency, async (shardUrl) => {
      const shardXml = await fetchTextWithRetry(shardUrl, options);
      const parsedShard = parseSitemapXml(shardXml, origin);
      if (parsedShard.kind !== 'urlset') {
        throw new Error(`Expected <urlset> in shard ${shardUrl}`);
      }
      return {
        shardName: path.basename(new URL(shardUrl).pathname),
        entries: parsedShard.entries
      };
    });

    for (const payload of shardPayloads) {
      collect(payload.entries, payload.shardName);
    }

    return {
      ok: true,
      capturedAt,
      baseUrl: normalizedBase,
      host,
      shardCount: parsedRoot.shards.length,
      urls
    };
  } catch (error) {
    return {
      ok: false,
      capturedAt,
      baseUrl: normalizedBase,
      host,
      shardCount: 0,
      urls: {},
      error: error.message
    };
  }
}

/** Compare two sitemap maps/objects and return added, modified, and removed URLs. */
function diffSitemapSnapshots(beforeEntries, afterEntries) {
  const beforeMap = entriesObjectToMap(beforeEntries);
  const afterMap = entriesObjectToMap(afterEntries);

  const added = [];
  const modified = [];
  const removed = [];

  for (const [url, afterMeta] of afterMap) {
    const beforeMeta = beforeMap.get(url);
    if (!beforeMeta) {
      added.push(url);
      continue;
    }
    if (afterMeta?.lastmod && afterMeta.lastmod !== beforeMeta.lastmod) {
      modified.push(url);
    }
  }

  for (const url of beforeMap.keys()) {
    if (!afterMap.has(url)) {
      removed.push(url);
    }
  }

  return { added, modified, removed };
}

function buildOwnedLocaleUrl(locale, routePath, defaultLocale, baseUrl) {
  const normalizedPath = !routePath || routePath === '/' ? '' : routePath.replace(/\/$/, '');
  if (locale === defaultLocale) {
    return `${baseUrl}${normalizedPath || '/'}`;
  }
  return `${baseUrl}/${locale}${normalizedPath}`;
}

/** Map git-changed source paths to owned core no-lastmod URLs for the target variant. */
function mapGitChangedFilesToCoreUrls(changedFiles, variant, baseUrl, afterEntries = null) {
  if (!Array.isArray(changedFiles) || !changedFiles.length) return [];
  if (!['cn', 'io'].includes(variant)) return [];

  const normalizedBase = baseUrl.replace(/\/$/, '');
  const host = new URL(normalizedBase).hostname;
  const defaultLocale = getDefaultLocale(variant);
  const ownedLocales = getPublishedLocaleCodes(variant);
  const afterMap = afterEntries ? entriesObjectToMap(afterEntries) : null;
  const candidates = new Set();

  const addOwnedRouteForLocales = (routePath, locales) => {
    for (const locale of locales) {
      if (!ownedLocales.includes(locale)) continue;
      candidates.add(buildOwnedLocaleUrl(locale, routePath, defaultLocale, normalizedBase));
    }
  };

  for (const rawFile of changedFiles) {
    const file = String(rawFile || '').trim().replaceAll('\\', '/');
    if (!file) continue;

    if (
      file === 'src/app/page.tsx' ||
      file === 'src/app/[lang]/page.tsx' ||
      file.startsWith('src/components/home/') ||
      file === 'src/config/site.ts'
    ) {
      addOwnedRouteForLocales('', ownedLocales);
      continue;
    }

    const localeFileMatch = file.match(/^src\/locales\/([^/]+)\.json$/);
    if (localeFileMatch) {
      const locale = localeFileMatch[1];
      if (localeCodes.includes(locale) && ownedLocales.includes(locale)) {
        addOwnedRouteForLocales('', [locale]);
        addOwnedRouteForLocales('/price', [locale]);
      }
      continue;
    }

    if (
      file.startsWith('src/app/price/') ||
      file.startsWith('src/app/[lang]/price/') ||
      file.startsWith('src/components/price/')
    ) {
      addOwnedRouteForLocales('/price', ownedLocales);
      continue;
    }

    if (
      file.startsWith('src/app/contact/') ||
      file.startsWith('src/app/[lang]/contact/') ||
      file.startsWith('src/components/contact/')
    ) {
      addOwnedRouteForLocales('/contact', CONTACT_PUBLISHED_LOCALES);
      continue;
    }

    if (
      file === 'src/app/faq/page.tsx' ||
      file === 'src/app/[lang]/faq/page.tsx' ||
      file.startsWith('src/components/faq/')
    ) {
      addOwnedRouteForLocales('/faq', FAQ_PUBLISHED_LOCALES);
      continue;
    }

    if (
      variant === 'cn' &&
      (file.startsWith('src/app/videos/') || file.startsWith('src/components/learning-center/'))
    ) {
      addOwnedRouteForLocales('/videos', ['zh']);
      continue;
    }

    if (variant === 'cn' && (file.startsWith('src/app/wiki/') || file.startsWith('src/content/wiki/'))) {
      addOwnedRouteForLocales('/wiki', ['zh']);
      continue;
    }

    if (file === 'src/app/layout.tsx' || file === 'src/styles/globals.css') {
      candidates.add(`${normalizedBase}/`);
    }
  }

  return [...candidates].filter((url) => {
    if (!isEligibleIndexNowUrl(url, host)) return false;
    if (afterMap) return afterMap.has(url);
    return true;
  });
}

function compareByLastmodDescThenLexical(afterMap, leftUrl, rightUrl) {
  const leftDate = parseIsoDatePrefix(afterMap.get(leftUrl)?.lastmod) || '';
  const rightDate = parseIsoDatePrefix(afterMap.get(rightUrl)?.lastmod) || '';
  if (leftDate !== rightDate) {
    return rightDate < leftDate ? -1 : 1;
  }
  return leftUrl < rightUrl ? -1 : leftUrl > rightUrl ? 1 : 0;
}

function parseIsoDatePrefix(value) {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

/** Deduplicate, filter, prioritize (content before industry), and cap candidate URLs. */
function filterAndPrioritizeUrls({
  added = [],
  modified = [],
  removed = [],
  gitCoreUrls = [],
  afterEntries = {},
  host,
  maxUrls = indexnowConfig.defaultAutoLimit
}) {
  const afterMap = entriesObjectToMap(afterEntries);
  const seen = new Set();

  const contentOrdered = [];
  const industryOrdered = [];

  const pushGroup = (urls, sortIndustryByLastmod = false) => {
    const contentGroup = [];
    const industryGroup = [];

    for (const url of urls) {
      if (!isEligibleIndexNowUrl(url, host) || seen.has(url)) continue;
      seen.add(url);
      const bucket = afterMap.get(url)?.bucket || bucketForUrl(url);
      if (bucket === 'industry') industryGroup.push(url);
      else contentGroup.push(url);
    }

    if (sortIndustryByLastmod) {
      industryGroup.sort((left, right) => compareByLastmodDescThenLexical(afterMap, left, right));
    }

    contentOrdered.push(...contentGroup);
    industryOrdered.push(...industryGroup);
  };

  pushGroup(added, true);
  pushGroup(modified, true);
  pushGroup(gitCoreUrls, false);
  pushGroup(removed, false);

  const ordered = [...contentOrdered, ...industryOrdered];
  const totalCandidates = ordered.length;
  const limit = Number.isFinite(maxUrls) && maxUrls > 0 ? Math.floor(maxUrls) : 0;
  const urls = limit > 0 ? ordered.slice(0, limit) : ordered;

  return {
    urls,
    totalCandidates,
    truncatedCount: Math.max(0, totalCandidates - urls.length)
  };
}

/** Select URLs for manual backfill modes: recent, content, urls, or all. */
function selectBackfillUrls({
  mode,
  afterEntries = {},
  host,
  sinceDays = 45,
  sinceDate = '',
  explicitUrls = [],
  maxUrls = 0,
  now = new Date()
}) {
  const afterMap = entriesObjectToMap(afterEntries);

  if (mode === 'urls') {
    const rawList = Array.isArray(explicitUrls)
      ? explicitUrls
      : String(explicitUrls || '').split(/[\s,]+/);
    const seen = new Set();
    const invalidUrls = [];
    const validUrls = [];

    for (const candidate of rawList) {
      const trimmed = String(candidate || '').trim();
      if (!trimmed) continue;
      if (!isEligibleIndexNowUrl(trimmed, host)) {
        invalidUrls.push(trimmed);
        continue;
      }
      if (!seen.has(trimmed)) {
        seen.add(trimmed);
        validUrls.push(trimmed);
      }
    }

    if (invalidUrls.length > 0) {
      throw new Error(
        `Invalid or out-of-scope IndexNow URL(s) for host ${host}: ${invalidUrls.slice(0, 5).join(', ')}`
      );
    }

    const limit = Number.isFinite(maxUrls) && maxUrls > 0 ? Math.floor(maxUrls) : 0;
    const urls = limit > 0 ? validUrls.slice(0, limit) : validUrls;
    return {
      urls,
      totalCandidates: validUrls.length,
      truncatedCount: Math.max(0, validUrls.length - urls.length),
      cutoffDate: null
    };
  }

  let cutoffDate = null;
  let candidates = [];

  if (mode === 'recent') {
    if (sinceDate) {
      if (!ISO_DATE_PATTERN.test(sinceDate.trim())) {
        throw new Error(`Invalid --since-date "${sinceDate}": expected YYYY-MM-DD`);
      }
      cutoffDate = sinceDate.trim();
    } else {
      const days = Number(sinceDays);
      if (!Number.isFinite(days) || days < 0) {
        throw new Error(`Invalid --since-days "${sinceDays}": expected a non-negative number`);
      }
      cutoffDate = new Date(now.getTime() - days * 86_400_000).toISOString().slice(0, 10);
    }

    for (const [url, meta] of afterMap) {
      if (!isEligibleIndexNowUrl(url, host)) continue;
      const datePrefix = parseIsoDatePrefix(meta?.lastmod);
      if (datePrefix && datePrefix >= cutoffDate) {
        candidates.push(url);
      }
    }
  } else if (mode === 'content') {
    for (const [url, meta] of afterMap) {
      if (!isEligibleIndexNowUrl(url, host)) continue;
      if ((meta?.bucket || bucketForUrl(url)) === 'content') {
        candidates.push(url);
      }
    }
  } else if (mode === 'all') {
    for (const url of afterMap.keys()) {
      if (isEligibleIndexNowUrl(url, host)) {
        candidates.push(url);
      }
    }
  } else {
    throw new Error(`Unsupported backfill mode: ${mode}`);
  }

  const prioritized = filterAndPrioritizeUrls({
    added: candidates,
    afterEntries: afterMap,
    host,
    maxUrls
  });

  return {
    ...prioritized,
    cutoffDate
  };
}

/** Verify the live hosted <key>.txt returns HTTP 200 text/plain with exact key body. */
async function verifyLiveKeyFile(config, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const retries = options.retries ?? 5;
  const delayMs = options.delayMs ?? 5_000;
  const timeoutMs = options.timeoutMs ?? 10_000;

  let lastStatus = null;
  let lastError = 'Key verification did not run';

  for (let attempt = 1; attempt <= retries + 1; attempt += 1) {
    try {
      const response = await fetchImpl(config.keyLocation, {
        method: 'GET',
        cache: 'no-store',
        headers: { 'user-agent': 'FastGPT-IndexNow-CI/1.0' },
        signal: AbortSignal.timeout(timeoutMs)
      });
      lastStatus = response.status;
      const contentType = response.headers.get('content-type') || '';
      const body = (await response.text()).trim();

      if (response.status === 200 && /text\/plain/i.test(contentType) && body === config.key) {
        return { ok: true, attempts: attempt, status: response.status };
      }

      if (response.status === 200) {
        lastError = `Unexpected key file response (content-type="${contentType}", bodyLength=${body.length})`;
      } else {
        lastError = `HTTP ${response.status} from ${config.keyLocation}`;
      }
    } catch (error) {
      lastStatus = null;
      lastError = error.message;
    }

    if (attempt <= retries) {
      await sleep(delayMs);
    }
  }

  return { ok: false, attempts: retries + 1, status: lastStatus, error: lastError };
}

function parseRetryAfterMs(response, maxWaitMs) {
  const header = response?.headers?.get?.('retry-after');
  if (!header) return null;
  if (/^\d+$/.test(header.trim())) {
    return Math.min(Number(header.trim()) * 1000, maxWaitMs);
  }
  return null;
}

/** Submit prioritized URLs to IndexNow in bounded batches with retry/backoff. */
async function submitToIndexNow({
  config,
  urls,
  mode = 'diff',
  dryRun = false,
  chunkSize = config.defaultChunkSize,
  maxRetries = 3,
  baseDelayMs = 1_000,
  batchDelayMs = 1_500,
  maxRetryAfterMs = 30_000,
  fetchImpl = globalThis.fetch
}) {
  const timestamp = new Date().toISOString();
  const effectiveChunkSize = Math.min(
    Math.max(1, Number(chunkSize) || config.defaultChunkSize),
    config.maxBatchSize
  );
  const batches = [];
  for (let offset = 0; offset < urls.length; offset += effectiveChunkSize) {
    batches.push(urls.slice(offset, offset + effectiveChunkSize));
  }

  const baseReceipt = {
    schemaVersion: 1,
    timestamp,
    variant: config.variant,
    host: config.host,
    mode,
    endpoint: config.endpoint,
    keyLocation: config.keyLocation,
    dryRun: Boolean(dryRun),
    counts: {
      submitted: 0,
      planned: urls.length,
      batches: batches.length
    },
    batches: [],
    sampleUrls: urls.slice(0, 20)
  };

  if (urls.length === 0) {
    return {
      ...baseReceipt,
      outcome: 'skipped-empty'
    };
  }

  if (dryRun) {
    return {
      ...baseReceipt,
      batches: batches.map((batch, index) => ({
        index: index + 1,
        count: batch.length,
        status: null,
        attempts: 0,
        ok: true,
        dryRun: true
      })),
      outcome: 'dry-run'
    };
  }

  const batchResults = [];
  let submittedCount = 0;
  let allOk = true;

  for (let index = 0; index < batches.length; index += 1) {
    const batch = batches[index];
    let attempts = 0;
    let status = null;
    let ok = false;
    let errorMessage = null;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      attempts = attempt + 1;
      try {
        const response = await fetchImpl(config.endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'user-agent': 'FastGPT-IndexNow-CI/1.0'
          },
          body: JSON.stringify({
            host: config.host,
            key: config.key,
            keyLocation: config.keyLocation,
            urlList: batch
          }),
          signal: AbortSignal.timeout(15_000)
        });
        status = response.status;

        if (response.status >= 200 && response.status < 300) {
          ok = true;
          errorMessage = null;
          submittedCount += batch.length;
          break;
        }

        const responseText = (await response.text().catch(() => '')).slice(0, 300);
        errorMessage = `HTTP ${response.status}${responseText ? `: ${responseText}` : ''}`;

        const retryable = response.status === 429 || response.status >= 500;
        if (!retryable || attempt >= maxRetries) {
          break;
        }

        const retryAfterMs = parseRetryAfterMs(response, maxRetryAfterMs);
        const waitMs = retryAfterMs !== null ? retryAfterMs : baseDelayMs * 2 ** attempt;
        await sleep(waitMs);
      } catch (error) {
        status = null;
        errorMessage = error.message;
        if (attempt >= maxRetries) break;
        await sleep(baseDelayMs * 2 ** attempt);
      }
    }

    batchResults.push({
      index: index + 1,
      count: batch.length,
      status,
      attempts,
      ok,
      ...(errorMessage ? { error: errorMessage } : {})
    });

    if (!ok) {
      allOk = false;
    }

    if (index < batches.length - 1) {
      await sleep(batchDelayMs);
    }
  }

  return {
    ...baseReceipt,
    counts: {
      submitted: submittedCount,
      planned: urls.length,
      batches: batches.length
    },
    batches: batchResults,
    outcome: allOk ? 'submitted' : 'failed'
  };
}

module.exports = {
  GIT_SHA_PATTERN,
  INDEXNOW_KEY_PATTERN,
  ISO_DATE_PATTERN,
  ZERO_SHA,
  bucketForUrl,
  diffSitemapSnapshots,
  emitIndexNowKeyFile,
  fetchLiveSitemapSnapshot,
  filterAndPrioritizeUrls,
  getConfiguredIndexNowKeys,
  isEligibleIndexNowUrl,
  loadLocalSitemapEntries,
  mapGitChangedFilesToCoreUrls,
  parseSitemapXml,
  resolveIndexNowConfig,
  selectBackfillUrls,
  submitToIndexNow,
  validateIndexNowKey,
  verifyLiveKeyFile
};
