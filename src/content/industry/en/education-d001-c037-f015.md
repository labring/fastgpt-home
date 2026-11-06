---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Evidence
meta_description: Training Subsidies: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Find Supporting Evidence

## What this category's data looks like

The category materials for vocational training subsidy applications mainly consist of training class filing records, attendance records, and completion assessment forms, supplemented by subsidy application forms, personnel rosters, and receipts. The class filing records state the institution, occupation, class number, start and end dates, and approval signature; attendance records register student names, identity information, and personal signatures on a daily basis; completion assessment forms register assessment subjects, scores, assessors, and the institution's seal. The three types of materials play different roles in knowledge base retrieval: class filing records are used to define the class number and time boundaries, attendance records are used to verify personnel attendance and signature completeness, and completion assessment forms are used to verify assessment conclusions and seals. Materials are archived by class number and updated by batch, with versions synchronized alongside policy adjustments and supplementary entries. In terms of fields, it is common for the same record to have mismatched names, quantities, and dates across two materials, unsynchronized versions, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing record | The institution, occupation, class number, start and end dates, and approval signature must be aligned item by item with the attendance records and completion assessment forms | In the search test, use class number and date questions to retrieve, verify whether the institution, occupation, start and end dates, and signature in the candidate snippets are consistent, and record the number of candidates and scores |
| Attendance record | Student names, identity information, attendance dates, and personal signatures must match the class filing records and completion assessment forms | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates cover both attendance and filing records, verify dates and signatures, and record the number of candidates and scores |
| Completion assessment form | Assessment subjects, scores, assessors, and the institution's seal must be consistent with the class filing records and attendance records | Turn `usingReRank` on and off and retrieve once each, compare the ranking of the top few results, verify assessment conclusions and seals, and record the number of candidates and scores |
| Basis entry | The entry must come from the institution’s materials, be the current version, and be traceable back to the original text | Test once each with synonym-rewritten questions, verify the cited text tokens and array length, and confirm that under `similarity` and `limit` the candidates still retain key snippets from the original text |

## Three common errors

- Phenomenon: The same class number name does not match across two materials. Cause: The class filing record and attendance record are entered separately, not uniformly named by class number, and after retrieval hits, the original text is not traced back for verification.
- Phenomenon: The attendance date and completion assessment date are inconsistent. Cause: During supplementary entry, only one material was changed, versions were not synchronized, candidate snippets each formed separate paragraphs, and item-by-item alignment was not performed.
- Phenomenon: The completion assessment form lacks the assessor's signature or the institution's seal. Cause: When archiving materials, receipts and signatures were not verified, retrieval only returned candidate snippets, and the original text was not traced back to confirm completeness.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then turn re-rank on and off to observe the ranking of the top few results; verify the number of candidates and scores under `similarity`, `limit`, `searchMode`, and `usingReRank`.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores across semantic, full-text, and hybrid modes, and verify whether both types of recall results are included.
- Turn `usingReRank` on and off and retrieve once each, compare the order of the top few results; record the cited text tokens and array length, and confirm that key snippets are not trimmed under `similarity` and `limit`.
