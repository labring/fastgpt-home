---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Review
meta_description: Degree Certificates: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses exception tracing and manual review in degree conferral and certificate information reporting. The materials come from degree application forms, thesis review forms, defense resolutions, and receipts. The degree application form provides the applicant's identity, discipline, and proposed degree fields, and is the starting material for exception tracing; the thesis review form carries the review conclusion, review date, and reviewer signature, and is used to check the name and quantity against the same record; the defense resolution records the defense date, resolution conclusion, and committee member signatures, and is the key basis for the review conclusion; the receipt is used to confirm material delivery and version synchronization. The update cadence follows batch reporting, and each supplementary report or withdrawal produces a new version. When the materials enter knowledge base retrieval and recall, each serves as a source of candidate snippets and is recalled by three types of features: fields, dates, and signatures, for subsequent nodes or manual comparison.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "exception list and review conclusion" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | The fields include applicant name, discipline, proposed degree, and date; the signature field must be complete | In the search test, switch `searchMode`, search the applicant name and date with synonymous questions, and record the number of candidates and the `similarity` score |
| Thesis review form | The review conclusion, review date, and reviewer signature must match the same record as the application form | Compare the top few rankings before and after enabling `usingReRank`, and check whether the name, quantity, and date are consistent |
| Defense resolution | The defense date, resolution conclusion, and committee member signatures must corroborate each other with the review form and application form | After trimming by `limit`, view the cited text tokens and array count to confirm that key passages have not been truncated |
| Receipt | The delivery status and version number must be synchronized with the corresponding material; missing signature or receipt is an exception | Search once each by the name and date of the same record to see whether the candidates include both semantic and full-text results |

## Three common errors

- Symptom: the name or date of the same applicant does not match between the application form and the review form. Cause: the versions of the two materials are not synchronized, and the retrieval hits cover only one of them.
- Symptom: the defense resolution lacks committee member signatures or the receipt has not been returned, yet the exception record is still treated as complete material. Cause: before review, the signature and receipt fields were not compared item by item.
- Symptom: there are many candidates but the ones ranked at the top are irrelevant, and the review conclusion lacks key passages. Cause: rerank was not enabled, or similarity filtering and citation limit trimming were too tight.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few.

Business test: create an exception record and see whether the source material can be traced.

- In the search test, fix `searchMode`, search with three question types: name, quantity, and date, and record the number of candidates and the `similarity` score.
- Compare the order of the top few before and after enabling `usingReRank`, and after trimming by `limit`, check the cited text tokens and array count.
