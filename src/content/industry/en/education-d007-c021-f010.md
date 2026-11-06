---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Review
meta_description: Graduation Eligibility: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the scenarios of student status changes and graduation qualification audits, involving three types of materials: leave-of-absence and return-to-school applications, major transfer applications, and graduation audit checklists. Leave-of-absence and return-to-school applications carry the reason for the change and the effective semester; major transfer applications record the transferring-in and transferring-out majors and approval nodes; graduation audit checklists summarize course credits and graduation conclusions. When these three types of materials enter the knowledge base retrieval node, each participates in recall as an independent citation source, providing fields, dates, and signature information respectively. The material update cadence is synchronized with student status batches, with concentrated submissions at the beginning of the semester and rolling supplements during the audit period. Field characteristics include student identifier, change type, original major and target major, course name, credit count, effective date, approver signature, and receipt number. The name, quantity, and date of the same record often appear inconsistent across two materials. When versions are not synchronized or signature receipts are missing, it is necessary to use citation sources to trace back to the original passages, providing verifiable material evidence for exception tracing and manual review.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text fragment and source identifier, and the length can be 0. The "exception list and review conclusion" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-school application | Fields and dates must be consistent with the student status batch, signatures and receipts must be complete, and the change type and original major information can be traced back to the original text | Verification action: compare the original text fragments of the leave-of-absence and return-to-school application one by one in the citation array, check whether the student identifier, change type, effective date, and approval signature match those in another material, and record `quoteList` and the source identifier |
| Major transfer application | The names of the transferring-in and transferring-out majors, course counts, and approval dates should be consistent across the two materials, and versions must be synchronized | Verification action: open the citation marker to trace back to the original passage of the major transfer application, compare the major names and dates, and if the names or counts do not match, mark them as pending review, and check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Graduation audit checklist | Course names, credit counts, graduation conclusions, and signature receipts must corroborate each other with the leave-of-absence/return-to-school and major transfer records | Verification action: compare the citation fragments of the graduation audit checklist item by item with the change records, confirm that the credit counts and graduation conclusions are supported by original records, the citation content budget is controlled by `quoteMaxToken`, and the array length is recorded separately |
| Citation content array | The number of returned entries is consistent with the matched materials; being empty is also normal, and the output pipeline continues to run through | Verification action: run a test with a question that has no matching materials, confirm that the array is empty while the pipeline continues, then check whether the number of citations and citation markers under a question with original text evidence can trace back to the original text |

## Three common errors

- Phenomenon: The name or date of the same student does not match between the leave-of-absence and return-to-school application and the graduation audit checklist. Cause: The two materials are entered by different nodes, versions are not synchronized, the citation fragment only hits one of them, and the other does not participate in recall.
- Phenomenon: The course count in the major transfer application is inconsistent with the credit count in the graduation audit checklist. Cause: The material update cadences differ, the old version remains in the knowledge base, and the citation source points to an unsynchronized old passage.
- Phenomenon: The citation array is empty but an answer is still generated, or the citation fragment does not match the original text. Cause: No materials were hit in this round, which is a normal empty array; if it does not match, first check the hit materials and trimming settings, and do not directly attribute it to length trimming.

## How to verify the setup

Feature acceptance: ask a student status change question with original text evidence, and check whether the citation array and citation markers can trace back to the original text of the leave-of-absence and return-to-school application or the graduation audit checklist; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and check that `quoteMaxToken` only constrains the citation text budget while the array length is recorded separately.

Business test: create an exception record, see whether it can be traced to the source material, confirm that the exception is supported by original records and the reviewer's signature, and then hand it over to the person in charge for handling.

- Open the citation markers, compare them one by one against the original text of the leave-of-absence and return-to-school application, major transfer application, and graduation audit checklist, check whether the fields, dates, and signatures are consistent, and record `quoteList` and the source identifier.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the pipeline continues, then check that the number of citations in `responseData` and the `quoteMaxToken` budget are recorded separately, and do not compare the two as equal.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
