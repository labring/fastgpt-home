---
title: Reranking and Hybrid Retrieval for Degree Awards and Certificate Information Reporting: Find Supporting Evidence
slug: /en/industry/education-d001-c026-f018
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Reranking | Evidence
meta_description: Degree Certificates: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Degree Awards and Certificate Information Reporting: Find Supporting Evidence

## What this category's data looks like

This page addresses the degree conferral and certificate information reporting category, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. These materials come from the internal archives of degree-granting institutions and are updated by batch. Fields include name, student ID, degree type, thesis title, defense date, review conclusion, signature, and receipt. When entering the hybrid retrieval and reranking function, the degree application form is used to confirm the applicant's identity and degree type, the thesis review form is used to verify the review opinions and conclusions, and the defense resolution is used to verify the defense date and voting results. Each of the three types of materials plays the role of a basis source, and retrieval results need to point back to the specific original material text, making it convenient to reply to parents or write into a plan.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, outputting the sorted candidates and reranking scores. The basis entries that can point back to the original text are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results. After merging, the scope is large and similarity filtering cannot be applied directly; usually the reranking model is then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields include name, student ID, degree type, application date, and signature; the date and signature must be aligned item by item with the thesis review form and defense resolution | Check whether the application form fields and signature are complete, and compare whether the names and dates in the other two materials are consistent; use `searchMode` to confirm that both retrieval paths are enabled |
| Thesis review form | Fields include reviewer, review conclusion, review date, and signature; the name and quantity in the same record must be consistent with the defense resolution | Check the review conclusion and date, and check whether the signature or receipt is missing; use `usingReRank` to confirm that the reranking model is bound and used for sorting and filtering |
| Defense resolution | Fields include defense date, voting result, resolution signature, and receipt; the version must be current, and the date and quantity must match the application form and review form | Check the defense date and voting result, and check whether the version is synchronized; compare the number of candidates and scores before and after reranking, and use `similarity` and `limit` to check filtering and the number of returned items |
| Hybrid retrieval and reranking output | Candidates come from both the vector and full-text paths, and are sorted by score after reranking; the tokens of the cited text and the number of array items are recorded separately | Check whether candidates come from both paths, and compare the order and scores of the top three before and after reranking; the number of citations is recorded by array length, and the citation content budget is checked separately by tokens |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the defense resolution. Cause: The two materials were entered at different times, and cross-material field alignment was not performed.
- Symptom: The version of the thesis review form is not synchronized, and the current conclusion is mixed with the old version. Cause: After the material was updated, it did not re-enter the retrieval and reranking process, and the version marker is missing.
- Symptom: The defense resolution lacks a signature or receipt but is still returned as a basis entry. Cause: Citation trimming did not check the signature and receipt fields, and the reranking score did not reflect completeness.

## How to verify the setup

Acceptance of this function: compare the order and reranking scores of the top three before and after enabling reranking, check the number of candidates and score changes, and confirm that the reranking model is bound and used for sorting and filtering.

Business test: ask a cross-material basis question, see whether the answer gives a citable source, and check whether the source can point back to the original text of the degree application form, thesis review form, or defense resolution.

- In the search parameters, check the switches for both the vector and full-text paths, confirm that `searchMode` corresponds to hybrid retrieval being enabled, and check that `usingReRank` is bound to the reranking model.
- Compare the number of candidates and scores before and after reranking, and use `similarity` and `limit` to check filtering and the number of returned items; the number of citations is recorded by array length, and the citation content budget is checked separately by tokens.
