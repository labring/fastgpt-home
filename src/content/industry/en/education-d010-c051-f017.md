---
title: Deployment and Upgrades for College Entrance Exam Application Eligibility: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c051-f017
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Upgrades | Operations
meta_description: Entrance Exam Eligibility: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for College Entrance Exam Application Eligibility: Coordinate Operations and Application Handover

## What this category's data looks like

The category materials for General College Entrance Examination registration qualification review include the Gaokao registration form, household registration and student status certificates, and materials for children accompanying migrating parents. The registration form is filled out by the candidate or the registration point, the household registration and student status certificates are issued by the household registration authority and the school attended, and the materials for children accompanying migrating parents are provided by the parents and the relevant local authorities. When these materials enter the deployment and upgrade function, their role is as business credentials pending handover: the registration form carries the candidate's basic information and examination category, the household registration and student status certificates carry the household registration address, student status number, and schooling history, and the materials for children accompanying migrating parents carry residence permit, social security, and stable residence information. The update rhythm advances according to registration batches, and the field characteristics are concentrated in name, ID number, household registration address, student status number, residence permit number, social security start and end dates, and signatures and seals. The deployment status and operation records must be able to correspond to the versions and dates of these materials; otherwise, during handover it is impossible to determine which material is the currently valid version.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Primary service and commercial edition image versions | Both images are the same target version, and the version identifiers must be consistent with the version description | Check the version identifiers of both images against the version description, and record the connection status of the environments where `MONGODB_URI`, `PG_URL`, and `REDIS_URL` are located |
| Historical chunk training task migration | Triggered only after the old instance has been completely stopped and the old task lease has expired | View the execution record of this task on the administrator version upgrade page, and check the trigger time and status |
| Knowledge base rebuild status migration | Triggered only after the previous migration is completed | Compare the time and status of the two records to confirm that the latter migration was executed after the former was completed |
| Data row index status | After migration, it is the new index status system | Sample one data row and check the status field to confirm that it is no longer the old marker |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: consistent image versions do not mean the business data migration has been completed; the migration task record was not executed or was not completed.
- Symptom: the name and date in the same record do not match between the registration form and the household registration and student status certificates. Cause: the material versions were not synchronized, and the handover form did not check signatures and receipts item by item.
- Symptom: the script execution reports an error or the two image versions are inconsistent. Cause: the old instance was not completely stopped, the old task lease had not expired, or the version upgrade page did not trigger the two migrations in order.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and confirm that the image version identifiers are consistent with the migration task records.

Business test: check once item by item according to the handover form to see which record is missing, focusing on checking the fields, dates, and signatures of the registration form, household registration and student status certificates, and materials for children accompanying migrating parents.

- On the administrator version upgrade page, view the execution records of the two migration tasks, and check the trigger order and status.
- Sample one data row and check the index status field to confirm that it has been migrated to the new index status system.
