---
title: Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c011-f005
page_type: 行业问题页
application_area: education
meta_title: School Exams | Conversation | Review
meta_description: School Exams: review conversation for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of exam question setting and grading in primary and secondary schools. The materials include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The specification table records test points, question types, scores, question setters, dates, and approval signatures; the exam paper records question numbers, question stems, answers, scores, and signatures for question setting and question review; the grading rubric records scoring points, score bands, reviewer signatures, and receipt dates. The three types of materials are updated by exam batch and subject version, and within the same batch, the version number, date, and signature fields should remain consistent. When entering the exception tracing and manual review function, the specification table serves as the basis for question setting and the source for locating test points, the exam paper serves as the record carrier for the original question text and scores, and the grading rubric serves as the basis for review scoring and responsible signatures. Together, the three support the tracing of original records in the exception list and the signature confirmation of review conclusions, which are ultimately handed over to the person in charge for disposition.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The exception list and review conclusions are then completed by the model, while the external entry point and authorization are handled by the publishing service and file permissions. The memory turns control how many previous rounds of dialogue can be referenced at most when answering. If the value is too small, the preceding context cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turns | Matches the range of preceding context required by the question | Check the current value in the application settings, and run a trial with two consecutive questions to confirm that the second round can carry forward the references from the first round |
| Question-setting two-way specification table | Test points, question types, scores, dates, and signatures are consistent between the specification table and the exam paper | Compare the specification table and exam paper of the same batch, check whether the names, quantities, dates, and signatures match, and check whether the versions are synchronized |
| Exam paper | Question numbers, question stems, scores, and question-setting and question-review signatures are consistent with the grading rubric | Extract one exception record, trace it along the question number back to the original question text and scores in the exam paper, and check whether the signatures and receipts are complete |
| Grading rubric | Scoring points, score bands, reviewer signatures, and receipt dates are complete and the versions are synchronized | Check whether the score bands in the grading rubric and the exam paper are consistent, check the reviewer signatures and receipt dates, and confirm that the version is not lagging behind |

## Three common errors

- Symptom: The name, quantity, or date of the same exception record does not match between the specification table and the exam paper. Cause: The two materials are maintained separately, lacking cross-checking and version synchronization.
- Symptom: The version of the grading rubric is not synchronized to the latest exam paper, and the review score bands are inconsistent with the question text scores. Cause: After the version update, the rubric was not written back, and the date field was not checked.
- Symptom: The exception list lacks a reviewer signature or receipt and cannot be handed over to the person in charge for disposition. Cause: The signature and receipt fields were not collected synchronously as the materials circulated.

## How to verify the setup

This function's acceptance: ask two consecutive follow-up questions and see whether the second question carries forward the references from the first question; at the same time, check whether `messages` and `chatId` enter the reference range as expected, and whether `variables` are correctly brought in with the turns.

Business test: create one exception record, see whether it can be traced back to the source materials, and check whether the names, quantities, dates, and signatures of the specification table, exam paper, and grading rubric are consistent.

- Check the current value of memory turns in the application settings, and run a trial with two consecutive questions to confirm that the second round can correctly carry forward the references from the first round.
- Compare the usage records of two runs to confirm that consumption changes accordingly after adjusting the turns, and check that the opening message is not treated as preceding context.
