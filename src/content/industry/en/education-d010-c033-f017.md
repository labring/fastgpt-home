---
title: Deployment and Upgrades for Vocational College Skills Competition Organization: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c033-f017
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Upgrades | Operations
meta_description: Skills Competitions: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Vocational College Skills Competition Organization: Coordinate Operations and Application Handover

## What this category's data looks like

In the deployment, operations, and application handover stage of vocational college skills competition organization, materials include three categories: competition regulations, registration forms, and training plans. Competition regulations are issued by the organizer, with an update cadence adjusted according to event notices, and fields include event name, group, date, signature column, and receipt column. Registration forms are filled out by participating institutions, with fields including competitor name, ID number, competition event, supervising instructor, seal and signature, and the quantity and date must be consistent with the regulations. Training plans are written by supervising instructors, with fields including training stage, class hours, equipment list, date, and review signature, and their equipment and venue information must correspond to the regulations' attachments. When the three types of materials enter the deployment and upgrade function, competition regulations serve as the version baseline, registration forms serve as the source of personnel data rows, and training plans serve as the basis for task records. The names, quantities, dates, and signatures of the three must be aligned item by item, forming a handover-ready deployment state and operation records.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), outputting image versions, migration task records, and data row index status. "Handover-ready deployment state and operation records" are then completed by operations handover and business use. The upgrade includes version updates for two images, the main service and the commercial edition, as well as two manually triggered migration scripts. The scripts do not block service startup, and the latter depends on the former's completion.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of both images against the version notes | In the deployment environment, check the image version identifiers of fastgpt-app and fastgpt-pro and confirm they are consistent; connection parameters such as `MONGODB_URI`, `PG_URL`, and `REDIS_URL` must correspond to the deployment records |
| Historical chunk training task migration | Trigger only after the old instance has been fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | Confirm that all old-version instances in the cluster have been stopped, then view the execution record and status of this migration task on the administrator version upgrade page |
| Knowledge base rebuild status migration | Trigger after the previous migration is complete; compare the time and status of the two records | First verify that the historical chunk training task migration is complete, then trigger this migration, compare the time and status of the two records, and confirm the sequence |
| Data row index status | After migration, it is the new index status system; sample one data row to check the status field | Sample one data row to check the status field, confirm that it has migrated from the old marker to the new index status system, and record the data row index status |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the competition regulations and the registration form. Cause: The two materials are filled out separately, not checked against the same version baseline, and signatures or receipts are missing at handover.
- Symptom: The service can start, but the data row status is still the old marker. Cause: The migration scripts were not executed or were not executed in order; consistent image versions do not mean the business data migration has been completed.
- Symptom: The two image versions are inconsistent, or the migration script reports an error during execution. Cause: The images were not updated synchronously, old instances were not fully stopped, or migration was triggered before the old task lease expired.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order; sample one data row to check the status field and confirm that the data row index status has been migrated; connection parameters such as `DB_MAX_LINK` must correspond to the deployment records.

Business test: check item by item once according to the handover form, see which record is missing, focusing on checking the fields, dates, and signatures of the competition regulations, registration forms, and training plans.

- On the administrator version upgrade page, view the execution records of the historical chunk training task migration and the knowledge base rebuild status migration, and compare the time and status of the two records.
- Sample one data row to check the status field, confirm that it has migrated from the old marker to the new index status system, and record the image version identifiers.
