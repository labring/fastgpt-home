---
title: Citations and Source Traceability for School Teacher Training Credits: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Checks
meta_description: Teacher Credits: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in credit management for primary and secondary school teacher training: training notices, credit recognition forms, and attendance rosters. A training notice is usually issued by the training organizer before the course starts, and states the project name, training dates, number of class hours, target participants, and registration method; a credit recognition form is filled out by the teacher's school or the training institution after the training ends, and contains the teacher's name, ID document number, training project, recognized credits, recognition date, and review signature; an attendance roster is produced by the host unit during the training period, and contains serial number, name, unit, sign-in date, and receipt signature. The three types of materials are updated at different rhythms: the notice comes first, the roster rolls along with the training, and the recognition form is submitted in a batch after project completion. When the materials enter the knowledge base retrieval node, the notice and roster are used to verify attendance facts and dates, and the recognition form is used to verify the credit amount and signature; field names, date formats, and quantity units often differ across materials and must be compared field by field.

## Configuration and implementation checks

This step is performed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The discrepancy list must then be handled by a subsequent AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the project name, training start and end dates, number of class hours, and target participants are consistent with the credit recognition form | Open the citation marker to trace back to the original notice text, transcribe field by field, and compare with the recognition form; record the number of citations and the `quoteMaxToken` budget and verify them separately |
| Credit recognition form | Whether the teacher's name, number of recognized credits, recognition date, and review signature are consistent with the attendance roster | View the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled), and check the signature field and receipt of the recognition form; mark missing signatures or receipts separately |
| Attendance roster | Whether the name, unit, sign-in date, and serial number match the notice and recognition form | Use `quoteList` to expand the citation sources, and compare the dates and number of people in the roster and notice item by item; when versions are not synchronized, use the latest signing date as authoritative |
| Knowledge base retrieval node | The length of the cited content array matches the number of hit materials, and the flow still works when it is empty | Test-run with a question that has no matching materials, confirm that the array is empty while the chain continues; then open the citation marker to check the original passage |

## Three common errors

- Symptom: the same teacher's name is written with different characters in the notice and the recognition form, and the credit amount also does not match. Cause: the two materials were filled out by different handlers, and no field-level verification was done.
- Symptom: the attendance roster has been updated to the second version, but the recognition form still cites the first version's date. Cause: versions are not synchronized, and the old material was not removed from or marked in the knowledge base.
- Symptom: the recognition form lacks a review signature, and the attendance roster lacks a receipt. Cause: at project completion only electronic forms were collected and no signed documents were collected, so material archiving is incomplete.

## How to verify the setup

Feature acceptance: ask a question with original-text support, and check whether the citation array and marker can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still works.

Business test: use one real record to find a field inconsistent with the ledger, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

- Open the citation markers one by one, copy the names, quantities, and dates from the notice, recognition form, and roster into the same comparison table, and mark the inconsistent fields.
- List records missing signatures or receipts separately, submit them to the reviewer for confirmation, then write them back to the ledger, and check the source identifiers in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
