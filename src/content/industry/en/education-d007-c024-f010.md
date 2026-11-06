---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Review
meta_description: Graduate Admissions: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Trace Exceptions and Review Results

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, the materials entering this feature mainly include the re-examination plan, candidate score sheet, and transfer list. The re-examination plan carries the process, weights, time nodes, and signature fields; the candidate score sheet carries the preliminary examination, re-examination, total score, and ranking; the transfer list carries the transfer batch, source, and confirmation receipt. The three types of materials come from different sources and have different update rhythms: the plan is finalized first and then fine-tuned, the score sheet is backfilled by batch, and the transfer list rolls with confirmation status. Field characteristics are concentrated in name, candidate number, major, date, quantity, signature, and receipt. When the materials enter this feature, each serves as a retrieved original source, the node only outputs an array of cited content, and the exception list and review conclusions are completed by subsequent steps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, each containing an original text snippet and a source identifier, and the length can be 0. The "exception list and review conclusions" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Fields, dates, and signatures are complete, and the plan version matches the current batch | In the cited snippet, verify the plan name, re-examination date, and signature fields; open the citation marker to compare against the source document |
| Candidate score sheet | The major, quantity, and date for the same candidate in the score sheet and the plan can be matched | Search by candidate number, compare the original text snippet of the score sheet with the original text snippet of the plan item by item, and record inconsistencies |
| Transfer list | The name, quantity, date, and receipt signature of the transfer record are traceable | Retrieve the original text of the transfer list, verify the receipt and signature; check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Citation content output | The number of returned items matches the materials hit, and being empty is also normal | Run a test with a question that has no matching materials, and see that the output is empty while the pipeline continues; verify `quoteList` and `quoteMaxToken` |

## Three common errors

- Symptom: The major name or quantity for the same candidate does not match between the score sheet and the transfer list. Cause: The two materials are backfilled by different steps, and no field-level comparison was performed.
- Symptom: The re-examination plan has been updated, but the cited snippet still points to the old version date. Cause: The knowledge base has not synchronized the new version, and retrieval hits the old document.
- Symptom: The transfer list lacks a receipt or signature, and the exception record cannot be traced back to the original confirmation. Cause: Signed documents were not fully collected when the materials were archived, and the citation array is empty.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: create an exception record and see whether it can be traced to the source material.

- In the node, verify the selected knowledge base collections and their vector models, and confirm they use the same vector model.
- Open the search parameter panel and verify the values item by item; when the citation limit is involved, verify the tokens of the cited text, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
