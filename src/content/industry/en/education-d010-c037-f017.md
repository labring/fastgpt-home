---
title: Deployment and Upgrades for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c037-f017
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Upgrades | Operations
meta_description: Training Subsidies: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover

## What this category's data looks like

Vocational training subsidy claim materials mainly consist of training class filing records, attendance records, and completion assessment forms. They come from training institutions and assessment organizers, and are updated by class batch. Class filing records include institution name, class number, start and end dates, and approval signature; attendance records are registered per person per day, including name, identity identifier, attendance date, and personal signature; completion assessment forms include assessment subjects, scores, assessment date, and assessor signature. When these three types of materials enter the deployment and upgrade function, they respectively serve as the class baseline, attendance evidence, and completion evidence. Field names, quantities, dates, and signatures must match between the two materials, serving as the basis for item-by-item verification on the handover form.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), outputting the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are updated to the same target version, and the version identifiers must be consistent | Check the version identifiers of both images against the version notes, and verify the connection targets of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` |
| Historical chunk training task migration | Triggered only after the old instance has been fully stopped and the old task lease has expired; the execution record includes time and status | View the execution record of this task on the administrator version upgrade page, and verify the trigger time and completion status |
| Knowledge base rebuild status migration | Triggered only after the previous migration is completed; the time and status of the two records must match | Compare the time and status of the two migration records to confirm the order and completion status |
| Data row index status | After migration, it is the new index status system, no longer the old marker | Sample one data row and check the status field to confirm it has entered the new index status system |

## Three common errors

- Symptom: The service starts, but the data row status is still the old marker. Cause: The migration script was not triggered after the old instance was fully stopped and the lease expired, or only the previous migration was run.
- Symptom: The name, quantity, and date of the same record do not match between the class filing record and the attendance record. Cause: The two materials were registered separately, without item-by-item verification by the same class number and date.
- Symptom: The completion assessment form lacks the assessor signature or receipt. Cause: The assessment organizer did not incorporate the signature and receipt into the completion materials, and the missing item was only discovered during handover form verification.

## How to verify the setup

This function's acceptance: verify the two image version identifiers, then verify the execution records of the two migration scripts in order, and confirm that the data row index status has entered the new system.

Business test: verify once item by item according to the handover form, see which record is missing, and check the fields, dates, and signatures of the class filing record, attendance record, and completion assessment form.

- On the administrator version upgrade page, view the execution records of the two migration tasks, compare the time and status, and verify the connection parameter targets such as `DB_MAX_LINK`.
- Sample one data row and check the index status field, then verify the fields, dates, and signatures of the class filing record, attendance record, and completion assessment form according to the handover form.
