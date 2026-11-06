---
title: Deployment and Upgrades for Academic Misconduct Reports and Investigations: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c063-f017
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Upgrades | Operations
meta_description: Research Misconduct: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Academic Misconduct Reports and Investigations: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. Materials include report materials, investigation reports, and expert appraisal opinions. Report materials are generated at the intake stage and serve as a source to be checked when entering deployment status and operation records; investigation reports are formed by the investigation team and carry conclusions and dates; expert appraisal opinions are issued at the appraisal stage and are accompanied by signatures and receipts. The fields of the three types of materials involve names, quantities, dates, and signatures. The update cadence advances with the investigation stages. It often occurs that the name, quantity, or date of the same record does not match across two materials, versions are not synchronized, and signatures or receipts are missing. In the deployment and upgrade stage, the versions of these materials need to be mapped to task records so that the handover-ready deployment status and operation records can support item-by-item verification.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use. The upgrade includes version updates for two images, the main service and the commercial edition, as well as two manually triggered migration scripts; both migrations are manual tasks, with rebuild state migration executed after historical chunk training task migration finishes.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | On the administrator version upgrade page, check whether the version identifiers of the two images are consistent |
| Historical chunk training task migration | Trigger only after the old instance has been fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | Check the time and status of the execution record, and confirm that the old instance has been stopped and the old task lease has expired |
| Knowledge base rebuild status migration | Trigger after the previous migration is completed; check the time and status of the two records | Check the time order and status of the two records, and confirm that the latter was triggered after the former was completed |
| Data row index status | After migration, it is the new index status system; sample one data row and check the status field | Sample one data row and check whether the status field is the new index status system |

## Three common errors

- Symptom: The service can start, but the data row status is still the old marker. Cause: The migration script was not executed or the execution order was reversed, the data row index status was not switched to the new system, and the corresponding record is missing from the handover form.
- Symptom: The name, quantity, or date of the same record does not match across two materials. Cause: The versions of the report materials, investigation report, and expert appraisal opinions were not synchronized, fields were not compared item by item, and signatures or receipts are missing.
- Symptom: The script execution reports an error or the two image versions are inconsistent. Cause: The old instance was not fully stopped, the old task lease had not expired, or the version identifiers of the two images were not aligned, and the migration task records do not match the version notes.

## How to verify the setup

This feature acceptance: check the version identifiers of the two images, then check the execution records of the two migration scripts in order, and confirm that the data row index status is the new index status system.

Business test: verify item by item once according to the handover form, and see which record is missing; at the same time, check whether the connections and task records of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` are consistent.

- On the administrator version upgrade page, check the version identifiers of the two images and the execution records of the two migration scripts, and confirm that the time and status order are correct.
- Sample one data row to check the index status field, and check whether the connections and task records of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` are consistent.
