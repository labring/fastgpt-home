---
title: Deployment and Upgrades for Graduate Admissions Interviews and Selection: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c024-f017
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Upgrades | Operations
meta_description: Graduate Admissions: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Graduate Admissions Interviews and Selection: Coordinate Operations and Application Handover

## What this category's data looks like

Re-examination and admission materials for graduate admissions appear in the system as three categories: re-examination plans, candidate score sheets, and adjustment lists. Fields include candidate number, name, total preliminary exam score, re-examination score, adjustment preference, date, and signature field. The material sources are exports from the admissions unit's business system and manual entry, and the update rhythm is concentrated in three windows: before re-examination, after re-examination, and the adjustment opening period. When entering the deployment and upgrade function, the re-examination plans and adjustment lists enter the knowledge base as business data rows, while the candidate score sheets exist as both attachments and structured fields. All three jointly depend on the data row index status and migration task records.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers against the version notes | View and record the version identifiers of both images in the deployment environment |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; view the execution records on the administrator version upgrade page | Check the task record time and status, and confirm the old instance has stopped |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; check the time and status of the two records | Check the order of the two migration task records and the data row index status field |
| Candidate score sheet | The name, quantity, and date of the same record do not match across the two materials, or the signature or receipt is missing | Sample one data row to check the status field and signature field, and compare the re-examination plan with the adjustment list |

## Three common errors

- Symptom: the service starts but the data row status is still the old marker. Cause: the knowledge base rebuild status migration was not triggered after the previous migration was completed, and the index status was not switched.
- Symptom: the name, quantity, and date of the same candidate do not match between the score sheet and the adjustment list. Cause: the two materials were imported separately and were not checked item by item against the handover sheet.
- Symptom: the two image versions are inconsistent. Cause: the main service and commercial edition images were not updated synchronously, and the version identifiers were not checked against the version notes.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and confirm the data row index status; when connection parameters are involved, check `MONGODB_URI`, `PG_URL`, and `REDIS_URL`.

Business test: check item by item once against the handover sheet, see which record is missing, and compare the fields, dates, and signatures of the re-examination plan, candidate score sheet, and adjustment list.

- On the administrator version upgrade page, view the time and status of the two migration task records, and confirm that the latter was triggered after the former was completed.
- Sample one data row to check the index status field, and check the `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK` connection parameter records.
