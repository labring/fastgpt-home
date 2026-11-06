---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Intake
meta_description: Research Misconduct: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information

## What this category's data looks like

Academic misconduct report investigation and handling uses report materials, investigation reports, and expert appraisal opinions as the core sources, updated according to the pace of acceptance, follow-up questioning, and referral. Report materials provide the reported person, matter, time, and evidence list; investigation reports give the investigation process, findings, and handling recommendations; expert appraisal opinions supplement professional judgment and signatures. Field characteristics center on names, quantities, dates, versions, signatures, and receipts. When materials enter knowledge base retrieval and recall, each serves as a candidate snippet source to support acceptance records and the items to be completed; missing-item identification and follow-up questioning depend on whether these snippets can be recalled and retain key passages.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming); acceptance records and the items to be completed must be handled by subsequent nodes or manually. One retrieval consists of question optimization, semantic or full-text or hybrid recall, multi-channel merging, rerank secondary sorting, similarity filtering, and citation upper-limit trimming, and only then is the cited content handed to the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the name, quantity, date, signature, and receipt are consistent with the investigation report | In the search test, test once each with synonymous questions, record the number of candidates and scores, and check whether the returned snippets contain the reported matter, evidence list, and receipt fields |
| Investigation report | Whether the name, quantity, and date of the same record match the expert appraisal opinion, and whether the version is synchronized | Switch `searchMode` to compare semantic, full-text, and hybrid candidates, enable `usingReRank` to see the ranking of the top few, and check whether the conclusion paragraph and date fields are complete |
| Expert appraisal opinion | Whether the signature, date, and receipt are complete, and whether the professional judgment is recalled | Adjust `similarity` and `limit` to observe the key original snippets retained after filtering, and check whether the appraiser's signature and opinion date appear in the cited text |
| Acceptance records and the items to be completed | Whether missing items are identified and followed up, and whether the answer has material support | Ask a question missing key information, first see whether it follows up on the missing fields, then check whether the cited content comes from the above material snippets |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: multi-version materials are not synchronized, and retrieval hits snippets from different versions.
- Phenomenon: The expert appraisal opinion lacks a signature or receipt, but the acceptance record still shows the materials are complete. Cause: field verification only checks text presence and does not verify signature and receipt status.
- Phenomenon: There are many candidates but the top-ranked ones are irrelevant, and the answer lacks key passages. Cause: the recall channel does not match the material form, and rerank and filtering do not effectively trim.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few; record the number of candidates and scores, and check the return differences under `similarity`, `limit`, `usingReRank`, and `searchMode`.

Business test: ask a question missing key information and see whether it first follows up before answering; after the follow-up completes the fields, check whether the answer cites original snippets from the report materials, investigation report, or expert appraisal opinion.

- In the search test, switch `searchMode` for the same question, record the number of candidates and scores for semantic, full-text, and hybrid, and check whether the returned snippets cover the name, quantity, date, and signature fields.
- Compare the ranking of the top few before and after enabling `usingReRank`, adjust `similarity` and `limit` to observe the tokens and array length of the cited text, record them separately, and do not compare the two as equal.
