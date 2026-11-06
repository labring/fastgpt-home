---
title: Conversation Records and Traceability for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c021-f007
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Chat Records | Review
meta_description: Graduation Eligibility: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the category of student status changes and graduation eligibility audits. The materials come from three types of forms: leave-of-absence and return-to-study applications, major transfer applications, and graduation audit checklists. Leave-of-absence and return-to-study applications record the start and end dates of student status changes and approval signatures; major transfer applications carry department flow and course substitution information; graduation audit checklists summarize credits, required courses, and graduation conclusions. The three types of materials play different roles in exception tracing: leave-of-absence and return-to-study applications and major transfer applications are process-based evidence, while graduation audit checklists are conclusive evidence. The materials are updated with each semester batch, and the fields include name, student ID, change type, effective date, signature field, and receipt number. The name, quantity, and date of the same record often fail to match across the three materials, and when versions are not synchronized, signatures or receipts are missing. The conversation log and audit feature is responsible for retaining session evidence for manual or external system registration, export, and review.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs a session message list and the total record count, including role and reference information. The "exception list and review conclusion" is then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as session evidence for tracing.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-study application | Fields include name, student ID, change type, effective date, and signature field; the date and signature must be consistent with the major transfer application and graduation audit checklist | Pull the session records by `chatId`, check the effective date and signature field on the application form, and compare whether the change type for the same student ID is consistent across the three materials |
| Major transfer application | Fields include original department, target department, course substitution, approval date, and receipt number; the name and quantity must match the graduation audit checklist | Use `dataId` to locate a single message, check the course substitution quantity against the credit records in the graduation audit checklist, and verify whether the receipt number exists |
| Graduation audit checklist | Fields include total credits, required course completion status, graduation conclusion, and signature date; the version must be synchronized with the leave-of-absence and return-to-study application | Page through to retrieve the full record total, sample one record to check the role and reference information, and compare the graduation conclusion date with the effective date in the leave-of-absence and return-to-study application |
| Conversation record interface | Returns response `code` of 200 and the list contains both question and answer roles, with reference and latency fields visible | Open a single record to view the reference and latency in `value`, and confirm that the array count and the reference text are recorded separately |

## Three common errors

- Symptom: the name or student ID of the same student does not match between the leave-of-absence and return-to-study application and the graduation audit checklist. Cause: the two materials were entered in different batches, versions were not synchronized, and there is no unified receipt number.
- Symptom: the number of course substitutions in the major transfer application is inconsistent with the number of credit records in the graduation audit checklist. Cause: after course substitution approval, it was not written back to the checklist, or the checklist version predates the application version.
- Symptom: an exception record can be traced to the session but not to the original signed materials. Cause: the conversation log retains only messages and references; business signatures and receipts are not retained with the session and must be manually supplemented.

## How to verify the setup

This feature's acceptance: page through using the total record count to retrieve all records, sample one record to check the role, reference information, and time, and confirm response `code` of 200 and that the list contains both question and answer roles.

Business test: create an exception record, see whether it can be traced to the source materials, and check whether the name, quantity, and date are consistent across the leave-of-absence and return-to-study application, major transfer application, and graduation audit checklist.

- Pull two pages in succession and compare the offset and total to confirm that the record count matches the total, avoiding retrieving only the first page.
- Open a single record to check the reference and latency in `value`, record the number of reference array items separately, and do not compare it for equality with the reference content budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
