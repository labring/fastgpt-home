---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Access
meta_description: Undergraduate Programs: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Manage Authorized Access and External Services

## What this category's data looks like

Undergraduate program setup and dynamic adjustment involves materials such as program setup application forms, talent cultivation plans, and expert demonstration opinions. The sources are submissions from academic affairs offices and schools, updated by academic year or application batch. The program setup application form contains the program name, code, degree-granting category, length of study, and signature fields; the talent cultivation plan contains the course structure, credits and class hours, and the signature of the writer; the expert demonstration opinions contain the demonstration date, list of experts, and signatures. When these three types of materials enter the knowledge base retrieval and recall function, they are segmented and indexed as application basis, cultivation basis, and demonstration basis respectively, so that candidate fragments can be retrieved according to identity and visibility scope during authorized access and external services.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). "Externally available entry points and authorization scope" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | The name, code, date, and signature must correspond consistently with the talent cultivation plan and expert demonstration opinions | In the search test, search by program name, check the fields and dates of the candidates returned under `searchMode`, and see whether the signature fields are complete |
| Talent cultivation plan | The number of courses, credits and class hours, and version date must be synchronized with the application form and demonstration opinions | Switch `searchMode` to semantic, full-text, or hybrid, and compare whether the name and quantity of the same record in the two materials match |
| Expert demonstration opinions | The demonstration date, list of experts, and signature receipt must be consistent with the application batch | Compare the order of the first few candidates before and after enabling `usingReRank`, and check whether the date and signature of the demonstration opinions are missing |
| Authorized visibility scope | The visitor's identity matches the visibility scope, and unauthorized content is not visible | Access once with a restricted identity, record the number of returned candidates and scores, and check whether unauthorized content is filtered under `similarity` and `limit` |

## Three common errors

- Phenomenon: The name, quantity, or date of the same program does not match across the two materials. Cause: Application and cultivation materials are maintained separately, and no field-level verification was performed.
- Phenomenon: The talent cultivation plan has been revised, but retrieval still returns the old version of courses and credits. Cause: The version was not synchronized, and the index was not updated with the materials.
- Phenomenon: Expert demonstration opinions lack signatures or receipts but are still recalled as candidates. Cause: Material completeness was not checked, and retrieval returns fragments only by similarity.

## How to verify the setup

Acceptance of this function: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the first few items; check the number of candidates and scores returned under `searchMode`, `similarity`, `usingReRank`, and `limit`.

Business test: Access once with a restricted identity and see whether the visibility scope matches the setting; unauthorized content should not be visible, and record the number of returned candidates and scores.

- Search by program name and application batch, and verify item by item the name, quantity, date, and signature of the application form, cultivation plan, and demonstration opinions.
- In the search test, switch retrieval modes and toggle rerank on and off, record the number of candidates and scores, and check that the tokens and array length of the cited text are recorded separately.
