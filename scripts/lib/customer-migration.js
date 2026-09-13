const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const AUTHORITY_RELATIVE_PATH = path.join('src', 'config', 'customer-migration-authority.json');
const PROJECTION_RELATIVE_PATH = path.join('src', 'config', 'customer-migration-projection.json');
const LEGACY_HOST = 'solutions.fastgpt.cn';
const TERMINAL_HOST = 'fastgpt.cn';
const EXPECTED_AUTHORITY_RECORD_COUNT = 231;
const EXPECTED_SOURCE_COUNT = 230;
const EXPECTED_PRESERVED_ASSET_COUNT = 1;
const EXPECTED_CATEGORY_COUNT = 17;
const EXPECTED_DETAIL_COUNT = 89;
const EXPECTED_ROUTE_COUNT = 107;
const SOURCE_CLASS_COUNTS = Object.freeze({
  'legacy-asset': 1,
  'legacy-category': 17,
  'legacy-detail': 89,
  'legacy-hub': 1,
  'legacy-markdown': 89,
  'legacy-root': 1,
  'legacy-solutions-detail': 33
});
const REDIRECT_SOURCE_CLASS_COUNTS = Object.freeze({
  'legacy-category': 17,
  'legacy-detail': 89,
  'legacy-hub': 1,
  'legacy-markdown': 89,
  'legacy-root': 1,
  'legacy-solutions-detail': 33
});
const PRESERVED_LEGACY_MANIFEST = Object.freeze({
  disposition: 'preserve-temporarily',
  expectedBodySha256: '0e8f5aa30056e0a4fe2fe2a05e53aef1050c315a7767e510e6c2515d0476bac8',
  expectedContentType: 'application/manifest+json',
  expectedStatus: 200,
  reason: 'preserve-legacy-asset',
  releaseUnit: 'legacy-manifest',
  rollbackAction: 'restore-legacy-manifest-and-referenced-assets',
  sourceClass: 'legacy-asset',
  sourcePath: '/customers/manifest.webmanifest',
  trafficPolicy: 'serve-from-legacy-origin',
  referencedAssets: [
    {
      path: '/customers/icon.svg',
      expectedStatus: 200,
      expectedContentType: 'image/svg+xml',
      expectedBodySha256: '244e479117a05646ef12d26ea8d4adf4f282978f3346b06d9111651cf3e99040'
    },
    {
      path: '/customers/apple-icon.png',
      expectedStatus: 200,
      expectedContentType: 'image/png',
      expectedBodySha256: '37cfde2cedb731874f6ea4b8590b02c91bda5bd7f48257065d2265b4473d8c08'
    }
  ]
});

const SOURCE_FILES = Object.freeze([
  'FastGPT-solutions子域301映射表-V1.0-星触达-20260824.csv',
  'FastGPT-案例页URL重映射表-33条-V1.0-星触达-20260824.csv'
]);

function compareStrings(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort(compareStrings)
      .map((key) => [key, sortValue(value[key])])
  );
}

function stableJson(value) {
  return `${JSON.stringify(sortValue(value), null, 2)}\n`;
}

function digestWithout(value, key) {
  const copy = { ...value };
  delete copy[key];
  return sha256(stableJson(copy));
}

function authorityError(message) {
  return new Error(`[customer-migration] ${message}`);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw authorityError(`cannot read JSON ${filePath}: ${error.message}`);
  }
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const filePath = path.join(directory, entry.name);
      return entry.isDirectory() ? walkFiles(filePath) : [filePath];
    })
    .sort(compareStrings);
}

function validateSlug(value, label) {
  if (typeof value !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw authorityError(`${label} must be a lowercase slug`);
  }
  return value;
}

function validatePath(value, label) {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.includes('?') ||
    value.includes('#') ||
    value.includes('\\') ||
    /[\u0000-\u001f\u007f\s]/.test(value) ||
    value.includes('//') ||
    /(?:^|\/)\.\.?(?:\/|$)/.test(value)
  ) {
    throw authorityError(`${label} must be a clean absolute URL path`);
  }
  return value;
}

function validateHost(value, expected, label) {
  if (value !== expected) throw authorityError(`${label} must be ${expected}`);
  return value;
}

function recordKey(host, urlPath) {
  return `${host}${urlPath}`;
}

function getCustomerRouteAuthority(rootDir) {
  const contentRoot = path.join(rootDir, 'content', 'customers');
  const categories = readJson(path.join(contentRoot, 'categories.json'));
  const solutionsRoot = path.join(contentRoot, 'solutions');
  if (!Array.isArray(categories)) throw authorityError('customer categories must be an array');

  const categorySlugs = categories.map((category) => validateSlug(category.slug, 'category slug'));
  if (new Set(categorySlugs).size !== categorySlugs.length) {
    throw authorityError('customer categories contain duplicate slugs');
  }

  const details = walkFiles(solutionsRoot)
    .filter((filePath) => filePath.endsWith('.json'))
    .map((filePath) => {
      const solution = readJson(filePath);
      const categorySlug = validateSlug(solution.categorySlug, 'solution category slug');
      const slug = validateSlug(solution.slug, 'solution slug');
      if (!categorySlugs.includes(categorySlug)) {
        throw authorityError(`solution category is outside the registry: ${categorySlug}`);
      }
      if (!solution.title || typeof solution.title !== 'string') {
        throw authorityError(`solution title is missing: ${filePath}`);
      }
      return {
        categorySlug,
        slug,
        title: solution.title,
        path: `/customers/${categorySlug}/${slug}`
      };
    })
    .sort((left, right) => compareStrings(left.path, right.path));

  const detailPaths = details.map((detail) => detail.path);
  if (new Set(detailPaths).size !== details.length) {
    throw authorityError('customer details contain duplicate paths');
  }

  const categoryPaths = [...categorySlugs]
    .sort(compareStrings)
    .map((slug) => `/customers/categories/${slug}`);
  const paths = ['/customers', ...categoryPaths, ...detailPaths].sort(compareStrings);
  return {
    host: TERMINAL_HOST,
    hub: '/customers',
    categories: categoryPaths,
    details,
    paths,
    categoryCount: categoryPaths.length,
    detailCount: details.length,
    routeCount: paths.length,
    digest: sha256(stableJson(paths))
  };
}

function normalizeAuthorityInput(input) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.records)) {
    throw authorityError('authority must contain a records array');
  }
  return input;
}

function getSourceClassCounts(records) {
  return records.reduce((counts, record) => {
    counts[record.sourceClass] = (counts[record.sourceClass] || 0) + 1;
    return counts;
  }, {});
}

/** Validate source identity and redirect graph invariants independently from the registry. */
function validateMigrationRecords(records, options = {}) {
  if (!Array.isArray(records)) throw authorityError('migration records must be an array');
  const allowedTargetPaths = options.allowedTargetPaths
    ? new Set(options.allowedTargetPaths)
    : undefined;
  const bySource = new Map();
  for (const [index, record] of records.entries()) {
    if (!record || typeof record !== 'object') {
      throw authorityError(`record ${index + 1} must be an object`);
    }
    validateHost(
      record.sourceHost,
      options.sourceHost || LEGACY_HOST,
      `record ${index + 1} sourceHost`
    );
    validateHost(
      record.targetHost,
      options.targetHost || TERMINAL_HOST,
      `record ${index + 1} targetHost`
    );
    validatePath(record.sourcePath, `record ${index + 1} sourcePath`);
    validatePath(record.targetPath, `record ${index + 1} targetPath`);
    if (options.requireAccepted !== false && record.disposition !== 'accepted') {
      throw authorityError(`record ${index + 1} must be accepted for the migration release`);
    }
    if (allowedTargetPaths && !allowedTargetPaths.has(record.targetPath)) {
      throw authorityError(
        `target is outside customer authority: ${recordKey(record.targetHost, record.targetPath)}`
      );
    }
    const sourceKey = recordKey(record.sourceHost, record.sourcePath);
    const targetKey = recordKey(record.targetHost, record.targetPath);
    const existing = bySource.get(sourceKey);
    if (existing) {
      if (existing.targetKey !== targetKey) {
        throw authorityError(`source-to-many mapping for ${sourceKey}`);
      }
      throw authorityError(`duplicate source mapping for ${sourceKey}`);
    }
    if (sourceKey === targetKey)
      throw authorityError(`self redirect is forbidden for ${sourceKey}`);
    bySource.set(sourceKey, { targetKey, record });
  }

  for (const [sourceKey, entry] of bySource) {
    const visited = new Set();
    let currentKey = sourceKey;
    while (bySource.has(currentKey)) {
      if (visited.has(currentKey)) {
        throw authorityError(`redirect cycle is forbidden: ${sourceKey}`);
      }
      visited.add(currentKey);
      currentKey = bySource.get(currentKey).targetKey;
    }
    if (visited.size > 1) {
      throw authorityError(`redirect chain is forbidden: ${sourceKey} -> ${entry.targetKey}`);
    }
  }

  const acceptedRecords = [...bySource.values()]
    .map(({ record }) => record)
    .sort((left, right) =>
      compareStrings(
        recordKey(left.sourceHost, left.sourcePath),
        recordKey(right.sourceHost, right.sourcePath)
      )
    );
  return {
    records: acceptedRecords,
    bySource,
    sourceClassCounts: getSourceClassCounts(acceptedRecords),
    targetPaths: [...new Set(acceptedRecords.map((record) => record.targetPath))].sort(
      compareStrings
    )
  };
}

function validateProvenance(authority, record, index) {
  if (!record.provenance || typeof record.provenance !== 'object') {
    throw authorityError(`record ${index + 1} is missing provenance`);
  }
  const source = authority.sources.find(
    (candidate) => candidate.file === record.provenance.sourceFile
  );
  if (!source) {
    throw authorityError(`record ${index + 1} references an unknown source file`);
  }
  if (record.provenance.sourceSha256 !== source.sha256) {
    throw authorityError(`record ${index + 1} source digest disagrees with its source manifest`);
  }
  if (record.evidenceSource !== record.provenance.sourceFile) {
    throw authorityError(`record ${index + 1} evidence source disagrees with provenance`);
  }
  if (
    !Number.isInteger(record.provenance.sourceRow) ||
    record.provenance.sourceRow < 1 ||
    record.provenance.sourceRow > source.totalRows
  ) {
    throw authorityError(`record ${index + 1} has an invalid source row`);
  }
  for (const [field, label] of [
    ['sourceUrl', 'source URL'],
    ['rawTargetUrl', 'raw target URL']
  ]) {
    let parsed;
    try {
      parsed = new URL(record.provenance[field]);
    } catch (error) {
      throw authorityError(`record ${index + 1} has an invalid ${label}: ${error.message}`);
    }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
      throw authorityError(`record ${index + 1} has an unsafe ${label}`);
    }
    if (parsed.search || parsed.hash) {
      throw authorityError(`record ${index + 1} ${label} must not contain a query or fragment`);
    }
    if (
      field === 'sourceUrl' &&
      (parsed.hostname !== record.sourceHost || parsed.pathname !== record.sourcePath)
    ) {
      throw authorityError(`record ${index + 1} source URL disagrees with source identity`);
    }
  }
}

function expectedRecordSemantics(record, routeAuthority) {
  if (record.sourcePath === '/')
    return { sourceClass: 'legacy-root', reason: 'root-to-hub', targetPath: '/customers' };
  if (record.sourcePath === '/customers') {
    return { sourceClass: 'legacy-hub', reason: 'hub-to-canonical', targetPath: '/customers' };
  }
  if (record.sourcePath === '/customers/manifest.webmanifest') {
    return PRESERVED_LEGACY_MANIFEST;
  }
  if (record.sourcePath.startsWith('/customers/categories/')) {
    return {
      sourceClass: 'legacy-category',
      reason: 'category-to-canonical',
      targetPath: record.sourcePath
    };
  }
  const markdownMatch = record.sourcePath.match(/^\/customers\/solution\/([^/]+)\/markdown$/);
  if (markdownMatch) {
    const detail = routeAuthority.details.find((entry) => entry.slug === markdownMatch[1]);
    return detail
      ? { sourceClass: 'legacy-markdown', reason: 'markdown-to-detail', targetPath: detail.path }
      : undefined;
  }
  const customerMatch = record.sourcePath.match(/^\/customers\/([^/]+)\/([^/]+)$/);
  if (customerMatch) {
    return {
      sourceClass: 'legacy-detail',
      reason: 'detail-to-canonical',
      targetPath: record.sourcePath
    };
  }
  const solutionsMatch = record.sourcePath.match(/^\/solutions\/([^/]+)\/([^/]+)$/);
  if (solutionsMatch) {
    return {
      sourceClass: 'legacy-solutions-detail',
      reason: 'solutions-to-customer',
      targetPath: `/customers/${solutionsMatch[1]}/${solutionsMatch[2]}`
    };
  }
  return undefined;
}

function validatePreservedAssetRecord(record, index) {
  if ('targetHost' in record || 'targetPath' in record) {
    throw authorityError(`record ${index + 1} preserved manifest must not declare a redirect target`);
  }
  for (const field of [
    'disposition',
    'expectedBodySha256',
    'expectedContentType',
    'expectedStatus',
    'reason',
    'releaseUnit',
    'rollbackAction',
    'sourceClass',
    'sourcePath',
    'trafficPolicy'
  ]) {
    if (record[field] !== PRESERVED_LEGACY_MANIFEST[field]) {
      throw authorityError(`record ${index + 1} preserved manifest ${field} drifted`);
    }
  }
  if (stableJson(record.referencedAssets) !== stableJson(PRESERVED_LEGACY_MANIFEST.referencedAssets)) {
    throw authorityError(`record ${index + 1} preserved manifest references drifted`);
  }
}

function validateCustomerMigrationAuthority(input, options = {}) {
  const authority = normalizeAuthorityInput(input);
  if (authority.schemaVersion !== 1) {
    throw authorityError(`unsupported schemaVersion: ${authority.schemaVersion}`);
  }
  if (authority.authority !== 'customer-migration') {
    throw authorityError('authority must be customer-migration');
  }
  if (!Array.isArray(authority.sources) || authority.sources.length !== SOURCE_FILES.length) {
    throw authorityError(`authority must contain ${SOURCE_FILES.length} source manifests`);
  }
  if (
    !Number.isInteger(authority.recordCount) ||
    authority.recordCount !== authority.records.length
  ) {
    throw authorityError('recordCount must equal records.length');
  }
  if (authority.sourceCount !== authority.records.length) {
    throw authorityError('sourceCount must equal records.length');
  }

  const sourceFiles = new Set();
  for (const [index, source] of authority.sources.entries()) {
    if (!source || typeof source !== 'object') {
      throw authorityError(`source manifest ${index + 1} must be an object`);
    }
    for (const field of ['file', 'sha256', 'format', 'sourceHost', 'totalRows', 'recordCount']) {
      if (source[field] === undefined || source[field] === null || source[field] === '') {
        throw authorityError(`source manifest ${index + 1} is missing ${field}`);
      }
    }
    if (sourceFiles.has(source.file))
      throw authorityError(`duplicate source manifest: ${source.file}`);
    sourceFiles.add(source.file);
    if (!/^[0-9a-f]{64}$/i.test(source.sha256)) {
      throw authorityError(`source manifest ${source.file} has an invalid SHA-256`);
    }
    if (source.format !== 'csv' || source.sourceHost !== LEGACY_HOST) {
      throw authorityError(`source manifest ${source.file} has an unsupported format or host`);
    }
    if (!Number.isInteger(source.totalRows) || source.totalRows < 1) {
      throw authorityError(`source manifest ${source.file} has an invalid totalRows`);
    }
    if (!Number.isInteger(source.recordCount) || source.recordCount < 1) {
      throw authorityError(`source manifest ${source.file} has an invalid recordCount`);
    }
  }
  if (sourceFiles.size !== SOURCE_FILES.length) {
    throw authorityError('source manifest file set is incomplete');
  }

  const routeAuthority =
    options.routeAuthority || getCustomerRouteAuthority(options.rootDir || process.cwd());
  if (routeAuthority.categoryCount !== EXPECTED_CATEGORY_COUNT) {
    throw authorityError(
      `customer category authority must contain ${EXPECTED_CATEGORY_COUNT} routes`
    );
  }
  if (routeAuthority.detailCount !== EXPECTED_DETAIL_COUNT) {
    throw authorityError(`customer detail authority must contain ${EXPECTED_DETAIL_COUNT} routes`);
  }
  if (routeAuthority.routeCount !== EXPECTED_ROUTE_COUNT) {
    throw authorityError(`customer route authority must contain ${EXPECTED_ROUTE_COUNT} routes`);
  }

  const redirectRecords = [];
  const preservedAssets = [];
  const sourceKeys = new Set();
  for (const [index, record] of authority.records.entries()) {
    if (!record || typeof record !== 'object')
      throw authorityError(`record ${index + 1} must be an object`);
    for (const field of ['sourceHost', 'sourcePath', 'sourceClass', 'reason', 'disposition']) {
      if (!(field in record)) throw authorityError(`record ${index + 1} is missing ${field}`);
    }
    validateHost(record.sourceHost, LEGACY_HOST, `record ${index + 1} sourceHost`);
    validatePath(record.sourcePath, `record ${index + 1} sourcePath`);
    const sourceKey = recordKey(record.sourceHost, record.sourcePath);
    if (sourceKeys.has(sourceKey)) throw authorityError(`duplicate source record for ${sourceKey}`);
    sourceKeys.add(sourceKey);
    validateProvenance(authority, record, index);
    if (!/^[a-z0-9-]+$/.test(record.sourceClass)) {
      throw authorityError(`record ${index + 1} has an invalid source class`);
    }
    const expected = expectedRecordSemantics(record, routeAuthority);
    if (!expected) throw authorityError(`record ${index + 1} has an unsupported source path`);
    if (record.sourceClass !== expected.sourceClass || record.reason !== expected.reason) {
      throw authorityError(`record ${index + 1} semantics disagree with the customer registry`);
    }
    if (expected.disposition === 'preserve-temporarily') {
      validatePreservedAssetRecord(record, index);
      preservedAssets.push(record);
      continue;
    }
    for (const field of ['targetHost', 'targetPath']) {
      if (!(field in record)) throw authorityError(`record ${index + 1} is missing ${field}`);
    }
    validateHost(record.targetHost, TERMINAL_HOST, `record ${index + 1} targetHost`);
    validatePath(record.targetPath, `record ${index + 1} targetPath`);
    if (record.disposition !== 'accepted' || record.targetPath !== expected.targetPath) {
      throw authorityError(`record ${index + 1} redirect semantics disagree with the registry`);
    }
    redirectRecords.push(record);
  }

  const migration = validateMigrationRecords(redirectRecords, {
    allowedTargetPaths: routeAuthority.paths
  });
  const { bySource, records: acceptedRecords, sourceClassCounts, targetPaths } = migration;
  for (const source of authority.sources) {
    const count = authority.records.filter((record) => record.evidenceSource === source.file).length;
    if (count !== source.recordCount) {
      throw authorityError(
        `source manifest count drift for ${source.file}: manifest=${source.recordCount}, records=${count}`
      );
    }
  }

  const authoritySourceClassCounts = getSourceClassCounts(authority.records);
  if (stableJson(authority.sourceClassCounts) !== stableJson(authoritySourceClassCounts)) {
    throw authorityError('sourceClassCounts does not match the records');
  }
  if (stableJson(authority.redirectSourceClassCounts) !== stableJson(sourceClassCounts)) {
    throw authorityError('redirectSourceClassCounts does not match the redirect records');
  }
  if (
    authority.redirectCount !== acceptedRecords.length ||
    authority.preservedAssetCount !== preservedAssets.length
  ) {
    throw authorityError('redirectCount or preservedAssetCount drifted');
  }
  if (options.requireExpectedCounts) {
    if (authority.records.length !== EXPECTED_AUTHORITY_RECORD_COUNT) {
      throw authorityError(
        `expected ${EXPECTED_AUTHORITY_RECORD_COUNT} authority records, found ${authority.records.length}`
      );
    }
    if (acceptedRecords.length !== EXPECTED_SOURCE_COUNT) {
      throw authorityError(
        `expected ${EXPECTED_SOURCE_COUNT} sources, found ${acceptedRecords.length}`
      );
    }
    if (stableJson(authoritySourceClassCounts) !== stableJson(SOURCE_CLASS_COUNTS)) {
      throw authorityError(
        `authority source class counts drifted: ${JSON.stringify(authoritySourceClassCounts)}`
      );
    }
    if (stableJson(sourceClassCounts) !== stableJson(REDIRECT_SOURCE_CLASS_COUNTS)) {
      throw authorityError(`redirect source class counts drifted: ${JSON.stringify(sourceClassCounts)}`);
    }
    if (preservedAssets.length !== EXPECTED_PRESERVED_ASSET_COUNT) {
      throw authorityError(
        `expected ${EXPECTED_PRESERVED_ASSET_COUNT} preserved asset, found ${preservedAssets.length}`
      );
    }
  }

  if (authority.targetCount !== targetPaths.length) {
    throw authorityError(`targetCount must equal unique target count (${targetPaths.length})`);
  }
  if (authority.targetCount !== routeAuthority.routeCount) {
    throw authorityError(
      `targetCount must equal customer route count (${routeAuthority.routeCount})`
    );
  }
  if (
    !authority.targetAuthority ||
    authority.targetAuthority.host !== TERMINAL_HOST ||
    authority.targetAuthority.routeCount !== routeAuthority.routeCount ||
    authority.targetAuthority.digest !== routeAuthority.digest
  ) {
    throw authorityError('target authority metadata drifted from the customer registry');
  }
  if (authority.digest !== digestWithout(authority, 'digest')) {
    throw authorityError('authority digest does not match its bytes');
  }

  return {
    authority,
    records: acceptedRecords,
    preservedAssets,
    bySource,
    routeAuthority,
    sourceClassCounts,
    authoritySourceClassCounts,
    targetPaths
  };
}

function buildCustomerMigrationProjection(authorityResult) {
  const validated =
    authorityResult.bySource instanceof Map
      ? authorityResult
      : validateCustomerMigrationAuthority(authorityResult);
  const entries = validated.records.map((record) => ({
    sourceHost: record.sourceHost,
    sourcePath: record.sourcePath,
    targetHost: record.targetHost,
    targetPath: record.targetPath,
    sourceClass: record.sourceClass
  }));
  const projection = {
    schemaVersion: 1,
    authority: 'customer-migration',
    authorityDigest: validated.authority.digest,
    sourceHost: LEGACY_HOST,
    targetHost: TERMINAL_HOST,
    sourceCount: entries.length,
    targetCount: validated.targetPaths.length,
    sourceClassCounts: validated.sourceClassCounts,
    entries
  };
  return { ...projection, digest: digestWithout(projection, 'digest') };
}

function validateCustomerMigrationProjection(input, authorityResult) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.entries)) {
    throw authorityError('projection must contain an entries array');
  }
  const validated =
    authorityResult.bySource instanceof Map
      ? authorityResult
      : validateCustomerMigrationAuthority(authorityResult);
  const expected = buildCustomerMigrationProjection(validated);
  if (input.digest !== digestWithout(input, 'digest')) {
    throw authorityError('projection digest does not match its bytes');
  }
  if (stableJson(input) !== stableJson(expected)) {
    throw authorityError('projection does not match the validated authority');
  }
  return input;
}

function readCustomerMigrationAuthority(rootDir, options = {}) {
  const authorityPath = path.join(rootDir, AUTHORITY_RELATIVE_PATH);
  if (!fs.existsSync(authorityPath))
    throw authorityError(`missing authority file: ${AUTHORITY_RELATIVE_PATH}`);
  return validateCustomerMigrationAuthority(readJson(authorityPath), {
    ...options,
    rootDir,
    requireExpectedCounts: options.requireExpectedCounts ?? true
  });
}

function readCustomerMigrationProjection(rootDir, authorityResult) {
  const projectionPath = path.join(rootDir, PROJECTION_RELATIVE_PATH);
  if (!fs.existsSync(projectionPath)) {
    throw authorityError(`missing projection file: ${PROJECTION_RELATIVE_PATH}`);
  }
  return validateCustomerMigrationProjection(readJson(projectionPath), authorityResult);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ''));
    rows.push(row);
  }
  return rows;
}

function sourceRows(filePath) {
  const bytes = fs.readFileSync(filePath);
  return { bytes, rows: parseCsv(bytes.toString('utf8').replace(/^\uFEFF/, '')) };
}

function findDetailPath(routeAuthority, slug) {
  const detail = routeAuthority.details.find((entry) => entry.slug === slug);
  if (!detail) throw authorityError(`legacy customer slug has no terminal target: ${slug}`);
  return detail.path;
}

function deriveTargetPath(sourcePath, rawTargetPath, routeAuthority) {
  if (sourcePath === '/') return '/customers';
  if (sourcePath === '/customers') return '/customers';
  if (sourcePath.startsWith('/customers/categories/')) {
    if (!routeAuthority.categories.includes(sourcePath)) {
      throw authorityError(`legacy category has no terminal target: ${sourcePath}`);
    }
    return sourcePath;
  }
  const markdownMatch = sourcePath.match(/^\/customers\/solution\/([^/]+)\/markdown$/);
  if (markdownMatch) return findDetailPath(routeAuthority, markdownMatch[1]);
  const customerMatch = sourcePath.match(/^\/customers\/([^/]+)\/([^/]+)$/);
  if (customerMatch) {
    const detailPath = `/customers/${customerMatch[1]}/${customerMatch[2]}`;
    if (!routeAuthority.paths.includes(detailPath)) {
      throw authorityError(`legacy detail has no terminal target: ${sourcePath}`);
    }
    return detailPath;
  }
  const solutionsMatch = sourcePath.match(/^\/solutions\/([^/]+)\/([^/]+)$/);
  if (solutionsMatch) {
    const detailPath = `/customers/${solutionsMatch[1]}/${solutionsMatch[2]}`;
    if (!routeAuthority.paths.includes(detailPath)) {
      throw authorityError(`legacy /solutions detail has no terminal target: ${sourcePath}`);
    }
    return detailPath;
  }
  throw authorityError(
    `unsupported legacy customer source path: ${sourcePath} (raw target ${rawTargetPath})`
  );
}

function classifySourcePath(sourcePath, sourceFileIndex) {
  if (sourcePath === '/') return { sourceClass: 'legacy-root', reason: 'root-to-hub' };
  if (sourcePath === '/customers') return { sourceClass: 'legacy-hub', reason: 'hub-to-canonical' };
  if (sourcePath === '/customers/manifest.webmanifest') {
    return PRESERVED_LEGACY_MANIFEST;
  }
  if (sourcePath.startsWith('/customers/categories/')) {
    return { sourceClass: 'legacy-category', reason: 'category-to-canonical' };
  }
  if (/^\/customers\/solution\/[^/]+\/markdown$/.test(sourcePath)) {
    return { sourceClass: 'legacy-markdown', reason: 'markdown-to-detail' };
  }
  if (sourceFileIndex === 1 && /^\/solutions\/[^/]+\/[^/]+$/.test(sourcePath)) {
    return { sourceClass: 'legacy-solutions-detail', reason: 'solutions-to-customer' };
  }
  if (/^\/customers\/[^/]+\/[^/]+$/.test(sourcePath)) {
    return { sourceClass: 'legacy-detail', reason: 'detail-to-canonical' };
  }
  throw authorityError(`cannot classify legacy source path: ${sourcePath}`);
}

function buildAuthorityFromCsv(inputDir, rootDir = process.cwd()) {
  const routeAuthority = getCustomerRouteAuthority(rootDir);
  const sources = [];
  const records = [];
  SOURCE_FILES.forEach((file, sourceFileIndex) => {
    const filePath = path.join(inputDir, file);
    if (!fs.existsSync(filePath)) throw authorityError(`missing source CSV: ${filePath}`);
    const { bytes, rows } = sourceRows(filePath);
    const source = {
      file,
      sha256: sha256(bytes),
      format: 'csv',
      sourceHost: LEGACY_HOST,
      totalRows: rows.length,
      recordCount: 0
    };
    sources.push(source);
    rows.forEach((row, rowIndex) => {
      if (!row[0] || !row[0].startsWith('http')) return;
      if (!row[1] || !row[1].startsWith('http')) return;
      if (sourceFileIndex === 0 && row[2] !== '301') return;
      if (sourceFileIndex === 1 && row[2] !== '404') return;
      const sourceUrl = new URL(row[0]);
      const rawTargetUrl = new URL(row[1]);
      if (sourceUrl.hostname !== LEGACY_HOST) {
        throw authorityError(`source row ${rowIndex + 1} uses ${sourceUrl.hostname}`);
      }
      const sourcePath = validatePath(sourceUrl.pathname, `source row ${rowIndex + 1} source path`);
      const classification = classifySourcePath(sourcePath, sourceFileIndex);
      const preserved = sourcePath === PRESERVED_LEGACY_MANIFEST.sourcePath;
      const targetPath = preserved
        ? undefined
        : deriveTargetPath(sourcePath, rawTargetUrl.pathname, routeAuthority);
      source.recordCount += 1;
      records.push({
        sourceHost: LEGACY_HOST,
        sourcePath,
        ...(preserved
          ? {
              ...PRESERVED_LEGACY_MANIFEST,
              referencedAssets: PRESERVED_LEGACY_MANIFEST.referencedAssets.map((asset) => ({
                ...asset
              }))
            }
          : {
              targetHost: TERMINAL_HOST,
              targetPath,
              sourceClass: classification.sourceClass,
              reason: classification.reason,
              disposition: 'accepted'
            }),
        evidenceSource: file,
        provenance: {
          sourceFile: file,
          sourceSha256: source.sha256,
          sourceRow: rowIndex + 1,
          sourceStatus: row[2] || '',
          sourceUrl: sourceUrl.href,
          rawTargetUrl: rawTargetUrl.href,
          note: row[3] || ''
        }
      });
    });
  });

  const authority = {
    schemaVersion: 1,
    authority: 'customer-migration',
    sourceCount: records.length,
    recordCount: records.length,
    redirectCount: records.filter((record) => record.disposition === 'accepted').length,
    preservedAssetCount: records.filter(
      (record) => record.disposition === 'preserve-temporarily'
    ).length,
    targetCount: routeAuthority.routeCount,
    targetAuthority: {
      host: TERMINAL_HOST,
      hub: routeAuthority.hub,
      categoryCount: routeAuthority.categoryCount,
      detailCount: routeAuthority.detailCount,
      routeCount: routeAuthority.routeCount,
      digest: routeAuthority.digest
    },
    sourceClassCounts: getSourceClassCounts(records),
    redirectSourceClassCounts: getSourceClassCounts(
      records.filter((record) => record.disposition === 'accepted')
    ),
    sources,
    records: records.sort((left, right) =>
      compareStrings(
        recordKey(left.sourceHost, left.sourcePath),
        recordKey(right.sourceHost, right.sourcePath)
      )
    )
  };
  authority.digest = digestWithout(authority, 'digest');
  return validateCustomerMigrationAuthority(authority, {
    rootDir,
    routeAuthority,
    requireExpectedCounts: true
  }).authority;
}

function writeCustomerMigrationFiles(rootDir, authority, options = {}) {
  const validated = validateCustomerMigrationAuthority(authority, {
    rootDir,
    requireExpectedCounts: true
  });
  const projection = buildCustomerMigrationProjection(validated);
  const authorityPath = path.join(rootDir, AUTHORITY_RELATIVE_PATH);
  const projectionPath = path.join(rootDir, PROJECTION_RELATIVE_PATH);
  fs.mkdirSync(path.dirname(authorityPath), { recursive: true });
  fs.writeFileSync(authorityPath, stableJson(validated.authority));
  fs.writeFileSync(projectionPath, stableJson(projection));
  if (options.log !== false) {
    console.log(
      `[generate-customer-migration] wrote ${validated.records.length} redirects, ${validated.preservedAssets.length} preserved assets, ${validated.targetPaths.length} targets, digest=${validated.authority.digest}`
    );
  }
  return { authority: validated, projection };
}

module.exports = {
  AUTHORITY_RELATIVE_PATH,
  EXPECTED_AUTHORITY_RECORD_COUNT,
  EXPECTED_CATEGORY_COUNT,
  EXPECTED_DETAIL_COUNT,
  EXPECTED_ROUTE_COUNT,
  EXPECTED_SOURCE_COUNT,
  EXPECTED_PRESERVED_ASSET_COUNT,
  LEGACY_HOST,
  PROJECTION_RELATIVE_PATH,
  PRESERVED_LEGACY_MANIFEST,
  REDIRECT_SOURCE_CLASS_COUNTS,
  SOURCE_CLASS_COUNTS,
  SOURCE_FILES,
  TERMINAL_HOST,
  buildAuthorityFromCsv,
  buildCustomerMigrationProjection,
  digestWithout,
  getCustomerRouteAuthority,
  readCustomerMigrationAuthority,
  readCustomerMigrationProjection,
  sha256,
  stableJson,
  validateMigrationRecords,
  validateCustomerMigrationAuthority,
  validateCustomerMigrationProjection,
  writeCustomerMigrationFiles
};
