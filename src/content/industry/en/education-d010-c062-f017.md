---
title: Deployment and Upgrades for Research Ethics Review: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c062-f017
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Upgrades | Operations
meta_description: Research Ethics: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Research Ethics Review: Coordinate Operations and Application Handover

## What this category's data looks like

This page is intended for deployment, operations, and application handover materials in the research ethics review scenario, covering three types of records: ethics review applications, informed consent form templates, and risk assessment forms. The materials come from electronic archives submitted by institutional ethics committees and project teams, and the update cadence advances according to review batches and project milestones. When entering the deployment and upgrade function, the ethics review application serves as the project master record, the informed consent form template corresponds to a versioned attachment, and the risk assessment form provides field-level evidence. In the handover sheet, the three types of materials must keep names, quantities, dates, and signature receipts consistent, for operations and the next shift to check item by item.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. The handover-ready deployment status and operation records are then completed by operations handover and business use; the upgrade itself does not produce ethics review applications, informed consent form templates, or risk assessment forms.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | The two image version identifiers must be checked against the version notes and kept consistent; if either is inconsistent, the versions are deemed unsynchronized | Check the version identifiers of the two images in the deployment environment, and record the connection status of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; the execution record must include the task name and status | View the execution record of this migration task on the administrator version upgrade page, and check the trigger time and completion status |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; the time and status of the two records must connect sequentially | Compare the time and status of the two migration records, and confirm that the latter task was executed after the previous task was completed |
| Data row index status | After migration, data rows should fall into the new index status system, with no old markers retained | Sample one data row and check the status field to confirm that the index status is consistent with the migration record |

## Three common errors

- Symptom: the service can start, but the data row status still shows old markers. Cause: the migration script was not executed, or the latter migration was not triggered after the previous migration was completed, so the index status was not switched.
- Symptom: the name, quantity, and date of the same record do not match between the ethics review application and the risk assessment form. Cause: the material versions were not synchronized, and the fields were not checked item by item during handover.
- Symptom: the informed consent form template is missing a signature or receipt. Cause: the handover sheet did not list signatures and receipts as check items, and the material archiving is incomplete.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order, and confirm that the latter migration was triggered after the previous migration was completed.

Business test: check once item by item according to the handover sheet to see which record is missing, focusing on checking the fields, dates, and signatures of the ethics review application, informed consent form template, and risk assessment form.

- Check the two image version identifiers in the deployment environment, and check the connection status of `MONGODB_URI`, `PG_URL`, and `REDIS_URL`.
- View the execution records of the two migration tasks in sequence on the administrator version upgrade page, compare the time and status, and sample one data row to check the index status field.
