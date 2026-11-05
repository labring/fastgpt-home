---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics
slug: /en/industry/education-d006-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Progress
meta_description: Degree Certificates: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the degree conferral and certificate information reporting scenario, with materials drawn from three types: degree application forms, thesis review forms, and defense resolutions. The degree application form carries the applicant's basic information and course credit fields; the thesis review form carries the review conclusion, review date, and reviewer signature; the defense resolution carries the defense date, resolution conclusion, and committee member signatures. Materials enter the knowledge base in batches over time, with an update cadence synchronized with the reporting cycle, and field characteristics concentrated in names, quantities, dates, signatures, and receipts. Once the three types of materials enter the retrieval function, each serves as an independent candidate chunk, to be used later when verifying the progress table and the statistical scope statement.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate chunks and similarity scores (after mode, merge, re-rank, filter, and limit truncation); the progress table and statistical scope statement must be handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Name, quantity, date, and signature fields must be aligned item by item with the thesis review form | In the search test, switch `searchMode` to semantic, full-text, and hybrid once each, record the number of candidates and scores, and compare the name and date of the same record in the two materials |
| Thesis review form | Review conclusion, review date, and reviewer signature must be consistent with the defense resolution | Query once with re-ranking enabled and once disabled, observe changes in the order of the top few results, and check whether the review date and defense date come from the same source |
| Defense resolution | Resolution conclusion, defense date, committee member signatures, and receipt must be complete | After filtering by `similarity`, record the number of candidates, separately record the length of the citation array, then check the tokens of the cited text and the `limit` truncation |
| Progress table and statistical scope statement | Record counts and statistical counts must match, and the scope must be written in the header | Use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and verify the candidate ordering before and after toggling `usingReRank` |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the degree application form and the thesis review form. Cause: The versions of the two materials are not synchronized, and the retrieval candidates each hit different chunks.
- Symptom: The date in the defense resolution is inconsistent with the date in the thesis review form. Cause: Values were not taken according to the same scope at entry time, and the candidate chunks were not checked with a secondary ordering.
- Symptom: Records missing signatures or receipts still enter the statistics. Cause: The filter condition only truncates by similarity and does not include the signature and receipt fields in the check.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the ordering of the top few results; record the number of candidates and scores, and switch `searchMode` to recheck.

Business testing: Use one week of records to verify the totals, check whether the scope and exceptions are clearly stated, and verify whether the citation array length and the tokens of the cited text are recorded separately.

- In the knowledge base search test, retrieve the same record in semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, and check whether the name, quantity, and date are consistent.
- Query once with re-ranking enabled and once disabled, compare the order of the top few results; separately record the length of the citation array, then check the tokens of the cited text and the `limit`, `similarity`, and `usingReRank` settings.
