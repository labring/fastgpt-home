---
title: Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c054-f015
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Retrieval | Progress
meta_description: Self-Study Exams: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics

## What this category's data looks like

This page's material comes from the self-taught examination registration records and graduation review scenario, including three types: registration records, course pass certificates, and graduation application forms. Registration records are updated by the provincial examination office after each registration, with fields including admission ticket number, name, major, registration date, and handler signature; course pass certificates are issued by the main examining institution by exam session, with fields including course code, name, score, pass date, and main examining institution seal; graduation application forms are filled out by the candidate and preliminarily reviewed by the examination office, with fields including applied major, number of courses, total credits, preliminary review opinion, and receipt. When the three types of material enter the knowledge base retrieval service, each is recalled as an independent fragment: registration records provide the basis for identity and registration, course pass certificates provide the source for course-dimension statistics, and graduation application forms provide the graduation review criteria and signed receipt clues. The update rhythm is registration records by registration batch, course pass certificates by exam session, and graduation application forms by application batch; field characteristics are mainly dates, names, quantities, and signatures, and each item must be aligned one by one in the retrieval candidates.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The "progress table and statistical criteria description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Check against course pass certificates and graduation application forms whether the admission ticket number, name, major, registration date, and handler signature are consistent | In the search test, retrieve with synonymous questions, record the number of candidates and scores, and check whether the fragments returned after `searchMode` is set to semantic, full-text, or hybrid cover the signature and date fields |
| Course pass certificates | Check against registration records and graduation application forms whether the course code, name, score, pass date, and main examining institution seal match | Switch `searchMode` to compare candidates, check the ranking of the top few entries before and after enabling `usingReRank`, and check whether the course names and quantities are consistent with the progress table criteria |
| Graduation application forms | Check against registration records and course pass certificates whether the applied major, number of courses, total credits, preliminary review opinion, and receipt are complete | Use `similarity` to filter low-scoring candidates, record the array length and cited text tokens, and check whether the preliminary review opinion and receipt appear in the candidate fragments |
| Progress table and statistical criteria description | The recorded count and statistical count match, the criteria are written in the header, and exceptions are noted one by one | Use one week of records to check the totals and see whether the criteria and exceptions are clearly written; for the citation upper limit, check only the cited text tokens, record the array length separately, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: the name and number of courses for the same course do not match between the pass certificate and the graduation application form. Cause: the versions of the two materials are not synchronized, or the course code and name were not mapped according to the same criteria during entry.
- Symptom: the registration date and preliminary review date do not match between the registration records and the graduation application form. Cause: the date fields are taken from records of different batches, and the receipt was not collected in time, causing the timeline to be misaligned.
- Symptom: there are many candidates but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: the retrieval mode does not match the material form, or key fragments are truncated after similarity filtering and citation upper-limit trimming.

## How to verify the setup

This feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to check the ranking of the top few entries; record the number of candidates and scores, switch `searchMode`, and enable `usingReRank` for rechecking.

Business testing: use one week of records to check the totals and see whether the criteria and exceptions are clearly written; record the citation count by array length, and for the citation upper limit check only the cited text tokens.

- In the search test, retrieve registration records, course pass certificates, and graduation application forms separately with synonymous questions, record the number of candidates and scores, and check whether the date, name, quantity, and signature fields appear in the candidate fragments.
- Switch `searchMode` and enable `usingReRank`, compare the ranking of the top few entries before and after enabling; use `similarity` to filter low-scoring candidates, and record the array length and cited text tokens separately.
