---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Intake
meta_description: Training Schedules: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the class scheduling and class-hour consumption scenario of training institutions. The materials include three types: class schedules, class-hour consumption records, and class adjustment requests. The class schedule carries the course name, class, teacher, classroom, week number, and period, and is the master record for scheduling; the class-hour consumption record carries actual attendance, leave requests, make-up classes, class-hour deductions, and signed receipts, and is the evidence of consumption; the class adjustment request carries the original session, target session, reason for adjustment, and approval signature, and is the basis for changes. The three types of materials are updated on a rolling basis by semester and week number. After a class adjustment is approved, the class schedule and class-hour consumption records must be refreshed in sync. When the materials enter the citation output of the knowledge base retrieval node, each is recalled as a retrievable fragment, providing the source-text basis for Q&A intake and missing-item follow-up.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing a source-text fragment and a source identifier, and the length may be 0. The intake record and the completed follow-up questions are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Fields include course name, class, teacher, classroom, week number and period; the date and signature fields must be consistent with the class adjustment request | Check whether the course name, class, and original session date in the class schedule and the class adjustment request correspond item by item, and check whether the approval signatures are complete |
| Class-hour consumption record | Fields include attendance status, class-hour deduction, make-up class flag, signature or receipt; the quantity and date must match the class session in the class schedule | Compare the class, date, and class-hour quantity of the class-hour consumption record and the class schedule for the same session, and check whether the signature or receipt exists |
| Class adjustment request | Fields include original session, target session, reason for adjustment, approval signature; the version must be the latest and in sync with the class schedule | Check whether the target session in the class adjustment request has been written into the class schedule, and check whether the version dates and approval signatures of the two materials are in sync |
| Citation content output | The number of returned entries is consistent with the matched materials, and being empty is also normal; `quoteMaxToken` is the content budget, and the number of array entries is recorded separately | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues; open the citation badge to compare with the source document, and check the source-text fragment in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The class name and class-hour quantity for the same session do not match between the class schedule and the class-hour consumption record. Cause: The two materials are entered in different steps and the fields are not aligned by the same session identifier.
- Symptom: The class adjustment request has been approved, but the class schedule and class-hour consumption record still show the original session. Cause: The versions are not in sync, and the change has not been written back to each material.
- Symptom: The class-hour consumption record lacks a signature or receipt, but the Q&A still gives a conclusion about deducting class hours. Cause: The missing item was not identified and followed up on, and the system proceeded directly to answering.

## How to verify the setup

Acceptance of this feature: ask a question that has source-text support, and check whether the citation array and badge can point back to the source text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Check that `quoteMaxToken` is the content budget and the number of citations is the array length, and do not compare the two for equality.

Business test: submit a question that lacks key information, and see whether it follows up first before answering.

- Open the citation badge, compare item by item with the source document, and check whether the source-text fragment in `quoteList` and the source identifier are consistent.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the pipeline continues, and separately record the number of array entries and the value of `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
