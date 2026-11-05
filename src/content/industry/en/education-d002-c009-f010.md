---
title: Citations and Source Traceability for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c009-f010
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Citations | Checks
meta_description: Dropout Prevention: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences

## What this category's data looks like

In the compulsory education dropout prevention and control scenario, the materials that enter the material verification and discrepancy localization stage are mainly of three types: dropout risk ledgers, persuasion-to-return records, and home visit records. Dropout risk ledgers are usually updated by semester or month, and their fields include student name, ID number, risk level, dropout tendency, responsible person, update date, and signature; persuasion-to-return records are generated for each persuasion-to-return action, and their fields include student name, persuasion-to-return time, persuasion-to-return method, result, receipt, and signature; home visit records are formed for each home visit, and their fields include student name, home visit date, home visit teacher, parent signature, and problem description. The three types of materials play different roles in verification: the ledger is the baseline object, while persuasion-to-return records and home visit records are supporting materials. After the materials enter the knowledge base retrieval node, the citation output returns only the original text snippet and source identifier, and subsequent manual or AI nodes then use this to compare whether names, quantities, dates, and signatures are consistent.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length may be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether student name, risk level, update date, and responsible person's signature are consistent across the three types of materials | Open the original ledger text, compare item by item the same student's fields in the persuasion-to-return records and home visit records, and record inconsistent items |
| Persuasion-to-return record | Whether the persuasion-to-return time, persuasion-to-return result, receipt, and signature match the ledger update date | Check the receipt and signature of each persuasion-to-return record, check whether the receipt or signature is missing, and point back to the original text paragraph |
| Home visit record | Whether the home visit date, home visit teacher, and parent signature correspond to the responsible person and update rhythm in the ledger | Compare the dates and signatures in the home visit records and the ledger, and mark items whose versions are not synchronized or are missing |
| Citation content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; record the number of array items and separately check the `quoteMaxToken` budget |

## Three common errors

- Symptom: the same student's name or date does not match between the ledger and the persuasion-to-return record. Cause: the two materials were filled in by different people at different times without cross-checking, and the field definitions are inconsistent.
- Symptom: the home visit record has content but lacks a parent signature or receipt. Cause: the signature column was not checked when the materials were archived, and the versions were not synchronized, resulting in incomplete supporting materials.
- Symptom: there is no citation superscript in the answer, or the cited snippet does not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this function: ask a question with original text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of array items and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use one real record to find a field inconsistent with the ledger, check whether the `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) contains the source identifier, and write it back after confirmation by the reviewer.

- Open the knowledge base retrieval node, check whether the selected collections and their vector models are consistent, and check the values in the search parameter panel item by item
- Open the citation superscripts in the conversation, check against the source documents whether each citation can point back to the original text paragraph, and record inconsistent items

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
