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
  assert.equal(pr.head.sha, selection.headRevision, 'Preview head is stale');
  assert.equal(pr.base.sha, selection.baseRevision, 'Preview base is stale');
  assert.equal(pr.mergeable, true, 'Merge result is not ready; resolve conflicts and rerun');
  assert.equal(
    selection.revision,
    pr.merge_commit_sha,
    'Preview must be the verified merge result'
  );
  return { revision: selection.revision, number: String(pr.number), branch: `pr-${pr.number}` };
};
