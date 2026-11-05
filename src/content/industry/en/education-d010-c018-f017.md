---
title: Deployment and Upgrades for Undergraduate Curriculum Planning: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c018-f017
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Upgrades | Operations
meta_description: Program Revision: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Undergraduate Curriculum Planning: Coordinate Operations and Application Handover

## What this category's data looks like

The materials for undergraduate program revision include program plans, course syllabi, and credit structure tables. They come from academic affairs system exports and departmental submissions, and are updated on a semester or revision-batch basis. Their field characteristics center on course names, credit counts, revision dates, and review signatures. When these materials enter the deployment and upgrade function, each plays a different role: the program plan provides the version baseline, the course syllabi carry course-level changes, and the credit structure table verifies consistency of counts and dates. The materials need to form a traceable chain with version identifiers, migration task records, and data row index status, to avoid the same record having mismatched names, counts, or dates across two materials, or versions not being synchronized, signatures or receipts missing.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs image versions, migration task records, and data row index status. The handover-ready deployment status and operation records are then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Main service and commercial edition image versions | Both images are the same target version; check the version identifiers of the two images against the version notes | On the administrator version upgrade page, check whether the version identifiers of the two images are consistent, and record the version numbers |
| Historical chunk training task migration | Triggered only after the old instance has fully stopped and the old task lease has expired; view the execution record of this task on the administrator version upgrade page | Confirm that all old-version instances have stopped, check that the old task lease has expired, then view the migration task record |
| Knowledge base rebuild status migration | Triggered only after the previous migration is complete; check the time and status of the two records against each other | First verify that the training task migration record is complete, then check the time and status of the rebuild status migration record |
| Data row index status | After migration it is the new index status system; sample one data row and check the status field | Sample one data row and check whether the status field is the new index status system |

## Three common errors

- Symptom: the service can start but the data row status is still the old marker. Cause: the knowledge base rebuild status migration was not executed or not completed, and the old rebuilding marker was not migrated to the new index status system.
- Symptom: the same record has mismatched names, counts, or dates across two materials. Cause: the program plan and course syllabi were not revised in sync, and the credit structure table was not updated, resulting in inconsistent fields and dates.
- Symptom: the two image versions are inconsistent or the migration script reports an error during execution. Cause: the main service and commercial edition images were not updated in sync, or the script was triggered before the old instances fully stopped and the old task lease expired.

## How to verify the setup

Acceptance for this function: check the two image version identifiers, then check the execution records of the two migration scripts in order; also check the data row index status field, and confirm that the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection configurations remain consistent before and after migration.

Business test: check each item once against the handover form to see which record is missing; focus on checking the fields, dates, and signatures of the program plan, course syllabi, and credit structure table, and confirm that versions, connections, and task records are consistent.

- On the administrator version upgrade page, view the version identifiers of the two images and the execution records of the two migration scripts, and record the time and status item by item.
- Sample one data row to check the index status field, and check whether the `MONGODB_URI`, `PG_URL`, and `REDIS_URL` connection configurations correspond to the migration task records.
