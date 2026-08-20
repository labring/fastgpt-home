#!/usr/bin/env node

/**
 * Validate publishable source Markdown without inspecting delivery metadata.
 * The check is intentionally local: source validation must not depend on network access.
 */

const fs = require('node:fs');
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
const COMMONMARK_TYPE_6_HTML_BLOCK_TAGS = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'search',
  'section',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];
const HTML_BLOCK_TAGS = new Set([
  ...COMMONMARK_TYPE_6_HTML_BLOCK_TAGS,
  'pre',
  'script',
  'style',
  'textarea'
]);
const MARKDOWN_TYPE_6_HTML_BLOCK = new RegExp(
  `^</?(?:${COMMONMARK_TYPE_6_HTML_BLOCK_TAGS.join('|')})\\b`,
  'i'
);
const BLOCK_BOUNDARY = '\uE000';
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
}

function parseArgs(argv) {
  const options = {
    mode: undefined,
    root: REPOSITORY_ROOT,
    rootProvided: false,
    variant: undefined
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--mode') {
      const mode = argv[++index];
      if (!mode || mode.startsWith('--')) throw new Error('--mode requires source or html');
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
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  if (!['source', 'html'].includes(options.mode))
    throw new Error('--mode source or html is required');
  if (options.mode === 'source') return options;
  if (options.mode === 'html') {
    if (!options.rootProvided) throw new Error('--mode html requires --root');
    const variant = options.variant || resolveSiteVariant(process.env);
    if (!['io', 'cn', 'preview'].includes(variant))
      throw new Error('--variant must be io, cn, or preview');
    options.variant = variant;
    return options;
  }
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

function markdownCitationEntries(value) {
  const pattern = new RegExp(CITATION_LABEL_TEXT.source, 'giu');
  const matches = [...value.matchAll(pattern)];
  return matches.map((match, index) => ({
    index: match.index,
    labelEnd: match.index + match[0].length,
    value: value.slice(match.index + match[0].length, matches[index + 1]?.index).trim()
  }));
}

function atxHeading(line, baseColumn = 0) {
  const indentation = markdownIndentation(line, 0, baseColumn);
  if (indentation.column - baseColumn > 3) return undefined;
  const opening = /^(#{1,6})(?:[\t ]+|$)/.exec(line.slice(indentation.offset));
  if (!opening) return undefined;
  const contentStart = indentation.offset + opening[0].length;
  let text = line.slice(contentStart);
  const closing = /[\t ]+#+[\t ]*$/.exec(text);
  if (closing) text = text.slice(0, closing.index);
  return {
    text: text.replace(/[\t ]+$/, ''),
    offset: contentStart,
    level: opening[1].length
  };
}

function isEscapedMarkdownPunctuation(value, index) {
  let slashes = 0;
  while (value[index - slashes - 1] === '\\') slashes += 1;
  return slashes % 2 === 1;
}

function previousUnicodeCharacter(value, index) {
  if (index <= 0) return undefined;
  const last = value.charCodeAt(index - 1);
  const start =
    last >= 0xdc00 &&
    last <= 0xdfff &&
    index > 1 &&
    value.charCodeAt(index - 2) >= 0xd800 &&
    value.charCodeAt(index - 2) <= 0xdbff
      ? index - 2
      : index - 1;
  return value.slice(start, index);
}

function nextUnicodeCharacter(value, index) {
  if (index >= value.length) return undefined;
  return String.fromCodePoint(value.codePointAt(index));
}

function isMarkdownWhitespace(character) {
  return (
    character === undefined || character === BLOCK_BOUNDARY || /\p{White_Space}/u.test(character)
  );
}

function isAsciiPunctuation(character) {
  return Boolean(character && /[!-/:-@[-`{-~]/.test(character));
}

function isMarkdownPunctuation(character) {
  return isAsciiPunctuation(character) || Boolean(character && /\p{P}/u.test(character));
}

function markdownCodeSpans(value, hidden) {
  const runs = [];
  for (let index = 0; index < value.length; ) {
    if (value[index] !== '`') {
      index += 1;
      continue;
    }
    if (isEscapedMarkdownPunctuation(value, index)) {
      index += 1;
      continue;
    }
    let end = index + 1;
    while (value[end] === '`') end += 1;
    runs.push({ start: index, length: end - index });
    index = end;
  }

  const nextSameLength = new Array(runs.length);
  const nextByLength = new Map();
  for (let index = runs.length - 1; index >= 0; index -= 1) {
    nextSameLength[index] = nextByLength.get(runs[index].length);
    nextByLength.set(runs[index].length, index);
  }

  const spans = [];
  for (let index = 0; index < runs.length; ) {
    const closingIndex = nextSameLength[index];
    if (closingIndex === undefined) {
      index += 1;
      continue;
    }
    const opening = runs[index];
    const closing = runs[closingIndex];
    const contentStart = opening.start + opening.length;
    const contentEnd = closing.start;
    hidden.fill(1, opening.start, contentStart);
    hidden.fill(1, closing.start, closing.start + closing.length);
    const normalizedContent = value.slice(contentStart, contentEnd).replaceAll('\n', ' ');
    if (
      normalizedContent.startsWith(' ') &&
      normalizedContent.endsWith(' ') &&
      /[^ ]/.test(normalizedContent)
    ) {
      hidden[contentStart] = 1;
      hidden[contentEnd - 1] = 1;
    }
    spans.push({
      fullStart: opening.start,
      contentStart,
      contentEnd,
      fullEnd: closing.start + closing.length
    });
    index = closingIndex + 1;
  }
  return spans;
}

function markdownDelimiterRuns(value, codeSpans) {
  const delimiters = [];
  let spanIndex = 0;
  for (let index = 0; index < value.length; ) {
    while (codeSpans[spanIndex]?.fullEnd <= index) spanIndex += 1;
    if (
      codeSpans[spanIndex] &&
      index >= codeSpans[spanIndex].fullStart &&
      index < codeSpans[spanIndex].fullEnd
    ) {
      index = codeSpans[spanIndex].fullEnd;
      continue;
    }
    const marker = value[index];
    if (!'*_'.includes(marker) || isEscapedMarkdownPunctuation(value, index)) {
      index += 1;
      continue;
    }
    let end = index + 1;
    while (value[end] === marker) end += 1;
    const before = previousUnicodeCharacter(value, index);
    const after = nextUnicodeCharacter(value, end);
    const leftFlanking =
      !isMarkdownWhitespace(after) &&
      (!isMarkdownPunctuation(after) ||
        isMarkdownWhitespace(before) ||
        isMarkdownPunctuation(before));
    const rightFlanking =
      !isMarkdownWhitespace(before) &&
      (!isMarkdownPunctuation(before) ||
        isMarkdownWhitespace(after) ||
        isMarkdownPunctuation(after));
    const canOpen =
      marker === '*'
        ? leftFlanking
        : leftFlanking && (!rightFlanking || isMarkdownPunctuation(before));
    const canClose =
      marker === '*'
        ? rightFlanking
        : rightFlanking && (!leftFlanking || isMarkdownPunctuation(after));
    const delimiterIndex = delimiters.length;
    delimiters.push({
      marker,
      start: index,
      length: end - index,
      canOpen,
      canClose,
      previous: delimiterIndex - 1,
      next: delimiterIndex + 1,
      active: true
    });
    index = end;
  }
  if (delimiters.length) delimiters.at(-1).next = -1;
  return delimiters;
}

function violatesRuleOfThree(opener, closer) {
  if (!closer.canOpen && !opener.canClose) return false;
  return (
    (opener.length + closer.length) % 3 === 0 &&
    (opener.length % 3 !== 0 || closer.length % 3 !== 0)
  );
}

function unlinkMarkdownDelimiter(delimiters, index) {
  const delimiter = delimiters[index];
  if (!delimiter.active) return;
  if (delimiter.previous >= 0) delimiters[delimiter.previous].next = delimiter.next;
  if (delimiter.next >= 0) delimiters[delimiter.next].previous = delimiter.previous;
  delimiter.active = false;
}

function consumeMarkdownEmphasis(value, hidden, codeSpans) {
  const delimiters = markdownDelimiterRuns(value, codeSpans);
  const openersBottom = new Map();
  let current = delimiters.length ? 0 : -1;
  while (current >= 0) {
    const closer = delimiters[current];
    if (!closer.active) {
      current = closer.next;
      continue;
    }
    if (closer.canClose) {
      const bottomKey = `${closer.marker}:${closer.canOpen ? 1 : 0}:${closer.length % 3}`;
      const bottom = openersBottom.get(bottomKey) ?? -1;
      let openerIndex = closer.previous;
      while (openerIndex > bottom) {
        const opener = delimiters[openerIndex];
        if (
          opener.marker === closer.marker &&
          opener.canOpen &&
          !violatesRuleOfThree(opener, closer)
        ) {
          break;
        }
        openerIndex = opener.previous;
      }
      if (openerIndex > bottom) {
        const opener = delimiters[openerIndex];
        const used = opener.length >= 2 && closer.length >= 2 ? 2 : 1;
        hidden.fill(1, opener.start + opener.length - used, opener.start + opener.length);
        hidden.fill(1, closer.start, closer.start + used);
        opener.length -= used;
        closer.start += used;
        closer.length -= used;

        for (let between = opener.next; between >= 0 && between !== current; ) {
          const next = delimiters[between].next;
          unlinkMarkdownDelimiter(delimiters, between);
          between = next;
        }
        if (opener.length === 0) unlinkMarkdownDelimiter(delimiters, openerIndex);
        if (closer.length === 0) {
          const next = closer.next;
          unlinkMarkdownDelimiter(delimiters, current);
          current = next;
        }
        continue;
      }
      openersBottom.set(bottomKey, closer.previous);
      if (!closer.canOpen) {
        const next = closer.next;
        unlinkMarkdownDelimiter(delimiters, current);
        current = next;
        continue;
      }
    }
    current = closer.next;
  }
}

function markdownHtmlBlockStart(line, baseColumn = 0) {
  const indentation = markdownIndentation(line, 0, baseColumn);
  if (indentation.column - baseColumn > 3) return undefined;
  const value = line.slice(indentation.offset);
  const typeOne = /^<(pre|script|style|textarea)(?:[\t >]|$)/i.exec(value);
  if (typeOne) {
    return {
      endPattern: new RegExp(`</${typeOne[1]}\\s*>`, 'i'),
      sourceComment: false
    };
  }
  if (value.startsWith('<!--')) return { endPattern: /-->/, sourceComment: true };
  if (value.startsWith('<?')) return { endPattern: /\?>/, sourceComment: false };
  if (value.startsWith('<![CDATA[')) return { endPattern: /\]\]>/, sourceComment: false };
  if (/^<![A-Z]/.test(value)) return { endPattern: />/, sourceComment: false };
  return MARKDOWN_TYPE_6_HTML_BLOCK.test(value)
    ? { blankTerminated: true, sourceComment: false }
    : undefined;
}

function markdownSourceCommentBlocks(block) {
  const comments = [];
  let cursor = 0;
  while (cursor < block.text.length) {
    const opening = block.text.indexOf('<!--', cursor);
    if (opening < 0) break;
    const closing = block.text.indexOf('-->', opening + 4);
    const contentStart = opening + 4;
    const contentEnd = closing < 0 ? block.text.length : closing;
    comments.push({
      text: block.text.slice(contentStart, contentEnd),
      offsets: block.offsets.slice(contentStart, contentEnd),
      html: false,
      sourceComment: false,
      policyComment: true,
      container: block.container,
      ancestors: block.ancestors
    });
    if (closing < 0) break;
    cursor = closing + 3;
  }
  return comments;
}

function markdownIndentation(value, startOffset = 0, startColumn = 0, targetColumn = Infinity) {
  let offset = startOffset;
  let column = startColumn;
  while (offset < value.length && column < targetColumn) {
    if (value[offset] === ' ') {
      column += 1;
    } else if (value[offset] === '\t') {
      column += 4 - (column % 4);
    } else {
      break;
    }
    offset += 1;
  }
  return { column, offset, characters: offset - startOffset };
}

function markdownLogicalBlocks(lines, lineStarts) {
  const blocks = [];
  let listItem = 0;
  let quoteGroup = 0;
  const rootContext = {
    container: 'root',
    ancestors: [],
    quoteDepth: 0
  };
  const childContext = (parent, container, extra = {}) => ({
    ...parent,
    container,
    ancestors: [...parent.ancestors, parent.container],
    ...extra
  });
  const appendBlock = (records, context, options = {}) => {
    let text = '';
    const offsets = [];
    for (const { text: value, offset, separatorOffset } of records) {
      if (text) {
        text += '\n';
        offsets.push(separatorOffset ?? offset - 1);
      }
      text += value;
      for (let index = 0; index < value.length; index += 1) offsets.push(offset + index);
    }
    blocks.push({
      text,
      offsets,
      html: false,
      sourceComment: false,
      container: context.container,
      ancestors: context.ancestors,
      ...options
    });
  };
  const sliceRecord = (record, contentOffset, contentColumn) => ({
    ...record,
    text: record.text.slice(contentOffset),
    offset: record.offset + contentOffset,
    baseColumn: contentColumn
  });
  const listMarker = (record) => {
    const baseColumn = record.baseColumn ?? 0;
    const indentation = markdownIndentation(record.text, 0, baseColumn);
    if (indentation.column - baseColumn > 3) return undefined;
    const marker = /^(?:[-*+]|\d{1,9}[.)])/.exec(record.text.slice(indentation.offset));
    if (!marker) return undefined;
    const markerEndOffset = indentation.offset + marker[0].length;
    const markerEndColumn = indentation.column + marker[0].length;
    if (markerEndOffset === record.text.length) {
      return {
        contentColumn: markerEndColumn + 1,
        contentOffset: markerEndOffset
      };
    }
    const content = markdownIndentation(record.text, markerEndOffset, markerEndColumn);
    if (!content.characters) return undefined;
    return {
      contentColumn: content.column,
      contentOffset: content.offset
    };
  };
  const quoteMarker = (record) => {
    const baseColumn = record.baseColumn ?? 0;
    const indentation = markdownIndentation(record.text, 0, baseColumn);
    if (indentation.column - baseColumn > 3 || record.text[indentation.offset] !== '>') {
      return undefined;
    }
    const markerEndOffset = indentation.offset + 1;
    const markerEndColumn = indentation.column + 1;
    const content = markdownIndentation(
      record.text,
      markerEndOffset,
      markerEndColumn,
      markerEndColumn + 1
    );
    return {
      contentColumn: content.column,
      contentOffset: content.offset
    };
  };
  const startsBlock = (record) =>
    Boolean(
      atxHeading(record.text, record.baseColumn ?? 0) ||
        listMarker(record) ||
        quoteMarker(record) ||
        markdownHtmlBlockStart(record.text, record.baseColumn ?? 0)
    );
  const consumeHtmlBlock = (records, start) => {
    const htmlStart = markdownHtmlBlockStart(records[start].text, records[start].baseColumn ?? 0);
    const content = [];
    let index = start;
    if (htmlStart.blankTerminated) {
      do {
        content.push(records[index]);
        index += 1;
      } while (index < records.length && records[index].text.trim());
    } else {
      while (index < records.length) {
        const record = records[index];
        content.push(record);
        index += 1;
        if (htmlStart.endPattern.test(record.text)) break;
      }
    }
    return { content, htmlStart, next: index };
  };
  const deepestChildRecord = (record) => {
    let child = record;
    while (child.text.trim()) {
      const quote = quoteMarker(child);
      if (quote) {
        child = sliceRecord(child, quote.contentOffset, quote.contentColumn);
        continue;
      }
      const list = listMarker(child);
      if (list) {
        child = sliceRecord(child, list.contentOffset, list.contentColumn);
        continue;
      }
      break;
    }
    return child;
  };
  const observeChildBlock = (tracker, record) => {
    const child = deepestChildRecord(record);
    const value = child.text;
    if (tracker.html) {
      if (tracker.html.blankTerminated && !value.trim()) {
        tracker.html = undefined;
        tracker.type = 'blank';
        return;
      }
      tracker.type = 'html';
      if (!tracker.html.blankTerminated && tracker.html.endPattern.test(value)) {
        tracker.html = undefined;
      }
      return;
    }
    if (!value.trim()) {
      tracker.type = 'blank';
      return;
    }
    const html = markdownHtmlBlockStart(value, child.baseColumn ?? 0);
    if (html) {
      tracker.type = 'html';
      if (html.blankTerminated || !html.endPattern.test(value)) tracker.html = html;
      return;
    }
    if (atxHeading(value, child.baseColumn ?? 0)) {
      tracker.type = 'heading';
      return;
    }
    tracker.type = 'paragraph';
  };

  const parseBlocks = (records, context) => {
    for (let index = 0; index < records.length; ) {
      const record = records[index];
      if (!record.text.trim()) {
        index += 1;
        continue;
      }

      const heading = atxHeading(record.text, record.baseColumn ?? 0);
      if (heading) {
        appendBlock(
          [
            {
              ...record,
              text: heading.text,
              offset: record.offset + heading.offset
            }
          ],
          context,
          { headingLevel: heading.level }
        );
        index += 1;
        continue;
      }

      const quote = quoteMarker(record);
      if (quote) {
        const group = ++quoteGroup;
        const depth = context.quoteDepth + 1;
        const quoteContext = childContext(context, `${context.container}:quote:${group}:${depth}`, {
          quoteDepth: depth
        });
        const quoted = [];
        const child = { type: 'blank', html: undefined };
        let cursor = index;
        while (cursor < records.length) {
          const current = records[cursor];
          const marker = quoteMarker(current);
          if (marker) {
            const stripped = {
              ...sliceRecord(current, marker.contentOffset, marker.contentColumn),
              quoteContainerBoundary: true
            };
            quoted.push(stripped);
            observeChildBlock(child, stripped);
            cursor += 1;
            continue;
          }
          if (
            current.text.trim() &&
            quoted.length &&
            child.type === 'paragraph' &&
            !current.quoteContainerBoundary &&
            !startsBlock(current)
          ) {
            quoted.push(current);
            observeChildBlock(child, current);
            cursor += 1;
            continue;
          }
          break;
        }
        parseBlocks(quoted, quoteContext);
        index = cursor;
        continue;
      }

      const list = listMarker(record);
      if (list) {
        const itemContext = childContext(context, `${context.container}:list:${++listItem}`);
        const itemRecords = [sliceRecord(record, list.contentOffset, list.contentColumn)];
        const child = { type: 'blank', html: undefined };
        observeChildBlock(child, itemRecords[0]);
        let cursor = index + 1;
        while (cursor < records.length) {
          const current = records[cursor];
          if (!current.text.trim()) {
            let next = cursor + 1;
            while (next < records.length && !records[next].text.trim()) next += 1;
            if (next >= records.length) break;
            const nextRecord = records[next];
            const indentation = markdownIndentation(nextRecord.text, 0, nextRecord.baseColumn ?? 0);
            if (indentation.column < list.contentColumn) break;
            while (cursor < next) {
              const blank = { ...records[cursor], text: '' };
              itemRecords.push(blank);
              observeChildBlock(child, blank);
              cursor += 1;
            }
            continue;
          }
          const indentation = markdownIndentation(current.text, 0, current.baseColumn ?? 0);
          if (indentation.column >= list.contentColumn) {
            const content = markdownIndentation(
              current.text,
              0,
              current.baseColumn ?? 0,
              list.contentColumn
            );
            const stripped = sliceRecord(current, content.offset, content.column);
            itemRecords.push(stripped);
            observeChildBlock(child, stripped);
            cursor += 1;
            continue;
          }
          if (child.type === 'paragraph' && !startsBlock(current)) {
            itemRecords.push(current);
            observeChildBlock(child, current);
            cursor += 1;
            continue;
          }
          break;
        }
        parseBlocks(itemRecords, itemContext);
        index = cursor;
        continue;
      }

      const htmlStart = markdownHtmlBlockStart(record.text, record.baseColumn ?? 0);
      if (htmlStart) {
        const htmlBlock = consumeHtmlBlock(records, index);
        appendBlock(htmlBlock.content, context, {
          html: true,
          sourceComment: htmlBlock.htmlStart.sourceComment
        });
        index = htmlBlock.next;
        continue;
      }

      const paragraph = [record];
      index += 1;
      while (index < records.length && records[index].text.trim() && !startsBlock(records[index])) {
        paragraph.push(records[index]);
        index += 1;
      }
      appendBlock(paragraph, context);
    }
  };

  parseBlocks(
    lines.map((text, index) => ({
      text,
      offset: lineStarts[index],
      separatorOffset: lineStarts[index] - 1,
      baseColumn: 0
    })),
    rootContext
  );
  return blocks;
}

function normalizedMarkdownBlock(block) {
  if (block.sourceComment) return { text: '', offsets: [] };
  if (block.html) {
    const projection = normalizePolicyProjection(projectVisibleHtml(block.text), true);
    return {
      text: projection.text,
      offsets: Array.from(
        { length: projection.text.length },
        (_, index) => block.offsets[projectedRawOffset(projection, index)]
      )
    };
  }
  const hidden = new Uint8Array(block.text.length);
  const codeSpans = markdownCodeSpans(block.text, hidden);
  consumeMarkdownEmphasis(block.text, hidden, codeSpans);
  let text = '';
  const offsets = [];
  const append = (value, offset) => {
    for (const character of value) {
      const whitespace = /[\p{White_Space}\p{Cf}]/u.test(character);
      const dash = /[\p{Dash_Punctuation}\u2212]/u.test(character);
      if (!whitespace && !dash) {
        text += character;
        for (let index = 0; index < character.length; index += 1) offsets.push(offset + index);
      } else if (text.at(-1) !== (dash ? '-' : ' ')) {
        text += dash ? '-' : ' ';
        offsets.push(offset);
      }
    }
  };
  let codeSpanIndex = 0;
  for (let index = 0; index < block.text.length; index += 1) {
    if (hidden[index]) continue;
    while (codeSpans[codeSpanIndex]?.contentEnd <= index) codeSpanIndex += 1;
    if (
      codeSpans[codeSpanIndex] &&
      index >= codeSpans[codeSpanIndex].contentStart &&
      index < codeSpans[codeSpanIndex].contentEnd
    ) {
      append(block.text[index], block.offsets[index]);
      continue;
    }
    if (
      block.text[index] === '\\' &&
      !isEscapedMarkdownPunctuation(block.text, index) &&
      isAsciiPunctuation(block.text[index + 1])
    ) {
      continue;
    }
    if (block.text[index] === '<') {
      const tagEnd = block.text.indexOf('>', index + 1);
      if (tagEnd >= 0) {
        if (/^<br\b/i.test(block.text.slice(index, tagEnd + 1))) append(' ', block.offsets[index]);
        index = tagEnd;
        continue;
      }
    }
    if ('*_`'.includes(block.text[index])) {
      append(block.text[index], block.offsets[index]);
      continue;
    }
    const reference = htmlReferenceAt(block.text, index);
    if (reference) {
      append(reference.value, block.offsets[index]);
      index += reference.length - 1;
      continue;
    }
    const character = block.text[index];
    append(character, block.offsets[index]);
  }
  return { text, offsets };
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

function isCitationSectionHeading(value) {
  return CITATION_KEY.test(value.trim().replace(/[:：][\t ]*$/, ''));
}

function inspectMarkdown(relativePath, source) {
  const findings = [];
  const normalized = source.replace(/\r\n?/g, '\n');
  const body = publishableBody(source);
  const lines = body.split('\n');
  const bodyStartLine = normalized.slice(0, normalized.indexOf(body)).split('\n').length;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const lineNumber = bodyStartLine + index;
    if (EDITORIAL_PREAMBLE.test(line.trim())) {
      findings.push(
        finding('D-01 editorial-metadata', 'markdown-body', relativePath, lineNumber, line.trim())
      );
    }
  }

  const lineStarts = [];
  for (let offset = 0, index = 0; index < lines.length; index += 1) {
    lineStarts.push(offset);
    offset += lines[index].length + 1;
  }
  const lineAtOffset = (offset) => {
    let left = 0;
    let right = lineStarts.length - 1;
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      if (lineStarts[middle] <= offset) left = middle + 1;
      else right = middle - 1;
    }
    return bodyStartLine + right;
  };
  const sourceLineAtOffset = (offset) => {
    const start = body.lastIndexOf('\n', Math.max(0, offset - 1)) + 1;
    const end = body.indexOf('\n', offset);
    return body.slice(start, end < 0 ? body.length : end).trim();
  };
  const seenCitationRanges = new Set();
  const seenEditorialRanges = new Set();
  const sourceSectionStates = new Map();
  const sourceSectionStateFor = (block) => {
    const chain = [...block.ancestors, block.container];
    for (let index = chain.length - 1; index >= 0; index -= 1) {
      const state = sourceSectionStates.get(chain[index]);
      if (state) return state;
    }
    return { kind: 'reset' };
  };
  const blocks = markdownLogicalBlocks(lines, lineStarts).flatMap((block) => [
    block,
    ...markdownSourceCommentBlocks(block)
  ]);
  for (const block of blocks) {
    const blockProjection = normalizedMarkdownBlock(block);
    for (let segmentStart = 0; segmentStart <= blockProjection.text.length; ) {
      const boundary = blockProjection.text.indexOf(BLOCK_BOUNDARY, segmentStart);
      const segmentEnd = boundary < 0 ? blockProjection.text.length : boundary;
      const projection = {
        text: blockProjection.text.slice(segmentStart, segmentEnd),
        offsets: blockProjection.offsets.slice(segmentStart, segmentEnd)
      };
      const htmlHeading = block.policyComment
        ? undefined
        : /^(#{1,6})[\t ]+(.*?)[\t ]*$/.exec(projection.text);
      const headingLevel = block.policyComment
        ? undefined
        : block.headingLevel ?? htmlHeading?.[1].length;
      const headingText = block.headingLevel ? projection.text : htmlHeading?.[2];
      const citationHeading =
        headingLevel !== undefined && isCitationSectionHeading(headingText || '');
      if (headingLevel !== undefined) {
        const activeState = sourceSectionStateFor(block);
        if (citationHeading) {
          sourceSectionStates.set(block.container, { kind: 'sources', level: headingLevel });
        } else if (!(headingText || '').trim()) {
          if (activeState.kind !== 'sources' || headingLevel <= activeState.level) {
            sourceSectionStates.set(block.container, { kind: 'reset' });
          }
        } else if (activeState.kind !== 'sources' || headingLevel <= activeState.level) {
          sourceSectionStates.set(block.container, { kind: 'other', level: headingLevel });
        }
      }
      if (
        headingLevel === undefined &&
        sourceSectionStateFor(block).kind === 'sources' &&
        projection.text.trim()
      ) {
        const firstVisible = projection.text.search(/\S/);
        const start = projection.offsets[firstVisible];
        const end = projection.offsets.at(-1) ?? start;
        const range = `${start}:${end}`;
        if (!seenCitationRanges.has(range) && !validPublicCitationValue(projection.text)) {
          seenCitationRanges.add(range);
          findings.push(
            finding(
              'D-07 citation-policy',
              'markdown-body',
              relativePath,
              lineAtOffset(start),
              sourceLineAtOffset(start)
            )
          );
        }
      }
      for (const match of projection.text.matchAll(new RegExp(EDITORIAL_MATCHER.source, 'giu'))) {
        const start = projection.offsets[match.index];
        const end = projection.offsets[match.index + match[0].length - 1];
        const range = `${start}:${end}`;
        if (seenEditorialRanges.has(range)) continue;
        seenEditorialRanges.add(range);
        findings.push(
          finding(
            'D-01 editorial-metadata',
            'markdown-body',
            relativePath,
            lineAtOffset(start),
            sourceLineAtOffset(start)
          )
        );
      }
      for (const citation of markdownCitationEntries(projection.text)) {
        if (citationHeading) continue;
        const start = projection.offsets[citation.index];
        const end = projection.offsets[citation.labelEnd - 1] ?? start;
        const range = `${start}:${end}`;
        if (seenCitationRanges.has(range) || validPublicCitationValue(citation.value)) continue;
        seenCitationRanges.add(range);
        findings.push(
          finding(
            'D-07 citation-policy',
            'markdown-body',
            relativePath,
            lineAtOffset(start),
            sourceLineAtOffset(start)
          )
        );
      }
      if (boundary < 0) break;
      segmentStart = boundary + 1;
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

function appendProjectedHtml(projection, value, rawStart, linear, boundary = false) {
  if (!value) return;
  const projectedStart = projection.length;
  const projectedEnd = projectedStart + value.length;
  const previous = projection.runs.at(-1);
  const adjacent =
    previous &&
    previous.projectedEnd === projectedStart &&
    previous.linear === linear &&
    previous.boundary === boundary &&
    (linear
      ? previous.rawStart + (previous.projectedEnd - previous.projectedStart) === rawStart
      : previous.rawStart === rawStart);
  if (adjacent) previous.projectedEnd = projectedEnd;
  else {
    if (projection.runs.length >= MAX_HTML_PROJECTION_RUNS) {
      throw new Error(`HTML projection exceeds ${MAX_HTML_PROJECTION_RUNS} offset runs`);
    }
    projection.runs.push({ projectedStart, projectedEnd, rawStart, linear, boundary });
  }
  projection.chunks.push(value);
  projection.length = projectedEnd;
}

function appendDecodedHtml(projection, value, offset) {
  let cursor = 0;
  for (let index = 0; index < value.length; index += 1) {
    const reference = htmlReferenceAt(value, index);
    if (!reference) continue;
    appendProjectedHtml(projection, value.slice(cursor, index), offset + cursor, true);
    appendProjectedHtml(projection, reference.value, offset + index, false);
    index += reference.length - 1;
    cursor = index + 1;
  }
  appendProjectedHtml(projection, value.slice(cursor), offset + cursor, true);
}

function appendSyntheticHtml(projection, value, offset) {
  appendProjectedHtml(projection, value, offset, false);
}

function appendBlockBoundary(projection, offset) {
  const previous = projection.runs.at(-1);
  if (previous?.boundary && previous.projectedEnd === projection.length) return;
  appendProjectedHtml(projection, '\n', offset, false, true);
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

function projectVisibleHtml(visible) {
  const projection = { chunks: [], length: 0, runs: [] };
  const anchors = [];
  let cursor = 0;
  while (cursor < visible.length) {
    const tagStart = visible.indexOf('<', cursor);
    if (tagStart < 0) {
      appendDecodedHtml(projection, visible.slice(cursor), cursor);
      break;
    }
    appendDecodedHtml(projection, visible.slice(cursor, tagStart), cursor);
    if (visible.startsWith('<!--', tagStart)) {
      const commentEnd = visible.indexOf('-->', tagStart + 4);
      cursor = commentEnd < 0 ? visible.length : commentEnd + 3;
      continue;
    }
    const tagEnd = htmlTagEnd(visible, tagStart);
    const tag = visible.slice(tagStart, tagEnd + 1);
    const match = /^<\s*(\/)?\s*([a-z][\w:-]*)\b/i.exec(tag);
    if (!match) {
      appendDecodedHtml(projection, tag, tagStart);
      cursor = tagEnd + 1;
      continue;
    }
    const closing = Boolean(match[1]);
    const name = match[2].toLowerCase();
    if (name === 'br' && !closing) {
      appendSyntheticHtml(projection, ' ', tagStart);
    } else if (name === 'a') {
      if (closing) {
        const anchor = anchors.pop();
        if (anchor?.href) {
          appendSyntheticHtml(projection, '](', tagStart);
          appendDecodedHtml(projection, anchor.href.value, anchor.href.offset);
          appendSyntheticHtml(projection, ')', tagStart);
        }
      } else {
        const href = htmlHref(tag, tagStart);
        anchors.push({ href });
        if (href) appendSyntheticHtml(projection, '[', tagStart);
      }
    }
    if (/^h[1-6]$/.test(name)) {
      appendBlockBoundary(projection, tagStart);
      if (!closing) appendSyntheticHtml(projection, '## ', tagStart);
    } else if (HTML_BLOCK_TAGS.has(name)) {
      appendBlockBoundary(projection, tagStart);
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

function projectionRunResolver(source) {
  let runCursor = 0;
  return (index) => {
    while (source.runs[runCursor]?.projectedEnd <= index) runCursor += 1;
    const run = source.runs[runCursor];
    return run && index >= run.projectedStart ? run : undefined;
  };
}

function projectionOffsetResolver(source) {
  const runAt = projectionRunResolver(source);
  return (index) => {
    const run = runAt(index);
    if (!run) return 0;
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
        run.linear,
        run.boundary
      );
      if (run.projectedEnd <= end) runCursor = index + 1;
      else {
        runCursor = index;
        break;
      }
    }
  };
}

function normalizePolicyProjection(source, preserveBlockBoundaries = false) {
  const projection = { chunks: [], length: 0, runs: [] };
  const appendRange = projectionRangeAppender(source);
  const rawOffsetAt = projectionOffsetResolver(source);
  const sourceRunAt = projectionRunResolver(source);
  const boundaryRunAt = projectionRunResolver(source);
  const isBoundary = (index) => Boolean(boundaryRunAt(index)?.boundary);
  let cursor = 0;
  for (let index = 0; index < source.text.length; index += 1) {
    if (preserveBlockBoundaries && isBoundary(index)) {
      appendRange(projection, cursor, index);
      appendProjectedHtml(projection, BLOCK_BOUNDARY, rawOffsetAt(index), false, true);
      cursor = index + 1;
      continue;
    }
    const character = source.text[index];
    const whitespace = /[\p{White_Space}\p{Cf}]/u.test(character);
    const dash = /[\p{Dash_Punctuation}\u2212]/u.test(character);
    if (!whitespace && !dash) continue;
    let end = index + 1;
    if (whitespace) {
      while (
        end < source.text.length &&
        !(preserveBlockBoundaries && isBoundary(end)) &&
        /[\p{White_Space}\p{Cf}]/u.test(source.text[end])
      ) {
        end += 1;
      }
    }
    appendRange(projection, cursor, index);
    const rawOffset = rawOffsetAt(index);
    const sourceRun = sourceRunAt(index);
    const linear =
      end === index + 1 &&
      sourceRun?.linear === true &&
      !sourceRun.boundary &&
      sourceRun.rawStart + index - sourceRun.projectedStart === rawOffset;
    appendProjectedHtml(projection, dash ? '-' : ' ', rawOffset, linear);
    cursor = end;
    index = end - 1;
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

function visibleCitationBlocks(projection) {
  const citations = [];
  let inSources = false;
  let lineStart = 0;
  for (const line of projection.text.replaceAll(BLOCK_BOUNDARY, '\n').split('\n')) {
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
  const visiblePolicyProjection = normalizePolicyProjection(visibleProjection, true);
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
  for (const citation of visibleCitationBlocks(visiblePolicyProjection)) {
    if (!validPublicCitation(citation.value)) {
      findings.push(
        htmlFinding(
          'D-07 citation-policy',
          'visible',
          identity,
          html,
          projectedRawOffset(visiblePolicyProjection, citation.index),
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

async function main(argv = process.argv.slice(2)) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    usage(error.message);
    process.exitCode = 1;
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
