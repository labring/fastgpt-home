---
title: Citations and Source Traceability for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c024-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Citations | Intake
meta_description: Graduate Admissions: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information

## What this category's data looks like

In the graduate admissions re-examination and admission scenario, materials enter Q&A acceptance and missing-item follow-up in three categories: re-examination plans, candidate score sheets, and transfer lists. Re-examination plans provide process nodes, scoring rules, and time windows; candidate score sheets carry preliminary and re-examination scores, rankings, and calculation criteria; transfer lists record candidate numbers, transfer directions, and confirmation status. The three material categories are often uploaded as attachments, tables, or scanned documents, with fields including name, candidate number, major, date, quantity, signature, and receipt. The update cadence is synchronized with admission batches; versions may be replaced multiple times before and after the re-examination, and when old and new versions coexist, names, quantities, and dates are prone to inconsistency, while missing signatures or receipts are also common. After materials enter this feature, each serves as a citation source participating in retrieval, providing the original-text basis for acceptance records and completed follow-up items.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text fragment and a source identifier, and the length may be 0. "Acceptance records and completed follow-up items" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Check the process nodes, scoring rules, time windows, and signature fields in the plan, and confirm that the name, quantity, and date of the same record are consistent across the three material categories | Open the citation marker to compare against the source document, check whether each citation in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original-text paragraph, and record the array length |
| Candidate score sheet | Check the score fields, calculation criteria, ranking, and date, and confirm that when the name, quantity, and date of the same candidate record do not match those in the re-examination plan and transfer list, it is marked as a missing item | Run a trial with a question missing key information to see whether it asks a follow-up question before answering, and at the same time check the matched material entries in `quoteList` |
| Transfer list | Check the candidate number, transfer direction, confirmation status, signature, or receipt, and confirm that when versions are not synchronized, the latest signed version prevails | Open the citation marker in the conversation, compare against the source document, check whether the cited fragment is consistent with the original text, and separately record the number of citations |

## Three common errors

- Phenomenon: the name, quantity, and date of the same candidate do not match between the score sheet and the transfer list. Cause: the two materials are updated separately, without field-level comparison and version synchronization.
- Phenomenon: the re-examination plan has already been replaced with a new version, but the Q&A still cites the old process and time windows. Cause: the old version has not been removed from the knowledge base, retrieval hits the old fragment, and the version is not labeled.
- Phenomenon: the transfer list lacks a signature or receipt, but the acceptance record is processed as confirmed. Cause: the missing item was not identified and followed up on, and the material basis is incomplete.

## How to verify the setup

Feature acceptance: ask a question that has an original-text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. If a citation upper limit is involved, check the tokens of the cited text, and record the array entry count separately.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a trial with a question that has no matching material, see whether the output is empty while the pipeline continues, and check that the cited fragments in `quoteList` within `responseData` correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
