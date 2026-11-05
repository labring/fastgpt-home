---
title: Knowledge Base Retrieval for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c056-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Retrieval | Checks
meta_description: Teacher Qualifications: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences

## What this category's data looks like

This category's data includes written and interview registration forms, Putonghua certificates, and medical examination forms for teacher qualification exams and certification. Sources are exports from the registration system, certificates issued by testing institutions, and medical examination conclusions issued by designated hospitals. The update cadence advances with batches: registration forms have version differences before and after review, Putonghua certificates are issued in batches, and medical examination forms are archived according to hospital receipt times. Field characteristics center on name, ID number, exam subject, certificate number, medical examination conclusion, date, and signature field. When the three types of materials enter knowledge base retrieval, their roles differ: the registration form provides registration and subject information, the Putonghua certificate provides grade and number, and the medical examination form provides the conclusion and physician signature. The retrieval service splits each material into candidate chunks for verification personnel to compare whether the name, quantity, and date of the same object are consistent across two materials, and to locate discrepant fields.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, re-rank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Name, quantity, date, and signature field must be aligned item by item with the Putonghua certificate and medical examination form | In the search test, switch `searchMode` to semantic, full-text, or hybrid, view candidate chunks and scores separately, and verify the name, subject, and date fields |
| Putonghua certificate | Certificate number, grade, and issue date must be consistent with the records in the registration form and medical examination form | Compare the order of the top few candidates before and after enabling re-rank, and confirm whether the certificate number and issue date chunks are stably ranked at the front |
| Medical examination form | Medical examination conclusion, physician signature, and receipt date must match the registration form and Putonghua certificate | Adjust `similarity` and `limit` to observe changes in the number of candidates and scores, and verify item by item whether the signature field and receipt date are missing |
| Knowledge base retrieval service | Candidate chunks and similarity scores are returned after mode, merge, re-rank, filter, and limit trimming | Test once each with synonymous questions, record the number of candidates and scores, and verify the ranking difference before and after the `usingReRank` switch |

## Three common errors

- Symptom: The name or date of the same record does not match between the registration form and the medical examination form. Cause: The versions of the two materials are not synchronized, and the retrieval candidates do not hit both sources at the same time.
- Symptom: The Putonghua certificate number is missing from the candidate chunks or inconsistent with the registration form. Cause: Certificates are issued in batches, and old-version chunks remain in the knowledge base.
- Symptom: The medical examination form lacks a physician signature or receipt date. Cause: The signature page was not completed when the material was archived, and retrieval can only recall existing chunks.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidate chunks and similarity scores, then toggle re-rank to see the ordering of the top few; record the number of candidates and scores, and when the citation limit is involved, verify the tokens of the cited text, recording the array count separately.

Business test: use one real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write back the discrepancy list.

- In the search test, switch `searchMode` to semantic, full-text, or hybrid, compare the candidate chunks and scores for the same question, and locate fields with inconsistent name, quantity, or date.
- After enabling re-rank, compare the order of the top few candidates, adjust `similarity` and `limit`, verify the ranking difference before and after the `usingReRank` switch, and record the number of candidates.
