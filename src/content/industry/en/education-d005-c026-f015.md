---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Versions
meta_description: Degree Certificates: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Maintain Document Versions and Changes

## What this category's data looks like

This page centers on degree conferral and certificate information reporting. Materials include degree application forms, thesis review forms, and defense resolutions. Sources are the finalized documents and receipts submitted by each training unit, and the update cadence rolls forward with batches and revision notices. The degree application form carries the applicant's identity, discipline, and date fields; the thesis review form carries the review conclusion and reviewer signature; the defense resolution carries the voting result, defense date, and committee member signatures. Together, the three support field consistency for the same record. When the materials enter knowledge base retrieval and recall, each is split and indexed as an independent chunk and serves a different recall entry point: the application form provides identity and time anchors, the review form provides the basis for the conclusion, and the defense resolution provides the final determination and signature clues. During retrieval, semantic and full-text recall are performed on two paths and then merged.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate chunks and similarity scores (after mode, merge, re-rank, filter, and upper-limit truncation). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields, dates, and signatures are self-consistent within the application form, and match the names, counts, and dates in the review form and defense resolution | In the search test, search by applicant name and date, check whether the name, discipline, date, and signature position in the candidate chunks are consistent with the review form and defense resolution, record the number of candidates and scores, and check whether results change after switching `searchMode` |
| Thesis review form | The review conclusion, reviewer signature, and date are complete, and match the same record in the application form and defense resolution | Search once each with synonymous questions for the same record, compare candidates and similarity scores, look at the ranking of the top few before and after enabling `usingReRank`, and confirm that the review conclusion and signature chunks have not been truncated or lost |
| Defense resolution | The voting result, defense date, and committee member signatures are complete, and match the application form and review form | Search by defense date and resolution keywords, check the voting result, date, and signatures in the candidate chunks, confirm that the tokens of the quoted text are within budget, record the array count separately, and adjust `limit` if necessary to observe truncation |
| Version ledger and change records | The current version is unique, old versions are traceable, and citations are synchronized | After changing one piece of content, search again, compare old and new candidates and scores, check whether the version number and citations are updated synchronously, and confirm that old-version chunks can still be recalled |

## Three common errors

- Symptom: The name, count, and date of the same record do not match between the degree application form and the defense resolution. Cause: The two materials are submitted and revised separately, versions are not synchronized, and retrieval hits chunks from different batches.
- Symptom: The thesis review form lacks a signature or receipt, the defense resolution lacks committee member signatures, yet the quoted chunks are still recalled. Cause: The materials themselves are incomplete, and retrieval only performs semantic and full-text recall without validating signature positions.
- Symptom: The same question cannot be recalled when rephrased, or there are many candidates but the top-ranked ones are all irrelevant. Cause: Question optimization and re-ranking do not cover that phrasing, and key passages are truncated after similarity filtering and quoted upper-limit truncation.

## How to verify the setup

Feature acceptance: Test once each with synonymously rewritten questions, compare candidates and similarity scores, then toggle re-ranking on and off to inspect the ranking of the top few, and confirm that changes in candidate count and scores meet expectations.

Business testing: Change one piece of content, see whether the version number and citations are updated synchronously, and check whether the old version is still traceable.

- In the knowledge base search test, switch `searchMode`, compare semantic, full-text, and hybrid candidates across the three paths, and confirm that after multi-path merging both types of results are included.
- Enable `usingReRank` to compare the ranking of the top few, adjust `limit` to observe quoted upper-limit truncation, and confirm that quoted text tokens and array count are recorded separately.
