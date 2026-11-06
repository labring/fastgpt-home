---
title: Citations and Source Traceability for School Teacher Training Credits: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c013-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Citations | Intake
meta_description: Teacher Credits: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Teacher Training Credits: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on credit management for primary and secondary school teacher training. The materials come from three types: training notices, credit recognition forms, and attendance rosters. Training notices provide the project name, start and end dates, and class-hour arrangements; after entering the feature, they serve as citation sources for answering questions about credit rules and time definitions. Credit recognition forms carry the trainee, recognized credits, signature, and date, and are the key basis for determining missing items and follow-up questions. Attendance rosters record name, unit, subject, and attendance, and are used to compare whether the name, quantity, and date of the same record are consistent across the two materials. The update rhythm advances with training batches: notices are issued first, rosters roll with registration and attendance, and recognition forms are archived after project completion. Field characteristics center on name, ID number, project name, class hours, credits, date, signature, and receipt. When the materials enter this feature, each serves as a searchable citation source and does not directly generate a ledger; missing items and follow-up questions are completed in subsequent steps based on the cited content.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "intake records and completed question items" are then handled by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the project name, start and end dates, class hours, and signature field are consistent with the credit recognition form | In the node, check the selected knowledge base and vector model, open the citation marker, and compare it against the original paragraphs of the notice |
| Credit recognition form | Whether the trainee name, recognized credits, date, and signature match the attendance roster | Compare item by item the name, quantity, and date of the same record in the two materials, and mark as pending supplementation when the signature or receipt is missing |
| Attendance roster | Whether name, unit, subject, and attendance are synchronized with the versions of the notice and recognition form | Run a test with a question that has no matching material, and see whether the citation array is empty while the chain continues |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Record the array length, and separately look at the citation text budget of `quoteMaxToken`; do not compare the two for equality |

## Three common errors

- Symptom: The project name, class hours, or date of the same record do not match between the notice and the recognition form. Cause: The two materials are filled in by different steps, and no field comparison or version synchronization was performed.
- Symptom: The attendance roster has been updated, but the recognition form is still the old version, and the name or credit quantity is inconsistent. Cause: The versions were not synchronized, and the latest roster and notice were not checked during archiving.
- Symptom: The recognition form lacks a signature or receipt, but the answer still treats it as recognized. Cause: The missing item was not identified and followed up, and the material basis is incomplete.

## How to verify the setup

Feature acceptance: ask a question with original-text support, and check whether the citation array and citation marker can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and inspect the cited content in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Business test: ask a question that lacks key information, and see whether it first asks a follow-up question before answering.

- In the node, check the selected knowledge bases and their vector models, open the search parameter panel, and verify the values item by item.
- Run a test with a question that has no matching material, record the citation array length and the `quoteMaxToken` budget, and check the citation fragments against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
