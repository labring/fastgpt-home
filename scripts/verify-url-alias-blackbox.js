#!/usr/bin/env node

/** Run representative HTTP contracts against the generated Worker and real Nginx runtime. */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const {
  buildUrlAliasProjection,
  getUrlAliasAuthorityDigest,
  getUrlAliasSlice,
  readUrlAliasAuthority
} = require('./lib/url-alias-authority');
const { getProductionBaseUrls, resolveSiteVariant } = require('./lib/site-variant');

const ROOT = path.resolve(__dirname, '..');
const { directoryInventory } = require('./lib/release-readiness');

function parseArgs(argv) {
  const options = {
    variant: undefined,
    slice: undefined,
    outDir: path.join(ROOT, 'out'),
    nextDir: path.join(ROOT, '.next')
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--variant') options.variant = argv[++index];
    else if (token === '--slice') options.slice = argv[++index];
    else if (token === '--image') options.image = argv[++index];
    else if (token === '--out-dir') options.outDir = path.resolve(ROOT, argv[++index]);
    else if (token === '--next-dir') options.nextDir = path.resolve(ROOT, argv[++index]);
    else throw new Error(`Unknown argument: ${token}`);
  }
  return options;
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const probe = http.createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address();
      probe.close((error) => (error ? reject(error) : resolve(address.port)));
    });
  });
}

function requestLocal(port, requestPath) {
  return new Promise((resolve, reject) => {
    const request = http.request(
      { hostname: '127.0.0.1', port, path: requestPath, method: 'GET' },
      (response) => {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () =>
          resolve({
            status: response.statusCode,
            location: response.headers.location,
            headers: response.headers,
            body: Buffer.concat(chunks)
          })
        );
      }
    );
    request.once('error', reject);
    request.end();
  });
}

function assetResponse(request, outDir) {
  const url = new URL(request.url);
  const route = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (route.includes('..')) return new Response('not found', { status: 404 });
  const candidates = [
    path.join(outDir, `${route}.html`),
    path.join(outDir, route, 'index.html'),
    path.join(outDir, route)
  ];
  const filePath = candidates.find(
    (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()
  );
  if (!filePath) return new Response('not found', { status: 404 });
  return new Response(fs.readFileSync(filePath), {
    status: 200,
    headers: {
      'content-type': filePath.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/plain'
    }
  });
}

async function startWorkerSurface(workerPath, outDir) {
  const runtimeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-worker-surface-'));
  const modulePath = path.join(runtimeDir, 'worker.mjs');
  fs.copyFileSync(workerPath, modulePath);
  const worker = (await import(`${pathToFileURL(modulePath).href}?runtime=${Date.now()}`)).default;
  const server = http.createServer(async (request, response) => {
    try {
      const port = server.address().port;
      const workerRequest = new Request(`http://127.0.0.1:${port}${request.url}`, {
        method: request.method,
        headers: request.headers
      });
      const workerResponse = await worker.fetch(workerRequest, {
        ASSETS: { fetch: (assetRequest) => assetResponse(assetRequest, outDir) }
      });
      response.writeHead(workerResponse.status, Object.fromEntries(workerResponse.headers));
      response.end(Buffer.from(await workerResponse.arrayBuffer()));
    } catch (error) {
      response.writeHead(500, { 'content-type': 'text/plain' });
      response.end(error.stack || error.message);
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  return {
    port: server.address().port,
    close: () =>
      new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve()))
      ),
    cleanup: () => fs.rmSync(runtimeDir, { recursive: true, force: true })
  };
}

async function waitForHttp(port, child) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      await requestLocal(port, '/__url_alias_runtime_probe__');
      return;
    } catch {
      if (child.exitCode !== null) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error('Nginx did not become ready');
}

async function startNginxSurface(redirectMapPath, outDir) {
  if (!fs.existsSync(redirectMapPath))
    throw new Error(`Missing Nginx redirect map: ${redirectMapPath}`);
  const nginx = spawnSync('nginx', ['-v'], { encoding: 'utf8' });
  if (nginx.error || nginx.status !== 0) {
    throw new Error('Nginx binary unavailable; install Nginx to run the real CN black-box gate');
  }
  const runtimeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-nginx-surface-'));
  const port = await getFreePort();
  const configPath = path.join(runtimeDir, 'nginx.conf');
  const quoteNginxPath = (value) => `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;
  fs.writeFileSync(
    configPath,
    `error_log ${quoteNginxPath(path.join(runtimeDir, 'error.log'))};\npid ${quoteNginxPath(
      path.join(runtimeDir, 'nginx.pid')
    )};\nevents {}\nhttp {\n  access_log ${quoteNginxPath(
      path.join(runtimeDir, 'access.log')
    )};\n  map_hash_bucket_size 256;\n  include ${quoteNginxPath(
      redirectMapPath
    )};\n  server {\n    listen 127.0.0.1:${port};\n    root ${quoteNginxPath(
      outDir
    )};\n    if ($locale_redirect_target != "") { return 301 $locale_redirect_target$is_args$args; }\n    location / { try_files $uri $uri.html $uri/ =404; }\n  }\n}\n`
  );
  const configCheck = spawnSync('nginx', ['-p', runtimeDir, '-c', configPath, '-t'], {
    encoding: 'utf8'
  });
  if (configCheck.error || configCheck.status !== 0) {
    fs.rmSync(runtimeDir, { recursive: true, force: true });
    throw new Error(
      `Nginx configuration check failed: ${configCheck.stderr || configCheck.error?.message}`
    );
  }
  const child = spawn('nginx', ['-p', runtimeDir, '-c', configPath, '-g', 'daemon off;'], {
    stdio: ['ignore', 'pipe', 'pipe']
  });
  child.exitCode = null;
  child.once('exit', (code) => {
    child.exitCode = code;
  });
  try {
    await waitForHttp(port, child);
  } catch (error) {
    child.kill('SIGTERM');
    fs.rmSync(runtimeDir, { recursive: true, force: true });
    throw error;
  }
  return {
    port,
    close: () =>
      new Promise((resolve) => {
        if (child.exitCode !== null) {
          resolve();
          return;
        }
        child.once('exit', resolve);
        child.kill('SIGTERM');
      }),
    cleanup: () => fs.rmSync(runtimeDir, { recursive: true, force: true })
  };
}

async function startContainerSurface(image, outDir) {
  const run = (...args) => {
    const result = spawnSync('docker', args, { encoding: 'utf8' });
    if (result.error || result.status !== 0)
      throw new Error(result.stderr || result.error?.message);
    return result.stdout.trim();
  };
  const id = run('run', '--detach', '--publish', '127.0.0.1::80', image);
  const inspection = fs.mkdtempSync(path.join(os.tmpdir(), 'verified-container-'));
  const close = async () => {
    try {
      run('rm', '--force', id);
    } finally {
      fs.rmSync(inspection, { recursive: true, force: true });
    }
  };
  try {
    run('exec', id, 'nginx', '-t');
    const exported = path.join(inspection, 'out');
    run('cp', `${id}:/usr/share/nginx/html`, exported);
    assert.equal(
      directoryInventory(exported, { root: exported }).sha256,
      directoryInventory(outDir, { root: outDir }).sha256,
      'Image static inventory differs from accepted artifact'
    );
    for (const [imagePath, artifactPath] of [
      ['conf.d/default.conf', '../runtime/nginx.conf'],
      ['security-headers.conf', '../runtime/nginx-security-headers.conf'],
      ['embeddable-security-headers.conf', '../runtime/nginx-embeddable-security-headers.conf'],
      ['generated-redirects.conf', '../runtime/nginx-redirects.conf'],
      ['site-manifest.json', '../../manifest.json'],
      ['site-verification.json', '../verification.json']
    ]) {
      const copy = path.join(inspection, path.basename(imagePath));
      run('cp', `${id}:/etc/nginx/${imagePath}`, copy);
      assert.deepEqual(
        fs.readFileSync(copy),
        fs.readFileSync(path.resolve(outDir, artifactPath)),
        `Image runtime differs: ${imagePath}`
      );
    }
    const port = Number(run('port', id, '80/tcp').split(':').at(-1));
    assert(Number.isInteger(port) && port > 0, 'Invalid container HTTP port');
    await waitForHttp(port, { exitCode: null });
    return { port, close, cleanup() {} };
  } catch (error) {
    await close();
    throw error;
  }
}

async function verifyContainerPublication(surface, outDir) {
  for (const [route, status, frame] of [
    ['/', 200, 'DENY'],
    ['/contact', 200, undefined],
    ['/__issue303_missing__', 404, 'DENY']
  ]) {
    const response = await requestLocal(surface.port, route);
    assert.equal(response.status, status, route);
    assert.equal(response.headers['x-content-type-options'], 'nosniff', route);
    assert.equal(response.headers['x-frame-options'], frame, route);
    assert(response.headers['content-security-policy'], `Missing CSP: ${route}`);
    assert.equal(
      response.headers['x-robots-tag'],
      undefined,
      'CN publication must remain indexable'
    );
    const file = status === 404 ? '404.html' : route === '/' ? 'index.html' : 'contact.html';
    assert.deepEqual(
      response.body,
      fs.readFileSync(path.join(outDir, file)),
      `Runtime bytes differ: ${route}`
    );
  }
  console.log('[verify-url-alias-blackbox] container publication, 404 and security headers passed');
}

function expectedLocation(target, query) {
  const url = new URL(target);
  url.search = query;
  return url.toString();
}

async function verifySurface(surface, projection, localHost, requireAllTargets) {
  const query = '?alias_probe=1&keep=%E4%B8%AD';
  let index = 0;
  for (const [sourcePath, target] of projection) {
    const response = await requestLocal(surface.port, `${sourcePath}${query}`);
    assert.equal(response.status, 301, `Expected 301 for ${sourcePath}`);
    assert.equal(
      response.location,
      expectedLocation(target, query),
      `Unexpected Location for ${sourcePath}`
    );
    const slashPath = sourcePath.endsWith('/') ? sourcePath : `${sourcePath}/`;
    const slashResponse = await requestLocal(surface.port, `${slashPath}${query}`);
    assert.equal(slashResponse.status, 301, `Expected trailing-slash 301 for ${sourcePath}`);
    assert.equal(slashResponse.location, expectedLocation(target, query));
    index += 1;
  }

  const targetPaths = new Map();
  for (const target of projection.values()) {
    const targetUrl = new URL(target);
    targetPaths.set(`${targetUrl.hostname}${targetUrl.pathname}`, targetUrl.pathname);
  }
  for (const [targetIdentity, targetPath] of targetPaths) {
    const targetHost = targetIdentity.startsWith('fastgpt.cn') ? 'fastgpt.cn' : 'fastgpt.io';
    if (!requireAllTargets && targetHost !== localHost) continue;
    const response = await requestLocal(surface.port, targetPath);
    assert.equal(response.status, 200, `Terminal target did not return 200: ${targetIdentity}`);
  }
  return index;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const variant = options.variant || resolveSiteVariant();
  if (!['cn', 'io'].includes(variant))
    throw new Error(`Black-box gate requires cn or io, received ${variant}`);
  const authority = readUrlAliasAuthority(ROOT);
  const projectionAuthority = options.slice
    ? getUrlAliasSlice(authority, options.slice, { rootDir: ROOT, requireEvidence: true })
    : authority;
  const authorityDigest = getUrlAliasAuthorityDigest(authority);
  const sourceHost = variant === 'cn' ? 'fastgpt.cn' : 'fastgpt.io';
  const projection = buildUrlAliasProjection(
    projectionAuthority,
    sourceHost,
    getProductionBaseUrls()
  );
  if (variant === 'io') {
    const workerPath = path.join(options.outDir, '_worker.js');
    if (!fs.existsSync(workerPath)) throw new Error(`Missing Worker artifact: ${workerPath}`);
    const surface = await startWorkerSurface(workerPath, options.outDir);
    try {
      const checked = await verifySurface(surface, projection, 'fastgpt.io', true);
      console.log(
        `[verify-url-alias-blackbox] io Worker passed (aliases=${checked}, ` +
          `terminal=all, slice=${options.slice || 'all'}, digest=${authorityDigest})`
      );
    } finally {
      await surface.close();
      surface.cleanup();
    }
    return;
  }

  const surface = options.image
    ? await startContainerSurface(options.image, options.outDir)
    : await startNginxSurface(path.join(options.nextDir, 'nginx-redirects.conf'), options.outDir);
  try {
    const checked = await verifySurface(surface, projection, 'fastgpt.cn', false);
    if (options.image) await verifyContainerPublication(surface, options.outDir);
    console.log(
      `[verify-url-alias-blackbox] cn Nginx passed (aliases=${checked}, ` +
        `terminal=local-and-verified, slice=${options.slice || 'all'}, digest=${authorityDigest})`
    );
  } finally {
    await surface.close();
    surface.cleanup();
  }
}

main().catch((error) => {
  console.error(`[verify-url-alias-blackbox] ${error.message}`);
  process.exitCode = 1;
});
