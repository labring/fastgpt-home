---
title: Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Find Supporting Evidence
slug: /en/industry/education-d001-c061-f015
page_type: 行业问题页
application_area: education
meta_title: Research IP | Retrieval | Evidence
meta_description: Research IP: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Find Supporting Evidence

## What this category's data looks like

This category's data includes three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, contributors, registration date, and signature field; patent disclosure documents contain the technical solution, inventor, filing date, and review signature; software copyright materials include the software name, version number, development completion date, and stamped receipt. The three types of materials come from the research management department and the intellectual property office, are updated by batch, and the current archived version prevails. When the materials enter the knowledge base retrieval and recall function, the achievement registration form serves as the source of the achievement's basic fields, the patent disclosure document serves as the basis for patent information, and the software copyright materials serve as the basis for copyright information, each providing candidate snippets for retrieval and recall.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The basis items that can be traced back to the original text are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the fields, dates, and signatures are consistent with the current archive | In the search test, switch `searchMode` to hybrid, and check whether the candidate snippets cover the achievement name, registration date, and signature field |
| Patent disclosure document | Whether the name, quantity, and dates match the achievement registration form | Enable `usingReRank` to compare the ranking of the top few results, and check whether the patent name and filing date in the candidate snippets can be traced back to the original text |
| Software copyright materials | Whether the version is synchronized, and whether signatures or receipts are missing | Adjust `similarity` to observe changes in the number of candidate items and scores, and check whether the copyright name, version number, and receipt appear in the quoted text |

## Three common errors

- Symptom: The name or quantity of the same achievement does not match across two materials. Cause: The registration form and the disclosure document are entered separately, and no cross-material field comparison was performed.
- Symptom: The version number of the software copyright materials is inconsistent with the registration form. Cause: The version was not synchronized, and the old version of the materials still remains in the knowledge base and participates in recall.
- Symptom: The patent disclosure document lacks a review signature or the copyright materials lack a receipt. Cause: When the materials were archived, the signature field and receipt page were not checked, and retrieval still returns that snippet.

## How to verify the setup

Acceptance of this function: test once each with synonymous rewritten questions, compare the number of candidate items and scores, then toggle rerank on and off to see the ranking of the top few results; switch `searchMode` to observe changes in recall channels, and adjust `similarity` and `usingReRank` to record candidate differences.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check the number of quoted items and the quoted text tokens separately, recording them separately, and do not compare the array length with `quoteMaxToken` for equality.

- In the search test, retrieve the same basis question once with different phrasings, record the number of candidate items and scores, and confirm that it can be traced back to the original text of the achievement registration form or patent disclosure document.
- Check the version number and receipt of the software copyright materials, confirm that the current version is consistent with the registration form, and check whether the quoted text retains the key snippets.
