---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Evidence
meta_description: National R&D Grants: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Find Supporting Evidence

## What this category's data looks like

The category materials for National Key R&D Program project applications include the project application form, the budget application form, and the cooperation agreement. The project application form provides the research objectives, task breakdown, assessment indicators, and schedule; the budget application form provides the funding categories, calculation basis, and the ratio of self-funding to allocation; the cooperation agreement provides the division of labor among participating units, intellectual property ownership, signatures, and receipts. The versions of the three types of materials are updated on a rolling basis with the application stages, and the fields are characterized by name, quantity, date, amount, and signature. After entering the knowledge base retrieval and recall function, the project application form serves as the basis for tasks and indicators, the budget application form serves as the basis for funding and categories, and the cooperation agreement serves as the basis for division of labor and signatures/seals; the same record needs to be cross-checked among the three materials to form basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, re-rank, filter, and upper-limit trimming). The basis entries that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The task name, assessment indicators, and start/end dates are consistent with the corresponding fields in the budget application form and cooperation agreement, and signatures and receipts are complete | In the search test, search by task name, check the candidate snippets and scores, record the number of array entries and the quoted text tokens, and confirm that the same record is hit |
| Budget application form | The funding categories, quantities, and amounts are consistent with the corresponding records in the project application form and cooperation agreement, and the version is current | Switch `searchMode` to semantic, full-text, and hybrid once each, compare whether the candidates contain both types of results at the same time, and check the dates and signatures |
| Cooperation agreement | The names of participating units, division of labor, and intellectual property clauses match the project application form and budget application form, with no missing signatures or receipts | Compare the ranking of the first few entries before and after enabling `usingReRank`, and after filtering by `similarity`, check whether the key paragraphs are retained by the upper-limit trimming of quotes |
| Knowledge base retrieval service | The candidate snippets come from this category's materials and can still be traced back to the original text after pattern, merge, re-rank, filter, and upper-limit trimming | Adjust `limit` to observe changes in the number of candidate entries, record the array length and the `quoteMaxToken` budget separately, and do not compare the two as equal |

## Three common errors

- Phenomenon: the same task name is written differently in the project application form and the budget application form, and the retrieval candidates do not match. Cause: the versions of the two materials are not synchronized, and the fields are not unified.
- Phenomenon: the number of participating units in the cooperation agreement is inconsistent with the project application form, and the cited entries lack signatures or receipts. Cause: the materials are updated at different paces, and the signature/seal pages have not been returned.
- Phenomenon: changing the wording of the question makes it impossible to recall the key paragraphs, and although there are many candidates, the first few are irrelevant. Cause: the retrieval mode does not match the material form, and re-ranking is not enabled.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten questions, compare the candidates and scores, then toggle re-ranking on and off to observe the ranking of the first few entries; check `searchMode`, `similarity`, `limit`, and `usingReRank`, and record the number of array entries and the quoted text tokens.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check whether the source can be located in the original text in the project application form, budget application form, and cooperation agreement.

- In the search test, switch among the three modes semantic, full-text, and hybrid, compare the candidate snippets and similarity scores, and confirm that the candidates come from different recall channels and have been merged.
- Compare the order of the first few entries before and after enabling re-ranking; after filtering by similarity and upper-limit trimming of quotes, record the number of array entries and the quoted text tokens separately, and trace back to the original text to check names, quantities, dates, and signatures.
