const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { isPublicHttpsTarget } = require('./release-readiness');
const {
  LEGACY_HOST,
  TERMINAL_HOST,
  readCustomerMigrationAuthority
} = require('./customer-migration');

const CUSTOMER_HTTP_SCHEMA_VERSION = 1;
const CUSTOMER_HTTP_KIND = 'customer-migration-http';
const DEFAULT_QUERY = 'customer-migration-contract=1';
const DEFAULT_CONCURRENCY = 8;
const REVISION_PATTERN = /^[a-f0-9]{7,64}$/i;

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function parseHttpsOrigin(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} is required`);
  let origin;
  try {
    origin = new URL(value.trim());
  } catch (error) {
    throw new Error(`${label} is invalid: ${error.message}`);
  }
  if (origin.protocol !== 'https:' || origin.username || origin.password) {
    throw new Error(`${label} must be an HTTPS origin without credentials`);
  }
  if (!isPublicHttpsTarget(origin.href)) throw new Error(`${label} must use a public hostname`);
  if (origin.pathname !== '/' && origin.pathname !== '') {
    throw new Error(`${label} must not contain a path prefix`);
  }
  origin.pathname = '';
  origin.search = '';
  origin.hash = '';
  return origin;
}

function normalizeQuery(value) {
  const query =
    typeof value === 'string' && value.trim() ? value.trim().replace(/^\?/, '') : DEFAULT_QUERY;
  if (!query || query.includes('#') || /\s/.test(query)) {
    throw new Error(
      'Customer HTTP contract query must be a non-empty query without spaces or fragments'
    );
  }
  try {
    new URL(`https://customer-migration.invalid/?${query}`);
  } catch (error) {
    throw new Error(`Customer HTTP contract query is invalid: ${error.message}`);
  }
  return `?${query}`;
}

function normalizeExpectedStatus(value, label) {
  const status = value ?? 200;
  if (!Number.isInteger(status) || status < 100 || status > 599) {
    throw new Error(`${label} expectedStatus must be an HTTP status`);
  }
  return status;
}

function normalizeBodyMarkers(value, label) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((marker) => typeof marker !== 'string' || !marker)) {
    throw new Error(`${label} body markers must be non-empty strings`);
  }
  return [...value];
}

function normalizeHeaderAssertions(value, label) {
  if (value === undefined) return {};
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} headers must be an object`);
  }
  return Object.fromEntries(
    Object.entries(value).map(([name, expected]) => {
      if (!name || typeof expected !== 'string' || !expected) {
        throw new Error(`${label} headers must contain non-empty string values`);
      }
      return [name.toLowerCase(), expected];
    })
  );
}

function normalizeLegacyDiscovery(discovery, terminalOrigin) {
  if (!discovery || typeof discovery !== 'object' || Array.isArray(discovery)) {
    throw new Error('Customer HTTP legacyDiscovery must be an object');
  }
  const defaults = {
    robots: {
      path: '/robots.txt',
      expectedStatus: 200,
      headers: { 'content-type': 'text/plain' },
      bodyIncludes: ['User-agent: *', 'Allow: /', `Sitemap: ${terminalOrigin.origin}/sitemap.xml`],
      bodyExcludes: ['Disallow: /']
    },
    sitemap: {
      path: '/sitemap.xml',
      expectedStatus: 301,
      locationPath: '/sitemap.xml'
    },
    llms: {
      path: '/llms.txt',
      expectedStatus: 301,
      locationPath: '/llms.txt'
    }
  };
  return Object.fromEntries(
    Object.entries(defaults).map(([name, fallback]) => {
      const input = discovery[name];
      if (input !== undefined && (!input || typeof input !== 'object' || Array.isArray(input))) {
        throw new Error(`Customer HTTP legacyDiscovery.${name} must be an object`);
      }
      const value = { ...fallback, ...(input || {}) };
      const path = validatePath(value.path, `Customer HTTP legacyDiscovery.${name}.path`);
      const expectedStatus = normalizeExpectedStatus(
        value.expectedStatus,
        `Customer HTTP legacyDiscovery.${name}`
      );
      const headers = normalizeHeaderAssertions(
        value.headers,
        `Customer HTTP legacyDiscovery.${name}`
      );
      const bodyIncludes = normalizeBodyMarkers(
        value.bodyIncludes,
        `Customer HTTP legacyDiscovery.${name}`
      );
      const bodyExcludes = normalizeBodyMarkers(
        value.bodyExcludes,
        `Customer HTTP legacyDiscovery.${name}`
      );
      const locationPath = value.locationPath
        ? validatePath(value.locationPath, `Customer HTTP legacyDiscovery.${name}.locationPath`)
        : undefined;
      return [name, { path, expectedStatus, headers, bodyIncludes, bodyExcludes, locationPath }];
    })
  );
}

function normalizeRepository(value) {
  if (!value || typeof value !== 'object') return {};
  const repository = {};
  if (typeof value.name === 'string' && value.name.trim()) repository.name = value.name.trim();
  if (typeof value.owner === 'string' && value.owner.trim()) repository.owner = value.owner.trim();
  if (typeof value.url === 'string' && value.url.trim()) {
    const url = new URL(value.url.trim());
    if (url.protocol !== 'https:' || url.username || url.password) {
      throw new Error('Customer HTTP owner repository must use HTTPS without credentials');
    }
    url.search = '';
    url.hash = '';
    repository.url = url.href;
  }
  return repository;
}

function validatePath(value, label) {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    value.includes('\0') ||
    value.includes('?') ||
    value.includes('#') ||
    value.split('/').includes('..')
  ) {
    throw new Error(`${label} must be a clean absolute path`);
  }
  return value;
}

function validateContract(contract, authority, legacyOrigin, terminalOrigin) {
  if (!contract || typeof contract !== 'object') {
    throw new Error('Customer HTTP contract must be an object');
  }
  if (contract.schemaVersion !== CUSTOMER_HTTP_SCHEMA_VERSION) {
    throw new Error(`Unsupported customer HTTP contract schemaVersion: ${contract.schemaVersion}`);
  }
  if (contract.kind !== CUSTOMER_HTTP_KIND || contract.authority !== 'customer-migration') {
    throw new Error('Customer HTTP contract kind or authority is invalid');
  }
  if (contract.authorityDigest !== authority.authority.digest) {
    throw new Error(
      'Customer HTTP contract authority digest disagrees with the committed authority'
    );
  }
  if (
    contract.legacyOrigin &&
    parseHttpsOrigin(contract.legacyOrigin, 'contract legacyOrigin').origin !== legacyOrigin.origin
  ) {
    throw new Error('Customer HTTP contract legacyOrigin disagrees with the requested target');
  }
  if (
    contract.terminalOrigin &&
    parseHttpsOrigin(contract.terminalOrigin, 'contract terminalOrigin').origin !==
      terminalOrigin.origin
  ) {
    throw new Error('Customer HTTP contract terminalOrigin disagrees with the requested target');
  }
  if (contract.sourceHost && contract.sourceHost !== LEGACY_HOST) {
    throw new Error(`Customer HTTP contract sourceHost must be ${LEGACY_HOST}`);
  }
  if (contract.targetHost && contract.targetHost !== TERMINAL_HOST) {
    throw new Error(`Customer HTTP contract targetHost must be ${TERMINAL_HOST}`);
  }
  const sitemapPath = validatePath(
    contract.sitemapPath || '/sitemap.xml',
    'Customer HTTP sitemapPath'
  );
  const legacyDiscovery = contract.legacyDiscovery
    ? normalizeLegacyDiscovery(contract.legacyDiscovery, terminalOrigin)
    : undefined;
  const llmsPath = contract.llmsPath
    ? validatePath(contract.llmsPath, 'Customer HTTP llmsPath')
    : undefined;
  const llmsBodyIncludes = normalizeBodyMarkers(contract.llmsBodyIncludes, 'Customer HTTP llms');
  const llmsBodyExcludes = normalizeBodyMarkers(contract.llmsBodyExcludes, 'Customer HTTP llms');
  const llmsHeaders = normalizeHeaderAssertions(
    contract.llmsPath ? contract.llmsHeaders || { 'content-type': 'text/plain' } : undefined,
    'Customer HTTP llms'
  );
  const query = normalizeQuery(contract.query);
  const repository = normalizeRepository(contract.repository);
  const revision = typeof contract.revision === 'string' ? contract.revision.trim() : '';
  const blockers = [];
  if (!repository.url && !repository.name)
    blockers.push({ code: 'customer-http-owner-repository-missing' });
  if (!REVISION_PATTERN.test(revision))
    blockers.push({ code: 'customer-http-owner-revision-invalid' });
  if (contract.approvedTargets !== true)
    blockers.push({ code: 'customer-http-targets-unapproved' });
  return {
    blockers,
    legacyDiscovery,
    llmsBodyExcludes,
    llmsBodyIncludes,
    llmsHeaders,
    llmsPath,
    query,
    repository,
    revision,
    sitemapPath
  };
}

function canonicalInBody(body, expectedCanonical) {
  for (const match of body.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1] || '';
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] || '';
    if (rel.split(/\s+/).includes('canonical') && href === expectedCanonical) {
      return true;
    }
  }
  return false;
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function sitemapUrlList(body) {
  return [...body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) =>
    decodeXml(match[1].trim())
  );
}

function sitemapUrls(body) {
  return new Set(sitemapUrlList(body));
}

function bodyMarkers(body, markers, expected) {
  return markers
    .filter((marker) => (expected ? !body.includes(marker) : body.includes(marker)))
    .map((marker) =>
      expected ? `missing body marker: ${marker}` : `forbidden body marker: ${marker}`
    );
}

function headerAssertions(headers, assertions) {
  return Object.entries(assertions).flatMap(([name, expected]) => {
    const actual = headers?.get?.(name);
    return actual && actual.toLowerCase().includes(expected.toLowerCase())
      ? []
      : [`header ${name} did not include: ${expected}`];
  });
}

function serializableHeaders(headers) {
  if (!headers || typeof headers.entries !== 'function') return {};
  return Object.fromEntries(
    [...headers.entries()].filter(
      ([name]) => !/(authorization|cookie|token|secret|password|api[-_]?key)/i.test(name)
    )
  );
}

function artifactName(role, index) {
  return `responses/${role}-${String(index + 1).padStart(3, '0')}.body`;
}

function responseName(role, index) {
  return ['source', 'target', 'preserved-asset', 'preserved-reference'].includes(role)
    ? `${role}-${String(index + 1).padStart(3, '0')}`
    : role;
}

function persistArtifact(artifactDirectory, relativePath, bytes) {
  if (!artifactDirectory) return;
  const outputPath = path.join(artifactDirectory, relativePath);
  const relative = path.relative(path.resolve(artifactDirectory), path.resolve(outputPath));
  if (relative.startsWith('..') || path.isAbsolute(relative))
    throw new Error('Unsafe customer HTTP artifact path');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, bytes);
}

async function fetchBody(url, role, index, artifactDirectory, capturedAt, expectedStatus) {
  const requestUrl = url.href;
  try {
    const response = await fetch(url, { redirect: 'manual' });
    const bytes = Buffer.from(await response.arrayBuffer());
    const relativePath = artifactName(role, index);
    persistArtifact(artifactDirectory, relativePath, bytes);
    return {
      body: bytes.toString('utf8'),
      response,
      responseRecord: {
        name: responseName(role, index),
        role,
        requestPath: url.pathname,
        requestUrl,
        status: response.status,
        expectedStatus,
        headers: serializableHeaders(response.headers),
        artifactPath: relativePath,
        bytes: bytes.length,
        sha256: sha256(bytes),
        capturedAt
      },
      artifact: {
        role,
        path: relativePath,
        bytes: bytes.length,
        sha256: sha256(bytes),
        capturedAt
      }
    };
  } catch (error) {
    return {
      error: error.message,
      responseRecord: {
        name: responseName(role, index),
        role,
        requestPath: url.pathname,
        requestUrl,
        expectedStatus,
        capturedAt,
        error: error.message
      }
    };
  }
}

async function mapLimit(items, limit, callback) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function sourceRequestUrl(origin, sourcePath, query) {
  const url = new URL(sourcePath, origin);
  url.search = query;
  return url;
}

function terminalRequestUrl(origin, targetPath, search) {
  const url = new URL(targetPath, origin);
  url.search = search || '';
  return url;
}

function verifyRedirect(response, location, record, expectedQuery, legacyOrigin, terminalOrigin) {
  const details = [];
  if (!response) return ['source request failed'];
  if (response.status !== 301) details.push(`expected HTTP 301, received ${response.status}`);
  if (!location) return [...details, 'missing Location header'];
  let target;
  try {
    target = new URL(location, legacyOrigin);
  } catch (error) {
    return [...details, `Location is invalid: ${error.message}`];
  }
  if (target.protocol !== 'https:' || target.origin !== terminalOrigin.origin) {
    details.push('Location must be an absolute HTTPS terminal-origin URL');
  }
  if (target.pathname !== record.targetPath)
    details.push(`Location path must be ${record.targetPath}`);
  if (target.search !== expectedQuery) details.push('Location did not preserve the contract query');
  if (target.hash) details.push('Location must not contain a fragment');
  return details;
}

function verifyPreservedResponse(result, expected) {
  const details = [];
  if (result.error) return [`request failed: ${result.error}`];
  if (result.response.status !== expected.expectedStatus) {
    details.push(
      `expected HTTP ${expected.expectedStatus}, received ${result.response.status}`
    );
  }
  const contentType = result.response.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes(expected.expectedContentType.toLowerCase())) {
    details.push(`Content-Type must include ${expected.expectedContentType}`);
  }
  if (result.artifact?.sha256 !== expected.expectedBodySha256) {
    details.push(`body SHA-256 must be ${expected.expectedBodySha256}`);
  }
  return details;
}

function verifyDiscoveryResponse(
  response,
  body,
  location,
  endpoint,
  expectedQuery,
  terminalOrigin
) {
  const details = [];
  if (!response) return ['discovery request failed'];
  if (response.status !== endpoint.expectedStatus) {
    details.push(`expected HTTP ${endpoint.expectedStatus}, received ${response.status}`);
  }
  details.push(...headerAssertions(response.headers, endpoint.headers));
  details.push(...bodyMarkers(body, endpoint.bodyIncludes, true));
  details.push(...bodyMarkers(body, endpoint.bodyExcludes, false));
  if (endpoint.locationPath) {
    if (!location) {
      details.push('missing Location header');
      return details;
    }
    let target;
    try {
      target = new URL(location);
    } catch (error) {
      details.push(`Location is invalid: ${error.message}`);
      return details;
    }
    if (target.protocol !== 'https:' || target.origin !== terminalOrigin.origin) {
      details.push('Location must be an absolute HTTPS terminal-origin URL');
    }
    if (target.pathname !== endpoint.locationPath) {
      details.push(`Location path must be ${endpoint.locationPath}`);
    }
    if (target.search !== expectedQuery) {
      details.push('Location did not preserve the contract query');
    }
    if (target.hash) details.push('Location must not contain a fragment');
  }
  return details;
}

function verifyCustomerLlms(
  body,
  response,
  origin,
  authority,
  headers,
  bodyIncludes,
  bodyExcludes
) {
  const details = [];
  if (!response) return ['terminal llms request failed'];
  if (response.status !== 200)
    details.push(`expected terminal llms HTTP 200, received ${response.status}`);
  details.push(...headerAssertions(response.headers, headers));
  details.push(...bodyMarkers(body, bodyIncludes, true));
  details.push(...bodyMarkers(body, bodyExcludes, false));
  const expectedLinks = [
    `${origin.origin}${authority.routeAuthority.hub}`,
    ...authority.routeAuthority.details.map((detail) => `${origin.origin}${detail.path}`)
  ];
  const countExactUrl = (link) => {
    const escaped = link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return body.match(new RegExp(`${escaped}(?![/a-z0-9_-])`, 'gi'))?.length || 0;
  };
  expectedLinks.forEach((link) => {
    const occurrences = countExactUrl(link);
    if (occurrences !== 1) details.push(`terminal llms must contain ${link} once`);
  });
  if (/\/solutions\/|\/customers\/solution\/[^\s)]+\/markdown/.test(body)) {
    details.push('terminal llms contains a legacy projection URL');
  }
  if (
    /\b(?:evidenceSource|sourceSha256|sourceRow|sourceClass|rawTargetUrl|sourceUrl|provenance|disposition)\b/.test(
      body
    )
  ) {
    details.push('terminal llms contains internal migration metadata');
  }
  return details;
}

/** Run the two-origin customer migration contract against an approved preview edge. */
async function runCustomerMigrationHttpContract({
  legacyTarget,
  terminalTarget,
  approvedLegacyTarget,
  approvedTerminalTarget,
  contract,
  rootDir = process.cwd(),
  artifactDirectory,
  concurrency = DEFAULT_CONCURRENCY
}) {
  const legacyOrigin = parseHttpsOrigin(legacyTarget, 'Customer legacy target');
  const terminalOrigin = parseHttpsOrigin(terminalTarget, 'Customer terminal target');
  const authority = readCustomerMigrationAuthority(rootDir);
  const contractResult = validateContract(contract, authority, legacyOrigin, terminalOrigin);
  const blockers = [...contractResult.blockers];
  if (approvedLegacyTarget) {
    if (
      parseHttpsOrigin(approvedLegacyTarget, 'Approved customer legacy target').origin !==
      legacyOrigin.origin
    ) {
      blockers.push({ code: 'customer-http-legacy-target-differs-from-approved' });
    }
  } else {
    blockers.push({ code: 'customer-http-legacy-target-unapproved' });
  }
  if (approvedTerminalTarget) {
    if (
      parseHttpsOrigin(approvedTerminalTarget, 'Approved customer terminal target').origin !==
      terminalOrigin.origin
    ) {
      blockers.push({ code: 'customer-http-terminal-target-differs-from-approved' });
    }
  } else {
    blockers.push({ code: 'customer-http-terminal-target-unapproved' });
  }
  if (typeof fetch !== 'function') throw new Error('Node fetch is unavailable');
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 32) {
    throw new Error('Customer HTTP concurrency must be an integer from 1 to 32');
  }

  const capturedAt = new Date().toISOString();
  const checks = [];
  const artifacts = [];
  const responses = [];
  const sitemapUrl = new URL(contractResult.sitemapPath, terminalOrigin);
  const sitemapResult = await fetchBody(
    sitemapUrl,
    'sitemap',
    0,
    artifactDirectory,
    capturedAt,
    200
  );
  if (sitemapResult.responseRecord) responses.push(sitemapResult.responseRecord);
  if (sitemapResult.artifact) artifacts.push(sitemapResult.artifact);
  const sitemapDetails = [];
  const sitemapList = sitemapResult.error ? [] : sitemapUrlList(sitemapResult.body);
  const sitemapSet = new Set(sitemapList);
  if (sitemapResult.error) sitemapDetails.push(`request failed: ${sitemapResult.error}`);
  else if (sitemapResult.response.status !== 200)
    sitemapDetails.push(`expected HTTP 200, received ${sitemapResult.response.status}`);
  const expectedSitemapSet = new Set(
    authority.targetPaths.map((targetPath) => `${terminalOrigin.origin}${targetPath}`)
  );
  for (const expectedUrl of expectedSitemapSet) {
    if (!sitemapSet.has(expectedUrl)) sitemapDetails.push(`sitemap is missing ${expectedUrl}`);
  }
  for (const actualUrl of sitemapSet) {
    if (!expectedSitemapSet.has(actualUrl))
      sitemapDetails.push(`sitemap contains unexpected ${actualUrl}`);
  }
  if (!sitemapResult.error && sitemapSet.size !== expectedSitemapSet.size) {
    sitemapDetails.push(
      `sitemap contains ${sitemapSet.size} URLs, expected ${expectedSitemapSet.size}`
    );
  }
  if (!sitemapResult.error && sitemapList.length !== sitemapSet.size) {
    sitemapDetails.push('sitemap contains duplicate URLs');
  }
  checks.push({
    name: 'sitemap',
    status: sitemapDetails.length ? 'blocked' : 'passed',
    detail: sitemapDetails.length
      ? sitemapDetails.join('; ')
      : `HTTP 200 ${contractResult.sitemapPath}`,
    requestPath: contractResult.sitemapPath
  });

  if (contractResult.legacyDiscovery) {
    for (const [name, endpoint] of Object.entries(contractResult.legacyDiscovery)) {
      const requestUrl = sourceRequestUrl(legacyOrigin, endpoint.path, contractResult.query);
      const result = await fetchBody(
        requestUrl,
        `legacy-${name}`,
        0,
        artifactDirectory,
        capturedAt,
        endpoint.expectedStatus
      );
      if (result.responseRecord) responses.push(result.responseRecord);
      if (result.artifact) artifacts.push(result.artifact);
      const location = result.response?.headers.get('location') || '';
      const details = verifyDiscoveryResponse(
        result.response,
        result.body || '',
        location,
        endpoint,
        contractResult.query,
        terminalOrigin
      );
      checks.push({
        name: `legacy-${name}`,
        status: details.length ? 'blocked' : 'passed',
        detail: details.length
          ? details.join('; ')
          : `HTTP ${endpoint.expectedStatus} ${endpoint.path}`,
        requestPath: endpoint.path
      });
    }
  }

  if (contractResult.llmsPath) {
    const requestUrl = new URL(contractResult.llmsPath, terminalOrigin);
    const result = await fetchBody(
      requestUrl,
      'terminal-llms',
      0,
      artifactDirectory,
      capturedAt,
      200
    );
    if (result.responseRecord) responses.push(result.responseRecord);
    if (result.artifact) artifacts.push(result.artifact);
    const details = verifyCustomerLlms(
      result.body || '',
      result.response,
      terminalOrigin,
      authority,
      contractResult.llmsHeaders,
      contractResult.llmsBodyIncludes,
      contractResult.llmsBodyExcludes
    );
    checks.push({
      name: 'terminal-llms',
      status: details.length ? 'blocked' : 'passed',
      detail: details.length ? details.join('; ') : `HTTP 200 ${contractResult.llmsPath}`,
      requestPath: contractResult.llmsPath
    });
  }

  const preservedChecks = [];
  let referencedAssetIndex = 0;
  for (const [index, preserved] of authority.preservedAssets.entries()) {
    const result = await fetchBody(
      new URL(preserved.sourcePath, legacyOrigin),
      'preserved-asset',
      index,
      artifactDirectory,
      capturedAt,
      preserved.expectedStatus
    );
    if (result.responseRecord) responses.push(result.responseRecord);
    if (result.artifact) artifacts.push(result.artifact);
    const details = verifyPreservedResponse(result, preserved);
    for (const referenced of preserved.referencedAssets) {
      if (!result.body?.includes(referenced.path)) {
        details.push(`manifest body does not reference ${referenced.path}`);
      }
      const referencedResult = await fetchBody(
        new URL(referenced.path, legacyOrigin),
        'preserved-reference',
        referencedAssetIndex,
        artifactDirectory,
        capturedAt,
        referenced.expectedStatus
      );
      if (referencedResult.responseRecord) responses.push(referencedResult.responseRecord);
      if (referencedResult.artifact) artifacts.push(referencedResult.artifact);
      const referencedDetails = verifyPreservedResponse(referencedResult, referenced);
      preservedChecks.push({
        name: responseName('preserved-reference', referencedAssetIndex),
        releaseUnit: preserved.releaseUnit,
        requestPath: referenced.path,
        status: referencedDetails.length ? 'blocked' : 'passed',
        detail: referencedDetails.length
          ? referencedDetails.join('; ')
          : `HTTP ${referenced.expectedStatus} preserved reference`
      });
      referencedAssetIndex += 1;
    }
    preservedChecks.push({
      name: responseName('preserved-asset', index),
      releaseUnit: preserved.releaseUnit,
      sourceClass: preserved.sourceClass,
      sourcePath: preserved.sourcePath,
      requestPath: preserved.sourcePath,
      status: details.length ? 'blocked' : 'passed',
      detail: details.length
        ? details.join('; ')
        : `HTTP ${preserved.expectedStatus} preserved legacy manifest`
    });
  }
  checks.push(...preservedChecks);

  const targetCache = new Map();
  const targetIndexByPath = new Map(
    authority.targetPaths.map((targetPath, index) => [targetPath, index])
  );
  const targetFor = async (targetPath, search) => {
    const key = `${targetPath}${search || ''}`;
    if (!targetCache.has(key)) {
      const requestUrl = terminalRequestUrl(terminalOrigin, targetPath, search);
      targetCache.set(
        key,
        fetchBody(
          requestUrl,
          'target',
          targetIndexByPath.get(targetPath) ?? targetCache.size,
          artifactDirectory,
          capturedAt,
          200
        )
      );
    }
    return targetCache.get(key);
  };
  const recordResults = await mapLimit(authority.records, concurrency, async (record, index) => {
    const sourceUrl = sourceRequestUrl(legacyOrigin, record.sourcePath, contractResult.query);
    const sourceResult = await fetchBody(
      sourceUrl,
      'source',
      index,
      artifactDirectory,
      capturedAt,
      301
    );
    if (sourceResult.responseRecord) responses.push(sourceResult.responseRecord);
    if (sourceResult.artifact) artifacts.push(sourceResult.artifact);
    const location = sourceResult.response?.headers.get('location') || '';
    const details = verifyRedirect(
      sourceResult.response,
      location,
      record,
      contractResult.query,
      legacyOrigin,
      terminalOrigin
    );
    let locationUrl;
    try {
      locationUrl = new URL(location, legacyOrigin);
    } catch {
      locationUrl = undefined;
    }
    if (location && locationUrl) {
      const targetResult = await targetFor(record.targetPath, locationUrl.search);
      const expectedCanonical = `${terminalOrigin.origin}${record.targetPath}`;
      if (targetResult.error) details.push(`terminal request failed: ${targetResult.error}`);
      else {
        if (targetResult.response.status !== 200) {
          details.push(`expected terminal HTTP 200, received ${targetResult.response.status}`);
        }
        if (!canonicalInBody(targetResult.body, expectedCanonical)) {
          details.push('terminal response is missing the exact self-canonical');
        }
        if (!sitemapSet.has(expectedCanonical))
          details.push('terminal target is missing from the sitemap');
      }
    }
    return {
      name: `source-${String(index + 1).padStart(3, '0')}`,
      sourceClass: record.sourceClass,
      sourcePath: record.sourcePath,
      targetPath: record.targetPath,
      requestPath: record.sourcePath,
      status: details.length ? 'blocked' : 'passed',
      detail: details.length ? details.join('; ') : `301 -> 200 ${record.targetPath}`
    };
  });
  checks.push(...recordResults);
  for (const targetPromise of targetCache.values()) {
    const targetResult = await targetPromise;
    if (targetResult.responseRecord) responses.push(targetResult.responseRecord);
    if (targetResult.artifact) artifacts.push(targetResult.artifact);
  }

  const classSummary = {};
  for (const check of recordResults) {
    const summary = classSummary[check.sourceClass] || { sources: 0, passed: 0, blocked: 0 };
    summary.sources += 1;
    summary[check.status] += 1;
    classSummary[check.sourceClass] = summary;
  }
  const blockedChecks = checks.filter((check) => check.status !== 'passed');
  responses.sort((left, right) => left.name.localeCompare(right.name));
  artifacts.sort((left, right) => left.path.localeCompare(right.path));
  const exitStatus = blockedChecks.length || blockers.length ? 1 : 0;
  return {
    schemaVersion: CUSTOMER_HTTP_SCHEMA_VERSION,
    kind: CUSTOMER_HTTP_KIND,
    producer: 'fastgpt-customer-migration-http-runner',
    runnerVersion: 1,
    status: exitStatus === 0 ? 'passed' : 'blocked',
    exitStatus,
    authorityDigest: authority.authority.digest,
    sourceCount: authority.records.length,
    preservedAssetCount: authority.preservedAssets.length,
    preservedReferencedAssetCount: authority.preservedAssets.reduce(
      (count, asset) => count + asset.referencedAssets.length,
      0
    ),
    targetCount: authority.targetPaths.length,
    sourceClasses: classSummary,
    legacyTarget: legacyOrigin.href,
    terminalTarget: terminalOrigin.href,
    approvedLegacyTarget: Boolean(
      approvedLegacyTarget &&
        parseHttpsOrigin(approvedLegacyTarget, 'Approved customer legacy target').origin ===
          legacyOrigin.origin
    ),
    approvedTerminalTarget: Boolean(
      approvedTerminalTarget &&
        parseHttpsOrigin(approvedTerminalTarget, 'Approved customer terminal target').origin ===
          terminalOrigin.origin
    ),
    repository: contractResult.repository,
    revision: contractResult.revision,
    capturedAt,
    checks,
    artifacts,
    responses,
    blockers
  };
}

module.exports = {
  CUSTOMER_HTTP_KIND,
  CUSTOMER_HTTP_SCHEMA_VERSION,
  DEFAULT_QUERY,
  canonicalInBody,
  normalizeQuery,
  parseHttpsOrigin,
  runCustomerMigrationHttpContract,
  sitemapUrls,
  validateContract
};
