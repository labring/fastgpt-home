---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Review
meta_description: Training Schedules: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Trace Exceptions and Review Results

## What this category's data looks like

This category's data for training institution scheduling and class-hour deduction includes three types of materials: class schedules, class-hour deduction records, and schedule change requests. Class schedules are updated weekly or monthly and record class, course, teacher, classroom, class date, and time slot; they serve as the scheduling baseline. Class-hour deduction records are generated after each class and carry the student, course, deducted class hours, teaching teacher, and signature or receipt; they serve as the class-hour deduction evidence. Schedule change requests are submitted when a change occurs and include the original class session, target class session, reason for the change, applicant, and approver signature; they serve as the basis for changes. After these three types of materials enter the knowledge base retrieval node, each participates as a citation source in exception tracing: class schedules are used to verify class sessions and time slots, class-hour deduction records are used to verify the number of class hours and signatures, and schedule change requests are used to verify whether changes are synchronized. The field characteristics are four types: date, name, quantity, and signature. The update rhythm is synchronized with business occurrences, and the latest approved document is taken as the authoritative version.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length can be 0. The "exception list and review conclusion" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether the class session, class, course, teacher, classroom, class date, and time slot are consistent with the class-hour deduction record | Open the citation marker to trace back to the original class schedule text, compare the class session and date item by item, and record the differing fields and source identifier |
| Class-hour deduction record | Whether the student, number of deducted class hours, teaching teacher, and signature or receipt are complete and correspond to the class schedule | Check the quantity and signature column in the cited fragment, confirm that each citation can trace back to the original text paragraph, and separately mark missing signatures |
| Schedule change request | Whether the original class session, target class session, reason for the change, and approver signature are synchronized with the class schedule and class-hour deduction record | Compare the application date and approval signature in the citation source, and check whether the version is synchronized to the latest approved document |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues; record the array length and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: The course name or date for the same class session does not match between the class schedule and the class-hour deduction record. Cause: The two materials are entered separately, are not linked by the same class session number, and the citation source does not trace back to the original text.
- Symptom: The schedule change request has been approved, but the class schedule and class-hour deduction record are still the old version. Cause: The version is not synchronized, the cited fragment is taken from the old material, and the latest approved document is not checked.
- Symptom: The class-hour deduction record lacks a signature or receipt but still enters the review conclusion. Cause: The citation array only presents the original text fragment, does not mark the missing signature, and manual review does not trace back to the original text item by item.

## How to verify the setup

Acceptance of this feature: ask a question with original-text evidence, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Check the number of citations and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled), and confirm that the original text fragments in `quoteList` are consistent with the source documents.

Business test: create an exception record and see whether it can be traced to the source materials. Put the class schedule, class-hour deduction record, and schedule change request into the knowledge base separately, retrieve the exception class session, check whether the citation array can trace back to the original text of the three types of materials, record the array length, and separately check the `quoteMaxToken` budget without doing an equality comparison.

- Open the search parameter panel and check item by item, confirming that the associated knowledge base uses the same vector model, that the number of citation content output items is consistent with the matched materials, and that the pipeline continues when it is empty.
- Open the citation markers in the conversation, compare them against the source documents, check item by item whether the cited fragments correspond to the original text paragraphs, record the differing fields and source identifiers, and hand them to the responsible person for handling.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
