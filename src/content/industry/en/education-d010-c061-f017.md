---
title: Deployment and Upgrades for Research Outcome Registration and Intellectual Property: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c061-f017
page_type: 行业问题页
application_area: education
meta_title: Research IP | Upgrades | Operations
meta_description: Research IP: review upgrades for operational handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Research Outcome Registration and Intellectual Property: Coordinate Operations and Application Handover

## What this category's data looks like

In the deployment, operations, and application handover stage of research achievement registration and intellectual property management, three types of materials are mainly involved: achievement registration forms, patent disclosure documents, and software copyright materials. The achievement registration form records the achievement name, completers, date, and signature, and is the starting point of the registration process; the patent disclosure document carries the technical solution, inventor, application date, and departmental seal; the software copyright materials include the source code list, version number, development completion date, and receipt. When these three types of materials enter the deployment and upgrade function, each plays a different role: the achievement registration form is used to check consistency between the version and task records, the patent disclosure document is used to confirm the date and signature chain, and the software copyright materials are used to compare names, quantities, and version identifiers. In terms of update cadence, the materials are refreshed synchronously with version upgrades and migration tasks, and the field characteristics are concentrated in name, quantity, date, signature, and receipt.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature are consistent with the patent disclosure document, and whether the version is synchronized | Compare the version descriptions to check the two image version identifiers, check the name, quantity, and date of the same record in the registration form and the disclosure document, and mark it if the signature or receipt is missing; check `MONGODB_URI` and `PG_URL` for the connection string |
| Patent disclosure document | Whether the inventor, application date, and departmental seal match the software copyright materials | View the execution records of the historical chunk training task migration on the administrator's version upgrade page, and compare the dates and seals of the disclosure document and the copyright materials; check `REDIS_URL` for the connection string |
| Software copyright materials | Whether the source code list version number and development completion date are synchronized with the migration task records | Compare the time and status of the knowledge base rebuild status migration records, sample one data row to check the status field, confirm that the name, quantity, and date are consistent, and that the status value is indexed |
| Data row index status | After migration, it is a new index status system; whether the old markers have been cleared | Sample one data row to check the status field, confirm that the old rebuilding marker has been migrated to the new index status system, and that the status value is parsed |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the historical chunk training task migration has not been executed or has not completed, the old task lease has not expired, and the data row index status has not been synchronized.
- Symptom: the name, quantity, and date of the same record in the achievement registration form and the patent disclosure document do not match. Cause: the versions are not synchronized, the two materials are updated separately, and there is a lack of unified verification and signature receipt.
- Symptom: the script execution reports an error or the two image versions are inconsistent. Cause: the old instance has not been fully stopped, or the latter migration script is triggered before the former has completed, causing the task records and version identifiers to be misaligned.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order; check `MONGODB_URI`, `PG_URL`, and `REDIS_URL` for the connection string, and check indexed and parsed for the status values.

Business test: check each item once according to the handover form, and see which record is missing.

- On the administrator's version upgrade page, view the execution records of the historical chunk training task migration and the knowledge base rebuild status migration, and confirm that the time and status order of the two records are correct.
- Compare the version descriptions to check the version identifiers of the main service and commercial edition images, and sample one data row to check the status field, confirming that the old marker has been migrated.
