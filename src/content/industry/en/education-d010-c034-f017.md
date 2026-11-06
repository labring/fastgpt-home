---
title: Deployment and Upgrades for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c034-f017
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Upgrades | Operations
meta_description: Skills Certification: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the deployment, operations, and application handover for social evaluation of vocational skill level certification. The source materials are the evaluation implementation plan, candidate registration forms, and assessor dispatch forms, and the update cadence is synchronized with certification batches and deployment versions. When the evaluation implementation plan enters deployment and upgrade, it assumes the role of version baseline; its fields, dates, and signatures determine whether the mirror version identifiers and migration task records can be aligned. The candidate registration form assumes the role of data row; names, quantities, and dates must be consistent with the implementation plan. The assessor dispatch form assumes the role of handover receipt; if signatures or receipts are missing, the operations handover cannot be completed. The three types of materials correspond respectively to the version, data row index status, and handover records in the deployment environment and the administrator version upgrade page. If any field does not match, it is determined that handover is not possible.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the mirror version, migration task records, and data row index status. The deployable deployment status and operation records are then completed by operations handover and business use; the migration script does not block service startup.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | The version, date, and signature must be consistent with the mirror version identifier; if the name and quantity do not match, handover is not possible | Check the version identifiers of the main service and commercial edition mirrors against the version description, and verify the plan signature and receipt |
| Candidate registration form | The data row index status must be the new status system after migration; if old markers remain, it is inconsistent | Sample one data row to check the status field, and verify that the registration form name, quantity, and date are consistent with the plan |
| Assessor dispatch form | The dispatch date and signature must align with the migration task record time; if the signature or receipt is missing, the item is missing | View the time and status of the two migration task records on the version upgrade page, and verify the dispatch form signature item by item |
| Deployment environment connection parameters | The connection parameters must be consistent with the deployment environment in order to read the migration task records | Verify that `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and `DB_MAX_LINK` are filled in consistently with the deployment environment |

## Three common errors

- Symptom: the service starts but the data row status still shows old markers. Cause: the knowledge base rebuild status migration was not triggered after the previous migration completed, so the data row index status did not enter the new system.
- Symptom: the name, quantity, and date of the same record do not match between the evaluation implementation plan and the candidate registration form. Cause: the two materials were not synchronized according to the same batch version, and items were missing during the item-by-item check of the handover form.
- Symptom: the two mirror versions are inconsistent, or the migration task records lack signature receipts. Cause: the main service and commercial edition mirrors were not updated synchronously, and the operations handover did not complete receipt archiving.

## How to verify the setup

Acceptance for this feature: check the two mirror version identifiers, then check in order the two execution records for historical chunk training task migration and knowledge base rebuild status migration, and confirm that the old instance has stopped, the old task lease has expired, and the previous migration has completed.

Business test: perform an item-by-item check once according to the handover form to see which record is missing, focusing on the fields, dates, and signatures of the evaluation implementation plan, candidate registration form, and assessor dispatch form.

- On the administrator version upgrade page, view the execution time and status of the two migration task records, and confirm the order and dependency relationship.
- Sample one data row to check the index status field, and verify that `MONGODB_URI`, `PG_URL`, `REDIS_URL`, and the deployment environment are consistent.
