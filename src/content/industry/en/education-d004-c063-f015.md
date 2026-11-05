---
title: Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c063-f015
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Retrieval | Handover
meta_description: Research Misconduct: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of drafting materials and handing over responsibility in the investigation and handling of academic misconduct reports, involving three types of documents: report materials, investigation reports, and expert appraisal opinions. Report materials are usually submitted by the reporter or the accepting department, with fields including the reported person, the matter, the time, the evidence list, and the receipt; investigation reports are drafted by the investigation team, with fields including the investigation process, the established facts, the handling recommendations, the signature, and the date; expert appraisal opinions are issued by the expert group, with fields including the appraisal matter, the basis, the conclusion, and the expert signature. When these materials enter the knowledge base retrieval and recall function, each serves as a source of candidate snippets, used to compare whether the name, quantity, and date of the same record are consistent across different documents, whether the versions are in sync, and whether the signatures or receipts are complete. The update rhythm advances with the investigation stages; each stage of report acceptance, investigation and evidence collection, expert appraisal, and handling decision may produce new versions, requiring item-by-item verification of field completeness according to the template, to ensure that the responsible persons for the signable draft and the handover record are clear and that the versions and dates are consistent.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The signable material draft and handover record are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields are complete, the responsible person is clear, and the version and date are consistent; verify the reported person, the matter, the time, the evidence list, and the receipt fields | In the search test, switch `searchMode` to compare semantic, full-text, or hybrid recall candidates, and check whether the report material fields are consistent with the corresponding records in the investigation report |
| Investigation report | The investigation process, established facts, handling recommendations, signature, and date are complete; the name, quantity, and date of the same record match the report materials | Compare the ranking of the top few items before and after enabling `usingReRank`, and verify the version numbers and signature receipts of the investigation report and the expert appraisal opinions |
| Expert appraisal opinion | The appraisal matter, basis, conclusion, and expert signature are complete; the date is consistent with the timeline of the handling recommendations in the investigation report | Check the number of returned candidates and the `similarity` score, and verify whether the record name and quantity in the appraisal opinion are consistent with the investigation report |
| Handover record | The responsible person, version, date, and receipt fields are complete; after the next stage signs for receipt, the receipt is complete | Draft one according to the template and complete one handover to see whether missing items are blocked; record the number of candidates and the tokens of the quoted text, and use `limit` to control the upper limit of the number of quoted items |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the report materials and the investigation report. Cause: During material drafting, the fields were not verified item by item according to the template, and the retrieval candidates did not cover the corresponding version.
- Symptom: The versions of the investigation report and the expert appraisal opinion are not in sync, and the dates are inconsistent. Cause: The update rhythm was not unified, and candidates were not filtered by the latest version during retrieval.
- Symptom: The handover record lacks a signature or receipt, and the responsible person column is empty. Cause: After material drafting, the sign-off process was not followed, and retrieval recall did not hit the signature field template.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` on and off to see the ranking of the top few items; switch `searchMode` to observe recall differences.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked.

- In the search test, switch `searchMode` to compare semantic, full-text, and hybrid recall candidates, and record the number of candidates and the `similarity` score.
- Compare the ranking of the top few items before and after enabling `usingReRank`, verify the tokens of the quoted text and the number of array items, and use `limit` to control the upper limit of the number of quoted items.
