---
title: Conversation Records and Traceability for Training Provider Scheduling and Lesson Records: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c044-f007
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Chat Records | Review
meta_description: Training Schedules: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Training Provider Scheduling and Lesson Records: Trace Exceptions and Review Results

## What this category's data looks like

Training institution academic scheduling and class-hour deduction daily produce three types of materials: class schedules, class-hour deduction records, and schedule-change applications. Class schedules come from academic-system scheduling, class-hour deduction records are registered by the teaching end or front desk, and schedule-change applications are submitted by teachers or academic affairs, with the three linked by date and student name. The material update cadence is once after each class, once after each schedule change, and once before daily closing. Field characteristics center on student name, course name, number of class hours, class date, teacher signature, and receipt number. When entering the conversation logs and audit function, the class schedule serves as baseline scheduling evidence, the class-hour deduction record serves as the actual consumption voucher, and the schedule-change application serves as the basis for changes; each assumes a different role and together they support exception tracing and manual review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and reference information. The "exception list and review conclusion" is then completed by a human or an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | The five items—student name, course name, number of class hours, class date, and teacher signature—are complete, and each item matches the class-hour deduction record | Take the class schedule and class-hour deduction record for the same student on the same date, and compare name, quantity, date, and signature field by field |
| Class-hour deduction record | Each class-hour deduction record can be traced to the corresponding class schedule and schedule-change application, and the signature and receipt number are not missing | Look up the class-hour deduction record by date and student name, and check whether the signature field and receipt number are filled in |
| Schedule-change application | The post-change class schedule version is synchronized with the class-hour deduction record, and the application form has an approval signature | Retrieve the schedule-change application form, and compare the date and number of class hours with the latest class schedule and class-hour deduction record |
| Conversation record | The total record count matches the number of items pulled by pagination, and a single record contains role and reference information | Page through by `chatId` to retrieve all, open one record to check `dataId` and `value`, and confirm that the total record count total and response `code` of 200 match |

## Three common errors

- Symptom: the same class has different course name spellings in the class schedule and the class-hour deduction record. Cause: the two materials are registered by different roles, and naming has not been unified, so the source cannot be matched during exception tracing.
- Symptom: the schedule-change application has been approved, but the class-hour deduction record is still registered according to the original class schedule. Cause: the version was not synchronized, and after the schedule change it was not written back to the class-hour deduction end, causing deviations in quantity and date during review.
- Symptom: the class-hour deduction record lacks a teacher signature or receipt number. Cause: omissions during post-class supplementary entry, so manual review cannot confirm actual consumption, and the exception list lacks original record support.

## How to verify the setup

This function's acceptance: page through by total record count to retrieve all, sample one record to check role, reference information, and time, and confirm that the total record count total and response `code` of 200 match.

Business test: create an exception record and see whether it can be traced to the source materials, that is, from the class-hour deduction record to the class schedule and schedule-change application, and check the signature and receipt.

- Page through the session message list by `chatId` and `dataId`, and compare the total record count and offset to ensure complete retrieval without omission.
- Open a single record to check the reference and elapsed-time fields in `value`, confirm that the reference count is recorded by array length, and check the reference text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
