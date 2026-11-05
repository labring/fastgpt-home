---
title: Deployment and Upgrades for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c026-f017
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Upgrades | Operations
meta_description: Degree Certificates: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover

## What this category's data looks like

Degree conferral and certificate information reporting materials include degree application forms, thesis review forms, defense resolutions, as well as certificate receipts and signature pages. These materials come from training units, review experts, and defense committees, and their update cadence is concentrated around degree conferral batches; their field characteristics are name, student ID, thesis title, date, signature, and quantity. When the materials enter the deployment and upgrade function, each plays a different role: the degree application form is used to verify the conferral recipients and batch, the thesis review form is used to verify the review conclusion and date, and the defense resolution is used to verify the voting result and signature. Reporting records must correspond item by item with these materials, to avoid the same record having mismatched names, quantities, or dates across two materials, or versions not being synchronized, or missing signatures or receipts.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" is then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Primary service and commercial edition image versions | Both images are the same target version | Check the version identifiers of both images against the version notes |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired | View the execution record of this task on the administrator version upgrade page |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete | Compare the time and status of the two records |
| Data row index status | After migration, it is the new index status system | Sample one data row and check the status field |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the migration script was not executed or was not executed in order, and the data row index status was not switched to the new system.
- Symptom: the same record has mismatched names, quantities, or dates in the degree application form and the defense resolution. Cause: the two materials' versions are not synchronized, and signatures or receipts are missing.
- Symptom: the script execution reports an error or the two image versions are inconsistent. Cause: the old instance has not fully stopped, the old task lease has not expired, or the images have not been synchronized to the same target version.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order.

Business test: check item by item once according to the handover sheet, and see which record is missing.

- Check the connection configurations of `MONGODB_URI`, `PG_URL`, and `REDIS_URL`, and confirm that the migration task records and data row index status are consistent.
- Check the fields, dates, and signatures of the degree application form, thesis review form, and defense resolution item by item according to the handover sheet, and confirm that the versions are synchronized and no items are missing.
