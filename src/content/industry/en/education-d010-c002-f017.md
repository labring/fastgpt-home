---
title: Deployment and Upgrades for Kindergarten Play Activity Organization: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c002-f017
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Upgrades | Operations
meta_description: Kindergarten Play: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Kindergarten Play Activity Organization: Coordinate Operations and Application Handover

## What this category's data looks like

In the deployment, operations, and application handover stage of kindergarten game activity organization, materials come from class observation records, area plan sheets, material placement lists, activity goal cards, and reflection-to-next-week plan sheets. The correspondence between observation records and area plans is the first item on the handover form; the quantity of materials placed determines whether activities can be carried out as planned; activity goal achievement must be compared item by item with observation records; and the reflection-to-next-week plan affects the next round of area arrangements. When these materials enter the deployment environment and the administrator version upgrade page, each has a different role: observation records and area plans serve as the business-side handover working papers, the material placement list is used to verify quantities, the activity goal card is used to determine whether goals and observations are consistent, and the reflection-to-next-week plan sheet is used to confirm whether the plan has been updated. The update cadence follows the class activity cycle, updating once after each activity ends; field characteristics are mainly text records and status markers, and status markers contain only two types: mirror version identifiers and migration task records.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), outputting mirror versions, migration task records, and data row index status. The handover-capable deployment status and operation records are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Primary service and commercial edition mirror versions | Both mirrors are the same target version; check the version identifiers of the two mirrors against the version notes | View the version identifiers of the two mirrors in the deployment environment, confirm they are consistent, then write them into the handover form |
| Historical chunk training task migration | Triggered only after the old instance has completely stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | Check the task record in the database pointed to by `MONGODB_URI`, confirming the old instance has stopped and the lease has expired |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; compare the time and status of the two records | Check the `PG_URL` and `REDIS_URL` connections, then view the time and status of the two records |
| Data row index status | After migration it is a new index status system; sample one data row to check the status field | Sample one data row to check the status field, confirming it is no longer the old marker |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the migration script was not executed or errored during execution, so the data row index status has not entered the new system.
- Symptom: the quantity of materials placed does not match the area plan, and activity goals do not match observation records. Cause: during handover, material quantities and goal achievement were not checked item by item according to the handover form.
- Symptom: the reflection-to-next-week plan was not updated, and the next shift continues to use the old plan. Cause: the handover form lacks a plan update record, and operations handover and business use have not completed verification.

## How to verify the setup

Acceptance for this feature: check the two mirror version identifiers, then check the execution records of the two migration scripts in order, confirming that the latter depends on the former being completed.

Business test: check item by item once according to the handover form, and see which record is missing.

- View the version identifiers of the two mirrors in the deployment environment, confirm they are consistent, then write them into the handover form.
- View the execution records of the two migration tasks on the administrator version upgrade page, check the time and status in order, and sample one data row to check the status field.
