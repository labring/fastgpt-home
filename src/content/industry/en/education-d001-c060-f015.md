---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Find Supporting Evidence
slug: /en/industry/education-d001-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Evidence
meta_description: Research Progress: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Find Supporting Evidence

## What this category's data looks like

This page focuses on the scenario of annual progress and acceptance of research projects; the materials include annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted by year and record stage tasks, indicators, and budget execution; mid-term review materials are formed when the project is halfway through and focus on milestone completion and adjustment notes; acceptance reports summarize results, tests, and conclusions at project closure. All three types of materials contain fields, dates, and signature pages, and after entering the knowledge base they serve as independent retrievable sources to support cross-material basis queries. The name, quantity, and date of the same record may not match across two materials, and versions may be out of sync or signatures and receipts may be missing, so retrieval results need to point back to the original text and be checked against the current version.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit truncation). "Basis items that can point back to the original text" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Fields, dates, and signatures must be consistent with the current version and match the original text | Rephrase the same question for retrieval, check the number of candidates and scores, and verify whether dates and signature pages point back to the original text |
| Mid-term review materials | The name, quantity, and date of the same record must be consistent with the annual progress report | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the candidates include both types of recall results |
| Acceptance report | Conclusion fields, signatures, and receipts must be complete, and the version must be current | Turn `usingReRank` on or off and compare the ranking of the top few results; record the number of candidates after `similarity` filtering |
| Retrieval node and search test | Candidate chunks and similarity scores undergo merge, rerank, filter, and limit truncation | Adjust `limit` and `similarity`, observe the number of citations and content completeness, and record cited text tokens separately |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match across two materials. Cause: hits and associations were not checked first, and a single candidate was trusted directly.
- Symptom: material versions are out of sync, and old-version fields are still recalled. Cause: the knowledge base does not distinguish the current version, and retrieval does not filter by date and signature.
- Symptom: items missing signatures or receipts still appear in candidates. Cause: similarity filtering is based only on text relevance and does not incorporate material completeness.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to observe the ranking of the top few results; check changes in the number of candidates and scores under `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: ask a cross-material basis question and see whether the answer provides a source that can be pointed back to.

- In the knowledge base search test, switch `searchMode` and compare whether semantic and full-text candidates appear at the same time.
- Compare the order of the top few results before and after enabling rerank, and record the number of candidates after `similarity` filtering.
