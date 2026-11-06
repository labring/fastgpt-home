---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Access
meta_description: School Exams: review retrieval for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Manage Authorized Access and External Services

## What this category's data looks like

Materials in the primary and secondary school exam question-setting and grading scenario fall into three categories: the question-setting two-way specification table, the exam papers, and the grading rubrics. The sources are the teaching and research group and the question-setting group, and the update cadence advances with exam batches and revision receipts. The specification table carries the distribution of assessment points and the question-type score values, the exam papers carry the question body text and options, and the grading rubrics carry the scoring points and signature fields. When these three categories of materials enter the knowledge base retrieval and recall function, the specification table and grading rubrics serve as candidate sources for semantic and full-text recall, while the exam paper body text is trimmed as quoted content and handed to subsequent nodes or humans, used to generate the externally facing entry point and authorization scope. Field characteristics center on the consistency of dates, signatures, quantities, and names. When the name, quantity, or date of the same record does not match across two materials, the retrieval candidates and quoted content are still returned as original text fragments, and do not undertake statistical or authorization determination.

## Configuration and implementation checks

This stage is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The externally facing entry point and authorization scope are then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether fields, dates, and signatures are consistent across the three categories of materials | In the search test, search by assessment point name, check whether the names, quantities, dates, and signature fields of the specification table match those of the exam papers and grading rubrics, and record the number of candidates and the scores |
| Exam papers | Whether versions are in sync, and whether the question body text and options match the specification table | Switch `searchMode` to semantic, full-text, or hybrid, compare whether the candidates simultaneously include semantic and full-text results, and check whether the exam paper version and the specification table version are in sync |
| Grading rubrics | Whether scoring points and signature receipts are complete | Compare the ranking of the top few items before and after enabling `usingReRank`, check the scoring points and signature receipts of the grading rubrics, and separately record the number of items in the quoted array |
| Externally facing entry point and authorization scope | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, check whether the visible scope matches the setting, and check the tokens and array item count of the quoted text after `similarity` filtering |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the specification table and the grading rubrics. Cause: The two materials were revised separately, versions are not in sync, and retrieval candidates are still returned as original text fragments.
- Symptom: The signatures or receipts of the exam papers and grading rubrics are missing, yet the external entry point is already open. Cause: The authorization scope is not bound to the completeness status of the materials, and subsequent nodes or humans have not verified the signature fields.
- Symptom: The same question phrased differently cannot be recalled, and although there are many candidates, none of the top-ranked ones are relevant. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering and quoted upper-limit trimming are improper.

## How to verify the setup

Acceptance of this function: test once each with synonym-rewritten question sentences, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; check the actual values of `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and whether unauthorized access is invisible.

- In the knowledge base search test, switch the retrieval mode, compare whether the candidate results simultaneously include semantic and full-text results, and record the number of candidates and the scores.
- Compare the order of the top few items before and after enabling rerank, check the tokens of the quoted text after quoted upper-limit trimming, and record the array item count separately.
