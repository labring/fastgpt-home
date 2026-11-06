---
title: Deployment and Upgrades for School Exam Question Setting and Grading: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c011-f017
page_type: 行业问题页
application_area: education
meta_title: School Exams | Upgrades | Operations
meta_description: School Exams: review upgrades for operational handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for School Exam Question Setting and Grading: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the deployment, operations, and application handover scenarios for exam question setting and grading in primary and secondary schools. The materials involved include question-setting two-way specification tables, exam papers, scoring rubrics, as well as image version identifiers, migration task records, and data row index statuses generated on the deployment side. The question-setting two-way specification tables, exam papers, and scoring rubrics are typically updated by the teaching research and examination affairs departments according to exam batches. Their fields include name, quantity, date, and signature fields. When entering the deployment and upgrade phase, they serve as business-side content pending handover, used to verify whether versions and records are synchronized. The image version identifiers and migration task records produced by the deployment environment and the administrator version upgrade page are the prerequisite basis for operations handover and business use. The update cadence follows exam batches and version releases. The field characteristics manifest as the need for the name, quantity, and date of the same record to be aligned item by item across the two types of materials. A missing signature or receipt is deemed an incomplete handover.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), outputting image versions, migration task records, and data row index statuses. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version, and the version identifiers must be consistent with the version description | Check the version identifiers of both images against the version description, and verify whether the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection strings point to the same environment |
| Historical chunk training task migration | Triggered only after the old instance has been fully stopped and the old task lease has expired; the execution record includes time and status | View the execution record of this task on the administrator version upgrade page, and verify whether the trigger time matches the old instance stop time |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; the time and status of the two records must connect sequentially | Compare the time and status of the two migration records, and confirm that the latter task was executed only after the former was completed |
| Data row index status | After migration, it is a new index status system; sample a data row to verify the status field | Sample a data row to verify the status field, confirm it is no longer the old marker, and record the connection count configuration corresponding to `DB_MAX_LINK` |

## Three common errors

- Symptom: The service can start, but the data row status is still the old marker. Cause: The two migration scripts were not executed in order; the latter was triggered before the former completed, so the index status was not switched.
- Symptom: The name, quantity, and date of the same record do not match between the question-setting two-way specification table and the scoring rubric. Cause: During handover, items were not verified one by one, versions were not synchronized, and signatures or receipts were missing.
- Symptom: Script execution reports an error. Cause: The old instance was not fully stopped or the old task lease had not expired; the trigger conditions were not met, and the migration task record shows failure.

## How to verify the setup

Acceptance for this feature: verify the version identifiers of the two images, then verify the execution records of the two migration scripts in order, confirming that the image versions are consistent and the scripts completed in sequence.

Business test: verify once item by item according to the handover form, see which record is missing, and focus on verifying the name, quantity, date, and signature of the question-setting two-way specification table, exam papers, and scoring rubrics.

- On the administrator version upgrade page, view the execution records of the two migration scripts and compare the time and status.
- Sample a data row to verify the index status field, and verify the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection strings and the image version identifiers.
