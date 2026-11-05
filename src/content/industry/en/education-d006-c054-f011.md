---
title: Database Connections and Operations for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c054-f011
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Databases | Progress
meta_description: Self-Study Exams: review databases for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical verification for self-study examination registration and graduation review draw materials from registration archives, course pass certificates, and graduation application forms, updated weekly or per exam session, with fields including name, course code, pass date, review signature, and receipt number. Registration archives provide enrollment status and historical changes, course pass certificates provide the basis for individual subject passes, and graduation application forms summarize credits and photos; when these three enter the progress table and the statistical scope description, they respectively serve as the identity baseline, the quantity source, and the conclusion evidence. The progress table summarizes the number of records by exam session, and the scope description states the statistical scope, exceptions, and signature requirements in the header, entering the weekly or monthly report.

## Configuration and implementation checks

This part is executed by the connection configuration of the deployment environment (server side), not by the capability of a model node, and outputs whether the connection is available (service startup result and connection logs). The "progress table and statistical scope description" is then completed by the deployment handover and subsequent business processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | Fields include name, exam registration number, and enrollment status; dates and signatures must be consistent with the graduation application form | Compare the name, exam registration number, and dates in the registration archives and the graduation application form, and check whether signatures are complete |
| Course pass certificates | Fields include course code, pass date, and quantity; the name and quantity of the same record in the two materials must match | Extract one week of records and verify the course code, pass date, and quantity in the course pass certificates and the progress table |
| Graduation application form | Fields include total credits, photo, review signature, and receipt number; versions must be synchronized | Check the version and receipt number of the graduation application form, and verify exceptions with missing signatures or receipts |
| Progress table and statistical scope description | The header states the statistical scope, exceptions, and signature requirements; the number of records and the statistical count must match | Use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the registration archives and the graduation application form. Cause: the entry sources differ and updates were not synchronized by exam session.
- Symptom: the versions of the course pass certificates and the progress table are not synchronized, and the old version is still referenced. Cause: the version number and update date were not verified during handover.
- Symptom: the graduation application form lacks a signature or receipt, yet the statistical total still includes it. Cause: the scope did not list missing signatures or receipts as exceptions.

## How to verify the setup

This feature's acceptance: connect once to each of the main business database, log database, cache, and vector database, check the connection results in the startup logs, and verify that the values of `MONGODB_URI`, `REDIS_URL`, and `PG_URL` match the database addresses.

Business test: use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated.

- In the deployment environment, verify that the variable value matches the database address, check whether the variable is set, and verify the database to which the logs are written.
- Connect once to the cache with a client, verify the response, and check the selected vector database and address against the deployment instructions.
