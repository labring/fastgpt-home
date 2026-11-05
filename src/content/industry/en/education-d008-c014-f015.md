---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Access
meta_description: Pastoral Education: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on three types of materials in the school moral education and homeroom teacher work scenario: thematic class meeting plans, student comprehensive quality records, and home visit records. The sources are the school moral education office, grade groups, and homeroom teachers' daily reporting. The update rhythm advances on a rolling basis with semester milestones, monthly evaluations, and home visit receipts. When the materials enter the knowledge base retrieval and recall function, each plays a different role: thematic class meeting plans participate in semantic and full-text recall as reusable activity design fragments; student comprehensive quality records participate in hybrid retrieval as process-based evaluation fragments; home visit records participate in similarity filtering and reranking as home-school communication fragments. All three types of materials contain fields, dates, and signature receipt characteristics, and their visible scope must remain consistent in authorized access and external services.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). The externally available entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Whether the fields, dates, and signatures are consistent with the grade group filing; whether the name, quantity, and date of the same plan match across two materials | In the search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate fragments and scores, and verify the plan name and date |
| Student comprehensive quality record | Whether the version is synchronized; if signatures or receipts are missing, it must not enter the externally visible scope | After filtering with `similarity`, view the number of candidates and scores, and verify the record version and signature receipt status |
| Home visit record | Whether the name, quantity, and date of the same record match across two materials; whether receipts are complete | Compare the ranking of the top few items before and after enabling `usingReRank`, and verify the home visit date and receipt fields |
| External entry point and authorization scope | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, record the number of candidates and scores, and verify whether the visible scope matches the setting |

## Three common errors

- Phenomenon: The date of the same home visit record does not match between the comprehensive quality record and the home visit ledger. Cause: The two materials are reported separately, versions are not synchronized, and retrieval recall returns them as different fragments.
- Phenomenon: The name and quantity of the thematic class meeting plan are inconsistent between the grade group filing and the homeroom teacher's material. Cause: The same plan was modified multiple times without unified naming, and old fragments remain after candidate merging.
- Phenomenon: The student comprehensive quality record lacks a signature or receipt. Cause: The reporting process is not closed-loop, and the material still appears as a candidate fragment after entering retrieval, without verification of the authorized visible scope.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank to observe the ranking of the top few items; record the number of candidates and scores, and when a citation upper limit is involved, verify the tokens of the cited text, recording the number of array items separately.

Business test: access once with a restricted identity and check whether the visible scope matches the setting.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, compare candidate fragments and scores, and verify material names, dates, and signature fields.
- Compare the ranking of the top few items before and after enabling `usingReRank`, and after filtering with `similarity`, record the number of candidates and scores, and verify that unauthorized access is invisible.
