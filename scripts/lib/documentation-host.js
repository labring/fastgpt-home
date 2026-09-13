const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { isPublicHttpsTarget, isSensitiveHeader } = require('./release-readiness');

const DOCUMENTATION_HOST_SCHEMA_VERSION = 1;
const DOCUMENTATION_HOST_KIND = 'documentation-host-owner-routing';
const DOCUMENTATION_HOSTS = Object.freeze(['cn', 'io']);
const DOCUMENTATION_LOCALES = Object.freeze({ cn: 'zh-CN', io: 'en' });
const REVISION_PATTERN = /^[a-f0-9]{7,64}$/i;

function contractError(message) {
  return new Error(`[documentation-host] ${message}`);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function parseTarget(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw contractError(`${label} is required`);
  let target;
  try {
    target = new URL(value.trim());
  } catch (error) {
    throw contractError(`${label} is invalid: ${error.message}`);
  }
  if (target.protocol !== 'https:' || target.username || target.password) {
    throw contractError(`${label} must be an HTTPS origin without credentials`);
  }
  if (!isPublicHttpsTarget(target.href)) {
    throw contractError(`${label} must use a public hostname`);
  }
  if (target.pathname !== '/' || target.search || target.hash) {
    throw contractError(`${label} must be an origin without a path, query, or fragment`);
  }
  target.pathname = '';
  return target;
}

function normalizePath(value, label) {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    value.includes('\0') ||
    value.includes('?') ||
    value.includes('#') ||
    /\s|[\u0000-\u001f\u007f]/.test(value) ||
    value.split('/').some((segment) => segment === '.' || segment === '..')
  ) {
    throw contractError(`${label} must be a clean absolute path`);
  }
  if (/%(?:2f|2F|5c|5C)/.test(value) || /%(?![0-9a-fA-F]{2})/.test(value)) {
    throw contractError(`${label} contains an unsafe percent escape`);
  }
  let decoded;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    throw contractError(`${label} contains an invalid percent escape`);
  }
  if (
    decoded.split('/').some((segment) => segment === '.' || segment === '..') ||
    /\s|[\u0000-\u001f\u007f]/.test(decoded)
  ) {
    throw contractError(`${label} contains an unsafe encoded path segment`);
  }
  return value;
}

function normalizeQuery(value) {
  const query =
    typeof value === 'string' && value.trim()
      ? value.trim().replace(/^\?/, '')
      : 'docs-host-contract=1';
  if (!query || query.includes('#') || /\s/.test(query) || /%(?![0-9a-fA-F]{2})/.test(query)) {
    throw contractError('query must be a non-empty query without spaces or fragments');
  }
  try {
    new URL(`https://documentation-host.invalid/?${query}`);
  } catch (error) {
    throw contractError(`query is invalid: ${error.message}`);
  }
  return `?${query}`;
}

function normalizeRepository(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const repository = {};
  for (const key of ['name', 'owner']) {
    if (typeof value[key] === 'string' && value[key].trim()) repository[key] = value[key].trim();
  }
  if (typeof value.url === 'string' && value.url.trim()) {
    let url;
    try {
      url = new URL(value.url.trim());
    } catch (error) {
      throw contractError(`repository.url is invalid: ${error.message}`);
    }
    if (url.protocol !== 'https:' || url.username || url.password) {
      throw contractError('repository.url must be HTTPS without credentials');
    }
    url.search = '';
    url.hash = '';
    repository.url = url.href;
  }
  return repository;
}

function normalizeSamplePath(value, index) {
  if (typeof value !== 'string' || !value.trim()) {
    throw contractError(`englishSample[${index + 1}] must be a path or URL`);
  }
  let samplePath = value.trim();
  if (/^https?:\/\//i.test(samplePath)) {
    let url;
    try {
      url = new URL(samplePath);
    } catch (error) {
      throw contractError(`englishSample[${index + 1}] is invalid: ${error.message}`);
    }
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
      throw contractError(
        `englishSample[${index + 1}] must be an HTTPS URL without query or fragment`
      );
    }
    samplePath = url.pathname;
  }
  if (!samplePath.startsWith('/')) samplePath = `/${samplePath}`;
  if (samplePath === '/zh-CN' || samplePath.startsWith('/zh-CN/')) {
    throw contractError(`englishSample[${index + 1}] must use the /en/ locale prefix`);
  }
  if (!samplePath.startsWith('/en')) samplePath = `/en${samplePath}`;
  if (samplePath !== '/en' && !samplePath.startsWith('/en/')) {
    throw contractError(`englishSample[${index + 1}] must use the /en/ locale prefix`);
  }
  return normalizePath(samplePath, `englishSample[${index + 1}]`);
}

function readPaths(value, label) {
  const paths = Array.isArray(value)
    ? value
    : value && Array.isArray(value.paths)
    ? value.paths
    : undefined;
  if (!paths) throw contractError(`${label} must contain a paths array`);
  return paths.map((item, index) => normalizePath(item, `${label}.paths[${index + 1}]`));
}

function localePath(pathValue, locale, label) {
  const path = normalizePath(pathValue, label);
  const prefix = `/${locale}`;
  if (path !== prefix && !path.startsWith(`${prefix}/`)) {
    throw contractError(`${label} must use the ${prefix}/ locale prefix`);
  }
  return path;
}

function sampleLocalePath(englishPath, locale) {
  return locale === 'en' ? englishPath : englishPath.replace(/^\/en(?=\/|$)/, `/${locale}`);
}

function normalizeOwnerRoutes(contract, sample) {
  const input = contract.ownerRoutes || contract.ownerPaths || contract.owners;
  if (input !== undefined && (!input || typeof input !== 'object' || Array.isArray(input))) {
    throw contractError('ownerRoutes must be an object');
  }
  const routes = {};
  for (const host of DOCUMENTATION_HOSTS) {
    const locale = DOCUMENTATION_LOCALES[host];
    const configured = input?.[host];
    const paths =
      configured === undefined
        ? sample.map((item) => sampleLocalePath(item, locale))
        : readPaths(configured, `ownerRoutes.${host}`);
    routes[host] = paths.map((item, index) =>
      localePath(item, locale, `ownerRoutes.${host}.paths[${index + 1}]`)
    );
  }
  return routes;
}

function normalizeRedirects(contract, ownerRoutes) {
  const configured = contract.redirects;
  if (configured === undefined) {
    return [
      ...ownerRoutes.io.map((pathValue) => ({
        sourceHost: 'cn',
        sourcePath: pathValue,
        targetHost: 'io',
        targetPath: pathValue
      })),
      ...ownerRoutes.cn.map((pathValue) => ({
        sourceHost: 'io',
        sourcePath: pathValue,
        targetHost: 'cn',
        targetPath: pathValue
      }))
    ];
  }
  if (!Array.isArray(configured)) throw contractError('redirects must be an array');
  return configured.map((redirect, index) => {
    if (!redirect || typeof redirect !== 'object' || Array.isArray(redirect)) {
      throw contractError(`redirects[${index + 1}] must be an object`);
    }
    const sourceHost = redirect.sourceHost;
    const targetHost = redirect.targetHost;
    if (!DOCUMENTATION_HOSTS.includes(sourceHost) || !DOCUMENTATION_HOSTS.includes(targetHost)) {
      throw contractError(`redirects[${index + 1}] sourceHost and targetHost must be cn or io`);
    }
    if (sourceHost === targetHost)
      throw contractError(`redirects[${index + 1}] cannot stay on one host`);
    const sourcePath = normalizePath(redirect.sourcePath, `redirects[${index + 1}].sourcePath`);
    const targetPath = normalizePath(redirect.targetPath, `redirects[${index + 1}].targetPath`);
    const ownerLocale = DOCUMENTATION_LOCALES[targetHost];
    localePath(sourcePath, ownerLocale, `redirects[${index + 1}].sourcePath`);
    localePath(targetPath, ownerLocale, `redirects[${index + 1}].targetPath`);
    return { sourceHost, sourcePath, targetHost, targetPath };
  });
}

function validateRollback(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw contractError('rollback input must be an object');
  }
  if (value.status !== 'ready' || value.tested !== true) {
    throw contractError('rollback input must be tested and ready');
  }
  if (
    typeof value.previousRevision !== 'string' ||
    !REVISION_PATTERN.test(value.previousRevision.trim())
  ) {
    throw contractError('rollback.previousRevision must be a commit revision');
  }
  const restorePaths = value.restorePaths || value.paths;
  if (!Array.isArray(restorePaths) || !restorePaths.length) {
    throw contractError('rollback.restorePaths must contain at least one path');
  }
  restorePaths.forEach((restorePath, index) => {
    if (
      typeof restorePath !== 'string' ||
      !restorePath.trim() ||
      path.isAbsolute(restorePath) ||
      restorePath.includes('\\') ||
      restorePath.split('/').some((segment) => segment === '.' || segment === '..')
    ) {
      throw contractError(`rollback.restorePaths[${index + 1}] must be a repository-relative path`);
    }
  });
  return {
    ...value,
    previousRevision: value.previousRevision.trim(),
    restorePaths: [...restorePaths]
  };
}

function normalizeMarkers(value, label) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((marker) => typeof marker !== 'string' || !marker)) {
    throw contractError(`${label} must contain non-empty strings`);
  }
  return [...value];
}

function normalizeRobotsPolicy(contract) {
  const policy = contract.robots || contract.robotsPolicy;
  if (policy === undefined) return {};
  if (!policy || typeof policy !== 'object' || Array.isArray(policy)) {
    throw contractError('robots policy must be an object');
  }
  return Object.fromEntries(
    DOCUMENTATION_HOSTS.map((host) => {
      const value = policy[host] || {};
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw contractError(`robots.${host} must be an object`);
      }
      return [
        host,
        {
          bodyIncludes: normalizeMarkers(
            value.bodyIncludes || value.includes,
            `robots.${host}.bodyIncludes`
          ),
          bodyExcludes: normalizeMarkers(
            value.bodyExcludes || value.excludes,
            `robots.${host}.bodyExcludes`
          )
        }
      ];
    })
  );
}

function targetValue(value, label) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value.origin || value.target || value.url;
  throw contractError(`${label} must be an HTTPS origin`);
}

function validateContract(contract, targets = {}) {
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
    throw contractError('contract must be an object');
  }
  if (contract.schemaVersion !== DOCUMENTATION_HOST_SCHEMA_VERSION) {
    throw contractError(`unsupported schemaVersion: ${contract.schemaVersion}`);
  }
  if (contract.kind !== DOCUMENTATION_HOST_KIND) throw contractError('contract kind is invalid');
  const normalizedTargets = {};
  for (const host of DOCUMENTATION_HOSTS) {
    const rawTarget =
      targets[host] ||
      targetValue(contract.targets?.[host] || contract[`${host}Target`], `targets.${host}`);
    normalizedTargets[host] = parseTarget(rawTarget, `${host} target`);
    if (contract.targets?.[host]) {
      const declared = parseTarget(
        targetValue(contract.targets[host], `targets.${host}`),
        `targets.${host}`
      );
      if (declared.origin !== normalizedTargets[host].origin) {
        throw contractError(`${host} target differs from the contract target`);
      }
    }
  }
  const sampleInput =
    contract.englishSample?.paths || contract.englishSample || contract.englishSamplePaths;
  if (!Array.isArray(sampleInput) || !sampleInput.length) {
    throw contractError('englishSample must contain paths');
  }
  const sample = sampleInput.map(normalizeSamplePath);
  if (new Set(sample).size !== sample.length)
    throw contractError('englishSample paths must be unique');
  const expectedSampleCount =
    contract.englishSample?.expectedCount ??
    contract.englishSample?.count ??
    contract.englishSampleCount;
  if (expectedSampleCount !== undefined && sample.length !== expectedSampleCount) {
    throw contractError(
      `englishSample expected ${expectedSampleCount} paths, received ${sample.length}`
    );
  }
  const ownerRoutes = normalizeOwnerRoutes(contract, sample);
  const redirectRoutes = normalizeRedirects(contract, ownerRoutes);
  const ownerKeys = new Set();
  for (const host of DOCUMENTATION_HOSTS) {
    for (const routePath of ownerRoutes[host]) {
      const key = `${host}:${routePath}`;
      if (ownerKeys.has(key)) throw contractError(`owner route is duplicated: ${key}`);
      ownerKeys.add(key);
    }
  }
  const redirectKeys = new Set();
  for (const redirect of redirectRoutes) {
    const key = `${redirect.sourceHost}:${redirect.sourcePath}`;
    if (redirectKeys.has(key)) throw contractError(`redirect source is duplicated: ${key}`);
    redirectKeys.add(key);
    if (redirect.targetPath !== redirect.sourcePath) {
      throw contractError(`redirect must retain its path: ${key}`);
    }
    if (!ownerKeys.has(`${redirect.targetHost}:${redirect.targetPath}`)) {
      throw contractError(`redirect target is absent from owner routes: ${key}`);
    }
  }
  const expectedRedirectKeys = new Set([
    ...ownerRoutes.io.map((routePath) => `cn:${routePath}`),
    ...ownerRoutes.cn.map((routePath) => `io:${routePath}`)
  ]);
  if (redirectKeys.size !== expectedRedirectKeys.size) {
    throw contractError('redirects must cover every non-owner sample path');
  }
  for (const key of expectedRedirectKeys) {
    if (!redirectKeys.has(key)) throw contractError(`redirect is missing for ${key}`);
  }
  const query = normalizeQuery(contract.query);
  const robots = normalizeRobotsPolicy(contract);
  const rollbackInput = contract.rollback || contract.rollbackInput;
  const rollback = rollbackInput ? validateRollback(rollbackInput) : undefined;
  const repository = normalizeRepository(contract.repository);
  const revision = typeof contract.revision === 'string' ? contract.revision.trim() : '';
  const blockers = [];
  if (!repository.url && !repository.name)
    blockers.push({ code: 'documentation-owner-repository-missing' });
  if (!REVISION_PATTERN.test(revision))
    blockers.push({ code: 'documentation-owner-revision-invalid' });
  if (!rollback) blockers.push({ code: 'documentation-host-rollback-missing' });
  return {
    blockers,
    contract,
    ownerRoutes,
    query,
    redirectRoutes,
    robots,
    repository,
    revision,
    rollback,
    sample,
    targets: normalizedTargets
  };
}

function serializedHeaders(headers) {
  if (!headers) return {};
  const entries =
    typeof headers.entries === 'function' ? [...headers.entries()] : Object.entries(headers);
  return Object.fromEntries(entries.filter(([name]) => !isSensitiveHeader(name)));
}

function headerValue(headers, name) {
  if (headers?.get) return headers.get(name) || '';
  if (headers && typeof headers === 'object') {
    const expected = name.toLowerCase();
    const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === expected);
    return entry?.[1] || '';
  }
  return '';
}

function contentTypeIs(headers, expected) {
  return headerValue(headers, 'content-type').toLowerCase().includes(expected);
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function sitemapUrls(body) {
  return [...body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    decodeXml(match[1].trim())
  );
}

function normalizeComparableUrl(value) {
  if (!value) return '';
  const url = new URL(value);
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, '');
  return url.href;
}

function parseLinkTags(body) {
  return [...body.matchAll(/<link\b[^>]*>/gi)].map((match) => {
    const attributes = {};
    for (const attribute of match[0].matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)) {
      attributes[attribute[1].toLowerCase()] = attribute[2];
    }
    return attributes;
  });
}

function verifyOwnerBody(body, expectedCanonical, expectedAlternates) {
  const detail = [];
  const links = parseLinkTags(body);
  const canonicals = links.filter((link) =>
    link.rel?.toLowerCase().split(/\s+/).includes('canonical')
  );
  if (
    canonicals.length !== 1 ||
    !canonicals[0]?.href ||
    normalizeComparableUrl(canonicals[0].href) !== normalizeComparableUrl(expectedCanonical)
  ) {
    detail.push('missing exact self-canonical link');
  }
  for (const [hreflang, expected] of Object.entries(expectedAlternates)) {
    const matches = links.filter(
      (link) =>
        link.rel?.toLowerCase().split(/\s+/).includes('alternate') &&
        link.hreflang?.toLowerCase() === hreflang.toLowerCase()
    );
    if (
      matches.length !== 1 ||
      !matches[0]?.href ||
      normalizeComparableUrl(matches[0].href) !== normalizeComparableUrl(expected)
    ) {
      detail.push(`missing exact ${hreflang} alternate`);
    }
  }
  return detail;
}

function persistResponse(artifactDirectory, relativePath, bytes) {
  if (!artifactDirectory) return;
  const outputPath = path.join(artifactDirectory, relativePath);
  const relative = path.relative(path.resolve(artifactDirectory), path.resolve(outputPath));
  if (relative.startsWith('..') || path.isAbsolute(relative))
    throw contractError('unsafe response artifact path');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, bytes);
}

async function readResponse(response) {
  const bytes =
    typeof response.arrayBuffer === 'function'
      ? Buffer.from(await response.arrayBuffer())
      : Buffer.from(await response.text(), 'utf8');
  return { body: bytes.toString('utf8'), bytes };
}

function checkResult(name, detail, request, response, body, artifactDirectory, capturedAt) {
  const host = request.host;
  const artifactName = `${host}-${name.replace(/[^a-z0-9-]+/gi, '-')}.body`;
  const relativePath = `responses/${artifactName}`;
  const bytes = Buffer.from(body, 'utf8');
  persistResponse(artifactDirectory, artifactName, bytes);
  return {
    check: {
      name,
      host,
      path: request.path,
      status: detail.length ? 'blocked' : 'passed',
      detail: detail.length ? detail.join('; ') : `HTTP ${response.status} ${request.path}`
    },
    response: {
      name,
      host,
      requestPath: request.path,
      requestUrl: request.url,
      status: response.status,
      headers: serializedHeaders(response.headers),
      bytes: bytes.length,
      sha256: sha256(bytes),
      artifactPath: relativePath,
      capturedAt
    },
    artifact: {
      path: relativePath,
      role: 'documentation-host-response',
      bytes: bytes.length,
      sha256: sha256(bytes),
      capturedAt
    }
  };
}

async function fetchChecked(request) {
  try {
    const response = await fetch(request.url, { redirect: 'manual' });
    const { body } = await readResponse(response);
    return { response, body };
  } catch (error) {
    return { error, response: undefined, body: '' };
  }
}

function expectedOwnerUrls(normalized) {
  const expected = {};
  for (const host of DOCUMENTATION_HOSTS) {
    expected[host] = normalized.ownerRoutes[host].map(
      (routePath) => new URL(routePath, normalized.targets[host]).href
    );
  }
  return expected;
}

async function runDocumentationHostContract({
  cnTarget,
  ioTarget,
  targets,
  contract,
  rollback,
  artifactDirectory
}) {
  const normalizedContract = validateContract(contract, targets || { cn: cnTarget, io: ioTarget });
  if (rollback !== undefined) {
    normalizedContract.rollback = validateRollback(rollback);
    normalizedContract.blockers = normalizedContract.blockers.filter(
      ({ code }) => code !== 'documentation-host-rollback-missing'
    );
  }
  const capturedAt = new Date().toISOString();
  const checks = [];
  const responses = [];
  const artifacts = [];
  const expectedOwners = expectedOwnerUrls(normalizedContract);

  async function run(name, host, pathValue, evaluate, query = '') {
    const url = new URL(pathValue, normalizedContract.targets[host]);
    url.search = query;
    const result = await fetchChecked({ name, host, path: pathValue, url: url.href });
    let detail;
    if (result.error) detail = [result.error.message];
    else {
      try {
        detail = evaluate(result.response, result.body);
      } catch (error) {
        detail = [error.message];
      }
    }
    const checked = checkResult(
      name,
      detail,
      { name, host, path: pathValue, url: url.href },
      result.response || { status: 0, headers: new Headers() },
      result.body,
      artifactDirectory,
      capturedAt
    );
    checks.push(checked.check);
    if (checked.response) responses.push(checked.response);
    if (checked.artifact) artifacts.push(checked.artifact);
  }

  for (const host of DOCUMENTATION_HOSTS) {
    for (const routePath of normalizedContract.ownerRoutes[host]) {
      const expectedCanonical = new URL(routePath, normalizedContract.targets[host]).href;
      const expectedAlternates = {
        'zh-CN': new URL(
          sampleLocalePath(routePath.replace(/^\/(?:en|zh-CN)(?=\/|$)/, '/en'), 'zh-CN'),
          normalizedContract.targets.cn
        ).href,
        en: new URL(
          sampleLocalePath(routePath.replace(/^\/(?:en|zh-CN)(?=\/|$)/, '/en'), 'en'),
          normalizedContract.targets.io
        ).href
      };
      await run(`owner-${host}-${checks.length + 1}`, host, routePath, (response, body) => {
        const detail = [];
        if (response.status !== 200) detail.push(`expected HTTP 200, received ${response.status}`);
        if (!contentTypeIs(response.headers, 'text/html'))
          detail.push('response content type is not text/html');
        detail.push(...verifyOwnerBody(body, expectedCanonical, expectedAlternates));
        return detail;
      });
    }
  }

  for (const [index, redirect] of normalizedContract.redirectRoutes.entries()) {
    const target = new URL(redirect.targetPath, normalizedContract.targets[redirect.targetHost]);
    target.search = normalizedContract.query;
    await run(
      `redirect-${index + 1}`,
      redirect.sourceHost,
      redirect.sourcePath,
      (response) => {
        const detail = [];
        if (response.status !== 301) detail.push(`expected HTTP 301, received ${response.status}`);
        const location = headerValue(response.headers, 'location');
        if (!location) detail.push('missing Location header');
        else {
          try {
            const actual = new URL(location);
            if (
              actual.protocol !== 'https:' ||
              actual.username ||
              actual.password ||
              actual.hash ||
              actual.origin !== target.origin ||
              normalizeComparableUrl(actual.href) !== normalizeComparableUrl(target.href)
            ) {
              detail.push(`Location differs from ${target.href}`);
            }
          } catch (error) {
            detail.push(`Location is invalid: ${error.message}`);
          }
        }
        return detail;
      },
      normalizedContract.query
    );
  }

  for (const host of DOCUMENTATION_HOSTS) {
    const robotsPath = '/robots.txt';
    await run(`robots-${host}`, host, robotsPath, (response, body) => {
      const detail = [];
      const sitemap = new URL('/sitemap.xml', normalizedContract.targets[host]).href;
      if (response.status !== 200) detail.push(`expected HTTP 200, received ${response.status}`);
      if (!contentTypeIs(response.headers, 'text/plain'))
        detail.push('response content type is not text/plain');
      const wildcardBlock =
        body.match(/user-agent\s*:\s*\*\s*\n([\s\S]*?)(?:\n\s*\n|$)/i)?.[1] || '';
      if (
        !wildcardBlock ||
        !/allow\s*:\s*\//i.test(wildcardBlock) ||
        /disallow\s*:\s*\/\s*$/im.test(wildcardBlock)
      ) {
        detail.push('robots wildcard policy must allow /');
      }
      const sitemapMatches = [...body.matchAll(/^\s*Sitemap\s*:\s*(\S+)\s*$/gim)].map(
        (match) => match[1]
      );
      if (!sitemapMatches.includes(sitemap)) detail.push(`robots must point to ${sitemap}`);
      if (
        sitemapMatches.some((value) => {
          try {
            const sitemapUrl = new URL(value);
            return (
              sitemapUrl.protocol !== 'https:' ||
              sitemapUrl.username ||
              sitemapUrl.password ||
              sitemapUrl.hash ||
              sitemapUrl.origin !== normalizedContract.targets[host].origin
            );
          } catch {
            return true;
          }
        })
      ) {
        detail.push('robots contains a foreign or invalid sitemap host');
      }
      const policy = normalizedContract.robots[host] || {};
      for (const marker of policy.bodyIncludes || []) {
        if (!body.includes(marker)) detail.push(`robots is missing body marker: ${marker}`);
      }
      for (const marker of policy.bodyExcludes || []) {
        if (body.includes(marker)) detail.push(`robots contains forbidden body marker: ${marker}`);
      }
      return detail;
    });

    await run(`sitemap-${host}`, host, '/sitemap.xml', (response, body) => {
      const detail = [];
      if (response.status !== 200) detail.push(`expected HTTP 200, received ${response.status}`);
      if (
        !contentTypeIs(response.headers, 'application/xml') &&
        !contentTypeIs(response.headers, 'text/xml')
      )
        detail.push('response content type is not XML');
      const urls = sitemapUrls(body);
      const normalizedUrls = urls.map((value) => {
        try {
          return normalizeComparableUrl(value);
        } catch {
          return '';
        }
      });
      const uniqueUrls = new Set(normalizedUrls.filter(Boolean));
      if (uniqueUrls.size !== urls.length) detail.push('sitemap contains duplicate URLs');
      for (const urlValue of urls) {
        try {
          const url = new URL(urlValue);
          if (url.origin !== normalizedContract.targets[host].origin)
            detail.push('sitemap contains a foreign host');
          const ownerLocale = `/${DOCUMENTATION_LOCALES[host]}`;
          if (url.pathname !== ownerLocale && !url.pathname.startsWith(`${ownerLocale}/`)) {
            detail.push(`sitemap contains a non-owner locale: ${url.pathname}`);
          }
        } catch (error) {
          detail.push(`sitemap URL is invalid: ${error.message}`);
        }
      }
      for (const expected of expectedOwners[host]) {
        if (!normalizedUrls.some((candidate) => candidate === normalizeComparableUrl(expected))) {
          detail.push(`sitemap is missing ${expected}`);
        }
      }
      return detail;
    });
  }

  const blockers = [...normalizedContract.blockers];
  if (!normalizedContract.rollback) blockers.push({ code: 'documentation-host-rollback-missing' });
  return {
    producer: 'fastgpt-documentation-host-owner-routing-runner',
    runnerVersion: 1,
    schemaVersion: DOCUMENTATION_HOST_SCHEMA_VERSION,
    kind: DOCUMENTATION_HOST_KIND,
    status:
      checks.every((check) => check.status === 'passed') && blockers.length === 0
        ? 'passed'
        : 'blocked',
    repository: normalizedContract.repository,
    revision: normalizedContract.revision,
    targets: Object.fromEntries(
      DOCUMENTATION_HOSTS.map((host) => [host, normalizedContract.targets[host].href])
    ),
    englishSampleCount: normalizedContract.sample.length,
    ownerRouteCounts: Object.fromEntries(
      DOCUMENTATION_HOSTS.map((host) => [host, normalizedContract.ownerRoutes[host].length])
    ),
    checks,
    responses,
    artifacts,
    rollback: normalizedContract.rollback,
    blockers,
    capturedAt
  };
}

module.exports = {
  DOCUMENTATION_HOST_KIND,
  DOCUMENTATION_HOST_SCHEMA_VERSION,
  DOCUMENTATION_HOSTS,
  DOCUMENTATION_LOCALES,
  normalizePath,
  normalizeQuery,
  parseTarget,
  parseHttpsTarget: parseTarget,
  validateContract,
  validateDocumentationHostContract: validateContract,
  validateRollback,
  runDocumentationHostContract,
  runDocumentationContract: runDocumentationHostContract
};
