const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { resolveSiteVariant } = require('./site-variant');
const { sha256: digest } = require('./release-readiness');

// Publication acceptance depends only on source and explicit public configuration.
function getPublicationInputs({ sourceRevision, lockfileDigest, publicSettings }) {
  publicSettings = Object.fromEntries(
    Object.entries(publicSettings)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      .sort(([a], [b]) => a.localeCompare(b))
  );
  const siteVariant = resolveSiteVariant(publicSettings);
  return {
    sourceRevision,
    lockfileDigest,
    siteVariant,
    crmMode: publicSettings.NEXT_PUBLIC_CRM_API_URL?.trim() ? 'configured' : 'disabled',
    publicSettings,
    cnDomainPolicy: siteVariant === 'cn' ? 'doc-and-cloud-cn-v1' : 'unchanged'
  };
}

function siteArtifactIdentity(root = process.cwd()) {
  // Environment-file loading belongs exclusively to the build process.
  require('@next/env').loadEnvConfig(root, false);
  let sourceRevision = process.env.BUILD_SOURCE_REVISION || 'unversioned';
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
    ...getPublicationInputs({
      sourceRevision,
      lockfileDigest: digest(fs.readFileSync(path.join(root, 'package-lock.json'))),
      publicSettings: process.env
    }),
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch
  };
  const cachePrefix = `next-${digest(JSON.stringify({ ...identity, sourceRevision: undefined }))}-`;
  return { ...identity, cachePrefix, cacheKey: `${cachePrefix}${sourceRevision}` };
}

module.exports = { digest, getPublicationInputs, siteArtifactIdentity };
