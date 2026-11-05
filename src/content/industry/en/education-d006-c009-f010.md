---
title: Citations and Source Traceability for Compulsory Education Dropout Prevention: Track Progress and Check Statistics
slug: /en/industry/education-d006-c009-f010
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Citations | Progress
meta_description: Dropout Prevention: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Compulsory Education Dropout Prevention: Track Progress and Check Statistics

## What this category's data looks like

This category's data mainly consists of three types of materials in the technical center: dropout risk ledgers, persuasion-to-return records, and home visit records. The ledger uses students as rows and contains risk level, responsible teacher, follow-up date, and signature column; it is the main table for progress records. Persuasion-to-return records are registered per instance and contain persuasion time, participants, result, and receipt. Home visit records are registered per household visit and contain home visit date, parent signature, and image or receipt number. Materials are usually summarized weekly or monthly into weekly reports and monthly reports, and the update cadence is synchronized with the occurrence of persuasion-to-return and home visits. When the three types of materials enter the knowledge base retrieval node, each plays a different role: the ledger provides the number of records and statistical criteria, persuasion-to-return records provide the number of instances and results, and home visit records provide signatures and receipt evidence. In terms of fields, student name or ID, date, quantity, and signature are the verification anchors; when versions are not synchronized, the same record in two materials can easily fail to match.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "progress table and statistical criteria description" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields include student ID, risk level, follow-up date, responsible teacher, and signature; only when date and signature are complete can it be counted in the statistical criteria | Extract ledger rows, check whether the number of records and the statistical count are consistent, and inspect the date and signature columns |
| Persuasion-to-return record | Fields include persuasion time, participants, result, and receipt number; multiple persuasion attempts for the same student must be counted per instance, and names and dates must align with the ledger | Compare the number of persuasion attempts with the ledger records by student ID, and check whether receipts are missing |
| Home visit record | Fields include home visit date, parent signature, and image or receipt number; when signature and receipt are missing, they must be listed as exceptions in the criteria description | Check home visit dates and signatures one by one, and mark entries missing signatures or receipts |
| Citation content output | Output as an array, length can be 0; the number of returned items matches the materials hit, and being empty is also normal | View `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and confirm that `quoteMaxToken` only constrains the citation text budget, while the number of array items is recorded separately |

## Three common errors

- Phenomenon: the name, quantity, and date for the same student do not match between the ledger and the persuasion-to-return record. Cause: the two materials are registered separately, are not aligned by student ID, and their update cadences are not synchronized.
- Phenomenon: the home visit record is missing the parent signature or receipt number. Cause: after the household visit, the signature was not supplemented in time, or the receipt was not archived, and it was included in the total during statistics.
- Phenomenon: the cited fragment does not match the original text. Cause: this round did not hit that material, or it hit another record, and this cannot be directly attributed to length truncation.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and footnote markers can point back to the original paragraph; then ask a question with no matching material, confirm that the array is empty while the pipeline still runs through, and view `responseData`, `quoteList`, and `quoteMaxToken`.

Business test: use one week of records to verify the total, and see whether the criteria and exceptions are clearly written.

- Open the search parameter panel and check the values item by item, confirming that the selected knowledge base uses the same vector model.
- Open the citation footnote markers in the conversation, compare them against the source documents, and confirm item by item that the citations can point back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
