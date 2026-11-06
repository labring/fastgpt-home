---
title: Vector Models and Indexes for School Exam Question Setting and Grading: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c011-f004
page_type: 行业问题页
application_area: education
meta_title: School Exams | Vector Indexes | Versions
meta_description: School Exams: review vector indexes for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for School Exam Question Setting and Grading: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of exam question setting and grading in primary and secondary schools. The materials include three categories: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table carries the assessed content, question types, score values, cognitive levels, and the question setter's signature; the exam paper carries the question text, question numbers, score values, exam date, and the reviewer's signature; the grading rubric carries the reference answers, scoring points, scoring rationale, revision date, and the approver's signature. The three categories of materials are not synchronized in their update cadence: the specification table is often finalized before question setting, the exam paper is fine-tuned after review, and the grading rubric is supplemented before grading. When the materials enter the vector model and indexing feature, each is stored as an independent data row; the specification table is used to recall the assessment scope, the exam paper is used to recall the original question text, and the grading rubric is used to recall the scoring rationale. Field characteristics are concentrated in four categories: name, quantity, date, and signature. During version changes, each item must be checked one by one.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, outputting vectors and index status (whether recall is possible, whether data in the same group is merged). The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Name, quantity, date, and signature must be consistent with the exam paper and grading rubric | Open the specification table data row and check whether the index field contains multiple vector identifiers and whether the status is indexed |
| Exam paper | Question numbers, score values, exam date, and review signature must correspond to the specification table and grading rubric | In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base, and retrieve questions in the same group to see whether they are merged |
| Grading rubric | Scoring points, revision date, and approval signature must be synchronized with the exam paper and specification table | Check the data scope covered by the rebuild task; after changing the model, trigger only for data that has already been indexed, and check the `defaultToken` and `maxToken` budgets |
| Version ledger and change records | The current version is unique, old versions are traceable, and citations are synchronized | After changing one piece of content, retrieve once to see whether the version number and citations are updated synchronously, and record the number of citations and the tokens of the cited text |

## Three common errors

- Symptom: The score value of the same question does not match between the specification table and the exam paper. Inspect the following: two copies.
- Symptom: The revision date of the grading rubric is inconsistent with the exam date of the exam paper. Inspect the following: after the rubric is supplemented, it is not written back to the ledger, and citations still point to the old version of the content.
- Symptom: The specification table lacks the question setter's signature or receipt. Inspect the following: compare the relevant source fields, document versions and downstream processing records.

## How to verify the setup

This feature's acceptance: sample one data row to inspect the index field, confirm that multiple vector identifiers are all present, then retrieve once to see whether data in the same group is merged; for status values, only indexed and rebuild task records are recognized.

Business test: change one piece of content and see whether the version number and citations are updated synchronously; the number of citations is the array length, `quoteMaxToken` is the citation content budget, and the two are not compared for equality; the citation upper limit checks the tokens of the cited text, and the array count is recorded separately.

- In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base, and confirm that `limit` meet the citation budget.
- Open a data row to check the index field, confirm that multiple vector identifiers for one piece of data are all present, and check the data scope covered by the rebuild task.
