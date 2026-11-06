---
title: Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Find Supporting Evidence
slug: /en/industry/education-d001-c059-f010
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Citations | Evidence
meta_description: Research Finance: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Budget Adjustments and Reimbursement: Find Supporting Evidence

## What this category's data looks like

In the research funding budget adjustment and reimbursement scenario, materials fall into three categories: budget adjustment applications, reimbursement forms, and contract invoices. Sources are the project team, the finance department, and the counterparty to the contract; the update cadence is per-transaction submission, level-by-level approval, and monthly archiving. Budget adjustment applications record the adjustment item, amount, and approval date; reimbursement forms record expense details, the handler's signature, and the reimbursement date; contract invoices record the contract number, invoiced amount, invoice date, and both parties' seals. When the three types of materials enter the knowledge base retrieval node, each participates in vector search as an independently retrievable fragment; after a hit, they are returned as a cited content array, and each citation carries the original text fragment and a source identifier, for subsequent field comparison, ledger writing, or report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing the original text fragment and a source identifier, and the length can be 0. "Basis entries that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the adjustment item, amount, approval date, and signature are consistent with the current version | Open the citation marker to trace back to the original text paragraph, check the fields and dates item by item, and record the number of array entries |
| Reimbursement form | Whether the expense details, handler's signature, and reimbursement date match the contract invoice | Compare the cited fragment with the source document, verify whether the name, quantity, and date are consistent, and check whether the receipt is complete |
| Contract invoice | Whether the contract number, invoiced amount, invoice date, and both parties' seals are complete | Check the cited content against the original text, confirm the version is current, and mark as pending supplementation when a signature or receipt is missing |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, and see that the array is empty while the pipeline continues; `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) can be checked |

## Three common errors

- Symptom: the name, quantity, and date of the same budget adjustment do not match across two materials. Cause: material sources are not synchronized, and fields were not checked against the current version.
- Symptom: the version of the contract invoice cited by the reimbursement form has not been synchronized, and the approval basis is still the old version. Cause: after the version update, retrieval was not redone, and the cited fragment remained in a historical paragraph.
- Symptom: the answer has content but the citation array is empty, or the cited fragment does not match the original text. Cause: no materials were hit in this round, or after a hit the original text was not traced back; this is not directly related to length truncation.

## How to verify the setup

Acceptance of this feature: ask a budget adjustment or reimbursement question that has an original-text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check the number of citations and the `quoteMaxToken` budget and record them separately.

- Open the citation markers, verify the original text fragments and source identifiers one by one against the source documents, and record the number of array entries
- Check the values in the search parameter panel, confirm that `quoteMaxToken` is the content budget, and record the number of array entries separately without making an equality comparison

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
