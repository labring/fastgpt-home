#!/usr/bin/env node

/**
 * Imports an explicit technical-page delivery into Markdown, the registry, and search indexes.
 */

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const REPOSITORY_ROOT = path.resolve(__dirname, '..');
const TECHNICAL_CONTENT_POLICY = require('../src/lib/technical-content-policy.json');
const FRONT_MATTER_KEYS = ['title', 'slug', 'page_type', 'source', 'source_type'];
const SOURCE_TYPES = new Map(Object.entries(TECHNICAL_CONTENT_POLICY.sourceTypes));
const CATEGORY_LABELS = TECHNICAL_CONTENT_POLICY.categories;
const SECRET_PATTERN = /\bsk-[A-Za-z0-9][A-Za-z0-9_-]{15,}\b/g;

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function normalizeLineEndings(value) {
  return value.replace(/\r\n?/g, '\n');
}

function fold(value) {
  return value.normalize('NFKC').toUpperCase().toLowerCase();
}

function foldIdentity(identity) {
  return `${fold(identity.locale)}|${fold(identity.canonicalPath)}`;
}

function validateIdentitySet(identities) {
  const seen = new Map();
  for (const identity of identities) {
    const key = foldIdentity(identity);
    const previous = seen.get(key);
    if (previous) {
      throw new Error(
        `Technical page identity collision after NFKC case-fold: ${previous.locale}${previous.canonicalPath} and ${identity.locale}${identity.canonicalPath}`
      );
    }
    seen.set(key, identity);
  }
}

function assertObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Schema drift in ${label}: expected an object`);
  }
}

function assertExactKeys(value, expected, label) {
  assertObject(value, label);
  const expectedSet = new Set(expected);
  const actual = Object.keys(value);
  const missing = expected.filter((key) => !actual.includes(key));
  const unexpected = actual.filter((key) => !expectedSet.has(key));
  if (missing.length || unexpected.length) {
    const details = [
      missing.length ? `missing ${missing.join(', ')}` : '',
      unexpected.length ? `unexpected ${unexpected.join(', ')}` : ''
    ]
      .filter(Boolean)
      .join('; ');
    throw new Error(`Schema drift in ${label}: ${details}`);
  }
}

function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Schema drift in ${label}: expected a non-empty string`);
  }
  return value.trim();
}

function requireJsonNonNegativeInteger(value, label) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    throw new Error(`Schema drift in ${label}: expected a non-negative integer number`);
  }
  return value;
}

function normalizePublicHttpsUrl(value, label) {
  const text = requireText(value, label);
  let url;
  try {
    url = new URL(text);
  } catch {
    throw new Error(`Schema drift in ${label}: expected an absolute HTTPS URL`);
  }
  const hostname = url.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  const privateHostname =
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.home.arpa');
  // IP literals and numeric labels (for example https://2130706433/) can encode
  // private addresses in many notations, so public sources must use domain names.
  const addressLikeHostname = /^[\da-f.:]+$/i.test(hostname);
  if (
    url.protocol !== 'https:' ||
    !url.hostname ||
    url.username ||
    url.password ||
    privateHostname ||
    addressLikeHostname
  ) {
    throw new Error(`Schema drift in ${label}: expected a public HTTPS URL`);
  }
  return url.href;
}

function parseWorkbookNonNegativeInteger(value, label) {
  const text = requireText(value, label);
  if (!/^\d+$/.test(text)) {
    throw new Error(`Schema drift in ${label}: expected a non-negative integer cell`);
  }
  return Number(text);
}

function normalizeCanonicalPath(value, label = 'canonical path') {
  const normalized = requireText(value, label).replace(/\\/g, '/').normalize('NFKC');
  const withLeadingSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
  const segments = withLeadingSlash.split('/').slice(1);
  if (
    segments.length < 2 ||
    segments.some(
      (segment) =>
        !segment ||
        segment === '.' ||
        segment === '..' ||
        /[?#]/.test(segment) ||
        segment.includes('\\')
    )
  ) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  if (withLeadingSlash !== withLeadingSlash.toLowerCase()) {
    throw new Error(`Invalid ${label}: canonical paths must be lowercase`);
  }
  return `/${segments.join('/')}`;
}

function normalizeRelativeFile(value, label = 'source file') {
  const normalized = requireText(value, label).replace(/\\/g, '/').normalize('NFKC');
  if (!normalized.endsWith('.md') || normalized.startsWith('/') || normalized.includes('../')) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  const segments = normalized.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  return segments.join('/');
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read JSON source ${filePath}: ${error.message}`);
  }
}

function parseFrontMatter(source, sourcePath, strict = true) {
  const normalized = normalizeLineEndings(source);
  if (!normalized.startsWith('---\n')) {
    throw new Error(`Schema drift in ${sourcePath}: missing front matter`);
  }
  const end = normalized.indexOf('\n---', 4);
  if (end === -1) {
    throw new Error(`Schema drift in ${sourcePath}: unterminated front matter`);
  }

  const metadata = {};
  for (const line of normalized.slice(4, end).split('\n')) {
    if (!line.trim()) continue;
    const separator = line.indexOf(':');
    if (separator === -1) {
      throw new Error(`Schema drift in ${sourcePath}: invalid front matter line ${line}`);
    }
    const key = line.slice(0, separator).trim();
    if (Object.prototype.hasOwnProperty.call(metadata, key)) {
      throw new Error(`Schema drift in ${sourcePath}: duplicate front matter key ${key}`);
    }
    metadata[key] = line.slice(separator + 1).trim();
  }
  if (strict) assertExactKeys(metadata, FRONT_MATTER_KEYS, `${sourcePath} front matter`);
  return {
    metadata,
    body: normalized
      .slice(end + 4)
      .replace(/^\n/, '')
      .trim()
  };
}

function inferSourceType(source) {
  return source.includes('github.com/') ? 'GitHub issue' : '官方文档小节';
}

function readSourceDocument(source, record) {
  const normalized = normalizeLineEndings(source);
  if (normalized.startsWith('---\n')) {
    return parseFrontMatter(normalized, record.file);
  }
  if (!normalized.trimStart().startsWith('#')) {
    throw new Error(`Schema drift in ${record.file}: missing front matter and Markdown heading`);
  }
  return {
    metadata: {
      title: record.title,
      slug: `/zh/${normalizeCanonicalPath(record.slug).slice(1)}`,
      page_type: record.pageType,
      source: record.source,
      source_type: inferSourceType(record.source)
    },
    body: normalized.trim()
  };
}

function normalizeCitations(body) {
  const labelForUrl = (url) =>
    url.includes('github.com/') ? 'FastGPT GitHub issue' : 'FastGPT 官方文档';
  let normalized = body.replace(
    /^([ \t]*>[ \t]*来源：[ \t]*)(https:\/\/[^\s)]+)[ \t]*$/gmu,
    (_, prefix, url) => {
      return `${prefix}[${labelForUrl(url)}](${url})`;
    }
  );
  normalized = normalized.replace(
    /^([ \t]*)`(> 来源：[ \t]*)(https:\/\/[^\s)`]+)`[ \t]*$/gmu,
    (_, indentation, prefix, url) => {
      return `${indentation}${prefix}[${labelForUrl(url)}](${url})`;
    }
  );
  normalized = normalized.replace(
    /(\\n)([ \t]*> 来源：[ \t]*)(https:\/\/[^\s)\\]+)(?=\\n|$)/g,
    (_, separator, prefix, url) => {
      return `${separator}${prefix}[${labelForUrl(url)}](${url})`;
    }
  );
  return normalized;
}

function extractCitationUrls(body, label) {
  const urls = [];
  const pattern =
    /^\s*>\s*(?:来源|Source|Sources|参考资料|References)\s*[:：]\s*(?:\[[^\]]+\]\(([^)\s]+)\)|([^\s]+))\s*$/gimu;
  for (const match of body.matchAll(pattern)) {
    const url = match[1] || match[2];
    normalizePublicHttpsUrl(url, `${label} citation`);
    urls.push(url);
  }
  return [...new Set(urls)];
}

function validateBodyIntegrity(body, record, label) {
  if (!body.trim() || record.wordCount < 1) {
    throw new Error(`Schema drift in ${label}: wordCount must be positive for a publishable page`);
  }
  const citationUrls = extractCitationUrls(body, label);
  if (citationUrls.length !== record.sourceCount) {
    throw new Error(
      `Schema drift in ${label}: sourceCount ${record.sourceCount} does not match ${citationUrls.length} unique citation URL(s)`
    );
  }
}

function normalizeStructuralEscapedLineEndings(body) {
  let normalized = body.replace(
    /\\n\\n(?=#{1,6}[ \t]|>[ \t])|\\n(?=#{1,6}[ \t]|>[ \t])/g,
    (match) => {
      return match === '\\n\\n' ? '\n\n' : '\n';
    }
  );
  normalized = normalized.replace(/(^|\n)([ \t]{0,3}#{1,6}[ \t].*?)\\n/g, (_, prefix, heading) => {
    return `${prefix}${heading}\n`;
  });
  return normalized;
}

function normalizeDocument(metadata, locale, canonicalPath, body) {
  const normalizedBody = body.trim();
  const normalizedMetadata = {
    ...metadata,
    slug: `/${locale}${canonicalPath}`
  };
  const header = FRONT_MATTER_KEYS.map((key) => `${key}: ${normalizedMetadata[key]}`).join('\n');
  return {
    body: normalizedBody,
    document: `---\n${header}\n---\n\n${normalizedBody}\n`
  };
}

function deriveSummary(title, body) {
  const summary = body
    .replace(/^```[\s\S]*?```$/gm, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[>*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!summary) return title;
  if (summary.length <= 155) return summary;
  return `${summary.slice(0, 154).trim()}…`;
}

function buildNormalizedTechnicalPage({ metadata, identity, body, wordCount, sourceCount, label }) {
  normalizePublicHttpsUrl(metadata.source, `${label} source`);
  const citations = normalizeCitations(body.replace(SECRET_PATTERN, 'YOUR_API_KEY'));
  const lineEndings = normalizeStructuralEscapedLineEndings(citations);
  validateBodyIntegrity(lineEndings, { wordCount, sourceCount }, label);
  const normalized = normalizeDocument(
    metadata,
    identity.locale,
    identity.canonicalPath,
    lineEndings
  );
  const category = identity.canonicalPath.split('/')[1];
  const categoryLabel = CATEGORY_LABELS[category];
  if (!categoryLabel) {
    throw new Error(`Schema drift in ${label}: unsupported category ${category}`);
  }
  return {
    body: normalized.body,
    document: normalized.document,
    projection: {
      title: metadata.title,
      slug: `/${identity.locale}${identity.canonicalPath}`,
      category,
      categoryLabel,
      ...(metadata.source ? { source: metadata.source } : {}),
      sourceType: normalizeSourceType(metadata.source_type, `${label} source_type`),
      summary: deriveSummary(metadata.title, normalized.body),
      minutes: Math.max(1, Math.ceil(normalized.body.length / 500))
    }
  };
}

function normalizeSourceType(value, label) {
  const normalized = SOURCE_TYPES.get(requireText(value, label));
  if (!normalized) throw new Error(`Schema drift in ${label}: unsupported source type ${value}`);
  return normalized;
}

function isSupportedSourceType(value) {
  return [...SOURCE_TYPES.values()].includes(value);
}

function parseJsonDelivery(filePath) {
  const source = readJson(filePath);
  assertExactKeys(source, ['schemaVersion', 'accepted', 'denied'], filePath);
  if (source.schemaVersion !== 1) {
    throw new Error(
      `Schema drift in ${filePath}: unsupported schemaVersion ${source.schemaVersion}`
    );
  }
  if (!Array.isArray(source.accepted) || !Array.isArray(source.denied)) {
    throw new Error(`Schema drift in ${filePath}: accepted and denied must be arrays`);
  }

  const accepted = source.accepted.map((record, index) => {
    const label = `${filePath} accepted[${index}]`;
    assertExactKeys(
      record,
      ['file', 'prefix', 'slug', 'title', 'pageType', 'wordCount', 'sourceCount', 'source'],
      label
    );
    return {
      file: normalizeRelativeFile(record.file, `${label}.file`),
      prefix: requireText(record.prefix, `${label}.prefix`),
      slug: requireText(record.slug, `${label}.slug`),
      title: requireText(record.title, `${label}.title`),
      pageType: requireText(record.pageType, `${label}.pageType`),
      wordCount: requireJsonNonNegativeInteger(record.wordCount, `${label}.wordCount`),
      sourceCount: requireJsonNonNegativeInteger(record.sourceCount, `${label}.sourceCount`),
      source: normalizePublicHttpsUrl(record.source, `${label}.source`),
      row: index + 2
    };
  });
  const denied = source.denied.map((record, index) => {
    const label = `${filePath} denied[${index}]`;
    assertExactKeys(record, ['slug', 'title', 'reason'], label);
    return {
      slug: requireText(record.slug, `${label}.slug`),
      title: requireText(record.title, `${label}.title`),
      reason: requireText(record.reason, `${label}.reason`),
      row: index + 2
    };
  });
  return { accepted, denied };
}

function xmlDecode(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function xmlAttribute(attributes, name) {
  const match = attributes.match(new RegExp(`${name}="([^"]*)"`));
  return match ? xmlDecode(match[1]) : undefined;
}

function zipEntry(buffer, requestedName) {
  const eocd = buffer.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd === -1) throw new Error('Invalid XLSX source: ZIP end record is missing');
  const entries = buffer.readUInt16LE(eocd + 10);
  const directoryOffset = buffer.readUInt32LE(eocd + 16);
  let offset = directoryOffset;
  for (let index = 0; index < entries; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error('Invalid XLSX source: central directory is malformed');
    }
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString('utf8', offset + 46, offset + 46 + nameLength);
    offset += 46 + nameLength + extraLength + commentLength;
    if (name !== requestedName) continue;

    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const start = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(start, start + compressedSize);
    if (method === 0) return compressed;
    if (method === 8) return zlib.inflateRawSync(compressed);
    throw new Error(`Unsupported XLSX compression method ${method}`);
  }
  throw new Error(`Invalid XLSX source: missing ${requestedName}`);
}

function parseXmlRows(xml, sharedStrings = []) {
  return [...xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)].map(([, rowBody]) => {
    const values = {};
    for (const match of rowBody.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attributes = match[1];
      const contents = match[2] || '';
      const cell = xmlAttribute(attributes, 'r');
      if (!cell) continue;
      const column = cell.replace(/\d+$/, '');
      const type = xmlAttribute(attributes, 't');
      let value =
        contents
          .match(/<t[^>]*>([\s\S]*?)<\/t>/g)
          ?.map((part) => part.replace(/^<t[^>]*>|<\/t>$/g, '').trim())
          .join('') ||
        contents.match(/<v>([\s\S]*?)<\/v>/)?.[1] ||
        '';
      value = xmlDecode(value);
      if (type === 's') value = sharedStrings[Number(value)] || '';
      values[column] = value;
    }
    return values;
  });
}

function parseSharedStrings(xml) {
  if (!xml) return [];
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(([, item]) =>
    xmlDecode(
      item
        .match(/<t[^>]*>([\s\S]*?)<\/t>/g)
        ?.map((part) => part.replace(/^<t[^>]*>|<\/t>$/g, '').trim())
        .join('') || ''
    )
  );
}

function readWorkbookSheets(buffer) {
  const workbook = zipEntry(buffer, 'xl/workbook.xml').toString('utf8');
  const relationships = zipEntry(buffer, 'xl/_rels/workbook.xml.rels').toString('utf8');
  const relationMap = new Map(
    [...relationships.matchAll(/<Relationship\b([^>]*)\/>/g)].map(([, attributes]) => [
      xmlAttribute(attributes, 'Id'),
      xmlAttribute(attributes, 'Target')
    ])
  );
  const sheets = new Map();
  for (const [, attributes] of workbook.matchAll(/<sheet\b([^>]*)\/>/g)) {
    const name = xmlAttribute(attributes, 'name');
    const relation = relationMap.get(xmlAttribute(attributes, 'r:id'));
    if (!name || !relation)
      throw new Error('Schema drift in XLSX workbook: invalid sheet relation');
    const target = relation.replace(/^\//, '').startsWith('xl/')
      ? relation.replace(/^\//, '')
      : path.posix.join('xl', relation.replace(/^\//, ''));
    sheets.set(name, target);
  }
  return sheets;
}

function parseWorkbook(filePath) {
  const buffer = fs.readFileSync(filePath);
  const sheets = readWorkbookSheets(buffer);
  const acceptedSheet = sheets.get('上线清单');
  const deniedSheet = sheets.get('已合并不上线');
  if (!acceptedSheet || !deniedSheet || !sheets.has('说明与纪律')) {
    throw new Error(
      'Schema drift in XLSX workbook: expected 上线清单, 已合并不上线, and 说明与纪律 sheets'
    );
  }
  const sharedStrings = (() => {
    try {
      return parseSharedStrings(zipEntry(buffer, 'xl/sharedStrings.xml').toString('utf8'));
    } catch {
      return [];
    }
  })();
  const acceptedRows = parseXmlRows(
    zipEntry(buffer, acceptedSheet).toString('utf8'),
    sharedStrings
  );
  const deniedRows = parseXmlRows(zipEntry(buffer, deniedSheet).toString('utf8'), sharedStrings);
  const acceptedHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const deniedHeaders = ['A', 'B', 'C'];
  const expectedAccepted = [
    '前缀',
    'slug（上线 URL 路径）',
    '标题',
    '页型',
    '字数',
    '来源标注数',
    '来源'
  ];
  const expectedDenied = ['slug', '标题', '说明'];
  if (
    acceptedHeaders.some((column, index) => acceptedRows[0]?.[column] !== expectedAccepted[index])
  ) {
    throw new Error('Schema drift in XLSX 上线清单: header columns changed');
  }
  if (deniedHeaders.some((column, index) => deniedRows[0]?.[column] !== expectedDenied[index])) {
    throw new Error('Schema drift in XLSX 已合并不上线: header columns changed');
  }

  const accepted = acceptedRows.slice(1).map((row, index) => ({
    prefix: requireText(row.A, `XLSX 上线清单 row ${index + 2} prefix`),
    slug: requireText(row.B, `XLSX 上线清单 row ${index + 2} slug`),
    title: requireText(row.C, `XLSX 上线清单 row ${index + 2} title`),
    pageType: requireText(row.D, `XLSX 上线清单 row ${index + 2} page type`),
    wordCount: parseWorkbookNonNegativeInteger(row.E, `XLSX 上线清单 row ${index + 2} word count`),
    sourceCount: parseWorkbookNonNegativeInteger(
      row.F,
      `XLSX 上线清单 row ${index + 2} source count`
    ),
    source: normalizePublicHttpsUrl(row.G, `XLSX 上线清单 row ${index + 2} source`),
    row: index + 2
  }));
  const denied = deniedRows.slice(1).map((row, index) => ({
    slug: requireText(row.A, `XLSX 已合并不上线 row ${index + 2} slug`),
    title: requireText(row.B, `XLSX 已合并不上线 row ${index + 2} title`),
    reason: requireText(row.C, `XLSX 已合并不上线 row ${index + 2} reason`),
    row: index + 2
  }));
  return { accepted, denied };
}

function listMarkdownFiles(root) {
  const files = [];
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name.startsWith('附-')) continue;
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  }
  visit(root);
  return files;
}

function readDeliverySource(sourcePath) {
  const resolvedSource = path.resolve(sourcePath);
  if (!fs.existsSync(resolvedSource))
    throw new Error(`Delivery source does not exist: ${sourcePath}`);
  const stat = fs.statSync(resolvedSource);
  const sourceRoot = stat.isDirectory() ? resolvedSource : path.dirname(resolvedSource);
  let sourceFile = resolvedSource;
  let parsed;
  if (stat.isDirectory()) {
    const jsonPath = path.join(resolvedSource, 'delivery.json');
    const workbooks = fs
      .readdirSync(resolvedSource)
      .filter((name) => name.toLowerCase().endsWith('.xlsx'))
      .map((name) => path.join(resolvedSource, name));
    if (fs.existsSync(jsonPath)) {
      sourceFile = jsonPath;
      parsed = parseJsonDelivery(jsonPath);
    } else if (workbooks.length === 1) {
      sourceFile = workbooks[0];
      parsed = parseWorkbook(sourceFile);
    } else {
      throw new Error('Delivery source must contain delivery.json or exactly one XLSX workbook');
    }
  } else if (resolvedSource.toLowerCase().endsWith('.json')) {
    parsed = parseJsonDelivery(resolvedSource);
  } else if (resolvedSource.toLowerCase().endsWith('.xlsx')) {
    parsed = parseWorkbook(resolvedSource);
  } else {
    throw new Error('Delivery source must be a directory, delivery.json, or XLSX workbook');
  }
  return {
    root: sourceRoot,
    file: path.basename(sourceFile),
    format: sourceFile.toLowerCase().endsWith('.xlsx') ? 'xlsx' : 'json',
    markdownFiles: listMarkdownFiles(sourceRoot),
    ...parsed
  };
}

function validateDeliveryRecords(delivery) {
  const seenFiles = new Set();
  for (const [index, record] of delivery.accepted.entries()) {
    const label = `accepted[${index}]`;
    if (!Number.isInteger(record.wordCount) || record.wordCount < 0) {
      throw new Error(`Schema drift in ${label}: wordCount must be a non-negative integer`);
    }
    if (!Number.isInteger(record.sourceCount) || record.sourceCount < 0) {
      throw new Error(`Schema drift in ${label}: sourceCount must be a non-negative integer`);
    }
    normalizeCanonicalPath(record.slug, `${label}.slug`);
    const file = normalizeRelativeFile(
      record.file || `${record.prefix}/${path.posix.basename(record.slug)}.md`
    );
    if (seenFiles.has(file))
      throw new Error(`Schema drift in delivery source: duplicate source file ${file}`);
    seenFiles.add(file);
    record.file = file;
  }
  for (const [index, record] of delivery.denied.entries()) {
    normalizeCanonicalPath(record.slug, `denied[${index}].slug`);
  }
}

function readExistingEntries(repoRoot) {
  const entryPath = path.join(repoRoot, 'src/components/tech-center/entries.json');
  return fs.existsSync(entryPath) ? JSON.parse(fs.readFileSync(entryPath, 'utf8')) : [];
}

function parseIdentityFromSlug(slug, label) {
  const match = requireText(slug, label).match(/^\/([^/]+)(\/.*)$/);
  if (!match) throw new Error(`Invalid technical page slug in ${label}: ${slug}`);
  return { locale: fold(match[1]), canonicalPath: normalizeCanonicalPath(match[2], label) };
}

function buildImportPlan({ repoRoot = REPOSITORY_ROOT, sourcePath }) {
  if (!sourcePath) throw new Error('An explicit --source argument is required');
  const delivery = readDeliverySource(sourcePath);
  validateDeliveryRecords(delivery);
  const markdownByPath = new Map(
    delivery.markdownFiles.map((filePath) => [
      path.relative(delivery.root, filePath).replace(/\\/g, '/'),
      filePath
    ])
  );
  const existingEntries = readExistingEntries(repoRoot);
  const existingIdentities = existingEntries.map((entry) =>
    parseIdentityFromSlug(entry.slug, 'repository registry')
  );
  validateIdentitySet(existingIdentities);
  const existingByIdentity = new Map(
    existingEntries.map((entry, index) => [foldIdentity(existingIdentities[index]), entry])
  );
  const pages = delivery.accepted.map((record) => {
    const sourceFile = markdownByPath.get(record.file);
    if (!sourceFile) throw new Error(`Delivery source is missing Markdown file ${record.file}`);
    const parsed = readSourceDocument(fs.readFileSync(sourceFile, 'utf8'), record);
    const { metadata } = parsed;
    if (metadata.title !== record.title)
      throw new Error(`Schema drift in ${record.file}: title differs from delivery row`);
    if (metadata.source !== record.source)
      throw new Error(`Schema drift in ${record.file}: source differs from delivery row`);
    const { locale } = parseIdentityFromSlug(metadata.slug, `${record.file} front matter slug`);
    if (!['zh', 'en'].includes(locale)) throw new Error(`Unsupported technical locale: ${locale}`);
    const identity = {
      locale,
      canonicalPath: normalizeCanonicalPath(`/${record.file.slice(0, -3)}`, record.file)
    };
    const normalized = buildNormalizedTechnicalPage({
      metadata,
      identity,
      body: parsed.body,
      wordCount: record.wordCount,
      sourceCount: record.sourceCount,
      label: record.file
    });
    const existing = existingByIdentity.get(foldIdentity(identity));
    if (existing && existing.slug !== normalized.projection.slug) {
      throw new Error(`Technical page identity collision with existing route ${existing.slug}`);
    }
    return {
      identity,
      operation: existing ? 'update' : 'add',
      source: { file: record.file },
      normalizedDocument: normalized.document,
      normalizedBodyPath: getContentPath(repoRoot, identity),
      projection: normalized.projection
    };
  });
  validateIdentitySet(pages.map((page) => page.identity));
  const denials = delivery.denied.map((record) => ({
    identity: { locale: 'zh', canonicalPath: normalizeCanonicalPath(record.slug) },
    reason: record.reason
  }));
  const entries = mergeProjectionEntries(existingEntries, pages);
  assertDeniedIdentitiesAbsent(denials, entries, buildSearchProjection(entries));
  return {
    source: { file: delivery.file, format: delivery.format },
    pages: pages.sort((first, second) =>
      foldIdentity(first.identity).localeCompare(foldIdentity(second.identity))
    ),
    denials,
    existingEntries
  };
}

// Match the article loader: localized files take precedence; legacy Chinese paths stay stable.
function getContentPath(repoRoot, identity) {
  const base = 'src/content/tech-center';
  const localized = `${base}/${identity.locale}${identity.canonicalPath}.md`;
  if (identity.locale !== 'zh' || fs.existsSync(path.join(repoRoot, localized))) return localized;
  return `${base}${identity.canonicalPath}.md`;
}

function mergeProjectionEntries(existingEntries, pages) {
  const entries = existingEntries.map((entry) => ({ ...entry }));
  const indexes = new Map(
    entries.map((entry, index) => [
      foldIdentity(parseIdentityFromSlug(entry.slug, 'technical content registry')),
      index
    ])
  );
  for (const page of pages) {
    const identity = parseIdentityFromSlug(page.projection.slug, 'technical content projection');
    const identityKey = foldIdentity(identity);
    const existingIndex = indexes.get(identityKey);
    if (existingIndex === undefined) {
      indexes.set(identityKey, entries.length);
      entries.push(page.projection);
    } else {
      entries[existingIndex] = page.projection;
    }
  }
  return entries;
}

function buildSearchProjection(entries) {
  const identities = entries.map((entry) =>
    parseIdentityFromSlug(entry.slug, 'technical content registry')
  );
  validateIdentitySet(identities);
  return entries.map((entry, index) => {
    const identity = identities[index];
    return {
      identity: foldIdentity(identity),
      title: entry.title,
      description: entry.summary,
      category: entry.category,
      locale: identity.locale,
      publicPath: identity.canonicalPath,
      sourceType: entry.sourceType,
      minutes: entry.minutes
    };
  });
}

function assertDeniedIdentitiesAbsent(denials, entries, searchProjection) {
  const deniedIdentities = new Set(denials.map((denial) => foldIdentity(denial.identity)));
  const assertAbsent = (identity, surface) => {
    if (deniedIdentities.has(foldIdentity(identity))) {
      throw new Error(
        `Denied technical content identity is present in ${surface}: ${identity.locale}${identity.canonicalPath}`
      );
    }
  };
  entries.forEach((entry) =>
    assertAbsent(parseIdentityFromSlug(entry.slug, 'technical content registry'), 'registry')
  );
  searchProjection.forEach((entry) =>
    assertAbsent({ locale: entry.locale, canonicalPath: entry.publicPath }, 'search projection')
  );
}

function splitSearchProjection(searchProjection) {
  const projections = {
    zh: searchProjection.filter((entry) => entry.locale === 'zh'),
    en: searchProjection.filter((entry) => entry.locale === 'en')
  };
  if (projections.zh.length + projections.en.length !== searchProjection.length) {
    throw new Error('Technical content search projection contains an unsupported locale');
  }
  return projections;
}

function writeFileAtomic(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  fs.writeFileSync(temporaryPath, content);
  try {
    fs.renameSync(temporaryPath, filePath);
  } finally {
    fs.rmSync(temporaryPath, { force: true });
  }
}

function writeImportPlan(plan, repoRoot = REPOSITORY_ROOT) {
  const entryPath = path.join(repoRoot, 'src/components/tech-center/entries.json');
  const searchPaths = {
    zh: path.join(repoRoot, 'public/tech-center/search-index.json'),
    en: path.join(repoRoot, 'public/tech-center/search-index.en.json')
  };
  const entries = mergeProjectionEntries(plan.existingEntries, plan.pages);
  entries.forEach((entry, index) =>
    validateProjection(entry, `technical content registry[${index}]`)
  );
  const searchProjection = buildSearchProjection(entries);
  const localizedSearch = splitSearchProjection(searchProjection);
  assertDeniedIdentitiesAbsent(plan.denials, entries, searchProjection);
  const outputs = [
    [entryPath, stableJson(entries)],
    [searchPaths.zh, stableJson(localizedSearch.zh)],
    [searchPaths.en, stableJson(localizedSearch.en)],
    ...plan.pages.map((page) => [
      path.join(repoRoot, page.normalizedBodyPath),
      page.normalizedDocument
    ])
  ];
  const previous = outputs.map(([file]) => (fs.existsSync(file) ? fs.readFileSync(file) : null));
  try {
    for (const [file, content] of outputs) writeFileAtomic(file, content);
  } catch (error) {
    outputs.forEach(([file], index) => {
      if (previous[index] === null) fs.rmSync(file, { force: true });
      else fs.writeFileSync(file, previous[index]);
    });
    throw error;
  }
}

function assertFileContent(filePath, expected, label) {
  if (!fs.existsSync(filePath)) throw new Error(`Technical content drift: missing ${label}`);
  const actual = fs.readFileSync(filePath, 'utf8');
  if (actual !== expected) throw new Error(`Technical content drift: ${label}`);
}

function verifyImportPlanNoDrift(plan, repoRoot = REPOSITORY_ROOT) {
  const entries = mergeProjectionEntries(plan.existingEntries, plan.pages);
  entries.forEach((entry, index) =>
    validateProjection(entry, `technical content registry[${index}]`)
  );
  const searchProjection = buildSearchProjection(entries);
  const localizedSearch = splitSearchProjection(searchProjection);
  assertDeniedIdentitiesAbsent(plan.denials, entries, searchProjection);
  assertFileContent(
    path.join(repoRoot, 'src/components/tech-center/entries.json'),
    stableJson(entries),
    'registry projection'
  );
  assertFileContent(
    path.join(repoRoot, 'public/tech-center/search-index.json'),
    stableJson(localizedSearch.zh),
    'Chinese search projection'
  );
  assertFileContent(
    path.join(repoRoot, 'public/tech-center/search-index.en.json'),
    stableJson(localizedSearch.en),
    'English search projection'
  );
  for (const page of plan.pages) {
    assertFileContent(
      path.join(repoRoot, page.normalizedBodyPath),
      page.normalizedDocument,
      `body projection ${page.identity.locale}${page.identity.canonicalPath}`
    );
  }
}

function validateProjection(projection, label) {
  const expectedKeys = [
    'title',
    'slug',
    'category',
    'categoryLabel',
    'sourceType',
    'summary',
    'minutes'
  ];
  if (Object.prototype.hasOwnProperty.call(projection, 'source')) expectedKeys.push('source');
  assertExactKeys(projection, expectedKeys, label);
  requireText(projection.title, `${label}.title`);
  requireText(projection.slug, `${label}.slug`);
  requireText(projection.category, `${label}.category`);
  requireText(projection.categoryLabel, `${label}.categoryLabel`);
  requireText(projection.sourceType, `${label}.sourceType`);
  if (!isSupportedSourceType(projection.sourceType)) {
    throw new Error(
      `Schema drift in ${label}.sourceType: unsupported source type ${projection.sourceType}`
    );
  }
  requireText(projection.summary, `${label}.summary`);
  requireJsonNonNegativeInteger(projection.minutes, `${label}.minutes`);
  if (projection.minutes < 1)
    throw new Error(`Schema drift in ${label}.minutes: expected at least 1`);
  if (projection.source !== undefined) {
    normalizePublicHttpsUrl(projection.source, `${label}.source`);
  }
}

function verifyTechnicalContent(repoRoot = REPOSITORY_ROOT) {
  const entries = readExistingEntries(repoRoot);
  if (!Array.isArray(entries) || entries.length === 0)
    throw new Error('Technical content registry must be a non-empty array');
  entries.forEach((entry, index) => validateProjection(entry, `technical registry[${index}]`));
  const search = splitSearchProjection(buildSearchProjection(entries));
  for (const locale of ['zh', 'en']) {
    const filename = locale === 'zh' ? 'search-index.json' : 'search-index.en.json';
    assertFileContent(
      path.join(repoRoot, 'public/tech-center', filename),
      stableJson(search[locale]),
      `${locale} search projection`
    );
  }
  const indexedFiles = new Set();
  for (const entry of entries) {
    const identity = parseIdentityFromSlug(entry.slug, 'technical registry');
    if (
      entry.slug !== `/${identity.locale}${identity.canonicalPath}` ||
      entry.category !== identity.canonicalPath.split('/')[1] ||
      !Object.hasOwn(CATEGORY_LABELS, entry.category)
    ) {
      throw new Error(`Technical content route/category drift for ${entry.slug}`);
    }
    const filePath = path.join(repoRoot, getContentPath(repoRoot, identity));
    indexedFiles.add(filePath);
    if (!fs.existsSync(filePath)) throw new Error(`Missing technical body for ${entry.slug}`);
    const { metadata, body } = parseFrontMatter(fs.readFileSync(filePath, 'utf8'), filePath, false);
    if (metadata.slug !== entry.slug || (metadata.title && metadata.title !== entry.title))
      throw new Error(`Technical content metadata drift for ${entry.slug}`);
    if (!body) throw new Error(`Empty technical body for ${entry.slug}`);
    if (metadata.source) normalizePublicHttpsUrl(metadata.source, `${entry.slug} source`);
    extractCitationUrls(body, entry.slug);
    SECRET_PATTERN.lastIndex = 0;
    // Public default in https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2.
    const text = body.replaceAll('sk-aaabbbcccdddeeefffggghhhiiijjjkkk', 'YOUR_API_KEY');
    if (SECRET_PATTERN.test(text))
      throw new Error(`Technical content body contains a secret-shaped value for ${entry.slug}`);
  }
  for (const filePath of listMarkdownFiles(path.join(repoRoot, 'src/content/tech-center'))) {
    if (!indexedFiles.has(filePath)) throw new Error(`Unindexed technical body: ${filePath}`);
  }
  console.log(`Technical content verified: ${entries.length} pages`);
  return entries;
}

function printCheck(plan) {
  console.log(`Technical content check: ${plan.source.file} (${plan.source.format})`);
  for (const page of plan.pages) {
    console.log(
      `operation ${page.operation} ${page.identity.locale}${page.identity.canonicalPath}`
    );
  }
  for (const denial of plan.denials) {
    console.log(
      `denial ${denial.identity.locale}${denial.identity.canonicalPath} ${denial.reason}`
    );
  }
  console.log(`Proposed pages: ${plan.pages.length}; denials: ${plan.denials.length}`);
}

function parseArgs(argv) {
  let mode;
  let sourcePath;
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--check' || token === '--write') {
      if (mode) throw new Error('Choose exactly one of --check or --write');
      mode = token.slice(2);
    } else if (token === '--source') {
      sourcePath = argv[++index];
      if (!sourcePath || sourcePath.startsWith('--'))
        throw new Error('--source requires a delivery directory or file');
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  if (!mode) throw new Error('Choose --check or --write');
  if (!sourcePath) throw new Error(`An explicit --source argument is required for --${mode}`);
  return { mode, sourcePath };
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const plan = buildImportPlan({ repoRoot: REPOSITORY_ROOT, sourcePath: options.sourcePath });
  if (options.mode === 'check') {
    verifyImportPlanNoDrift(plan);
    printCheck(plan);
    return;
  }
  verifyTechnicalContent();
  writeImportPlan(plan);
  verifyTechnicalContent();
  console.log(`Technical content import written: ${plan.pages.length} pages`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  buildImportPlan,
  buildNormalizedTechnicalPage,
  buildSearchProjection,
  foldIdentity,
  main,
  assertDeniedIdentitiesAbsent,
  verifyImportPlanNoDrift,
  writeImportPlan,
  validateIdentitySet,
  verifyTechnicalContent
};
