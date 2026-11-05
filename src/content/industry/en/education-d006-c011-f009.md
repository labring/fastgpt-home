---
title: Tool Calls and Plugins for School Exam Question Setting and Grading: Track Progress and Check Statistics
slug: /en/industry/education-d006-c011-f009
page_type: 行业问题页
application_area: education
meta_title: School Exams | Tool Calls | Progress
meta_description: School Exams: review tool calls for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Exam Question Setting and Grading: Track Progress and Check Statistics

## What this category's data looks like

This page is for the scenario of primary and secondary school exam question setting and grading. Materials include the question-setting two-way specification table, exam papers, scoring rubrics, and weekly progress records. The question-setting two-way specification table records knowledge points, question types, scores, question setters, review dates, and signatures; exam papers record question numbers, question types, scores, question setters, reviewers, finalization dates, and signatures; scoring rubrics record question numbers, scoring points, scores, drafters, review dates, and signatures. Materials are submitted weekly by subject lesson preparation groups, with an update rhythm of daily supplementary entries during question-setting weeks and weekly summaries on Fridays. When entering this function, the question-setting two-way specification table is used to verify knowledge points and score distribution, exam papers are used to verify question numbers and total scores, scoring rubrics are used to verify scoring points and total scores, and progress records are used to verify whether all materials are complete and whether dates and signatures are complete.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "progress table and statistical scope explanation" is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether knowledge points, question types, scores, question setters, review dates, and signatures are complete, and whether they match the question numbers and scores in the exam paper | Open the tool node introduction field, verify whether the introduction clearly states the purpose and return results; run a test with a question missing the review date to see whether it asks a follow-up first; verify the inputs and returns in the call record, and check whether `toolChoice` and `functionCall` are triggered according to the introduction |
| Exam paper | Whether question numbers, question types, scores, question setters, reviewers, finalization dates, and signatures are complete, and whether they match the question numbers and scores in the scoring rubric | Open each parameter configuration one by one, verify the parameter introduction and whether the two items are required; run a test with a question missing the signature receipt to see whether it asks a follow-up first; verify the inputs and returns in the call record, and check whether `functionCall` is triggered according to the introduction |
| Scoring rubric | Whether scoring points, scores, drafters, review dates, and signatures are complete, and whether they match the question numbers and scores in the exam paper | On the canvas, verify the diamond connectors and node status, and confirm that the tool call node connection is connected to the target tool; run a test with a question missing the review date to see whether it asks a follow-up first; verify the inputs and returns in the call record, and check whether `toolChoice` is triggered according to the introduction |
| Progress record | Whether the record count matches the statistical count, whether the scope is written in the header, and whether exceptions are clearly stated | Use one week's records to verify the totals and see whether the scope and exceptions are clearly stated; verify the inputs and returns in the call record, and check whether the return result contains values that do not exist in the business materials |

## Three common errors

- Phenomenon: The same record's name, quantity, and date do not match between the question-setting two-way specification table and the exam paper. Cause: The two materials are entered separately, no cross-verification is done, and the field scope is not unified.
- Phenomenon: The scoring rubric and exam paper versions are not synchronized, and differences appear in question numbers or scores. Cause: After finalization, updates were not synchronized, and the tool call returned old version data.
- Phenomenon: Materials lack signatures or receipts, but the progress record still shows complete. Cause: The progress record does not list signatures and receipts as required fields, and the model calls the tool without asking a follow-up.

## How to verify the setup

Acceptance for this function: run a test with a question missing required parameters, verify the inputs and returns in the call record, and confirm whether it asks a follow-up or calls according to the introduction; at the same time, verify whether `toolChoice` and `functionCall` are triggered according to the tool introduction, and whether the return result contains values that do not exist in the business materials.

Business test: use one week's records to verify the totals and see whether the scope and exceptions are clearly stated; verify whether the fields, dates, and signatures of the question-setting two-way specification table, exam papers, and scoring rubrics are complete, and whether the record count matches the statistical count.

- Open the tool node introduction field, check whether this description can be understood when taken out alone, and verify the parameter introduction and whether the two items are required.
- Run a test with a question missing that field to see whether it asks a follow-up first rather than directly fabricating; on the canvas, verify the diamond connectors and node status.
