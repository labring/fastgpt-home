#!/usr/bin/env node

/**
 * Run the complete source and static-export release gate without third-party dependencies.
 *
 * Source mode stays runnable on development volumes. Full mode requires a case-sensitive
 * filesystem because mixed-case FAQ slugs are part of the published URL contract.
 */

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const NEXT_DIR = path.join(ROOT, '.next');
const OUT_DIR = path.join(ROOT, 'out');
const RETAIN_DIR = path.join(ROOT, '.release-artifacts');
const EXPECTED_FAQ_COUNTS = { io: 1400, cn: 1490 };
const GENERATED_PUBLIC_PATHS = [
  'public/llms.txt',
  'public/robots.txt',
  'public/ar/llms.txt',
  'public/en/llms.txt',
  'public/id/llms.txt',
  'public/ja/llms.txt',
  'public/ms/llms.txt',
  'public/th/llms.txt',
  'public/vi/llms.txt',
  'public/zh-hant/llms.txt',
  'public/zh/llms.txt'
];

function parseArgs(argv) {
  const options = { sourceOnly: false, keepArtifacts: false, variant: undefined };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--source-only') options.sourceOnly = true;
    else if (token === '--keep-artifacts') options.keepArtifacts = true;
    else if (token === '--variant') {
      const variant = argv[++index];
      if (!['io', 'cn'].includes(variant)) throw new Error('--variant requires io or cn');
      options.variant = variant;
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  return options;
}

function commandLabel(command, args) {
  return [command, ...args].join(' ');
}

function createFailure(label, command, args, output, variant) {
  return {
    label,
    variant,
    command: commandLabel(command, args),
    output: output.trim().slice(-8000) || '<no command output>'
  };
}

function runStep(failures, label, command, args, env, variant) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    env,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024
  });
  const output = `${result.stdout || ''}${result.stderr || ''}`;
  if (result.error || result.status !== 0) {
    failures.push(
      createFailure(
        label,
        command,
        args,
        result.error ? `${output}\n${result.error.message}` : output,
        variant,
      ),
    );
    console.error(`[verify-release] ${label} failed`);
    return false;
  }
  console.log(`[verify-release] ${label} passed`);
  return true;
}

function nodeStep(failures, label, script, args, env, variant) {
  return runStep(failures, label, process.execPath, [script, ...args], env, variant);
}

function npmStep(failures, label, args, env, variant) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  return runStep(failures, label, npm, ['run', ...args], env, variant);
}

function clearBuildArtifacts() {
  fs.rmSync(NEXT_DIR, { recursive: true, force: true });
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
}

function snapshotGeneratedPublicFiles() {
  return new Map(
    GENERATED_PUBLIC_PATHS.map((relativePath) => {
      const filePath = path.join(ROOT, relativePath);
      return [relativePath, fs.existsSync(filePath) ? fs.readFileSync(filePath) : null];
    }),
  );
}

function restoreGeneratedPublicFiles(snapshot) {
  for (const [relativePath, contents] of snapshot) {
    const filePath = path.join(ROOT, relativePath);
    if (contents === null) {
      fs.rmSync(filePath, { force: true });
      continue;
    }
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents);
  }
}

function findCaseFoldCollisionPair() {
  const registry = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src/faq/generated-en-route-registry.json'), 'utf8'),
  );
  const byFoldedSlug = new Map();
  for (const record of registry.records) {
    const folded = record.canonicalSlug.toLocaleLowerCase('en-US');
    const candidates = byFoldedSlug.get(folded) || [];
    candidates.push(record.canonicalSlug);
    byFoldedSlug.set(folded, candidates);
  }
  for (const candidates of byFoldedSlug.values()) {
    if (new Set(candidates).size > 1) return candidates.slice(0, 2);
  }
  return ['How-AI-helps-in-planning', 'How-AI-Helps-in-Planning'];
}

function assertCaseSensitiveFilesystem() {
  const probeDir = fs.mkdtempSync(path.join(ROOT, '.release-case-probe-'));
  const upperPath = path.join(probeDir, 'CaseProbe');
  const lowerPath = path.join(probeDir, 'caseprobe');
  try {
    fs.writeFileSync(upperPath, 'case-sensitive probe');
    const caseSensitive = !fs.existsSync(lowerPath);
    if (!caseSensitive) {
      const [first, second] = findCaseFoldCollisionPair();
      throw new Error(
        `case-insensitive filesystem detected for published FAQ routes ${first} and ${second}; run full release on Linux/Docker or a case-sensitive APFS workspace (source-only remains available)`,
      );
    }
  } finally {
    fs.rmSync(probeDir, { recursive: true, force: true });
  }
}

function variantEnvironment(variant) {
  const baseUrl = variant === 'cn' ? 'https://fastgpt.cn' : 'https://fastgpt.io';
  return {
    ...process.env,
    CI: process.env.CI || '1',
    NODE_ENV: 'production',
    NEXT_PUBLIC_SITE_VARIANT: variant,
    NEXT_PUBLIC_HOME_URL: baseUrl,
    NEXT_PUBLIC_CN_HOME_URL: 'https://fastgpt.cn',
    NEXT_PUBLIC_IO_HOME_URL: 'https://fastgpt.io',
    NEXT_PUBLIC_LANGUAGE_REGION: variant === 'cn' ? 'zh-CN' : 'en-US'
  };
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(filePath) : [filePath];
  });
}

function faqRouteKey(filePath) {
  const relativePath = path.relative(OUT_DIR, filePath).replaceAll(path.sep, '/');
  if (!relativePath.startsWith('faq/')) return undefined;
  const route = relativePath.slice('faq/'.length);
  if (route.endsWith('/index.html')) return route.slice(0, -'/index.html'.length);
  if (route.endsWith('.html')) return route.slice(0, -'.html'.length);
  return undefined;
}

function verifyExportCardinality(variant) {
  const expected = EXPECTED_FAQ_COUNTS[variant];
  const routeKeys = new Set(
    walkFiles(path.join(OUT_DIR, 'faq'))
      .filter((filePath) => filePath.endsWith('.html'))
      .map(faqRouteKey)
      .filter(Boolean),
  );
  if (routeKeys.size !== expected) {
    throw new Error(
      `variant=${variant} FAQ HTML route cardinality mismatch: expected ${expected}, found ${routeKeys.size}`,
    );
  }

  const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) throw new Error(`variant=${variant} is missing out/sitemap.xml`);
  const sitemapUrls = [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  const faqUrls = sitemapUrls.filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.pathname.startsWith('/faq/') && parsed.pathname.split('/').filter(Boolean).length === 2;
    } catch {
      return false;
    }
  });
  if (faqUrls.length !== expected || new Set(faqUrls).size !== expected) {
    throw new Error(
      `variant=${variant} FAQ sitemap cardinality mismatch: expected ${expected}, found ${faqUrls.length}`,
    );
  }
}

function retainFailureArtifacts(variant) {
  const retainedPath = path.join(RETAIN_DIR, variant);
  fs.rmSync(retainedPath, { recursive: true, force: true });
  fs.mkdirSync(RETAIN_DIR, { recursive: true });
  fs.mkdirSync(retainedPath, { recursive: true });
  if (fs.existsSync(NEXT_DIR)) fs.cpSync(NEXT_DIR, path.join(retainedPath, '.next'), { recursive: true });
  if (fs.existsSync(OUT_DIR)) fs.cpSync(OUT_DIR, path.join(retainedPath, 'out'), { recursive: true });
  return retainedPath;
}

function runSourceChecks(failures, env) {
  const checks = [
    ['route registry check', 'scripts/generate-faq-route-registry.js', ['--check']],
    ['metadata snapshot check', 'scripts/generate-faq-metadata.js', ['--check']],
    ['FAQ route source verification', 'scripts/verify-faq-routes.js', []],
    ['FAQ metadata source verification', 'scripts/verify-faq-metadata.js', []],
    ['FAQ SEO graph source verification', 'scripts/verify-faq-seo-graph.js', []],
    ['FAQ redirect source verification', 'scripts/verify-faq-redirects.js', ['--source']]
  ];
  for (const [label, script, args] of checks) nodeStep(failures, label, script, args, env);
  runStep(failures, 'TypeScript source verification', 'npx', ['--no-install', 'tsc', '--noEmit'], env);
}

function runVariantChecks(failures, variant, env) {
  const buildPassed = npmStep(failures, `build ${variant}`, ['build'], env, variant);
  if (!buildPassed) return false;

  const checks = [
    ['P0 HTML verification', ['verify:p0']],
    ['P1 HTML verification', ['verify:p1']],
    ['P2 HTML verification', ['verify:p2']],
    ['i18n SEO HTML verification', ['verify:i18n-seo']],
    ['FAQ metadata HTML verification', ['verify:faq-metadata', '--', '--html']],
    [
      'FAQ SEO graph HTML verification',
      ['verify:faq-seo-graph', '--', '--html', '--out-dir', 'out', '--variant', variant]
    ],
    ['FAQ redirect artifact verification', ['verify:faq-redirects']]
  ];
  for (const [label, args] of checks) npmStep(failures, `${label} (${variant})`, args, env, variant);

  try {
    verifyExportCardinality(variant);
    console.log(`[verify-release] export cardinality (${variant}) passed`);
  } catch (error) {
    failures.push({
      label: `export cardinality (${variant})`,
      variant,
      command: 'in-process static export cardinality check',
      output: error.message
    });
    console.error(`[verify-release] export cardinality (${variant}) failed`);
  }
  return true;
}

function reportFailures(failures, retainedPaths) {
  if (!failures.length) return;
  console.error(`\n[verify-release] failed with ${failures.length} check(s)`);
  for (const failure of failures) {
    console.error(`\n- ${failure.label}${failure.variant ? ` [variant=${failure.variant}]` : ''}`);
    console.error(`  command: ${failure.command}`);
    console.error(`  evidence:\n${failure.output}`);
  }
  if (retainedPaths.length) {
    console.error(`\n[verify-release] retained failure artifacts: ${retainedPaths.join(', ')}`);
  } else {
    console.error('[verify-release] rerun with --keep-artifacts to retain failing .next/out evidence');
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const failures = [];
  const retainedPaths = [];
  if (!options.keepArtifacts) fs.rmSync(RETAIN_DIR, { recursive: true, force: true });
  const snapshot = snapshotGeneratedPublicFiles();
  const sourceEnv = {
    ...process.env,
    CI: process.env.CI || '1',
    NEXT_PUBLIC_SITE_VARIANT: process.env.NEXT_PUBLIC_SITE_VARIANT || 'io',
    NEXT_PUBLIC_HOME_URL: process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io',
    NEXT_PUBLIC_CN_HOME_URL: process.env.NEXT_PUBLIC_CN_HOME_URL || 'https://fastgpt.cn',
    NEXT_PUBLIC_IO_HOME_URL: process.env.NEXT_PUBLIC_IO_HOME_URL || 'https://fastgpt.io'
  };

  try {
    runSourceChecks(failures, sourceEnv);
    if (failures.length || options.sourceOnly) {
      reportFailures(failures, retainedPaths);
      if (!failures.length) {
        console.log('[verify-release] source-only checks passed; full mode requires a case-sensitive filesystem');
      }
      process.exitCode = failures.length ? 1 : 0;
      return;
    }

    try {
      assertCaseSensitiveFilesystem();
      console.log('[verify-release] case-sensitive filesystem probe passed');
    } catch (error) {
      failures.push({
        label: 'case-sensitive filesystem policy',
        command: 'in-process case-sensitive filesystem probe',
        output: error.message
      });
      clearBuildArtifacts();
      reportFailures(failures, retainedPaths);
      process.exitCode = 1;
      return;
    }

    const variants = options.variant ? [options.variant] : ['io', 'cn'];
    for (const variant of variants) {
      clearBuildArtifacts();
      const env = variantEnvironment(variant);
      const beforeFailures = failures.length;
      runVariantChecks(failures, variant, env);
      const variantFailed = failures.length > beforeFailures;
      if (variantFailed && options.keepArtifacts) {
        try {
          retainedPaths.push(retainFailureArtifacts(variant));
        } catch (error) {
          failures.push({
            label: `failure artifact retention (${variant})`,
            variant,
            command: 'in-process failure artifact copy',
            output: error.message
          });
        }
      }
      clearBuildArtifacts();
    }

    reportFailures(failures, retainedPaths);
    if (!failures.length) {
      console.log('[verify-release] release gate passed for source, redirects, io, cn, HTML, and sitemap evidence');
    }
    process.exitCode = failures.length ? 1 : 0;
  } finally {
    restoreGeneratedPublicFiles(snapshot);
    if (!failures.length || !options.keepArtifacts) {
      clearBuildArtifacts();
    }
  }
}

try {
  main();
} catch (error) {
  console.error(`[verify-release] ${error.message}`);
  process.exitCode = 1;
}
