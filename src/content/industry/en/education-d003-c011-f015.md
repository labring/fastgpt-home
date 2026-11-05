---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Intake
meta_description: School Exams: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses Q&A intake and missing-item follow-up in primary and secondary school exam question setting and grading scenarios. The source materials are three types of text: the question-setting two-way specification table, exam papers, and grading rubrics. The update cadence rolls with exam batches and grading milestones, and the field characteristics center on names, quantities, dates, and signatures. The question-setting two-way specification table provides the correspondence between assessment points and question numbers, exam papers provide the question stems and score structure, and grading rubrics provide scoring points and deduction explanations. When these three types of materials enter the knowledge base retrieval and recall function, each plays a different role: the specification table is used to verify question attribution and coverage scope, exam papers are used to confirm question wording and scores, and grading rubrics are used to locate the scoring basis. Intake records and supplemented question items need to align the fields in the materials item by item. After missing items are identified, a follow-up question is asked first, and then an answer is given based on candidate snippets.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Intake records and supplemented question items are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Assessment point names, question numbers, and dates must be consistent with the exam paper, and signatures and receipts must be complete | In the knowledge base search test, switch `searchMode` and see whether the candidates cover both the specification table and exam paper snippets |
| Exam paper | Question wording names, quantities, and scores must correspond to the grading rubric, and versions must be synchronized | Compare the order of the first few items before and after enabling rerank, and record the number of candidates and the `similarity` score |
| Grading rubric | Scoring point names, quantities, and dates must be consistent with the exam paper; if signatures or receipts are missing, ask a follow-up question | Check the number and content completeness of returned citations; when the citation upper limit is involved, check the tokens of the cited text |
| Intake records and supplemented question items | Missing items are identified and followed up, and answers have a material basis | Ask a question missing key information and see whether it asks a follow-up question before answering, then transfer it to the person handling it |

## Three common errors

- Phenomenon: The names and quantities of the same record do not match between the specification table and the exam paper. Cause: The two materials have different update cadences, and the fields have not been aligned item by item.
- Phenomenon: The grading rubric version is not synchronized, and old scoring points are still recalled. Cause: The knowledge base has not been updated by batch, and retrieval still hits historical snippets.
- Phenomenon: Intake records lack signatures or receipts, which are only completed after a follow-up question. Cause: The entry step does not validate the signature field, and missing items are not identified in advance.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle rerank on and off to see the ordering of the first few items; record the number of candidates and the `limit` value; when the citation upper limit is involved, check the tokens of the cited text, and record the number of array items separately.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering; the answer must have a material basis, and after missing items are completed, transfer it to the person handling it.

- In the knowledge base search test, switch `searchMode`, `usingReRank`, `similarity`, and `limit`, and compare changes in the number of candidates and scores.
- Check the names, quantities, dates, and signatures of the specification table, exam paper, and grading rubric item by item; for missing items, ask a follow-up question first, then transfer to the person handling it.
