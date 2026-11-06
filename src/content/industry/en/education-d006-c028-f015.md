---
title: Knowledge Base Retrieval for Vocational College Program Registration: Track Progress and Check Statistics
slug: /en/industry/education-d006-c028-f015
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Retrieval | Progress
meta_description: Vocational Programs: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Program Registration: Track Progress and Check Statistics

## What this category's data looks like

This page addresses vocational college program setup filing materials, including three types of sources: program setup filing forms, talent demand justification, and faculty and equipment lists. Filing forms are updated by academic year or batch, with fields including program name, code, program length, enrollment scale, and signature field; talent demand justification is updated by application cycle, with fields including position name, demand quantity, survey date, and justification conclusion; faculty and equipment lists are updated as faculty changes or equipment is procured, with fields including teacher name, professional title, equipment name, quantity, and acceptance date. When these three types of materials enter the knowledge base retrieval service, the filing form plays the role of the main record, talent demand justification plays the role of supporting evidence, and the faculty and equipment list plays the role of condition verification, each participating in recall in fragment form, for subsequent nodes or manual aggregation into progress tables and statistical scope explanations.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate fragments and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming); progress tables and statistical scope explanations must be produced by subsequent nodes or manually. Retrieval mode, multi-path merging, reranking, and similarity filtering jointly determine candidate fragments and scores; the business deliverable is not generated at this stage.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether fields, dates, and signatures are complete, and whether the name and quantity in the same record are consistent with the talent demand justification | Search the program name and code in the search test, verify the signature field and date of candidate fragments, and record the number of candidates and scores |
| Talent demand justification | Whether position names, demand quantities, and survey dates correspond to the filing form, and whether versions are synchronized | Switch `searchMode` to semantic, full-text, or hybrid, compare the quantities and dates in candidate fragments, and see whether records from the two materials fail to match |
| Faculty and equipment list | Whether teacher names, professional titles, equipment names, quantities, and acceptance dates match the filing form, and whether signatures or receipts are missing | Compare the order of the first few candidates before and after enabling `usingReRank`, check whether list fragments are reranked to the front, and verify the receipt fields |
| Retrieval returned candidates | Whether candidate fragments and similarity scores cover the three types of materials, and whether key passages are still retained after `similarity` filtering | Adjust `similarity` and `limit`, record the number of candidates and scores, and verify that the tokens and array count of the cited text are recorded separately |

## Three common errors

- Phenomenon: The name, quantity, or date of the same program does not match between the filing form and the talent demand justification. Cause: The two materials are not synchronized in version, have different update rhythms, and each recalls fragments separately during retrieval.
- Phenomenon: The faculty and equipment list lacks signatures or receipts, but candidate fragments are still recalled. Cause: The signature field was not completed when the list was updated, and retrieval does not verify signature status; it only returns candidates and scores.
- Phenomenon: There are many candidates, but the ones ranked first are all irrelevant, and the answer lacks key passages. Cause: The retrieval mode does not match the material form, reranking is not enabled, or similarity filtering is too strict.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle reranking on and off to observe the ranking of the first few results; switch `searchMode` and adjust `similarity` and `limit`, and record the number of candidates and scores.

Business test: use one week of records to verify the totals, see whether the scope and exceptions are clearly stated, and confirm that the record count and statistical count match and that the scope is written in the header.

- In the knowledge base search test, retrieve the same program name using semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, and compare the order of the first few results.
- Verify the fields, dates, and signatures of the filing form, talent demand justification, and faculty and equipment list, list the records that do not match separately, and mark the version and receipt status.
