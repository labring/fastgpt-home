#!/usr/bin/env node

// Classify the complete PR diff; incomplete evidence retains both CRM builds.
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const result = { buildCount: 2, deployCrmMode: 'disabled', reason: 'unknown-inputs' };
try {
  result.revision = git('rev-parse', 'HEAD').trim();
  if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
    result.reason = 'manual-or-other-event';
  } else {
    const { pull_request: pr } = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    if (!/^[a-f0-9]{40}$/.test(pr?.base?.sha) || !/^[a-f0-9]{40}$/.test(pr?.head?.sha)) {
      throw new Error('Missing PR revisions');
    }
    result.baseRevision = pr.base.sha;
    result.headRevision = pr.head.sha;
    const fields = git(
      'diff',
      '--name-status',
      '-z',
      '--no-renames',
      `${pr.base.sha}...${pr.head.sha}`,
      '--'
    ).split('\0');
    if (fields.pop() !== '') throw new Error('Incomplete change inventory');
    const paths = [];
    while (fields.length) {
      const status = fields.shift();
      if (!/^[AMD]$/.test(status)) throw new Error('Unknown change status');
      const file = fields.shift();
      if (!file) throw new Error('Missing change path');
      paths.push(file);
    }
    const contentOnly =
      paths.length > 0 &&
      paths.every(
        (file) =>
          /^(?:src\/content\/(?:tech-center|guides)\/|content\/competitors\/).+\.md$/.test(file) ||
          ['src/components/tech-center/entries.json', 'src/content/guides/registry.json'].includes(
            file
          )
      );
    result.buildCount = contentOnly ? 1 : 2;
    result.reason = contentOnly ? 'published-content-only' : 'mixed-or-code-changes';
  }
} catch {
  result.reason = 'unknown-inputs';
}
console.log(JSON.stringify(result));
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `configured=${result.buildCount === 2}\n`);
}
