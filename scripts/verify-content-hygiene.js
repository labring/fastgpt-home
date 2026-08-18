#!/usr/bin/env node

/**
 * Validate publishable source Markdown without inspecting delivery metadata.
 * The check is intentionally local: source validation must not depend on network access.
 */

const fs = require('node:fs');
const path = require('node:path');

const REPOSITORY_ROOT = path.resolve(__dirname, '..');
const MARKDOWN_ROOTS = ['src/content', 'content/competitors'];
const SOURCE_SECTION = /^(#{1,6})\s*(sources?|references|来源|参考资料|资料来源)\s*[:：]?\s*$/i;
const EDITORIAL_LABEL = /^(?:>\s*)?(?:\*\*)?(?:事实来源|需求依据|核验日|核验日期|验证日期|排期|签发|修订记录|更新记录|版本(?:信息)?|版本与套餐|计划(?:安排)?|附录|补充说明|审核(?:状态)?|交付(?:排期)?|来源依据|客户\s*KB|内部\s*KB|internal\s+KB|client\s+KB|fact\s+source|source\s+of\s+facts|source\s+material|verification\s+date|delivery\s+schedule|sign[- ]off|revision\s+log|review\s+status|version(?:s)?\s+and\s+plans|version\s+plan|update\s+record(?:\s+addendum)?|addendum)(?:\*\*)?\s*[:：]/i;
const EDITORIAL_PREAMBLE = /^(?:文中产品能力与版本边界来自客户官方公开资料，核验日|All product capabilities and version boundaries referenced in this guide are sourced from official public customer materials, verified as of)/i;

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

function walkMarkdown(root, relativeRoot) {
  const directory = path.join(root, relativeRoot);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const relativePath = path.join(relativeRoot, entry.name);
      return entry.isDirectory()
        ? walkMarkdown(root, relativePath)
        : entry.isFile() && entry.name.endsWith('.md')
          ? [relativePath]
          : [];
    });
}

function publishedMarkdownFiles(root) {
  return MARKDOWN_ROOTS.flatMap((relativeRoot) => walkMarkdown(root, relativeRoot))
    .sort((left, right) => left.localeCompare(right));
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
  return path.basename(relativePath, '.md');
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

function isPrivateHostname(hostname) {
  const value = hostname.toLowerCase();
  if (value === 'localhost' || value.endsWith('.localhost')) return true;
  if (value === '::1' || value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe80:')) return true;
  const parts = value.split('.').map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false;
  return (
    parts[0] === 10 ||
    parts[0] === 127 ||
    (parts[0] === 169 && parts[1] === 254) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
  );
}

function validPublicCitation(value) {
  const match = value.match(/\[[^\]]+\]\(([^)\s]+)\)/);
  if (!match) return false;
  try {
    const url = new URL(match[1]);
    return url.protocol === 'https:' && !url.username && !url.password && !isPrivateHostname(url.hostname);
  } catch {
    return false;
  }
}

function inspectMarkdown(relativePath, source) {
  const findings = [];
  const body = publishableBody(source);
  const lines = body.split('\n');
  let inSources = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const lineNumber = source.slice(0, source.indexOf(body) + [...lines.slice(0, index)].join('\n').length).split(/\r\n?|\n/).length;
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

function inspectRoot(root) {
  const files = publishedMarkdownFiles(root);
  const findings = files.flatMap((relativePath) =>
    inspectMarkdown(relativePath, fs.readFileSync(path.join(root, relativePath), 'utf8')),
  );
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
