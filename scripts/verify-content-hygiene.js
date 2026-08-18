#!/usr/bin/env node

/**
 * Validate publishable source Markdown without inspecting delivery metadata.
 * The check is intentionally local: source validation must not depend on network access.
 */

const fs = require('node:fs');
const net = require('node:net');
const path = require('node:path');

const REPOSITORY_ROOT = path.resolve(__dirname, '..');
const MARKDOWN_ROOTS = ['src/content', 'content/competitors'];
const STRUCTURED_COPY_ROOTS = ['src/faq', 'src/locales'];
const SOURCE_SECTION = /^(#{1,6})\s*(sources?|references|来源|参考资料|资料来源)\s*[:：]?\s*$/i;
const EDITORIAL_LABEL = /^(?:>\s*)?(?:[-*]\s+)?(?:\*\*)?(?:事实来源|需求依据|核验日|核验日期|验证日期|排期|签发|修订记录|更新记录|版本(?:信息)?|版本与套餐|版本与档位|计划(?:安排)?|附录|补充说明|审核(?:状态)?|交付(?:排期)?|来源依据|客户\s*KB|内部\s*KB|internal\s+KB|client\s+KB|fact\s+source|source\s+of\s+facts|source\s+material|verification\s+date|verified\s+on|delivery\s+schedule|sign[- ]off|revision\s+log|review\s+status|version(?:s)?\s+and\s+(?:plans|tiers)|version\s+and\s+(?:package|tiers)|version\s+plan|update\s+(?:record|log)(?:\s+addendum)?|revision|addendum)(?:\*\*)?\s*[:：]/i;
const EDITORIAL_PREAMBLE = /(?:文中产品能力与版本边界来自客户官方公开资料，核验日|(?:All )?product capabilities and version boundaries(?: referenced in this guide| in this article| are)? .*verified (?:as of |on )?\*?\*?(?:\d{4}-\d{2}-\d{2}|[A-Z][a-z]+ \d{1,2}, \d{4}))/i;

function usage(message) {
  if (message) process.stderr.write(`${message}\n`);
  process.stderr.write('Usage: verify-content-hygiene --mode source [--root <repository-root>]\n');
}

function parseArgs(argv) {
  const options = { mode: undefined, root: REPOSITORY_ROOT };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--mode') {
      const mode = argv[++index];
      if (!mode || mode.startsWith('--')) throw new Error('--mode requires source');
      options.mode = mode;
    } else if (token === '--root') {
      const root = argv[++index];
      if (!root || root.startsWith('--')) throw new Error('--root requires a repository root');
      options.root = path.resolve(root);
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  if (options.mode !== 'source') throw new Error('--mode source is required');
  return options;
}

function walkFiles(root, relativeRoot, matcher) {
  const directory = path.join(root, relativeRoot);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
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
  return MARKDOWN_ROOTS.flatMap((relativeRoot) => walkFiles(root, relativeRoot, (name) => name.endsWith('.md')))
    .sort((left, right) => left.localeCompare(right));
}

function publishedStructuredCopyFiles(root) {
  return STRUCTURED_COPY_ROOTS.flatMap((relativeRoot) =>
    walkFiles(root, relativeRoot, (name) => /\.(?:json|[cm]?[jt]sx?)$/.test(name)),
  ).sort((left, right) => left.localeCompare(right));
}

function publishableBody(source) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const leadingComment = normalized.match(/^<!--[\s\S]*?-->/);
  return leadingComment ? normalized.slice(leadingComment[0].length) : normalized;
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
  const value = address.split('.').reduce((result, part) => (result << 8n) | BigInt(Number(part)), 0n);
  const baseValue = base.split('.').reduce((result, part) => (result << 8n) | BigInt(Number(part)), 0n);
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
  const parts = [...leftParts, ...Array(8 - leftParts.length - rightParts.length).fill('0'), ...rightParts];
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
  const value = hostname.toLowerCase().replace(/^\[|\]$/g, '');
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
  const entry = value.trim().replace(/^(?:>\s*)?(?:[-*+]\s+)?/, '');
  const linkPattern = /\[[^\]\n]+\]\(([^()\s]+)\)/g;
  let previousEnd = 0;
  let count = 0;
  for (const match of entry.matchAll(linkPattern)) {
    if (!/^[\s,;，；、·|/]*$/.test(entry.slice(previousEnd, match.index))) return false;
    try {
      const url = new URL(match[1]);
      if (url.protocol !== 'https:' || url.username || url.password || isPrivateHostname(url.hostname)) {
        return false;
      }
    } catch {
      return false;
    }
    previousEnd = match.index + match[0].length;
    count += 1;
  }
  return count > 0 && /^[\s,;，；、·|/]*$/.test(entry.slice(previousEnd));
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
    if (EDITORIAL_LABEL.test(line) || EDITORIAL_PREAMBLE.test(line.trim())) {
      findings.push(finding('D-01 editorial-metadata', 'markdown-body', relativePath, lineNumber, line.trim()));
    }
    if (inSources && line.trim() && !validPublicCitation(line)) {
      findings.push(finding('D-07 citation-policy', 'markdown-body', relativePath, lineNumber, line.trim()));
    }
  }
  return findings;
}

function inspectStructuredCopy(relativePath, source) {
  const normalized = source.replace(/\r\n?/g, '\n');
  return normalized.split('\n').flatMap((line, index) => {
    const quotedValue = line.match(/[:=]\s*["'`]([^"'`]+)["'`]/)?.[1];
    if (!quotedValue || (!EDITORIAL_LABEL.test(quotedValue) && !EDITORIAL_PREAMBLE.test(quotedValue))) {
      return [];
    }
    return [finding('D-01 editorial-metadata', 'structured-copy', relativePath, index + 1, quotedValue)];
  });
}

function inspectRoot(root) {
  const markdownFiles = publishedMarkdownFiles(root);
  const structuredFiles = publishedStructuredCopyFiles(root);
  const files = [...markdownFiles, ...structuredFiles].sort((left, right) => left.localeCompare(right));
  const findings = markdownFiles.flatMap((relativePath) =>
    inspectMarkdown(relativePath, fs.readFileSync(path.join(root, relativePath), 'utf8')),
  ).concat(structuredFiles.flatMap((relativePath) =>
    inspectStructuredCopy(relativePath, fs.readFileSync(path.join(root, relativePath), 'utf8')),
  ));
  findings.sort((left, right) =>
    [left.path, left.line, left.rule].join('\0').localeCompare([right.path, right.line, right.rule].join('\0')),
  );
  return { files, findings };
}

function formatFinding(entry) {
  return `${entry.rule} | ${entry.surface} | locale=${entry.locale} | path=${entry.path} | source=${entry.source} | line=${entry.line} | ${entry.detail}`;
}

function main(argv = process.argv.slice(2)) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    usage(error.message);
    process.exitCode = 1;
    return;
  }
  const { files, findings } = inspectRoot(options.root);
  if (findings.length) {
    for (const entry of findings) process.stderr.write(`${formatFinding(entry)}\n`);
    process.exitCode = 1;
    return;
  }
  console.log(`Content hygiene passed: ${files.length} source file${files.length === 1 ? '' : 's'}`);
}

if (require.main === module) main();

module.exports = { inspectRoot, main, parseArgs, publishableBody };
