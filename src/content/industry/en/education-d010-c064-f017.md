---
title: Deployment and Upgrades for University Laboratory Safety Classification: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c064-f017
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Upgrades | Operations
meta_description: Lab Safety Categories: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for University Laboratory Safety Classification: Coordinate Operations and Application Handover

## What this category's data looks like

In the deployment, operations, and application handover stage, university laboratory safety grading and classification involves three categories of materials: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table records the laboratory name, hazard source category, and level; the hazard source list records the hazard source name, quantity, and storage location; the safety responsibility statement records the responsible person, date, and signature. These three categories of materials come from the laboratory management department and departmental submissions, and their update cadence adjusts with laboratory renovations, increases or decreases in hazard sources, and changes in responsible persons. When entering the deployment and upgrade function, the grading and classification table and the hazard source list are used to check the data row index status and migration task records, and the safety responsibility statement is used to confirm whether signatures and receipts are complete; together, the three support a handover-ready deployment state and operation records.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "A handover-ready deployment state and operation records" is then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Check the laboratory name, hazard source category and level, as well as the submission date and signature field | Check the name and quantity item by item against the hazard source list, and check whether the date and signature are consistent |
| Hazard source list | Check the hazard source name, quantity, storage location, and update date | Compare the name, quantity, and date item by item with the same record in the grading and classification table; mark any missing signature or receipt |
| Safety responsibility statement | Check the responsible person, signing date, and signature and seal | Check whether the receipt is complete, and compare it with the responsible person field in the grading and classification table |
| Image version identifier | The two images are the same target version | On the administrator version upgrade page, check the main service and commercial edition image identifiers against the version description |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the grading and classification table and the hazard source list. Cause: The two materials were submitted separately and were not updated in sync under the same version.
- Symptom: The service can start, but the data row status still shows the old marker. Cause: The migration script was not executed or was executed in the wrong order, and the latter script depends on the former completing.
- Symptom: The safety responsibility statement is missing a signature or receipt, and the handover form check cannot be closed out. Cause: The signing step was not returned, or the version was not synchronized, causing the date on the signature page to be inconsistent with the date in the body text.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order, and confirm that the image version identifiers are consistent with the migration task records.

Business test: check item by item once according to the handover form to see which record is missing, focusing on checking the fields, dates, and signatures of the grading and classification table, the hazard source list, and the safety responsibility statement.

- On the administrator version upgrade page, view the execution records of the historical chunk training task migration and the knowledge base rebuild status migration, and confirm that the former is complete before triggering the latter.
- Sample one data row to check the status field, and check the availability of the connections corresponding to `MONGODB_URI`, `PG_URL`, and `REDIS_URL` in the deployment environment.
