---
title: Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c054-f015
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Retrieval | Intake
meta_description: Self-Study Exams: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information

## What this category's data looks like

Self-taught examination registration record and graduation review materials fall into three categories: registration records, course pass certificates, and graduation application forms. Registration records contain the candidate's basic information, admission ticket number, major name, course scores and change records, with dates subject to the seal of the provincial examination office; course pass certificates contain the course code, name, credits, pass date and the seal of the examining institution; graduation application forms contain name, ID number, major, number of courses, signature and receipt column. The three categories of materials are updated by batch and year, and inconsistencies frequently appear between abbreviated and full names in fields, mismatched course counts or credits, dates not synchronized across years, and missing signatures or receipts. When entering the retrieval stage, registration records provide the basis for identity and major, course pass certificates provide the basis for courses and credits, and graduation application forms provide the basis for application and signature; together the three support the generation of intake records and follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter and limit trimming). "Intake records and follow-up questions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Fields contain admission ticket number, major name, course scores and change dates, with complete signatures and seals | In the search test, switch `searchMode` to semantic, full-text or hybrid, and compare the number of candidates and scores; check whether the record name is consistent with the course pass certificate |
| Course pass certificate | Course code, name, credits, pass date and the seal of the examining institution correspond, with no missing items | Test once each with synonymous questions and compare candidates and scores; check the ranking of the top few entries before and after enabling `usingReRank`; check whether the number of courses on the pass certificate matches the graduation application form |
| Graduation application form | Name, ID number, major, number of courses, signature and receipt column are complete | Check whether the application form date is synchronized with the change dates in the registration records; view the number of candidates and scores, confirm that the number of cited entries is the array length, that cited text tokens are recorded separately, and that `limit` and `similarity` are adjusted as needed |

## Three common errors

- Symptom: the abbreviated and full names of the same course do not match between the pass certificate and the application form. Cause: the two material versions are not synchronized, and a unified name standard was not followed during data entry.
- Symptom: the number of courses or credits is inconsistent between the two materials. Cause: the application form was not synchronized after the pass certificate was updated, or retake records were not merged in.
- Symptom: the graduation application form lacks a signature or the receipt column is empty. Cause: the handover step did not complete receipt confirmation, and it was omitted when the materials were returned.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and similarity scores, then toggle re-ranking on and off to see the ranking of the top few entries; switch `searchMode` and `usingReRank`, record the number of candidates, check cited text tokens separately, and adjust `limit` and `similarity` according to actual conditions.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- In the search test, run the same question once with different phrasings, record the number of candidates and scores, and compare the order of the top few entries before and after enabling re-ranking.
- Check the names, quantities, dates and signatures of registration records, course pass certificates and graduation application forms; if inconsistencies are found, first verify hits and associations, then forward to the responsible person for handling.
