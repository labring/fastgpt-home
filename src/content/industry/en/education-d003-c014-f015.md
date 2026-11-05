---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Intake
meta_description: Pastoral Education: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses school moral education and homeroom teacher work scenarios. The material sources are daily school reporting and archiving: three types—thematic class meeting plans, student comprehensive quality records, and home visit records. A thematic class meeting plan usually contains the class meeting theme, time and place, objectives, procedure, host, participants, signature, and receipt; a student comprehensive quality record contains dimensions such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, as well as the evaluation date and homeroom teacher signature; a home visit record contains the student name, home visit time, home visit teacher, family situation, key communication points, parent signature, and receipt. The update rhythm is mostly reporting as events occur during the semester, with centralized archiving at the end of the term; fields are mainly dates, names, quantities, and signatures. When the three types of materials enter this function, their roles differ: thematic class meeting plans and home visit records mostly serve as searchable original text fragments for answering process and record-type questions; student comprehensive quality records often serve as the basis for field verification, used to determine whether the names, quantities, and dates of the same record are consistent across different materials.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). Acceptance records and follow-up questions to be completed are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Whether fields, dates, and signatures are complete, and whether the plan names and quantities correspond to the archive list | In the retrieval node, use `searchMode` to switch between semantic, full-text, or hybrid, and see whether candidate fragments hit the plan title, date, and signature fields |
| Student comprehensive quality record | Whether the names, quantities, and dates of the same record match across two materials, and whether the versions are synchronized | Use the same question with synonymous rewrites, test once each, record the number of candidates and the `similarity` score, and check the dimension names and evaluation dates in the hit fragments |
| Home visit record | Whether the home visit time, teacher, parent signature, and receipt are complete, and whether any items are missing | Compare the ranking of the top few results before and after enabling `usingReRank`, and see whether the key passages of the home visit record stably rank at the front |
| Retrieval output | Whether candidates and cited content retain key original text fragments, and whether the citation upper limit only trims the text budget | Record the number of returned candidates and scores, separately record the length of the citation array, and check the tokens of the cited text and the `limit` setting |

## Three common errors

- Symptom: the name and date of the same thematic class meeting plan do not match between the archive list and the retrieval fragment. Cause: the two material versions are not synchronized; the old version was ingested first, and the hit fragment comes from the old version.
- Symptom: the quantity in the student comprehensive quality record is inconsistent with another material, and the answer lacks key passages. Cause: the field reporting standards differ, or the record was not updated and ingested with the semester.
- Symptom: the home visit record lacks a parent signature or receipt, yet it still answers directly after follow-up. Cause: the missing item was not identified as a required field to be completed, and retrieval only returns existing candidate fragments.

## How to verify the setup

This function's acceptance: use synonymous rewritten questions, test once each, compare the number of candidates and the `similarity` score, then toggle `usingReRank` to see the ranking of the top few results; switch `searchMode` to observe the difference between semantic and full-text candidates.

Business test: ask a question missing key information, and see whether it asks a follow-up question before answering.

- In the knowledge base search test, make synonymous rewrites of the same question, record the number of candidates, scores, and citation array length, and check whether the tokens of the cited text are affected by trimming from `limit` and the citation upper limit.
- For thematic class meeting plans, student comprehensive quality records, and home visit records, verify fields, dates, and signatures separately. When names, quantities, or dates do not match or signatures/receipts are missing, ask a follow-up question first, then forward to the responsible person for handling.
