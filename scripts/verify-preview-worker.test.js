const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { load } = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');

function readWorkflow(name) {
  return fs.readFileSync(path.join(ROOT, '.github/workflows', name), 'utf8');
}

test('PR preview deployment uses an isolated Worker and the verified artifact', () => {
  const source = readWorkflow('preview-deploy.yml');
  const workflow = load(source);
  const job = workflow.jobs.deploy;
  const deploy = job.steps.find((step) => step.id === 'deploy');

  assert.equal(workflow.name, 'Preview Home Page — Deploy Worker');
  assert.equal(job.environment, 'international-worker-preview');
  assert.equal(deploy.uses, 'cloudflare/wrangler-action@v3');
  assert.equal(deploy.with.apiToken, '${{ secrets.CLOUDFLARE_PREVIEW_WORKER_API_TOKEN }}');
  assert.equal(deploy.with.accountId, '${{ vars.CLOUDFLARE_ACCOUNT_ID }}');
  assert.equal(deploy.with.wranglerVersion, '4.136.3');
  assert.match(deploy.with.command, /^deploy /);
  assert.match(deploy.with.command, /--config \.\/verified-preview\/payload\/wrangler\.json/);
  assert.match(deploy.with.command, /--name \$\{\{ steps\.worker\.outputs\.name \}\}/);
  assert.equal(workflow.concurrency.group, 'preview-worker-publish');
  assert.equal(workflow.concurrency['cancel-in-progress'], false);
  assert.equal(workflow.concurrency.queue, 'max');
  assert.match(source, /--trusted-config verifier\/wrangler\.json/);
  assert.match(source, /fastgpt-preview-pr-\$PR_NUMBER/);
  assert.match(source, /fastgpt-home-preview/);
  assert.doesNotMatch(source, /pages deploy/);
});

test('PR preview builds and uploads one disabled artifact', () => {
  const job = load(readWorkflow('preview.yml')).jobs.build;
  assert.equal(job.env.NEXT_PUBLIC_CRM_API_URL, '');
  assert.equal(job.steps.filter((step) => step.run === 'npm run build:preview').length, 1);
  assert.equal(job.steps.filter((step) => step.uses === 'actions/upload-artifact@v4').length, 1);
  assert(
    !job.steps.some((step) =>
      /verify:release|verify-preview-artifact|select-preview/.test(step.run || '')
    )
  );
});

test('PR preview cleanup deletes the numbered Worker with the same credential boundary', () => {
  const source = readWorkflow('preview-worker-cleanup.yml');
  const workflow = load(source);
  const job = workflow.jobs.cleanup;
  const cleanup = job.steps.find((step) => step.name === 'Delete preview Worker');

  assert.equal(job.environment, 'international-worker-preview');
  assert.equal(cleanup.uses, 'cloudflare/wrangler-action@v3');
  assert.equal(cleanup.with.apiToken, '${{ env.CLOUDFLARE_API_TOKEN }}');
  assert.equal(cleanup.with.accountId, '${{ env.CLOUDFLARE_ACCOUNT_ID }}');
  assert.equal(cleanup.with.wranglerVersion, '4.136.3');
  assert.match(
    cleanup.with.command,
    /delete --name \$\{\{ steps\.worker\.outputs\.name \}\} --force/
  );
  assert.match(source, /INPUT_WORKER_NAME/);
  assert.match(source, /pull_request_target:/);
  assert.match(source, /Recheck pull request status/);
  assert.doesNotMatch(source, /continue-on-error: true/);
  const cleanupConcurrency = load(source).concurrency;
  assert.equal(cleanupConcurrency.group, 'preview-worker-publish');
  assert.equal(cleanupConcurrency['cancel-in-progress'], false);
  assert.equal(cleanupConcurrency.queue, 'max');
});
