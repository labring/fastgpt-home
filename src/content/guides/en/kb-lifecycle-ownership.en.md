<!--
Delivery metadata (not published with the body)
slug: kb-lifecycle-ownership
locale: en
canonical: https://fastgpt.io/guide/kb-lifecycle-ownership
hreflang: en | zh-CN → https://fastgpt.cn/guide/kb-lifecycle-ownership | en → https://fastgpt.io/guide/kb-lifecycle-ownership | x-default → https://fastgpt.io/guide/kb-lifecycle-ownership
Meta title: FastGPT Knowledge Base Lifecycle and Ownership Guide
Meta description: Assign FastGPT knowledge-base owners, maintain document provenance, validate updates and permissions, and plan review, retirement, and recovery workflows.
keywords: FastGPT,kb,lifecycle,ownership
结构化数据: Article + BreadcrumbList
内链: FastGPT Document Parsing Acceptance Testing Checklist / FastGPT Embedding Model Migration and Rollback Guide
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# FastGPT Knowledge Base Lifecycle and Ownership

Knowledge changes after launch: policies are replaced, product details change, source links expire, and people move roles. Assign a business owner to each knowledge base and connect ingestion, updates, review, retirement, and recovery into an executable process. This keeps answers aligned with current business information.

The roles and schedules below are operational recommendations. Each organization should set retention periods, review frequency, and approval requirements according to its content risks and applicable obligations.

## Assign four responsibilities

| Responsibility | Main work | Records to retain |
| --- | --- | --- |
| Business owner | Define scope, validity, and correct answers | Content boundaries, effective dates, and critical questions |
| Content maintainer | Obtain source files, update documents, and resolve processing failures | Provenance, change descriptions, and ingestion results |
| Application owner | Manage bindings, prompts, and retrieval configuration | Affected applications, rollout steps, and restoration records |
| Platform operator | Maintain models, storage, permissions, and backups | Access configuration, alerts, and recovery exercises |

One person may hold several roles, but each responsibility needs a named successor. When personnel or teams change, transfer source accounts, synchronization tasks, application bindings, and backup access together.

Record the FastGPT resource Owner separately from the business content owner when needed. The official permission model distinguishes knowledge-base use, editing, and management and supports ownership transfer. After handover, test access and updates with ordinary-member, editor, and new-owner accounts.

## Start with a source inventory

For each document, record a stable identifier, source location, knowledge base, owner, version, effective date, and next review date. Preserve the relationship between the original file and parsed chunks so an inaccurate answer can be traced back to its evidence.

Prioritize content by business impact. Frequently changing product prices, operating procedures, or policies may need shorter review intervals. Stable background material can use a longer interval. Choose the schedule using actual change frequency and the consequence of an outdated answer.

FastGPT supports document ingestion, chunking, and retrieval. For websites or other external sources, check the update and deletion semantics of the synchronization method supported by the deployed version. Test expired authentication, unavailable sources, and withdrawn content.

## Complete the whole update cycle

1. The business owner confirms the new version and effective date; the maintainer retains the original material and provenance.
2. Import changes into a test knowledge base or a controlled scope, then inspect parsing, chunks, and processing jobs.
3. Repeat affected questions, emphasizing conflicting old and new rules, similar names, and unanswered cases.
4. The application owner confirms bindings and permissions before publishing through the intended entry point.
5. Observe feedback and retrieval results. Restore the previous binding or content version when a material discrepancy requires recovery.

Changes to retrieval rules, embedding models, or reranking belong in the same change process because they affect which existing content is retrieved. Use a separate rebuild-and-compare migration plan when changing embedding models.

## Use observable maintenance signals

| Signal | First checks | Expected result |
| --- | --- | --- |
| Persistent document-processing failures | File format, parser, model, and processing queue | Successful retry or a corrected source file |
| Repeated reports of outdated answers | Source version, duplicate old content, and application binding | Updated content and a regression question |
| Relevant material with incorrect citations | Chunk boundaries, headings, indexes, and retrieval settings | Evidence that actually supports the answer |
| A new owner or source account | Permissions, synchronization credentials, and handover records | Confirmed access and update paths |

## Retire and restore deliberately

Before retiring a knowledge base, identify applications and tasks that depend on it. Choose replacement information sources and entry points. Retain required originals, configurations, and backups under the organization's policy, and verify their access controls.

During recovery, check content validity, model bindings, and incremental updates before repeating the original question set. Archive and deletion schedules require an explicit organizational policy. An inventory, named owners, and recovery records make the selected retention period executable.

## Related guides

- [FastGPT Document Parsing Acceptance Testing Checklist](https://fastgpt.io/guide/document-parsing-acceptance)
- [FastGPT Embedding Model Migration and Rollback Guide](https://fastgpt.io/guide/embedding-model-migration)

## References

- [FastGPT team and resource permissions](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)
- [FastGPT API file knowledge bases](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)
- [FastGPT retrieval principles](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)
