---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Find Supporting Evidence
slug: /en/industry/education-d001-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Evidence
meta_description: Degree Certificates: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Find Supporting Evidence

## What this category's data looks like

This page centers on the degree conferral and certificate information reporting category. Materials include degree application forms, thesis review sheets, defense resolutions, and the accompanying certificate information reporting forms and receipts. The source is the original records archived by each on-campus training unit, and the update cadence is synchronized with degree conferral batches, with a centralized check once before each batch is reported. Field characteristics center on name, student ID, major, degree type, thesis title, review conclusion, defense date, resolution result, signature, and receipt number. When the materials enter the knowledge base retrieval and recall function, the degree application form plays the role of the primary record for identity and application information, the thesis review sheet plays the role of corroborating the review conclusion and reviewer information, the defense resolution plays the role of determining the defense result and signature completeness, and the certificate information reporting form and receipt play the role of verifying the reporting fields and receipt status. The four types of materials serve as mutual references within the same retrieval space, used to answer basis questions that span materials.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). "Basis items that can be traced back to the original text" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, dates, and signature match the thesis review sheet and defense resolution | In the search test, switch `searchMode`, use the same question to separately obtain semantic, full-text, and hybrid candidates, and compare name, student ID, major, thesis title, and date item by item |
| Thesis review sheet | Whether the review conclusion, reviewer, and review date are consistent with the records in the defense resolution | Take one result before and after enabling `usingReRank`, see whether the top candidates still point to the same review conclusion and date, and record the number of candidates and the score |
| Defense resolution | Whether the defense date, resolution result, and signature or receipt are complete | Check whether the defense date and resolution result in the returned snippets can correspond to the reporting form, and check whether the signature and receipt fields are missing |
| Certificate information reporting form and receipt | Whether the correspondence between the reporting fields, receipt number, and the application form, review sheet, and resolution holds | Adjust `limit` to observe changes in the number of cited items, record the array count separately, and check whether the tokens of the cited text retain the key fields |

## Three common errors

- Symptom: the name or date of the same record does not match between the application form and the review sheet. Cause: the two materials were entered separately, without field-level comparison.
- Symptom: the review conclusion cited by the defense resolution is inconsistent with the current version. Cause: the version was not synchronized, and the old version of the material is still participating in recall in the knowledge base.
- Symptom: the reporting form lacks a signature or receipt number. Cause: the receipt was not fully collected during the archiving step, so retrieval can only return missing snippets.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten question sentences, compare candidates and scores, then toggle re-ranking on and off to see the ordering of the top items.

Business test: ask a basis question that spans materials, and see whether the answer gives a traceable source.

- In the search test, fix the question, obtain candidates once each in semantic, full-text, and hybrid modes, and record the number of candidates and the score.
- Take one result before and after enabling re-ranking, compare the ordering of the top items, and check whether the tokens of the cited text retain the key fields.
