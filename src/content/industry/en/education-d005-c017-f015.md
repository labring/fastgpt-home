---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Versions
meta_description: Undergraduate Programs: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Maintain Document Versions and Changes

## What this category's data looks like

Undergraduate program setup and dynamic adjustment involves three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The sources are the academic affairs office, schools, and the expert review process, and the update cadence changes with application batches, cultivation plan revisions, and review conclusions. The program setup application form contains the program name, code, program length, degree-granting category, application date, and responsible person's signature; the talent cultivation plan contains course modules, credits and class hours, practical components, and revision date; the expert review opinions contain the review conclusion, expert list, signatures, and receipt. When these three types of materials enter knowledge base retrieval, each is recalled as an independent chunk: application form chunks are used to verify basic program information, cultivation plan chunks are used to verify course and credit fields, and review opinion chunks are used to verify the conclusion and signature status. For the same program record, the name, quantities, and dates in the application form and cultivation plan must be compared field by field. When versions are not synchronized or signatures are missing, retrieval candidates will still return old-version chunks, and the current version must be determined in conjunction with the version ledger.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "version ledger and change records" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Fields, dates, and signatures must be consistent with the talent cultivation plan and expert review opinions; the name, code, program length, and degree category must not mismatch in two places | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and verify the program name, code, and application date in the candidate chunks; use `similarity` to observe score changes for the same record under different query phrasings |
| Talent cultivation plan | Course modules, credits and class hours, practical components, and revision date must be synchronized with the application form version; old-version chunks must not be mixed with the current version | Compare the order of the top few candidates before and after enabling `usingReRank`, and confirm that chunks with the current revision date rank before old versions; record the number of candidates and scores, and do not compare array length with the citation budget as equal |
| Expert review opinions | The review conclusion, expert list, signatures, and receipt must be complete; if signatures or receipt are missing, it must not be used as the current basis | In the search test, retrieve the review conclusion and signature fields, and verify whether the returned chunks contain signature and receipt information; use `limit` to adjust the candidate cap and observe whether key chunks are trimmed out |

## Three common errors

- Symptom: the name or credit quantity of the same program does not match between the application form and the cultivation plan. Cause: the two materials are maintained separately, versions are not synchronized, and old chunks are recalled separately during retrieval.
- Symptom: expert review opinions lack signatures or receipt but are still cited as the current basis. Cause: the material update cadence and review receipt are not synchronized, and retrieval candidates do not distinguish signature status.
- Symptom: the same question cannot be recalled when rephrased, or there are many candidates but the ones ranked first are all irrelevant. Cause: the retrieval mode does not match the material form, rerank is not enabled, or similarity filtering settings are inappropriate.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle rerank on and off to inspect the ordering of the top few results; record the number of candidates and scores, and when citation limits are involved, verify the citation text tokens, recording the array count separately.

Business test: change one piece of content and see whether the version number and citations update in sync; if citations still point to the old version, first verify the hit chunks and associated records, then update the knowledge base or external documents.

- In the knowledge base search test, retrieve the program setup application form, talent cultivation plan, and expert review opinions separately using synonym questions, record the number of candidates and similarity scores, and verify the name, quantities, dates, and signature fields.
- Compare the order of the top few candidates before and after enabling rerank, and check whether current-version chunks rank before old versions; if key passages are missing after citation limit trimming, adjust the candidate cap and re-verify the citation text.
