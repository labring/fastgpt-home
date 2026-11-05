---
title: Document Parsing and Chunking for Vocational Training Subsidy Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c037-f012
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Parsing | Checks
meta_description: Training Subsidies: review parsing for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Vocational Training Subsidy Applications: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: Material verification and discrepancy localization for vocational training subsidy applications focuses on three types of materials: training class filing records, attendance records, and completion assessment forms. Class filing records are submitted by training institutions, attendance records are generated day by day per class session, and completion assessment forms are summarized after the assessment ends; the update cadence advances with class start and completion milestones. Field characteristics center on the name, quantity, date, and signature of the same record, and situations such as the same name written differently, mismatched headcounts and dates, unsynchronized versions, and missing signatures or receipts often occur between the two types of materials. When materials enter parsing and training tasks, they are first split according to `chunkSize` and `chunkSplitter` to form verifiable data rows; downstream processing uses the retrieved data rows to prepare the discrepancy list after checking index status.

## Configuration and implementation checks

Configuration and implementation checks: This stage is executed by parsing and training tasks (server-side tasks), outputting data rows and index status (parsed, indexing, indexed). The "discrepancy list" is then completed by retrieval and downstream processing. Successful parsing does not mean retrieval will necessarily hit; it also depends on whether the index status has reached completed.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | Whether the name, quantity, date, and signature are consistent with the attendance records and completion assessment forms | Open the data row to check the status, confirm it is in one of parsed / indexing / indexed, and compare the class name, headcount, start and end dates in the filing record with the day-by-day records in the attendance records |
| Attendance record | Whether the same record as in the class filing record and completion assessment form matches in name, quantity, and date | Check the file records and data rows separately, verify whether the attendance dates fall within the filing record's start and end interval, and list entries missing signatures or receipts separately |
| Completion assessment form | Whether the same object's name, quantity, and date are consistent with the class filing record and attendance records | View the data rows covered by the rebuild task, confirm that only data with completed indexing is covered, and verify whether the assessment headcount is consistent with the attendance headcount and the filing headcount |
| Data row status | It is in one of the three states and is consistent with the interface display | View training progress by `trainingType` category, confirm that data pending indexing does not participate in recall, and that failed training data can be directly edited or deleted |

## Three common errors

- Symptom: Materials just uploaded cannot be found. Cause: The data row is still in parsed or indexing, and data pending indexing is naturally isolated at the retrieval layer and does not participate in recall.
- Symptom: The same record does not match in name, quantity, and date between the filing record and the attendance records. Cause: The two materials' versions are not synchronized, or the fields were not aligned to the same object during entry.
- Symptom: Empty data rows remain after training fails. Cause: Orphan data left by interrupted training must be directly edited or deleted, and then the data row must be re-enqueued.

## How to verify the setup

How to verify the setup: Acceptance for this feature: upload one material and observe the data row status transitions and the coverage scope of the rebuild task; verify whether the data rows transition through the three states parsed, indexing, and indexed, and that when rebuilding with a different model only data with completed indexing is covered, while data pending indexing does not participate in the rebuild chain.

Business test: Use one real record to find fields inconsistent with the ledger, focusing on verifying the name, quantity, date, and signature among the training class filing record, attendance records, and completion assessment form.

- Check the file records and data rows separately, confirm that the identities of the file records and data rows are distinguishable, and then check according to `chunkSize` and `chunkSplitter` whether chunking covers the key fields.
- Open the data row to check the status, confirm it is in one of the three states and is consistent with the interface display; for entries missing signatures or receipts, hand them to the reviewer for confirmation and write back to the discrepancy list.
