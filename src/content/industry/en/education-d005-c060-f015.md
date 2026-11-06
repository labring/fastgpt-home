---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Versions
meta_description: Research Progress: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Maintain Document Versions and Changes

## What this category's data looks like

This category's data covers three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted on an annual cycle, with fields including task name, number of indicators, completion date, responsible person, and signature block; mid-term review materials focus on stage results, budget execution, change descriptions, and expert receipts; acceptance reports summarize final indicators, results list, dates, and multi-party signatures. When these three types of materials enter the knowledge base retrieval and recall function, annual progress reports serve as the source of stage versions, mid-term review materials serve as the basis for changes, and acceptance reports serve as the anchor for the current version. The update rhythm is annual submission, mid-term revision, and finalization upon acceptance; the field characteristic is that the same record appears across materials in name, quantity, and date, while signatures and receipts are scattered across different pages.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields include task name, number of indicators, completion date, and signature block, aligned item by item with mid-term review materials and acceptance reports | In the search test, switch `searchMode` and compare the candidate chunks and scores among semantic, full-text, and hybrid options |
| Mid-term review materials | Stage results, budget execution, change descriptions, and receipts are complete, and dates and quantities are consistent with the annual progress report | Check whether candidates include both semantic and full-text results, and confirm that multi-channel merging has taken effect |
| Acceptance report | Final indicators, results list, dates, and multi-party signatures are the current version, old versions are traceable, and citations are synchronized | Turn `usingReRank` on and off to compare the ranking of the top few results, and check the number and scores of candidates after `similarity` filtering |
| Version ledger and change records | The current version is unique, old versions are traceable, citations are synchronized, and after changing one piece of content the version number and citations are updated in sync | Use `limit` to control the citation limit, check the tokens of the cited text, and record the number of array items separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The version is not synchronized, and the old version is still recalled and enters citations.
- Symptom: Mid-term review materials lack signatures or receipts, but candidate chunks are still treated as valid evidence. Cause: Similarity filtering only trims by text relevance and does not check the signature and receipt fields.
- Symptom: The same question cannot be recalled when rephrased, and although there are many candidates, the ones ranked at the top are all irrelevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or the merged results do not cover the full-text channel.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ranking of the top few results.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- In the knowledge base search test, switch retrieval modes, compare candidate chunks and similarity scores, and confirm that multi-channel merging already includes semantic and full-text results.
- Compare the order of the top few results before and after enabling rerank, check the tokens of the cited text after similarity filtering and citation limit trimming, and record the number of array items separately.
