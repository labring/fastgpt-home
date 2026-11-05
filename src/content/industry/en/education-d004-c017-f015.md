---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Handover
meta_description: Undergraduate Programs: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page centers on undergraduate program setup and dynamic adjustment. Materials include program setup application forms, talent cultivation plans, expert review opinions, and handover records. The program setup application form comes from college applications and is updated with the application window; its fields include program name, code, degree-granting category, program duration, responsible person, date, and signature. The talent cultivation plan comes from the teaching and research office and is adjusted with the cultivation cycle; its fields include the curriculum system, credits and class hours, practical components, and version number. Expert review opinions come from the review panel and are updated with the review meeting; their fields include review conclusions, expert list, date, and signature. When the materials enter knowledge base retrieval and recall, each serves as a candidate segment source and is recalled at field granularity, for subsequent nodes or humans to generate signable material drafts and handover records.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after mode, merge, rerank, filter, and limit trimming). Signable material drafts and handover records are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Fields, date, and signature are complete; the name, quantity, and date match the same record in the talent cultivation plan | In the search test, use synonymous questions to retrieve the program name, check candidate segments and scores, and switch `searchMode` to compare semantic, full-text, and hybrid results |
| Talent cultivation plan | Version number and date are synchronized; course credits match the corresponding record in the application form; no missing signature or receipt | Compare the top few rankings before and after enabling `usingReRank`, record the number of candidates and `similarity` scores, and check the cited text tokens and array length |
| Expert review opinions | Review conclusions, expert list, date, and signature are complete, and match the same record in the application form and cultivation plan | Test once each with synonymous questions, see whether candidates contain both semantic and full-text results, and after trimming by `limit`, check the number of cited items and content completeness |
| Handover record | Responsible person is clear; version and date are consistent; receipt and signature are complete | Draft one according to the template and complete one handover, check whether missing fields are blocked, and record the number of candidates and scores |

## Three common errors

- Symptom: the same program name is written differently in the application form and the talent cultivation plan. Cause: the two materials are maintained separately, and names and codes are not aligned to the same record.
- Symptom: the number of course credits does not match between the two materials. Cause: versions are not synchronized, and after the talent cultivation plan is updated, the corresponding fields in the application form are not written back.
- Symptom: expert review opinions lack a signature or the handover receipt. Cause: during material circulation, fields and dates are not verified according to the template, and the responsible person has not confirmed.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidate segments and `similarity` scores, then toggle `usingReRank` to observe changes in the top few rankings, and record the number of candidates and cited text tokens.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the search test, switch `searchMode` to compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Compare the top few rankings before and after enabling `usingReRank`, and after trimming by `limit`, check the number of cited items and content completeness.
