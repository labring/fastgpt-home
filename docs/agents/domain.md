# Domain Docs

## Layout

This repository uses a single-context layout:

- `CONTEXT.md`: shared domain vocabulary.
- `docs/adr/`: architectural decisions.

## Before exploring

Read the root `CONTEXT.md` and ADRs relevant to the task.
If a root `CONTEXT-MAP.md` is introduced later, follow its pointers
to relevant context files and context-scoped ADRs.

Proceed silently when documentation is absent. Domain documentation
is created as terms and decisions are resolved through `/domain-modeling`,
including work initiated by `/grill-with-docs` and
`/improve-codebase-architecture`.

## Vocabulary

Use the terms defined in `CONTEXT.md` in issue titles, proposals,
hypotheses, code, and tests. Respect its synonym guidance.
Record meaningful vocabulary gaps for `/domain-modeling`.

## Decision conflicts

Explicitly identify any proposal that conflicts with an existing ADR.
Cite the ADR and explain why the decision should be reconsidered.
