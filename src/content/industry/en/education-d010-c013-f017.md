---
title: Deployment and Upgrades for School Teacher Training Credits: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c013-f017
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Upgrades | Operations
meta_description: Teacher Credits: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for School Teacher Training Credits: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the category of credit management for primary and secondary school teacher training. The materials are of three types: training notices, credit recognition forms, and participant lists. Training notices provide the project name, training start and end dates, and the organizing unit, and are the first credential that the business side uses to enter the system after deployment and upgrade; credit recognition forms carry class hours, credits, recognition conclusions, and signature fields, and are the core for reconciling data row status with business definitions; participant lists carry teacher names, ID document numbers, units, and sign-in receipts, and are the draft basis for data row indexing and personnel matching. The materials are submitted by district and county teacher development institutions and schools at two levels, with an update cadence that rolls according to training batches and often synchronizes with semester completion milestones. When the three types of materials enter the deployment and upgrade function, their roles differ: notices are used to confirm the version and batch time, recognition forms are used to check the index status fields after migration, and lists are used to sample rows and check data row indexing and personnel attribution. Field characteristics are concentrated in dates, class hours, signatures, and receipts; any missing item will be left blank on the handover form.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| The two images, main service and commercial edition | Both images point to the same target version, and the version identifier must match the version description | Check the version identifiers of the two images against the version description, and check whether the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection strings are updated with the environment |
| Historical chunk training task migration record | Triggered only after the old instance has completely stopped and the old task lease has expired; no old task remnants appear in the record | View the execution record of this task on the administrator version upgrade page, and check the trigger time against the old instance stop time |
| Knowledge base rebuild status migration record | Triggered only after the previous migration is complete; the time and status of the two records connect end to end | Compare the time and status of the two records, and confirm that the latter is executed after the former is complete |
| Data row index status | After migration it is the new index status system, and the old-version rebuild marker is no longer retained | Sample one data row and check the status field, confirming that the status value belongs to the new system and the old marker no longer appears |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the migration script was not executed or the execution order was reversed, and the latter was not triggered after the former was complete.
- Symptom: the project name and class hour quantity in the training notice and the credit recognition form do not match. Cause: the two materials were submitted in different batches, and the dates and signatures were not updated in sync.
- Symptom: the participant list lacks a signature or receipt, and the corresponding item on the handover form is left blank. Cause: the list and the recognition form were collected separately, and the receipt was not archived together with the list.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and confirm that the image version identifiers are consistent with the migration task records.

Business test: check item by item once according to the handover form, see which record is missing, and focus on checking whether the dates and signatures of the training notice, credit recognition form, and participant list are complete.

- On the administrator version upgrade page, view the migration task records one by one, and check the trigger time and status
- Sample one data row and check the index status field, confirming that it belongs to the new system and the old marker no longer appears
