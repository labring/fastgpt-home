---
title: Database Connections and Operations for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics
slug: /en/industry/education-d006-c060-f011
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Databases | Progress
meta_description: Research Progress: review databases for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for Research Project Annual Progress and Acceptance: Track Progress and Check Statistics

## What this category's data looks like

Annual progress and acceptance of research projects usually involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Fields include project name, undertaking unit, start and end dates, stage objectives, completion status, funding execution, signatures, and receipts. The materials are submitted by the project team on a periodic basis; the update cadence is quarterly or annual aggregation, with centralized verification before acceptance. When entering the progress records and statistical verification function, the annual progress report provides the current year's tasks and completion volume, the mid-term review materials provide stage milestones and the basis for adjustments, and the acceptance report provides the final conclusion and signature page. The three types of materials must be consistent in name, quantity, and date; version synchronization and complete signatures and receipts are the focus of verification. The progress table and statistical scope description are completed next by deployment handover and subsequent business processing, and are used for weekly or monthly reports.

## Configuration and implementation checks

This part is executed by the connection configuration of the deployment environment (server side), not by the capability of a model node, and outputs whether the connection is available (service startup result and connection logs). The "progress table and statistical scope description" is completed next by deployment handover and subsequent business processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Main business database connection variable | Points to the main business database actually in use and can connect; the fields of the annual progress report and acceptance report can be mapped | In the deployment environment, check that the variable value matches the database address, and check `MONGODB_URI` against the database address |
| Log database connection variable | Configured separately, or left empty to reuse the main database as instructed; does not affect where business materials are stored | Check whether the variable is set, verify the database to which logs are written, and check the relationship between `MONGODB_URI` and the log database |
| Cache connection variable | The cache instance can connect, supporting streaming recovery mirroring and temporary storage of progress records | Connect once with a client, verify the response, and check `REDIS_URL` against the cache instance address |
| Vector database connection variable | Consistent with the vector database actually in use, supporting retrieval verification | Check the selected vector database and address against the deployment instructions, and check `PG_URL` against the vector database address |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: versions are not synchronized, and there is no unified scope or signatures and receipts.
- Symptom: the stage milestones in the mid-term review materials and the annual progress report are inconsistent. Cause: the materials have different update cadences and were not verified against the same version.
- Symptom: after startup, the logs continuously report connection timeouts. Cause: the connection address value does not match the database address, or the cache instance cannot connect.

## How to verify the setup

Acceptance of this function: connect once to each of the main business database, log database, cache, and vector database, check the connection results in the startup logs, and check that the three values `MONGODB_URI`, `REDIS_URL`, and `PG_URL` are consistent with the deployment instructions.

Business test: use one week of records to verify the totals, see whether the scope and exceptions are clearly stated, and check whether the fields, dates, and signatures of the annual progress report, mid-term review materials, and acceptance report are consistent.

- In the deployment environment, check item by item that the connection variable values of the main business database, log database, cache, and vector database match the database addresses, and view the startup logs.
- Use one week of records to verify the totals, check whether the statistical scope and exceptions are written into the table header, and check the names, quantities, dates, and signatures and receipts of the three types of materials.
