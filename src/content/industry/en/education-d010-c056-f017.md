---
title: Deployment and Upgrades for Teacher Qualification Exams and Certification: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c056-f017
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Upgrades | Operations
meta_description: Teacher Qualifications: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Teacher Qualification Exams and Certification: Coordinate Operations and Application Handover

## What this category's data looks like

Teacher qualification exam and certification involves three types of materials: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. Registration forms come from the exam institution's system and contain name, subject, exam district, date, and signature field; Mandarin proficiency certificates are issued by testing stations and contain grade, certificate number, and issue date; medical examination forms are filled out by designated hospitals and contain the medical examination conclusion, date, and physician signature. The three types of materials converge at the certification stage, and the update cadence changes with batches and certification institution notices. When entering the deployment and upgrade function, registration forms are used to verify candidate identity and subject, Mandarin proficiency certificates are used to verify grade and number, and medical examination forms are used to verify conclusion and validity period. Field characteristics are concentrated in four categories: name, quantity, date, and signature. If any material version is not synchronized or a signature is missing, it will be exposed as a record gap during handover.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images point to the same target version, and the version identifiers must be consistent | Compare the version identifiers of the two images against the version notes, check the `MONGODB_URI` and `PG_URL` connections, and then view the image version identifiers |
| Historical chunk training task migration | Triggered only after the old instance has been fully stopped and the old task lease has expired; the record contains execution time and status | View the execution record of this task on the administrator version upgrade page, and confirm that the old instance stop and lease expiration occurred first |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; the time and status of the two records must connect | Compare the time and status of the two records, and confirm that the latter occurred after the former was completed |
| Data row index status | After migration, it is the new index status system, and the status field is no longer the old marker | Sample one data row to check the status field, and check the connection configurations related to `REDIS_URL` and `DB_MAX_LINK` |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the migration script was not executed or the execution order was reversed, and the latter migration was not triggered after the former was completed.
- Symptom: the name, quantity, and date of the same record do not match between the registration form and the medical examination form. Cause: the two material versions were not synchronized, or one of them is missing a signature and receipt.
- Symptom: the script execution reports an error. Cause: the old instance was not fully stopped, the old task lease had not expired, or the two image version identifiers were inconsistent, causing migration dependency requirements not to be met.

## How to verify the setup

This function's acceptance: verify the two image version identifiers, then verify the execution records of the two migration scripts in order, and confirm that the image version identifiers are consistent with the migration task records.

Business test: check each item once according to the handover form, see which record is missing, and focus on verifying the name, quantity, date, and signature of the registration form, Mandarin proficiency certificate, and medical examination form.

- On the administrator version upgrade page, view the execution records of the two migration scripts one by one, and verify whether the time and status connect.
- Sample one data row to check the index status field, and confirm that it has migrated from the old marker to the new index status system.
