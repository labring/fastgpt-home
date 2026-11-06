---
title: Database Connections and Operations for Research Ethics Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c062-f011
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Databases | Progress
meta_description: Research Ethics: review databases for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for Research Ethics Review: Track Progress and Check Statistics

## What this category's data looks like

Research ethics review materials consist mainly of ethics review applications, informed consent form templates, and risk assessment forms. They originate from the intake and archiving processes of institutional ethics committees, and their update cadence advances with intake batches and correction receipts. After entering the progress records and statistical verification function, ethics review applications take on the primary record role, providing acceptance numbers, review types, and status dates; informed consent form templates take on the version role, providing template version numbers and effective dates; risk assessment forms take on the risk role, providing risk levels, assessment dates, and signature fields. The three types of materials must be aligned item by item on fields, dates, and signatures. Names, quantities, dates, and version numbers are the verification anchors, while receipts and signatures are the completeness anchors. The progress table and statistical scope description are summarized accordingly.

## Configuration and implementation checks

This step is handled by the connection configuration of the deployment environment (server side), not by the capability execution of a model node, and outputs whether the connection is available (service startup result and connection logs). The progress table and statistical scope description are then completed by deployment handover and subsequent business processing. Connection addresses are configured via environment variables, and the primary business database, log database, cache, and vector database can point to different instances respectively.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures are complete, and the acceptance number and review type can be matched; if the name, quantity, or date of the same record does not match across the two materials, it is inconsistent | Take one week of intake records, verify the acceptance number, review type, status date, and signature receipt one by one, register exceptions, and write them into the table header scope |
| Informed consent form template | The version number and effective date are synchronized, and the template name is consistent with the application record; if the version is not synchronized, it is inconsistent | Check the template version number and effective date against the deployment instructions, spot-check the correspondence with application records, and separately mark missing receipts |
| Risk assessment form | The risk level, assessment date, and signature field are complete; if a signature or receipt is missing, it is inconsistent | Verify the risk level and assessment date by batch, check the signature field and receipt, and compare item by item with the progress table totals |
| Primary business database, log database, cache, and vector database connections | Connection addresses are configured via environment variables, and the primary business database, log database, cache, and vector database can point to different instances respectively; if the log database is not configured separately, the primary database is reused | In the deployment environment, verify that `MONGODB_URI` matches the database address, check whether the log database variable is set, connect once with a client to `REDIS_URL` and verify the return, and check against the deployment instructions that `PG_URL` matches the actual vector database |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the ethics review application and the informed consent form template. Cause: The two materials were entered separately and were not backfilled and aligned by acceptance number.
- Symptom: The informed consent form template version is not synchronized, and the effective date is earlier than the application record. Cause: The version number was not written back after the template update, and the progress table still references the old version.
- Symptom: The risk assessment form is missing a signature or receipt, and a discrepancy appears between the statistical total and the record count. Cause: Signatures and receipts were not archived with the batch, and exceptions were not stated in the table header scope.

## How to verify the setup

This function's acceptance: connect once to the primary business database, log database, cache, and vector database item by item, and verify the connection results in the startup logs; check against the deployment instructions that the values of `MONGODB_URI`, `REDIS_URL`, and `PG_URL` match the instances.

Business test: use one week of records to verify the totals, and see whether the scope and exceptions are clearly stated.

- Take one week of ethics review applications, informed consent form templates, and risk assessment forms, verify names, quantities, dates, and signature receipts one by one by acceptance number, and write exceptions into the table header scope.
- Verify the values of the connection variables for the primary business database, log database, cache, and vector database in the deployment environment, check the startup logs and connection logs, and confirm whether the log database is configured separately or reuses the primary database according to the instructions.
