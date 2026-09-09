# Issue tracker: GitHub

Issues and specs live in `labring/fastgpt-home`. Use the `gh` CLI.
Always pass `--repo labring/fastgpt-home` to issue and PR commands;
the origin remote points to a personal fork.

## Conventions

- Create: `gh issue create --repo labring/fastgpt-home --title "..." --body-file <path>`
- Read: `gh issue view <number> --repo labring/fastgpt-home --comments`
- List: `gh issue list --repo labring/fastgpt-home --state open --json number,title,body,labels,comments`
- Comment: `gh issue comment <number> --repo labring/fastgpt-home --body-file <path>`
- Apply labels: `gh issue edit <number> --repo labring/fastgpt-home --add-label "..."`
- Remove labels: `gh issue edit <number> --repo labring/fastgpt-home --remove-label "..."`
- Close: `gh issue close <number> --repo labring/fastgpt-home`

Write multiline bodies to a temporary file and pass `--body-file`.
Use labels from `docs/agents/triage-labels.md`.
Write issue titles, bodies, comments, and PR text in English.

Publishing to the issue tracker means creating a GitHub issue.
Fetching a relevant ticket means reading the issue and its comments.
Follow the session's authorization requirements for external writes.

## Pull requests as a triage surface

**PRs as a request surface: no.**

If enabled later, use the equivalent `gh pr` commands and triage PRs
from CONTRIBUTOR, FIRST_TIME_CONTRIBUTOR, or NONE authors.

GitHub issues and PRs share a number space. Resolve ambiguous references
with `gh pr view`, falling back to `gh issue view`.

## Wayfinding operations

- Map: one issue labeled `wayfinder:map`, containing Notes,
  Decisions-so-far, and Fog.
- Child tickets: link GitHub sub-issues to the map and apply
  `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`,
  or `wayfinder:task`. When sub-issues are unavailable, use a task list
  in the map and `Part of #<map>` in each child.
- Blocking: use native issue dependencies through
  `repos/labring/fastgpt-home/issues/<child>/dependencies/blocked_by`,
  passing the blocker's numeric database ID as `issue_id`.
  When unavailable, use `Blocked by: #<number>` in the child body.
- Frontier: choose the first open, unassigned child in map order
  whose blockers are all closed.
- Claim: assign the ticket with `--add-assignee @me`.
- Resolve: comment with the result, close the ticket, and add a
  result summary and link to the map's Decisions-so-far.
