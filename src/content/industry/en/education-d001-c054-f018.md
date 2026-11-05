---
title: Reranking and Hybrid Retrieval for Self-Study Exam Records and Graduation Review: Find Supporting Evidence
slug: /en/industry/education-d001-c054-f018
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Reranking | Evidence
meta_description: Self-Study Exams: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Self-Study Exam Records and Graduation Review: Find Supporting Evidence

## What this category's data looks like

This page centers on self-taught examination registration records and graduation review; the materials include registration records, course pass certificates, and graduation application forms. Registration records are updated by the provincial examination office after each registration and transfer, with fields including name, admission ticket number, ID number, major name, course status, signature, and date; course pass certificates are issued by the main examining institution after each round of score release, with fields including course code, course name, score, pass date, seal, and receipt; graduation application forms are submitted by candidates before preliminary review, with fields including major, number of courses, exemption records, signature, and date. When these three types of materials enter hybrid retrieval, registration records serve as the identity and status anchor, course pass certificates serve as course and score evidence, and graduation application forms serve as application and review evidence; the reranking model uniformly sorts the three-way candidates, and citation trimming and answer generation then produce evidence entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and reranking scores. The "evidence entries that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval simultaneously runs the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Name, admission ticket number, ID number, major name, course status, signature, and date must match item by item with the course pass certificates and graduation application form | In the search parameters, check `searchMode` and `usingReRank`, compare the order and scores of the top three before and after reranking, and record the number of candidates and scores |
| Course pass certificates | Course code, course name, score, pass date, seal, and receipt must be consistent with the course status in the registration records and the number of courses in the graduation application form | Check whether the candidates under `similarity` and `limit` come from both paths at the same time, and check whether the name, quantity, and date of the same course match across the two materials |
| Graduation application form | Major, number of courses, exemption records, signature, and date must be consistent with the registration records and course pass certificates; missing signature or receipt is regarded as incomplete | Compare the order and scores before and after reranking, confirm that the top few can be traced back to the original text, and separately record the number of entries in the citation array and check the tokens budget of the citation text |

## Three common errors

- Phenomenon: the name, quantity, or date of the same course does not match between the course pass certificate and the registration records. Cause: the two paths of materials are entered by different steps, and no field-level check was performed.
- Phenomenon: the version of the graduation application form is not synchronized and still references the old course plan. Cause: the materials are updated at different paces, and retrieval was not filtered by the current version.
- Phenomenon: the graduation application form lacks a signature or receipt but is still treated as complete evidence. Cause: there are many candidates and the top few are irrelevant, so similarity filtering appears to fail.

## How to verify the setup

This feature's acceptance: turn reranking on and off to compare the order and scores of the top three, check the number of candidates and scores, and confirm that `usingReRank` takes effect and that both paths of `searchMode` are enabled.

Business test: ask a cross-material evidence question and see whether the answer gives traceable sources.

- In the search parameters, check `searchMode`, `usingReRank`, `similarity`, and `limit`, compare the order and scores before and after reranking, and record the number of candidates and scores.
- Check item by item the fields, dates, and signatures of the registration records, course pass certificates, and graduation application form, separately record the number of entries in the citation array, and check the tokens of the citation text.
