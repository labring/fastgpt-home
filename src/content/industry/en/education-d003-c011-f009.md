---
title: Tool Calls and Plugins for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c011-f009
page_type: 行业问题页
application_area: education
meta_title: School Exams | Tool Calls | Intake
meta_description: School Exams: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information

## What this category's data looks like

In the scenario of exam question setting and grading in primary and secondary schools, the materials are divided into three layers: the two-way specification table for question setting, the exam paper, and the grading rubric. The specification table comes from the teaching and research group and is updated by semester or exam session; its fields include knowledge points, question types, score values, cognitive levels, and the question setter's signature and date. The exam paper comes from the question setter and is finalized by exam session; its fields include question numbers, question stems, answers, score values, and the paper reviewer's signature and version number. The grading rubric comes from the grading group and is synchronized with the exam paper version; its fields include question numbers, scoring points, score bands, receipts, and review signatures. When the materials enter the question answering intake and missing-item follow-up function, the specification table serves as the reference baseline for comparing assessment points and score values, the exam paper serves for checking question content and versions, and the grading rubric serves for checking scoring criteria and signature receipts; the names, quantities, and dates of the three must be cross-consistent, and any missing item triggers a follow-up question.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). "Intake records and items to be completed" are then handled by subsequent AI nodes or manual review.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Whether knowledge points, question types, score values, cognitive levels, and the question setter's signature and date are complete, and whether they match the number of question numbers in the exam paper | Check the specification table fields one by one, run a trial with a question missing a score value to see whether it asks a follow-up first; check the call records of `toolChoice` and `functionCall` |
| Exam paper | Whether question numbers, question stems, answers, score values, and the paper reviewer's signature and version number are consistent with the specification table, and whether the names, quantities, and dates in the same record match | Open the tool node introduction fields and confirm that the purpose and return result can be understood on their own; check the parameter introduction and whether the two items are required |
| Grading rubric | Whether scoring points, score bands, receipts, and review signatures are synchronized with the exam paper version, and whether missing signatures or receipts are identified | Run a trial with a question missing the receipt field to see whether the model asks a follow-up instead of directly fabricating; check the diamond-shaped interface connections and node status on the canvas |
| Tool calling node | Whether the four items—introduction, parameter introduction, whether required, and connections—correspond to the business material fields | Open each parameter configuration one by one to check the meaning and values, and confirm that the required items correspond to fields that actually exist in the materials |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the specification table and the exam paper. Cause: The two materials are updated separately, lacking cross-checking and version synchronization.
- Symptom: The grading rubric is not synchronized with the exam paper version, and score bands and question numbers are misaligned. Cause: The rubric was not updated in sync with the finalized exam paper, and receipts are missing.
- Symptom: The model does not call the tool and directly gives an answer, or values that do not exist in the materials appear in the returned result. Cause: The tool introduction and parameter introduction are unclear, and required items are not guided by prompts.

## How to verify the setup

Acceptance for this function: run a trial with a question missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the introduction; also check the call records of `toolChoice` and `functionCall`.

Business test: ask a question missing key information and see whether it asks a follow-up before answering.

- Open the tool node introduction field and check whether this description can be understood on its own, stating the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one and check the introduction and whether required; run a trial with a question missing that field to see whether it asks a follow-up instead of directly fabricating.
