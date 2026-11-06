---
title: Deployment and Upgrades for Daily Kindergarten Care Management: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c001-f017
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Upgrades | Operations
meta_description: Kindergarten Care: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for Daily Kindergarten Care Management: Coordinate Operations and Application Handover

## What this category's data looks like

Daily kindergarten care produces routine schedules, morning and afternoon health check records, and class handover logs. Schedules change with the term or planned activities, health checks are recorded for the day, and handover logs follow staff shifts. Dates, classes, children's names, check items and responsible staff signatures need to correspond. During an application upgrade, these materials serve as retained business regression samples. Image versions and migration task records support a separate service upgrade check.

Before handover, select a current set of materials for one class and record its document versions and test questions. A question can compare the day's health check items with the routine schedule, then locate an item that the next shift must handle in the handover log. Reuse these inputs after the upgrade to compare fields, cited passages and handover items with the original materials.

## Configuration and implementation checks

The technical baseline is v4.17.2. Update the FastGPT App and Pro images, confirm that all old instances have stopped and wait for old training-task leases to expire. An administrator manually runs historical chunk training task migration from the version upgrade page. Run knowledge base rebuild state migration after the first task finishes. Record service readiness, migration completion and business regression results separately.

| Object | Check | Verification action |
| --- | --- | --- |
| App and Pro images | New instances use the target version and old instances have stopped | Check running images and the instance list, and record the status of old training-task leases |
| Two manual migrations | Historical training task migration finishes before rebuild state migration | Inspect the execution state and error record of each task on the administrator version upgrade page |
| Class regression samples | The current schedule, health checks and handover log correspond | Open the source cited for the retained question and compare class, date and check items |
| Shift handover record | Business and service checks each have results and a responsible person | Associate an exception with its document version, data row or migration task before assigning follow-up |

## Three common errors

- Symptom: the service is accessible while historical training tasks or rebuild states remain unmigrated. Check the manual task records and the conditions for stopping old instances and expiring leases.
- Symptom: an answer cites an old routine schedule. Locate the actual source hit, check whether the current file replaced the previous version and whether an old file remains in retrieval scope. Handle source versions separately from migration tasks.
- Symptom: the health check record and class handover log use different dates or check items. Compare the original records for the same class and day, including business templates, input fields and signatures.

## How to verify the setup

Check the target images and both migration results first, then run the retained care-management questions. Retrieve the day's health check item, open the cited source and compare the routine schedule with the handover log. The service check records task states; the business check records actual inputs and their corresponding materials.

- Record new and old instances, task leases and the sequence of both migrations. Retain the error and processed scope of a failed task.
- Use the schedule, health check record and handover log for the same class. Record differences in dates, items, responsible people and acknowledgments before completing the shift handover.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/self-host/upgrading/4-17/4172.mdx)
