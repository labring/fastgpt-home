#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { getCanonicalBaseUrl } = require('./lib/site-variant');

const INDEXNOW_KEY = '0504bf2a19032bc643723e3f4a7a52ae';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_LIMIT = 10_000;
const FALLBACK_PATHS = ['/', '/price', '/faq', '/tech-center', '/guide', '/industry', '/compare', '/blog'];

function parseArgs(argv) {
  const options = { recentDays: 2, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--variant') options.variant = argv[++i];
    else if (token === '--sitemap-dir') options.sitemapDir = argv[++i];
    else if (token === '--recent-days') options.recentDays = Number(argv[++i]);
    else if (token === '--urls') options.urls = (argv[++i] || '').split(',').map((s) => s.trim()).filter(Boolean);
    else if (token === '--dry-run') options.dryRun = true;
    else throw new Error(`Unknown option: ${token}`);
  }
  return options;
}

function parseSitemapUrls(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].flatMap(([, block]) => {
    const loc = block.match(/<loc>\s*([^<]+?)\s*<\/loc>/i)?.[1]?.trim();
    if (!loc) return [];
    const lastmod = block.match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/i)?.[1]?.trim() || '';
    return [{ loc: loc.replaceAll('&amp;', '&'), lastmod }];
  });
}

function resolveSitemapDir(repoRoot, variant, host, overrideDir) {
  if (overrideDir) return path.resolve(repoRoot, overrideDir);
  const artifactDir = path.join(repoRoot, '.release-artifacts', 'site', `${variant}-configured`, 'payload', 'out', 'sitemap-shards', host);
  return fs.existsSync(artifactDir) ? artifactDir : path.join(repoRoot, 'sitemaps', host);
}

function collectIndexNowUrls({ repoRoot, variant, sitemapDir, recentDays = 2, nowMs = Date.now(), urls }) {
  if (!['cn', 'io'].includes(variant)) throw new Error('--variant must be cn or io');
  const origin = getCanonicalBaseUrl(variant);
  const host = new URL(origin).hostname;
  const filterOrigin = (list) => [...new Set(list.filter((item) => {
    try { return new URL(item).origin === origin; } catch { return false; }
  }))];
  if (Array.isArray(urls) && urls.length > 0) return { host, mode: 'explicit', urls: filterOrigin(urls) };

  const dir = resolveSitemapDir(repoRoot, variant, host, sitemapDir);
  const cutoff = nowMs - Math.max(0, recentDays) * 86_400_000;
  const entries = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((name) => /^sitemap-.+\.xml$/i.test(name)).sort()
        .flatMap((name) => parseSitemapUrls(fs.readFileSync(path.join(dir, name), 'utf8')))
    : [];
  const recent = filterOrigin(
    entries.filter((entry) => Number.isFinite(Date.parse(entry.lastmod)) && Date.parse(entry.lastmod) >= cutoff).map((e) => e.loc)
  );
  if (recent.length > 0) return { host, mode: 'recent-lastmod', urls: recent };

  const hubs = [...FALLBACK_PATHS, ...(variant === 'cn' ? ['/customers'] : [])].map((p) => `${origin}${p}`);
  return { host, mode: 'hub-fallback', urls: hubs };
}

async function submitIndexNow({ host, urls, fetchImpl = globalThis.fetch }) {
  const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;
  const results = [];
  for (let i = 0; i < urls.length; i += BATCH_LIMIT) {
    const payload = { host, key: INDEXNOW_KEY, keyLocation, urlList: urls.slice(i, i + BATCH_LIMIT) };
    const response = await fetchImpl(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow failed for ${host}: HTTP ${response.status}`);
    }
    results.push({ status: response.status, urlCount: payload.urlList.length });
  }
  return { host, keyLocation, urlsSubmitted: urls.length, batches: results };
}

async function main(argv = process.argv.slice(2)) {
  const repoRoot = path.resolve(__dirname, '..');
  const options = parseArgs(argv);
  const keyPath = path.join(repoRoot, 'public', `${INDEXNOW_KEY}.txt`);
  if (!fs.existsSync(keyPath) || fs.readFileSync(keyPath, 'utf8').trim() !== INDEXNOW_KEY) {
    throw new Error(`Missing or invalid key file: public/${INDEXNOW_KEY}.txt`);
  }
  const selection = collectIndexNowUrls({ repoRoot, ...options });
  if (options.dryRun) {
    console.log(JSON.stringify({ dryRun: true, ...selection, count: selection.urls.length }, null, 2));
    return;
  }
  console.log(JSON.stringify(await submitIndexNow(selection), null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`[submit-indexnow] ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { INDEXNOW_ENDPOINT, INDEXNOW_KEY, collectIndexNowUrls, main, parseSitemapUrls, submitIndexNow };
