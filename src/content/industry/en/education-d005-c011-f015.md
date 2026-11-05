---
title: Knowledge Base Retrieval for School Exam Question Setting and Grading: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c011-f015
page_type: 行业问题页
application_area: education
meta_title: School Exams | Retrieval | Versions
meta_description: School Exams: review retrieval for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Exam Question Setting and Grading: Maintain Document Versions and Changes

## What this category's data looks like

The category materials for primary and secondary school exam question setting and grading include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The specification table carries the distribution of test points, question types, score values, difficulty presets, and the question setter's signature; the exam paper carries the question body text, question numbers, score values, exam date, and the reviewer's signature; the grading rubric carries the answer key points, scoring points, grading instructions, and the teaching and research group's receipt. The three types of materials each have a role in the version ledger and change record task: the specification table is the source version of the question-setting basis, the exam paper is the implemented presentation of the specification table, and the grading rubric is the judgment basis for grading execution. The update rhythm follows exam batches, teaching and research revisions, and question-setting adjustments, and common fields are version number, effective date, revision description, approval signature, and receipt number. When materials enter knowledge base retrieval and recall, they are first split into candidate segments by version, the retrieval service provides candidates and similarity scores, and subsequent nodes or humans then generate the version ledger and change records based on this, and determine that the current version is unique, old versions are traceable, and references are synchronized.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after mode, merge, rerank, filter, and limit trimming). The version ledger and change records are then completed by subsequent nodes or humans, and the retrieval results themselves are not statistical tables, business documents, or authorization results.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | The version number, effective date, question setter's signature, and test point score values must be consistent with the exam paper | In the search test, search by version number, check the dates and signatures in the candidate segments, and switch `searchMode` to compare the number of candidates and scores |
| Exam paper | The question numbers, score values, exam date, and reviewer's signature must correspond to the specification table and grading rubric | Search once each using different phrasings of the same test point, see whether the candidates cover both the exam paper and the rubric, and record the `similarity` score |
| Grading rubric | The scoring points, grading instructions, and teaching and research group's receipt must be synchronized with the exam paper's answer key points | Check the number of returned references and the text tokens, and adjust `limit` to see whether key segments are retained after reference limit trimming |
| Change record | The name, quantity, and date of the same record in the two materials must be consistent and old versions must be traceable | Compare the ranking of the first few items before and after enabling `usingReRank`, and check that the current version is unique and references are synchronized |

## Three common errors

- Phenomenon: The name and score value of the same test point do not match between the specification table and the exam paper. Cause: The two materials were revised separately, versions were not synchronized, and retrieval only recalls candidate segments by similarity.
- Phenomenon: The date of the grading rubric is inconsistent with the exam paper's exam date, and the old version is still recalled. Cause: The change record lacks a signature or receipt, and the version ledger was not updated in time.
- Phenomenon: There are many candidates but the ones ranked first are all irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and rerank and filter were not adjusted as needed.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle rerank on and off to see the ranking of the first few items.

Business test: change one piece of content and see whether the version number and references are updated synchronously.

- In the knowledge base search test, switch retrieval modes, compare the number of candidates and similarity scores, and record the array length of returned references and the reference text tokens.
- Check the version numbers, dates, and signatures of the specification table, exam paper, and grading rubric, confirm that the current version is unique, old versions are traceable, and references are synchronized, and only then update the knowledge base or external documents.
