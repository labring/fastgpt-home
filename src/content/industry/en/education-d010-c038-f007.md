---
title: Conversation Records and Traceability for Continuing Education Training Hour Recognition: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c038-f007
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Chat Records | Operations
meta_description: Continuing Education: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Continuing Education Training Hour Recognition: Coordinate Operations and Application Handover

## What this category's data looks like

The data for this category looks like this: Continuing education credit hour recognition involves three types of materials: course filing forms, study certificates, and credit hour recognition forms. Course filing forms come from the course-providing institution and record the course name, credit hours, teaching date, and institutional seal; study certificates are obtained by learners after completing study and include name, course, completion date, and institutional receipt; credit hour recognition forms are summarized by the recognizing unit and include recognized credit hours, recognition date, and handler signature. When the materials enter the conversation logs and auditing function, the course filing form provides the course and credit hour baseline, the study certificate provides the fact of completion, and the credit hour recognition form provides the recognition conclusion; the three are associated by the same learner and course. In terms of update cadence, filing forms are updated as courses are offered, study certificates are updated as study is completed, and recognition forms are updated by recognition batch. In terms of field characteristics, all three materials contain names, quantities, dates, and signatures, and must be aligned item by item.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Course name, credit hours, teaching date, and institutional signature must be consistent with the study certificate | Obtain the filing form and study certificate, compare course name, credit hours, and date item by item, and check whether the signature and receipt are complete |
| Study certificate | Completion date and institutional receipt must be consistent with the credit hour recognition form | Obtain the study certificate and recognition form, check the completion date, recognition date, and receipt, and confirm there are no missing signatures |
| Credit hour recognition form | Recognized credit hours, recognition date, and handler signature must align with the filing form and study certificate | Obtain the recognition form, filing form, and study certificate, check the recognized credit hours and date, and review the handler signature |
| Conversation record interface | Paginate by application and session dimension; the total record count and response `code` of 200 can be verified | Use `chatId` to page through and retrieve all records, check `dataId` and `value`, and compare total with offset |

## Three common errors

- Symptom: The course name, credit hour quantity, and date for the same learner do not match across two materials. Cause: The filing form and study certificate are registered separately and are not aligned by the same learner and course.
- Symptom: Material versions are not synchronized, and the recognition form uses an old version of the filing form. Cause: After the course filing is updated, it is not synchronized to the recognition step, and the handover form does not record the version.
- Symptom: The study certificate lacks an institutional receipt, and the recognition form lacks a handler signature. Cause: During handover, signatures and receipts were not checked item by item, so the records are incomplete.

## How to verify the setup

Acceptance of this function: Page through and retrieve all records according to the total record count, and sample one record to check the role, reference information, and time; check `_id`, `dataId` and `value`, and confirm that response `code` of 200 matches total.

Business test: Check item by item once according to the handover form, see which record is missing, and confirm that the names, quantities, dates, and signatures of the course filing form, study certificate, and credit hour recognition form are complete.

- Paginate and retrieve by application and session dimension, compare total with offset, and confirm that all records are retrieved and each message has an identified role.
- Sample one record and open `value`, check the number of references and reference text tokens, and record the array count separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
