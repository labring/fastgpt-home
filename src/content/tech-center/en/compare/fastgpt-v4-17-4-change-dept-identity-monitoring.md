---
title: Copy Applications or Add Workflow Branches in FastGPT
slug: /en/compare/fastgpt-v4-17-4-change-dept-identity-monitoring
page_type: matrix
source: https://doc.fastgpt.io/guide/build/workflow/intro
source_type: 深度场景内容
meta_title: Copy Applications or Add Workflow Branches in FastGPT
meta_description: Compare separate FastGPT applications and shared workflow branches by change ownership, input differences, document scope and authenticated access paths.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4-17-4-change-dept-identity-monitoring-en","task_id":"W19-matrix-03","article_id":"W19-matrix-03-en","language":"en","content_type":"matrix","meta_title":"Copy Applications or Add Workflow Branches in FastGPT","meta_description":"Compare separate FastGPT applications and shared workflow branches by change ownership, input differences, document scope and authenticated access paths.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4-17-4-change-dept-identity-monitoring","source_language":"zh","source_sha256":"5ff079a213f0a6ee6f8ae3faaefc3c16bf30be244023a9b224f982c4db9e18cb","keywords":"[\"workflow branches\",\"department application reuse\",\"document access\"]"},"editorial_notes":[]}
keywords: workflow branches, department application reuse, document access
schema_type: Article
date_modified: 2026-11-23
---

# Copy Applications or Add Workflow Branches in FastGPT

## Compare the arrangements for change

When departments use similar applications, separate workflows and branches within one shared workflow are different maintenance designs. Compare the stability of differences, who changes them and which users a change affects. FastGPT [workflows](https://doc.fastgpt.io/guide/build/workflow/intro) can arrange nodes into different paths. Start by checking whether departments use the same sequence. List differences in inputs, documents, APIs and outputs before making the choice.

## Assess whether differences have explicit conditions

A shared workflow may simplify central maintenance when the order is the same and differences are explicit categories or fields. Separate workflows can be easier to inspect when interactions, owners and outputs differ substantially. Use the table to organize those tradeoffs against actual business changes. In either design, keep a record of shared and departmental configuration so later changes do not overlook one side.

| Dimension | Separate workflows | Branches in a shared workflow |
| --- | --- | --- |
| Change ownership | Independent release and checks | Shared changes require branch coverage |
| Expressing differences | Maintained in each workflow | Requires stable conditions and variables |
| Document access | Check identity and sources separately | Check identity and sources for every branch |

## Make branch conditions inspectable

The [conditional node](https://doc.fastgpt.io/guide/build/workflow/nodes/tfswitch) selects a path using variable conditions. Establish the variable’s producer, format and alternative path. A department name typed in a message can be information to verify, but it is not automatically an identity credential. Review document scope, routing and access separately so a branch is not used to represent unrelated decisions.

## Check access under both designs

[File-level permissions](https://doc.fastgpt.io/guide/dataset/collection_permission) are separate from workflow layout. For a search authenticated as a team member, commercial file permissions restrict retrieval to files that member can read when the feature is enabled. Copying an application does not establish the same filtering if that authentication path is absent. Shared workflows also require checks of actual identity and readable material; application names and branch labels alone do not establish document isolation.

## Compare both designs against one change

Take an actual document change or field adjustment and work through which locations, owners and rollback steps each design needs. Then run existing questions under accounts from different departments, checking inputs, branches, sources and outputs together. Give the locations, owners and test results to the maintainers. When sources or fields change again, use the record to recheck each department’s inputs and access path.
