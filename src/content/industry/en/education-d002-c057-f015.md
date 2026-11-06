---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Checks
meta_description: National R&D Grants: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Compare Documents and Locate Differences

## What this category's data looks like

National Key R&D Program project application materials usually include three types: the project application form, the budget application form, and the cooperation agreement. Their sources are exports from the application system, internal unit ledgers, and sealed scanned copies. Their update cadence rolls forward as the application window progresses. Common fields include project name, project number, undertaking unit, principal investigator, budget subject, amount, start and end dates, signature, and receipt. The project application form is the source of the fields for the technical route and assessment indicators; the budget application form is the source of the funding and subject definitions; the cooperation agreement is the source of each party's rights and responsibilities and signing information. When the three types of materials enter knowledge base retrieval, they each serve as independent fragment sets, for subsequent nodes to compare field by field against the same record, locating discrepancies in names, quantities, dates, and signature receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit truncation). The discrepancy list is then completed by subsequent nodes or manually. Retrieval is only responsible for recalling and ranking the relevant fragments of the same record across two materials; it does not produce statistical tables or authorization results.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the project name, project number, principal investigator, start and end dates, and signature are consistent with the budget application form and the cooperation agreement | In the search test, use the project name as the query, switch `searchMode` to compare semantic, full-text, and hybrid candidates, and record the number of candidates and the scores |
| Budget application form | Whether the budget subject, quantity, amount, and date match the project application form and the cooperation agreement, and whether the versions are in sync | Use the subject name and amount as the query, turn `usingReRank` on and off to compare the ranking of the top few results, and check the completeness of the returned reference text |
| Cooperation agreement | Whether the names of all parties, signing date, signature, and receipt are complete, and whether they match the same record in the other two materials | Use the partner name as the query, observe the candidates after `similarity` filtering, record the number of items in the reference array separately, and check whether the reference text tokens retain the key signing information |
| Knowledge base retrieval service (retrieval node and search test) | Whether the candidates and scores for the same record are stable under synonymous questions, and whether the ranking changes before and after reranking | Test once each with synonymous paraphrased questions, compare the candidates and scores; then adjust `limit` to observe changes in the number of items in the array and the text tokens after reference limit truncation |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: The two materials are filled in by different nodes, the field definitions are not unified, and after retrieval and recall no field-by-field comparison is performed.
- Symptom: The cooperation agreement lacks a signature or receipt, while the other two materials have already been sealed. Cause: The versions are not in sync, the signed copy was not returned, and retrieval only hits fragments from the old version.
- Symptom: There are many candidates but the ones ranked at the top are all irrelevant, and the answer lacks key paragraphs. Cause: The query does not match the material form, reranking is not enabled, or similarity filtering and reference limit truncation are inappropriate.

## How to verify the setup

Acceptance of this feature: test once each with synonymous paraphrased questions, compare the candidates and similarity scores, then turn reranking on and off to see whether the ranking of the top few results changes, and record the number of items in the reference array and the reference text tokens.

Business test: use one real record to find fields that are inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- In the search test, switch `searchMode` according to the material form, compare the three types of candidates—semantic, full-text, and hybrid—and record the number of candidates and the scores.
- For the same record, use the project name, subject, and partner name as queries respectively, turn `usingReRank` on and off, and observe the ranking of the top few results and the completeness of the reference text after `similarity` filtering.
