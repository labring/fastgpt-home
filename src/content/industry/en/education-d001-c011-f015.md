---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Find Supporting Evidence
slug: /en/industry/education-d001-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Evidence
meta_description: School Exams: review retrieval for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Find Supporting Evidence

## What this category's data looks like

Exam question setting and grading materials for primary and secondary schools include the two-way specification table for question setting, exam papers, and grading rubrics, and the three have different emphases in their fields: the specification table contains question numbers, knowledge points, ability levels, scores, dates, and the signature of the question setter; the exam paper contains question content, question types, scores, version identifiers, and review signatures; the grading rubric contains scoring points, scores, grading explanations, dates, and the signature of the teaching and research group. The material sources are the teaching and research group, the question-setting group, and the academic affairs office, and the update rhythm is synchronized with the exam cycle and version revisions. When entering the knowledge base retrieval and recall function, the specification table, exam paper, and grading rubric are indexed as independent fragments, each serving as a basis source role: the specification table is used to check the scope of question setting and score distribution, the exam paper is used to check question content and version, and the grading rubric is used to check grading standards and signature receipts. During retrieval, attention should be paid to whether the names, quantities, and dates of the same record in the three materials are consistent, whether the versions are synchronized, and whether the signatures or receipts are complete.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The basis entries that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Fields include question numbers, knowledge points, ability levels, scores, dates, and the signature of the question setter; the version must be the current one; entries can be traced back to the original text | In the search test, switch `searchMode` to semantic, full-text, or hybrid, check whether specification table fragments are hit, and record the number of candidate entries and scores |
| Exam paper | Fields include question content, question types, scores, version identifiers, and review signatures; the names, quantities, and dates of the same record in the specification table and exam paper must be consistent | Test once each with synonymous questions, compare candidates and scores, and observe the ranking of the top few entries before and after enabling `usingReRank` |
| Grading rubric | Fields include scoring points, scores, grading explanations, dates, and the signature of the teaching and research group; entries lacking signatures or receipts cannot be used as a basis | Check whether grading rubric fragments match the exam paper and specification table, and check whether key fragments of the original text are retained after `similarity` filtering |
| Citation upper limit | The number of cited entries is the array length, and the citation content budget is checked separately in tokens; the two are not compared for equality | Record the number of returned citations, check the tokens of the cited text separately, and confirm that key paragraphs are still retained after `limit` trimming |

## Three common errors

- Phenomenon: the names, quantities, and dates of the same record in the specification table and exam paper do not match. Cause: the versions of the two materials are not synchronized, or they were not checked against the same standard during entry.
- Phenomenon: the grading rubric lacks signatures or receipts, but entries are still recalled. Cause: signature fields were not validated when the materials were stored, and retrieval did not filter by version and signature.
- Phenomenon: it cannot be recalled when phrased differently, and although there are many candidates, the ones ranked at the front are all irrelevant. Cause: the retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too loose.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few entries; switch `searchMode` to semantic, full-text, or hybrid, record the number of candidate entries and scores, and check the tokens of the cited text after `similarity` and `limit` trimming.

Business test: ask a basis question that spans materials and see whether the answer provides traceable sources.

- In the knowledge base search test, switch `searchMode`, compare the number of candidate entries and scores of the semantic, full-text, and hybrid modes, and confirm that they match the material form.
- Compare the ranking of the top few entries before and after enabling `usingReRank`, check the tokens of the cited text after `similarity` filtering and `limit` trimming, and separately record the number of entries in the citation array.
