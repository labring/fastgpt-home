---
title: Deployment and Upgrades for Grade Entry and Credit Recognition: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c020-f017
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Upgrades | Operations
meta_description: Grades and Credits: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Grade Entry and Credit Recognition: Coordinate Operations and Application Handover

## What this category's data looks like

Grade entry and credit recognition involves three types of materials: transcripts, deferred exam applications, and makeup exam arrangements. Transcripts come from the academic affairs system and are updated in batches by semester. Their fields include course name, credits, grade, and instructor signature. Deferred exam applications are submitted by students and approved by the department. Their fields include application date, reason for deferral, and approval signature. Makeup exam arrangements are scheduled by academic affairs. Their fields include makeup exam date, exam room, and invigilator signature. When these three types of materials enter the deployment and upgrade function, their roles differ: transcripts are the main carrier of the data row index status, while deferred exam applications and makeup exam arrangements are associated records that need to align with transcripts in name, quantity, and date. The update rhythm follows the semester and makeup exam cycle. The field characteristics are multiple signatures, multiple dates, and multiple versions coexisting. During handover, each item must be checked one by one.

## Configuration and implementation checks

The deployment environment and administrator version upgrade page (server-side operation) only output the image version, migration task records, and data row index status. The deployable deployment status and operation records must be continued by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; compare the version identifiers of the two images against the version notes | Read the version identifiers of the two images on the administrator version upgrade page and confirm they are consistent |
| Historical chunk training task migration | Triggered only after the old instance has been fully stopped and the old task lease has expired; view the execution record of this task on the version upgrade page | Check the time and status of the execution record, and check that the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connections are available |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; compare the time and status of the two records | Check the two migration task records in order and confirm that the latter completed later than the former |
| Data row index status | After migration, it is the new index status system; sample one data row and check the status field | Sample one transcript data row and check that the status field has changed from the old marker to the new index status |

## Three common errors

- Symptom: The service can start, but the data row status is still the old marker. Cause: The migration script was not executed or was not executed in order, the old instance was not fully stopped, or the old task lease had not expired.
- Symptom: The course name, quantity, or date of the same grade record does not match between the transcript and the deferred exam application. Cause: The versions of the two materials were not synchronized, and the fields and signatures were not checked item by item during handover.
- Symptom: The script execution reports an error, or the two image versions are inconsistent. Cause: The latter migration was triggered before the former completed, or the image identifiers were not checked against the version notes.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order, confirm that the image version identifiers are consistent, that the two migration task records completed in order, and check the `DB_MAX_LINK` connection parameter.

Business test: check once item by item according to the handover list, see which record is missing, and confirm that the fields, dates, and signatures of transcripts, deferred exam applications, and makeup exam arrangements are complete.

- On the administrator version upgrade page, read the image version identifiers of the main service and commercial edition, check them item by item against the version notes, and record them.
- View the time and status of the two migration task records in order, sample one data row to check the index status field, and check that the `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK` connections are available.
