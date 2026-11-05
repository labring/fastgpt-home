---
title: Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c048-f015
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Retrieval | Versions
meta_description: Joint Education: review retrieval for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Sino-Foreign Education Establishment and Annual Reports: Maintain Document Versions and Changes

## What this category's data looks like

The establishment and annual reports of Sino-Foreign cooperative education institutions involve three types of materials: the establishment application, the cooperation agreement, and the articles of association. Fields include institution name, education level, enrollment scale, signing date, and signature receipt. The establishment application carries approval elements, the cooperation agreement constrains the rights and responsibilities of both parties, and the articles of association stipulate the governance structure. Materials are updated according to the annual declaration and change rhythm, and the name, quantity, and date of the same record in the three materials must be aligned word for word. When entering knowledge base retrieval, the three types of materials are each recalled as independent sources, and candidate snippets retain key passages from the original text for comparing field consistency. The version ledger and change records are organized by subsequent nodes or manually based on the candidates.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The version ledger and change records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Fields, dates, and signatures must be aligned item by item with the cooperation agreement and articles of association | In the search test, switch `searchMode` between semantic, full-text, or hybrid, and check the institution name and signing date in the candidate snippets |
| Cooperation agreement | The name, quantity, and date of the same record are consistent across the three materials | Compare the order of the top few results before and after enabling `usingReRank`, and check whether the cooperation agreement candidates contain the original text of quantity and date |
| Articles of association | Signatures or receipts are complete, and old versions are traceable | Adjust `similarity` to observe the number of candidate items and scores, and confirm that the articles of association candidates retain the signature and receipt passages |
| Version ledger and change records | The current version is unique, and references are synchronized | After trimming by `limit`, record the number of items in the reference array, and also check the token budget of the reference text |

## Three common errors

- Phenomenon: The same institution name is written differently in the establishment application and cooperation agreement candidates. Cause: The two materials were not updated synchronously, and old version snippets are still being recalled.
- Phenomenon: The enrollment quantity or signing date does not match between the two materials. Cause: The change was made in only one place, and the reference in the other place was not synchronized.
- Phenomenon: The articles of association candidates lack signature or receipt passages. Cause: The scanned copy did not include that page, so the recalled snippets are incomplete.

## How to verify the setup

In the search test, retrieve once with each synonymous question, record the number of candidate items and scores, and switch `searchMode` and `usingReRank` to compare the ranking.

Check the number of items in the reference array and the tokens of the reference text to confirm that old version snippets are traceable and the current version is unique.

- Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results.
- Business test: change one piece of content and see whether the version number and references are updated synchronously.
