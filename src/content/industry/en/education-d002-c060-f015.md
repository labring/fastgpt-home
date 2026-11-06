---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Checks
meta_description: Research Progress: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Compare Documents and Locate Differences

## What this category's data looks like

In the scenario of annual progress and acceptance of scientific research projects, common materials include three types: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones, with fields mainly consisting of task name, indicator quantity, completion date, and responsible person's signature; mid-term review materials are consolidated in the middle of the project cycle, with fields emphasizing the list of phase results, dates of fund use, and review opinion signatures; acceptance reports are formed at project completion, with fields covering final indicator names, quantities, dates, and acceptance team signatures and receipts. The three types of materials come from different sources and have different update rhythms. The same record often differs in name, quantity, and date, and unsynchronized versions, missing signatures, or receipts also occur from time to time. After materials enter the knowledge base retrieval service, each participates in recall as a candidate fragment, for subsequent nodes or manual comparison of field discrepancies between ledgers and reports.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The discrepancy list must be produced by subsequent nodes or manually. A single retrieval consists of question optimization, semantic/full-text/hybrid recall, multi-route merge, rerank secondary sorting, similarity filtering, and citation limit truncation, and only then is the citation content handed to the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Task name, indicator quantity, completion date, and responsible person's signature must be consistent with the ledger | In the search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate fragments and `similarity` scores, and record name, quantity, and date fields |
| Mid-term review materials | Phase result names, dates of fund use, and review opinion signatures must correspond to the annual progress report | Compare the order of the top few candidates before and after enabling `usingReRank`, and check whether the name, quantity, and date of the same record are consistent |
| Acceptance report | Final indicator names, quantities, dates, and acceptance team signatures and receipts must be consistent with the ledger | Check the number of returned candidates and the citation text, observe whether key fragments remain complete after truncation according to `limit`, and separately record citation text tokens |
| Knowledge base candidate fragments | When the name, quantity, and date of the same record do not match across two materials, the discrepancy must be located | Test once each with synonymous questions, compare candidates and scores, and mark fields missing signatures or receipts |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials' versions are not synchronized, and retrieval candidates come from different recall routes without field-level alignment.
- Symptom: Mid-term review materials lack signatures or receipts, making confirmation impossible at acceptance. Cause: Materials have different update rhythms, signature pages are not written back with the version, and candidate fragments do not include signature fields.
- Symptom: There are many candidates, but the ones ranked first are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or key fragments are truncated after similarity filtering and citation limit truncation.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidate fragments and `similarity` scores, then toggle `usingReRank` on and off to observe changes in the ranking of the top few candidates, and record the number of candidates under `searchMode` and `limit`.

Business test: Use one real record to find fields inconsistent with the ledger, and check the name, quantity, date, and signature receipts of that record in the annual progress report, mid-term review materials, and acceptance report.

- In the knowledge base search test, switch `searchMode`, compare candidate fragments and scores returned by semantic, full-text, and hybrid modes, and mark differences in name, quantity, and date fields.
- Test once each with `usingReRank` enabled and disabled, compare the order of the top few candidates, and separately record citation text tokens and array count, without comparing the two as equal.
