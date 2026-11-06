---
title: Deployment and Upgrades for Compulsory Education Dropout Prevention: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c009-f017
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Upgrades | Operations
meta_description: Dropout Prevention: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Compulsory Education Dropout Prevention: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the compulsory education dropout prevention and retention scenario. The materials come from three business materials: the dropout risk ledger, the return-to-school persuasion records, and the home visit records. The ledger serves as the primary index for student status and risk level, the persuasion records capture each persuasion action and its result, and the home visit records capture household visits and parent signatures. These three types of materials enter the server side during the deployment and upgrade stage, corresponding respectively to data rows, task records, and index status. The update cadence rolls forward by semester and by persuasion milestone, and the field characteristics center on student name, date, number of persuasions, signature, and receipt. Names, quantities, and dates are prone to mismatching across different materials; when versions are not synchronized, old markers remain; and if signatures or receipts are missing, the loop cannot be closed.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of both images against the version notes | View the version identifiers of both images in the deployment environment and confirm they match the version notes; connection strings such as `MONGODB_URI`, `PG_URL`, and `REDIS_URL` keep pointing to the same instance before and after the upgrade |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; this is a manually triggered task | View the execution record of this task on the administrator version upgrade page, and check the trigger time against the old instance stop time |
| Knowledge base rebuild status migration | Triggered after the previous migration completes; this is a manually triggered task | Compare the time and status of the two records, and confirm the latter executes after the former completes |
| Data row index status | After migration it is the new index status system; old version markers and transitional states are migrated uniformly | Sample one data row and check the status field to confirm it has landed within the new index status system |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the two migration scripts were not triggered in order; the latter depends on the former completing, and the old markers were not migrated.
- Symptom: the name, quantity, and date of the same record do not match between the ledger and the persuasion records. Cause: the persuasion records and home visit records were not aligned by the same student primary index, and signatures or receipts are missing.
- Symptom: the script execution reports an error or the two image versions are inconsistent. Cause: the old instance was not fully stopped, the old task lease had not expired, or the migration was triggered before versions were synchronized.

## How to verify the setup

This feature's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, confirming the historical chunk training task migration completes first and the knowledge base rebuild status migration completes afterward, and sample one data row to check the index status field.

Business test: check each item once against the handover form to see which record is missing, focusing on the name, quantity, date, and signature of the dropout risk ledger, persuasion records, and home visit records.

- In the deployment environment, check the two image version identifiers and confirm that `MONGODB_URI`, `PG_URL`, and `REDIS_URL` still point to the same targets.
- On the administrator version upgrade page, view the two migration task records in order, and sample one data row to check the index status field.
