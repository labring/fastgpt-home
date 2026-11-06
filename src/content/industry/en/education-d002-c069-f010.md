---
title: Citations and Source Traceability for Journal Publication Licensing and Annual Verification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c069-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Citations | Checks
meta_description: Journal Licensing: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Publication Licensing and Annual Verification: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the journal publication license and annual verification scenario; the materials include three types: the journal publication license, the annual verification form, and the rectification report. The license states the name, publication number, competent and sponsoring units, validity period, and issue date; the annual verification form records the verification year, personnel, assets, and publication situation, including signatures and receipts; the rectification report lists problem items, rectification measures, completion dates, and seals. The three types of materials are usually updated by year or by batch, and versions are prone to falling out of sync. After entering this function, the license and the verification form serve as the objects to be compared, and the rectification report serves as the supporting source, used to check whether the name, quantity, and date of the same record are consistent across the two materials, to locate fields missing signatures or receipts, and to form a discrepancy list.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length can be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | Whether the fields, dates, and signatures are consistent with the annual verification form | Extract the name, publication number, validity period, and issue date on the license, compare them against the same-named fields in the verification form, mark inconsistent items, and record the source identifier |
| Annual verification form | Whether the name, quantity, and date of the same record match across the two materials | Check the verification year, personnel count, asset count, and dates item by item, cross-compare with the license and the rectification report, and output the discrepant fields |
| Rectification report | Whether the version is in sync and whether signatures or receipts are complete | Check the problem items, completion dates, and seals of the rectification report, confirm consistency with the version of the verification form, and list missing signatures or receipts separately |
| Cited content array | Whether the cited fragments can point back to the original paragraphs, and the length can be 0 | Open the citation superscripts to compare against the source documents, record the number of array entries, and separately inspect the `quoteMaxToken` budget and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the license and the verification form. Cause: the two entries come from different sources or were not synchronized during the annual update.
- Symptom: the rectification report and the verification form are out of sync in version, and the problem items and completion dates are misaligned. Cause: after revision, the ledger was not written back, and the old version is still within the retrieval scope.
- Symptom: the verification form is missing signatures or receipts, and the cited fragments do not match the original text. Cause: the scanned copy is missing pages or the citation superscripts point to adjacent paragraphs and do not point back to the original text.

## How to verify the setup

This function's acceptance: ask a question with an original-text basis, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and separately record the number of array entries and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use one real record to find a field inconsistent with the ledger, such as the name, quantity, or date, and hand it to the reviewer for confirmation and write-back.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, see that the output is empty while the pipeline continues, and open the citation superscripts to compare against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
