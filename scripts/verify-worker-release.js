#!/usr/bin/env node

/** Verify the International Site Worker artifact and its Wrangler local HTTP surface. */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const vm = require('node:vm');
const { loadEnvConfig } = require('@next/env');
const { buildRedirects, getPublishedFaqIds } = require('./lib/redirects');
const { getProductionBaseUrls, resolveSiteVariant } = require('./lib/site-variant');
const { verifyWorkerArtifact } = require('./lib/worker-publication');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');
const CONFIG_PATH = path.join(ROOT, 'wrangler.json');
const PACKAGE = require('../package.json');
const LOCK = require('../package-lock.json');
const WRANGLER_BIN = path.join(ROOT, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
const SECURITY_HEADERS = [
  ['strict-transport-security', 'max-age=31536000; includeSubDomains; preload'],
  ['x-frame-options', 'DENY'],
  ['x-content-type-options', 'nosniff'],
  ['referrer-policy', 'strict-origin-when-cross-origin'],
  ['permissions-policy', 'camera=(), microphone=(), geolocation=()'],
  ['cross-origin-opener-policy', 'same-origin-allow-popups']
];
const HASHED_ASSET_CACHE = [
  'public, max-age=31536000, immutable',
  'public, max-age=3600, stale-while-revalidate=86400'
].join(', ');
const IMAGE_CACHE = [
  'public, max-age=86400, stale-while-revalidate=604800',
  'public, max-age=3600, stale-while-revalidate=86400'
].join(', ');

function loadWorker(workerPath) {
  const source = fs.readFileSync(workerPath, 'utf8');
  const context = { Headers, Map, Request, Response, URL };
  vm.runInNewContext(source.replace('export default', 'globalThis.worker ='), context);
  assert(context.worker?.fetch, 'Generated Worker has no fetch handler');
  return context.worker;
}

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = http.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

function startWrangler(port, persistDir) {
  const child = spawn(
    process.execPath,
    [
      WRANGLER_BIN,
      'dev',
      '--local',
      '--config',
      CONFIG_PATH,
      '--ip',
      '127.0.0.1',
      '--port',
      String(port),
      '--inspector-port',
      '0',
      '--show-interactive-dev-session=false',
      '--persist-to',
      persistDir
    ],
    {
      cwd: ROOT,
      env: { ...process.env, CI: '1' },
      stdio: ['ignore', 'pipe', 'pipe']
    }
  );
  let output = '';
  for (const stream of [child.stdout, child.stderr]) {
    stream.on('data', (chunk) => {
      output = `${output}${chunk}`.slice(-30_000);
    });
  }
  return { child, getOutput: () => output };
}

async function waitForWrangler(port, child, getOutput) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null)
      throw new Error(`Wrangler exited before serving HTTP:\n${getOutput()}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`, {
        signal: AbortSignal.timeout(5_000)
      });
      if (response.status < 500) return;
    } catch {
      // Wrangler can need several seconds to bundle the Worker and Static Assets.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Wrangler did not serve HTTP within 45 seconds:\n${getOutput()}`);
}

async function stopWrangler(child) {
  if (child.exitCode !== null) return;
  await new Promise((resolve) => {
    const timeout = setTimeout(() => {
      child.kill('SIGKILL');
      resolve();
    }, 5_000);
    child.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
    child.kill('SIGTERM');
  });
}

async function verifyHttpSurface(port, worker, env) {
  const request = (route) =>
    fetch(`http://127.0.0.1:${port}${route}`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(15_000)
    });
  const home = await request('/');
  assert.equal(home.status, 200, 'Worker homepage status');
  assert.match(home.headers.get('content-type') || '', /text\/html/i, 'Homepage content type');
  assert.equal(
    home.headers.get('cache-control'),
    'public, max-age=3600, stale-while-revalidate=86400',
    'Homepage cache policy'
  );
  assertSecurityHeaders(home, 'Homepage');
  assert.match(home.headers.get('content-security-policy') || '', /frame-ancestors 'none'/);
  assert.equal(home.headers.get('x-robots-tag'), null, 'International Site must remain indexable');
  const homeHtml = await home.text();
  assertCanonical(homeHtml, env.io);

  const faqId = getPublishedFaqIds(ROOT).english[0];
  const deepPath = `/faq/${faqId}`;
  const deepPage = await request(deepPath);
  assert.equal(deepPage.status, 200, `Direct deep request ${deepPath}`);
  const deepHtml = await deepPage.text();
  assertCanonical(deepHtml, `${env.io}${deepPath}`);
  const refreshedPage = await request(deepPath);
  assert.equal(refreshedPage.status, 200, `Refresh deep request ${deepPath}`);

  const scriptPath = homeHtml.match(/<script\b[^>]*src="([^"]*\/_next\/static\/[^\"]+\.js)"/i)?.[1];
  assert(scriptPath, 'Homepage has no static JavaScript asset');
  const staticAsset = await request(scriptPath);
  assertStaticAsset(staticAsset, {
    kind: 'JavaScript',
    path: scriptPath,
    contentType: /javascript/i,
    cacheControl: HASHED_ASSET_CACHE
  });

  const tags = [...homeHtml.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => tag);
  const stylesheetTag = tags.find((tag) => /\brel="stylesheet"/i.test(tag));
  const stylesheetPath = stylesheetTag?.match(/\bhref="([^"]+)"/i)?.[1];
  assert(stylesheetPath, 'Homepage has no stylesheet asset');
  const stylesheet = await request(stylesheetPath);
  assertStaticAsset(stylesheet, {
    kind: 'Stylesheet',
    path: stylesheetPath,
    contentType: /text\/css/i,
    cacheControl: HASHED_ASSET_CACHE
  });

  const imagePath = [...homeHtml.matchAll(/<img\b[^>]*>/gi)]
    .map(([tag]) => tag.match(/\bsrc="([^"]+)"/i)?.[1])
    .find((src) => src?.startsWith('/images/'));
  assert(imagePath, 'Homepage has no local image asset');
  const image = await request(imagePath);
  assertStaticAsset(image, {
    kind: 'Image',
    path: imagePath,
    contentType: /^image\//i,
    cacheControl: IMAGE_CACHE
  });

  const fontTag = tags.find((tag) => /\bas="font"/i.test(tag) && /\.woff2?/i.test(tag));
  const fontPath = fontTag?.match(/\bhref="([^"]+)"/i)?.[1];
  assert(fontPath, 'Homepage has no preloaded local font asset');
  const font = await request(fontPath);
  assertStaticAsset(font, {
    kind: 'Font',
    path: fontPath,
    contentType: /font|woff/i,
    cacheControl: HASHED_ASSET_CACHE
  });

  const alias = [...buildRedirects(ROOT).ioRedirects].find(([source]) => source !== '/');
  assert(alias, 'URL Alias Authority has no International Site redirect fixture');
  const [sourcePath, target] = alias;
  const query = '?worker_probe=1&keep=%E4%B8%AD';
  const redirect = await request(`${sourcePath}${query}`);
  const expectedLocation = new URL(target);
  expectedLocation.search = query;
  assert.equal(redirect.status, 301, `Worker redirect ${sourcePath}`);
  assert.equal(
    redirect.headers.get('location'),
    expectedLocation.href,
    'Worker redirect query preservation'
  );

  const baseline = await worker.fetch(new Request(`${env.io}${sourcePath}${query}`), {
    ASSETS: { fetch: async () => new Response('missing', { status: 404 }) }
  });
  assert.equal(
    redirect.status,
    baseline.status,
    'Redirect status differs from the generated Worker'
  );
  for (const header of [
    'content-type',
    'location',
    'cache-control',
    'content-security-policy',
    'referrer-policy',
    'permissions-policy',
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
    'x-robots-tag'
  ]) {
    assert.equal(
      redirect.headers.get(header),
      baseline.headers.get(header),
      `Redirect ${header} differs from the current Worker projection`
    );
  }

  const localizedFallback = await request('/zh/price?source=worker-release');
  const defaultPrice = await request('/price');
  assert.equal(localizedFallback.status, 200, 'Locale fallback status');
  assert.equal(
    await localizedFallback.text(),
    await defaultPrice.text(),
    'Locale fallback content'
  );

  const missing = await request('/__worker_release_missing__');
  assert.equal(missing.status, 404, 'Unpublished routes must return a real 404');

  for (const route of ['/contact', '/contact/embed']) {
    const contact = await request(route);
    assert.equal(contact.status, 200, `Contact route ${route}`);
    assert.equal(contact.headers.get('x-frame-options'), null, `${route} must allow embedding`);
    assert.match(
      contact.headers.get('content-security-policy') || '',
      /frame-ancestors\s+\*/i,
      `${route} frame policy`
    );
  }

  const robots = await request('/robots.txt');
  assert.equal(robots.status, 200, 'robots.txt status');
  assert.match(robots.headers.get('content-type') || '', /text\/plain/i, 'robots.txt content type');
  assertSecurityHeaders(robots, 'robots.txt');
  assert(
    (await robots.text()).includes(`Sitemap: ${env.io}/sitemap.xml`),
    'robots.txt Sitemap owner'
  );
  const sitemap = await request('/sitemap.xml');
  assert.equal(sitemap.status, 200, 'sitemap.xml status');
  const sitemapText = await sitemap.text();
  assert(sitemapText.includes(env.io), 'Sitemap must contain International Site URLs');
  assert(!sitemapText.includes(env.cn), 'Sitemap must not contain China Site URLs');

  const workerSource = await request('/_worker.js');
  assert.equal(
    workerSource.status,
    404,
    'Worker entrypoint must stay outside the public namespace'
  );
  assert(!(await workerSource.text()).includes('redirectAuthority'), 'Worker source was exposed');
  return {
    deepPath,
    redirectPath: sourcePath,
    staticAsset: scriptPath,
    stylesheet: stylesheetPath,
    image: imagePath,
    font: fontPath
  };
}

function assertSecurityHeaders(response, label) {
  for (const [header, value] of SECURITY_HEADERS) {
    assert.equal(response.headers.get(header), value, `${label} ${header}`);
  }
}

function assertStaticAsset(response, { kind, path: assetPath, contentType, cacheControl }) {
  assert.equal(response.status, 200, `${kind} ${assetPath}`);
  assert.match(
    response.headers.get('content-type') || '',
    contentType,
    `${kind} content type`
  );
  assertSecurityHeaders(response, kind);
  assert.equal(response.headers.get('cache-control'), cacheControl, `${kind} cache policy`);
}

function assertCanonical(html, expected) {
  const tag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0] || '';
  const canonical = tag.match(/\shref="([^"]+)"/i)?.[1];
  assert.equal(canonical, expected, `Canonical URL for ${expected}`);
}

async function main() {
  loadEnvConfig(ROOT, false);
  assert.equal(resolveSiteVariant(), 'io', 'Worker release requires the IO Site Variant');
  const pinnedVersion = PACKAGE.devDependencies.wrangler;
  assert.equal(
    LOCK.packages?.['node_modules/wrangler']?.version,
    pinnedVersion,
    'Wrangler package and lockfile versions differ'
  );
  assert.equal(
    JSON.parse(fs.readFileSync(path.join(ROOT, 'node_modules/wrangler/package.json'), 'utf8'))
      .version,
    pinnedVersion,
    'Installed Wrangler differs from the pinned version'
  );
  const inventory = verifyWorkerArtifact({
    outDir: OUT_DIR,
    configPath: CONFIG_PATH,
    wranglerVersion: pinnedVersion
  });
  const persistDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-worker-state-'));
  const port = await getAvailablePort();
  const { child, getOutput } = startWrangler(port, persistDir);
  try {
    await waitForWrangler(port, child, getOutput);
    const routes = await verifyHttpSurface(
      port,
      loadWorker(path.join(OUT_DIR, '_worker.js')),
      getProductionBaseUrls()
    );
    console.log(
      `[verify-worker-release] passed: assets=${inventory.assetCount}, largest=${inventory.largestAssetPath} (${inventory.largestAssetBytes} bytes), deep=${routes.deepPath}, redirect=${routes.redirectPath}, ` +
        `js=${routes.staticAsset}, css=${routes.stylesheet}, image=${routes.image}, font=${routes.font}, wrangler=${pinnedVersion}`
    );
  } finally {
    await stopWrangler(child);
    fs.rmSync(persistDir, { recursive: true, force: true });
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
