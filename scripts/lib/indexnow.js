const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const INDEXNOW_KEY = '0504bf2a19032bc643723e3f4a7a52ae';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const INDEXNOW_MAX_URLS_PER_BATCH = 10_000;

const INDEXNOW_HOSTS = {
  cn: {
    host: 'fastgpt.cn',
    fallbackPaths: [
      '/',
      '/price',
      '/faq',
      '/tech-center',
      '/guide',
      '/industry',
      '/compare',
      '/blog',
      '/customers'
    ]
  },
  io: {
    host: 'fastgpt.io',
    fallbackPaths: [
      '/',
      '/price',
      '/faq',
      '/tech-center',
      '/guide',
      '/industry',
      '/compare',
      '/blog'
    ]
  }
};

function resolveHostConfig({ variant, host }) {
  if (variant) {
    const config = INDEXNOW_HOSTS[variant];
    if (!config) throw new Error(`Unsupported IndexNow variant: ${variant}`);
    return config;
  }
  if (host) {
    const match = Object.values(INDEXNOW_HOSTS).find((entry) => entry.host === host);
    if (!match) throw new Error(`Unsupported IndexNow host: ${host}`);
    return match;
  }
  throw new Error('Specify --variant cn|io or --host fastgpt.cn|fastgpt.io');
}

function decodeXmlEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function parseSitemapUrls(xml) {
  if (typeof xml !== 'string' || !xml.trim()) return [];
  const entries = [];
  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const block = match[1];
    const locMatch = block.match(/<loc>\s*([^<]+?)\s*<\/loc>/i);
    if (!locMatch) continue;
    const lastmodMatch = block.match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/i);
    entries.push({
      loc: decodeXmlEntities(locMatch[1].trim()),
      lastmod: lastmodMatch ? decodeXmlEntities(lastmodMatch[1].trim()) : ''
    });
  }
  return entries;
}

function readCurrentSitemapEntries(repoRoot, host) {
  const dir = path.join(repoRoot, 'sitemaps', host);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((name) => /^sitemap-.+\.xml$/i.test(name))
    .sort();
  return files.flatMap((name) => parseSitemapUrls(fs.readFileSync(path.join(dir, name), 'utf8')));
}

function readGitSitemapEntries(repoRoot, host, baseRef) {
  if (!baseRef || /^0+$/.test(baseRef)) return null;
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${baseRef}^{commit}`], {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'pipe']
    });
    const treeOutput = execFileSync(
      'git',
      ['ls-tree', '--name-only', baseRef, `sitemaps/${host}/`],
      { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
    );
    const files = treeOutput
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((filePath) => /\/sitemap-[^/]+\.xml$/i.test(filePath))
      .sort();
    return files.flatMap((filePath) => {
      const content = execFileSync('git', ['show', `${baseRef}:${filePath}`], {
        cwd: repoRoot,
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'pipe']
      });
      return parseSitemapUrls(content);
    });
  } catch {
    return null;
  }
}

function filterHostUrls(urls, host) {
  const expectedOrigin = `https://${host}`;
  const seen = new Set();
  const filtered = [];
  for (const candidate of urls) {
    if (typeof candidate !== 'string' || !candidate.trim()) continue;
    let parsed;
    try {
      parsed = new URL(candidate.trim());
    } catch {
      continue;
    }
    if (parsed.origin !== expectedOrigin) continue;
    if (!seen.has(parsed.href)) {
      seen.add(parsed.href);
      filtered.push(parsed.href);
    }
  }
  return filtered;
}

function collectChangedSitemapUrls({
  repoRoot,
  variant,
  host,
  baseRef,
  recentDays = 2,
  nowMs = Date.now(),
  explicitUrls
}) {
  const config = resolveHostConfig({ variant, host });
  const targetHost = config.host;
  const fallbackUrls = config.fallbackPaths.map((pathname) => `https://${targetHost}${pathname}`);

  if (Array.isArray(explicitUrls) && explicitUrls.length > 0) {
    const urls = filterHostUrls(explicitUrls, targetHost);
    if (urls.length === 0) {
      throw new Error(`No valid URLs matched host https://${targetHost}`);
    }
    return { host: targetHost, mode: 'explicit', urls };
  }

  const currentEntries = readCurrentSitemapEntries(repoRoot, targetHost);
  const previousEntries = readGitSitemapEntries(repoRoot, targetHost, baseRef);

  if (previousEntries !== null) {
    const previousByLoc = new Map(previousEntries.map((entry) => [entry.loc, entry.lastmod]));
    const diffUrls = filterHostUrls(
      currentEntries
        .filter(
          (entry) =>
            !previousByLoc.has(entry.loc) || previousByLoc.get(entry.loc) !== entry.lastmod
        )
        .map((entry) => entry.loc),
      targetHost
    );
    if (diffUrls.length > 0) {
      return { host: targetHost, mode: 'git-diff', urls: diffUrls };
    }
    return { host: targetHost, mode: 'hub-fallback', urls: fallbackUrls };
  }

  const cutoffMs = nowMs - Math.max(0, recentDays) * 86_400_000;
  const recentUrls = filterHostUrls(
    currentEntries
      .filter((entry) => {
        if (!entry.lastmod) return false;
        const ts = Date.parse(entry.lastmod);
        return Number.isFinite(ts) && ts >= cutoffMs;
      })
      .map((entry) => entry.loc),
    targetHost
  );
  if (recentUrls.length > 0) {
    return { host: targetHost, mode: 'recent-lastmod', urls: recentUrls };
  }

  return { host: targetHost, mode: 'hub-fallback', urls: fallbackUrls };
}

function buildIndexNowBatches(urls, host, key = INDEXNOW_KEY, batchSize = INDEXNOW_MAX_URLS_PER_BATCH) {
  const normalizedUrls = filterHostUrls(urls, host);
  const keyLocation = `https://${host}/${key}.txt`;
  const batches = [];
  for (let index = 0; index < normalizedUrls.length; index += batchSize) {
    batches.push({
      host,
      key,
      keyLocation,
      urlList: normalizedUrls.slice(index, index + batchSize)
    });
  }
  return batches;
}

function verifyLocalKeyFile(repoRoot, key = INDEXNOW_KEY) {
  const keyFilePath = path.join(repoRoot, 'public', `${key}.txt`);
  if (!fs.existsSync(keyFilePath)) {
    return { ok: false, reason: `Missing local key file: public/${key}.txt`, keyFilePath };
  }
  const actual = fs.readFileSync(keyFilePath, 'utf8').trim();
  if (actual !== key) {
    return { ok: false, reason: `Key file mismatch in public/${key}.txt`, keyFilePath };
  }
  return { ok: true, keyFilePath };
}

async function submitIndexNow({
  host,
  urls,
  key = INDEXNOW_KEY,
  endpoint = INDEXNOW_ENDPOINT,
  skipKeyCheck = false,
  allowUnverifiedKey = false,
  fetchImpl = globalThis.fetch
}) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('A fetch implementation is required to submit IndexNow batches');
  }
  const keyLocation = `https://${host}/${key}.txt`;

  if (!skipKeyCheck) {
    const keyResponse = await fetchImpl(keyLocation, { method: 'GET' });
    const keyBody = keyResponse.ok ? (await keyResponse.text()).trim() : '';
    if (!keyResponse.ok || keyBody !== key) {
      const detail = `IndexNow key file check failed for ${keyLocation} (HTTP ${keyResponse.status})`;
      if (allowUnverifiedKey) {
        return {
          status: 'skipped-unverified-key',
          host,
          keyLocation,
          batchesSubmitted: 0,
          urlsSubmitted: 0,
          detail
        };
      }
      throw new Error(detail);
    }
  }

  const batches = buildIndexNowBatches(urls, host, key);
  const responses = [];
  for (const payload of batches) {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (response.status !== 200 && response.status !== 202) {
      const bodyText = await response.text().catch(() => '');
      throw new Error(
        `IndexNow submission failed for ${host}: HTTP ${response.status}${bodyText ? ` ${bodyText}` : ''}`
      );
    }
    responses.push({ status: response.status, urlCount: payload.urlList.length });
  }

  return {
    status: 'submitted',
    host,
    keyLocation,
    batchesSubmitted: batches.length,
    urlsSubmitted: batches.reduce((sum, batch) => sum + batch.urlList.length, 0),
    responses
  };
}

module.exports = {
  INDEXNOW_ENDPOINT,
  INDEXNOW_HOSTS,
  INDEXNOW_KEY,
  INDEXNOW_MAX_URLS_PER_BATCH,
  buildIndexNowBatches,
  collectChangedSitemapUrls,
  filterHostUrls,
  parseSitemapUrls,
  resolveHostConfig,
  submitIndexNow,
  verifyLocalKeyFile
};
