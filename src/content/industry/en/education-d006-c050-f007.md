---
title: Conversation Records and Traceability for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c050-f007
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Chat Records | Progress
meta_description: Foreign Teachers: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Foreign Teacher Recruitment and Course Scheduling: Track Progress and Check Statistics

## What this category's data looks like

Foreign teacher appointment and course scheduling involves three types of materials: appointment contracts, work permit materials, and course scheduling tables. Appointment contracts contain the position, appointment period, signature, and date; work permit materials contain the permit number, validity period, and receipt; course scheduling tables contain the course name, week number, class hours, and instructor. Materials are updated by semester or batch, and weekly and monthly reports need to align progress records with statistical criteria. When these three types of materials enter conversation logs and audit, each plays an evidentiary role: contracts and permit materials are used to verify the appointment relationship and the validity of qualifications, while course scheduling tables are used to verify class hours and the instructor correspondence. The conversation record interface pulls data by application and session dimensions, outputting a message list and the total record count, providing session evidence for manual registration and review.

## Configuration and implementation checks

The conversation record interface (by application and session dimensions) only outputs the session message list and the total record count, including role and reference information; the progress table and statistical criteria description must be done afterward by a human or an external system. This step does not write business ledgers; it only retrieves session evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Check whether the appointment contract fields, dates, and signatures are complete, and whether they are consistent with the name and date of the work permit materials | Pull records by application and session identifiers, check whether the contract name and permit material name have the same name and same date, and inspect the signature and receipt |
| Work permit materials | Check whether the permit number, validity period, and receipt correspond to the contract appointment period, and whether the versions are synchronized | Use `chatId` and `dataId` to locate the session, compare the permit validity period with the contract start and end dates, and view the receipt |
| Course scheduling table | Check whether the course name, week number, class hours, and instructor correspond to the contract position, and whether the quantities match | Page through to retrieve all records, open a single record by `value`, verify the course name and total class hours, and record the number of referenced items |
| Progress table and statistical criteria description | Check whether the total record count matches the statistical count, and whether the criteria are written in the header | Page through to retrieve all records by the total record count total, use one week of records to verify the total, and confirm complete retrieval with response `code` of 200 |

## Three common errors

- Symptom: The name and date of the same teacher do not match between the contract and the permit materials. Cause: The two materials are registered separately, versions are not synchronized, and there is no unified verification.
- Symptom: The total class hours in the course scheduling table do not match the statistical count in the progress table. Cause: The total record count is counted by number of messages, which is not the same quantity as the number of courses, and the criteria are not written in the header.
- Symptom: The work permit materials lack a signature or receipt. Cause: The material circulation step did not return them, and the signature and receipt fields were not verified during registration.

## How to verify the setup

Acceptance of this feature: Page through to retrieve all records by the total record count, sample one record to verify the role, reference information, and time, confirm that `_id`, `dataId` and `value` can locate it, and confirm response `code` of 200 and that the total record count total matches the number of list entries.

Business test: Use one week of records to verify the total, and see whether the criteria and exceptions are clearly written.

- Pull two pages by application and session identifiers, compare the offset and the total record count total, and confirm that only the first page was not retrieved.
- Open a single record, verify the role field and reference field, record the number of referenced items, and separately verify the reference text tokens.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
