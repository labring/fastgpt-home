---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Find Supporting Evidence
slug: /en/industry/education-d001-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Evidence
meta_description: Graduation Eligibility: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Find Supporting Evidence

## What this category's data looks like

This page covers student-status changes and graduation-eligibility review, spanning three types of materials: leave-and-return applications, major-transfer applications, and graduation-review checklists. Leave-and-return applications contain change type, start and end dates, signature, and receipt fields; major-transfer applications contain the names of the transfer-in and transfer-out majors, application date, and approval signature; graduation-review checklists contain course names, credit counts, review date, and seal. Materials are updated by semester batch, and the names, quantities, and dates of the same record may not match across different materials; unsynchronized versions or missing signature items are also common. When materials enter knowledge base retrieval, they participate as candidate sources in semantic, full-text, or hybrid recall, and after merging, re-ranking, filtering, and citation-limit trimming, candidate snippets and similarity scores are returned for subsequent nodes or manual verification against the original text and generation of traceable basis entries.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merging, re-ranking, filtering, and limit trimming). The traceable basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-and-return application | The change type, start and end dates, signature, and receipt fields are complete, and they match the major-transfer application and graduation-review checklist | In the knowledge base search test, retrieve with synonymous questions, switch `searchMode` and record the number of candidates and scores, and check whether the returned snippets contain the change type and dates |
| Major-transfer application | The names of the transfer-in and transfer-out majors, application date, and approval signature are consistent with the records in the graduation-review checklist | Compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the returned candidates include both semantic and full-text results |
| Graduation-review checklist | The course names, credit counts, review date, and seal can be traced back to the original text, and the version is current | Adjust `similarity` and `limit`, record the number of citations and the tokens of the cited text, and check whether key passages have been trimmed out |
| Retrieval return content | The candidate snippets and similarity scores can be traced back to the original text, and cover the key fields of the three types of materials | Test once each with synonymous questions, compare candidates and scores, and when the sources do not match, first check hits and associations |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the leave-and-return application and the graduation-review checklist. Cause: Materials are updated by semester batch, old versions are not synchronized and replaced, and retrieval still recalls old snippets.
- Symptom: The approval signature or receipt of the major-transfer application is missing, yet candidate snippets are still cited. Cause: Signature fields are not validated when materials are ingested, and retrieval returns candidates only by text similarity.
- Symptom: The same question phrased differently cannot be recalled, or there are many candidates but the ones ranked first are all irrelevant. Cause: The retrieval mode does not match the material form, re-ranking is not enabled, or similarity filtering is too broad.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare the number of candidates and scores, then toggle `usingReRank` to see whether the ranking of the top few results changes, and record the number of citations under `similarity` and `limit`.

Business test: ask a cross-material basis question, see whether the answer gives traceable sources, and check whether the fields, dates, and signatures of the leave-and-return application, major-transfer application, and graduation-review checklist match.

- In the knowledge base search test, switch `searchMode`, compare the number of candidates and scores under the semantic, full-text, and hybrid modes, and confirm that it matches the material form.
- Compare the ranking of the top few results before and after enabling `usingReRank`, and adjust `similarity` and `limit`, separately record the number of citations and the tokens of the cited text, and check the completeness of key passages.
