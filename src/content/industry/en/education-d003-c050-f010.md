---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Intake
meta_description: Foreign Teachers: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

This category covers foreign teacher appointment and course scheduling. Materials include appointment contracts, work permit materials, course schedules, as well as intake questions and follow-up items to be completed. Contracts focus on appointment period, position, compensation, and signature page; work permit materials focus on permit number, validity period, issue date, and receipt; course schedules focus on course name, week number, class hours, and scheduling signature. When these three types of materials enter Q&A intake and missing-item follow-up, each plays a different role: contracts and permit materials are used to determine the appointment relationship and compliance dates, course schedules are used to determine class hours and scheduling conflicts, and intake questions are used to expose missing items. Materials exist as both scanned copies and tables, with fields including name, quantity, date, signature, and version number. The update cadence rolls with the appointment period and semester, and it is common for the same record to have mismatched name, quantity, or date across two materials, unsynchronized versions, or missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The intake record and the follow-up items to be completed are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Check whether the appointment start and end, position name, compensation quantity, and signature page are complete, and whether the same record is consistent with the work permit materials | Compare the name, quantity, and date field by field between the contract and the permit materials, and record where signatures or receipts are missing |
| Work permit materials | Check whether the permit number, validity period, issue date, and receipt are complete, and whether the version is synchronized with the contract | Open the citation marker to point back to the original paragraph, and verify the source identifier in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Course schedule | Check the course name, week number, class hours, and scheduling signature, and whether the quantity and date of the same course match across the two materials | Run a test with a question that has no matching materials, and confirm that the citation array is empty while the chain continues |
| Intake questions and follow-up items to be completed | Check whether missing items are identified and followed up, and whether the answer has material support | Ask a question missing key information, see whether it follows up first before answering, and then check the number of entries in the citation array |

## Three common errors

- Symptom: the name, quantity, or date of the same record does not match between the contract and the permit materials. Cause: the two materials were entered separately, and no field-level comparison was performed.
- Symptom: the course schedule version is not synchronized, and the old week number is still cited. Cause: the old version of the material in the knowledge base was not replaced after the update.
- Symptom: the contract is missing a signature or receipt, but the answer still gives an appointment conclusion. Cause: the retrieved matching snippet does not cover the signature page, and the missing item was not followed up.

## How to verify the setup

Acceptance for this feature: ask an appointment or course question that has original text support, and check whether the citation array and markers can point back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality, and the array entry count is recorded separately.

Business test: ask a question missing key information, and see whether it follows up first before answering.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and compare the cited snippets against the source documents to check whether they correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
