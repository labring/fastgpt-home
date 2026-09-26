const assert = require('node:assert/strict');

// Resolve artifact metadata against GitHub's run and commit records before checkout or deployment.
module.exports = async function previewRunInputs(github, context, manifest, legacySource) {
  const run = context.payload.workflow_run;
  const { owner, repo } = context.repo;
  const source = legacySource
    ? {
        revision: manifest.revision,
        baseRevision: manifest.baseRevision,
        headRevision: manifest.headRevision,
        ...legacySource
      }
    : manifest.source;
  assert.equal(run.conclusion, 'success');
  assert.equal(run.repository.full_name, `${owner}/${repo}`);
  assert.equal(run.path, '.github/workflows/preview.yml', 'Unexpected Preview workflow');
  assert(
    legacySource || manifest.kind === 'preview',
    'Preview deployment requires a Preview manifest'
  );
  if (legacySource) {
    assert.equal(legacySource.sourceRevision, source.revision);
  } else {
    assert.equal(manifest.schemaVersion, 1);
    assert.equal(String(source.runId), String(run.id), 'Preview run mismatch');
    assert.equal(String(source.runAttempt), String(run.run_attempt), 'Preview attempt mismatch');
    assert.equal(source.event, run.event, 'Preview event mismatch');
    assert.equal(manifest.publicationInputs.sourceRevision, source.revision);
  }
  assert(/^[a-f0-9]{40}$/.test(source.revision), 'Invalid preview revision');
  if (run.event === 'workflow_dispatch') {
    assert.equal(source.revision, run.head_sha, 'Manual preview revision mismatch');
    return { revision: source.revision, number: '', branch: `manual-${run.id}` };
  }
  assert.equal(run.event, 'pull_request');
  assert.equal(source.headRevision, run.head_sha, 'PR head differs from the completed run');
  let prs = run.pull_requests || [];
  if (!prs.length) {
    try {
      prs = (
        await github.rest.repos.listPullRequestsAssociatedWithCommit({
          owner,
          repo,
          commit_sha: run.head_sha
        })
      ).data;
    } catch {
      // The association index is unavailable for this commit; fall through to
      // the head-branch lookup below, which the run payload always carries.
    }
  }
  if (!prs.length && run.head_repository?.full_name && run.head_branch) {
    prs = (
      await github.rest.pulls.list({
        owner,
        repo,
        state: 'open',
        head: run.head_repository.full_name
      })
    ).data.filter((pr) => pr.head.ref === run.head_branch);
  }
  const details = await Promise.all(
    prs.map(
      async ({ number }) => (await github.rest.pulls.get({ owner, repo, pull_number: number })).data
    )
  );
  const candidates = details.filter(
    (pr) => pr.head.sha === run.head_sha && pr.base.repo?.full_name === `${owner}/${repo}`
  );
  assert.equal(candidates.length, 1, 'Ambiguous preview PR');
  const pr = candidates[0];
  assert.equal(pr.state, 'open', 'Preview PR has closed');
  assert.equal(pr.head.sha, source.headRevision, 'Preview head is stale');
  assert.equal(pr.base.sha, source.baseRevision, 'Preview base is stale');
  assert.equal(pr.mergeable, true, 'Merge result is not ready; resolve conflicts and rerun');
  assert.equal(source.revision, pr.merge_commit_sha, 'Preview must be the verified merge result');
  return { revision: source.revision, number: String(pr.number), branch: `pr-${pr.number}` };
};
