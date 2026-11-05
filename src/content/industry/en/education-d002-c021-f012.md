---
title: Document Parsing and Chunking for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c021-f012
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Parsing | Checks
meta_description: Graduation Eligibility: review parsing for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in student status changes and graduation eligibility review, covering three types of materials: leave-of-absence/resumption-of-study applications, major transfer applications, and graduation review checklists. The materials come from application forms and ledger files exported from the academic affairs system, and their update cadence changes with the semester status-change windows and graduation review batches. Field characteristics include student name, student ID, status-change type, effective date, signature field, and receipt number. When the materials enter the document parsing and chunking function, leave-of-absence/resumption-of-study applications and major transfer applications serve as source materials to be compared, while the graduation review checklist serves as the baseline ledger material; each is parsed into visible data rows and bound to a unique data identifier for subsequent retrieval and discrepancy localization.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), outputting data rows and index status (parsed, indexing, indexed). The discrepancy list is then completed by retrieval and subsequent processing. After parsing is complete, parsed chunks are immediately persisted as visible data rows and bound to a unique data identifier; the index transitions through the three states parsed, indexing, and indexed, and data pending indexing does not participate in recall.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption-of-study application materials | Name, quantity, date, and signature field must match the ledger item by item | Check whether the data row status is parsed or indexed, and check whether the fields are complete after chunking by `chunkSize` and `chunkSplitter` |
| Major transfer application materials | Status-change type, effective date, and receipt number must correspond to the ledger | Check the file records and data rows separately, confirm the processing mode corresponding to `trainingType`, and view the index status transitions |
| Graduation review checklist ledger | As the baseline comparison source, fields and dates must be consistent with the application materials | Open the data rows to check the status, and confirm that the rebuild task only covers indexed data |
| File records and data rows | The identities of file records and data rows are kept separate | Check the file records and data rows separately, and confirm that the unique data identifier is bound correctly |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the ledger. Cause: After parsing, the two materials were not aligned by field for the same object, so the discrepancy was not localized.
- Symptom: Versions are not synchronized, causing deviation in comparison results. Cause: The old version of the material is still in indexed status and participates in recall, while the new version of the material has not yet completed indexing.
- Symptom: Materials missing a signature or receipt enter the review process. Cause: Parsing and chunking did not retain the signature field and receipt number field, and the discrepancy list did not mark the missing items.

## How to verify the setup

This feature acceptance: Upload one material, see whether the data row status transitions through parsed, indexing, and indexed, and check whether the coverage of the rebuild task targets only data that has completed indexing.

Business test: Use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- Open the data rows to check the status, confirm it is consistent with the interface display, and that it is in one of the three states parsed, indexing, or indexed.
- Check the file records and data rows separately, confirm that the unique data identifier is bound correctly, and that the rebuild task only covers indexed data.
