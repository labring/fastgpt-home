---
title: Deployment and Upgrades for Initial Review of Academic Journal Submissions: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c066-f017
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Upgrades | Operations
meta_description: Journal Submissions: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Initial Review of Academic Journal Submissions: Coordinate Operations and Application Handover

## What this category's data looks like

The materials in the initial review stage of academic journal submissions include submitted manuscripts, author information forms, and plagiarism check reports. The three share the manuscript number as a common index, and their fields cover manuscript title, author name, manuscript word count, date of receipt, plagiarism check conclusion, and signature field. The materials come from editorial system exports and manual supplementary entry, and the update cadence advances with initial review batches, syncing once after each batch of manuscripts is assigned. When entering the deployment and upgrade function, submitted manuscripts and plagiarism check reports serve as the data rows to be migrated, while the author information form provides the basis for field mapping; together, the three determine whether the data row index status after migration can be handed over.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image version identifiers | The two images must be the same target version; if the versions are inconsistent, the handover form is invalid | Check the version identifiers of the two images against the version notes, confirm they match, and record them in the handover form |
| Historical chunk training task migration record | It can be triggered only after the old instance has been fully stopped and the old task lease has expired; the execution record must include the task name and completion time | View the task execution record on the administrator version upgrade page, and check the trigger prerequisites and completion status |
| Knowledge base rebuild status migration record | It can be triggered only after the previous migration is completed; the time and status of the two records must connect in sequence | Compare the time and status of the two records, and confirm that the latter is later than the former and that its status is completed |
| Data row index status | After migration, it should be the new index status system, no longer the old-version rebuilding marker | Sample one data row and check the status field to confirm it has switched to the new status system |

## Three common errors

- Symptom: the service starts, but the data row status is still the old marker. Cause: the two migration scripts were not executed or were executed in the wrong order; the latter depends on the former completing.
- Symptom: the title, word count, and date of receipt of the same manuscript do not match between the submitted manuscript and the plagiarism check report. Cause: the two materials were not updated in sync under the same manuscript number.
- Symptom: the handover form is missing a signature or receipt. Cause: the operation records on the version upgrade page were not transferred together with the handover form, so the next shift cannot verify them.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order, confirm that the historical chunk training task migration comes first and the knowledge base rebuild status migration comes second, and sample one data row to check the index status field.

Business test: check item by item once according to the handover form to see which record is missing, focusing on whether the fields, dates, and signatures of the submitted manuscripts, author information forms, and plagiarism check reports are complete.

- On the administrator version upgrade page, export the execution records of the two migration tasks and write them into the handover form together with the image version identifiers.
- Check how the three connection identifiers `MONGODB_URI`, `PG_URL`, and `REDIS_URL` are filled in the deployment status record, confirm there are no missing items, and then hand over to the next shift.
