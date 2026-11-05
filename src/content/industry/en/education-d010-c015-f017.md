---
title: Deployment and Upgrades for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c015-f017
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Upgrades | Operations
meta_description: Student Mental Health: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover

## What this category's data looks like

The materials on this page come from the primary and secondary school mental health screening and referral scenario: psychological screening plans, interview records, and referral forms. Plans contain scale items, screening dates, and organizational signatures; interview records contain the interviewee, time, and interviewer signature; referral forms contain the referral destination, receipt confirmation, and signatures from both parties. In the deployment and upgrade function, these three types of materials serve respectively as sources of business fields, bases for date verification, and evidence of signatures and receipts, and are used to confirm that the data row index status after migration is consistent with the business material fields. The update cadence follows version upgrades, and after each upgrade the material versions and migration task records must be re-verified. Field characteristics include name, quantity, date, signature, and receipt. A common inconsistency is that the name, quantity, or date of the same record does not match across two materials, the versions are not synchronized, or a signature or receipt is missing.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; compare the version identifiers of the two images against the version notes | On the administrator version upgrade page, view the version identifiers of the two images and confirm that both are the same target version |
| Historical chunk training task migration | Triggered only after the old instance has been fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | Verify the time and status in the task execution record, confirm that the old instance has been stopped and the lease has expired, and record the connection information corresponding to `MONGODB_URI` and `PG_URL` |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; compare the time and status of the two records | Verify the time and status of the two migration task records in order, confirm that the latter occurs after the former is complete, and that the status value is indexed |
| Data row index status | After migration it is a new index status system; sample one data row and verify the status field | Sample one data row, verify whether the status field is the new index status system, and record the connection information corresponding to `REDIS_URL` |

## Three common errors

- Symptom: The service can start, but the data row status is still the old marker. Cause: The migration script was not executed or the execution order was reversed, and the latter migration was not triggered after the former was complete.
- Symptom: The name, quantity, or date of the same record does not match between the psychological screening plan and the interview record. Cause: The versions are not synchronized, and the two materials were not verified against the same version.
- Symptom: The referral form is missing a signature or receipt. Cause: During handover, items were not checked one by one against the handover list, and signature and receipt records are missing.

## How to verify the setup

Acceptance for this function: verify the two image version identifiers, then verify the execution records of the two migration scripts in order, confirm that the migration task records are consistent with the data row index status, and verify the connection information for `MONGODB_URI`, `PG_URL`, and `REDIS_URL` and the status value indexed.

Business test: check once item by item against the handover list to see which record is missing, including the fields, dates, and signatures of the psychological screening plan, interview records, and referral form.

- On the administrator version upgrade page, verify the two image version identifiers and the two migration task records, confirm the order and status, and record the connection information for `MONGODB_URI` and `PG_URL`.
- Sample one data row to verify the index status field, and check whether the name, quantity, date, signature, and receipt of the psychological screening plan, interview records, and referral form are consistent, while also recording the connection information for `REDIS_URL`.
