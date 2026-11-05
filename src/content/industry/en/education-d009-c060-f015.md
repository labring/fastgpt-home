---
title: Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c060-f015
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Retrieval | Multilingual
meta_description: Research Progress: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Annual Progress and Acceptance: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page deals with multilingual materials and terminology processing in the context of annual progress and acceptance of research projects. Materials include annual progress reports, mid-term review materials, and acceptance reports, sourced from project team submissions, partner receipts, and public release drafts. The update cadence follows the reporting cycle and acceptance milestones, and field characteristics center on project name, task number, indicator count, start and end dates, signatures, and receipts. Annual progress reports serve as the primary source of current-period tasks and indicators when entering retrieval; mid-term review materials carry stage comparison and adjustment records; acceptance reports summarize the final names, counts, and dates and include signature pages. The three types of materials coexist in the knowledge base, and retrieval candidates will simultaneously hit different versions and language fragments, requiring mode selection, merging, re-ranking, and filtering to push key field fragments to the front, before handing them to subsequent nodes or manual work to organize into a unified terminology table and comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merging, re-ranking, filtering, and upper-limit trimming). The "unified terminology table and comparison draft" is completed by subsequent nodes or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether the project name, task number, indicator count, start and end dates, and signature are consistent with the mid-term review materials and acceptance report | In the search test, search once for each different language rendering of the same term, switch `searchMode` to semantic, full-text, and hybrid, record the number of candidates and scores, and check the names, counts, and dates in the returned fragments |
| Mid-term review materials | Whether the names, counts, and dates after stage adjustments are synchronized in the acceptance report, and whether versions are unsynchronized | Turn `usingReRank` on and off and look at the top few rankings each time, check whether the hit fragments cover adjustment records and receipts; the citation limit only checks the tokens of the cited text, the array count is recorded separately, and `limit` is not compared with the citation budget |
| Acceptance report | Whether the final names, counts, dates, and signatures or receipts are complete, and whether they can be traced back to the original text of the annual progress report | Search for the same term using a synonym-rewritten question, and observe whether candidates after `similarity` filtering still retain key fragments of the original text; if the sources do not match, first check hits and associations |

## Three common errors

- Phenomenon: The names, counts, or dates of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials are updated separately, versions are not synchronized, and retrieval candidates hit both old and new fragments.
- Phenomenon: Mid-term review materials lack signatures or receipts, yet the public release draft cites them directly. Cause: When materials enter the knowledge base, formal versions and process drafts are not distinguished, and candidates are not ranked by field completeness.
- Phenomenon: The same term cannot be recalled when phrased differently, or there are many candidates but the ones ranked at the front are all irrelevant. Cause: The retrieval mode does not match the material form, and multi-path merging and re-ranking do not cover that language rendering.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking and look at the top few rankings; at the same time switch `searchMode` to observe candidate differences among semantic, full-text, and hybrid, and record the number of entries after `similarity` filtering.

Business test: sample three terms and check whether the wording is consistent throughout the entire document, confirm that translated names can be traced back to the original text, and that names, counts, dates, and signatures match across the annual progress report, mid-term review materials, and acceptance report.

- In the knowledge base search test, search the same term using semantic, full-text, and hybrid modes respectively, record the number of candidates and scores, and check whether the returned fragments contain the name, count, date, and signature fields.
- Turn re-ranking on and off and look at the top few rankings each time, and check whether the multi-path merged results include both semantic and full-text sources; the citation limit only checks the tokens of the cited text, and the array count is recorded separately.
