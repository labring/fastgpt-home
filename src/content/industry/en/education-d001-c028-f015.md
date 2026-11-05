---
title: Knowledge Base Retrieval for Vocational College Program Registration: Find Supporting Evidence
slug: /en/industry/education-d001-c028-f015
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Retrieval | Evidence
meta_description: Vocational Programs: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Program Registration: Find Supporting Evidence

## What this category's data looks like

Vocational college program setup filing materials typically include three types: the program setup filing form, the talent demand justification report, and the faculty and equipment list. Fields cover program name, program code, program length, enrollment number, teacher name and title, equipment name and quantity, justification date, signature and seal, and receipt. The source is the current version submitted by the institution, and the update cadence follows the filing year and feedback from the competent authority. The filing form carries the program's basic information and approval opinions, the talent demand justification report carries industry research and job correspondence, and the faculty and equipment list carries evidence of school-running conditions. When these three types of materials enter knowledge base retrieval, each is recalled as an independent segment, and fields and dates need to be traced back to the original text within candidate segments for verification.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Fields include program name, program code, program length, enrollment number, signature date, and receipt number, and must be consistent with the current version | In the search test, switch `searchMode` to hybrid retrieval, and check whether candidate segments contain the fields and signature date from the original filing form |
| Talent demand justification report | Fields include research date, job name, demand quantity, justification conclusion, and signature, and must correspond to the program name in the filing form | Search with synonymous questions, record the number of candidate entries and scores, and compare the ranking of the top few entries before and after enabling `usingReRank` |
| Faculty and equipment list | Fields include teacher name, title, equipment name, quantity, purchase date, and signature, and must be consistent with the quantities in the justification report | Adjust `similarity` and `limit`, and see whether the key field segments from the original list are still retained after trimming |

## Three common errors

- Phenomenon: The same program name is written differently in the filing form and the justification report. Cause: The two materials were filled out by different personnel without a unified naming convention, so the sources of matched segments do not align during retrieval.
- Phenomenon: Equipment quantities do not match between the list and the justification report. Cause: The justification report was not synchronized after the list was updated, and the unsynchronized versions cause candidate segments to contradict each other.
- Phenomenon: The filing form lacks a signature or receipt. Cause: The submission process was not closed-loop, the signature field was not validated when the material entered the knowledge base, and the cited content lacks responsibility information.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the ranking of the top few entries; record the number of candidate entries and scores, and check the impact of `searchMode`, `similarity`, and `usingReRank` on the results.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the knowledge base search test, switch `searchMode` and compare the candidate segments and scores returned by the semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank`, compare changes in the ranking of the top few candidates, and record the number of cited entries after trimming by `similarity` and `limit`.
