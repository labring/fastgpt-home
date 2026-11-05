---
title: Deployment and Upgrades for College Admissions Health Examination Organization: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c053-f017
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Upgrades | Operations
meta_description: Admissions Health Exams: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for College Admissions Health Examination Organization: Coordinate Operations and Application Handover

## What this category's data looks like

In the deployment and upgrade stage, college admissions physical examination organizations deal with three types of materials: physical examination forms, re-examination applications, and restricted-major notifications. The physical examination form carries the candidate's basic information and past medical history fields; the re-examination application records the re-examination items, date, and physician signature; the restricted-major notification retains the major name, the basis for restriction, and the candidate's receipt signature. The materials come from the campus physical examination system and the admissions office's paper archives. The update cadence advances with admissions batches, typically with centralized entry after the physical examination ends, supplementation after re-examination, and finalization before admission. When entering the deployment and upgrade function, the three types of materials respectively correspond to the verification objects of data row index status, migration task records, and image version identifiers: the physical examination form is used to spot-check the data row status field, the re-examination application is used to compare dates and signatures before and after migration, and the restricted-major notification is used to check receipt completeness. Only when the version, connection, and task records are consistent do handover conditions exist.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), outputting the image version, migration task records, and data row index status. The handover-ready deployment status and operation records are then completed by operations handover and business use. Migration scripts do not block service startup, and the latter script depends on the former completing.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | The two image version identifiers must be consistent and identical to the target version in the version notes | Check the version identifiers of the two images against the version notes, and record the current image tag |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; the execution record must have a clear time and status | View the task's execution record on the administrator version upgrade page, and check the trigger time and result |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; the times and statuses of the two records must connect sequentially | Compare the times and statuses of the two migration task records to confirm the dependency relationship has been satisfied |
| Data row index status | After migration it is the new index status system, and the old rebuilding marker is no longer retained | Spot-check one data row's status field to confirm the status field has been updated |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the two migration scripts were not executed in order, and the latter depends on the former completing.
- Symptom: the same physical examination record's date and item name do not match between the physical examination form and the re-examination application. Cause: the two materials were entered separately and were not checked item by item against the handover form.
- Symptom: the restricted-major notification lacks the candidate's receipt signature, and the re-examination application lacks the physician's signature. Cause: the signature and receipt fields were not checked when the materials were archived.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order.

Business test: check once item by item against the handover form to see which record is missing.

- Check whether the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection configurations are consistent with the image version identifiers
- Trigger the two migration scripts in sequence on the version upgrade page, record the execution time and status, and spot-check one data row's index status field
