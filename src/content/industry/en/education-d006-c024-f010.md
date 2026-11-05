---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Track Progress and Check Statistics
slug: /en/industry/education-d006-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Progress
meta_description: Graduate Admissions: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the graduate admissions re-examination and admission scenario; the materials include the re-examination plan, the candidate score sheet, and the transfer list. The re-examination plan provides process milestones, scoring, and signature requirements; the candidate score sheet provides preliminary and re-examination scores, rankings, and dates; the transfer list provides candidate origin, preferences, and confirmation status. After these three types of materials enter the citation output of the knowledge base retrieval node, each takes on a field traceability role: the plan is used to verify the process and signatures, the score sheet is used to verify scores and dates, and the transfer list is used to verify the list and status. The update cadence advances by admissions batch; after each batch ends or the list is adjusted, one version is synchronized, and within the week verification is done using the weekly report standard. Field characteristics center on candidate ID, name, major, score, date, signature, and receipt, and it is common for the same record's name, quantity, and date to be inconsistent across different materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length may be 0. The "progress table and statistical standard description" is completed afterward by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether the fields, dates, and signatures match the candidate score sheet and transfer list; whether the version is synchronized; whether signatures or receipts are complete | Open the citation markers one by one, trace back to the original paragraphs of the plan, verify the process milestones, scoring items, dates, and signature fields, and record missing items |
| Candidate score sheet | Whether the candidate ID, name, major, score, and date are consistent with the plan and transfer list; whether the name and quantity of the same record match across the two materials | Use the citation array to compare the name, ID, and date in the score sheet and transfer list one by one, mark entries that do not match, and note the source identifier |
| Transfer list | Whether the list quantity, candidate origin, confirmation status, and date are consistent with the plan and score sheet; whether missing signatures or receipts are clearly stated | Verify the number of entries in the citation array and the matched materials, check the name, quantity, and date in the list and score sheet, and record exceptions and receipts pending supplementation |
| Cited content output | The number of citation entries is consistent with the matched materials, and being empty is also normal; the citation fragments can be traced back to the original text; `quoteMaxToken` is only a content budget and is not compared for equality with the number of entries | Open the citation markers to compare against the source documents, inspect the citation fragments and source identifiers in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled), and record the array length separately |

## Three common errors

- Symptom: the name or ID of the same candidate does not match between the score sheet and the transfer list. Cause: the two material versions are not synchronized, or the name, quantity, and date were not uniformly verified at entry.
- Symptom: the dates in the re-examination plan are inconsistent with the dates in the score sheet and transfer list. Cause: after the plan was updated, it was not synchronized to the list and score sheet, and the versions were not synchronized, causing the standard to diverge.
- Symptom: the list is missing signatures or receipts, and the statistical total does not match the number of records. Cause: signatures and receipts were not completed along with the batch, exceptions were not written into the standard description, and traceability is impossible during verification.

## How to verify the setup

Acceptance of this feature: ask a question with textual support and verify whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline still runs through. Also inspect the citation fragments and source identifiers in `quoteList` within `responseData`; the number of citation entries is recorded separately by array length, and `quoteMaxToken` is only a content budget.

Business test: use one week of records to verify the totals and see whether the standard and exceptions are clearly stated.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, then run a test with a query that has no matching materials to see that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
