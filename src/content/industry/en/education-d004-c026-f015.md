---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Handover
meta_description: Degree Certificates: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the degree conferral and certificate information reporting scenario, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form carries fields for basic personal information, course grades, and degree category; the thesis review form carries fields for review comments, review conclusion, and review date; the defense resolution carries fields for the defense committee roster, voting result, and resolution date. The material sources are submissions from each training unit and historical archiving, and the update cadence advances with batch application and deliberation milestones, with field characteristics concentrated in four categories: name, quantity, date, and signature receipt. When the three types of materials enter knowledge base retrieval, each participates in recall as an independent candidate source, used to support field comparison and missing-item identification in the material drafting and responsibility handover stages, and does not directly produce issuable documents.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The "issuable material drafts and handover records" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields are complete, the responsible person is clear, and version and date are consistent; verify name, degree category, course quantity, and signature field | In the search test, initiate retrieval with the material field name, switch `searchMode` to compare candidates, and record the number of candidates and scores |
| Thesis review form | Review conclusion, review date, and reviewer signature are complete; verify whether the name, quantity, and date of the same record are consistent between the application form and the review form | Use the reviewer and review conclusion as retrieval terms, compare the ranking of the top few entries before and after enabling `usingReRank`, and check the cited text tokens |
| Defense resolution | The defense committee roster, voting result, resolution date, and signature receipt are complete; verify whether the version is synchronized | Use the resolution date and committee members as retrieval terms, observe whether candidates include both semantic and full-text results, and adjust `similarity` to see the number of entries after filtering |
| Handover record | The responsible person is clear, and version and date are consistent; if the signature or receipt is missing, block it | Draft one according to the template and complete one handover, then check the number of cited entries and content completeness after `limit` trimming |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: The two materials are submitted separately, the field definitions are not unified, and retrieval candidates are not compared across materials.
- Symptom: The defense resolution version is not synchronized, and the old roster is still recalled. Cause: The update cadence is out of step with batch milestones, retrieval is not filtered by version, and historical chunks are mixed into candidates.
- Symptom: Materials missing a signature or receipt still enter the next stage. Cause: Handover determination only checks whether fields are complete, without verifying the signature field and receipt status, so missing items are not blocked.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the ranking of the top few entries; record the number of candidates and scores, check the return differences under the three settings `similarity`, `searchMode`, and `usingReRank`, record the number of cited entries separately by array length, and check the citation upper limit against the cited text tokens.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode` to compare the candidate results of the three options—semantic, full-text, and hybrid—and record the number of candidates and scores.
- Compare the order of the top few entries before and after enabling `usingReRank`, and check the number of cited entries and content completeness after filtering and trimming according to `similarity` and `limit`.
