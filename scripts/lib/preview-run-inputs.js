const assert = require('node:assert/strict');

// Resolve artifact metadata against GitHub's run and commit records before checkout or deployment.
module.exports = async function previewRunInputs(github, context, selection, source) {
  const run = context.payload.workflow_run;
  const { owner, repo } = context.repo;
  assert.equal(run.conclusion, 'success');
  assert.equal(run.repository.full_name, `${owner}/${repo}`);
  assert(/^[a-f0-9]{40}$/.test(selection.revision), 'Invalid preview revision');
  assert.equal(source.sourceRevision, selection.revision);
  if (run.event === 'workflow_dispatch') {
    assert.equal(selection.revision, run.head_sha, 'Manual preview revision mismatch');
    return { revision: selection.revision, number: '', branch: `manual-${run.id}` };
  }
  assert.equal(run.event, 'pull_request');
  assert.equal(selection.headRevision, run.head_sha, 'PR head differs from the completed run');
  let prs = run.pull_requests || [];
  if (!prs.length) {
    prs = (
      await github.rest.repos.listPullRequestsAssociatedWithCommit({
        owner,
        repo,
        commit_sha: run.head_sha
      })
    ).data;
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
  assert.equal(pr.head.sha, selection.headRevision, 'Preview head is stale');
  assert.equal(pr.base.sha, selection.baseRevision, 'Preview base is stale');
  const commit = (await github.rest.git.getCommit({ owner, repo, commit_sha: selection.revision }))
    .data;
  assert.deepEqual(
    commit.parents.map((parent) => parent.sha),
    [pr.base.sha, pr.head.sha],
    'Preview must be the verified merge result'
  );
  return { revision: selection.revision, number: String(pr.number), branch: `pr-${pr.number}` };
};

// PR-triggered consumers keep compilation caches in the PR's native cache scope.
// The Preview producer publishes this evidence as soon as its shared source gate passes.
module.exports.waitForPreviewSource = async function waitForPreviewSource(
  github,
  context,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
) {
  const { owner, repo } = context.repo;
  const head = context.payload.pull_request.head.sha;
  const title = `Preview ${context.payload.pull_request.number} / ${context.sha}`;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const { data } = await github.rest.actions.listWorkflowRuns({
      owner,
      repo,
      workflow_id: 'preview.yml',
      head_sha: head,
      event: 'pull_request',
      per_page: 10
    });
    const run = data.workflow_runs
      .filter((run) => run.head_sha === head && run.event === 'pull_request' && run.display_title === title)
      .sort((a, b) => b.id - a.id)[0];
    if (run) {
      const { data: artifacts } = await github.rest.actions.listWorkflowRunArtifacts({
        owner,
        repo,
        run_id: run.id
      });
      if (
        artifacts.artifacts.some(
          (artifact) => artifact.name === 'verified-source' && !artifact.expired
        )
      )
        return run.id;
      assert(
        !['failure', 'cancelled', 'timed_out', 'action_required'].includes(run.conclusion),
        'Preview source producer failed'
      );
    }
    await sleep(15000);
  }
  throw new Error('Timed out waiting for shared Preview source verification');
};
