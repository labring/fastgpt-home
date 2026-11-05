---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Checks
meta_description: Graduate Admissions: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, material verification and discrepancy localization involve three core types of materials: the re-examination plan, the candidate score sheet, and the adjustment list. The re-examination plan specifies the process, scoring, and signature fields; the candidate score sheet records the preliminary examination scores, re-examination scores, and rankings; the adjustment list carries candidate identity, preferences, and proposed admission information. The three types of materials come from different sources and have different update rhythms: the plan is finalized before the re-examination, the score sheet is updated on a rolling basis with re-examination batches, and the adjustment list is locked after the adjustment system closes. Field characteristics center on candidate name, candidate number, score values, dates, and signature receipts. After the materials enter the knowledge base retrieval node, each serves as an independent citation source for subsequent comparison of fields and localization of discrepancies in names, quantities, and dates, forming a discrepancy list that is handed to the reviewer for confirmation and write-back.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing the original text fragment and source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Check whether the candidate name, score calculation method, dates, and signature fields in the plan are consistent with the candidate score sheet and adjustment list | Open the citation superscript to compare against the original paragraphs of the plan, check whether signatures and receipts are missing, and record inconsistent fields |
| Candidate score sheet | Check whether the name, candidate number, score values, and dates of the same candidate are consistent between the score sheet and the adjustment list | Open the citation superscript in the conversation to refer back to the original text of the score sheet, compare field by field against the ledger, and mark discrepancies |
| Adjustment list | Check whether the versions among the adjustment list, re-examination plan, and score sheet are synchronized, and whether signatures or receipts are complete | Run a trial with one real record, check whether the number of citation array entries matches the hit materials, and record the `quoteMaxToken` budget and the array length separately |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal, and the chain continues to run through | Run a trial with a question that has no matching materials, observe that the citation array is empty while the chain continues, and check the citation identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The name, quantity, and date of the same candidate do not match between the score sheet and the adjustment list. Cause: The two materials' versions are not synchronized, their update rhythms differ, and no cross-check was performed.
- Symptom: The re-examination plan lacks signatures or receipts, and the adjustment list version lags. Cause: The material circulation step did not write back confirmation, and empty signature fields still entered the next step.
- Symptom: The citation fragment does not match the original text, and there is no citation superscript in the answer. Cause: First check whether this round hit and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Feature acceptance: Ask a question with original-text evidence, check whether the citation array and superscripts can refer back to the original paragraphs, and confirm that the number of citations matches the hit materials; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check that `quoteMaxToken` is the content budget and the array entry count is recorded separately, without comparing the two for equality.

Business test: Use one real record to find fields inconsistent with the ledger, and hand them to the reviewer for confirmation and write-back.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation superscript, compare against the source document, and check whether the citation identifiers in `quoteList` within `responseData` can refer back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
