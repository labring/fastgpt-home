const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { loadEnvConfig } = require('@next/env');
const { resolveSiteVariant } = require('./site-variant');
const { sha256: digest } = require('./release-readiness');

function siteArtifactIdentity(root = process.cwd()) {
  // Match `next build` environment-file precedence before deriving publication identity.
  loadEnvConfig(root, false);
  const publicSettings = Object.fromEntries(
    Object.entries(process.env)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      .sort(([a], [b]) => a.localeCompare(b))
  );
  const siteVariant = resolveSiteVariant(publicSettings);
  let sourceRevision = 'unversioned';
  try {
    sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    }).trim();
  } catch {
    // Source archives can build with a cold cache; verified handoffs require a Git revision.
  }
  const identity = {
    sourceRevision,
    lockfileDigest: digest(fs.readFileSync(path.join(root, 'package-lock.json'))),
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    siteVariant,
    crmMode: publicSettings.NEXT_PUBLIC_CRM_API_URL?.trim() ? 'configured' : 'disabled',
    publicSettings
  };
  const cachePrefix = `next-${digest(JSON.stringify({ ...identity, sourceRevision: undefined }))}-`;
  return { ...identity, cachePrefix, cacheKey: `${cachePrefix}${sourceRevision}` };
}

module.exports = { digest, siteArtifactIdentity };
