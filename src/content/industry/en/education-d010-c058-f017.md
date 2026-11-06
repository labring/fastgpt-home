---
title: Deployment and Upgrades for Research Project Task Agreement Signing: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c058-f017
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Upgrades | Operations
meta_description: Research Agreements: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Research Project Task Agreement Signing: Coordinate Operations and Application Handover

## What this category's data looks like

During the signing of research project task statements, three materials—the project task statement, the subject task breakdown table, and the budget statement—enter the deployment, operations, and application handover stage. The project task statement provides the subject name, undertaking unit, and start and end dates; the subject task breakdown table gives subtasks, responsible persons, and milestone dates; the budget statement lists budget categories, amounts, and calculation bases. The materials come from the finalized documents in the signing process, and the update cadence follows iterations of the signed version, with field characteristics concentrated in names, quantities, dates, and signature fields. At handover, the three materials each play a different role: the project task statement confirms the overall boundary, the subject task breakdown table confirms the task division, and the budget statement confirms the funding basis. The fields, dates, and signatures of the three materials must be checked item by item, and the names, quantities, and dates of the same record in different materials should remain consistent, versions should be synchronized, and signatures and receipts must not be missing.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), outputting the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | View the version identifiers of the two images on the version upgrade page and confirm that both point to the same target version |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; view the execution record of this task on the administrator's version upgrade page | View the execution record of this task on the version upgrade page and check the trigger time and status |
| Knowledge base rebuild status migration | Triggered after the previous migration is complete; check the time and status of the two records | Check the time and status of the two migration records and confirm that the latter was triggered after the former was completed |
| Data row index status | After migration it is the new index status system; sample one data row and check the status field | Sample one data row and check the status field to confirm that it has changed from the old marker to the new index status system |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the two migration scripts were not executed in order; the latter depends on the former being completed, and if it is not executed, the data row status is not switched.
- Symptom: the name, quantity, and date of the same record do not match between the project task statement and the subject task breakdown table. Cause: the versions of the two materials were not synchronized, and they were not updated according to the same version after signing.
- Symptom: the budget statement lacks a signature or receipt, and the funding basis cannot be confirmed at handover. Cause: the signing process did not complete the signature step, and the materials did not form a handover-ready finalized version.

## How to verify the setup

This feature's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order; check the connection status of `MONGODB_URI`, `PG_URL`, and `REDIS_URL`; sample one data row and check the index status field.

Business test: check item by item once according to the handover form to see which record is missing; compare the fields, dates, and signatures of the project task statement, subject task breakdown table, and budget statement to confirm that the version, connection, and task records are consistent.

- Check the version identifiers of the two images and the execution records of the two migration scripts on the version upgrade page, and confirm the order and status.
- Check the fields, dates, and signatures of the project task statement, subject task breakdown table, and budget statement item by item according to the handover form, and record missing items.
