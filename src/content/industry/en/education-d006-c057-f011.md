---
title: Database Connections and Operations for National Key Research and Development Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c057-f011
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Databases | Progress
meta_description: National R&D Grants: review databases for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for National Key Research and Development Applications: Track Progress and Check Statistics

## What this category's data looks like

National Key R&D Program project application materials include three types: the project application form, the budget application form, and the cooperation agreement. The sources are paper and electronic copies submitted by each participating unit, and the update rhythm is batch collection according to application milestones. When entering the progress recording and statistical verification function, the project application form serves as the main record source, providing the project name, period, participating units, and task division; the budget application form provides funding categories, amounts, and disbursement milestones, used for item-by-item comparison with the project application form; the cooperation agreement provides signatories, cooperation term, and signature pages, used to verify seals and receipts. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The three types of materials may each be expressed differently under the same project, so the definitions must first be unified before registering the progress table.

## Configuration and implementation checks

This part is handled by the deployment environment's connection configuration (server side), not by the capability execution of a model node, and outputs whether the connection is available (service startup result and connection logs). The "progress table and statistical definition notes" are completed next by deployment handover and subsequent business processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Verify name, quantity, date, and signature item by item against the budget application form and cooperation agreement | Take the same project record and compare the project name, number of participating units, start and end dates, and signature pages across the three materials, registering each discrepancy one by one |
| Budget application form | Funding categories and amounts can be matched item by item between the project application form and cooperation agreement | List amounts by category, compare them side by side with the task division in the project application form and the funding commitments in the cooperation agreement, and mark missing items |
| Cooperation agreement | Signatories, cooperation term, signatures, and receipts are complete and the version is consistent | Verify the signature pages and receipts, confirm that the agreement version is consistent with the version attached to the project application form, and note any that are not synchronized |
| Main business database connection variable | Points to the main business database actually in use and can connect | In the deployment environment, verify that the variable value matches the database address, and check the connection result in the startup logs |

## Three common errors

- Symptom: the name, quantity, and date of the same project do not match across two materials. Cause: definitions were not unified at registration time, each material was entered according to its own wording, and no item-by-item comparison was made.
- Symptom: the cooperation agreement version is not synchronized with the version attached to the project application form. Cause: after modification, only one place was updated while the other still used the old version, and the version number and date were not checked during handover.
- Symptom: the signature page or receipt is missing, but the progress table still records it as complete. Cause: registration only checked whether the material was received, without verifying whether the signature and receipt were complete.

## How to verify the setup

This function's acceptance: connect once item by item to the main business database, log database, cache, and vector database, and check the connection results in the startup logs; verify `MONGODB_URI` separately for the main business database and the log database, verify `PG_URL` for the vector database according to the selected instance, and verify `REDIS_URL` for the cache.

Business test: use one week of records to verify the totals, and see whether the definitions and exceptions are clearly written.

- In the deployment environment, verify that the connection variable values for the main business database, log database, cache, and vector database match the actual instance addresses, and save the connection results in the startup logs.
- Take one record each of the project application form, budget application form, and cooperation agreement for the same project on a weekly basis, verify name, quantity, date, and signature item by item, and write discrepancies into the definition notes at the top of the progress table.
