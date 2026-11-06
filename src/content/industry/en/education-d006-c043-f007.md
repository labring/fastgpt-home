---
title: Conversation Records and Traceability for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics
slug: /en/industry/education-d006-c043-f007
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Chat Records | Progress
meta_description: Training Admissions: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Training Provider Admissions and Inquiry Follow-Up: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical verification for enrollment consultation conversion at training institutions draw on three sources: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures use class name, course cycle, start date, enrollment number, and signature field as fields, and are updated in batches; consultation records use consultation date, student name, intended class, follow-up status, and receipt as fields, and are updated daily; trial class schedules use trial date, student name, trial class, attendance status, and signature as fields, and are updated weekly. When these three materials enter the conversation logs and auditing function, the enrollment brochure serves as the version baseline, the consultation records serve as process evidence, and the trial class schedules serve as outcome corroboration, each playing a different role.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and total record count, including role and reference information. The "progress table and statistical criteria description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether class name, course cycle, start date, enrollment number, and signature field are consistent with consultation records and trial class schedules | Take the same class's name, quantity, and dates across the three materials and compare item by item, and check whether the signature field is complete |
| Consultation records | Whether consultation date, student name, intended class, follow-up status, and receipt are consistent with enrollment brochures and trial class schedules | Export consultation records weekly, cross-check with class names in enrollment brochures and student names in trial class schedules, and check receipts |
| Trial class schedules | Whether trial date, student name, trial class, attendance status, and signature are consistent with enrollment brochures and consultation records | Export trial class schedules weekly, cross-check with student names in consultation records and class names in enrollment brochures, and check signatures |
| Conversation record interface | Whether the number of records matches the total, and whether role and reference information are visible | Page through to retrieve all records by total count, sample one record to check role, reference information, and time, and verify `_id`, `dataId` and `value` |

## Three common errors

- Symptom: The same student's name and date do not match between consultation records and trial class schedules. Cause: The two materials are registered separately without cross-checking.
- Symptom: After the enrollment brochure is updated, consultation records still reference the old class name and old start date. Cause: Versions are not synchronized, and old materials continue to circulate.
- Symptom: Trial class schedules lack student signatures or receipts, and the follow-up status in consultation records cannot be closed. Cause: Signature and receipt steps are not included in verification.

## How to verify the setup

Acceptance of this feature: Page through to retrieve all records by total count, sample one record to check role, reference information, and time, verify `_id`, `dataId` and `value`, and confirm that the total record count total and response `code` of 200.

Business test: Use one week of records to verify the totals, and see whether the criteria and exceptions are clearly stated.

- Export consultation records and trial class schedules weekly, compare student names, class names, dates, and signatures item by item, and mark exceptions.
- Check whether the version number of the enrollment brochure is consistent with the versions referenced by consultation records and trial class schedules; if inconsistent, roll back to the latest version.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
