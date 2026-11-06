---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Access
meta_description: Research Progress: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services

## What this category's data looks like

Annual progress and acceptance materials for research projects, including annual progress reports, mid-term inspection materials, and acceptance reports, are sourced from project teams submitting at milestones and from competent departments aggregating and archiving them; the update cadence rolls with inspection batches and version iterations. After these three types of materials enter the knowledge base retrieval and recall function, each plays a different role: annual progress reports provide phase tasks, metrics, and date fields; mid-term inspection materials provide milestone conclusions and rectification items; acceptance reports provide final metrics, signatures, and receipts. Field characteristics center on project name, task number, metric count, start and end dates, responsible person's signature, and receipt of acceptance. The name, count, and date of the same record often do not match across two materials; when versions are not synchronized or signatures and receipts are missing, retrieval candidates will still return snippets by similarity, and subsequent nodes or manual comparison of material versions and signature status are needed to decide the external entry point and authorization scope.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The external entry point and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Project name, task number, metric count, start and end dates, and signature fields must be consistent with the mid-term inspection materials | In the search test, switch `searchMode`, retrieve the same record with a restricted identity, and check whether the name, count, and dates in the candidate snippets are consistent with the mid-term inspection materials |
| Mid-term inspection materials | Milestone conclusions, rectification items, and dates must be version-synchronized with the annual progress report and acceptance report | Compare the order of the top few candidates before and after enabling rerank, and check whether the candidate snippets still retain the rectification items and date fields under the `usingReRank` switch |
| Acceptance report | Final metrics, signatures, and receipts must match the annual progress report and mid-term inspection materials | Retrieve once each with synonym-rewritten questions, record the number of candidates and the `similarity` score, and check whether the signature and receipt fields appear in the candidate snippets |
| Authorized access and external services | Visitor identity matches the visible scope; unauthorized access must not be visible | Access once with a restricted identity and see whether the visible scope matches the setting; separately record the number of cited items and the tokens of the cited text after `limit` trimming |

## Three common errors

- Symptom: The name, count, and date of the same record do not match between the annual progress report and the acceptance report. Cause: versions are not synchronized, and old-version materials are still hit by retrieval and enter the candidate snippets.
- Symptom: The mid-term inspection materials lack signatures or receipts, but candidate snippets are still returned. Cause: retrieval only filters by similarity and trims by citation upper limit, and does not verify signature status or receipt completeness.
- Symptom: There are many candidates, but the ones ranked first are all irrelevant. Cause: the retrieval mode does not match the material form, multi-path merging is not followed by rerank secondary sorting, and similarity filtering does not take effect.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank to see the order of the top few; at the same time check the changes in the number of candidates and scores under `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- In the knowledge base search test, switch retrieval modes, compare semantic, full-text, and hybrid recall candidates, and check whether both types of results are included after multi-path merging.
- Compare the order of the top few before and after enabling rerank, check the tokens of the cited text after similarity filtering and citation upper-limit trimming, and separately record the number of cited items.
