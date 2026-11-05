---
title: Knowledge Base Retrieval for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c058-f015
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Retrieval | Handover
meta_description: Research Agreements: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page centers on material drafting and responsibility handover in the signing of research project task books, covering three types of materials: project task books, subject task breakdown tables, and budget books. The project task book is the main document, carrying the research objectives, period, total funding, and signature fields; the subject task breakdown table is an attachment that breaks down tasks, responsible persons, and start/end times item by item; the budget book is a supporting table listing subjects, amounts, and calculation bases. Materials are usually generated from templates by the research management department and updated over multiple rounds along with review comments and budget adjustments, with field characteristics concentrated in names, quantities, dates, version numbers, signatures, and receipts. When entering the knowledge base retrieval service, the three types of materials each serve as independent fragment sources: the task book provides the overall outline, the breakdown table provides responsibility granularity, and the budget book provides numerical standards; during retrieval, corresponding passages are recalled by fields and dates.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The signable material drafts and handover records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Fields, dates, and signatures are complete, and consistent with the breakdown table and budget book standards | In the search test, search by project name and signing date, verify the name, period, signature fields, and version date in the candidate fragments; record the number of candidates and scores, and switch `searchMode` to compare the recall differences among semantic, full-text, and hybrid modes |
| Subject task breakdown table | Task names, responsible persons, and start/end times are consistent with the corresponding entries in the task book | Search once each with synonym-rewritten questions, and verify whether the candidates cover both the task book and the breakdown table; turn `usingReRank` on and off to compare the ranking of the top few results, and confirm that responsibility handover fields are not missed in recall |
| Budget book | Subjects, amounts, and calculation bases are consistent with the total funding in the task book | Search by subject and amount, verify the numbers and dates in the candidate fragments; inspect the key original text fragments retained after `similarity` filtering, separately record the number of items in the citation array, and check whether the tokens of the cited text are within `limit` and the citation upper-limit trimming |
| Handover record | Responsible person, handover date, version number, and receipt signature are clear | Search by handover form number, and verify whether the candidates hit the receipt and signature pages; when confirming that the version is not synchronized, use the candidate scores and number of citations to judge whether manual review is needed |

## Three common errors

- Phenomenon: The same subject name is written differently in the task book and the breakdown table, and the quantities and dates do not match. Cause: The materials are drafted separately, retrieval does not recall by a unified field name, the candidate fragments are independent of each other, and cross-material comparison is lacking.
- Phenomenon: The budget book has been adjusted, but the task book is still an old version. Cause: The version is not synchronized, the updated fragments do not overwrite the old fragments, and retrieval candidates return both old and new dates with close scores that are difficult to distinguish.
- Phenomenon: The handover record lacks a signature or receipt, but the material draft can still circulate. Cause: Retrieval only returns candidate fragments and cited content, does not judge signature status, missing items are not intercepted, and manual verification by field is required.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ranking of the top few results; switch `searchMode` to observe the recall differences among semantic, full-text, and hybrid, record the number of candidates and `similarity` scores, separately record the number of items in the citation array, and check the tokens of the cited text.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Search separately by project name, subject name, subject, and handover form number, and verify whether the names, quantities, dates, and signature fields in the candidate fragments are complete.
- Compare the order of the top few candidates after turning `usingReRank` on and off, and confirm that responsibility handover fields and budget numbers are not trimmed away.
