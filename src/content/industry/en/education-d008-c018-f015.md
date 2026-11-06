---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Access
meta_description: Program Revision: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Manage Authorized Access and External Services

## What this category's data looks like

This category's data involves three types of materials: program plans, course syllabi, and credit structure tables. Fields include course name, credit count, start date, and signed receipt. Materials are mostly exported from the academic affairs system or submitted by departments. Versions are updated frequently during the revision cycle, and the name, quantity, and date of the same record often appear inconsistent across different materials. The program plan is the master outline, the course syllabus is the course-level basis, and the credit structure table is the quantitative summary. When entering knowledge base retrieval, the three types of materials serve as independent fragment sources. The retrieval service is only responsible for recalling candidate fragments and similarity scores; it does not judge consistency between materials, nor does it generate authorization results. The external service entry point and authorization scope are completed by subsequent nodes or manually based on retrieval results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The externally available entry point and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether course name, credit count, start date, and signed receipt are consistent across versions | In the search test, retrieve once each using different expressions of the same record, compare candidate fragments and similarity scores, and check the difference in results after switching `searchMode` |
| Course syllabus | Whether course name and credit count match the corresponding record in the program plan, and whether dates and signatures are complete | Access once with a restricted identity, check whether the returned candidates include course syllabus fragments, and record the number of candidates and scores |
| Credit structure table | Whether credit count and dates match the program plan and course syllabus, and whether versions are synchronized | Compare the ranking of the top few entries before and after enabling `usingReRank`, check the tokens of the quoted text after `similarity` filtering, and record the array count separately |
| External service entry point | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, check whether the visible scope matches the setting, and verify the number of quoted entries and content completeness after `limit` trimming |

## Three common errors

- Symptom: The credit count for the same course does not match between the program plan and the course syllabus. Cause: The two materials were revised at different times, versions are not synchronized, and retrieval only returns candidate fragments without automatically comparing fields.
- Symptom: The start date for the same record is inconsistent between the credit structure table and the program plan. Cause: The materials come from different sources and are updated at different paces, and the retrieval service does not judge date consistency.
- Symptom: The course syllabus lacks a signature or receipt, but the fragment can still be retrieved by the external service. Cause: Retrieval only performs recall and ranking, and the authorization scope is set by subsequent nodes or manually.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to check the ranking of the top few entries; check whether candidates after switching `searchMode` include both semantic and full-text results, and record the number of candidates and `similarity` scores.

Business test: access once with a restricted identity, check whether the visible scope matches the setting; verify the tokens of the quoted text after `limit` trimming, record the array count separately, and do not compare `quoteMaxToken`.

- In the knowledge base search test, switch `searchMode` and compare the candidate fragments and similarity scores of the semantic, full-text, and hybrid modes.
- Enable and disable `usingReRank`, compare the order of the top few candidates, and verify the tokens of the quoted text and the array count after `similarity` filtering.
