---
title: Deployment and Upgrades for Graduate Education Process Management: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c025-f017
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Upgrades | Operations
meta_description: Graduate Education: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Graduate Education Process Management: Coordinate Operations and Application Handover

## What this category's data looks like

Graduate training process management materials include training plans, proposal reports, and mid-term assessment forms, originating from supervisors, colleges, and graduate management positions, and are updated by semester and training milestone. A training plan contains courses, credits, and supervisor signature; a proposal report contains title, date, review comments, and signature; a mid-term assessment form contains assessment conclusion, date, and signature. When the materials enter the deployment and upgrade function, the training plan serves as the training program baseline, the proposal report serves as the milestone evidence, and the mid-term assessment form serves as the process conclusion; the fields, dates, and signatures of the three must remain traceable under version and migration records, and the configuration status of connection strings such as `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK` must also be recorded with the handover form.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), outputting the image version, migration task records, and data row index status. The handover-ready deployment status and operation records are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | View the version identifiers of the two images in the deployment environment, confirm both are the same target version, and record the image version identifiers, while also checking the databases pointed to by the `MONGODB_URI` and `PG_URL` connection strings |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | View the execution record of this task on the administrator version upgrade page, check the trigger time and the stopped status of the old instance, and record the migration task record, confirming the status is completed |
| Knowledge base rebuild status migration | Triggered only after the previous migration is completed; check the time and status of the two records against each other | Compare the time and status of the two migration task records, confirm the latter migration was triggered after the former was completed, and check the configurations related to `REDIS_URL` and `DB_MAX_LINK` |
| Data row index status | After migration it is the new index status system; sample one data row to check the status field | Sample one data row to check the index status field, confirm it has migrated from the old marker to the new index status system, and the status value is indexed |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the training plan and the mid-term assessment form. Cause: The two materials are maintained separately, and the fields and dates were not checked against the same record.
- Symptom: The service can start but the data row status is still the old marker. Cause: The migration script was not executed or was not executed in order; consistent image versions do not mean the business data migration has been completed.
- Symptom: The proposal report and mid-term assessment form lack signatures or receipts. Cause: The material circulation step did not check signatures and receipts item by item, and missing items were not discovered at handover.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and check the status of the `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK` connection strings.

Business test: check item by item once according to the handover form, and see which record is missing.

- Check the two image version identifiers in the deployment environment, confirm both are the same target version, and record the image version identifiers, while also checking the databases pointed to by the `MONGODB_URI` and `PG_URL` connection strings
- View the execution records of the two migration scripts in order on the administrator version upgrade page, confirm the latter migration was triggered after the former was completed, and check the data row index status field, whose status value is indexed
