#!/usr/bin/env node

/**
 * Prepare and verify immutable static release artifacts with Node and native tar only.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { buildGuideExpectation } = require('./verify-guide-export.js');

const ROOT = path.resolve(__dirname, '..');
const RELEASE_MANIFEST = path.join('__release', 'manifest.json');
const VARIANTS = {
  io: { expectedHost: 'https://fastgpt.io', provider: 'cloudflare-pages' },
  cn: { expectedHost: 'https://fastgpt.cn', provider: 'kubernetes' }
};

function fail({ variant = 'missing', artifactPath = '<missing>', surface = 'arguments' }, message) {
  throw new Error(`[release-artifact] variant=${variant} artifact=${artifactPath} surface=${surface} ${message}`);
}

function resolveOutDir(outDir, variant) {
  const resolved = outDir ? path.resolve(outDir) : '';
  if (!resolved || !fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    fail({ variant, artifactPath: resolved || '<missing>', surface: 'output' }, 'out directory must exist');
  }
  return resolved;
}

function assertVariant(variant, artifactPath) {
  if (!VARIANTS[variant]) {
    fail({ variant: variant || 'missing', artifactPath: artifactPath || '<missing>', surface: 'variant' }, 'must be io or cn');
  }
  return VARIANTS[variant];
}

function validateReleaseInputs(options) {
  const variant = options.variant;
  const config = assertVariant(variant, options.outDir);
  const outDir = resolveOutDir(options.outDir, variant);
  if (!/^[a-f0-9]{7,64}$/i.test(options.sourceCommit || '')) {
    fail({ variant, artifactPath: outDir, surface: 'source-commit' }, 'source commit must be a hexadecimal revision');
  }
  if (!String(options.rollbackTarget || '').trim()) {
    fail({ variant, artifactPath: outDir, surface: 'rollback-target' }, 'rollback target is required');
  }
  if (options.expectedHost && options.expectedHost !== config.expectedHost) {
    fail({ variant, artifactPath: outDir, surface: 'expected-host' }, `must be ${config.expectedHost}`);
  }
  return { ...options, outDir, expectedHost: config.expectedHost, provider: config.provider };
}

function relativePosix(root, filePath) {
  const relative = path.relative(root, filePath).split(path.sep).join('/');
  if (!relative || relative.startsWith('../') || path.isAbsolute(relative) || relative.includes('/../')) {
    fail({ artifactPath: filePath, surface: 'path' }, 'contains traversal outside release tree');
  }
  return relative;
}

function walkRegularFiles(root, current = root) {
  const entries = fs.readdirSync(current, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name));
  return entries.flatMap((entry) => {
    const filePath = path.join(current, entry.name);
    const stat = fs.lstatSync(filePath);
    if (stat.isSymbolicLink()) {
      fail({ artifactPath: filePath, surface: 'filesystem' }, 'symlinks are forbidden in release output');
    }
    if (stat.isDirectory()) return walkRegularFiles(root, filePath);
    if (!stat.isFile()) {
      fail({ artifactPath: filePath, surface: 'filesystem' }, 'release output must contain regular files only');
    }
    return [{ filePath, relativePath: relativePosix(root, filePath), size: stat.size }];
  });
}

function collectGuideRoutes(outDir, variant) {
  const expected = buildGuideExpectation(variant);
  const expectedRoutes = [...expected.routes.keys()];
  const actual = new Set();
  for (const file of walkRegularFiles(outDir)) {
    if (!file.relativePath.endsWith('.html')) continue;
    if (file.relativePath === 'guide.html' || file.relativePath === 'guide/index.html') actual.add('/guide');
    const article = file.relativePath.match(/^guide\/([^/]+)(?:\.html|\/index\.html)$/);
    if (article) actual.add(`/guide/${article[1]}`);
  }
  const sortedActual = [...actual].sort();
  const sortedExpected = [...expectedRoutes].sort();
  if (sortedActual.length !== sortedExpected.length || sortedActual.some((route, index) => route !== sortedExpected[index])) {
    fail({ variant, artifactPath: outDir, surface: 'guide-routes' }, `expected ${sortedExpected.join(', ')}, found ${sortedActual.join(', ') || '(none)'}`);
  }
  return expectedRoutes;
}

function computeTreeDigest(outDir) {
  const resolved = path.resolve(outDir);
  const digest = crypto.createHash('sha256');
  for (const file of walkRegularFiles(resolved)) {
    if (file.relativePath === RELEASE_MANIFEST) continue;
    const content = fs.readFileSync(file.filePath);
    const normalized = file.relativePath === '_headers'
      ? Buffer.from(content.toString('utf8').replace(/X-Release-(Revision|Artifact):\s*[^\r\n]*/g, (_, field) => `X-Release-${field}: __RELEASE_${field.toUpperCase()}__`))
      : content;
    digest.update(`${file.relativePath}\0${normalized.length}\0`);
    digest.update(normalized);
    digest.update('\0');
  }
  return digest.digest('hex');
}

function buildManifest(options) {
  const input = validateReleaseInputs(options);
  const routes = collectGuideRoutes(input.outDir, input.variant);
  const treeDigest = computeTreeDigest(input.outDir);
  const releaseRevision = crypto
    .createHash('sha256')
    .update(`${input.variant}\0${treeDigest}\0${input.sourceCommit}`)
    .digest('hex');
  return {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    variant: input.variant,
    expectedHost: input.expectedHost,
    sourceCommit: input.sourceCommit,
    releaseRevision,
    rollbackTarget: input.rollbackTarget,
    provider: input.provider,
    routes,
    treeDigest,
    artifactDigest: treeDigest,
    deploymentState: 'prepared',
    providerEvidence: 'pending'
  };
}

function prepareReleaseOutput(options) {
  if (options.injectReleaseHeaders) {
    const headersPath = path.join(path.resolve(options.outDir), '_headers');
    const existing = fs.existsSync(headersPath) ? fs.readFileSync(headersPath, 'utf8') : '';
    const hasReleaseBlock = /\/__release\/manifest\.json\r?\n\s*X-Release-Revision:/i.test(existing);
    const normalized = existing
      .replace(/X-Release-Revision:\s*[^\r\n]*/g, 'X-Release-Revision: __RELEASE_REVISION__')
      .replace(/X-Release-Artifact:\s*[^\r\n]*/g, 'X-Release-Artifact: __RELEASE_ARTIFACT__');
    fs.writeFileSync(headersPath, hasReleaseBlock ? normalized : `${normalized.trimEnd()}\n\n/__release/manifest.json\n  X-Release-Revision: __RELEASE_REVISION__\n  X-Release-Artifact: __RELEASE_ARTIFACT__\n`);
  }
  const manifest = buildManifest(options);
  const manifestPath = path.join(path.resolve(options.outDir), RELEASE_MANIFEST);
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  if (options.injectReleaseHeaders) {
    const headersPath = path.join(path.resolve(options.outDir), '_headers');
    fs.writeFileSync(headersPath, fs.readFileSync(headersPath, 'utf8').replace('__RELEASE_REVISION__', manifest.releaseRevision).replace('__RELEASE_ARTIFACT__', manifest.artifactDigest));
  }
  return { manifest, manifestPath, outDir: path.resolve(options.outDir) };
}

function readManifest(manifestPath, variant) {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    fail({ variant, artifactPath: manifestPath, surface: 'manifest' }, `cannot read JSON: ${error.message}`);
  }
}

function validateManifest({ outDir, manifest, manifestPath, variant }) {
  const config = assertVariant(variant || manifest?.variant, manifestPath);
  const currentVariant = variant || manifest.variant;
  if (!manifest || manifest.schemaVersion !== 1 || manifest.variant !== currentVariant) {
    fail({ variant: currentVariant, artifactPath: manifestPath, surface: 'manifest' }, 'schema version or variant is invalid');
  }
  if (manifest.expectedHost !== config.expectedHost || manifest.provider !== config.provider) {
    fail({ variant: currentVariant, artifactPath: manifestPath, surface: 'manifest' }, 'host or provider does not match variant');
  }
  if (manifest.deploymentState !== 'prepared' || manifest.providerEvidence !== 'pending') {
    fail({ variant: currentVariant, artifactPath: manifestPath, surface: 'manifest' }, 'prepared manifest must not claim provider deployment');
  }
  if (!String(manifest.rollbackTarget || '').trim() || !/^[a-f0-9]{7,64}$/i.test(manifest.sourceCommit || '')) {
    fail({ variant: currentVariant, artifactPath: manifestPath, surface: 'manifest' }, 'source commit or rollback target is invalid');
  }
  const expectedRoutes = collectGuideRoutes(outDir, currentVariant);
  if (JSON.stringify(manifest.routes) !== JSON.stringify(expectedRoutes)) {
    fail({ variant: currentVariant, artifactPath: manifestPath, surface: 'routes' }, 'route inventory drifted');
  }
  const actualTreeDigest = computeTreeDigest(outDir);
  if (manifest.treeDigest !== actualTreeDigest || manifest.artifactDigest !== actualTreeDigest) {
    fail({ variant: currentVariant, artifactPath: manifestPath, surface: 'tree-digest' }, 'tree digest drifted');
  }
  const expectedRevision = crypto
    .createHash('sha256')
    .update(`${currentVariant}\0${actualTreeDigest}\0${manifest.sourceCommit}`)
    .digest('hex');
  if (manifest.releaseRevision !== expectedRevision) {
    fail({ variant: currentVariant, artifactPath: manifestPath, surface: 'release-revision' }, 'release revision drifted');
  }
  return manifest;
}

function checksum(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function runTar(args, context) {
  const result = spawnSync('tar', args, { encoding: 'utf8' });
  if (result.error || result.status !== 0) {
    fail(context, `tar failed: ${(result.stderr || result.error?.message || 'unknown error').trim()}`);
  }
}

function assertArchiveEntries(archivePath, variant) {
  const result = spawnSync('tar', ['-tzf', archivePath], { encoding: 'utf8' });
  if (result.error || result.status !== 0) {
    fail({ variant, artifactPath: archivePath, surface: 'archive' }, 'cannot list archive');
  }
  for (const entry of result.stdout.split(/\r?\n/).filter(Boolean)) {
    const normalized = entry.replace(/^\.\//, '');
    if (!normalized.startsWith('release-out/') || normalized.includes('../') || path.posix.isAbsolute(normalized)) {
      fail({ variant, artifactPath: archivePath, surface: 'archive' }, `unsafe archive entry ${entry}`);
    }
  }
}

function packageReleaseArtifact(options) {
  const prepared = prepareReleaseOutput(options);
  const manifest = validateManifest({ ...prepared, variant: options.variant });
  const archiveDir = path.resolve(options.archiveDir || path.join(path.dirname(prepared.outDir), 'release-artifacts'));
  fs.mkdirSync(archiveDir, { recursive: true });
  const archivePath = path.join(archiveDir, `guide-${manifest.variant}-${manifest.releaseRevision.slice(0, 12)}.tar.gz`);
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), 'fastgpt-release-'));
  try {
    const stagedTree = path.join(staging, 'release-out');
    fs.cpSync(prepared.outDir, stagedTree, { recursive: true, verbatimSymlinks: true });
    walkRegularFiles(stagedTree);
    runTar(['-C', staging, '-czf', archivePath, 'release-out'], { variant: manifest.variant, artifactPath: archivePath, surface: 'archive' });
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
  assertArchiveEntries(archivePath, manifest.variant);
  const archiveDigest = checksum(archivePath);
  const sidecarPath = `${archivePath}.sha256`;
  const evidencePath = `${archivePath}.evidence.json`;
  fs.writeFileSync(sidecarPath, `${archiveDigest}  ${path.basename(archivePath)}\n`);
  fs.writeFileSync(evidencePath, `${JSON.stringify({
    schemaVersion: 1,
    variant: manifest.variant,
    archive: path.basename(archivePath),
    archiveDigest,
    artifactDigest: manifest.artifactDigest,
    treeDigest: manifest.treeDigest,
    releaseRevision: manifest.releaseRevision,
    manifestPath: RELEASE_MANIFEST
  }, null, 2)}\n`);
  return { ...prepared, manifest, archivePath, archiveDigest, sidecarPath, evidencePath };
}

function validateProviderReceipt({ providerReceipt, manifest, variant, artifactPath }) {
  if (!providerReceipt || providerReceipt.schemaVersion !== 1 || providerReceipt.variant !== variant) {
    fail({ variant, artifactPath, surface: 'provider-receipt' }, 'schema version or variant is invalid');
  }
  for (const field of ['releaseRevision', 'artifactDigest', 'treeDigest', 'archiveDigest', 'rollbackTarget']) {
    if (!String(providerReceipt[field] || '').trim()) {
      fail({ variant, artifactPath, surface: 'provider-receipt' }, `missing ${field}`);
    }
  }
  for (const field of ['releaseRevision', 'artifactDigest', 'treeDigest', 'rollbackTarget']) {
    if (providerReceipt[field] !== manifest[field]) {
      fail({ variant, artifactPath, surface: 'provider-receipt' }, `${field} does not match prepared manifest`);
    }
  }
  if (variant === 'cn') {
    if (!String(providerReceipt.provider?.imageDigest || '').startsWith('sha256:') || !String(providerReceipt.provider?.kubernetesImage || '').includes('@sha256:')) {
      fail({ variant, artifactPath, surface: 'provider-receipt' }, 'CN receipt requires image digest and digest-pinned Kubernetes image');
    }
  } else if (!providerReceipt.provider?.deploymentId || !providerReceipt.provider?.deploymentUrl) {
    fail({ variant, artifactPath, surface: 'provider-receipt' }, 'IO receipt requires Pages deployment ID and URL');
  }
}

function verifyReleaseArtifact(options) {
  const outDir = resolveOutDir(options.outDir, options.variant);
  const manifestPath = options.manifestPath || path.join(outDir, RELEASE_MANIFEST);
  const manifest = validateManifest({ outDir, manifestPath, manifest: readManifest(manifestPath, options.variant), variant: options.variant });
  if (options.archivePath) {
    const archiveDigest = checksum(options.archivePath);
    const sidecarPath = options.sidecarPath || `${options.archivePath}.sha256`;
    const sidecar = fs.readFileSync(sidecarPath, 'utf8').trim().split(/\s+/)[0];
    if (sidecar !== archiveDigest || (options.archiveDigest && options.archiveDigest !== archiveDigest)) {
      fail({ variant: manifest.variant, artifactPath: options.archivePath, surface: 'archive-digest' }, 'archive checksum drifted');
    }
    assertArchiveEntries(options.archivePath, manifest.variant);
    if (options.providerReceipt) {
      if (options.providerReceipt.archiveDigest !== archiveDigest) {
        fail({ variant: manifest.variant, artifactPath: options.archivePath, surface: 'provider-receipt' }, 'archive digest does not match receipt');
      }
      validateProviderReceipt({ providerReceipt: options.providerReceipt, manifest, variant: manifest.variant, artifactPath: options.archivePath });
    }
    return { variant: manifest.variant, manifest, archiveDigest };
  }
  return { variant: manifest.variant, manifest, treeDigest: manifest.treeDigest };
}

function parseArgs(argv) {
  const [command, ...tokens] = argv;
  if (!command || command === '--help' || command === '-h') return { help: true };
  if (!['prepare', 'package', 'verify'].includes(command)) throw new Error('[release-artifact] surface=arguments command must be prepare, package, or verify');
  const options = { command };
  const keys = { '--out-dir': 'outDir', '--variant': 'variant', '--source-commit': 'sourceCommit', '--rollback-target': 'rollbackTarget', '--expected-host': 'expectedHost', '--archive-dir': 'archiveDir', '--archive': 'archivePath', '--manifest': 'manifestPath', '--provider-receipt': 'providerReceiptPath' };
  for (let index = 0; index < tokens.length; index += 1) {
    const key = tokens[index];
    if (key === '--inject-release-headers') { options.injectReleaseHeaders = true; continue; }
    const name = keys[key];
    const value = tokens[++index];
    if (!name || !value || value.startsWith('--')) throw new Error(`[release-artifact] surface=arguments invalid ${key}`);
    options[name] = value;
  }
  return options;
}

function printHelp() {
  console.log('Usage: release-artifact <prepare|package|verify> --out-dir <dir> --variant <io|cn> --source-commit <sha> --rollback-target <immutable-revision>');
  console.log('package accepts --archive-dir; verify accepts --archive and --provider-receipt.');
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) return printHelp();
  if (options.providerReceiptPath) options.providerReceipt = JSON.parse(fs.readFileSync(options.providerReceiptPath, 'utf8'));
  const result = options.command === 'prepare'
    ? prepareReleaseOutput(options)
    : options.command === 'package'
      ? packageReleaseArtifact(options)
      : verifyReleaseArtifact(options);
  console.log(`[release-artifact] variant=${result.variant || result.manifest.variant} release=${result.manifest?.releaseRevision || result.releaseRevision} verified`);
  return result;
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
  buildManifest,
  computeTreeDigest,
  parseArgs,
  prepareReleaseOutput,
  packageReleaseArtifact,
  verifyReleaseArtifact,
  validateProviderReceipt,
  main
};
