---
title: Document Parsing and Chunking for Grade Entry and Credit Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c020-f012
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Parsing | Checks
meta_description: Grades and Credits: review parsing for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for Grade Entry and Credit Recognition: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts are exported from the academic affairs system, recording course names, credits, grades, and instructor signatures; deferred examination applications are submitted by students and approved by their departments, containing the application date, reason for deferral, and approval signature; make-up examination arrangements are published by the course-offering unit, containing the make-up examination time, location, and invigilation receipt. The three types of materials update at different rhythms: transcripts are updated in batches when semester grades are released, deferred examination applications are submitted in real time on a case-by-case basis, and make-up examination arrangements are published centrally before the examination. In terms of field characteristics, the name spelling, credit count, and date format of the same course often differ across materials, and the completeness of signatures and receipts must also be checked item by item. After the materials enter the parsing and training tasks, each is stored as an independent data row, providing the basis for subsequent retrieval and discrepancy localization.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), outputting data rows and index status (parsed, indexing, indexed). The "discrepancy list" is then completed by retrieval and subsequent processing. After parsing is completed, parsed chunks are immediately stored as visible data rows and bound to a unique data identifier; the index transitions through three states, and data pending indexing does not participate in recall.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credit count, grade date, and instructor signature are consistent between the transcript and the ledger | Check whether the data row status is indexed, and check whether the splitting of table fields by `chunkSize` and `chunkSplitter` preserves the course name and credit columns |
| Deferred examination application | Application date, reason for deferral, and approval signature are consistent between the deferred examination application and the transcript | Check whether the file record and the data row identifier are each independent, and confirm that the application date and approval signature fields are fully stored in the data row |
| Make-up examination arrangement | Make-up examination time, location, and invigilation receipt are consistent between the make-up examination arrangement and the ledger | Check the processing mode corresponding to `trainingType`, and confirm that the make-up examination time and receipt fields are not lost during splitting |
| Data row status | Is in one of the three states parsed, indexing, or indexed and is consistent with the interface display | Open the data row to check the status, confirm that data pending indexing does not participate in recall, and that changing the model only rebuilds indexed data |

## Three common errors

- Symptom: a just-uploaded transcript cannot be found. Cause: the data row is in the parsed or indexing state; data pending indexing is naturally isolated at the retrieval layer and is not recalled, so you must wait for indexing to complete.
- Symptom: the credit count for the same course does not match between the transcript and the make-up examination arrangement. Cause: the two material versions are not synchronized, and there are differences in the name spelling and quantity fields, so they must be checked field by field.
- Symptom: the deferred examination application lacks an approval signature or the make-up examination arrangement lacks an invigilation receipt. Cause: the signature page was omitted during material scanning or entry; although the data row has been parsed, the fields are incomplete, so the original document must be checked again.

## How to verify the setup

Acceptance of this feature: upload one material, observe the data row status transition from parsed to indexing to indexed, and check that the rebuild task only covers data rows whose indexing has been completed.

Business test: use one real record to find a field that is inconsistent with the ledger, and confirm which of the three items—name, quantity, or date—does not match.

- Check the identifiers of the file record and the data row separately, confirm that the identities of the file record and the data row are distinguishable, and then check whether the data row status is consistent with the interface display.
- View the data rows covered by the rebuild task, and confirm that changing the model only triggers a rebuild for data whose indexing has been completed, and that data pending indexing does not participate in the rebuild chain.
