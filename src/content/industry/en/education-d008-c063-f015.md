---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Access
meta_description: Research Misconduct: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The materials include report materials, investigation reports, and expert appraisal opinions. Report materials mostly enter through real-name or anonymous channels, investigation reports are formed by the investigation team after verification, and expert appraisal opinions are issued by external experts. When these three types of materials enter the knowledge base retrieval and recall function, they respectively assume the roles of factual source, process record, and professional judgment, and their fields, dates, and signature information must be retained during retrieval. In terms of update cadence, report materials enter with acceptance batches, investigation reports are updated according to investigation stages, and expert appraisal opinions are supplemented according to issuance time. Field characteristics center on record name, quantity, date, and signature. The same record may have mismatched name, quantity, or date across two materials, or versions may be out of sync, with missing signatures and receipts. These differences directly affect the matching between the visible scope and cited content during authorized access and external services.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The externally available entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether fields, dates, and signatures are consistent with the investigation report | In the search test, switch `searchMode` among semantic, full-text, or hybrid, compare candidate snippets and scores, and check the name, quantity, and date fields |
| Investigation report | Whether the version is in sync and whether receipts and signatures are complete | Test once each with synonymous rewritten questions, observe the number of candidates and scores, and verify the report version and signature/receipt fields |
| Expert appraisal opinions | Whether dates and signatures match the records in the investigation report | Compare the ranking of the top few entries before and after enabling `usingReRank`, and check whether the appraisal opinion dates and signatures are consistent with the report |
| External service entry point | Whether visitor identity matches the visible scope | Access once with a restricted identity, record the number of candidates and scores, and verify that unauthorized content is not visible |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The materials are entered separately, without field-level alignment and version synchronization.
- Phenomenon: The investigation report version is not in sync, and expert appraisal opinions lack signatures or receipts. Cause: Update cadences are inconsistent, and signatures and receipts are not supplemented along with versions.
- Phenomenon: There are many candidates, but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too loose.

## How to verify the setup

This function's acceptance: test once each with synonymous rewritten questions, compare candidate snippets and similarity scores, then toggle `usingReRank` on and off to observe the ranking of the top few entries; record the number of candidates and scores, and for the citation upper limit, verify the tokens of the cited text, recording the array count separately.

Business test: access once with a restricted identity to see whether the visible scope matches the setting; unauthorized content is not visible, and the visible scope matches the identity.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate snippets and scores, and check the impact of `similarity` and `limit` on the number of returned entries.
- Verify the name, quantity, date, and signature fields of the report materials, investigation report, and expert appraisal opinions, and confirm that versions are in sync and receipts are complete.
