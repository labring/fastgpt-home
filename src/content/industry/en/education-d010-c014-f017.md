---
title: Deployment and Upgrades for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c014-f017
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Upgrades | Operations
meta_description: Pastoral Education: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover

## What this category's data looks like

This page is aimed at school moral education and homeroom teacher work scenarios, and covers three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans include the class meeting theme, date held, organizer signature, and moral education office receipt; student comprehensive quality records include evaluation dimensions, record date, homeroom teacher signature, and parent confirmation; home visit records include the student visited, home visit date, teacher signature, and parent receipt. The three types of materials come respectively from homeroom teachers' daily entries, grade group aggregation, and moral education office archiving. The update rhythm is once per weekly class meeting for class meeting plans, updates by semester stage for comprehensive quality records, and by actual home visit occurrence for home visit records. When the materials enter the deployment and upgrade function, each serves as a business deliverable to be checked, used to determine whether the version, connection, and task records are consistent, and as the object of item-by-item verification on the handover form.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | On the administrator version upgrade page, view the version identifiers of the two images and confirm they are consistent |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired | On the administrator version upgrade page, view the execution record of this task and check the trigger time and status |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete | Compare the time and status of the two records to confirm that the latter occurs after the former is complete |
| Data row index status | After migration, it is the new index status system | Sample one data row to check the status field and confirm it has switched from the old marker to the new index status |

## Three common errors

- Symptom: The dates of the same home visit record do not match between the class ledger and the moral education office summary. Cause: The two materials were filled in separately, and the dates and signatures were not checked item by item against the handover form.
- Symptom: The version identifiers of the main service and commercial edition images are inconsistent. Cause: Only one image was updated, while the other remained on the old version, so the versions were not synchronized.
- Symptom: The service can start, but the data row status is still the old marker. Cause: The two migration scripts were not executed in order, or after execution no data row was sampled to check the status field.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order; you can use `MONGODB_URI`, `PG_URL`, and `REDIS_URL` to confirm the connection targets, and record the status values in the migration task records.

Business test: check once item by item against the handover form to see which record is missing; compare the names, quantities, dates, and signatures of themed class meeting plans, student comprehensive quality records, and home visit records item by item. A missing signature or receipt is recorded as a missing item.

- On the administrator version upgrade page, check the two image version identifiers and the execution records of the two migration scripts, and confirm that the version, connection, and task records are consistent.
- Sample one data row to check the index status field, and check whether the dates and signatures of themed class meeting plans, student comprehensive quality records, and home visit records are complete.
