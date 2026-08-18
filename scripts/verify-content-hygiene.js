#!/usr/bin/env node

/**
 * Validate publishable source Markdown without inspecting delivery metadata.
 * The check is intentionally local: source validation must not depend on network access.
 */

const fs = require('node:fs');
const crypto = require('node:crypto');
const net = require('node:net');
const path = require('node:path');
const { resolveSiteVariant, getDefaultLocale } = require('./lib/site-variant');

function loadTypeScript() {
  try {
    return require('typescript');
  } catch {
    for (const directory of (process.env.PATH || '').split(path.delimiter)) {
      try {
        return require(path.resolve(directory, '..', 'typescript'));
      } catch {
        // Continue through the configured executable paths.
      }
    }
  }
  throw new Error('Unable to load the TypeScript compiler API');
}

const ts = loadTypeScript();

const REPOSITORY_ROOT = path.resolve(__dirname, '..');
const MARKDOWN_ROOTS = ['src/content', 'content/competitors'];
const STRUCTURED_COPY_ROOTS = ['src/faq', 'src/locales'];
const ENGLISH_CITATION_LABEL = 'Source(?:s)?|Reference(?:s)?';
const CHINESE_CITATION_LABEL = '资料来源|参考资料|来源';
const CITATION_LABEL_NAME = `${ENGLISH_CITATION_LABEL}|${CHINESE_CITATION_LABEL}`;
const CITATION_SEPARATOR = /^[\s,;，；、·|/]*$/;
const CITATION_KEY = new RegExp(`^(?:${CITATION_LABEL_NAME})$`, 'i');
const SOURCE_SECTION = new RegExp(`^(#{1,6})\\s*(?:${CITATION_LABEL_NAME})\\s*[:：]?\\s*$`, 'i');
const CITATION_LABEL_TEXT = new RegExp(
  `(?<![\\p{L}\\p{N}_])(?:${ENGLISH_CITATION_LABEL})\\s*[:：]\\s*|(?:${CHINESE_CITATION_LABEL})\\s*[:：]\\s*`,
  'giu'
);
const BLOCK_TAGS = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'body',
  'dd',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'header',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul'
]);
const CHINESE_EDITORIAL_LABELS = [
  '事实来源',
  '需求依据',
  '需求锚点',
  'GSC *来源',
  '案例授权',
  '案例清理',
  '案例引用',
  '发布落点',
  '核验流程',
  '验证流程',
  '复核周期',
  '核验日',
  '核验日期',
  '验证日期',
  '排期',
  '签发',
  '修订记录',
  '更新记录',
  '版本与套餐',
  '版本与档位',
  '计划(?:安排)?',
  '附录',
  '补充说明',
  '审核(?:状态)?',
  '交付(?:排期)?',
  '来源依据',
  '客户 *KB',
  '内部 *KB'
];
const ENGLISH_EDITORIAL_LABELS = [
  'internal +KB',
  'client +KB',
  'fact +sources?',
  'source +of +facts',
  'source +material',
  'demand +anchor(?: *\\([^)]*\\))?',
  'demand +basis',
  'GSC +provenance',
  'case +clearance',
  'publish +target',
  'verification +workflow',
  'review +cycle',
  'verification +date',
  'verified +on',
  'delivery +schedule',
  'schedule',
  'sign[- ]off',
  'revision +log',
  'review +status',
  'version(?:s)? +and +(?:plans|tiers)',
  'version +and +(?:package|tiers)',
  'version[- ]plan',
  'editions?',
  'update[- ](?:record|log)(?:[- ]addendum)?',
  'review[- ]cycle',
  'revision',
  'addendum'
];
const EDITORIAL_LABEL_NAME = [...CHINESE_EDITORIAL_LABELS, ...ENGLISH_EDITORIAL_LABELS].join('|');
const EDITORIAL_KEY = new RegExp(`^(?:${EDITORIAL_LABEL_NAME})$`, 'i');
const CHINESE_EDITORIAL_INLINE = CHINESE_EDITORIAL_LABELS.filter(
  (label) => label !== '计划(?:安排)?'
);
const CHINESE_STANDALONE_EDITORIAL = '计划(?:安排)?';
const ENGLISH_EDITORIAL_PATTERN = ENGLISH_EDITORIAL_LABELS.map((label) =>
  label.replace(/ \+/g, '\\s+')
).join('|');
const EDITORIAL_MATCHER = new RegExp(
  `(?<![\\p{L}\\p{N}_])(?:${ENGLISH_EDITORIAL_PATTERN})\\s*[:：]|(?<![\\p{L}\\p{N}_])(?:${CHINESE_STANDALONE_EDITORIAL})\\s*[:：]|(?:${CHINESE_EDITORIAL_INLINE.join(
    '|'
  )})\\s*[:：]`,
  'iu'
);
const EDITORIAL_PREAMBLE =
  /(?:文中产品能力与版本边界来自客户官方公开资料，核验日|(?:All )?product capabilities and version boundaries(?: referenced in this guide| in this article| are)? .*verified (?:as of |on )?\*?\*?(?:\d{4}-\d{2}-\d{2}|[A-Z][a-z]+ \d{1,2}, \d{4}))/i;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024;
// Bound offset metadata before entity-heavy HTML can grow heap usage disproportionately.
const MAX_HTML_PROJECTION_RUNS = 50_000;
const HTML_POLICY_NAMED_REFERENCES = new Map(
  Object.entries({
    Tab: '\t',
    NewLine: '\n',
    nbsp: '\u00a0',
    NonBreakingSpace: '\u00a0',
    ensp: '\u2002',
    emsp: '\u2003',
    emsp13: '\u2004',
    emsp14: '\u2005',
    numsp: '\u2007',
    puncsp: '\u2008',
    thinsp: '\u2009',
    ThinSpace: '\u2009',
    hairsp: '\u200a',
    VeryThinSpace: '\u200a',
    MediumSpace: '\u205f',
    ThickSpace: '\u205f\u200a',
    NegativeVeryThinSpace: '\u200b',
    NegativeThinSpace: '\u200b',
    NegativeMediumSpace: '\u200b',
    NegativeThickSpace: '\u200b',
    ApplyFunction: '\u2061',
    InvisibleTimes: '\u2062',
    InvisibleComma: '\u2063',
    af: '\u2061',
    it: '\u2062',
    ic: '\u2063',
    ZeroWidthSpace: '\u200b',
    NoBreak: '\u2060',
    zwnj: '\u200c',
    zwj: '\u200d',
    lrm: '\u200e',
    rlm: '\u200f',
    hyphen: '\u2010',
    dash: '\u2010',
    ndash: '\u2013',
    mdash: '\u2014',
    horbar: '\u2015',
    minus: '\u2212',
    shy: '\u00ad',
    colon: ':',
    Colon: '\u2237',
    ratio: '\u2236',
    amp: '&',
    quot: '"',
    apos: "'",
    lt: '<',
    gt: '>'
  })
);
const HTML_LEGACY_NAMED_REFERENCES = new Set(['nbsp', 'shy', 'amp', 'quot', 'lt', 'gt']);
const HTML_C1_REPLACEMENTS = new Map([
  [0x80, 0x20ac],
  [0x82, 0x201a],
  [0x83, 0x0192],
  [0x84, 0x201e],
  [0x85, 0x2026],
  [0x86, 0x2020],
  [0x87, 0x2021],
  [0x88, 0x02c6],
  [0x89, 0x2030],
  [0x8a, 0x0160],
  [0x8b, 0x2039],
  [0x8c, 0x0152],
  [0x8e, 0x017d],
  [0x91, 0x2018],
  [0x92, 0x2019],
  [0x93, 0x201c],
  [0x94, 0x201d],
  [0x95, 0x2022],
  [0x96, 0x2013],
  [0x97, 0x2014],
  [0x98, 0x02dc],
  [0x99, 0x2122],
  [0x9a, 0x0161],
  [0x9b, 0x203a],
  [0x9c, 0x0153],
  [0x9e, 0x017e],
  [0x9f, 0x0178]
]);

function usage(message) {
  if (message) process.stderr.write(`${message}\n`);
  process.stderr.write('Usage: verify-content-hygiene --mode source [--root <repository-root>]\n');
  process.stderr.write(
    '       verify-content-hygiene --mode html --root <output-root> [--variant io|cn|preview]\n'
  );
  process.stderr.write(
    '       verify-content-hygiene --mode live --base-url-cn <https-url> --base-url-io <https-url> --report <path> [--allow-http-for-tests]\n'
  );
}

function parseArgs(argv) {
  const options = {
    mode: undefined,
    root: REPOSITORY_ROOT,
    rootProvided: false,
    variant: undefined,
    baseUrlCn: undefined,
    baseUrlIo: undefined,
    report: undefined,
    allowHttpForTests: false,
    concurrency: 8,
    timeoutMs: 15000,
    maxUrls: 5000,
    maxSitemapDepth: 3
  };
  const numericOptions = {
    '--concurrency': ['concurrency', 1, 32],
    '--timeout-ms': ['timeoutMs', 100, 60000],
    '--max-urls': ['maxUrls', 1, 10000],
    '--max-sitemap-depth': ['maxSitemapDepth', 0, 5]
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--mode') {
      const mode = argv[++index];
      if (!mode || mode.startsWith('--')) throw new Error('--mode requires source, html, or live');
      options.mode = mode;
    } else if (token === '--root') {
      const root = argv[++index];
      if (!root || root.startsWith('--')) throw new Error('--root requires a directory');
      options.root = path.resolve(root);
      options.rootProvided = true;
    } else if (token === '--variant') {
      const variant = argv[++index];
      if (!variant || variant.startsWith('--'))
        throw new Error('--variant requires io, cn, or preview');
      options.variant = variant;
    } else if (token === '--base-url-cn' || token === '--base-url-io' || token === '--report') {
      const value = argv[++index];
      if (!value || value.startsWith('--')) throw new Error(`${token} requires a value`);
      if (token === '--base-url-cn') options.baseUrlCn = value;
      else if (token === '--base-url-io') options.baseUrlIo = value;
      else options.report = path.resolve(value);
    } else if (token === '--allow-http-for-tests') {
      options.allowHttpForTests = true;
    } else if (numericOptions[token]) {
      const value = argv[++index];
      const [key, minimum, maximum] = numericOptions[token];
      if (!/^(?:0|[1-9]\d*)$/.test(value || '')) {
        throw new Error(`${token} requires an integer from ${minimum} to ${maximum}`);
      }
      const numericValue = Number(value);
      if (numericValue < minimum || numericValue > maximum) {
        throw new Error(`${token} must be from ${minimum} to ${maximum}`);
      }
      options[key] = numericValue;
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  if (!['source', 'html', 'live'].includes(options.mode))
    throw new Error('--mode source, html, or live is required');
  if (options.mode === 'source') return options;
  if (options.mode === 'html') {
    if (!options.rootProvided) throw new Error('--mode html requires --root');
    const variant = options.variant || resolveSiteVariant(process.env);
    if (!['io', 'cn', 'preview'].includes(variant))
      throw new Error('--variant must be io, cn, or preview');
    options.variant = variant;
    return options;
  }
  if (!options.baseUrlCn || !options.baseUrlIo || !options.report) {
    throw new Error('--mode live requires --base-url-cn, --base-url-io, and --report');
  }
  if (options.maxUrls < 2)
    throw new Error('--max-urls must be at least 2 for the two root sitemaps');
  options.baseUrlCn = validateLiveBaseUrl(
    options.baseUrlCn,
    options.allowHttpForTests,
    '--base-url-cn',
    'https://fastgpt.cn'
  );
  options.baseUrlIo = validateLiveBaseUrl(
    options.baseUrlIo,
    options.allowHttpForTests,
    '--base-url-io',
    'https://fastgpt.io'
  );
  return options;
}

function walkFiles(root, relativeRoot, matcher) {
  const directory = path.join(root, relativeRoot);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const relativePath = path.join(relativeRoot, entry.name);
      return entry.isDirectory()
        ? walkFiles(root, relativePath, matcher)
        : entry.isFile() && matcher(entry.name)
        ? [relativePath]
        : [];
    });
}

function publishedMarkdownFiles(root) {
  return MARKDOWN_ROOTS.flatMap((relativeRoot) =>
    walkFiles(root, relativeRoot, (name) => name.endsWith('.md'))
  ).sort((left, right) => left.localeCompare(right));
}

function publishedStructuredCopyFiles(root) {
  return STRUCTURED_COPY_ROOTS.flatMap((relativeRoot) =>
    walkFiles(root, relativeRoot, (name) => /\.(?:json|[cm]?[jt]sx?)$/.test(name))
  ).sort((left, right) => left.localeCompare(right));
}

function publishableBody(source) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const leadingFrontMatter = normalized.match(/^---\n[\s\S]*?\n(?:---|\.\.\.)(?:\n|$)/);
  const withoutFrontMatter = leadingFrontMatter
    ? normalized.slice(leadingFrontMatter[0].length)
    : normalized;
  const leadingComment = withoutFrontMatter.match(/^<!--[\s\S]*?-->/);
  return leadingComment ? withoutFrontMatter.slice(leadingComment[0].length) : withoutFrontMatter;
}

function inferLocale(relativePath) {
  const normalized = relativePath.replaceAll(path.sep, '/');
  if (normalized.includes('/zh/')) return 'zh';
  if (normalized.includes('/en/')) return 'en';
  return 'default';
}

function sourceIdentity(relativePath) {
  return path.parse(relativePath).name;
}

function finding(rule, surface, relativePath, line, detail) {
  return {
    rule,
    surface,
    locale: inferLocale(relativePath),
    path: relativePath.replaceAll(path.sep, '/'),
    source: sourceIdentity(relativePath),
    line,
    detail
  };
}

function inIpv4Range(address, base, prefixLength) {
  const value = address
    .split('.')
    .reduce((result, part) => (result << 8n) | BigInt(Number(part)), 0n);
  const baseValue = base
    .split('.')
    .reduce((result, part) => (result << 8n) | BigInt(Number(part)), 0n);
  const mask = ((1n << BigInt(prefixLength)) - 1n) << BigInt(32 - prefixLength);
  return (value & mask) === (baseValue & mask);
}

function isReservedIpv4(address) {
  return [
    ['0.0.0.0', 8],
    ['10.0.0.0', 8],
    ['100.64.0.0', 10],
    ['127.0.0.0', 8],
    ['169.254.0.0', 16],
    ['172.16.0.0', 12],
    ['192.0.0.0', 24],
    ['192.0.2.0', 24],
    ['192.88.99.0', 24],
    ['192.168.0.0', 16],
    ['198.18.0.0', 15],
    ['198.51.100.0', 24],
    ['203.0.113.0', 24],
    ['224.0.0.0', 3]
  ].some(([base, prefixLength]) => inIpv4Range(address, base, prefixLength));
}

function parseIpv6(address) {
  const value = address.toLowerCase().replace(/^\[|\]$/g, '');
  const [left, right] = value.split('::');
  if (value.split('::').length > 2) return undefined;
  const leftParts = left ? left.split(':') : [];
  const rightParts = right ? right.split(':') : [];
  const parts = [
    ...leftParts,
    ...Array(8 - leftParts.length - rightParts.length).fill('0'),
    ...rightParts
  ];
  if (parts.length !== 8 || parts.some((part) => !/^[0-9a-f]{1,4}$/.test(part))) return undefined;
  return parts.reduce((result, part) => (result << 16n) | BigInt(`0x${part}`), 0n);
}

function inIpv6Range(address, base, prefixLength) {
  const value = parseIpv6(address);
  const baseValue = parseIpv6(base);
  if (value === undefined || baseValue === undefined) return true;
  const mask = ((1n << BigInt(prefixLength)) - 1n) << BigInt(128 - prefixLength);
  return (value & mask) === (baseValue & mask);
}

function isReservedIpv6(address) {
  if (inIpv6Range(address, '::ffff:0:0', 96)) {
    const value = parseIpv6(address);
    const mappedIpv4 = [24n, 16n, 8n, 0n].map((shift) => Number((value >> shift) & 255n)).join('.');
    return isReservedIpv4(mappedIpv4);
  }
  return [
    ['::', 128],
    ['::1', 128],
    ['100::', 64],
    ['2001::', 23],
    ['2002::', 16],
    ['3fff::', 20],
    ['fc00::', 7],
    ['fe80::', 10],
    ['ff00::', 8]
  ].some(([base, prefixLength]) => inIpv6Range(address, base, prefixLength));
}

function isPrivateHostname(hostname) {
  const value = hostname
    .toLowerCase()
    .replace(/^\[|\]$/g, '')
    .replace(/\.+$/, '');
  if (
    value === 'localhost' ||
    value.endsWith('.localhost') ||
    value.endsWith('.local') ||
    value.endsWith('.internal') ||
    value.endsWith('.home.arpa')
  ) {
    return true;
  }
  const family = net.isIP(value);
  if (family === 4) return isReservedIpv4(value);
  if (family === 6) return isReservedIpv6(value);
  return false;
}

function validPublicCitation(value) {
  if (typeof value !== 'string') return false;
  const entry = stripCitationLabel(value) ?? value.trim().replace(/^(?:>\s*)?(?:[-*+]\s+)?/, '');
  let previousEnd = 0;
  let count = 0;
  for (const link of markdownLinks(entry)) {
    if (!CITATION_SEPARATOR.test(entry.slice(previousEnd, link.index))) return false;
    if (!isDescriptiveCitationLabel(link.label, link.href)) return false;
    try {
      const url = new URL(link.href);
      if (
        url.protocol !== 'https:' ||
        url.username ||
        url.password ||
        isPrivateHostname(url.hostname)
      ) {
        return false;
      }
    } catch {
      return false;
    }
    previousEnd = link.end;
    count += 1;
  }
  return count > 0 && CITATION_SEPARATOR.test(entry.slice(previousEnd));
}

function markdownLinks(value) {
  const links = [];
  for (let start = value.indexOf('['); start >= 0; start = value.indexOf('[', start + 1)) {
    const labelEnd = value.indexOf(']', start + 1);
    if (labelEnd < 0 || value[labelEnd + 1] !== '(') continue;
    let cursor = labelEnd + 2;
    let depth = 1;
    while (cursor < value.length && depth) {
      if (value[cursor] === '(') depth += 1;
      else if (value[cursor] === ')') depth -= 1;
      cursor += 1;
    }
    if (depth || /\s/.test(value.slice(labelEnd + 2, cursor - 1))) continue;
    links.push({
      index: start,
      end: cursor,
      label: value.slice(start + 1, labelEnd),
      href: value.slice(labelEnd + 2, cursor - 1)
    });
    start = cursor - 1;
  }
  return links;
}

function isDescriptiveCitationLabel(label, href) {
  const text = label.trim();
  return Boolean(text) && text !== href && !/^https?:\/\//i.test(text);
}

function normalizedCitationText(value) {
  return policyTextProjection(value)
    .replaceAll('**', '')
    .trim()
    .replace(/^(?:>\s*)?(?:[-*+]\s+)?/, '');
}

function citationLabelMatches(value) {
  const text = normalizedCitationText(value);
  const pattern = new RegExp(CITATION_LABEL_TEXT.source, 'giu');
  return { matches: [...text.matchAll(pattern)], text };
}

function citationLabelMatch(value) {
  const { matches, text } = citationLabelMatches(value);
  return { match: matches[0], text };
}

function stripCitationLabel(value) {
  const { match, text } = citationLabelMatch(value);
  return match ? text.slice(match[0].length) : undefined;
}

function isCitationLabelled(value) {
  return citationLabelMatches(value).matches.length > 0;
}

function isCitationKey(value) {
  return CITATION_KEY.test(value.trim());
}

function labelledCitationValues(value) {
  return labelledCitationEntries(value).map((entry) => entry.value);
}

function labelledCitationEntries(value) {
  const { matches, text } = citationLabelMatches(value);
  return matches.map((match, index) => {
    const end = matches[index + 1]?.index ?? text.length;
    return {
      token: match[0].trim(),
      index: match.index,
      value: text.slice(match.index + match[0].length, end).trim()
    };
  });
}

function validPublicCitationValue(value) {
  if (typeof value !== 'string') return false;
  return validPublicCitation(policyTextProjection(value));
}

function hasEditorialLabel(value) {
  const text = normalizedCitationText(value);
  return EDITORIAL_MATCHER.test(text);
}

function collectJsonEntries(source) {
  const entries = [];
  let cursor = 0;
  const lineStarts = [0];
  for (let index = source.indexOf('\n'); index >= 0; index = source.indexOf('\n', index + 1)) {
    lineStarts.push(index + 1);
  }
  const lineAt = (index) => {
    let left = 0;
    let right = lineStarts.length - 1;
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      if (lineStarts[middle] <= index) left = middle + 1;
      else right = middle - 1;
    }
    return right + 1;
  };
  const skipWhitespace = () => {
    while (/\s/.test(source[cursor] || '')) cursor += 1;
  };
  const parseString = () => {
    const start = cursor;
    cursor += 1;
    while (cursor < source.length) {
      if (source[cursor] === '\\') cursor += 2;
      else if (source[cursor++] === '"') break;
    }
    return { start, value: JSON.parse(source.slice(start, cursor)) };
  };
  const parseValue = (arrayLeaf = false, valuePath = []) => {
    skipWhitespace();
    const start = cursor;
    if (source[cursor] === '"') {
      const string = parseString();
      if (arrayLeaf) {
        entries.push({
          key: undefined,
          value: string.value,
          line: lineAt(start),
          valueOffset: start,
          path: valuePath
        });
      }
      return string.value;
    }
    if (source[cursor] === '{') {
      cursor += 1;
      skipWhitespace();
      while (source[cursor] !== '}') {
        const key = parseString();
        skipWhitespace();
        cursor += 1;
        skipWhitespace();
        const valueOffset = cursor;
        const childPath = [...valuePath, key.value];
        const value = parseValue(false, childPath);
        entries.push({
          key: key.value,
          value,
          line: lineAt(key.start),
          keyOffset: key.start,
          valueOffset,
          valueLine: lineAt(valueOffset),
          path: childPath
        });
        skipWhitespace();
        if (source[cursor] === ',') {
          cursor += 1;
          skipWhitespace();
        }
      }
      cursor += 1;
      return {};
    }
    if (source[cursor] === '[') {
      cursor += 1;
      skipWhitespace();
      while (source[cursor] !== ']') {
        parseValue(true, valuePath);
        skipWhitespace();
        if (source[cursor] === ',') {
          cursor += 1;
          skipWhitespace();
        }
      }
      cursor += 1;
      return [];
    }
    while (cursor < source.length && !/[\s,}\]]/.test(source[cursor])) cursor += 1;
    return JSON.parse(source.slice(start, cursor));
  };
  parseValue();
  return entries;
}

function scriptKind(relativePath) {
  if (/\.tsx$/i.test(relativePath)) return ts.ScriptKind.TSX;
  if (/\.jsx$/i.test(relativePath)) return ts.ScriptKind.JSX;
  if (/\.[cm]?js$/i.test(relativePath)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function sourceLine(sourceFile, node) {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function sourceEntryLine(sourceFile, node, value) {
  if (typeof value !== 'string') return sourceLine(sourceFile, node);
  const editorial = new RegExp(EDITORIAL_MATCHER.source, 'iu').exec(value);
  const citation = new RegExp(CITATION_LABEL_TEXT.source, 'iu').exec(value);
  const token = editorial?.[0] || citation?.[0];
  const nodeText = node.getText(sourceFile);
  const offset = token && nodeText.indexOf(token);
  const fallback = token?.match(/[\p{L}\p{N}_]+/u)?.[0];
  const resolvedOffset = offset < 0 && fallback ? nodeText.indexOf(fallback) : offset;
  return resolvedOffset < 0 || resolvedOffset === undefined
    ? sourceLine(sourceFile, node)
    : sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile) + resolvedOffset).line + 1;
}

function propertyName(node, sourceFile) {
  if (!node) return undefined;
  if (ts.isComputedPropertyName(node)) return expressionText(node.expression);
  return node.getText(sourceFile).replace(/^['"]|['"]$/g, '');
}

function expressionText(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isNonNullExpression(node)
  ) {
    return expressionText(node.expression);
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = expressionText(node.left);
    const right = expressionText(node.right);
    return left === undefined || right === undefined ? undefined : `${left}${right}`;
  }
  if (ts.isTemplateExpression(node)) {
    let value = node.head.text;
    for (const span of node.templateSpans) {
      const expression = expressionText(span.expression);
      if (expression === undefined) return undefined;
      value += expression + span.literal.text;
    }
    return value;
  }
  return undefined;
}

function staticExpressionFragments(node) {
  const value = expressionText(node);
  if (value !== undefined) return [value];
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isNonNullExpression(node)
  ) {
    return staticExpressionFragments(node.expression);
  }
  if (ts.isTemplateExpression(node)) {
    return [
      node.head.text,
      ...node.templateSpans.flatMap((span) => [
        ...staticExpressionFragments(span.expression),
        span.literal.text
      ])
    ];
  }
  if (ts.isBinaryExpression(node)) {
    return [...staticExpressionFragments(node.left), ...staticExpressionFragments(node.right)];
  }
  if (ts.isConditionalExpression(node)) {
    return [
      ...staticExpressionFragments(node.condition),
      ...staticExpressionFragments(node.whenTrue),
      ...staticExpressionFragments(node.whenFalse)
    ];
  }
  return [];
}

function staticExpressionProjection(node) {
  const fragments = staticExpressionFragments(node);
  return fragments.length ? fragments.join('\n') : undefined;
}

function escapeHtmlAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function jsxAttributeText(attribute, sourceFile) {
  if (!ts.isJsxAttribute(attribute)) return '';
  if (attribute.name.getText(sourceFile).toLowerCase() !== 'href') return '';
  if (!attribute.initializer) return '';
  if (ts.isStringLiteral(attribute.initializer)) {
    return ` href="${escapeHtmlAttribute(attribute.initializer.text)}"`;
  }
  if (ts.isJsxExpression(attribute.initializer)) {
    const value =
      attribute.initializer.expression && expressionText(attribute.initializer.expression);
    return value === undefined ? '' : ` href="${escapeHtmlAttribute(value)}"`;
  }
  return '';
}

function jsxOpeningText(element, sourceFile) {
  const attributes = element.attributes.properties
    .map((attribute) => jsxAttributeText(attribute, sourceFile))
    .join('');
  return `<${element.tagName.getText(sourceFile)}${attributes}>`;
}

function staticJsxProjection(node, sourceFile) {
  if (ts.isJsxText(node)) return node.getText(sourceFile);
  if (ts.isJsxExpression(node)) {
    return node.expression ? staticExpressionProjection(node.expression) || '\n' : '';
  }
  if (ts.isJsxFragment(node))
    return node.children.map((child) => staticJsxProjection(child, sourceFile)).join('');
  if (ts.isJsxElement(node)) {
    const opening = jsxOpeningText(node.openingElement, sourceFile);
    const children = node.children.map((child) => staticJsxProjection(child, sourceFile)).join('');
    return `${opening}${children}${node.closingElement.getText(sourceFile)}`;
  }
  if (ts.isJsxSelfClosingElement(node)) return jsxOpeningText(node, sourceFile);
  return '';
}

function collectTypeScriptEntries(relativePath, source) {
  const sourceFile = ts.createSourceFile(
    relativePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind(relativePath)
  );
  if (sourceFile.parseDiagnostics.length) {
    const diagnostic = sourceFile.parseDiagnostics[0];
    return [
      {
        error: ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
        line: sourceFile.getLineAndCharacterOfPosition(diagnostic.start || 0).line + 1
      }
    ];
  }
  const entries = [];
  const seen = new Set();
  const add = (node, value, key) => {
    const identity = `${node.pos}:${node.end}:${key || ''}`;
    if (seen.has(identity)) return;
    seen.add(identity);
    if (
      !key &&
      typeof value === 'string' &&
      value.includes('\n') &&
      !new RegExp(`(?:${CITATION_LABEL_NAME})\\s*[:：]\\s*$`, 'mi').test(value) &&
      !(
        hasEditorialLabel(value) &&
        !value.split('\n').some((lineValue) => hasEditorialLabel(lineValue))
      ) &&
      !ts.isJsxElement(node) &&
      !ts.isJsxFragment(node)
    ) {
      const nodeText = node.getText(sourceFile);
      let cursor = 0;
      for (const lineValue of value.split('\n')) {
        if (!lineValue) continue;
        const offset = nodeText.indexOf(lineValue, cursor);
        cursor = Math.max(cursor, offset + lineValue.length);
        entries.push({
          key,
          value: lineValue,
          line:
            offset < 0
              ? sourceEntryLine(sourceFile, node, lineValue)
              : sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile) + offset).line +
                1
        });
      }
      return;
    }
    entries.push({ key, value: value || '', line: sourceEntryLine(sourceFile, node, value) });
  };
  const inspectPolicyProperty = (property) => {
    if (ts.isSpreadAssignment(property)) {
      inspectSpreadExpression(property.expression);
      return undefined;
    }
    if (
      !ts.isPropertyAssignment(property) &&
      !ts.isPropertyDeclaration(property) &&
      !ts.isShorthandPropertyAssignment(property)
    ) {
      return undefined;
    }
    const key = propertyName(property.name, sourceFile);
    if (!key || (!isCitationKey(key) && !EDITORIAL_KEY.test(key))) return undefined;
    const value =
      ts.isPropertyAssignment(property) || ts.isPropertyDeclaration(property)
        ? property.initializer && expressionText(property.initializer)
        : undefined;
    add(property.initializer || property, value, key);
    return { value };
  };
  const inspectJsxAttributes = (attributes) => {
    for (const attribute of attributes.properties) {
      if (ts.isJsxAttribute(attribute)) {
        const key = attribute.name.getText(sourceFile);
        if (!isCitationKey(key) && !EDITORIAL_KEY.test(key)) continue;
        const value =
          attribute.initializer && ts.isJsxExpression(attribute.initializer)
            ? expressionText(attribute.initializer.expression)
            : attribute.initializer && ts.isStringLiteral(attribute.initializer)
            ? attribute.initializer.text
            : undefined;
        add(attribute.initializer || attribute, value, key);
      } else if (ts.isJsxSpreadAttribute(attribute)) {
        inspectSpreadExpression(attribute.expression);
      }
    }
  };
  const inspectSpreadExpression = (expression) => {
    if (ts.isObjectLiteralExpression(expression)) {
      for (const property of expression.properties) inspectPolicyProperty(property);
    } else if (ts.isConditionalExpression(expression)) {
      inspectSpreadExpression(expression.whenTrue);
      inspectSpreadExpression(expression.whenFalse);
    } else if (ts.isBinaryExpression(expression)) {
      inspectSpreadExpression(expression.left);
      inspectSpreadExpression(expression.right);
    } else if (
      ts.isParenthesizedExpression(expression) ||
      ts.isAsExpression(expression) ||
      ts.isSatisfiesExpression(expression) ||
      ts.isNonNullExpression(expression)
    ) {
      inspectSpreadExpression(expression.expression);
    }
  };
  const inspectJsxTree = (node) => {
    if (ts.isJsxElement(node)) {
      inspectJsxAttributes(node.openingElement.attributes);
      for (const child of node.children) inspectJsxTree(child);
    } else if (ts.isJsxSelfClosingElement(node)) {
      inspectJsxAttributes(node.attributes);
    } else if (ts.isJsxFragment(node)) {
      for (const child of node.children) inspectJsxTree(child);
    } else if (ts.isJsxExpression(node) && node.expression) {
      inspectJsxTree(node.expression);
      ts.forEachChild(node.expression, inspectJsxTree);
    }
  };
  const visit = (node) => {
    if (
      ts.isPropertyAssignment(node) ||
      ts.isPropertyDeclaration(node) ||
      ts.isShorthandPropertyAssignment(node)
    ) {
      const policyProperty = inspectPolicyProperty(node);
      if (
        policyProperty &&
        (ts.isShorthandPropertyAssignment(node) || policyProperty.value !== undefined)
      ) {
        return;
      }
    }
    if (ts.isJsxAttribute(node)) {
      const key = node.name.getText(sourceFile);
      const value =
        node.initializer && ts.isJsxExpression(node.initializer)
          ? expressionText(node.initializer.expression)
          : node.initializer && ts.isStringLiteral(node.initializer)
          ? node.initializer.text
          : undefined;
      if (isCitationKey(key) || EDITORIAL_KEY.test(key)) {
        add(node.initializer || node, value, key);
        if (value !== undefined) return;
      }
    }
    if (ts.isJsxElement(node)) {
      inspectJsxTree(node);
      add(node, staticJsxProjection(node, sourceFile));
      return;
    }
    if (ts.isJsxSelfClosingElement(node)) {
      inspectJsxTree(node);
      add(node, staticJsxProjection(node, sourceFile));
      return;
    }
    if (ts.isJsxFragment(node)) {
      inspectJsxTree(node);
      add(node, staticJsxProjection(node, sourceFile));
      return;
    }
    if (ts.isJsxExpression(node)) {
      inspectJsxTree(node);
      return;
    }
    if (ts.isSpreadAssignment(node)) {
      inspectPolicyProperty(node);
      return;
    }
    const value = staticExpressionProjection(node);
    if (value !== undefined) {
      add(node, value);
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return entries;
}

function structuredEntries(relativePath, source) {
  if (relativePath.endsWith('.json')) {
    try {
      JSON.parse(source);
      const entries = collectJsonEntries(source);
      // The runtime renders approved metadata from records; source is workbook provenance.
      return relativePath.replaceAll(path.sep, '/') === 'src/faq/generated-en-metadata.json'
        ? entries.filter((entry) => entry.path?.[0] === 'records')
        : entries;
    } catch (error) {
      return [{ error: error.message, line: 1 }];
    }
  }
  return collectTypeScriptEntries(relativePath, source);
}

function inspectMarkdown(relativePath, source) {
  const findings = [];
  const normalized = source.replace(/\r\n?/g, '\n');
  const body = publishableBody(source);
  const lines = body.split('\n');
  const bodyStartLine = normalized.slice(0, normalized.indexOf(body)).split('\n').length;
  let inSources = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const lineNumber = bodyStartLine + index;
    const heading = line.match(/^#{1,6}\s+/);
    if (SOURCE_SECTION.test(line)) {
      inSources = true;
      continue;
    }
    if (heading) inSources = false;
    if (hasEditorialLabel(line) || EDITORIAL_PREAMBLE.test(line.trim())) {
      findings.push(
        finding('D-01 editorial-metadata', 'markdown-body', relativePath, lineNumber, line.trim())
      );
    }
    for (const citation of labelledCitationValues(line)) {
      if (validPublicCitationValue(citation)) continue;
      findings.push(
        finding('D-07 citation-policy', 'markdown-body', relativePath, lineNumber, citation)
      );
    }
    if (inSources && line.trim() && !validPublicCitation(line)) {
      findings.push(
        finding('D-07 citation-policy', 'markdown-body', relativePath, lineNumber, line.trim())
      );
    }
  }
  return findings;
}

function inspectStructuredCopy(relativePath, source) {
  const findings = [];
  for (const { error, key, value, line, valueLine } of structuredEntries(relativePath, source)) {
    if (error) {
      findings.push(
        finding(
          'D-07 citation-policy',
          'structured-copy',
          relativePath,
          line,
          `Unable to parse structured source: ${error}`
        )
      );
      continue;
    }
    if (typeof value === 'string') {
      const plainValue = normalizedCitationText(value);
      if (hasEditorialLabel(plainValue) || EDITORIAL_PREAMBLE.test(plainValue)) {
        findings.push(
          finding(
            'D-01 editorial-metadata',
            'structured-copy',
            relativePath,
            valueLine || line,
            value
          )
        );
      }
      for (const citation of labelledCitationValues(value)) {
        if (validPublicCitationValue(citation)) continue;
        findings.push(
          finding(
            'D-07 citation-policy',
            'structured-copy',
            relativePath,
            valueLine || line,
            citation
          )
        );
      }
    }
    if (key && EDITORIAL_KEY.test(key)) {
      findings.push(finding('D-01 editorial-metadata', 'structured-copy', relativePath, line, key));
    }
    if (key && isCitationKey(key) && !validPublicCitationValue(value)) {
      findings.push(finding('D-07 citation-policy', 'structured-copy', relativePath, line, key));
    }
  }
  return findings;
}

function inspectRoot(root) {
  const markdownFiles = publishedMarkdownFiles(root);
  const structuredFiles = publishedStructuredCopyFiles(root);
  const files = [...markdownFiles, ...structuredFiles].sort((left, right) =>
    left.localeCompare(right)
  );
  const findings = markdownFiles
    .flatMap((relativePath) =>
      inspectMarkdown(relativePath, fs.readFileSync(path.join(root, relativePath), 'utf8'))
    )
    .concat(
      structuredFiles.flatMap((relativePath) =>
        inspectStructuredCopy(relativePath, fs.readFileSync(path.join(root, relativePath), 'utf8'))
      )
    );
  findings.sort((left, right) =>
    [left.path, left.line, left.rule]
      .join('\0')
      .localeCompare([right.path, right.line, right.rule].join('\0'))
  );
  return { files, findings };
}

function formatFinding(entry) {
  return `${entry.rule} | ${entry.surface} | locale=${entry.locale} | path=${entry.path} | source=${entry.source} | line=${entry.line} | ${entry.detail}`;
}

function htmlLine(content, index) {
  return content.slice(0, index).split('\n').length;
}

function htmlIdentity(relativePath, variant) {
  const file = relativePath.replaceAll(path.sep, '/');
  const route =
    file === 'index.html'
      ? '/'
      : file.endsWith('/index.html')
      ? `/${file.slice(0, -'/index.html'.length)}`
      : `/${file.slice(0, -'.html'.length)}`;
  const segments = route.split('/').filter(Boolean);
  const localePrefix = ['en', 'zh', 'ja', 'ar', 'vi', 'th', 'id', 'ms', 'zh-hant'].includes(
    segments[0]
  )
    ? segments.shift()
    : undefined;
  const locale = localePrefix || getDefaultLocale(variant);
  const surfaceSegment = segments[0];
  const surface =
    surfaceSegment === 'guide'
      ? 'guide'
      : surfaceSegment === 'faq'
      ? 'faq'
      : surfaceSegment === 'compare'
      ? 'comparison'
      : surfaceSegment === 'price'
      ? 'pricing'
      : ['tech', 'technical-center'].includes(surfaceSegment)
      ? 'technical'
      : route === '/'
      ? 'home'
      : 'page';
  return { file, route, surface, locale, slug: segments.at(-1) || 'home' };
}

function htmlFinding(rule, projection, identity, content, rawIndex, detail) {
  return {
    rule,
    projection,
    ...identity,
    line: htmlLine(content, rawIndex),
    detail
  };
}

function formatHtmlFinding(entry) {
  return `${entry.rule} | ${entry.projection} | locale=${entry.locale} | route=${entry.route} | surface=${entry.surface} | slug=${entry.slug} | file=${entry.file} | line=${entry.line} | ${entry.detail}`;
}

function splitHtmlProjections(html) {
  const payloads = [];
  const visible = html.replace(
    /<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    (block, tagName, offset) => {
      if (['script', 'template'].includes(tagName.toLowerCase())) {
        const openingEnd = htmlTagEnd(block, 0);
        const closingStart = block.toLowerCase().lastIndexOf(`</${tagName.toLowerCase()}`);
        payloads.push({
          content: block.slice(openingEnd + 1, closingStart),
          offset: offset + openingEnd + 1
        });
      }
      return block.replace(/[^\n]/g, ' ');
    }
  );
  return { visible, payloads };
}

function htmlText(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizedNumericReference(codePoint) {
  const normalized = HTML_C1_REPLACEMENTS.get(codePoint) ?? codePoint;
  if (normalized <= 0 || normalized > 0x10ffff || (normalized >= 0xd800 && normalized <= 0xdfff))
    return '\ufffd';
  return String.fromCodePoint(normalized);
}

function htmlReferenceAt(value, start) {
  if (value[start] !== '&') return undefined;
  const numeric = /^&#(?:x([0-9a-f]+)|([0-9]+));?/i.exec(value.slice(start));
  if (numeric) {
    const codePoint = Number.parseInt(numeric[1] ?? numeric[2], numeric[1] ? 16 : 10);
    return { length: numeric[0].length, value: normalizedNumericReference(codePoint) };
  }
  const name = /^[a-z][a-z0-9]*/i.exec(value.slice(start + 1))?.[0];
  if (!name) return undefined;
  const semicolon = value[start + name.length + 1] === ';';
  if (semicolon && HTML_POLICY_NAMED_REFERENCES.has(name)) {
    return { length: name.length + 2, value: HTML_POLICY_NAMED_REFERENCES.get(name) };
  }
  if (!semicolon) {
    for (let length = name.length; length > 0; length -= 1) {
      const candidate = name.slice(0, length);
      if (HTML_LEGACY_NAMED_REFERENCES.has(candidate)) {
        return { length: candidate.length + 1, value: HTML_POLICY_NAMED_REFERENCES.get(candidate) };
      }
    }
  }
  return undefined;
}

function decodeHtml(value) {
  let output = '';
  for (let index = 0; index < value.length; index += 1) {
    const reference = htmlReferenceAt(value, index);
    if (reference) {
      output += reference.value;
      index += reference.length - 1;
    } else output += value[index];
  }
  return output;
}

function policyEntityText(value) {
  return [...value]
    .map((character) => {
      if (character === '\u00ad' || /[\p{Dash_Punctuation}\u2212]/u.test(character)) return '-';
      return /[\p{White_Space}\p{Cf}]/u.test(character) ? ' ' : character;
    })
    .join('');
}

function appendProjectedHtml(projection, value, rawStart, linear) {
  if (!value) return;
  const projectedStart = projection.length;
  const projectedEnd = projectedStart + value.length;
  const previous = projection.runs.at(-1);
  const adjacent =
    previous &&
    previous.projectedEnd === projectedStart &&
    previous.linear === linear &&
    (linear
      ? previous.rawStart + (previous.projectedEnd - previous.projectedStart) === rawStart
      : previous.rawStart === rawStart);
  if (adjacent) previous.projectedEnd = projectedEnd;
  else {
    if (projection.runs.length >= MAX_HTML_PROJECTION_RUNS) {
      throw new Error(`HTML projection exceeds ${MAX_HTML_PROJECTION_RUNS} offset runs`);
    }
    projection.runs.push({ projectedStart, projectedEnd, rawStart, linear });
  }
  projection.chunks.push(value);
  projection.length = projectedEnd;
}

function appendDecodedHtml(projection, value, offset, normalizePolicyEntity = false) {
  let cursor = 0;
  for (let index = 0; index < value.length; index += 1) {
    const reference = htmlReferenceAt(value, index);
    if (!reference) continue;
    appendProjectedHtml(projection, value.slice(cursor, index), offset + cursor, true);
    appendProjectedHtml(
      projection,
      normalizePolicyEntity ? policyEntityText(reference.value) : reference.value,
      offset + index,
      false
    );
    index += reference.length - 1;
    cursor = index + 1;
  }
  appendProjectedHtml(projection, value.slice(cursor), offset + cursor, true);
}

function appendSyntheticHtml(projection, value, offset) {
  appendProjectedHtml(projection, value, offset, false);
}

function htmlTagEnd(html, start) {
  let quote;
  for (let index = start + 1; index < html.length; index += 1) {
    const character = html[index];
    if (quote) {
      if (character === quote) quote = undefined;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === '>') {
      return index;
    }
  }
  return html.length - 1;
}

function htmlHref(tag, tagOffset) {
  const match = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(tag);
  if (!match) return undefined;
  const value = match[1] ?? match[2] ?? match[3];
  return {
    value,
    offset: tagOffset + match.index + match[0].lastIndexOf(value)
  };
}

function projectVisibleHtml(visible, normalizePolicyEntities = false) {
  const projection = { chunks: [], length: 0, runs: [] };
  const anchors = [];
  let cursor = 0;
  while (cursor < visible.length) {
    const tagStart = visible.indexOf('<', cursor);
    if (tagStart < 0) {
      appendDecodedHtml(projection, visible.slice(cursor), cursor, normalizePolicyEntities);
      break;
    }
    appendDecodedHtml(projection, visible.slice(cursor, tagStart), cursor, normalizePolicyEntities);
    if (visible.startsWith('<!--', tagStart)) {
      const commentEnd = visible.indexOf('-->', tagStart + 4);
      cursor = commentEnd < 0 ? visible.length : commentEnd + 3;
      continue;
    }
    const tagEnd = htmlTagEnd(visible, tagStart);
    const tag = visible.slice(tagStart, tagEnd + 1);
    const match = /^<\s*(\/)?\s*([a-z][\w:-]*)\b/i.exec(tag);
    if (!match) {
      appendDecodedHtml(projection, tag, tagStart, normalizePolicyEntities);
      cursor = tagEnd + 1;
      continue;
    }
    const closing = Boolean(match[1]);
    const name = match[2].toLowerCase();
    if (name === 'a') {
      if (closing) {
        const anchor = anchors.pop();
        if (anchor?.href) {
          appendSyntheticHtml(projection, '](', tagStart);
          appendDecodedHtml(
            projection,
            anchor.href.value,
            anchor.href.offset,
            normalizePolicyEntities
          );
          appendSyntheticHtml(projection, ')', tagStart);
        }
      } else {
        const href = htmlHref(tag, tagStart);
        anchors.push({ href });
        if (href) appendSyntheticHtml(projection, '[', tagStart);
      }
    }
    if (/^h[1-6]$/.test(name)) {
      appendSyntheticHtml(projection, closing ? '\n' : '\n## ', tagStart);
    } else if (BLOCK_TAGS.has(name)) {
      appendSyntheticHtml(projection, '\n', tagStart);
    }
    cursor = tagEnd + 1;
  }
  return { text: projection.chunks.join(''), runs: projection.runs };
}

function projectedRawOffset(projection, index) {
  let left = 0;
  let right = projection.runs.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const run = projection.runs[middle];
    if (index < run.projectedStart) right = middle - 1;
    else if (index >= run.projectedEnd) left = middle + 1;
    else return run.linear ? run.rawStart + index - run.projectedStart : run.rawStart;
  }
  return 0;
}

function projectionOffsetResolver(source) {
  let runCursor = 0;
  return (index) => {
    while (source.runs[runCursor]?.projectedEnd <= index) runCursor += 1;
    const run = source.runs[runCursor];
    if (!run || index < run.projectedStart) return 0;
    return run.linear ? run.rawStart + index - run.projectedStart : run.rawStart;
  };
}

function projectionRangeAppender(source) {
  let runCursor = 0;
  return (target, start, end) => {
    while (source.runs[runCursor]?.projectedEnd <= start) runCursor += 1;
    for (let index = runCursor; index < source.runs.length; index += 1) {
      const run = source.runs[index];
      if (run.projectedStart >= end) break;
      const rangeStart = Math.max(start, run.projectedStart);
      const rangeEnd = Math.min(end, run.projectedEnd);
      if (rangeStart >= rangeEnd) continue;
      appendProjectedHtml(
        target,
        source.text.slice(rangeStart, rangeEnd),
        run.linear ? run.rawStart + rangeStart - run.projectedStart : run.rawStart,
        run.linear
      );
      if (run.projectedEnd <= end) runCursor = index + 1;
      else {
        runCursor = index;
        break;
      }
    }
  };
}

function normalizePolicyProjection(source) {
  const projection = { chunks: [], length: 0, runs: [] };
  const separator = /[\p{White_Space}\p{Cf}]+|[\p{Dash_Punctuation}\u00ad\u2212]/gu;
  const appendRange = projectionRangeAppender(source);
  const rawOffsetAt = projectionOffsetResolver(source);
  let cursor = 0;
  for (const match of source.text.matchAll(separator)) {
    appendRange(projection, cursor, match.index);
    appendSyntheticHtml(
      projection,
      /[\p{Dash_Punctuation}\u00ad\u2212]/u.test(match[0]) ? '-' : ' ',
      rawOffsetAt(match.index)
    );
    cursor = match.index + match[0].length;
  }
  appendRange(projection, cursor, source.text.length);
  return { text: projection.chunks.join(''), runs: projection.runs };
}

function projectText(value, offset = 0) {
  const projection = { chunks: [], length: 0, runs: [] };
  appendDecodedHtml(projection, value, offset);
  return { text: projection.chunks.join(''), runs: projection.runs };
}

function policyTextProjection(value) {
  const projection = /<[a-z][^>]*>/i.test(value) ? projectVisibleHtml(value) : projectText(value);
  return normalizePolicyProjection(projection).text;
}

function stripPayloadKeyQuotes(source) {
  const projection = { chunks: [], length: 0, runs: [] };
  const appendRange = projectionRangeAppender(source);
  let cursor = 0;
  for (const match of source.text.matchAll(/["'](?=\s*:)/g)) {
    appendRange(projection, cursor, match.index);
    cursor = match.index + 1;
  }
  appendRange(projection, cursor, source.text.length);
  return { text: projection.chunks.join(''), runs: projection.runs };
}

function serializedEscapeAt(value, start) {
  const marker = value[start + 1];
  const simple = { b: '\b', f: '\f', n: '\n', r: '\r', t: '\t', v: '\v' };
  if (simple[marker]) return { length: 2, value: simple[marker] };
  if (marker === '0' && !/[0-9]/.test(value[start + 2] ?? '')) return { length: 2, value: '\0' };
  if (marker === 'x' && /^[0-9a-f]{2}$/i.test(value.slice(start + 2, start + 4))) {
    return {
      length: 4,
      value: normalizedNumericReference(Number.parseInt(value.slice(start + 2, start + 4), 16))
    };
  }
  if (marker !== 'u') return undefined;
  if (value[start + 2] === '{') {
    const closingBrace = value.indexOf('}', start + 3);
    const codePoint = value.slice(start + 3, closingBrace);
    if (closingBrace > start + 3 && /^[0-9a-f]+$/i.test(codePoint)) {
      return {
        length: closingBrace - start + 1,
        value: normalizedNumericReference(Number.parseInt(codePoint, 16))
      };
    }
    return undefined;
  }
  const codeUnit = value.slice(start + 2, start + 6);
  if (!/^[0-9a-f]{4}$/i.test(codeUnit)) return undefined;
  const high = Number.parseInt(codeUnit, 16);
  const lowEscape = value.slice(start + 6, start + 12);
  if (
    high >= 0xd800 &&
    high <= 0xdbff &&
    /^\\u[0-9a-fA-F]{4}$/.test(lowEscape) &&
    Number.parseInt(lowEscape.slice(2), 16) >= 0xdc00 &&
    Number.parseInt(lowEscape.slice(2), 16) <= 0xdfff
  ) {
    const low = Number.parseInt(lowEscape.slice(2), 16);
    return {
      length: 12,
      value: normalizedNumericReference(0x10000 + (high - 0xd800) * 0x400 + (low - 0xdc00))
    };
  }
  return { length: 6, value: normalizedNumericReference(high) };
}

function decodeSerializedEscapes(source) {
  const projection = { chunks: [], length: 0, runs: [] };
  const appendRange = projectionRangeAppender(source);
  const rawOffsetAt = projectionOffsetResolver(source);
  let cursor = 0;
  for (let index = 0; index < source.text.length; index += 1) {
    if (source.text[index] !== '\\') continue;
    let slashEnd = index;
    while (source.text[slashEnd] === '\\') slashEnd += 1;
    if ((slashEnd - index) % 2 === 0) {
      index = slashEnd - 1;
      continue;
    }
    const escapeStart = slashEnd - 1;
    const escape = serializedEscapeAt(source.text, escapeStart);
    if (!escape) {
      index = slashEnd - 1;
      continue;
    }
    appendRange(projection, cursor, escapeStart);
    appendSyntheticHtml(projection, escape.value, rawOffsetAt(escapeStart));
    cursor = escapeStart + escape.length;
    index = cursor - 1;
  }
  appendRange(projection, cursor, source.text.length);
  return { text: projection.chunks.join(''), runs: projection.runs };
}

function projectPayloadHtml(content, offset) {
  const projection = projectText(content, offset);
  return normalizePolicyProjection(decodeSerializedEscapes(stripPayloadKeyQuotes(projection)));
}

function visibleCitationProjection(visible) {
  return projectVisibleHtml(visible).text;
}

function visibleCitationBlocks(projection) {
  const citations = [];
  let inSources = false;
  let lineStart = 0;
  for (const line of projection.text.split('\n')) {
    const heading = line.match(/^#{1,6}\s+/);
    if (SOURCE_SECTION.test(line)) {
      inSources = true;
      lineStart += line.length + 1;
      continue;
    }
    if (heading) inSources = false;
    if (inSources && line.trim()) {
      citations.push({ index: lineStart + line.search(/\S/), value: line });
    }
    for (const entry of labelledCitationEntries(line)) {
      citations.push({ index: lineStart + entry.index, value: entry.value });
    }
    lineStart += line.length + 1;
  }
  return citations;
}

function inspectHtmlArtifact(relativePath, html, variant) {
  const identity = htmlIdentity(relativePath, variant);
  const { visible, payloads } = splitHtmlProjections(html);
  const findings = [];
  const visibleProjection = projectVisibleHtml(visible);
  const visiblePolicyProjection = normalizePolicyProjection(visibleProjection);
  const citationProjection = projectVisibleHtml(visible, true);
  for (const match of visiblePolicyProjection.text.matchAll(
    new RegExp(EDITORIAL_MATCHER.source, 'giu')
  )) {
    findings.push(
      htmlFinding(
        'D-01 editorial-metadata',
        'visible',
        identity,
        html,
        projectedRawOffset(visiblePolicyProjection, match.index),
        match[0].trim()
      )
    );
  }
  let lineStart = 0;
  for (const line of visibleProjection.text.split('\n')) {
    const preamble = EDITORIAL_PREAMBLE.exec(line.trim());
    if (!preamble) {
      lineStart += line.length + 1;
      continue;
    }
    const index = lineStart + line.indexOf(preamble[0]);
    const token = preamble[0].trim();
    findings.push(
      htmlFinding(
        'D-01 editorial-metadata',
        'visible',
        identity,
        html,
        projectedRawOffset(visibleProjection, index),
        token
      )
    );
    lineStart += line.length + 1;
  }
  for (const citation of visibleCitationBlocks(citationProjection)) {
    if (!validPublicCitation(citation.value)) {
      findings.push(
        htmlFinding(
          'D-07 citation-policy',
          'visible',
          identity,
          html,
          projectedRawOffset(citationProjection, citation.index),
          'Sources and References require public HTTPS anchors'
        )
      );
    }
  }
  for (const payload of payloads) {
    const payloadProjection = projectPayloadHtml(payload.content, payload.offset);
    for (const match of payloadProjection.text.matchAll(
      new RegExp(EDITORIAL_MATCHER.source, 'giu')
    )) {
      findings.push(
        htmlFinding(
          'D-01 editorial-metadata',
          'payload',
          identity,
          html,
          projectedRawOffset(payloadProjection, match.index),
          match[0]
        )
      );
    }
    const attributePattern = new RegExp(
      `\\b(?:title|data-[\\w-]+)\\s*=\\s*["']?((?:${EDITORIAL_LABEL_NAME}))\\b`,
      'iu'
    );
    for (const match of payloadProjection.text.matchAll(
      new RegExp(attributePattern.source, 'giu')
    )) {
      const valueIndex = match.index + match[0].lastIndexOf(match[1]);
      findings.push(
        htmlFinding(
          'D-01 editorial-metadata',
          'payload',
          identity,
          html,
          projectedRawOffset(payloadProjection, valueIndex),
          match[1]
        )
      );
    }
  }
  return findings;
}

function htmlFiles(root) {
  return walkFiles(root, '.', (name) => name.endsWith('.html'))
    .map((file) => file.replace(/^\.\//, ''))
    .sort((left, right) => left.localeCompare(right));
}

function inspectHtmlRoot(root, variant) {
  if (!fs.existsSync(root)) throw new Error(`HTML root does not exist: ${root}`);
  if (!fs.statSync(root).isDirectory()) throw new Error(`HTML root is not a directory: ${root}`);
  const files = htmlFiles(root);
  if (!files.length) throw new Error(`HTML root contains zero .html files: ${root}`);
  const findings = files.flatMap((file) =>
    inspectHtmlArtifact(file, fs.readFileSync(path.join(root, file), 'utf8'), variant)
  );
  findings.sort((left, right) =>
    [left.file, left.line, left.projection, left.rule]
      .join('\0')
      .localeCompare([right.file, right.line, right.projection, right.rule].join('\0'))
  );
  return { files, findings };
}

function validateLiveBaseUrl(value, allowHttpForTests, label, productionOrigin) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} must be an absolute URL`);
  }
  const loopback =
    url.hostname === '127.0.0.1' || url.hostname === '::1' || url.hostname === 'localhost';
  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`${label} must be an origin URL`);
  }
  if (allowHttpForTests) {
    if (!loopback || url.protocol !== 'http:')
      throw new Error(`${label} test URLs must use HTTP loopback origins`);
    return url.href.replace(/\/$/, '');
  }
  if (url.href.replace(/\/$/, '') !== productionOrigin) {
    throw new Error(`${label} must be exactly ${productionOrigin}`);
  }
  return url.href.replace(/\/$/, '');
}

function sameOrigin(url, baseUrl) {
  return new URL(url).origin === new URL(baseUrl).origin;
}

function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
}

function canonicalSitemapUrl(value) {
  const url = new URL(value);
  url.hash = '';
  return url.href;
}

function sitemapKey(url) {
  return canonicalSitemapUrl(url);
}

async function fetchTextWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { redirect: 'manual', signal: controller.signal });
    const contentLength = Number(response.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_RESPONSE_BYTES) {
      throw new Error(`response exceeds ${MAX_RESPONSE_BYTES} bytes`);
    }
    const reader = response.body?.getReader();
    if (!reader) return { response, content: '' };
    const chunks = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error(`response exceeds ${MAX_RESPONSE_BYTES} bytes`);
      }
      chunks.push(value);
    }
    return { response, content: new TextDecoder().decode(Buffer.concat(chunks)) };
  } finally {
    clearTimeout(timeout);
  }
}

async function runBounded(items, concurrency, worker) {
  const results = [];
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (cursor < items.length) {
        const item = items[cursor++];
        results.push(await worker(item));
      }
    })
  );
  return results;
}

function liveViolation(rule, host, url, detail) {
  return { rule, host, path: new URL(url).pathname, url, detail };
}

function errorDetail(error) {
  if (error instanceof Error && error.message) return error.message.slice(0, 500);
  return typeof error?.name === 'string' ? error.name : 'Unknown error';
}

async function discoverInventory(options, baseUrls) {
  const sitemapDocuments = new Map();
  const pages = new Set();
  const violations = [];
  const queue = [];
  const inventoryByHost = new Map(
    baseUrls.map((baseUrl) => [
      new URL(baseUrl).host,
      {
        host: new URL(baseUrl).host,
        sitemapDocuments: new Set(),
        pages: new Set()
      }
    ])
  );
  for (const baseUrl of baseUrls) {
    const url = canonicalSitemapUrl(new URL('/sitemap.xml', baseUrl).href);
    const key = sitemapKey(url);
    if (sitemapDocuments.has(key)) continue;
    const item = { url, baseUrl, depth: 0 };
    sitemapDocuments.set(key, item);
    queue.push(item);
  }
  let cursor = 0;
  while (cursor < queue.length) {
    const item = queue[cursor++];
    const host = new URL(item.baseUrl).host;
    const hostInventory = inventoryByHost.get(host);
    let response;
    try {
      response = await fetchTextWithTimeout(item.url, options.timeoutMs);
    } catch (error) {
      violations.push(
        liveViolation(
          'D-08 sitemap-fetch',
          new URL(item.baseUrl).host,
          item.url,
          errorDetail(error)
        )
      );
      continue;
    }
    if (
      response.response.status !== 200 ||
      response.response.url !== item.url ||
      !sameOrigin(response.response.url, item.baseUrl)
    ) {
      violations.push(
        liveViolation(
          'D-08 sitemap-fetch',
          new URL(item.baseUrl).host,
          item.url,
          `status=${response.response.status}`
        )
      );
      continue;
    }
    hostInventory.sitemapDocuments.add(sitemapKey(item.url));
    const contentType = response.response.headers.get('content-type') || '';
    const xml = response.content;
    if (
      !/(?:application|text)\/(?:xml|[a-z0-9.+-]+\+xml)/i.test(contentType) ||
      !/<(?:[a-z0-9-]+:)?(?:urlset|sitemapindex)\b/i.test(xml)
    ) {
      violations.push(
        liveViolation(
          'D-08 sitemap-format',
          new URL(item.baseUrl).host,
          item.url,
          contentType || 'missing XML content type'
        )
      );
      continue;
    }
    const isIndex = /<sitemapindex\b/i.test(xml);
    for (const location of sitemapLocs(xml)) {
      let discovered;
      try {
        discovered = canonicalSitemapUrl(new URL(location).href);
      } catch {
        violations.push(
          liveViolation(
            'D-08 sitemap-inventory',
            new URL(item.baseUrl).host,
            item.url,
            `invalid location ${location}`
          )
        );
        continue;
      }
      if (!sameOrigin(discovered, item.baseUrl)) {
        violations.push(
          liveViolation(
            'D-08 sitemap-inventory',
            new URL(item.baseUrl).host,
            item.url,
            `foreign location ${discovered}`
          )
        );
        continue;
      }
      if (isIndex) {
        if (item.depth + 1 > options.maxSitemapDepth) {
          violations.push(
            liveViolation(
              'D-08 sitemap-depth',
              new URL(item.baseUrl).host,
              discovered,
              `max-depth=${options.maxSitemapDepth}`
            )
          );
          continue;
        }
        const childKey = sitemapKey(discovered);
        if (!sitemapDocuments.has(childKey)) {
          if (sitemapDocuments.size + pages.size >= options.maxUrls) {
            violations.push(
              liveViolation(
                'D-08 sitemap-budget',
                new URL(item.baseUrl).host,
                discovered,
                `max-urls=${options.maxUrls}`
              )
            );
            continue;
          }
          const child = { url: discovered, baseUrl: item.baseUrl, depth: item.depth + 1 };
          sitemapDocuments.set(childKey, child);
          queue.push(child);
        }
      } else if (!pages.has(discovered)) {
        if (sitemapDocuments.size + pages.size >= options.maxUrls) {
          violations.push(
            liveViolation(
              'D-08 sitemap-budget',
              new URL(item.baseUrl).host,
              discovered,
              `max-urls=${options.maxUrls}`
            )
          );
          continue;
        }
        pages.add(discovered);
        hostInventory.pages.add(discovered);
      }
    }
  }
  for (const baseUrl of baseUrls) {
    const host = new URL(baseUrl).host;
    if (!inventoryByHost.get(host).pages.size) {
      violations.push(
        liveViolation('D-08 sitemap-inventory', host, baseUrl, 'no page URLs discovered')
      );
    }
  }
  return {
    sitemapDocuments,
    pages,
    violations,
    inventory: [...inventoryByHost.values()]
      .map((entry) => ({
        host: entry.host,
        sitemapDocuments: entry.sitemapDocuments.size,
        pages: entry.pages.size,
        boundedInventory: entry.sitemapDocuments.size + entry.pages.size
      }))
      .sort((left, right) => left.host.localeCompare(right.host))
  };
}

async function inspectLivePage(url, options, baseUrls) {
  const baseUrl = baseUrls.find((candidate) => sameOrigin(url, candidate));
  const host = new URL(baseUrl).host;
  try {
    const { response, content } = await fetchTextWithTimeout(url, options.timeoutMs);
    const digest = crypto.createHash('sha256').update(content).digest('hex');
    const violations = [];
    if (response.status !== 200 || response.url !== url || !sameOrigin(response.url, baseUrl)) {
      violations.push(
        liveViolation(
          'D-08 page-fetch',
          host,
          url,
          `status=${response.status} final=${response.url}`
        )
      );
    }
    if (!/text\/html/i.test(response.headers.get('content-type') || '')) {
      violations.push(
        liveViolation(
          'D-08 page-content-type',
          host,
          url,
          response.headers.get('content-type') || 'missing'
        )
      );
    }
    const identity = htmlIdentity(
      new URL(url).pathname.replace(/^\//, '') || 'index.html',
      'preview'
    );
    const hygiene = inspectHtmlArtifact(identity.file, content, 'preview').map((entry) => ({
      rule: entry.rule,
      host,
      path: new URL(url).pathname,
      url,
      detail: `${entry.projection}: ${entry.detail}`
    }));
    return {
      host,
      path: new URL(url).pathname,
      url,
      status: response.status,
      contentSha256: digest,
      violations: [...violations, ...hygiene]
    };
  } catch (error) {
    return {
      host,
      path: new URL(url).pathname,
      url,
      status: 0,
      contentSha256: null,
      violations: [liveViolation('D-08 page-fetch', host, url, errorDetail(error))]
    };
  }
}

function writeLiveReport(reportPath, report) {
  const ordered = {
    status: report.status,
    totals: report.totals,
    inventory: report.inventory,
    pages: report.pages,
    violations: report.violations
  };
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(ordered, null, 2)}\n`);
  const receipt = [
    `status=${report.status}`,
    `sitemapDocuments=${report.totals.sitemapDocuments}`,
    `pages=${report.totals.pages}`,
    `checkedPages=${report.totals.checkedPages}`,
    `boundedInventory=${report.totals.boundedInventory}`,
    `violations=${report.violations.length}`,
    ...report.inventory.map(
      (entry) =>
        `inventory host=${entry.host} sitemapDocuments=${entry.sitemapDocuments} pages=${entry.pages} boundedInventory=${entry.boundedInventory}`
    ),
    ...report.pages.map(
      (page) =>
        `${page.host} ${page.path} status=${page.status} sha256=${page.contentSha256 || 'none'}`
    ),
    ...report.violations.map(
      (violation) => `${violation.rule} ${violation.host}${violation.path} ${violation.detail}`
    )
  ];
  fs.writeFileSync(`${reportPath}.txt`, `${receipt.join('\n')}\n`);
}

async function inspectLive(options) {
  const baseUrls = [options.baseUrlCn, options.baseUrlIo];
  const inventory = await discoverInventory(options, baseUrls);
  const budgetExceeded = inventory.violations.some(
    (violation) => violation.rule === 'D-08 sitemap-budget'
  );
  const pages = budgetExceeded
    ? []
    : await runBounded([...inventory.pages].sort(), options.concurrency, (url) =>
        inspectLivePage(url, options, baseUrls)
      );
  pages.sort((left, right) => left.url.localeCompare(right.url));
  const violations = [...inventory.violations, ...pages.flatMap((page) => page.violations)].sort(
    (left, right) =>
      [left.url, left.rule, left.detail]
        .join('\0')
        .localeCompare([right.url, right.rule, right.detail].join('\0'))
  );
  const report = {
    status: violations.length ? 'failed' : 'passed',
    totals: {
      sitemapDocuments: inventory.sitemapDocuments.size,
      pages: inventory.pages.size,
      checkedPages: pages.length,
      boundedInventory: inventory.sitemapDocuments.size + inventory.pages.size
    },
    inventory: inventory.inventory,
    pages,
    violations
  };
  writeLiveReport(options.report, report);
  return report;
}

async function main(argv = process.argv.slice(2)) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    usage(error.message);
    process.exitCode = 1;
    return;
  }
  if (options.mode === 'live') {
    const report = await inspectLive(options);
    if (report.status === 'failed') {
      for (const violation of report.violations)
        process.stderr.write(
          `${violation.rule} | ${violation.host}${violation.path} | ${violation.detail}\n`
        );
      process.exitCode = 1;
      return;
    }
    console.log(`Content hygiene passed: ${report.totals.pages} live pages`);
    return;
  }
  let result;
  try {
    result =
      options.mode === 'html'
        ? inspectHtmlRoot(options.root, options.variant)
        : inspectRoot(options.root);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
    return;
  }
  const { files, findings } = result;
  if (findings.length) {
    for (const entry of findings)
      process.stderr.write(
        `${options.mode === 'html' ? formatHtmlFinding(entry) : formatFinding(entry)}\n`
      );
    process.exitCode = 1;
    return;
  }
  console.log(
    `Content hygiene passed: ${files.length} ${options.mode === 'html' ? 'HTML' : 'source'} file${
      files.length === 1 ? '' : 's'
    }`
  );
}

if (require.main === module) main();
