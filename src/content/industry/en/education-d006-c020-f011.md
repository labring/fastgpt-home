---
title: Database Connections and Operations for Grade Entry and Credit Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c020-f011
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Databases | Progress
meta_description: Grades and Credits: review databases for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for Grade Entry and Credit Recognition: Track Progress and Check Statistics

## What this category's data looks like

This page is for grade entry and credit recognition scenarios. The materials come from three categories: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts provide course names, grades, credits, and entry dates; deferred examination applications provide deferred courses, reasons, and approval dates; make-up examination arrangements provide make-up courses, times, and examination rooms. When these three types of materials enter the progress records and statistical verification function, transcripts serve as the primary record source, while deferred examination applications and make-up examination arrangements serve as sources of exceptions and adjustments, with record status and effective dates marked separately. The update cadence is summarized weekly. Field characteristics include course codes, student identifiers, grade values, credit values, signature fields, and receipt fields. The progress table and statistical scope description must state the statistical scope, exception handling, and signature requirements in the header, and the total verification must be completed before entering the weekly or monthly report.

## Configuration and implementation checks

This step is executed by the connection configuration of the deployment environment (server side), not by the capability of a model node. It outputs whether the connection is available (service startup result and connection logs). The "progress table and statistical scope description" is then completed by deployment handover and subsequent business processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | The fields, dates, and signatures of the transcript must be aligned item by item with the deferred examination application and make-up examination arrangement. Course names and grade values must not differ between the two materials. | Check whether the course names, grade values, and dates in the transcript and deferred examination application are consistent, and check whether the signature field and receipt field are complete. |
| Deferred examination application | The course, reason, and approval date of the deferred examination application must correspond to the transcript and make-up examination arrangement. The name and quantity of the same record must not mismatch. | Compare the course names, quantities, and dates in the deferred examination application and make-up examination arrangement, confirm that the versions are synchronized and that the approval signature is complete. |
| Make-up examination arrangement | The course, time, and examination room of the make-up examination arrangement must be consistent with the transcript and deferred examination application. If signatures or receipts are missing, they must not be counted in the statistics. | Check the course names and dates in the make-up examination arrangement and transcript, check whether the receipts are complete, and confirm that the version is not lagging. |
| Primary business database connection variables | The primary business database connection variables point to the primary business database actually in use and can connect. In the deployment environment, check that the variable values are consistent with the database address. | Connect once to the primary business database, log database, cache, and vector database item by item, check the connection results in the startup logs, and check the values of `MONGODB_URI`, `REDIS_URL`, and `PG_URL`. |

## Three common errors

- Symptom: The name or quantity of the same course does not match between the transcript and the deferred examination application. Cause: When the two materials were entered, they were not aligned by the same course code, resulting in differences in the statistical totals.
- Symptom: The dates in the make-up examination arrangement and the transcript are inconsistent, and the versions are not synchronized. Cause: After the make-up examination arrangement was updated, it was not written back to the transcript, and the weekly report totals were still calculated according to the old version.
- Symptom: The deferred examination application lacks a signature or the make-up examination arrangement lacks a receipt, but the record is still counted in the statistics. Cause: The statistical scope did not state exception handling in the header, and signatures and receipts were not checked item by item during verification.

## How to verify the setup

Acceptance of this function: Connect once to the primary business database, log database, cache, and vector database item by item, check the connection results in the startup logs, and confirm whether the services corresponding to `MONGODB_URI`, `REDIS_URL`, and `PG_URL` are available.

Business test: Use one week of records to verify the totals, see whether the scope and exceptions are clearly stated, and confirm that the record counts and statistical counts of the transcript, deferred examination application, and make-up examination arrangement match.

- In the deployment environment, check that the values of the primary business database connection variables are consistent with the database address, and check whether the log database connection variables are set or left blank according to the instructions to reuse the primary database.
- Use a client to connect once to the cache instance and check the response; check the selected vector database and address against the deployment instructions, and check whether the startup logs continuously report connection timeouts.
