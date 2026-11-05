---
title: Deployment and Upgrades for District Teaching Research and Classroom Reviews: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c012-f017
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Upgrades | Operations
meta_description: Teaching Reviews: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for District Teaching Research and Classroom Reviews: Coordinate Operations and Application Handover

## What this category's data looks like

Materials for district and county teaching research activities and lesson observation and evaluation include three categories: teaching research activity notices, lesson observation records, and lesson evaluation minutes. Notices are issued by the teaching research department weekly or by activity batch, with fields including activity theme, time, location, participating schools, and subject; lesson observation records are filled in on site by the observer, with fields including teaching teacher, class, topic, observation dimensions, and time; lesson evaluation minutes are organized after the lesson evaluation, with fields including review points, improvement suggestions, host signature, and participant receipt. When these three categories of materials enter the deployment and upgrade function, notices carry the version and batch identifier, lesson observation records carry the correspondence of data row indexes, and lesson evaluation minutes carry the integrity evidence of signatures and receipts. The update rhythm follows the teaching research activity batches, and dates and signatures are the key fields for cross-material alignment.

## Configuration and implementation checks

This step is executed by the deployment environment and the administrator version upgrade page (server-side operation), outputting image versions, migration task records, and data row index status. "Handover-ready deployment status and operation records" are then completed by operations handover and business use. The upgrade includes version updates of two images, the main service and the commercial edition, as well as two manually triggered migration scripts. The scripts do not block service startup, and the latter depends on the former being completed.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are at the same target version; check the version identifiers of the two images against the version description | View the version identifiers of the two images in the deployment environment, and check whether the connection parameters `MONGODB_URI`, `PG_URL`, and `REDIS_URL` point to the same set of instances |
| Historical chunk training task migration | Trigger only after the old instance has been fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | Confirm that the old-version instance in the cluster has been stopped, then view the execution record and time of this migration task |
| Knowledge base rebuild status migration | Trigger only after the previous migration is completed; compare the time and status of the two records | Compare the time and status of the two migration task records, and confirm that the latter was executed after the former was completed |
| Data row index status | After migration, it is the new index status system; sample one data row to check the status field | Sample one data row to check the index status field, and confirm that it is no longer the old-version marker |

## Three common errors

- Symptom: The name and date of the same lesson observation record do not match between the notice and the minutes. Cause: The two materials were filled in separately, were not aligned by batch field, and one record was missing during handover.
- Symptom: The version identifiers of the two images are inconsistent. Cause: Only one image was updated, while the other image remained at the old version, so the versions were not synchronized.
- Symptom: The service can start, but the data row status is still the old marker. Cause: The migration script was not executed or reported an error during execution; consistent image versions do not mean that the business data migration has been completed.

## How to verify the setup

Acceptance for this function: check the version identifiers of the two images, then check the execution records of the two migration scripts in order, and check the data row index status field.

Business test: check item by item once according to the handover form to see which record is missing, and check the fields, dates, and signatures of the notice, lesson observation record, and lesson evaluation minutes.

- In the deployment environment, check the version identifiers of the two images, and check whether connection parameters such as `DB_MAX_LINK` point to the same set of instances.
- On the administrator version upgrade page, view the execution records and times of the two migration tasks, and sample one data row to check the index status field.
