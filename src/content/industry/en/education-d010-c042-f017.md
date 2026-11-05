---
title: Deployment and Upgrades for Corporate Sales and Product Training: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c042-f017
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Upgrades | Operations
meta_description: Sales Training: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Corporate Sales and Product Training: Coordinate Operations and Application Handover

## What this category's data looks like

When enterprise sales product training materials enter deployment, operations, and application handover, the main categories include three types: product manuals, sales talk tracks, and channel training schedules. Product manuals are maintained by the product team, with an update cadence that follows version releases, and fields include feature name, version number, effective date, and signature field; sales talk tracks are iterated quarterly by sales operations, and fields include scenario name, number of sales talk track entries, applicable version, and receipt signature; channel training schedules are scheduled weekly by the channel training team, and fields include course name, course start date, participating channels, and instructor signature. The three types of materials each play different roles in the deployment and upgrade stage: product manuals provide the baseline for version and feature comparison, sales talk tracks provide the basis for checking business scenarios and sales talk track entries, and channel training schedules provide training scheduling and attendance records. After the materials enter the upgrade page, they need to be aligned item by item with the image version, migration task records, and data row index status to ensure that the name, quantity, and date of the same record are consistent across the three materials, and that signatures and receipts are complete.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. The handover-ready deployment status and operation records are then completed by operations handover and business use. The upgrade page is only responsible for server-side operations and record output; it does not produce business materials, nor is it a prerequisite for enabling the interface.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifier against the version notes | In the deployment environment, check the fastgpt-app and fastgpt-pro image tags and confirm both are v4.17.2; check whether the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection configurations and the image version identifier are recorded in sync |
| Historical chunk training task migration | Trigger only after the old instance has been fully stopped and the old task lease has expired; view the execution record on the administrator version upgrade page | Confirm that all old-version FastGPT App and Pro instances in the cluster have been fully stopped; after the old task lease expires, view the execution record and status of `20261008_migrate_chunk_training` on the administrator version upgrade page |
| Knowledge base rebuild status migration | Trigger only after the previous migration is complete; check the time and status of the two records | On the administrator version upgrade page, verify that the trigger time of `20261009_migrate_dataset_rebuild_status` is later than the completion time of the previous migration, and check whether the `DB_MAX_LINK` connection count configuration is consistent with the migration task record |
| Data row index status | After migration, it is the new index status system; sample one data row and check the status field | Sample one data row, check whether its status field has been migrated from the old-version rebuilding marker to the new indexStatus rebuild status system, and align it with the timestamp in the migration task record |

## Three common errors

- Symptom: the service starts normally but the data row status is still the old marker. Cause: the two migration scripts were not triggered in order, or the latter script was executed before the former completed, so the index status was not updated.
- Symptom: the name, quantity, and date of the same record do not match between the product manual and the channel training schedule. Cause: the versions were not synchronized; the product manual has been updated while the schedule still uses old-version fields, and signatures or receipts are missing.
- Symptom: the script execution reports an error or the two image versions are inconsistent. Cause: the old instance was not fully stopped, the old task lease had not expired, or the image tags were not updated uniformly, causing the migration task record to not match the image version identifier.

## How to verify the setup

Acceptance for this feature: check the two image version identifiers and confirm that both fastgpt-app and fastgpt-pro are v4.17.2; then check the execution records of the two migration scripts in order, first `20261008_migrate_chunk_training` and then `20261009_migrate_dataset_rebuild_status`, and confirm that the time and status are consistent.

Business test: check item by item according to the handover form to see which record is missing, focusing on whether the name, quantity, date, and signature receipts in the product manual, sales talk tracks, and channel training schedule are consistent.

- On the administrator version upgrade page, export the execution records of the two migration tasks, compare them item by item with the image version identifier and the data row index status field, and after confirming that the three are consistent, sign for handover.
- Check the fields, dates, and signatures of the product manual, sales talk tracks, and channel training schedule item by item according to the handover form; when names, quantities, or dates do not match or receipts are missing, return them to the corresponding material maintainer for correction.
