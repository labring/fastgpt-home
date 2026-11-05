---
title: Forms and User Interaction for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c011-f016
page_type: 行业问题页
application_area: education
meta_title: School Exams | Forms | Intake
meta_description: School Exams: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information

## What this category's data looks like

In the scenario of exam question setting and grading in primary and secondary schools, materials usually include three types: the question-setting two-way specification table, the exam paper, and the grading rubric. The question-setting two-way specification table is updated by the subject question-setting group per semester or exam batch, and its fields cover knowledge point number, cognitive level, question type, score, question setter's signature, and approval date; the exam paper is submitted by the question setter, and its fields include question number, question stem, reference answer, score, question setter's signature, and reviewer's signature; the grading rubric is formulated by the grading group, and its fields include question number, scoring point, scoring standard, grading group leader's signature, and version date. When the materials enter the question intake and missing-item follow-up stage, the question-setting two-way specification table plays the role of structural basis, the exam paper plays the role of content entity, and the grading rubric plays the role of scoring scale. The three often circulate in parallel in different versions and on different dates, field names and counts are prone to misalignment when compared across materials, and signatures and receipts are often missing, so it is necessary to first accept them, then ask follow-up questions about missing items, and then transfer them to the handler.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and completed follow-up items" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the knowledge point number, cognitive level, question type, score, question setter's signature, and approval date can be matched item by item; whether the name, count, and date of the same record in the exam paper and grading rubric are consistent | Check the field names and required markers one by one in the node configuration, and after submission have subsequent nodes reference the field values and run a trial |
| Exam paper | Whether the question number, question stem, reference answer, score, question setter's signature, and reviewer's signature are complete; whether the version date is synchronized with the specification table | After submitting with `formInput`, reference the field values in subsequent nodes, and check whether the retrieved question number and score match what was filled in |
| Grading rubric | Whether the question number, scoring point, scoring standard, grading group leader's signature, and version date are complete; whether missing signatures or receipts are marked as required | After selecting the material type with `userSelect` and submitting, check whether subsequent nodes can retrieve the corresponding field values according to the selection |
| Intake record and completed follow-up items | Whether missing items are identified and followed up, whether the answers have material basis, and whether they are transferred to the handler | After submission, check the field values retrieved by subsequent nodes, and confirm that the missing-item follow-up items are passed along with the record |

## Three common errors

- Phenomenon: The name, count, and date of the same record do not match between the question-setting two-way specification table and the exam paper. Cause: The two materials are filled in by different people according to different batches, field names are not unified, and no cross-material comparison is done before submission.
- Phenomenon: The grading rubric version is not synchronized; the exam paper has been changed but the rubric still uses the old version. Cause: The version date field is not marked as required, and after submission subsequent nodes cannot retrieve the version value, so a synchronization reminder cannot be triggered.
- Phenomenon: The exam paper lacks the reviewer's signature, or the grading rubric lacks the grading group leader's signature or receipt. Cause: The signature and receipt fields are not included in the required markers, so they can pass even if empty at submission, and the intake record is therefore incomplete.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, and check whether the field values retrieved by subsequent nodes match what was filled in; try `formInputResult` and `selectResult` once each, and confirm that submission is not possible when required items are empty and that the conversation does not remain in the interaction state.

Business test: submit a question that lacks key information, and see whether it first asks follow-up questions before answering; the follow-up content should point to the missing fields, dates, or signatures in the question-setting two-way specification table, exam paper, or grading rubric.

- Check the field names one by one in the node configuration to ensure they correspond one-to-one with the material fields of the question-setting two-way specification table, exam paper, and grading rubric, and mark key material fields as required.
- Reference the field values of `formInputResult` and `selectResult` in subsequent nodes and run a trial to confirm that the corresponding values can be retrieved after submission, and that missing-item follow-up items are transferred to the handler along with the intake record.
