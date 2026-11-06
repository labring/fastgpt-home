---
title: Deployment and Upgrades for Research Project Annual Progress and Acceptance: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c060-f017
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Upgrades | Operations
meta_description: Research Progress: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Research Project Annual Progress and Acceptance: Coordinate Operations and Application Handover

## What this category's data looks like

Annual progress and acceptance materials for research projects fall into three categories: annual progress reports, mid-term review materials, and acceptance reports. Fields cover name, quantity, date, and signature. Sources are the project team and the management department, and the update cadence advances by quarter, mid-term milestone, and project completion milestone. When entering deployment, operations, and application handover, the annual progress report serves as the time anchor for version and task records, the mid-term review materials serve as the basis for checking connection and data row index status, and the acceptance report serves as the final confirmation of signatures and receipts. The three are checked item by item against the image version, migration task records, and data row index status, to avoid the name, quantity, and date of the same record not matching across two materials, or the version not being synchronized, or missing signatures and receipts.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use. Migration scripts do not block service startup, and the latter migration depends on the former completing.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | Read the two image version identifiers on the administrator version upgrade page and confirm they are consistent |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; check against the date and signature of the annual progress report | View the execution record of this task on the administrator version upgrade page and check the trigger time |
| Knowledge base rebuild status migration | Triggered after the previous migration completes; check against the name and quantity of the mid-term review materials | Compare the time and status of the two records to confirm the order |
| Data row index status | After migration it is the new index status system; check against the fields and receipt of the acceptance report | Sample one data row and check the status field to confirm it is no longer the old marker |

## Three common errors

- Symptom: the service starts but the data row status is still the old marker. Cause: the migration script was not executed or the execution order was reversed; the latter migration depends on the former completing.
- Symptom: the name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: the material update cadence is not synchronized, and signatures or receipts are missing.
- Symptom: the two image versions are inconsistent. Cause: the main service and commercial edition images were not synchronously updated to the same target version; the versions are not synchronized.

## How to verify the setup

This feature acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and check the connection status of `MONGODB_URI`, `PG_URL`, `REDIS_URL` and the data row index status field.

Business test: check item by item once according to the handover form, see which record is missing, and check against the fields, dates, and signatures of the annual progress report, mid-term review materials, and acceptance report.

- On the administrator version upgrade page, check the two image version identifiers and the execution records of the two migration scripts, and confirm the order and status.
- Sample one data row to check the index status field, and check against the fields, dates, and signatures of the annual progress report, mid-term review materials, and acceptance report.
