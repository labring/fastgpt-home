#!/usr/bin/env node

// Remove rendered output while preserving compilation data for identical publication inputs.
const fs = require('node:fs');
const path = require('node:path');
const { siteArtifactIdentity } = require('./lib/site-artifact-identity');

function prepareBuild(root = process.cwd()) {
  const identity = siteArtifactIdentity(root);
  const next = path.join(root, '.next');
  const cache = path.join(next, 'cache');
  const marker = path.join(cache, 'site-identity.json');
  let cacheRestored = false;
  try {
    cacheRestored =
      JSON.parse(fs.readFileSync(marker, 'utf8')).cachePrefix === identity.cachePrefix;
  } catch {
    // Missing or damaged cache metadata takes the cold-build path.
  }
  if (!cacheRestored) fs.rmSync(cache, { recursive: true, force: true });
  for (const entry of fs.existsSync(next) ? fs.readdirSync(next) : []) {
    if (entry !== 'cache') fs.rmSync(path.join(next, entry), { recursive: true, force: true });
  }
  fs.rmSync(path.join(root, 'out'), { recursive: true, force: true });
  fs.mkdirSync(cache, { recursive: true });
  fs.writeFileSync(marker, JSON.stringify(identity));
  return { ...identity, cacheRestored };
}

if (require.main === module) {
  const result = prepareBuild();
  console.log(JSON.stringify(result));
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `key=${result.cacheKey}\nrestore-prefix=${result.cachePrefix}\n`
    );
  }
}
module.exports = { prepareBuild };
