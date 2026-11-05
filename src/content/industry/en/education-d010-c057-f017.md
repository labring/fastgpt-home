---
title: Deployment and Upgrades for National Key Research and Development Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c057-f017
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Upgrades | Operations
meta_description: National R&D Grants: review upgrades for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Deployment and Upgrades for National Key Research and Development Applications: Coordinate Operations and Application Handover

## What this category's data looks like

National Key R&D Program project application materials usually include the project application form, budget application form, and cooperation agreement, submitted in batches by the research management department and the project team, with an update cadence that follows application milestones and supplementary notices. The three types of materials play different roles in deployment, operations, and application handover: the project application form provides the task and indicator definitions, the budget application form provides the funding and resource definitions, and the cooperation agreement provides the participant and division-of-labor definitions. Field characteristics center on names, quantities, dates, and signatures, and the same record must keep its fields consistent across the three materials. When the materials enter the deployment and upgrade function, they are used to check whether the version, connections, and task records are consistent with one another, and serve as the basis for item-by-item verification against the handover form.

## Configuration and implementation checks

This step is performed by the deployment environment and the administrator version upgrade page (server-side operation), and outputs the image version, migration task records, and data row index status. "Handover-ready deployment status and operation records" is then completed by operations handover and business use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Names, quantities, dates, and signatures must be aligned across the three materials, and the version identifier must be synchronized with the image version identifier | Check the version identifiers of the two images, the main service and the commercial edition, against the version description, and check whether the connection records of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` are consistent with the deployment description in the application form |
| Budget application form | The names, quantities, and dates of the same record must not mismatch between the two materials; missing signatures or receipts must be corrected | On the administrator version upgrade page, view the execution records of the historical chunk training task migration, and check that the old instance has been fully stopped and the old task lease has expired before it is triggered |
| Cooperation agreement | The participant and division-of-labor definitions must be consistent with the project application form; missing signatures or receipts are regarded as incomplete | Check the time and status of the two records of the knowledge base rebuild status migration, confirm that the next migration is triggered only after the previous one is complete, and sample one data row to check the status field |

## Three common errors

- Symptom: the service starts but the data row status is still the old marker. Cause: a consistent image version does not mean the business data migration is complete; the knowledge base rebuild status migration was not executed or not completed.
- Symptom: the names, quantities, and dates of the same record do not match between the project application form and the budget application form. Cause: the two materials are maintained separately and were not checked item by item against the handover form even once.
- Symptom: the script execution reports an error or the two image versions are inconsistent. Cause: the old instance was not fully stopped, the old task lease has not expired, or the version was not synchronized, with missing signatures or receipts.

## How to verify the setup

This function's acceptance: check the two image version identifiers, then check the execution records of the two migration scripts in order, and confirm that the image version identifiers are consistent with the migration task records.

Business test: check item by item against the handover form once, see which record is missing, and check the `DB_MAX_LINK` connection record and the data row index status field.

- On the administrator version upgrade page, view the execution records of the historical chunk training task migration and the knowledge base rebuild status migration, and check the time and status of the two records.
- Check the version identifiers of the two images, the main service and the commercial edition, against the version description, and sample one data row to check whether the status field is the new index status system.
