---
title: Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c054-f015
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Retrieval | Versions
meta_description: Self-Study Exams: review retrieval for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes

## What this category's data looks like

Self-taught examination registration records and graduation review involve three types of materials: registration archives, course qualification certificates, and graduation application forms. Registration archives come from the provincial examination office registration database, with fields including name, examination registration number, ID number, major code, and enrollment status; course qualification certificates are issued by the main examining institution or the provincial examination office, with fields including course code, course name, score, qualification date, and seal; graduation application forms are filled in by candidates and accepted by the examination office, with fields including major name, number of courses, graduation conclusion, acceptance date, and handler signature. The three types of materials update at different rhythms: registration archives change with registration and transfer examinations, course qualification certificates are appended by examination batch, and graduation application forms are submitted according to the graduation review cycle. When materials enter knowledge base retrieval, registration archives and course qualification certificates serve as candidate sources for semantic and full-text recall, and graduation application forms serve as the reference basis for field comparison and signature receipt verification.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, re-rank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | Name, examination registration number, ID number, major code, and enrollment status are consistent between the archives and the qualification certificates, and dates and seals are traceable | Use `searchMode` to switch between semantic and full-text, and check whether candidates hit both the archives and the qualification certificates; record the number of candidates and scores, and compare the name and date of the same record |
| Course qualification certificates | Course code, course name, score, qualification date, and seal match between the two materials, and the old version is traceable | In the search test, view the order of the top few results once before and once after enabling `usingReRank`, and confirm that qualification certificate snippets are not pushed out by irrelevant content |
| Graduation application forms | Major name, number of courses, graduation conclusion, acceptance date, and handler signature are complete, and the number of courses is consistent with the registration archives | Record the tokens of the referenced text and the number of array entries separately; after filtering with `similarity`, check whether the key fields of the application form are retained |
| Version ledger and change records | The current version is unique, the old version is traceable, references are synchronized, and after changing one piece of content the version number and references are updated in sync | Change one course name or date, rerun retrieval to see whether the referenced snippets are synchronized; after `limit` trimming, check the number of references and content completeness |

## Three common errors

- Symptom: the name or number of courses for the same course does not match between the qualification certificate and the graduation application form. Cause: versions are not synchronized, and old-version materials are still in the recall candidates.
- Symptom: the qualification dates in the registration archives and the course qualification certificates are inconsistent. Cause: change records were not written back, and the two materials each retain the old date.
- Symptom: the graduation application form lacks the handler signature or acceptance receipt. Cause: the scanned material was not updated with the version, and retrieval still hits the old version's page without a signature.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to see the order of the top few results; switch `searchMode` to check whether semantic and full-text candidates are merged, and after filtering with `similarity`, record the number of candidates and scores.

Business test: change one piece of content and see whether the version number and references are updated in sync; record the tokens of the referenced text and the number of array entries separately, and after `limit` trimming, confirm that the key snippets are still present.

- In the knowledge base search test, retrieve the same question once with each of two phrasings, record the number of candidates and scores, and confirm that recall is consistent after reference resolution and question expansion.
- After changing a course name or qualification date, rerun retrieval, check whether the version number, referenced snippets, and change records are synchronized, and check whether the signature and receipt fields are retained.
