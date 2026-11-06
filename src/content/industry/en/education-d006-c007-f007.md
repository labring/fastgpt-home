---
title: Conversation Records and Traceability for School Enrollment Records and Status Changes: Track Progress and Check Statistics
slug: /en/industry/education-d006-c007-f007
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Chat Records | Progress
meta_description: School Enrollment: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Enrollment Records and Status Changes: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of primary and secondary school student status establishment and changes. The materials include three categories: student status archives, transfer applications, and suspension/resumption materials. Student status archives record students' basic information and student status; transfer applications carry the application and approval information for cross-school mobility; suspension/resumption materials record the evidence for suspending and restoring student status. These materials enter the conversation record interface in the form of tables and attachments, and are retained by application and session dimension as a session message list and a total record count. The update cadence is once a week, with a summary verification at the end of each month. Field characteristics center on student name, student status number, change type, change date, approval signature, and receipt number. The three categories of materials are each retained as independent session evidence in the feature, for manual or external system registration, export, and review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs a session message list and a total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status archive | Student name, student status number, change date, and approval signature are consistent within the archive | Check the archive fields and signature column, and compare whether the name and date of the same record are consistent between the archive and the application |
| Transfer application | The transfer application matches the student status archive in name, quantity, and date | Check the fields and dates of the transfer application and the archive, and check whether the receipt number is complete |
| Suspension/resumption materials | The suspension/resumption materials are consistent with the student status archive in change type, date, and signature | Check the fields and signatures of the suspension/resumption materials and the archive, and check whether the versions are in sync |
| Session records | The total record count matches the number of items per page, and the role and reference information are complete | Page through to retrieve all records according to the total record count, use `chatId` and `dataId` to locate a single record, and open `value` to check the role, references, and elapsed time |

## Three common errors

- Symptom: The name and date of the same student do not match between the student status archive and the transfer application. Cause: The two materials are registered separately, without field comparison and version synchronization.
- Symptom: The suspension/resumption materials lack an approval signature or receipt number. Cause: The signature page was not returned during the material circulation process, and the signature column was not checked during registration.
- Symptom: The interface returns empty but there are sessions in the UI. Cause: The sources of the application and session identifiers are inconsistent, or only the first page was retrieved without paging through according to the total record count.

## How to verify the setup

Feature acceptance: Page through to retrieve all records according to the total record count, and sample one record to check the role, reference information, and time; use `_id`, `dataId` and `value` to locate a single record, and confirm that the response `code` of 200 matches the total record count total.

Business testing: Use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated; record the reference count separately by array length, and verify the tokens of the reference text against the reference content budget using `quoteMaxToken`.

- Check the two identifier sources against the application and session identifiers, and pull two consecutive pages to compare the total record count and offset.
- Open one record to check the role field, reference, and elapsed time fields, and confirm that message roles correspond to the original conversation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
