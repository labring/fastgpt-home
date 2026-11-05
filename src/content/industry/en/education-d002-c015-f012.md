---
title: Document Parsing and Chunking for School Mental Health Screening and Referrals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c015-f012
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Parsing | Checks
meta_description: Student Mental Health: review parsing for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for School Mental Health Screening and Referrals: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario. Materials come from three types of documents: psychological screening plans, interview records, and referral forms, submitted in batches by school psychological teachers at the beginning, middle, and end of the semester and after referrals occur. Screening plans contain screening dimensions, time arrangements, and responsible persons; interview records contain student names, interview dates, interviewing teachers, and signatures; referral forms contain referral subjects, referral dates, receiving institutions, and receipts. When these three types of materials enter the document parsing and chunking stage, they respectively serve as the plan baseline, process records, and referral evidence; after parsing, they are stored as visible data rows for subsequent retrieval and discrepancy localization. Field characteristics center on four categories: names, quantities, dates, and signatures. The update rhythm is synchronized with the screening cycle, and referral forms are supplemented after receipts are returned.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), which outputs data rows and index status (parsed, indexing, indexed). The discrepancy list is completed by retrieval and subsequent processing; the parsing and training task itself does not produce a discrepancy list or business documents.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The plan name, number of screening dimensions, implementation date, and responsible person's signature must be consistent with the ledger | Check the name, quantity, and date fields of the plan data row, and inspect the signature field; confirm that the `chunkSize` and `chunkSplitter` settings match the plan structure |
| Interview record | The student name, interview date, interviewing teacher, and signature must be consistent with the corresponding record in the referral form | Check the name, date, and signature in the interview record and the referral form respectively; check whether the data row status is parsed or indexed |
| Referral form | The referral subject name, referral date, receiving institution, and receipt must be consistent with the interview record | Check the name, quantity, and date fields of the referral form and the interview record; confirm whether the receipt is complete, and check the processing mode corresponding to `trainingType` |
| Data row | It is in one of the three states parsed, indexing, indexed and is consistent with the interface display | Open the data row to check the status, confirm that data pending indexing does not participate in recall; check that the rebuild task only covers indexed data |

## Three common errors

- Symptom: The name or date of the same student does not match between the screening plan and the interview record. Cause: The two materials were submitted in separate batches, the fields were not aligned to the same object, and after parsing they were stored as different data rows.
- Symptom: The referral form lacks a signature or receipt, resulting in incomplete referral evidence. Cause: The receipt was not supplemented in time after being returned, the material version was not synchronized, and the data row status remained at parsed.
- Symptom: Newly uploaded materials cannot be found. Cause: The data row is in indexing, and data pending indexing does not participate in recall; successful parsing does not mean retrieval will necessarily hit.

## How to verify the setup

This feature acceptance: Upload one material, observe the data row status transitions and the coverage scope of the rebuild task, confirm that the status transitions among parsed, indexing, and indexed, and that rebuild only covers indexed data.

Business test: Use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Open the data row to check the status, confirm that it is in one of the three states parsed, indexing, indexed and is consistent with the interface display, and check the identifiers of the file record and the data row respectively.
- Check the data rows covered by the rebuild task, confirm that it only targets data that has completed indexing; check that `chunkSize`, `chunkSplitter`, and `trainingType` match the material structure.
