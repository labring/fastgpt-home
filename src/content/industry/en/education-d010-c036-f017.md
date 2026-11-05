---
title: Deployment and Upgrades for Professional Qualification Exam Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c036-f017
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Upgrades | Operations
meta_description: Professional Exams: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Professional Qualification Exam Applications: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data typically includes registration forms, education certificates, and work experience certificates, sourced from candidate submissions and employer issuance, with an update cadence synchronized with the examination cycle, and field characteristics centered on name, ID number, graduating institution, major, dates, and signatures. The registration form serves as the master record for identity and examination subjects, the education certificate corresponds to graduation date and institution name, and the work experience certificate corresponds to position start and end dates and employer seal. After these three types of materials enter the deployment, operations, and application handover scenario, each serves as an independent verification object; the name, quantity, and dates of the same record across two materials must be aligned item by item, and a missing signature or receipt is deemed an incomplete record.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), outputting the image version, migration task records, and data row index status. The handover-ready deployment status and operation records are then completed by operations handover and business use. The upgrade involves version updates of two images, the main service and the commercial edition, as well as two manually triggered migration scripts; both migrations are manual tasks, with rebuild state migration executed after historical chunk training task migration finishes.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; compare the version identifiers of the two images against the version notes | On the version upgrade page, check whether the version identifiers of the two images are consistent, and check the connection status of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` |
| Historical chunk training task migration | Trigger only after the old instance has fully stopped and the old task lease has expired; view the execution record of this task on the administrator's version upgrade page | Check the trigger time in the task record against the old instance stop time, and confirm that `DB_MAX_LINK` is connected properly and there are no errors |
| Knowledge base rebuild status migration | Trigger after the previous migration completes; compare the time and status of the two records | Check the time order and status of the two migration task records, and confirm the previous one has completed before triggering the latter |
| Data row index status | After migration, it is the new index status system; sample one data row to check the status field | Sample one data row to check whether the status field has switched from the old marker to the new index status |

## Three common errors

- Symptom: the service starts but the data row status is still the old marker. Cause: only the consistency of the image versions was checked, but the migration task records and data row index status were not checked; consistent image versions do not mean the business data migration is complete.
- Symptom: the name and dates of the same record in the registration form and the education certificate do not match. Cause: the two materials were submitted from different sources, and the fields were not aligned item by item at handover, nor were missing signatures or receipts detected.
- Symptom: the script execution reports an error or the two image versions are inconsistent. Cause: the migration was triggered before the old instance fully stopped and the old task lease expired, or the two images were not synchronized to the same target version.

## How to verify the setup

Acceptance of this feature: check the version identifiers of the two images, then check the execution records of the two migration scripts in order, and confirm that the image version identifiers are consistent with the migration task records.

Business test: verify once item by item according to the handover sheet, see which record is missing, and focus on checking the fields, dates, and signatures of the registration form, education certificate, and work experience certificate.

- On the administrator version upgrade page, check the version identifiers of the two images, and check the connection status of `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK`.
- Check the time and status of the two migration task records in order, then sample one data row to check whether the index status field has switched to the new system.
