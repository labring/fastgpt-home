---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Checks
meta_description: Research Misconduct: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in the investigation and handling of academic misconduct reports, involving three types of documents: report materials, investigation reports, and expert appraisal opinions. Report materials are submitted by the reporter and include the name of the reported subject, the number of papers involved, the submission date, and the receipt record; investigation reports are issued by the investigation team and include verification conclusions, evidence numbers, completion date, and signature; expert appraisal opinions are issued by appraisal experts and include the name of the appraisal subject, the number of samples, the appraisal date, and signature. When the three types of materials enter the knowledge base retrieval node, each is associated as an independent document, and citation output returns source identifiers based on original text fragments. The material update rhythm is affected by the investigation stage; supplementary materials, revised versions, and receipt re-signing all form new versions, and when versions are not synchronized, the name, quantity, and date of the same record are prone to discrepancies. Field characteristics are mainly name, quantity, date, signature, and receipt, and each item must be compared against the ledger one by one.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the name of the reported subject, the number of papers involved, the submission date, and the receipt record are consistent between the report materials and the investigation report | Open the citation superscript to trace back to the original text of the report materials, compare field by field with the investigation report, and record discrepancies |
| Investigation report | Whether the verification conclusions, evidence numbers, completion date, and signature are consistent between the investigation report and the expert appraisal opinions | Check whether the investigation report signature and receipt are complete, check whether the version number is synchronized, and record missing items |
| Expert appraisal opinions | Whether the name of the appraisal subject, the number of samples, the appraisal date, and signature are consistent between the appraisal opinions and the ledger | Use one real record to verify field by field, and mark fields where the name, quantity, or date do not match |
| Cited content output | The number of citation entries is consistent with the matched materials; being empty is also normal | Check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled), record it separately, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The versions of the two materials are not synchronized, or supplementary materials were not written back to the ledger.
- Symptom: The investigation report lacks a signature or receipt. Cause: The circulation during the investigation stage was not closed-loop, and the signature page was not updated with the version.
- Symptom: The cited fragment does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at `quoteMaxToken` budget trimming.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: use one real record to find fields inconsistent with the ledger, record the name, quantity, and date discrepancies, and submit them to the reviewer for confirmation and write-back.

- Open the search parameter panel, check that the `quoteMaxToken` value is consistent with the knowledge base retrieval section, and record the number of citation array entries separately.
- Open the citation superscript in the conversation, and verify the original text fragments and source identifiers in `quoteList` one by one against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
