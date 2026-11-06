---
title: Knowledge Base Retrieval for Research Ethics Review: Find Supporting Evidence
slug: /en/industry/education-d001-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Evidence
meta_description: Research Ethics: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Find Supporting Evidence

## What this category's data looks like

Research ethics review materials usually consist of three types: ethics review applications, informed consent form templates, and risk assessment forms. Their fields cover project name, number of subjects, review date, signatures, and receipts. The materials come from institutional ethics committee archives and submission packages, and their update cadence changes with version revisions and annual reviews. When entering the knowledge base retrieval service, the three types of materials each participate in recall as independent sources: ethics review applications provide review conclusions and approval information, informed consent form templates provide signing requirements and version identifiers, and risk assessment forms provide risk levels and handling records. In terms of field characteristics, the name, quantity, and date of the same record may be expressed differently across materials, and the completeness of signature fields and receipt fields must also be checked one by one. During retrieval, attention must be paid to whether the material version is current and whether entries can be traced back to the original passage, avoiding treating historical versions or unsigned pages as the basis.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, rerank, filter, and limit trimming). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually. The retrieval mode, multi-route merge, rerank, and similarity filtering jointly determine the presentation order and completeness of candidates.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields include project name, number of subjects, review date, and signature, and must be aligned item by item with the informed consent form template | In the search test, switch `searchMode`, compare semantic and full-text recall candidates, and check whether the date and signature field fall within the same record |
| Informed consent form template | The version identifier and signing date must be current, and signatures and receipts must not be missing | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the template version number and receipt page are recalled |
| Risk assessment form | The risk level, quantity, and date must be consistent with the ethics review application, and missing signature items must be marked separately | Check the number of candidate entries and the `similarity` score, record the array length, then check whether the tokens of the cited text fully retain the risk level passage |

## Three common errors

- Phenomenon: the same number of subjects does not match between the ethics review application and the risk assessment form. Cause: the two materials were revised separately, the quantity field was not updated in sync, and different version snippets were recalled for each during retrieval.
- Phenomenon: the informed consent form template version was not synchronized, and the old signing requirements were still recalled. Cause: historical versions in the knowledge base were not removed, and semantic recall ranked old-version snippets first.
- Phenomenon: the ethics review application is missing a signature or receipt page, but the candidate snippet is still treated as the basis. Cause: missing pages in the scanned copy were not filtered, the similarity score was high, but key fields in the original text were missing.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare the number of candidate entries and the `similarity` score, then toggle rerank on and off to see whether the ranking of the top few results changes, and record `limit` and the array length.

Business test: ask a cross-material basis question, see whether the answer provides a traceable source, and check whether the source can be matched to the original passage.

- In the search test, switch `searchMode`, record the number of candidate entries and scores for semantic, full-text, and hybrid modes respectively, and check whether both types of recall results are included.
- Run once with `usingReRank` enabled and once disabled, compare the ranking of the top few results, then check the cited text tokens and the array length to confirm that key passages have not been trimmed.
