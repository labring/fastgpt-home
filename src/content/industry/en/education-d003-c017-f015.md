---
title: Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c017-f015
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Retrieval | Intake
meta_description: Undergraduate Programs: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers three types of materials: program setup application forms, talent development plans, and expert review opinions. The application form contains fields such as program name, code, length of study, degree-granting category, enrollment scale, faculty and conditions, with complete date and signature fields. The talent development plan contains training objectives, curriculum system, credits and class hours, practical components, and graduation requirements; the version number and revision date must be consistent. The expert review opinions contain the review conclusion, expert list, professional titles and affiliations, signatures, and dates. Materials are updated according to the annual application and adjustment cycle; the name, quantity, and date of the same program across different materials must be aligned item by item. When entering knowledge base retrieval, the application form provides the setup basis fields, the development plan provides the curriculum and credit basis, and the review opinions provide the procedural compliance basis; together, the three constitute the source of candidate segments for intake and follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). "Intake records and items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Fields, dates, and signatures must be aligned item by item with the talent development plan and expert review opinions | Check the program name, code, length of study, enrollment scale, and signature date; in the search test, switch `searchMode` to compare candidate segments and `similarity` scores |
| Talent development plan | The curriculum system, credits and class hours, and version number must be consistent with the application form and review opinions | Check the course names, total credits, revision date, and version number; compare the ranking of the top candidate results before and after enabling `usingReRank` |
| Expert review opinions | The review conclusion, expert list, signatures, and dates must be complete and consistent with the application form | Check the number of experts, professional titles and affiliations, signatures, and receipts; record the number of candidate items and scores, verify quoted text tokens separately, and do not compare `limit` with the number of quoted items for equality |

## Three common errors

- Symptom: the name and credit quantity of the same program do not match between the application form and the development plan. Cause: the two materials were revised at different times, and field-level alignment verification was not performed.
- Symptom: the expert review opinions lack signatures or receipts, but the intake record still shows the materials are complete. Cause: the signature fields and receipts were not included in field verification, and missing-item identification was skipped.
- Symptom: the development plan version was not synchronized, and old-version courses were mixed with the new-version application form. Cause: version numbers and revision dates were not compared one by one, and retrieval hit old-version segments.

## How to verify the setup

Feature acceptance: test once each with synonym-rewritten questions, compare candidate segments and `similarity` scores, then toggle `usingReRank` to observe changes in the ranking of the top results, and check the number of candidate items and scores under `searchMode` and `limit`.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering; the follow-up items must cover missing fields, dates, and signatures in the application form, development plan, and review opinions.

- In the knowledge base search test, switch `searchMode`, record candidate segments, `similarity` scores, and the number of candidate items, and check whether both semantic and full-text results are included.
- Compare the program name, quantity, date, signature, and receipt in the application form, development plan, and review opinions one by one, write missing items into the completion questions, and forward them to the handler.
