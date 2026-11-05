---
title: Conversation Records and Traceability for Graduate Education Process Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c025-f007
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Chat Records | Progress
meta_description: Graduate Education: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Graduate Education Process Management: Track Progress and Check Statistics

## What this category's data looks like

Graduate training process management involves three types of materials: training plans, proposal reports, and mid-term assessment forms. The sources are supervisors, school secretaries, and graduate students themselves, and the update cadence advances by semester and by milestone. A training plan contains fields for courses, credits, and time arrangements; a proposal report contains the title, date, and supervisor signature; a mid-term assessment form contains the assessment conclusion, date, and signature field. When these three types of materials enter the conversation logs and auditing feature, each plays a different role: the training plan serves as the progress baseline, the proposal report serves as milestone evidence, and the mid-term assessment form serves as the stage conclusion. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. If any one of these categories differs between two materials, the totals in the progress table and the statistical scope description will not reconcile.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | Course names, credit quantities, start and end dates, and the signature field must be aligned item by item with the proposal report and mid-term assessment form | Pull session messages by `chatId`, and check whether the course names and date fields are consistent with the two materials |
| Proposal report | The title, proposal date, and supervisor signature must be consistent in name and date with the training plan and mid-term assessment form | Use `dataId` to locate a single record, and check whether the role field and reference information correspond |
| Mid-term assessment form | The assessment conclusion, assessment date, and signature receipt must be consistent in quantity and date with the training plan and proposal report | View the duration and reference of a single record by `value`, and check whether the signature and receipt are complete |
| Conversation record interface | The total record count and pagination offset match, the status code is 200, and each message has an identified role | Pull two pages consecutively and compare total with offset; sample one record and check the role, reference information, and time |

## Three common errors

- Symptom: The course names and credit quantities of the same record do not match between the training plan and the mid-term assessment form. Cause: The two materials are registered separately and are not checked against the same scope.
- Symptom: The proposal report date and the mid-term assessment form date are inconsistent, and the versions are not synchronized. Cause: After one material is updated, the other is not written back, resulting in date misalignment.
- Symptom: The mid-term assessment form lacks a supervisor signature or receipt, but the statistical total still includes it. Cause: The signature field is not used as a verification condition, and exceptions are not clearly stated in the table header.

## How to verify the setup

Feature acceptance: page through and retrieve all records by total record count, sample one record and check the role, reference information, and time, and confirm that the message identifiers and content fields `_id`, `dataId` and `value` can locate the corresponding record.

Business test: use one week of records to check the totals, see whether the scope and exceptions are clearly stated, and whether the total record count and statistical count reconcile.

- Pull page by page by application and session identifier, compare the total record count with the offset, and confirm that the status code is 200 and no pages are missing.
- Open a single record and check the role field, reference information, and duration; record the reference count separately by array length, and check reference text tokens separately from the budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
