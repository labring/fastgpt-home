---
title: Deployment and Upgrades for Course Selection, Timetables and Classroom Allocation: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c019-f017
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Upgrades | Operations
meta_description: Course Scheduling: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Course Selection, Timetables and Classroom Allocation: Coordinate Operations and Application Handover

## What this category's data looks like

Materials in the course selection, scheduling, and classroom resource scheduling category come from three types of business documents: course offering plans, scheduling tables, and course selection rules; their update cadence follows semester batches and academic affairs adjustments. Course offering plans provide fields for courses, classes, capacity, and semester dates; scheduling tables carry the correspondences among classrooms, time slots, teachers, and classes; course selection rules record selection priorities, restriction conditions, and effective dates. When these materials enter the deployment and upgrade feature, each plays a different role: course offering plans and scheduling tables are used to check whether the data row index status is consistent with business records, and course selection rules are used to confirm that rule fields have not been overwritten by old markers after migration. On the deployment side, attention must be paid to image version identifiers and migration task records; on the business side, attention must be paid to whether the fields, dates, and signatures of the three types of materials are complete, so that operations handover and the next shift can check item by item according to the handover form.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" is then completed by operations handover and business use. The upgrade includes version updates for two images, the main service and the commercial edition, as well as two manually triggered migration scripts; both migrations are manual tasks, with rebuild state migration executed after historical chunk training task migration finishes.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of both images against the version notes | On the administrator version upgrade page, view the version identifiers of both images, and check whether the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection configurations are consistent with the deployment environment |
| Historical chunk training task migration | Trigger only after the old instances have been completely stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | Confirm that all old-version FastGPT App and Pro instances in the cluster have been completely stopped, then click execute and record the task status |
| Knowledge base rebuild status migration | Trigger after the previous migration is complete; check the time and status of the two records | Check the time order and completion status of the two migration task records, and confirm that the latter migration is executed after the former is complete |
| Data row index status | After migration, it is the new index status system; sample one data row and check the status field | Sample one data row, check whether the status field is the new index status system, and check the fields, dates, and signatures of the course offering plans, scheduling tables, and course selection rules |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: only the image version identifiers were checked, and the two migration scripts were not executed in order and the migration task records were not checked.
- Symptom: the name, quantity, and date of the same record do not match between the course offering plan and the scheduling table. Cause: the two materials were not checked item by item according to the handover form, and signatures or receipts are missing.
- Symptom: the script execution reports an error or the two image versions are inconsistent, causing the versions not to be synchronized. Cause: the old instances were not completely stopped, the old task lease had not expired, or the latter migration was triggered before the former was complete.

## How to verify the setup

This feature acceptance: check the version identifiers of the two images, then check the execution records of the two migration scripts in order.

Business test: check item by item once according to the handover form, and see which record is missing.

- On the administrator version upgrade page, view the version identifiers of the two images and the two migration task records, and confirm the time and status.
- Sample one data row to check the status field, and check the fields, dates, and signatures of the course offering plans, scheduling tables, and course selection rules.
