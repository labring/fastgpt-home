---
title: Knowledge Base Retrieval for Professional Qualification Exam Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c036-f015
page_type: 行业问题页
application_area: education
meta_title: Professional Exams | Retrieval | Intake
meta_description: Professional Exams: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Professional Qualification Exam Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the Q&A intake and missing-item follow-up step in the registration review for professional and technical personnel vocational qualification exams. The materials include three types: the registration form, the academic qualification certificate, and the work experience certificate. The registration form provides the applicant's basic information and exam subjects; the academic qualification certificate corresponds to the graduating institution, major, and date of award; the work experience certificate carries the position start and end dates and the employer's signature. During intake, the three types of materials serve as the basis for identity verification, qualification verification, and years-of-experience verification respectively, and after entering the knowledge base they are split into candidate chunks by field. The update cadence changes with registration batches and correction receipts; the name, quantity, and date of the same record must be consistent across materials, signatures and receipts must be complete, and the latest receipt prevails as the version.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). Intake records and the completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Fields include name, exam subjects, date, and signature, and must be aligned item by item with the academic qualification certificate and work experience certificate | In the search test, switch `searchMode`, check whether the candidates cover the key fields of the registration form, and record the number of candidates and the `similarity` score |
| Academic qualification certificate | Graduating institution, major, and date of award must match what is filled in on the registration form; a missing signature or receipt is treated as a missing item | Test once each with synonym-rewritten questions, compare candidates and scores, confirm that the academic qualification fields are recalled, and check the ranking of the top few items before and after toggling `usingReRank` |
| Work experience certificate | Position start and end dates and employer signature must connect with the timeline of the registration form and academic qualification certificate; if the version is not synchronized, ask follow-up questions first | Check whether the candidate chunks contain the start and end dates and signature information, record the array length, and when the citation upper limit is involved, check the cited text tokens and the `limit` trimming |
| Intake records and completed follow-up questions | Missing items are identified and followed up on, answers are grounded in materials, and the case is forwarded to the case handler | Ask a question that lacks key information, see whether it asks a follow-up question before answering, and check whether the follow-up items correspond to the missing materials |

## Three common errors

- Symptom: the name and date of the same record do not match between the registration form and the academic qualification certificate. Cause: the versions of the two materials are not synchronized, and retrieval hits their respective chunks without field alignment.
- Symptom: the work experience certificate lacks a signature or receipt, yet the answer is still given as if the materials were complete during intake. Cause: missing-item identification does not cover the signature and receipt fields, and the follow-up step is skipped.
- Symptom: there are many candidates but the top-ranked ones are all irrelevant, and the answer lacks key passages. Cause: the retrieval mode was not switched or re-ranking was not enabled, and key chunks were squeezed out after similarity filtering and citation upper-limit trimming.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few items, and record the number of candidates and the cited text after `limit` trimming.

Business test: ask a question that lacks key information, see whether it asks a follow-up question before answering, and the follow-up items must correspond to the missing fields in the registration form, academic qualification certificate, or work experience certificate.

- In the knowledge base search test, switch `searchMode`, compare the candidate results of the three options—semantic, full-text, and hybrid—and record the number of candidates and scores.
- Check the name, quantity, date, and signature of the registration form, academic qualification certificate, and work experience certificate; for records that are inconsistent or whose versions are not synchronized, ask follow-up questions first and then forward to the case handler.
