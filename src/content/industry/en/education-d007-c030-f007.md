---
title: Conversation Records and Traceability for Vocational School Student Internships: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c030-f007
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Chat Records | Review
meta_description: Student Internships: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational School Student Internships: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the vocational school student internship management scenario, and the materials include three types: internship agreements, internship plans, and internship logs. The agreement is signed by three parties: the school, the enterprise, and the student, with fields including position name, internship period, insurance terms, signatures, and dates; the plan is prepared by the supervising teacher, with fields including rotation arrangements, week numbers, mentors, and approval signatures; the log is filled in daily by the student, with fields including date, task content, work hours, enterprise mentor signature, and receipt. The three types of materials have different update rhythms: the agreement and plan are finalized before the internship begins, while the log is submitted daily or weekly. When the materials enter the conversation logs and auditing feature, the agreement and plan serve as the comparison baseline, and the log serves as the object being traced, to detect situations such as names, quantities, or dates of the same record not matching across the two materials, versions not being synchronized, or missing signatures or receipts.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), outputting the session message list and the total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system. The message list is not a version ledger of business materials; it serves only as conversation evidence for tracing the original records of exceptions.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the agreement fields, dates, and signatures are consistent across the three types of materials | Take the agreement scan and conversation records, check the position name, internship period, signatures, and dates, and see whether the name, quantity, and date of the same record match |
| Internship plan | Whether the plan fields, dates, and signatures are synchronized with the agreement and log | Compare the rotation week numbers and mentors in the plan with the log dates, and check for situations where versions are not synchronized or approval signatures are missing |
| Internship log | Whether the log fields, dates, and signature receipt are complete | Pull the session message list by `chatId`, use `dataId` to locate a single record, view the references and elapsed time in `value`, and check the signature and receipt |
| Conversation record interface | Whether the total record count, roles, and reference information can support tracing | Page through by application and session dimension to retrieve all records, check the total record count total and response `code` of 200, and sample one record to check the role, reference information, and time |

## Three common errors

- Symptom: The position name and date of the same internship record do not match between the agreement and the log. Cause: The two materials were entered separately, and no field-level comparison was performed.
- Symptom: After the internship plan is updated, the log is still filled in according to the old version. Cause: The versions are not synchronized, and no associated check was established between the plan and the log.
- Symptom: The log is missing the enterprise mentor's signature or receipt. Cause: The signature field was not validated at the submission step, and the omission was only discovered during review.

## How to verify the setup

Feature acceptance: Page through by total record count to retrieve all records, sample one record to check the role, reference information, and time, and confirm that `_id`, `dataId` and `value` can locate the source message.

Business test: Create an exception record, see whether it can be traced back to the source material, and compare the fields, dates, and signatures of the agreement, plan, and log.

- Page through by application and session dimension, pull two consecutive pages and compare the total record count and offset, and confirm that the number of records matches the total.
- Open a single record to check the role field and the reference and elapsed time fields, and confirm that message roles correspond to the original conversation and that the reference information is complete.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
