---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Access
meta_description: Degree Certificates: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on the degree conferral and certificate information reporting scenario, outlining the roles and field characteristics of three types of materials—degree application forms, thesis review forms, and defense resolutions—when they enter knowledge base retrieval and recall. The degree application form carries the applicant's identity, discipline, date, and signature; the thesis review form carries the reviewer, review conclusion, date, and signature; the defense resolution carries the defense committee, voting result, date, and signature. The three types of materials come from business system archived documents and scanned copies, and the update cadence advances with batch reporting and correction receipts. If the name, quantity, or date of the same record does not match across two materials, if versions are not synchronized, or if signatures or receipts are missing, all of these affect the visible scope and content consistency during authorized access and external services. When materials enter this feature, each participates in recall as a candidate segment source, and does not directly generate an external entry point or authorization result.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The externally available entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, date, and signature are consistent with the thesis review form | In the search test, retrieve with a restricted identity, check the number of returned candidates and scores, and switch `searchMode` to compare semantic, full-text, and hybrid results |
| Thesis review form | Whether the review conclusion, date, and signature are consistent with the defense resolution | Compare the ranking of the top few items before and after enabling `usingReRank`, record the number of candidates and scores, and check the segments retained after filtering by the similarity threshold `similarity` |
| Defense resolution | Whether the voting result, date, and signature are consistent with the degree application form | Check the tokens and array length of the quoted text after upper-limit trimming of citations, confirm that key paragraphs are complete, and record the array length separately |
| Authorized access scope | Whether the visitor's identity matches the visible scope, and whether unauthorized content is invisible | Access once with a restricted identity, check whether the candidates and quoted content fall only within the authorized scope, and ensure unauthorized content does not appear |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the degree application form and the thesis review form. Cause: The two materials are archived separately, without cross-checking and synchronized updates.
- Symptom: The defense resolution version is not synchronized, and the old review conclusion is still cited. Cause: The correction receipt was not backfilled, and retrieval recall still hits the old segment.
- Symptom: The materials lack signatures or receipts, and the visible scope during external services does not match the authorization settings. Cause: The authorization decision did not verify the signature and receipt status, and unauthorized content was recalled.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; switch `searchMode` and `similarity` to observe the filtering effect, and check `limit` and the tokens of the quoted text.

Business test: access once with a restricted identity, and see whether the visible scope matches the settings.

- In the knowledge base search test, use a restricted identity to retrieve the same question in semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, and compare the differences in `searchMode`.
- Enable and disable `usingReRank`, compare the ranking changes of the top few items, and check the tokens and array length of the quoted text after `similarity` filtering.
