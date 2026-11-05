---
title: Deployment and Upgrades for Kindergarten Healthcare and Meal Management: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c003-f017
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Upgrades | Operations
meta_description: Child Health and Meals: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Kindergarten Healthcare and Meal Management: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the kindergarten health care and meal management scenario, with materials drawn from ingredient purchase orders, retention sample registration, menu scheduling, disinfection records, and absence cause classification tables. When these materials enter the deployment and upgrade function, they respectively serve as inputs for version verification, migration triggering, and index status confirmation: purchase orders and menus are used to compare category consistency, retention sample registration and batches are used to verify documents against physical items, disinfection records are used to check time period completeness, and absence cause classification is used to confirm the field classification criteria. Materials are updated daily or per shift, and field characteristics include ingredient name and specification, retention sample time and batch, disinfection time period, and absence cause classification. On the deployment side, these fields must be archived together with image versions, migration task records, and data row index status, forming a handover-ready deployment status and operation record.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. The "handover-ready deployment status and operation record" is then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Primary service and commercial edition image versions | Both images are the same target version and match the identifiers in the version notes | Check the version identifiers of both images against the version notes, and record the verification time |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; execution records are queryable | View the execution record of this task on the administrator version upgrade page, and confirm the trigger preconditions |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; the time and status of the two records can be compared | Compare the time and status of the two migration records, and confirm the sequence |
| Data row index status | After migration, it is the new index status system; sample one data row to check the status field | Sample one data row to check the status field, and confirm it is no longer the old marker |

## Three common errors

- Symptom: Documents and retention sample batches do not match, and the retention sample physical item cannot be confirmed during handover. Cause: Retention sample registration records only the time and not the batch, and purchase orders and retention sample records are not associated by the same batch number.
- Symptom: The menu and purchase categories are inconsistent, and category gaps appear in the meal management records. Cause: Menu scheduling and purchase orders are maintained separately, and ingredient names and specifications are not compared item by item.
- Symptom: Disinfection records are missing time periods, and blank periods are found when checking the handover form. Cause: Disinfection time periods are filled in by shift, and cross-shift handover is not supplemented, resulting in discontinuous time period records.

## How to verify the setup

This function's acceptance: verify the two image version identifiers, then verify the execution records of the two migration scripts in order; at the same time, confirm that the connection status of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` is consistent with the migration task records.

Business test: check item by item once according to the handover form to see which record is missing, focusing on ingredient name and specification, retention sample time and batch, disinfection time period, and absence cause classification.

- View the execution records of the two migration scripts on the administrator version upgrade page, and confirm that the second is triggered only after the first is complete.
- Sample one data row to check the index status field, confirm that it has been migrated to the new index status system, and record the verification result.
