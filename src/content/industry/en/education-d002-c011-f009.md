---
title: Tool Calls and Plugins for School Exam Question Setting and Grading: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c011-f009
page_type: 行业问题页
application_area: education
meta_title: School Exams | Tool Calls | Checks
meta_description: School Exams: review tool calls for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Exam Question Setting and Grading: Compare Documents and Locate Differences

## What this category's data looks like

Materials for primary and secondary school exam question setting and grading include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table is compiled by the subject question-setting group according to curriculum standards, listing assessment points, question types, score values, and cognitive levels; the exam paper is assembled by the question setter based on the specification table, containing question numbers, question stems, options, and answers; the grading rubric is written by the reviewer, containing scoring points, scoring criteria, and a signature field. The three types of materials are updated by exam batch, and each batch contains a version number, compilation date, review date, and signature or receipt. When the materials enter the tool call node, the specification table serves as the baseline object providing assessment points and score values, the exam paper serves as the object to be checked providing question numbers and score values, and the grading rubric serves as the supplementary object providing scoring points and signature fields. The field characteristics are four types: name, quantity, date, and signature, and the same record should remain consistent across the three materials.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification. Based on the tool description, parameter descriptions, and whether parameters are required, the model determines whether to call the tool this time; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable value in the context, it may not call the tool.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Assessment point names, score value quantities, compilation date, and signature are consistent across the three materials | Open the tool node description field and check whether the specification table fields correspond item by item with the exam paper and grading rubric; check the two items of parameter description and whether required, and confirm that the required parameters correspond to real fields in the specification table; check the diamond-shaped connections and node status on the canvas, and confirm that the tool call node is connected to the target tool |
| Exam paper | Question number names, score value quantities, question-setting date, and signature are consistent across the three materials | Run a test with a query missing a required field and observe whether the model asks a follow-up question first; check the inputs and returns in the call record, and confirm that the returned result does not contain values that do not exist in the exam paper; check the values of `toolChoice` and `functionCall` in the call record |
| Grading rubric | Scoring point names, score quantities, review date, and signature receipt are consistent across the three materials | Open the parameter configurations one by one and check the two items of description and whether required; use one real record to compare the names, quantities, and dates of the grading rubric with the specification table and exam paper; confirm whether a missing signature or receipt is marked as a discrepancy |

## Three common errors

- Symptom: the score value quantities of the same record do not match between the specification table and the exam paper. Cause: versions are not synchronized, the exam paper was assembled according to an old version of the specification table, and the tool call node did not compare version numbers.
- Symptom: the grading rubric lacks a review signature or receipt. Cause: the signature field was not written back during the material circulation step, and the tool call result did not return the signature status.
- Symptom: the model did not call the tool and directly gave an answer. Cause: the tool description did not state when it should be used, or the required parameters had no suitable value in the context, and the model did not ask a follow-up question.

## How to verify the setup

Acceptance of this feature: run a test with a query missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; check the values of `toolChoice` and `functionCall` in the record, and confirm that no values appear that do not exist in the materials.

Business test: use one real record to find fields inconsistent with the ledger, compare the names, quantities, dates, and signatures of the specification table, exam paper, and grading rubric, output a discrepancy list for the reviewer to confirm and write back.

- Open the tool node description field and check whether this description can be understood when taken out on its own; open the parameter configurations one by one and check the two items of description and whether required.
- Check the diamond-shaped connections and node status on the canvas, and confirm that the tool call node is connected to the target tool; run a test with a query missing that field and see whether it asks a follow-up question first instead of directly fabricating.
