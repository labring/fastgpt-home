---
title: Database Connections and Operations for National Key Research and Development Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c057-f011
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Databases | Operations
meta_description: National R&D Grants: review databases for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for National Key Research and Development Applications: Coordinate Operations and Application Handover

## What this category's data looks like

National Key R&D Program project application materials usually consist of three types of documents: the project application form, the budget application form, and the cooperation agreement. They are submitted jointly by the applying unit and participating units, and the update cadence is concentrated in the application window period and the task book signing stage. When entering the deployment, operations, and application handover stage, the project application form carries the task indicators and assessment milestones, the budget application form carries the funding categories and disbursement arrangements, and the cooperation agreement carries the division of labor among participating units, intellectual property, and signatures and seals. The field characteristics are dense names, quantities, dates, and signature fields. The same record often appears repeatedly across multiple materials. The deployment status and operation records must correspond item by item with these three types of materials in order to form a handover-ready deployment status and operation records.

## Configuration and implementation checks

This step is determined by the connection configuration of the deployment environment (server side), not by the capability execution of a model node, and outputs whether the connection is available (service startup result and connection logs). The handover-ready deployment status and operation records are then completed by deployment handover and subsequent business processing. The connection address is configured by environment variables, and the main business database, log database, cache, and vector database can point to different instances respectively.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Check whether the name, quantity, date, and signature fields are consistent with the budget application form and cooperation agreement | Compare page by page the field values of the same record across the three materials, and record the locations of discrepancies |
| Budget application form | Check whether the funding categories, disbursement dates, and signature receipts are complete | Compare against the division of labor and amounts in the cooperation agreement, and check items missing signatures or receipts |
| Cooperation agreement | Check whether the names of participating units, task division, and seal dates are synchronized | Check the version number and signing date, and confirm items whose versions are not synchronized with the application form |
| Deployment environment connection configuration | The connection addresses of the main business database, log database, cache, and vector database are consistent with the actual instances | In the deployment environment, check the values of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` against the database addresses, and see whether the log database variable is set separately or left empty to reuse the main database |

## Three common errors

- Symptom: The same participating unit name is written differently in the project application form and the cooperation agreement. Cause: The two materials were drafted separately without field-level comparison, and verification during handover was based on a single material.
- Symptom: The amounts, quantities, and disbursement dates in the budget application form and the cooperation agreement do not match. Cause: The versions were not synchronized; after modification, only one of them was updated, while the other remained an old draft.
- Symptom: The signature field or receipt is missing on the handover form, but the deployment status is still recorded as handover-ready. Cause: It was assumed by process default that signatures were already obtained, without checking the signatures and original receipts item by item.

## How to verify the setup

Acceptance of this function: connect once to the main business database, log database, cache, and vector database item by item, check the connection results in the startup logs, and confirm that the instances pointed to by `MONGODB_URI`, `PG_URL`, and `REDIS_URL` are reachable.

Business test: check once item by item according to the handover form, see which record is missing, and verify the fields, dates, and signatures of the project application form, budget application form, and cooperation agreement.

- In the deployment environment, check the values of the main business database and log database connection variables, and see whether the log database variable is set separately or left empty to reuse the main database
- Use a client to connect once to the cache instance and check the response, compare the selected vector database and address against the deployment instructions, and record the connection log results
