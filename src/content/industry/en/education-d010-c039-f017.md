---
title: Deployment and Upgrades for Exam Organization and Misconduct Handling: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c039-f017
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Upgrades | Operations
meta_description: Exam Administration: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Exam Organization and Misconduct Handling: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the exam organization and violation handling scenario, and the materials come from three types: exam manuals, exam room record sheets, and violation fact records. The update cadence advances with exam batches and violation handling cycles, and the field characteristics are concentrated in names, quantities, dates, and signature receipts. Exam manuals provide the process and version basis, exam room record sheets carry the facts of the given exam room, and violation fact records carry the handling conclusions. When the materials enter the deployment, operations, and application handover stage, exam manuals are used to align versions and process definitions, while exam room record sheets and violation fact records are used to check whether the names, quantities, and dates of the same record are consistent, and to check whether signatures or receipts are complete. Deployment status and operation records serve as handover evidence and must correspond item by item with the three types of materials; a missing item is deemed an incomplete handover.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | The two image version identifiers are consistent and correspond to the version description | Check the version identifiers of the two images against the version description, and check whether the connection parameters `MONGODB_URI`, `PG_URL`, and `REDIS_URL` point to the same environment |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired | View the execution record of this task on the administrator version upgrade page, and confirm that the trigger conditions are met and the record exists |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete | Compare the time and status of the two migration task records, and confirm the order and completion status |
| Data row index status | After migration, it is the new index status system | Sample one data row and check the status field to confirm that old markers are no longer retained |

## Three common errors

- Symptom: the service can start but the data row status still shows old markers. Cause: the migration task was not executed or was not completed in order, and the index status was not switched.
- Symptom: the name, quantity, and date of the same record do not match between the exam room record sheet and the violation fact record. Cause: the two materials were not filled in according to the same version definition.
- Symptom: the handover form is missing a signature or receipt. Cause: the deployment status and operation records were not transferred together with the materials, and the check items were not closed.

## How to verify the setup

This feature acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order.

Business test: check item by item once according to the handover form, and see which record is missing.

- On the version upgrade page, view the time and status of the two migration task records, and confirm the order.
- Sample one data row to check the index status field, and check whether the connection parameter `DB_MAX_LINK` is consistent with the handover form record.
