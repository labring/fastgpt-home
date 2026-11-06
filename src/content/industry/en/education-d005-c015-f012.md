---
title: Document Parsing and Chunking for School Mental Health Screening and Referrals: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c015-f012
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Parsing | Versions
meta_description: Student Mental Health: review parsing for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for School Mental Health Screening and Referrals: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario. Materials include three types: screening plans, interview records, and referral forms. A screening plan contains screening dimensions, tool names, implementation dates, and the signature of the person in charge; an interview record contains the student's pseudonym, interview time, interviewer, main topics, and preliminary judgment; a referral form contains the referral subject, reason for referral, receiving party, receipt, and signatures of both parties. The material sources are the school mental health center, grade groups, and off-campus referral agencies. The update cadence is screening at the start of the semester, follow-up during the semester, and summary at the end of the semester, while referral forms are generated at any time along with individual cases. When entering the document parsing and chunking function, the screening plan serves as the rule draft, the interview record serves as process evidence, and the referral form serves as the circulation credential, each bound to a file record and a data row identifier for subsequent retrieval and version ledger reference.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), which outputs data rows and index status (parsed, indexing, indexed). The "version ledger and change records" are then completed by retrieval and subsequent processing. After parsing is completed, parsing and chunking are immediately persisted as visible data rows and bound to a unique data identifier. The index transitions through the three states parsed, indexing, and indexed. Data pending indexing does not participate in recall. When changing models, only data that has completed indexing is rebuilt.

| Object | Check | Verification action |
| --- | --- | --- |
| Screening plan | The screening dimensions, tool names, implementation dates, and signature of the person in charge in the plan must be consistent with the version ledger | Check the file record and data row identifier, confirm that the parsed, indexing, and indexed states are consistent with what the interface displays, and check the chunking results corresponding to `chunkSize` |
| Interview record | The student's pseudonym, interview time, interviewer, number of topics, and date for the same interview must match across the two materials | Check the file record and data row separately, and check the chunking results corresponding to `trainingType` and `chunkSplitter` |
| Referral form | The referral subject, reason for referral, receiving party, receipt, and signatures of both parties must be complete and correspond to the current version | Open the data row to check the status, and confirm that referral forms missing signatures or receipts have not entered the indexed state |
| Version ledger and change records | The current version is unique, old versions are traceable, references are synchronized, and rebuilding covers only data that has completed indexing | View the data rows covered by the rebuild task, and check the `chunkSize` and the tokens records of the referenced text |

## Three common errors

- Symptom: The student's pseudonym and interview date for the same interview record do not match between the screening plan and the referral form. Cause: The two materials were parsed and persisted separately, without being merged and checked under the same data identifier.
- Symptom: The screening plan has been updated, but the interview record and referral form still reference fields from the old version. Cause: The version was not synchronized, and the old data rows are still in the completed indexing state.
- Symptom: A referral form lacks the receiving party's signature or receipt, yet it has already entered the retrieval results. Cause: Successful parsing does not equal a retrieval hit; the index status and signature fields still need to be checked.

## How to verify the setup

This function's acceptance: Upload one material, observe the status transitions of the data rows and the coverage scope of the rebuild task, confirm that the three states parsed, indexing, and indexed are consistent with the interface, that rebuilding covers only data that has completed indexing, and check the chunking results corresponding to `trainingType` and `chunkSplitter`.

Business test: Change one piece of content, see whether the version number and references are updated synchronously, and confirm that the current version is unique, old versions are traceable, and references are synchronized.

- Open the data row to check the status, confirm that the identities of the file record and the data row are distinguishable, and check the chunking results corresponding to `trainingType` and `chunkSplitter`.
- Check the data rows covered by the rebuild task, and confirm that when changing models only data that has completed indexing is rebuilt, and that data pending indexing does not participate in the rebuild chain.
