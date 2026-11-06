---
title: Deployment and Upgrades for Off-Campus Training Registration and Compliance: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c045-f017
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Upgrades | Operations
meta_description: Training Compliance: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Off-Campus Training Registration and Compliance: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the off-campus training compliance filing and penalty response scenario. The materials are mainly of three types: school operating licenses, course filing materials, and fee disclosure. The school operating license is issued by the approving authority, and its fields include institution name, school address, permitted items, validity period, and issuance date; the course filing materials are submitted by the institution, and their fields include course name, number of class hours, target students, textbook version, and filing date; the fee disclosure is published simultaneously by the institution at the school premises and on online channels, and its fields include fee items, billing unit, refund rules, and disclosure date. When these three types of materials enter the deployment and upgrade function, their roles differ: the school operating license serves as the baseline for the entity's qualifications, the course filing materials serve as the reference source for course entries and data row indexes, and the fee disclosure serves as the object for external messaging and receipt signature verification. In terms of update cadence, licenses and filings are triggered by approval or changes, while fee disclosures are triggered by fee adjustments. The field characteristics are concentrated in four items: name, quantity, date, and signature.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Primary service and commercial edition image versions | Both images point to the same target version, and the version identifiers are consistent with the version description | Check the version identifiers of both images in the deployment environment, and confirm that neither side remains on an old version |
| Historical chunk training task migration | Triggered only after the old instance has been fully stopped and the old task lease has expired; the task record includes the trigger time and completion status | View the execution record of this task on the administrator version upgrade page, and check the trigger time and status |
| Knowledge base rebuild status migration | Triggered only after the previous migration is completed; the time and status of the two records can be compared | Compare the time order and status of the two migration records, and confirm that the latter is executed after the former is completed |
| Data row index status | After migration, it is the new index status system, and the status field is no longer the old marker | Sample one data row to check the status field, and confirm that it has entered the new index status system |

## Three common errors

- Symptom: The number of class hours and filing date for the same course do not match between the two materials. Cause: After the course filing materials were updated, they were not synchronized to the other material, and the name, quantity, and date were not checked item by item.
- Symptom: The service can start, but the data row status is still the old marker. Cause: The migration script was not executed or execution reported an error; consistent image versions do not mean the business data migration has been completed.
- Symptom: The fee disclosure lacks a signature or receipt, and there is no corresponding record on the handover form. Cause: After the disclosure was published, the signature and receipt were not collected, and the materials lacked signed evidence when entering handover.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order; if connection parameters need to be checked, inspect the filling and effectiveness of `MONGODB_URI`, `PG_URL`, and `REDIS_URL`, and record the number of array entries and the tokens of the referenced text.

Business test: check once item by item according to the handover form, and see which record is missing.

- On the administrator version upgrade page, view the execution records of the two migration tasks one by one, and record the trigger time and completion status
- Sample one data row to check the status field, confirm that it has entered the new index status system, and check the `DB_MAX_LINK` connection parameter
