---
title: Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c061-f015
page_type: 行业问题页
application_area: education
meta_title: Research IP | Retrieval | Review
meta_description: Research IP: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results

## What this category's data looks like

This category involves three core types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, contributors, date, and responsible person's signature; patent disclosure documents carry the technical solution, inventors, filing milestones, and receipts; software copyright materials include the version number, development completion date, and signature/seal page. The three types of materials update at different cadences: achievement registration forms update with acceptance milestones, patent disclosure documents are finalized before filing, and software copyright materials are refreshed with version iterations. When the materials enter the knowledge base retrieval and recall function, each is split, vectorized, and indexed as an independent document; at retrieval time, candidates are recalled through dual semantic and full-text channels, providing original fragment evidence for exception tracing.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "exception list and review conclusions" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, date, and signature are consistent with the patent disclosure document and software copyright materials | Use synonymous questions in the search test to retrieve, view candidate fragments and scores, and check the result differences after switching `searchMode` |
| Patent disclosure document | Whether the inventors, filing milestones, and receipts align with the registration form and software copyright materials | Enable `usingReRank` to compare the top rankings, and check whether candidates contain both semantic and full-text results |
| Software copyright materials | Whether the version number, development completion date, and signature/seal page are synchronized with the other two materials | Adjust `similarity` and `limit` to observe changes in the number of candidates, and confirm that key field fragments are still retained after trimming |
| Knowledge base retrieval service | Whether candidate fragments and scores cover the fields, dates, and signatures of the three types of materials | Record the number of candidates and scores, separately check the tokens of the referenced text, and do not compare array length with budget for equality |

## Three common errors

- Symptom: The name or date of the same achievement does not match between two materials. Cause: The registration form and disclosure document are maintained separately, their update cadences are not synchronized, and cross-material field comparison is not performed during retrieval and recall.
- Symptom: The patent disclosure document version is not synchronized, and the software copyright materials still reference the old version. Cause: The index is not refreshed after version iteration, retrieval candidates still hit historical fragments, and version markers are missing.
- Symptom: Review conclusions lack signatures or receipts. Cause: The exception list is generated directly from retrieval candidates without tracing back to the original records, and the reviewer does not sign to confirm the conclusion.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the top rankings.

Business test: create one exception record and see whether it can be traced back to the source material.

- In the search test, switch `searchMode`, record the number of candidates and scores under semantic, full-text, and hybrid modes respectively, and check whether the key fields of the three types of materials are covered.
- Compare the top rankings before and after enabling `usingReRank`, adjust `similarity` and `limit` to observe candidate changes, and confirm that the referenced text still retains date and signature fragments after trimming.
