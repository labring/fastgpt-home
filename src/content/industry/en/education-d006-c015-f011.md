---
title: Database Connections and Operations for School Mental Health Screening and Referrals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c015-f011
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Databases | Progress
meta_description: Student Mental Health: review databases for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for School Mental Health Screening and Referrals: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools, with materials drawn from three types: screening plans, interview records, and referral forms. Screening plans provide the scale, batch, and screening date; interview records carry the interview time, interviewer, and student status; referral forms record the referral destination, receipt, and signature. The three types of materials are updated weekly or by batch, with fields concentrated on student identifiers, dates, quantities, signatures, and receipts. When entering the progress record and statistical verification function, screening plans serve as the source of definitions, interview records and referral forms serve as detail rows, the progress table summarizes by student and date, and the statistical definition notes are written in the table header, indicating inclusion and exclusion rules.

## Configuration and implementation checks

This step is performed by the connection configuration of the deployment environment (server side), not by the capability execution of a model node, and outputs whether the connection is available (service startup result and connection logs). The progress table and statistical definition notes are then completed by deployment handover and subsequent business processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Mental health screening plan | Fields include scale name, screening date, batch, and signature; the name and date of the same batch in two materials must be consistent | Verify the plan header fields and batch dates in the deployment environment, and compare them against the progress table definition notes |
| Interview record | Fields include interview date, interviewer, student identifier, and signature; the quantity of the same record in the progress table and referral form must match | Sample interview records weekly, verify total rows against detail rows, and check whether exceptions with missing signatures or missing receipts are documented |
| Referral form | Fields include referral destination, receipt, and signature; when versions are not synchronized, the receipt date and interview date do not match | Verify the referral form receipt and interview record dates, and check whether the version number is synchronized |
| Primary business database connection variable | Points to the primary business database actually in use and is connectable | Verify in the deployment environment that the variable value matches the database address, and check the startup logs for `MONGODB_URI` |

## Three common errors

- Symptom: The name and quantity of the same student in the interview record and referral form do not match. Cause: The two materials are entered separately and are not uniformly verified by student identifier and date.
- Symptom: The progress table total and the weekly record total are inconsistent. Cause: Versions are not synchronized, and the old batch plan is still included in the statistical definition.
- Symptom: The referral form lacks a signature or receipt, but the progress table still shows completion. Cause: The inclusion rules are not written into the header, and exceptions are not separately marked.

## How to verify the setup

This function's acceptance: connect once to the primary business database, log database, cache, and vector database item by item, and verify the connection results in the startup logs; compare whether the values of `MONGODB_URI`, `REDIS_URL`, and `PG_URL` are consistent with the actual instance addresses.

Business test: use one week of records to verify the totals, and see whether the definitions and exceptions are clearly written.

- In the deployment environment, verify the connection variable values of the primary business database, log database, cache, and vector database, and check the service startup result and connection logs.
- Sample screening plans, interview records, and referral forms weekly, verify fields, dates, and signatures, and write exceptions into the header of the definition notes.
