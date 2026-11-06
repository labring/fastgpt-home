---
title: Conversation Records and Traceability for Training Provider Admissions and Inquiry Follow-Up: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c043-f007
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Chat Records | Versions
meta_description: Training Admissions: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Training Provider Admissions and Inquiry Follow-Up: Maintain Document Versions and Changes

## What this category's data looks like

In the enrollment consultation conversion scenario at training institutions, materials mainly consist of enrollment brochures, consultation records, and trial class schedules. Sources are course consultant registration, academic affairs scheduling, and receipt archiving, and the update cadence rolls with changes to class terms, prices, and teaching staff. Enrollment brochures carry course names, class hours, class types, and dates; consultation records carry visit channels, communication points, and follow-up status; trial class schedules carry time, location, instructor, and signed receipt. When these three types of materials enter the conversation logs and auditing feature, each has a different role: enrollment brochures and trial class schedules serve as referenced content, while consultation records serve as session evidence, used to compare whether the names, quantities, and dates of the same record match across the two materials, and to check whether versions are in sync and whether signatures or receipts are complete.

## Configuration and implementation checks

This step is executed by the conversation records interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Course name, class hours, class type, and date fields must be consistent with the consultation records; the version number must be unique and old versions traceable | Page through by application and session dimension to retrieve all, verify the records corresponding to `chatId` and `dataId`, and compare the brochure fields with the referenced text |
| Consultation record | Visit channel, communication points, follow-up status, and date must match the trial class schedule; signatures or receipts must not be missing | Open a single record to verify the role and reference information in `value`, check the total record count total and response `code` of 200, and confirm that message roles correspond to the original conversation |
| Trial class schedule | Time, location, instructor, and receipt signature must be in sync with the brochure and consultation records; old version references must be traceable | Pull two consecutive pages to compare the offset and total record count, verify that the number of references equals the array length, and record the referenced text tokens separately without comparing equality |

## Three common errors

- Symptom: the course name, quantity, and date of the same record do not match between the enrollment brochure and the consultation record. Cause: the two are registered separately, and synchronization verification was not performed according to the principle of a unique current version.
- Symptom: an old version of the brochure is still referenced; a new class term is already in effect but the reference has not been updated. Cause: versions are not in sync, change records were not registered, and the old version is traceable but not marked as invalid.
- Symptom: the trial class schedule lacks a signature or receipt, and the consultation record has no corresponding confirmation. Cause: the receipt archiving step is missing, and registration and review did not compare field by field.

## How to verify the setup

Feature acceptance: page through by total record count total to retrieve all, sample one record to verify the role, reference information, and time, and confirm response `code` of 200 with message roles correspond to the original conversation.

Business test: change one piece of content and see whether the version number and reference are updated in sync.

- Page through by application and session dimension, pull two consecutive pages to compare the offset and total record count, and confirm that the number of records matches the total.
- Open a single record to verify the role, reference, and elapsed time fields, check that the number of references equals the array length, and record the referenced text tokens separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
