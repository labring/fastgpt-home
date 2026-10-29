#!/usr/bin/env node
/** Persists production shards and emits build-local Preview shards. */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const { getProductionBaseUrls, resolveSiteVariant } = require('./lib/site-variant');

const SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';
const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>';
const INDUSTRY_URL_LIMIT = 5000;
const INDUSTRY_SHARD_BYTE_LIMIT = 10 * 1024 * 1024;
const PROTOCOL_URL_LIMIT = 50000;
const PROTOCOL_BYTE_LIMIT = 50 * 1024 * 1024;
const SHARD_NAME = /^sitemap-(.+)-(\d+)-([a-f0-9]{8})\.xml$/;
const serializer = new XMLSerializer();

function normalizeSite(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid sitemap site origin: ${value}`);
  }
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(`Sitemap site must be a bare HTTPS origin: ${value}`);
  }
  return url.origin;
}

function normalizeSites(values) {
  const sites = [...new Set((Array.isArray(values) ? values : [values]).map(normalizeSite))];
  if (!sites.length) throw new Error('Sitemap requires at least one site origin');
  return new Set(sites);
}

function parseXmlDocument(input, label) {
  const bytes = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf8');
  if (!bytes.length || bytes.length > PROTOCOL_BYTE_LIMIT) {
    throw new Error(`${label} is empty or exceeds the 50 MiB protocol limit`);
  }

  let xml;
  try {
    xml = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error(`${label} must be valid UTF-8 XML`);
  }
  if (/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(xml)) {
    throw new Error(`${label} must not contain DTD or entity declarations`);
  }

  const errors = [];
  let document;
  try {
    document = new DOMParser({
      onError: (level, message) => errors.push(`${level}: ${message}`)
    }).parseFromString(xml, 'application/xml');
  } catch (error) {
    throw new Error(`${label} XML parse failed: ${error.message || error}`);
  }
  if (errors.length) throw new Error(`${label} XML parse failed: ${errors[0]}`);
  if (!document.documentElement) throw new Error(`${label} has no document element`);
  return document;
}

function elementChildren(node) {
  return Array.from(node.childNodes || []).filter((child) => child.nodeType === 1);
}

function getNamespaceAttributes(root) {
  const attributes = [];
  for (let i = 0; i < root.attributes.length; i += 1) {
    const attribute = root.attributes.item(i);
    if (attribute.namespaceURI !== XMLNS_NAMESPACE && !attribute.name.startsWith('xmlns:')) {
      throw new Error(`Sitemap root attribute ${attribute.name} requires an explicit adapter`);
    }
    attributes.push({ name: attribute.name, value: attribute.value });
  }
  return attributes.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function validateLoc(value, sites) {
  if (
    !value ||
    value.length >= 2048 ||
    /[\u0000-\u0020\u007f-\u009f\\]/.test(value) ||
    value.includes('#')
  ) {
    throw new Error(`Invalid sitemap loc: ${value}`);
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid sitemap loc: ${value}`);
  }
  if (url.protocol !== 'https:') throw new Error(`Sitemap loc must use HTTPS: ${value}`);
  if (!sites.has(url.origin)) throw new Error(`Sitemap loc uses another origin: ${value}`);
  if (url.username || url.password)
    throw new Error(`Sitemap loc must not contain credentials: ${value}`);
  return value;
}

function validateLastmod(value, loc) {
  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|[+-]\d{2}:\d{2}))?$/
  );
  if (!match) throw new Error(`Invalid W3C lastmod for ${loc}: ${value}`);

  const [year, month, day] = match.slice(1, 4).map(Number);
  const calendarDate = new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00Z`);
  if (
    calendarDate.getUTCFullYear() !== year ||
    calendarDate.getUTCMonth() !== month - 1 ||
    calendarDate.getUTCDate() !== day
  ) {
    throw new Error(`Invalid calendar date in lastmod for ${loc}: ${value}`);
  }
  if (match[4] !== undefined) {
    const [, , , , hour, minute, second, timezone] = match;
    if (Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) {
      throw new Error(`Invalid time in lastmod for ${loc}: ${value}`);
    }
    if (timezone !== 'Z') {
      const [, offsetHour, offsetMinute] = timezone.match(/[+-](\d{2}):(\d{2})/);
      if (Number(offsetHour) > 23 || Number(offsetMinute) > 59) {
        throw new Error(`Invalid timezone in lastmod for ${loc}: ${value}`);
      }
    }
  }
  if (!Number.isFinite(Date.parse(value))) {
    throw new Error(`Invalid W3C lastmod for ${loc}: ${value}`);
  }
}

function bucketForLoc(loc) {
  const segments = new URL(loc).pathname.split('/').filter(Boolean);
  const industryIndex = segments.indexOf('industry');
  return industryIndex >= 0 && industryIndex < segments.length - 1 ? 'industry' : 'content';
}

function parseUrlset(input, site, maxUrlCount = PROTOCOL_URL_LIMIT) {
  const normalizedSites = normalizeSites(site);
  const document = parseXmlDocument(input, 'Sitemap urlset');
  const root = document.documentElement;
  if (root.namespaceURI !== SITEMAP_NAMESPACE || root.localName !== 'urlset') {
    throw new Error('Expected a namespaced sitemap urlset');
  }
  if ([...root.childNodes].some((child) => child.nodeType === 3 && child.nodeValue.trim())) {
    throw new Error('Sitemap urlset contains unexpected text');
  }

  const namespaceAttributes = getNamespaceAttributes(root);
  const rootOpen = `<${root.nodeName}${namespaceAttributes
    .map(({ name, value }) => ` ${name}="${escapeXml(value)}"`)
    .join('')}>`;
  const rootClose = `</${root.nodeName}>`;
  const namespaceFingerprint = namespaceAttributes
    .map(({ name, value }) => `${name}=${value}`)
    .join('\n');
  const rootInfo = { rootOpen, rootClose, namespaceFingerprint };
  const entries = [];
  const seen = new Set();

  for (const child of elementChildren(root)) {
    if (child.namespaceURI !== SITEMAP_NAMESPACE || child.localName !== 'url') {
      throw new Error(`Unexpected sitemap urlset child: ${child.nodeName}`);
    }
    const children = elementChildren(child);
    const locElements = children.filter(
      (element) => element.namespaceURI === SITEMAP_NAMESPACE && element.localName === 'loc'
    );
    if (locElements.length !== 1 || elementChildren(locElements[0]).length) {
      throw new Error('Each sitemap url requires exactly one text-only loc');
    }

    const loc = validateLoc(locElements[0].textContent.trim(), normalizedSites);
    if (seen.has(loc)) throw new Error(`Duplicate sitemap loc: ${loc}`);
    seen.add(loc);

    const lastmods = children.filter(
      (element) => element.namespaceURI === SITEMAP_NAMESPACE && element.localName === 'lastmod'
    );
    if (lastmods.length > 1 || lastmods.some((element) => elementChildren(element).length)) {
      throw new Error(`Invalid or duplicate lastmod for ${loc}`);
    }
    if (lastmods.length) validateLastmod(lastmods[0].textContent.trim(), loc);

    for (const node of Array.from(child.childNodes)) {
      if (node.nodeType !== 3 && node.nodeType !== 4) continue;
      if (node.nodeValue.trim()) throw new Error(`Unexpected text in sitemap url: ${loc}`);
      child.removeChild(node);
    }

    let xml;
    try {
      xml = serializer.serializeToString(child);
    } catch (error) {
      throw new Error(`Could not preserve sitemap metadata for ${loc}: ${error.message || error}`);
    }
    entries.push({
      bucket: bucketForLoc(loc),
      fingerprint: `${namespaceFingerprint}\n${xml}`,
      loc,
      xml,
      xmlBytes: Buffer.byteLength(xml)
    });
    if (entries.length > maxUrlCount) {
      throw new Error(`Sitemap url count exceeds ${maxUrlCount}`);
    }
  }

  if (!entries.length) throw new Error('Sitemap urlset is empty');
  return {
    entries,
    rootInfo,
    site: normalizedSites.size === 1 ? normalizedSites.values().next().value : null
  };
}

function renderUrlset(rootInfo, entries) {
  const body = entries.map((entry) => entry.xml).join('\n');
  return `${XML_DECLARATION}\n${rootInfo.rootOpen}\n${body}${body ? '\n' : ''}${
    rootInfo.rootClose
  }\n`;
}

function validateShardLimits(maxUrlsPerShard, maxShardBytes, maxUrls, maxBytes) {
  if (!Number.isInteger(maxUrlsPerShard) || maxUrlsPerShard < 1 || maxUrlsPerShard > maxUrls) {
    throw new Error(`Sitemap shard URL limit must be between 1 and ${maxUrls}`);
  }
  if (!Number.isInteger(maxShardBytes) || maxShardBytes < 1024 || maxShardBytes > maxBytes) {
    throw new Error(`Sitemap shard byte limit must be between 1 KiB and ${maxBytes}`);
  }
}

function getShardLimits(bucket, options = {}) {
  const industry = bucket === 'industry';
  const maxUrlsPerShard = industry
    ? options.maxIndustryUrlsPerShard ?? INDUSTRY_URL_LIMIT
    : options.maxContentUrlsPerShard ?? PROTOCOL_URL_LIMIT;
  const maxShardBytes = industry
    ? options.maxIndustryShardBytes ?? INDUSTRY_SHARD_BYTE_LIMIT
    : options.maxContentShardBytes ?? PROTOCOL_BYTE_LIMIT;
  validateShardLimits(
    maxUrlsPerShard,
    maxShardBytes,
    industry ? INDUSTRY_URL_LIMIT : PROTOCOL_URL_LIMIT,
    industry ? INDUSTRY_SHARD_BYTE_LIMIT : PROTOCOL_BYTE_LIMIT
  );
  return { maxUrlsPerShard, maxShardBytes };
}

function compareLoc(a, b) {
  return a.loc < b.loc ? -1 : a.loc > b.loc ? 1 : 0;
}

function chunkEntries(entries, rootInfo, maxUrlsPerShard, maxShardBytes) {
  validateShardLimits(maxUrlsPerShard, maxShardBytes, PROTOCOL_URL_LIMIT, PROTOCOL_BYTE_LIMIT);
  const sorted = [...entries].sort(compareLoc);
  const emptyBytes = Buffer.byteLength(renderUrlset(rootInfo, []));
  const chunks = [];
  let current = [];
  let currentBytes = emptyBytes;

  for (const entry of sorted) {
    const nextBytes = currentBytes + entry.xmlBytes + 1;
    if (current.length && (current.length >= maxUrlsPerShard || nextBytes > maxShardBytes)) {
      chunks.push(current);
      current = [];
      currentBytes = emptyBytes;
    }
    const entryBytes = currentBytes + entry.xmlBytes + 1;
    if (entryBytes > maxShardBytes) {
      throw new Error(`A single sitemap URL exceeds the ${maxShardBytes}-byte shard budget`);
    }
    current.push(entry);
    currentBytes = entryBytes;
  }
  if (current.length) chunks.push(current);
  return chunks;
}

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function shardFileName(bucket, sequence, digest) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(bucket)) {
    throw new Error(`Invalid sitemap shard bucket: ${bucket}`);
  }
  return `sitemap-${bucket}-${String(sequence).padStart(3, '0')}-${digest.slice(0, 8)}.xml`;
}

function parseShardFileName(file) {
  const match = file.match(SHARD_NAME);
  if (!match || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(match[1])) return null;
  const sequence = Number(match[2]);
  if (!Number.isSafeInteger(sequence) || String(sequence).padStart(3, '0') !== match[2])
    return null;
  return { bucket: match[1], hash: match[3], sequence };
}

function makeShard(rootInfo, bucket, sequence, entries) {
  const xml = Buffer.from(renderUrlset(rootInfo, entries), 'utf8');
  const digest = sha256(xml);
  return {
    bytes: xml,
    descriptor: {
      bucket,
      file: shardFileName(bucket, sequence, digest),
      sequence,
      sha256: digest,
      urls: entries.length
    }
  };
}

function atomicWriteIfChanged(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const bytes = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8');
  if (fs.existsSync(file) && fs.readFileSync(file).equals(bytes)) return false;

  const temporary = path.join(path.dirname(file), `.${path.basename(file)}.${process.pid}.tmp`);
  try {
    fs.writeFileSync(temporary, bytes);
    fs.renameSync(temporary, file);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
  return true;
}

function writeImmutableShard(stateDirectory, shard) {
  const xmlPath = path.join(stateDirectory, shard.descriptor.file);
  if (fs.existsSync(xmlPath) && !fs.readFileSync(xmlPath).equals(shard.bytes)) {
    throw new Error(`Eight-character sitemap hash collision: ${shard.descriptor.file}`);
  }
  atomicWriteIfChanged(xmlPath, shard.bytes);
}

function scanHistory(stateDirectory) {
  if (!fs.existsSync(stateDirectory)) {
    return { files: new Map(), maxSequences: new Map() };
  }
  const files = new Map();
  const maxSequences = new Map();

  for (const file of fs.readdirSync(stateDirectory)) {
    if (!file.startsWith('sitemap-') || !file.endsWith('.xml')) continue;
    const name = parseShardFileName(file);
    if (!name) throw new Error(`Invalid persisted sitemap shard name: ${file}`);

    const bytes = fs.readFileSync(path.join(stateDirectory, file));
    if (sha256(bytes).slice(0, 8) !== name.hash)
      throw new Error(`Persisted sitemap hash mismatch: ${file}`);
    const byteLimit = name.bucket === 'industry' ? INDUSTRY_SHARD_BYTE_LIMIT : PROTOCOL_BYTE_LIMIT;
    if (bytes.length > byteLimit)
      throw new Error(`Persisted sitemap shard exceeds its byte limit: ${file}`);
    files.set(file, { bytes, file, ...name });
    maxSequences.set(name.bucket, Math.max(maxSequences.get(name.bucket) ?? -1, name.sequence));
  }
  return { files, maxSequences };
}

function readSnapshot(stateDirectory, site, history) {
  const manifestPath = path.join(stateDirectory, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    const hasPartialState =
      history.files.size > 0 ||
      (fs.existsSync(stateDirectory) &&
        fs.readdirSync(stateDirectory).some((file) => /^sitemap(?:\.|-)/.test(file)));
    if (hasPartialState)
      throw new Error(`Persisted sitemap state has no manifest: ${stateDirectory}`);
    return [];
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    throw new Error(`Invalid persisted sitemap manifest: ${error.message || error}`);
  }
  if (manifest.site !== site || !Array.isArray(manifest.shards)) {
    throw new Error(`Persisted sitemap manifest has invalid identity or schema: ${manifestPath}`);
  }
  if (manifest.schema === 1) return [];
  if (manifest.schema !== 2 || !manifest.shards.length) {
    throw new Error(`Persisted sitemap manifest has invalid identity or schema: ${manifestPath}`);
  }

  const files = new Set();
  const slots = new Set();
  const urls = new Set();
  const previousShards = [];
  for (const shard of manifest.shards) {
    if (
      !shard ||
      !Number.isSafeInteger(shard.sequence) ||
      shard.sequence < 0 ||
      !Number.isInteger(shard.urls) ||
      shard.urls < 1 ||
      !['content', 'industry'].includes(shard.bucket) ||
      shard.urls > getShardLimits(shard.bucket).maxUrlsPerShard ||
      !/^[a-f0-9]{64}$/.test(shard.sha256)
    ) {
      throw new Error('Persisted sitemap manifest contains an invalid shard descriptor');
    }
    const expectedFile = shardFileName(shard.bucket, shard.sequence, shard.sha256);
    if (shard.file !== expectedFile || files.has(shard.file)) {
      throw new Error(
        `Persisted sitemap manifest has an invalid or duplicate shard: ${shard.file}`
      );
    }
    const slot = `${shard.bucket}:${shard.sequence}`;
    if (slots.has(slot)) throw new Error(`Persisted sitemap manifest repeats shard slot ${slot}`);
    files.add(shard.file);
    slots.add(slot);

    const stored = history.files.get(shard.file);
    if (!stored || sha256(stored.bytes) !== shard.sha256) {
      throw new Error(`Persisted sitemap shard disagrees with manifest: ${shard.file}`);
    }
    const parsed = parseUrlset(stored.bytes, site);
    if (
      parsed.entries.length !== shard.urls ||
      parsed.entries.length > getShardLimits(shard.bucket).maxUrlsPerShard
    ) {
      throw new Error(`Persisted sitemap shard has an invalid URL count: ${shard.file}`);
    }
    if (parsed.entries.some((entry) => entry.bucket !== shard.bucket)) {
      throw new Error(`Persisted sitemap shard contains a URL from another bucket: ${shard.file}`);
    }
    for (const entry of parsed.entries) {
      if (urls.has(entry.loc)) throw new Error(`Duplicate persisted sitemap loc: ${entry.loc}`);
      urls.add(entry.loc);
    }
    previousShards.push({ ...shard, entries: parsed.entries });
  }
  return previousShards;
}

function nextSequence(bucket, maxSequences) {
  const sequence = (maxSequences.get(bucket) ?? -1) + 1;
  maxSequences.set(bucket, sequence);
  return sequence;
}

function buildInitialShards(entries, rootInfo, maxSequences, options) {
  const groups = new Map();
  for (const entry of entries) {
    if (!groups.has(entry.bucket)) groups.set(entry.bucket, []);
    groups.get(entry.bucket).push(entry);
  }

  const descriptors = [];
  const shards = [];
  for (const bucket of [...groups.keys()].sort()) {
    const limits = getShardLimits(bucket, options);
    for (const chunk of chunkEntries(
      groups.get(bucket),
      rootInfo,
      limits.maxUrlsPerShard,
      limits.maxShardBytes
    )) {
      const shard = makeShard(rootInfo, bucket, nextSequence(bucket, maxSequences), chunk);
      descriptors.push(shard.descriptor);
      shards.push(shard);
    }
  }
  return {
    descriptors: descriptors.map(({ bucket, file, sequence, sha256: digest, urls }) => ({
      bucket,
      file,
      sequence,
      sha256: digest,
      urls
    })),
    shards
  };
}

function canAppendEntry(entries, entry, rootInfo, limits) {
  return (
    entries.length < limits.maxUrlsPerShard &&
    Buffer.byteLength(renderUrlset(rootInfo, entries)) + entry.xmlBytes + 1 <= limits.maxShardBytes
  );
}

function reconcileShards(entries, rootInfo, previousShards, maxSequences, options) {
  maxSequences = new Map(maxSequences);
  if (!previousShards.length) {
    return buildInitialShards(entries, rootInfo, maxSequences, options);
  }

  const currentByLoc = new Map(entries.map((entry) => [entry.loc, entry]));
  const assigned = new Set();
  const descriptors = [];
  const shards = [];

  const previousContent = previousShards
    .filter((shard) => shard.bucket === 'content')
    .sort((a, b) => a.sequence - b.sequence);
  const previousContentEntries = new Map(
    previousContent.flatMap((shard) => shard.entries.map((entry) => [entry.loc, entry]))
  );
  const contentEntries = entries.filter((entry) => entry.bucket === 'content');
  const contentChanged =
    previousContentEntries.size !== contentEntries.length ||
    contentEntries.some(
      (entry) => previousContentEntries.get(entry.loc)?.fingerprint !== entry.fingerprint
    );

  for (const entry of contentEntries) assigned.add(entry.loc);
  if (contentChanged) {
    const limits = getShardLimits('content', options);
    const chunks = chunkEntries(
      contentEntries,
      rootInfo,
      limits.maxUrlsPerShard,
      limits.maxShardBytes
    );
    for (const [index, chunk] of chunks.entries()) {
      const sequence = previousContent[index]?.sequence ?? nextSequence('content', maxSequences);
      const shard = makeShard(rootInfo, 'content', sequence, chunk);
      descriptors.push(shard.descriptor);
      shards.push(shard);
    }
  } else {
    descriptors.push(...previousContent);
  }

  const industryLimits = getShardLimits('industry', options);
  const industryShards = [];
  for (const previous of previousShards
    .filter((shard) => shard.bucket === 'industry')
    .sort((a, b) => a.sequence - b.sequence)) {
    const updatedEntries = [];
    let changed = false;
    for (const oldEntry of previous.entries) {
      const current = currentByLoc.get(oldEntry.loc);
      if (!current || current.bucket !== 'industry') {
        changed = true;
        continue;
      }
      assigned.add(current.loc);
      updatedEntries.push(current);
      if (current.fingerprint !== oldEntry.fingerprint) changed = true;
    }

    if (!changed) {
      industryShards.push({
        sequence: previous.sequence,
        entries: updatedEntries,
        descriptor: previous,
        changed: false
      });
      continue;
    }

    const chunks = chunkEntries(
      updatedEntries,
      rootInfo,
      industryLimits.maxUrlsPerShard,
      industryLimits.maxShardBytes
    );
    for (const [index, chunk] of chunks.entries()) {
      const sequence = index === 0 ? previous.sequence : nextSequence('industry', maxSequences);
      industryShards.push({ sequence, entries: chunk, changed: true });
    }
  }

  industryShards.sort((a, b) => a.sequence - b.sequence);
  const additions = entries
    .filter((entry) => entry.bucket === 'industry' && !assigned.has(entry.loc))
    .sort(compareLoc);
  let tail = industryShards.at(-1);
  for (const entry of additions) {
    if (!tail || !canAppendEntry(tail.entries, entry, rootInfo, industryLimits)) {
      if (!canAppendEntry([], entry, rootInfo, industryLimits)) {
        throw new Error('A single sitemap URL exceeds the industry shard budget');
      }
      tail = {
        sequence: nextSequence('industry', maxSequences),
        entries: [],
        changed: true
      };
      industryShards.push(tail);
    }
    tail.entries.push(entry);
    tail.changed = true;
    assigned.add(entry.loc);
  }

  for (const shardState of industryShards) {
    if (!shardState.changed) {
      descriptors.push(shardState.descriptor);
      continue;
    }
    const shard = makeShard(rootInfo, 'industry', shardState.sequence, shardState.entries);
    descriptors.push(shard.descriptor);
    shards.push(shard);
  }

  return {
    descriptors: descriptors.map(({ bucket, file, sequence, sha256: digest, urls }) => ({
      bucket,
      file,
      sequence,
      sha256: digest,
      urls
    })),
    shards
  };
}

function buildIndex(site, host, shards) {
  if (!shards.length || shards.length > 50000) {
    throw new Error('Sitemap index must contain between 1 and 50,000 shards');
  }
  const entries = shards.map((shard) => {
    const loc = `${shard.site || site}/sitemap-shards/${shard.host || host}/${shard.file}`;
    return `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`;
  });
  return [
    XML_DECLARATION,
    `<sitemapindex xmlns="${SITEMAP_NAMESPACE}">`,
    ...entries,
    '</sitemapindex>',
    ''
  ].join('\n');
}

function parseSitemapIndex(input, site) {
  const normalizedSites = normalizeSites(site);
  const document = parseXmlDocument(input, 'Sitemap index');
  const root = document.documentElement;
  if (root.namespaceURI !== SITEMAP_NAMESPACE || root.localName !== 'sitemapindex') {
    throw new Error('Expected a namespaced sitemapindex');
  }
  getNamespaceAttributes(root);

  const locs = [];
  const seen = new Set();
  for (const child of elementChildren(root)) {
    if (child.namespaceURI !== SITEMAP_NAMESPACE || child.localName !== 'sitemap') {
      throw new Error(`Unexpected sitemapindex child: ${child.nodeName}`);
    }
    const locElements = elementChildren(child).filter(
      (element) => element.namespaceURI === SITEMAP_NAMESPACE && element.localName === 'loc'
    );
    if (locElements.length !== 1 || elementChildren(locElements[0]).length) {
      throw new Error('Each sitemap index entry requires exactly one text-only loc');
    }
    const loc = validateLoc(locElements[0].textContent.trim(), normalizedSites);
    if (seen.has(loc)) throw new Error(`Duplicate sitemap shard reference: ${loc}`);
    seen.add(loc);
    locs.push(loc);
  }
  if (!locs.length || locs.length > 50000)
    throw new Error('Sitemap index is empty or exceeds 50,000 shards');
  return locs;
}

function sitemapUrls(site, host, shards) {
  return shards.map((shard) => `${site}/sitemap-shards/${host}/${shard.file}`);
}

function assertSameEntries(actualEntries, expectedEntries) {
  const actual = new Map();
  const expected = new Map();
  for (const entry of actualEntries) {
    if (actual.has(entry.loc)) throw new Error(`Duplicate sitemap loc across shards: ${entry.loc}`);
    actual.set(entry.loc, entry.fingerprint);
  }
  for (const entry of expectedEntries) {
    if (expected.has(entry.loc)) throw new Error(`Duplicate source sitemap loc: ${entry.loc}`);
    expected.set(entry.loc, entry.fingerprint);
  }

  const missing = [...expected.keys()].filter((loc) => !actual.has(loc));
  const extra = [...actual.keys()].filter((loc) => !expected.has(loc));
  const changed = [...expected.keys()].filter(
    (loc) => actual.has(loc) && actual.get(loc) !== expected.get(loc)
  );
  if (missing.length || extra.length || changed.length) {
    throw new Error(
      `Sitemap identity mismatch: ${JSON.stringify({
        missing: missing.slice(0, 10),
        missingCount: missing.length,
        extra: extra.slice(0, 10),
        extraCount: extra.length,
        metadataChanged: changed.slice(0, 10),
        metadataChangedCount: changed.length
      })}`
    );
  }
}

function verifyActiveShards(stateDirectory, site, descriptors, expectedEntries) {
  const actualEntries = [];
  for (const descriptor of descriptors) {
    const bytes = fs.readFileSync(path.join(stateDirectory, descriptor.file));
    const limits = getShardLimits(descriptor.bucket);
    if (
      bytes.length > limits.maxShardBytes ||
      sha256(bytes) !== descriptor.sha256 ||
      descriptor.file !== shardFileName(descriptor.bucket, descriptor.sequence, descriptor.sha256)
    ) {
      throw new Error(`Sitemap shard verification failed: ${descriptor.file}`);
    }
    const parsed = parseUrlset(bytes, site);
    if (
      parsed.entries.length !== descriptor.urls ||
      parsed.entries.length > limits.maxUrlsPerShard
    ) {
      throw new Error(`Sitemap shard has an invalid URL count: ${descriptor.file}`);
    }
    if (parsed.entries.some((entry) => entry.bucket !== descriptor.bucket)) {
      throw new Error(`Sitemap shard contains a URL from another bucket: ${descriptor.file}`);
    }
    actualEntries.push(...parsed.entries);
  }
  assertSameEntries(actualEntries, expectedEntries);
}

function writeImmutableFiles(stateDirectory, shards) {
  for (const shard of shards) writeImmutableShard(stateDirectory, shard);
}

function saveSnapshot(stateDirectory, site, descriptors, index) {
  const manifest = {
    schema: 2,
    site,
    shards: descriptors.map(({ bucket, file, sequence, sha256: digest, urls }) => ({
      bucket,
      file,
      sequence,
      sha256: digest,
      urls
    }))
  };
  const indexBytes = Buffer.from(index, 'utf8');
  atomicWriteIfChanged(
    path.join(stateDirectory, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  atomicWriteIfChanged(path.join(stateDirectory, 'sitemap.xml'), indexBytes);
}

function copyShardsToOutput(stateDirectory, outputDirectory, history, host) {
  const shardDirectory = path.join(outputDirectory, 'sitemap-shards', host);
  fs.rmSync(shardDirectory, { recursive: true, force: true });
  fs.mkdirSync(shardDirectory, { recursive: true });
  // shortcut: retain old XML hashes indefinitely; add pruning if repo/export growth needs a cap.
  for (const shard of history.files.values()) {
    if (!['content', 'industry'].includes(shard.bucket)) continue;
    const source = path.join(stateDirectory, shard.file);
    fs.copyFileSync(source, path.join(shardDirectory, shard.file));
  }
}

function removeLegacyStateShards(stateDirectory) {
  if (!fs.existsSync(stateDirectory)) return;
  for (const file of fs.readdirSync(stateDirectory)) {
    const shard = parseShardFileName(file);
    if (shard && !['content', 'industry'].includes(shard.bucket)) {
      fs.rmSync(path.join(stateDirectory, file), { force: true });
    }
  }
}

function removeSitemapGzipFiles(directory) {
  if (!fs.existsSync(directory)) return;
  for (const file of fs.readdirSync(directory)) {
    if (
      file === 'sitemap.xml.gz' ||
      (file.endsWith('.xml.gz') && parseShardFileName(file.slice(0, -3)))
    ) {
      fs.rmSync(path.join(directory, file), { force: true });
    }
  }
}

function removeLegacyShards(outputDirectory) {
  if (!fs.existsSync(outputDirectory)) return;
  for (const file of fs.readdirSync(outputDirectory)) {
    if (/^sitemap-\d+\.xml(?:\.gz)?$/.test(file)) {
      fs.rmSync(path.join(outputDirectory, file), { force: true });
    }
  }
}

function clearPreviewSitemaps(outputDirectory) {
  removeLegacyShards(outputDirectory);
  fs.rmSync(path.join(outputDirectory, 'sitemap.xml'), { force: true });
  fs.rmSync(path.join(outputDirectory, 'sitemap.xml.gz'), { force: true });
  fs.rmSync(path.join(outputDirectory, 'sitemap-shards'), { recursive: true, force: true });
}

function writePreviewSitemaps(outputDirectory, options) {
  const bases = getProductionBaseUrls();
  const sites = [...new Set(Object.values(bases).map(normalizeSite))];
  const sourcePath = path.join(outputDirectory, 'sitemap.xml');
  const source = parseUrlset(fs.readFileSync(sourcePath), sites, PROTOCOL_URL_LIMIT * sites.length);
  const siteByHost = new Map(sites.map((site) => [new URL(site).hostname, site]));
  if (siteByHost.size !== sites.length) {
    throw new Error('Preview sitemap origins must use distinct hostnames');
  }

  const entriesByHost = new Map();
  for (const entry of source.entries) {
    const host = new URL(entry.loc).hostname;
    if (!siteByHost.has(host))
      throw new Error(`Preview sitemap uses an unknown host: ${entry.loc}`);
    if (!entriesByHost.has(host)) entriesByHost.set(host, { content: [], industry: [] });
    entriesByHost.get(host)[entry.bucket].push(entry);
  }

  clearPreviewSitemaps(outputDirectory);
  const shards = [];
  for (const host of [...entriesByHost.keys()].sort()) {
    const site = siteByHost.get(host);
    for (const bucket of ['content', 'industry']) {
      const limits = getShardLimits(bucket, options);
      const chunks = chunkEntries(
        entriesByHost.get(host)[bucket],
        source.rootInfo,
        limits.maxUrlsPerShard,
        limits.maxShardBytes
      );
      for (const [sequence, entries] of chunks.entries()) {
        const shard = makeShard(source.rootInfo, bucket, sequence, entries);
        const descriptor = { ...shard.descriptor, host, site };
        atomicWriteIfChanged(
          path.join(outputDirectory, 'sitemap-shards', host, descriptor.file),
          shard.bytes
        );
        shards.push(descriptor);
      }
    }
  }

  const index = buildIndex(undefined, undefined, shards);
  const expectedIndexUrls = shards.map(
    ({ site, host, file }) => `${site}/sitemap-shards/${host}/${file}`
  );
  const actualIndexUrls = parseSitemapIndex(index, sites);
  if (JSON.stringify(actualIndexUrls) !== JSON.stringify(expectedIndexUrls)) {
    throw new Error('Preview sitemap index references do not match its shard files');
  }
  atomicWriteIfChanged(sourcePath, index);
  return { skipped: false, entryCount: source.entries.length, shards, index };
}

function splitSitemapFile(outputDirectory, options = {}) {
  const output = path.resolve(outputDirectory);
  const variant = options.variant || resolveSiteVariant();
  if (variant === 'preview') {
    const result = writePreviewSitemaps(output, options);
    console.log(
      `[split-sitemap] Preview ${result.entryCount} URLs -> ${result.shards.length} shards`
    );
    return result;
  }

  const bases = getProductionBaseUrls();
  const site = normalizeSite(options.site || bases[variant]);
  const host = new URL(site).hostname;
  const root = path.resolve(__dirname, '..');
  const stateDirectory = path.resolve(options.stateDirectory || path.join(root, 'sitemaps', host));
  getShardLimits('industry', options);
  getShardLimits('content', options);
  removeLegacyShards(output);

  const sourcePath = path.join(output, 'sitemap.xml');
  const source = parseUrlset(fs.readFileSync(sourcePath), site);
  const history = scanHistory(stateDirectory);
  const previousShards = readSnapshot(stateDirectory, site, history);
  const reconciled = reconcileShards(
    source.entries,
    source.rootInfo,
    previousShards,
    history.maxSequences,
    options
  );

  writeImmutableFiles(stateDirectory, reconciled.shards);
  verifyActiveShards(stateDirectory, site, reconciled.descriptors, source.entries);

  const index = buildIndex(site, host, reconciled.descriptors);
  const expectedIndexUrls = sitemapUrls(site, host, reconciled.descriptors);
  const actualIndexUrls = parseSitemapIndex(index, site);
  if (JSON.stringify(actualIndexUrls) !== JSON.stringify(expectedIndexUrls)) {
    throw new Error('Generated sitemap index references do not match the persisted shard set');
  }

  const currentHistory = scanHistory(stateDirectory);
  copyShardsToOutput(stateDirectory, output, currentHistory, host);
  const indexBytes = Buffer.from(index, 'utf8');
  saveSnapshot(stateDirectory, site, reconciled.descriptors, index);
  atomicWriteIfChanged(path.join(output, 'sitemap.xml'), indexBytes);
  removeLegacyStateShards(stateDirectory);
  removeSitemapGzipFiles(stateDirectory);
  removeSitemapGzipFiles(output);

  console.log(
    `[split-sitemap] ${source.entries.length} URLs -> ${reconciled.descriptors.length} shards (${host})`
  );
  return {
    skipped: false,
    entryCount: source.entries.length,
    shards: reconciled.descriptors,
    index
  };
}

if (require.main === module) {
  try {
    splitSitemapFile(path.join(process.cwd(), 'out'));
  } catch (error) {
    console.error(`[split-sitemap] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { bucketForLoc, parseSitemapIndex, parseUrlset, splitSitemapFile };
