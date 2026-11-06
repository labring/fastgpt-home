---
title: Knowledge Base Retrieval for Undergraduate Curriculum Planning: Track Progress and Check Statistics
slug: /en/industry/education-d006-c018-f015
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Retrieval | Progress
meta_description: Program Revision: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Undergraduate Curriculum Planning: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers three types of materials involved in undergraduate program planning: program plans, course syllabi, and credit structure tables. The program plan gives the major direction, study requirements, and overall credit framework; the course syllabus states course objectives, content, and assessment methods; the credit structure table lists the credits of each module and the corresponding relationship between modules and courses. During the revision cycle, the three types of materials are updated on a rolling weekly basis, and fields include course name, course code, credits, class hours, semester offered, revision date, and signature column. When the materials enter the knowledge base retrieval and recall function, the program plan serves as the primary retrieval object, while the course syllabus and credit structure table serve as cross-checking sources, each retaining original text fragments for candidate recall. The name, quantity, and date of the same record may be inconsistent across the three materials; version desynchronization and missing signatures or receipts may also occur. Retrieval results only present candidate fragments and similarity scores, and do not replace statistical verification.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "progress table and statistical criteria description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, credits, revision date, and signature column are consistent with the course syllabus and credit structure table | In the search test, search once each with the same course name and course code, switch `searchMode` to semantic, full-text, and hybrid, record the number of candidates and scores, and check the name, quantity, and date in the hit fragments |
| Course syllabus | Whether the course objectives, class hours, assessment methods, and semester offered match the program plan and credit structure table | Test once each with synonym-rewritten questions, turn `usingReRank` on and off to compare the ranking of the top few results, check whether the candidate fragments cover the key paragraphs, and record candidates near the `similarity` threshold |
| Credit structure table | Whether the total credits of each module and the course correspondence are consistent with the program plan and course syllabus | Search by module name and credit range, check the credit quantities and course list in the candidate fragments, inspect the tokens of the referenced text and the number of items after `limit` trimming, and record the array item count separately |
| Progress table and statistical criteria description | Whether the record count and statistical count match, and whether the criteria are written in the header | Use one week of records to check the totals, compare item by item the name, quantity, date, and signature in the program plan, course syllabus, and credit structure table, and list exceptions separately |

## Three common errors

- Symptom: the name or credits of the same course do not match between the program plan and the course syllabus. Cause: the two materials were revised at different times, versions are not synchronized, and retrieval candidates only present fragments, so you need to return to the original text for verification.
- Symptom: the total in the credit structure table is inconsistent with the total credits in the program plan. Cause: courses were added or removed without synchronized updates, or the quantity and date of the same record do not match across the two materials, making it easy to confuse them when retrieval scores are similar.
- Symptom: the course syllabus lacks a signature or receipt, but the progress table still records it as complete. Cause: the signature column was not updated with the revision, the candidate fragments returned by retrieval do not include signature status, and the statistical criteria do not state exception handling in the header.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to inspect the ranking of the top few results; switch `searchMode` to observe candidate differences among semantic, full-text, and hybrid, adjust `similarity` and `limit` to see the number of candidates after filtering and trimming, and turn `usingReRank` on to compare the order before and after secondary ranking.

Business testing: use one week of records to check the totals and see whether the criteria and exceptions are clearly stated; compare item by item the name, quantity, date, and signature in the program plan, course syllabus, and credit structure table, and confirm that the record count and statistical count match.

- In the knowledge base search test, use the same course name and course code to search respectively with the three `searchMode` options semantic, full-text, and hybrid, record the number of candidates and scores, and check the name, quantity, and date in the hit fragments.
- Search once each with `usingReRank` turned on and off, compare the ranking of the top few results; adjust `similarity` and `limit`, inspect the tokens and array item count of the referenced text, and confirm that key paragraphs have not been trimmed away.
