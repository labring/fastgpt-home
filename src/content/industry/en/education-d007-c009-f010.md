---
title: Citations and Source Traceability for Compulsory Education Dropout Prevention: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c009-f010
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Citations | Review
meta_description: Dropout Prevention: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Compulsory Education Dropout Prevention: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the compulsory education dropout prevention and control scenario. The materials include three types: dropout risk ledgers, persuasion-to-return records, and home visit records. The ledger records students' basic information, risk level, responsible person, handling date, and signature field; the persuasion-to-return record contains the persuasion time, participants, persuasion result, and parent receipt; the home visit record contains the home visit date, visiting teacher, family situation description, and parent signature. The three types of materials are updated weekly or monthly, and field names, date formats, and signature positions often differ. When entering the knowledge base retrieval node, the three types of materials serve as documents in the associated knowledge base and, after vector search, are output as a cited content array. Each citation contains the original text snippet and source identifier, for subsequent nodes or manual comparison of fields and source tracing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each item containing the original text snippet and source identifier, and the length may be 0. The exception list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether the fields, dates, and signatures are consistent with the persuasion-to-return records and home visit records | Locate the original ledger snippet in the citation array, verify the risk level, responsible person, handling date, and signature field, and compare them item by item with the corresponding fields in the persuasion-to-return records and home visit records |
| Persuasion-to-return record | Whether the persuasion time, participants, result, and parent receipt match the ledger and home visit records | Open the citation marker to point back to the original paragraph of the persuasion-to-return record, verify whether the persuasion date is consistent with the ledger handling date, and check whether the receipt signature is missing |
| Home visit record | Whether the home visit date, visiting teacher, and parent signature are synchronized with the ledger and persuasion-to-return records | Use the home visit date in the cited snippet as an anchor, compare it with the ledger registration date and the persuasion-to-return record date, and confirm the specific location where the version is not synchronized or the signature is missing |
| Cited content output | The number of citations is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output array is empty while the pipeline continues; verify the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled), record the number of items separately, and check the tokens budget for the cited text in `quoteMaxToken`; do not compare the two for equality |

## Three common errors

- Symptom: the same student's name or headcount does not match between the ledger and the persuasion-to-return record. Cause: the two materials were filled in by different personnel at different times without cross-checking, and the name spelling and statistical criteria are inconsistent.
- Symptom: the home visit record date differs from the ledger handling date by several days, and the versions are not synchronized. Cause: the ledger was not backfilled in time after the home visit, or the ledger update was not synchronized to the persuasion-to-return record, causing the date chain to break.
- Symptom: the persuasion-to-return record lacks the parent receipt signature, and the home visit record lacks the teacher's signature. Cause: the signature step was not closed-loop, the signature field was not checked before archiving the materials, and the reviewer cannot confirm that the handling action has been completed.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and verify whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Check whether the cited snippets in `quoteList` correspond to the source documents, record the number of items in the array, and check the tokens budget for the cited text in `quoteMaxToken`.

Business test: create an exception record and see whether it can be traced to the source material. The node only outputs the cited content array; the exception list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work. Verify whether the cited snippets can locate the original text of the ledger and persuasion-to-return record, and confirm that the exception is supported by original records and the reviewer's signature.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, keeping them consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
