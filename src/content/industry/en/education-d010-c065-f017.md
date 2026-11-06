---
title: Deployment and Upgrades for Laboratory Hazardous Chemical Purchasing and Records: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c065-f017
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Upgrades | Operations
meta_description: Lab Chemicals: review upgrades for operational handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Laboratory Hazardous Chemical Purchasing and Records: Coordinate Operations and Application Handover

## What this category's data looks like

Materials for laboratory hazardous chemicals procurement and ledger include procurement application forms, requisition registration forms, inventory ledgers, supplier receipts, and signature pages. The sources are the daily circulation of the procurement department, laboratory teams, and warehousing positions, and the update rhythm is triggered by each procurement, requisition, return, and inventory count. Field characteristics center on product name, specification, quantity, unit, date, handler signature, and receipt number. When these materials enter the deployment and upgrade function, their roles differ: procurement application forms and requisition registration forms are original records on the business side awaiting handover, inventory ledgers are aggregated data rows, and receipts and signature pages are the basis for verification. The deployment and operations phase needs to align the versions, connections, and task records of these materials so that the name, quantity, and date of the same record in different materials can be compared item by item, avoiding unsynchronized versions or missing signatures and receipts.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), outputting image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use. The upgrade includes version updates for two images, the main service and the commercial edition, as well as two manually triggered migration scripts; both migrations are manual tasks, with rebuild state migration executed after historical chunk training task migration finishes.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | On the administrator version upgrade page, view the version identifiers of the two images and check whether environment connection strings such as `MONGODB_URI`, `PG_URL`, and `REDIS_URL` point to the same data set |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; this is a manually triggered task | On the administrator version upgrade page, view the execution record of this task and confirm the relationship between the trigger time and the old instance stop time |
| Knowledge base rebuild status migration | Triggered after the previous migration is completed; the times and statuses of the two records must connect sequentially | Compare the times and statuses of the two migration task records and confirm that the latter is executed after the former is completed |
| Data row index status | After migration, it is a new index status system; sample one data row to check the status field | Sample one data row to check the status field, confirm it is no longer an old-version marker, and record connection parameters such as `DB_MAX_LINK` for handover |

## Three common errors

- Symptom: the service can start but the data row status is still an old marker. Cause: the migration script was not executed or the execution order was reversed; the latter migration depends on the former completing.
- Symptom: the name, quantity, and date of the same record do not match between the procurement application form and the inventory ledger. Cause: the two materials were not updated synchronously in the same batch, and signatures or receipts are missing.
- Symptom: the two image versions are inconsistent. Cause: only the main service image was updated, while the commercial edition image is still the old version, so the versions are not synchronized.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order, confirming that the latter is triggered after the former is completed.

Business test: verify once item by item according to the handover form, see which record is missing, and focus on checking the fields, dates, and signatures of the procurement application, requisition registration, and inventory ledger.

- On the administrator version upgrade page, view the two image version identifiers and the two migration task records, and check the execution times and statuses.
- Sample one data row to check the index status field, and check whether the name, quantity, date, and signature receipt are consistent across the procurement application form, requisition registration form, and inventory ledger.
