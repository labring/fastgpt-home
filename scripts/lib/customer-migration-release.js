const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const {
  CUSTOMER_HTTP_KIND,
  CUSTOMER_HTTP_SCHEMA_VERSION,
  parseHttpsOrigin,
  runCustomerMigrationHttpContract
} = require('./customer-migration-http');
const {
  LEGACY_HOST,
  TERMINAL_HOST,
  readCustomerMigrationAuthority,
  stableJson
} = require('./customer-migration');

const CUSTOMER_RELEASE_SCHEMA_VERSION = 1;
const CUSTOMER_RELEASE_KIND = 'customer-migration-release';
const CUSTOMER_RELEASE_PRODUCER = 'fastgpt-customer-migration-release-runner';
const CUSTOMER_RELEASE_RUNNER_VERSION = 1;
const OBSERVATION_HOURS = 72;
const REVISION_PATTERN = /^[a-f0-9]{7,64}$/i;
const SHA256_PATTERN = /^[a-f0-9]{64}$/i;
const ENVIRONMENTS = ['preview', 'production'];
const REQUIRED_DISCOVERY_CHECKS = Object.freeze([
  { name: 'sitemap', path: '/sitemap.xml', status: 200 },
  { name: 'legacy-robots', path: '/robots.txt', status: 200 },
  { name: 'legacy-sitemap', path: '/sitemap.xml', status: 301 },
  { name: 'legacy-llms', path: '/llms.txt', status: 301 },
  { name: 'terminal-llms', path: '/llms.txt', status: 200 }
]);

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function stripTimestamps(value) {
  if (Array.isArray(value)) return value.map(stripTimestamps);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !['capturedAt', 'startedAt', 'endedAt'].includes(key))
      .map(([key, entry]) => [key, stripTimestamps(entry)])
  );
}

function digestWithout(value, key) {
  const copy = { ...value };
  delete copy[key];
  return sha256(stableJson(copy));
}

function indexedName(role, index) {
  return `${role}-${String(index + 1).padStart(3, '0')}`;
}

function preservedDescriptors(authority) {
  let referenceIndex = 0;
  return authority.preservedAssets.flatMap((asset, assetIndex) => [
    {
      name: indexedName('preserved-asset', assetIndex),
      releaseUnit: asset.releaseUnit,
      requestPath: asset.sourcePath,
      sourceClass: asset.sourceClass,
      status: asset.expectedStatus
    },
    ...asset.referencedAssets.map((reference) => ({
      name: indexedName('preserved-reference', referenceIndex++),
      releaseUnit: asset.releaseUnit,
      requestPath: reference.path,
      status: reference.expectedStatus
    }))
  ]);
}

function normalizeRepository(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const repository = {};
  for (const key of ['name', 'owner']) {
    if (typeof value[key] === 'string' && value[key].trim()) repository[key] = value[key].trim();
  }
  if (typeof value.url === 'string' && value.url.trim()) {
    const url = new URL(value.url.trim());
    if (url.protocol !== 'https:' || url.username || url.password) {
      throw new Error('Customer migration release repository must use HTTPS without credentials');
    }
    url.search = '';
    url.hash = '';
    repository.url = url.href;
  }
  return repository;
}

function normalizeRevision(value, label) {
  const revision = typeof value === 'string' ? value.trim() : '';
  if (!REVISION_PATTERN.test(revision)) throw new Error(`${label} must be a commit revision`);
  return revision;
}

function normalizeDigest(value, label) {
  if (typeof value !== 'string' || !SHA256_PATTERN.test(value.trim())) {
    throw new Error(`${label} must be a SHA-256 digest`);
  }
  return value.trim().toLowerCase();
}

function normalizeRestorePath(value) {
  const normalized = typeof value === 'string' ? value.trim() : '';
  if (
    !normalized ||
    normalized.includes('\0') ||
    normalized.includes('\\') ||
    normalized.startsWith('/') ||
    /^[a-z]:/i.test(normalized) ||
    normalized.split('/').includes('..')
  ) {
    return undefined;
  }
  return normalized;
}

function normalizeEnvironment(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Customer migration ${name} environment must be an object`);
  }
  const legacyTarget = value.legacyTarget || value.legacyOrigin;
  const terminalTarget = value.terminalTarget || value.terminalOrigin;
  const approvedLegacyTarget = value.approvedLegacyTarget || value.approvedLegacyOrigin;
  const approvedTerminalTarget = value.approvedTerminalTarget || value.approvedTerminalOrigin;
  if (!legacyTarget || !terminalTarget) {
    throw new Error(`Customer migration ${name} environment requires legacy and terminal targets`);
  }
  const legacyOrigin = parseHttpsOrigin(legacyTarget, `${name} customer legacy target`);
  const terminalOrigin = parseHttpsOrigin(terminalTarget, `${name} customer terminal target`);
  if (!approvedLegacyTarget || !approvedTerminalTarget) {
    throw new Error(`Customer migration ${name} environment requires approved targets`);
  }
  if (
    parseHttpsOrigin(approvedLegacyTarget, `${name} approved legacy target`).origin !==
    legacyOrigin.origin
  ) {
    throw new Error(`Customer migration ${name} legacy target differs from its approval`);
  }
  if (
    parseHttpsOrigin(approvedTerminalTarget, `${name} approved terminal target`).origin !==
    terminalOrigin.origin
  ) {
    throw new Error(`Customer migration ${name} terminal target differs from its approval`);
  }
  return {
    approvedLegacyTarget,
    approvedTerminalTarget,
    legacyTarget: legacyOrigin.href,
    terminalTarget: terminalOrigin.href
  };
}

function normalizeRollback(value, authority) {
  const blockers = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      blockers: [{ code: 'customer-migration-rollback-missing' }],
      status: 'blocked',
      tested: false
    };
  }
  const previousIngressRevision =
    typeof value.previousIngressRevision === 'string' ? value.previousIngressRevision.trim() : '';
  if (!REVISION_PATTERN.test(previousIngressRevision)) {
    blockers.push({ code: 'customer-migration-rollback-revision-invalid' });
  }
  const migrationDigest = value.migrationDigest || value.authorityDigest;
  let normalizedMigrationDigest;
  try {
    normalizedMigrationDigest = normalizeDigest(
      migrationDigest,
      'Customer migration rollback digest'
    );
  } catch (error) {
    blockers.push({ code: 'customer-migration-rollback-digest-invalid', detail: error.message });
  }
  if (normalizedMigrationDigest !== authority.authority.digest) {
    blockers.push({ code: 'customer-migration-rollback-digest-mismatch' });
  }
  if (value.status !== 'ready') blockers.push({ code: 'customer-migration-rollback-not-ready' });
  if (value.tested !== true) blockers.push({ code: 'customer-migration-rollback-test-missing' });
  const restorePaths = value.restorePaths || value.restore;
  if (!Array.isArray(restorePaths) || restorePaths.length === 0) {
    blockers.push({ code: 'customer-migration-rollback-restore-set-missing' });
  }
  const normalizedRestorePaths = Array.isArray(restorePaths)
    ? restorePaths.map(normalizeRestorePath).filter(Boolean)
    : [];
  if (Array.isArray(restorePaths) && normalizedRestorePaths.length !== restorePaths.length) {
    blockers.push({ code: 'customer-migration-rollback-restore-path-invalid' });
  }
  const releaseUnits = value.releaseUnits || {};
  for (const unit of ['redirects', 'legacyManifest']) {
    if (releaseUnits[unit] !== 'ready') {
      blockers.push({ code: `customer-migration-rollback-${unit}-not-ready` });
    }
  }
  return {
    blockers,
    migrationDigest: normalizedMigrationDigest,
    previousIngressRevision,
    releaseUnits,
    restorePaths: normalizedRestorePaths,
    status: blockers.length ? 'blocked' : 'ready',
    tested: blockers.length === 0
  };
}

function numberMetric(value, label) {
  if (!Number.isInteger(value) || value < 0)
    throw new Error(`${label} must be a non-negative integer`);
  return value;
}

function metricValue(metrics, names, label) {
  const value = names.map((name) => metrics[name]).find((candidate) => candidate !== undefined);
  return numberMetric(value, label);
}

function normalizeObservation(value, sourceCount, preservedAssetCount) {
  const blockers = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      blockers: [{ code: 'customer-migration-observation-missing' }],
      status: 'blocked',
      tested: false
    };
  }
  const startedAt = typeof value.startedAt === 'string' ? value.startedAt : '';
  const endedAt = typeof value.endedAt === 'string' ? value.endedAt : '';
  const start = Date.parse(startedAt);
  const end = Date.parse(endedAt);
  if (Number.isNaN(start)) blockers.push({ code: 'customer-migration-observation-start-invalid' });
  if (Number.isNaN(end)) blockers.push({ code: 'customer-migration-observation-end-invalid' });
  const windowHours = !Number.isNaN(start) && !Number.isNaN(end) ? (end - start) / 3600000 : 0;
  if (windowHours < OBSERVATION_HOURS) {
    blockers.push({ code: 'customer-migration-observation-window-short' });
  }
  const metrics = value.metrics || value.health || value.checks;
  if (!metrics || typeof metrics !== 'object' || Array.isArray(metrics)) {
    blockers.push({ code: 'customer-migration-observation-metrics-missing' });
  }
  let normalizedMetrics;
  try {
    normalizedMetrics = {
      notFound: metricValue(metrics || {}, ['notFound', 'http404', '404'], 'observation notFound'),
      serverErrors: metricValue(
        metrics || {},
        ['serverErrors', 'http5xx', '5xx'],
        'observation serverErrors'
      ),
      redirects: metricValue(
        metrics || {},
        ['redirects', 'redirectCount'],
        'observation redirects'
      ),
      preservedAssets: metricValue(
        metrics || {},
        ['preservedAssets', 'preservedAssetCount'],
        'observation preservedAssets'
      ),
      canonicalMismatches: metricValue(
        metrics || {},
        ['canonicalMismatches', 'canonicalMismatch'],
        'observation canonicalMismatches'
      )
    };
  } catch (error) {
    blockers.push({
      code: 'customer-migration-observation-metrics-invalid',
      detail: error.message
    });
    normalizedMetrics = {
      notFound: 0,
      serverErrors: 0,
      redirects: 0,
      preservedAssets: 0,
      canonicalMismatches: 0
    };
  }
  if (normalizedMetrics.notFound !== 0)
    blockers.push({ code: 'customer-migration-observation-404s' });
  if (normalizedMetrics.serverErrors !== 0)
    blockers.push({ code: 'customer-migration-observation-5xx' });
  if (normalizedMetrics.redirects !== sourceCount) {
    blockers.push({ code: 'customer-migration-observation-redirect-count' });
  }
  if (normalizedMetrics.preservedAssets !== preservedAssetCount) {
    blockers.push({ code: 'customer-migration-observation-preserved-asset-count' });
  }
  if (normalizedMetrics.canonicalMismatches !== 0) {
    blockers.push({ code: 'customer-migration-observation-canonical-mismatch' });
  }
  const crawlFiles = value.crawlFiles || metrics?.crawlFiles;
  const requiredCrawlFiles = ['robots', 'sitemap', 'llms'];
  if (!crawlFiles || typeof crawlFiles !== 'object' || Array.isArray(crawlFiles)) {
    blockers.push({ code: 'customer-migration-observation-crawl-files-missing' });
  }
  const normalizedCrawlFiles = Object.fromEntries(
    requiredCrawlFiles.map((name) => {
      const raw = crawlFiles?.[name];
      const status = raw === true ? 'passed' : typeof raw === 'string' ? raw : raw?.status;
      if (status !== 'passed')
        blockers.push({ code: `customer-migration-observation-crawl-${name}` });
      return [name, status || 'blocked'];
    })
  );
  if (value.status !== 'passed')
    blockers.push({ code: 'customer-migration-observation-not-passed' });
  return {
    blockers,
    crawlFiles: normalizedCrawlFiles,
    endedAt,
    metrics: normalizedMetrics,
    startedAt,
    status: blockers.length ? 'blocked' : 'passed',
    tested: blockers.length === 0,
    windowHours
  };
}

function validateReleaseContract(contract, authority) {
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
    throw new Error('Customer migration release contract must be an object');
  }
  if (contract.schemaVersion !== CUSTOMER_RELEASE_SCHEMA_VERSION) {
    throw new Error(
      `Unsupported customer migration release schemaVersion: ${contract.schemaVersion}`
    );
  }
  if (contract.kind !== CUSTOMER_RELEASE_KIND || contract.authority !== 'customer-migration') {
    throw new Error('Customer migration release contract kind or authority is invalid');
  }
  if (contract.authorityDigest !== authority.authority.digest) {
    throw new Error('Customer migration release authority digest disagrees with the repository');
  }
  const repository = normalizeRepository(contract.repository);
  const revision = normalizeRevision(contract.revision, 'Customer migration release revision');
  if (!repository.url && !repository.name) {
    throw new Error('Customer migration release repository is required');
  }
  const environments = Object.fromEntries(
    ENVIRONMENTS.map((name) => [name, normalizeEnvironment(contract.environments?.[name], name)])
  );
  const rollback = normalizeRollback(contract.rollback, authority);
  const observation = normalizeObservation(
    contract.observation,
    authority.records.length,
    authority.preservedAssets.length
  );
  if (rollback.blockers.length || observation.blockers.length) {
    throw new Error(
      `Customer migration release contract is blocked: ${[
        ...rollback.blockers,
        ...observation.blockers
      ]
        .map(({ code }) => code)
        .join(', ')}`
    );
  }
  return { environments, observation, repository, revision, rollback };
}

function buildHttpContract(contract, environment, authority) {
  return {
    schemaVersion: CUSTOMER_HTTP_SCHEMA_VERSION,
    kind: CUSTOMER_HTTP_KIND,
    authority: 'customer-migration',
    authorityDigest: authority.authority.digest,
    sourceHost: LEGACY_HOST,
    targetHost: TERMINAL_HOST,
    legacyOrigin: environment.legacyTarget,
    terminalOrigin: environment.terminalTarget,
    sitemapPath: '/sitemap.xml',
    query: contract.query,
    repository: contract.repository,
    revision: contract.revision,
    approvedTargets: true,
    legacyDiscovery: {},
    llmsPath: '/llms.txt',
    llmsHeaders: contract.llmsHeaders || { 'content-type': 'text/plain' },
    llmsBodyIncludes: contract.llmsBodyIncludes || ['## Customer Case Center'],
    llmsBodyExcludes: contract.llmsBodyExcludes || []
  };
}

function prefixArtifacts(value, environment) {
  return (value || []).map((artifact) => ({
    ...artifact,
    path: `${environment}/${artifact.path}`
  }));
}

function prefixResponses(value, environment) {
  return (value || []).map((response) => ({
    ...response,
    artifactPath: `${environment}/${response.artifactPath}`
  }));
}

function normalizeEnvironmentResult(result, environment) {
  return {
    schemaVersion: result.schemaVersion,
    kind: result.kind,
    approvedLegacyTarget: result.approvedLegacyTarget,
    approvedTerminalTarget: result.approvedTerminalTarget,
    artifacts: prefixArtifacts(result.artifacts, environment),
    authorityDigest: result.authorityDigest,
    blockers: result.blockers,
    capturedAt: result.capturedAt,
    checks: result.checks,
    exitStatus: result.exitStatus ?? (result.status === 'passed' ? 0 : 1),
    legacyTarget: result.legacyTarget,
    responses: prefixResponses(result.responses, environment),
    revision: result.revision,
    sourceClasses: result.sourceClasses,
    sourceCount: result.sourceCount,
    preservedAssetCount: result.preservedAssetCount,
    preservedReferencedAssetCount: result.preservedReferencedAssetCount,
    status: result.status,
    targetCount: result.targetCount,
    terminalTarget: result.terminalTarget
  };
}

function verifyEnvironmentEvidence(environment, name, authority, evidenceRoot) {
  const blockers = [];
  if (!environment || environment.status !== 'passed' || environment.exitStatus !== 0) {
    blockers.push(`${name} environment status is not passed`);
    return blockers;
  }
  if (environment.authorityDigest !== authority.authority.digest) {
    blockers.push(`${name} environment authority digest drifted`);
  }
  if (environment.approvedLegacyTarget !== true) {
    blockers.push(`${name} legacy target approval is missing`);
  }
  if (environment.approvedTerminalTarget !== true) {
    blockers.push(`${name} terminal target approval is missing`);
  }
  for (const [field, label] of [
    ['legacyTarget', 'legacy target'],
    ['terminalTarget', 'terminal target']
  ]) {
    try {
      parseHttpsOrigin(environment[field], `${name} ${label}`);
    } catch (error) {
      blockers.push(error.message);
    }
  }
  if (!environment.revision || !REVISION_PATTERN.test(environment.revision)) {
    blockers.push(`${name} environment revision is invalid`);
  }
  if (!environment.capturedAt || Number.isNaN(Date.parse(environment.capturedAt))) {
    blockers.push(`${name} environment timestamp is invalid`);
  }
  if (environment.sourceCount !== authority.records.length) {
    blockers.push(`${name} environment source count drifted`);
  }
  if (environment.preservedAssetCount !== authority.preservedAssets.length) {
    blockers.push(`${name} environment preserved asset count drifted`);
  }
  const expectedReferencedAssetCount = authority.preservedAssets.reduce(
    (count, asset) => count + asset.referencedAssets.length,
    0
  );
  if (environment.preservedReferencedAssetCount !== expectedReferencedAssetCount) {
    blockers.push(`${name} environment preserved reference count drifted`);
  }
  if (environment.targetCount !== authority.targetPaths.length) {
    blockers.push(`${name} environment target count drifted`);
  }
  const observedSourceClassCounts = Object.fromEntries(
    Object.entries(environment.sourceClasses || {}).map(([sourceClass, summary]) => [
      sourceClass,
      summary?.sources
    ])
  );
  if (stableJson(observedSourceClassCounts) !== stableJson(authority.sourceClassCounts)) {
    blockers.push(`${name} source class counts drifted`);
  }
  const checks = Array.isArray(environment.checks) ? environment.checks : [];
  const responses = Array.isArray(environment.responses) ? environment.responses : [];
  const artifacts = Array.isArray(environment.artifacts) ? environment.artifacts : [];
  const preserved = preservedDescriptors(authority);
  const expectedCheckCount =
    REQUIRED_DISCOVERY_CHECKS.length + authority.records.length + preserved.length;
  if (checks.length !== expectedCheckCount) {
    blockers.push(`${name} check count drifted`);
  }
  const checksByName = new Map();
  for (const check of checks) {
    if (!check || typeof check.name !== 'string' || checksByName.has(check.name)) {
      blockers.push(`${name} checks are duplicated or invalid`);
      continue;
    }
    checksByName.set(check.name, check);
  }
  if (checks.some((check) => check?.status !== 'passed')) {
    blockers.push(`${name} contains a failed check`);
  }
  for (const expected of REQUIRED_DISCOVERY_CHECKS) {
    const check = checksByName.get(expected.name);
    if (!check) {
      blockers.push(`${name} is missing ${expected.name} check`);
    } else {
      if (check.requestPath !== expected.path) {
        blockers.push(`${name} ${expected.name} request path drifted`);
      }
    }
  }
  for (const [index, record] of authority.records.entries()) {
    const check = checksByName.get(indexedName('source', index));
    if (!check) {
      blockers.push(`${name} is missing ${indexedName('source', index)} check`);
      continue;
    }
    if (
      check.requestPath !== record.sourcePath ||
      check.sourcePath !== record.sourcePath ||
      check.targetPath !== record.targetPath ||
      check.sourceClass !== record.sourceClass
    ) {
      blockers.push(`${name} ${indexedName('source', index)} mapping drifted`);
    }
  }
  for (const descriptor of preserved) {
    const check = checksByName.get(descriptor.name);
    if (!check) {
      blockers.push(`${name} is missing ${descriptor.name} check`);
      continue;
    }
    if (
      check.requestPath !== descriptor.requestPath ||
      check.releaseUnit !== descriptor.releaseUnit ||
      (descriptor.sourceClass && check.sourceClass !== descriptor.sourceClass)
    ) {
      blockers.push(`${name} ${descriptor.name} preserved asset drifted`);
    }
  }
  const artifactByPath = new Map();
  for (const artifact of artifacts) {
    if (!artifact || typeof artifact.path !== 'string' || artifactByPath.has(artifact.path)) {
      blockers.push(`${name} artifact path is duplicated or invalid`);
      continue;
    }
    if (
      !Number.isInteger(artifact.bytes) ||
      artifact.bytes < 0 ||
      !SHA256_PATTERN.test(artifact.sha256 || '')
    ) {
      blockers.push(`${name} artifact metadata is invalid`);
    }
    if (!artifact.capturedAt || Number.isNaN(Date.parse(artifact.capturedAt))) {
      blockers.push(`${name} artifact timestamp is invalid`);
    }
    artifactByPath.set(artifact.path, artifact);
    if (evidenceRoot) {
      const filePath = path.resolve(evidenceRoot, artifact.path);
      const relative = path.relative(path.resolve(evidenceRoot), filePath);
      if (relative.startsWith('../') || relative === '..' || path.isAbsolute(relative)) {
        blockers.push(`${name} artifact path escapes evidence root`);
      } else if (!fs.existsSync(filePath)) {
        blockers.push(`${name} artifact file is missing: ${artifact.path}`);
      } else {
        const bytes = fs.readFileSync(filePath);
        if (bytes.length !== artifact.bytes || sha256(bytes) !== artifact.sha256) {
          blockers.push(`${name} artifact checksum drifted: ${artifact.path}`);
        }
      }
    }
  }
  const responseDescriptors = [
    ...REQUIRED_DISCOVERY_CHECKS.map(({ name, path: requestPath, status }) => ({
      name,
      requestPath,
      status
    })),
    ...authority.records.map((record, index) => ({
      name: indexedName('source', index),
      requestPath: record.sourcePath,
      status: 301
    })),
    ...preserved,
    ...authority.targetPaths.map((targetPath, index) => ({
      name: indexedName('target', index),
      requestPath: targetPath,
      status: 200
    }))
  ];
  const responseByName = new Map();
  if (responses.length !== responseDescriptors.length) {
    blockers.push(`${name} response count drifted`);
  }
  for (const response of responses) {
    if (!response || typeof response.name !== 'string' || responseByName.has(response.name)) {
      blockers.push(`${name} response name is duplicated or invalid`);
      continue;
    }
    responseByName.set(response.name, response);
    const artifact = artifactByPath.get(response.artifactPath);
    if (!artifact) blockers.push(`${name} response artifact is missing: ${response.name}`);
    else if (artifact.bytes !== response.bytes || artifact.sha256 !== response.sha256) {
      blockers.push(`${name} response checksum drifted: ${response.name}`);
    }
    if (
      !Number.isInteger(response.status) ||
      !Number.isInteger(response.expectedStatus) ||
      response.status !== response.expectedStatus
    ) {
      blockers.push(`${name} response status metadata is invalid: ${response.name}`);
    }
    if (
      !response.headers ||
      typeof response.headers !== 'object' ||
      Array.isArray(response.headers)
    ) {
      blockers.push(`${name} response headers are missing: ${response.name}`);
    }
    if (!response.capturedAt || Number.isNaN(Date.parse(response.capturedAt))) {
      blockers.push(`${name} response timestamp is invalid: ${response.name}`);
    }
  }
  for (const descriptor of responseDescriptors) {
    const response = responseByName.get(descriptor.name);
    if (!response) {
      blockers.push(`${name} response is missing: ${descriptor.name}`);
      continue;
    }
    if (response.requestPath !== descriptor.requestPath) {
      blockers.push(`${name} response path drifted: ${descriptor.name}`);
    }
    if (response.status !== descriptor.status || response.expectedStatus !== descriptor.status) {
      blockers.push(`${name} response status drifted: ${descriptor.name}`);
    }
  }
  if (responses.length !== artifacts.length || responseByName.size !== artifactByPath.size) {
    blockers.push(`${name} response and artifact counts differ`);
  }
  return blockers;
}

/** Run the complete preview and production customer migration evidence contract. */
async function runCustomerMigrationRelease({
  contract,
  rootDir = process.cwd(),
  artifactDirectory
}) {
  const authority = readCustomerMigrationAuthority(rootDir);
  const validated = validateReleaseContract(contract, authority);
  const capturedAt = new Date().toISOString();
  const environments = {};
  for (const name of ENVIRONMENTS) {
    const environment = validated.environments[name];
    try {
      const result = await runCustomerMigrationHttpContract({
        legacyTarget: environment.legacyTarget,
        terminalTarget: environment.terminalTarget,
        approvedLegacyTarget: environment.approvedLegacyTarget,
        approvedTerminalTarget: environment.approvedTerminalTarget,
        contract: buildHttpContract(contract, environment, authority),
        rootDir,
        artifactDirectory: artifactDirectory ? path.join(artifactDirectory, name) : undefined
      });
      environments[name] = normalizeEnvironmentResult(result, name);
    } catch (error) {
      environments[name] = {
        approvedLegacyTarget: false,
        approvedTerminalTarget: false,
        artifacts: [],
        authorityDigest: authority.authority.digest,
        blockers: [{ code: 'customer-migration-http-runner-failed', detail: error.message }],
        capturedAt,
        checks: [],
        exitStatus: 1,
        legacyTarget: environment.legacyTarget,
        responses: [],
        revision: validated.revision,
        sourceClasses: {},
        sourceCount: authority.records.length,
        preservedAssetCount: authority.preservedAssets.length,
        preservedReferencedAssetCount: authority.preservedAssets.reduce(
          (count, asset) => count + asset.referencedAssets.length,
          0
        ),
        status: 'blocked',
        targetCount: authority.targetPaths.length,
        terminalTarget: environment.terminalTarget
      };
    }
  }
  const blockers = [
    ...validated.rollback.blockers,
    ...validated.observation.blockers,
    ...ENVIRONMENTS.flatMap((name) =>
      environments[name].blockers.map((blocker) => ({ environment: name, ...blocker }))
    )
  ];
  const result = {
    producer: CUSTOMER_RELEASE_PRODUCER,
    runnerVersion: CUSTOMER_RELEASE_RUNNER_VERSION,
    schemaVersion: CUSTOMER_RELEASE_SCHEMA_VERSION,
    kind: CUSTOMER_RELEASE_KIND,
    authority: 'customer-migration',
    authorityDigest: authority.authority.digest,
    routeSurface: {
      hub: authority.routeAuthority.hub,
      categories: authority.routeAuthority.categoryCount,
      details: authority.routeAuthority.detailCount,
      routes: authority.routeAuthority.routeCount
    },
    sourceCount: authority.records.length,
    preservedAssetCount: authority.preservedAssets.length,
    targetCount: authority.targetPaths.length,
    repository: validated.repository,
    revision: validated.revision,
    capturedAt,
    environments,
    rollback: validated.rollback,
    observation: validated.observation,
    releaseUnits: {
      redirects: {
        count: authority.records.length,
        observationStatus: validated.observation.status,
        rollbackStatus: validated.rollback.releaseUnits.redirects
      },
      legacyManifest: {
        count: authority.preservedAssets.length,
        referencedAssetCount: authority.preservedAssets.reduce(
          (count, asset) => count + asset.referencedAssets.length,
          0
        ),
        observationStatus: validated.observation.status,
        rollbackStatus: validated.rollback.releaseUnits.legacyManifest
      }
    },
    status: blockers.length ? 'blocked' : 'passed',
    exitStatus: blockers.length ? 1 : 0,
    blockers
  };
  const digestInput = stripTimestamps(result);
  result.digest = digestWithout({ ...digestInput, digest: undefined }, 'digest');
  return result;
}

function verifyCustomerMigrationReleaseEvidence(input, authority, options = {}) {
  if (!input || typeof input !== 'object')
    throw new Error('Customer migration release evidence is required');
  if (
    input.schemaVersion !== CUSTOMER_RELEASE_SCHEMA_VERSION ||
    input.kind !== CUSTOMER_RELEASE_KIND ||
    input.authority !== 'customer-migration'
  ) {
    throw new Error('Customer migration release evidence header is invalid');
  }
  if (input.producer !== CUSTOMER_RELEASE_PRODUCER) {
    throw new Error('Customer migration release evidence producer is invalid');
  }
  if (input.runnerVersion !== CUSTOMER_RELEASE_RUNNER_VERSION) {
    throw new Error('Customer migration release evidence runnerVersion is invalid');
  }
  if (input.authorityDigest !== authority.authority.digest) {
    throw new Error('Customer migration release evidence authority digest drifted');
  }
  const expectedRouteSurface = {
    hub: authority.routeAuthority.hub,
    categories: authority.routeAuthority.categoryCount,
    details: authority.routeAuthority.detailCount,
    routes: authority.routeAuthority.routeCount
  };
  if (stableJson(input.routeSurface || {}) !== stableJson(expectedRouteSurface)) {
    throw new Error('Customer migration release evidence route surface drifted');
  }
  if (!input.capturedAt || Number.isNaN(Date.parse(input.capturedAt))) {
    throw new Error('Customer migration release evidence timestamp is invalid');
  }
  if (!input.repository || typeof input.repository !== 'object') {
    throw new Error('Customer migration release evidence repository is missing');
  }
  if (!input.revision || !REVISION_PATTERN.test(input.revision)) {
    throw new Error('Customer migration release evidence revision is invalid');
  }
  if (
    input.sourceCount !== authority.records.length ||
    input.preservedAssetCount !== authority.preservedAssets.length ||
    input.targetCount !== authority.targetPaths.length
  ) {
    throw new Error('Customer migration release evidence counts drifted');
  }
  const expectedReleaseUnits = {
    redirects: {
      count: authority.records.length,
      observationStatus: 'passed',
      rollbackStatus: 'ready'
    },
    legacyManifest: {
      count: authority.preservedAssets.length,
      referencedAssetCount: authority.preservedAssets.reduce(
        (count, asset) => count + asset.referencedAssets.length,
        0
      ),
      observationStatus: 'passed',
      rollbackStatus: 'ready'
    }
  };
  if (stableJson(input.releaseUnits) !== stableJson(expectedReleaseUnits)) {
    throw new Error('Customer migration release units drifted');
  }
  for (const name of ENVIRONMENTS) {
    const environment = input.environments?.[name];
    const blockers = verifyEnvironmentEvidence(environment, name, authority, options.evidenceRoot);
    if (blockers.length) throw new Error(blockers.join('; '));
  }
  const rollback = normalizeRollback(input.rollback, authority);
  if (rollback.blockers.length || rollback.status !== 'ready' || rollback.tested !== true) {
    throw new Error(
      `Customer migration rollback evidence is not tested: ${rollback.blockers
        .map(({ code }) => code)
        .join(', ')}`
    );
  }
  const observation = normalizeObservation(
    input.observation,
    authority.records.length,
    authority.preservedAssets.length
  );
  if (
    observation.blockers.length ||
    observation.status !== 'passed' ||
    observation.tested !== true
  ) {
    throw new Error(
      `Customer migration observation evidence is not passed: ${observation.blockers
        .map(({ code }) => code)
        .join(', ')}`
    );
  }
  if (input.status !== 'passed' || input.exitStatus !== 0) {
    throw new Error('Customer migration release evidence is not passed');
  }
  if (!SHA256_PATTERN.test(typeof input.digest === 'string' ? input.digest : '')) {
    throw new Error('Customer migration release evidence digest is missing or invalid');
  }
  const digestInput = stripTimestamps(input);
  delete digestInput.digest;
  if (input.digest !== digestWithout(digestInput, 'digest')) {
    throw new Error('Customer migration release evidence digest drifted');
  }
  return input;
}

function readCustomerMigrationReleaseEvidence(filePath, rootDir = process.cwd()) {
  const resolvedPath = path.resolve(rootDir, filePath);
  if (!fs.existsSync(resolvedPath))
    throw new Error(`Missing customer migration evidence: ${filePath}`);
  const input = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  const authority = readCustomerMigrationAuthority(rootDir);
  return verifyCustomerMigrationReleaseEvidence(input, authority, {
    evidenceRoot: path.dirname(resolvedPath)
  });
}

module.exports = {
  CUSTOMER_RELEASE_KIND,
  CUSTOMER_RELEASE_PRODUCER,
  CUSTOMER_RELEASE_RUNNER_VERSION,
  CUSTOMER_RELEASE_SCHEMA_VERSION,
  ENVIRONMENTS,
  OBSERVATION_HOURS,
  normalizeObservation,
  normalizeRollback,
  readCustomerMigrationReleaseEvidence,
  runCustomerMigrationRelease,
  validateReleaseContract,
  verifyCustomerMigrationReleaseEvidence
};
