---
title: Deployment and Upgrades for Kindergarten Operations and Quality Self-Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c006-f017
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Upgrades | Operations
meta_description: Kindergarten Quality: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Kindergarten Operations and Quality Self-Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the kindergarten operation behavior and quality self-assessment scenario. The materials come from self-assessment reports, issue lists, and rectification plans. The update cadence rolls with the kindergarten operation cycle and inspection milestones, and the field characteristics center on four categories: name, quantity, date, and signature. When entering the deployment and upgrade function, the three types of materials each play a different role: the self-assessment report provides indicator items and conclusion criteria, the issue list provides item-by-item issues and responsible persons, and the rectification plan provides deadlines and signature receipts. The upgrade action itself does not produce business materials; it only organizes the server-side state into a handover-ready deployment state and operation records, for operations handover and business use to continue from.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. The handover-ready deployment state and operation records are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | In the deployment environment, check the version identifiers of the two images, and record the sources of the connection string values `MONGODB_URI`, `PG_URL`, and `REDIS_URL` |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | On the version upgrade page, view the execution record of this migration task, and confirm that the trigger time is later than the old instance stop time |
| Knowledge base rebuild status migration | Triggered after the previous migration completes; compare the time and status of the two records | Compare the time and status of the two migration task records, and confirm the order and completion markers |
| Data row index status | After migration it is the new index status system; sample one data row and check the status field | Sample one data row and check whether the status field is the new index status system, and record the connection configuration where `DB_MAX_LINK` resides |

## Three common errors

- Symptom: the service starts but the data row status is still the old marker. Cause: the two migration scripts were not triggered in order, and the latter depends on the former completing.
- Symptom: the name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: the two materials are maintained separately and were not checked against the same field criteria.
- Symptom: the rectification plan lacks a signature or receipt, and items are missing when the handover form is checked item by item. Cause: signatures were not collected during the material circulation step, and the version was not synchronized to the same target version.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and confirm that the image version identifiers are consistent with the migration task records.

Business test: check once item by item according to the handover form, see which record is missing, and focus on checking the fields, dates, and signatures of the self-assessment report, issue list, and rectification plan.

- On the version upgrade page, view the execution records of the two migration tasks one by one, compare the time and status, and confirm that the latter is triggered only after the former completes.
- Sample one data row and check the status field, and check the two image version identifiers and the configuration sources of the connection strings `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK`.
