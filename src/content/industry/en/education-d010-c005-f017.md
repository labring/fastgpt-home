---
title: Deployment and Upgrades for Kindergarten Safety and Emergency Drills: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c005-f017
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Upgrades | Operations
meta_description: Kindergarten Safety: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Kindergarten Safety and Emergency Drills: Coordinate Operations and Application Handover

## What this category's data looks like

For the deployment, operations, and application handover of kindergarten safety protection and emergency drills, materials come from hazard rectification ledgers, drill plans and sign-in sheets, access control and school bus inspection records, and handover forms. When these materials enter the deployment and upgrade function, each plays a different role: hazard ledgers and inspection records provide business-side verification dimensions, drill plans and sign-in sheets are used to compare headcount and process, and handover forms carry the destination of version and task records. The update cadence follows the semester and drill cycle, while the deployment side advances according to the version release cadence. Field characteristics include hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, responsible person signatures, as well as image version identifiers and migration task records. After the materials enter this function, server-side operations are first completed by the deployment environment and the administrator version upgrade page, and then the handover-ready state is taken over by operations handover and business use.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operations), outputting image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use. The script does not block service startup, and the latter migration depends on the former completing.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of both images against the version notes | In the deployment environment, check whether the two image tags are consistent, and record the image version identifiers |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | After confirming that all old-version instances have stopped, view the time and status of the migration task record, and check the database pointed to by `MONGODB_URI` |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; compare the time and status of the two records | Check the two migration records in order, confirm that the latter completed after the former, and check that `PG_URL` and `REDIS_URL` connections are available |
| Data row index status | After migration, it is the new index status system; sample one data row to check the status field | Sample one data row, check whether the status field is the new index status after migration, and record the connection parameters related to `DB_MAX_LINK` |

## Three common errors

- Symptom: The service can start, but the data row status is still the old marker. Cause: The migration script was not executed or the execution order was reversed, the old instance was not fully stopped, or the old task lease had not expired.
- Symptom: Drill records do not match the plan, and the sign-in headcount does not match. Cause: During handover, the drill headcount and sign-in were not checked item by item according to the handover form, and plan changes were not synchronized to the records.
- Symptom: Hazards are not closed-loop, and inspection items are missing. Cause: The rectification deadline has passed but there is no responsible person signature, and access control and school bus inspection items lack records on the handover form.

## How to verify the setup

This function's acceptance: check whether the two image version identifiers are consistent, then check the execution records of the two migration scripts in order, confirm that the latter depends on the former completing, and check the data row index status.

Business test: check once item by item according to the handover form, see which record is missing, focusing on hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible person signatures.

- On the administrator version upgrade page, view the execution records of the two migration tasks and confirm that the time and status order are correct.
- Sample one data row to check the index status field, and check whether the two image version identifiers are consistent.
