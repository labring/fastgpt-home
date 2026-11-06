---
title: Document Parsing and Chunking for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f012
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Parsing | Versions
meta_description: National R&D Grants: review parsing for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

National Key R&D Program project applications involve project application forms, budget application forms, cooperation agreements, and other materials. Sources are mostly internal drafting and returns from joint units, and the update rhythm is concentrated in the application window period and after review feedback. Fields include project name, undertaking unit, budget subject, start and end dates, signatures, and receipts. The three types of materials play different roles when entering document parsing and chunking: the project application form is the main version line, while the budget application form and cooperation agreement enter as references and attachments, and their fields need to be aligned with the main line. After parsing is completed, materials are immediately persisted as visible data rows and bound to a unique data identifier. The index transitions through three states: parsed, indexing, and indexed. Data pending indexing does not participate in recall, providing a traceable data foundation for the version ledger and change records.

## Configuration and implementation checks

This step is executed by parsing and training tasks (server-side tasks), outputting data rows and index states (parsed, indexing, indexed). The version ledger and change records are then completed by retrieval and subsequent processing. After parsing is completed, parsing and chunking immediately persist as visible data rows and bind a unique data identifier. Changing the model only rebuilds data whose indexing is already completed.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Fields, dates, and signatures are complete, and the project name and undertaking unit remain consistent in the budget application form | Check whether the data row status is parsed, indexing, or indexed, and check whether the chunk boundaries under the `chunkSize` and `chunkSplitter` settings are cut near signatures and dates |
| Budget application form | Budget subjects, quantities, and dates match the project application form, with no missing signatures or receipts | Check the identities of the file record and the data row separately, confirm that the name, quantity, and date of the same record are consistent in both materials, and record the processing mode corresponding to `trainingType` |
| Cooperation agreement | Cooperation unit names, signature dates, and receipts are traceable in the project application form | Open the data row to check that the status is consistent with the interface display, confirm that the old version is traceable and the current version is unique, and that references are updated synchronously |

## Three common errors

- Symptom: materials just uploaded cannot be found. Cause: the data row is in a pending-indexing state, and the retrieval layer naturally isolates it from recall, so you must wait for the index state to transition to completed.
- Symptom: the name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: versions are not synchronized, the old data row is still referenced, and missing signatures or receipts are not blocked.
- Symptom: after changing the model, rebuilding takes abnormally long. Cause: the rebuild scope mistakenly covers data pending indexing, whereas rebuilding only targets data whose indexing is already completed; only the initial training covers data that is pending indexing and indexing.

## How to verify the setup

This feature acceptance: upload one material, observe the data row status transitions and the coverage scope of the rebuild task, confirm that after parsing is completed it is immediately persisted as visible data rows, that the index transitions through the three states parsed, indexing, and indexed, and that rebuilding only covers data whose indexing is already completed.

Business test: change one piece of content, see whether the version number and references are updated synchronously, and check that the identities of the file record and the data row are distinguishable.

- Open the data row to check the status, confirm that it is one of parsed, indexing, or indexed and consistent with the interface display, and record the values of `chunkSize`, `chunkSplitter`, and `trainingType`.
- Check the file record and the data row separately, confirm that the name, quantity, date, and signature receipt of the same record are consistent across the project application form, budget application form, and cooperation agreement, and that the old version is traceable and the current version is unique.
