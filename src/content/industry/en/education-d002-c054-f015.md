---
title: Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c054-f015
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Retrieval | Checks
meta_description: Self-Study Exams: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in self-taught examination registration records and graduation review: registration records, course qualification certificates, and graduation application forms. Registration records are updated by the provincial examination office after each exam registration, with fields including name, ID number, exam registration number, course name, score, signature, and receipt; course qualification certificates are issued by batch, recording course code, name, quantity, date, and seal; graduation application forms are filled out by candidates and initially reviewed by the main examining institution, including major name, number of courses, graduation conclusion, and signature field. When these three types of materials enter the knowledge base retrieval service, registration records and course qualification certificates serve as the comparison baseline and objects to be verified, while graduation application forms serve as application-side records; together they support consistency verification of the same record's name, quantity, and date across two materials. In terms of update cadence, registration records roll forward with exam sessions, course qualification certificates are archived by batch, and graduation application forms are submitted by application round; field discrepancies are concentrated in whether signatures and receipts are complete.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether fields, dates, and signatures correspond item by item with course qualification certificates | In search test, recall using the same name plus course name, and verify field consistency between semantic and full-text candidates under `searchMode` |
| Course qualification certificates | Whether the same record's name, quantity, and date are consistent with registration records | Switch `searchMode` to compare candidates, record candidate count and scores, and check date and quantity fields |
| Graduation application forms | Whether the number of courses, major name, and signature receipt are consistent with registration records | Compare the top few rankings before and after enabling `usingReRank`, and verify the signature field and receipt field |
| Retrieval results | Whether candidate snippets and similarity scores cover key fields of the three material types | After filtering by `similarity`, record candidate count, and separately verify cited text tokens and `limit` trimming |

## Three common errors

- Symptom: The course name or quantity of the same record does not match between registration records and course qualification certificates. Cause: The two tables were entered in different batches, and no field-level comparison was performed.
- Symptom: The version of the graduation application form and the version of the registration record are not synchronized, and the date and signature fields are inconsistent. Cause: After the application round was updated, it was not written back to the ledger.
- Symptom: A course qualification certificate lacks a signature or receipt, but retrieval candidates are still recalled. Cause: Similarity filtering only looks at text relevance and does not verify the completeness of signature fields.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ordering of the top few results.

Business test: use one real record to find fields that are inconsistent with the ledger.

- In search test, switch `searchMode`, record candidate count and scores, and mark the locations of field discrepancies.
- Compare the order of the top few results before and after enabling `usingReRank`, and verify cited text tokens according to `similarity` and `limit`.
