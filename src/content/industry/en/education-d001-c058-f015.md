---
title: Knowledge Base Retrieval for Research Project Task Agreement Signing: Find Supporting Evidence
slug: /en/industry/education-d001-c058-f015
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Retrieval | Evidence
meta_description: Research Agreements: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Project Task Agreement Signing: Find Supporting Evidence

## What this category's data looks like

In the scenario of signing research project task books, materials usually include three types: project task books, topic task breakdown tables, and budget books. The task book provides the project name, undertaking unit, start and end dates, and signature fields; the breakdown table provides the topic number, person in charge, task milestones, and corresponding budget subjects; the budget book provides amounts and calculation bases for equipment fees, material fees, labor fees, etc. Materials are mostly updated annually or by batch. The name, quantity, and date of the same record may be inconsistent across the three materials. When versions are not synchronized, old drafts can still be recalled, and pages missing signatures or receipts are also often mixed into the candidates. When the three types of materials enter knowledge base retrieval, the task book plays the role of project-level basis, the breakdown table plays the role of topic-level field cross-reference, and the budget book plays the role of funding terminology. Each participates in recall in the form of fragments, and the basis entries that can be traced back to the original text are finally assembled by subsequent nodes or manually.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | The project name, start and end dates, and signature fields need to be checked item by item against the breakdown table and budget book | In the search test, test once each with synonymous questions, record the number of candidates and scores, and check whether the returned fragments contain the original project name and dates |
| Topic task breakdown table | The topic number, person in charge, task milestones, and budget subjects need to be consistent with the task book and budget book | Switch `searchMode` to semantic, full-text, and hybrid once each, and see whether the candidates cover both the topic number and task milestones |
| Budget book | The amounts and calculation bases for equipment fees, material fees, and labor fees need to correspond to the subjects in the breakdown table | Turn rerank on and off, compare the order of the first few items, and confirm whether the amount and subject fragments are ranked at the front |
| Retrieval parameters | The number of candidates and scores can be recorded, and quoted text is checked separately by tokens | Adjust `similarity` and `limit`, and record the number of candidates; when the quote upper limit is involved, check the quoted text tokens, and do not compare array length with the budget for equality |

## Three common errors

- Symptom: the name of the same topic does not match between the task book and the breakdown table. Cause: the two materials' versions are not synchronized, and old drafts are still recalled; first check hits and associations before judging.
- Symptom: the budget book amounts are inconsistent with the number of subjects in the breakdown table. Cause: after the budget book was updated, the breakdown table was not synchronized, and candidates come from different versions; check dates and signatures.
- Symptom: the answer lacks key paragraphs, and although there are many candidates, the ones ranked at the front are all irrelevant. Cause: after similarity filtering and quote upper-limit trimming, the retained fragments are limited; change the wording and retest.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the order of the first few items; switch `searchMode` and adjust `similarity` and `limit`, record the number of candidates and scores, and check quoted text tokens separately.

Business test: ask a basis question that spans materials, see whether the answer gives a traceable source, and check whether the source comes from the institution’s materials, whether the version is current, and whether the entries match the original text.

- In the knowledge base search test, retrieve the same basis question once each with two phrasings, record the number of candidates, scores, and the order of the first few items, and confirm that the original text can be traced back.
- Import the task book, breakdown table, and budget book grouped by version and signature status, and during retrieval check whether the names, quantities, and dates in the returned fragments are consistent with the current version.
