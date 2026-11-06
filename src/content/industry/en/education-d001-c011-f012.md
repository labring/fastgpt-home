---
title: Document Parsing and Chunking for School Exam Question Setting and Grading: Find Supporting Evidence
slug: /en/industry/education-d001-c011-f012
page_type: 行业问题页
application_area: education
meta_title: School Exams | Parsing | Evidence
meta_description: School Exams: review parsing for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Document Parsing and Chunking for School Exam Question Setting and Grading: Find Supporting Evidence

## What this category's data looks like

In the scenario of exam question setting and grading in primary and secondary schools, three types of materials—the two-way specification table for question setting, the exam paper, and the grading rubric—together constitute the source of the business basis. The specification table carries the assessed content, question types, score values, cognitive levels, and the question setter's signature; the exam paper carries question numbers, question stems, answers, and score distribution; the grading rubric carries scoring points, score bands, grader signatures, and dates. The three types of materials are usually updated by semester or exam batch, and versions advance with question-setting revisions, review receipts, and approval signatures. After the materials enter this feature, the specification table is used to compare assessment objectives with question coverage, the exam paper is used to locate the original text of question stems and answers, and the grading rubric is used to check the scoring basis and signature receipts; together, the three support basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the parsing and training task (server-side task), which outputs data rows and index status (parsed, indexing, indexed). The basis entries that can be traced back to the original text are then completed by retrieval and subsequent processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Fields include assessed content, question types, score values, cognitive levels, question setter and reviewer signatures; dates and signatures must be complete | Check the specification table fields, dates, and signatures, confirm the version is current, and correspond item by item with the exam paper question numbers |
| Exam paper | Fields include question numbers, question stems, answers, and score values; the name and quantity of the same record must be consistent with the specification table | Check the exam paper question numbers and score values, compare the quantity and dates of records with the same name in the specification table, and check version synchronization |
| Grading rubric | Fields include scoring points, score bands, grader signatures, and receipt dates; missing signatures or receipts mean inconsistency | Check the grading rubric score bands against the exam paper answers, confirm signatures and receipts are complete, and trace entries back to the original text |
| Data row | Is in one of the three states parsed, indexing, indexed, and is consistent with the interface display; rebuild only covers indexed data | Open the data row to check the status, separately check the file record and the data row identifier, and view the coverage scope of the rebuild task |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: the two materials were revised separately, without cross-checking and version synchronization.
- Symptom: the grading rubric version is not synchronized and still references the old score bands. Cause: the rubric was not updated after revision, and missing signatures and receipts invalidate the basis.
- Symptom: newly uploaded materials cannot be found, and failed training leaves empty data rows. Cause: parsing succeeded but indexing was not completed, and data pending indexing does not participate in recall.

## How to verify the setup

Feature acceptance: upload one material and observe the data row status transitions and the coverage scope of the rebuild task. Check that the status transitions among parsed, indexing, and indexed, and confirm that rebuild only covers indexed data; check whether the settings related to `chunkSize`, `chunkSplitter`, and `trainingType` match the material type.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- Open the data row to check the status, confirm it is in one of the three states parsed, indexing, indexed and is consistent with the interface display; separately check the file record and the data row identifier.
- View the data rows covered by the rebuild task, confirm that only indexed data is covered; check the fields, dates, and signatures of the specification table, exam paper, and grading rubric, and compare the name, quantity, date, and version of the same record.
