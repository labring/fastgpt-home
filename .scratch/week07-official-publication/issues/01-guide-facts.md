# Guide 与迁移内容的公开技术依据

Type: research
Labels: wayfinder:research
Status: resolved
Assignee: guide_research
Parent: [Week07 官网全量内容发布](../map.md)
Blocked by:

## Question

核对七篇 Guide 与三篇迁移素材的关键技术事实，确定保持既定主题和 URL 时需要的修订；提供可直接引用的第一方 HTTPS 来源。

## Comments

- 2026-09-06: Claimed by guide_research; verify Guide and migration facts against first-party sources.

## Answer

已完成七篇 Guide 与三篇迁移素材的公开技术核验，逐篇提供纠错、可用事实提纲、参考链接与验收边界。结果见 [guide-facts.md](../research/guide-facts.md)。

- Research commit: `209c2f7` (`docs(research): verify Week07 guide and migration facts`).
- Ten canonical URLs checked against the source drafts; all preserved.
- Forty first-party HTTPS references checked: 39 returned HTTP 200 directly; the Milvus HNSW document was verified with the web tool after a local DNS failure.
- FastGPT implementation references pin upstream commit `2bab5c1e06c46362f40a454d49d963e8bf0c62bc`.
- Only the findings file is included in the research commit; this ticket status is updated in the local research worktree.

- 2026-09-06: Reopened for a read-only factual review of the 14 published-ready Guide files and three migration files in the root worktree.


## Follow-up answer: publication factual review

- Reviewed all 14 Chinese/English Guide files and three migration files in the root worktree without editing production content.
- The reviewed snapshot has no publication-blocking technical error, applicability omission, or Chinese/English translation error.
- Verified that all 27 unique external citations belong to the first-party sources already checked in the research.
- Appended the per-article review and SHA-256 values for all 17 files to the same findings file.
- Review commit: `11eb8362cd4ea0752a67ef8a6842cbd9338b04e6` (`docs(research): review Week07 publication facts`).
- `git diff --cached --check` passed before commit; the commit includes only the findings file.
- 2026-09-06: Follow-up factual review complete; local research ticket resolved.
