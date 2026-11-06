---
title: Forms and User Interaction for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c011-f016
page_type: 行业问题页
application_area: education
meta_title: School Exams | Forms | Handover
meta_description: School Exams: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on the material drafting and responsibility handover step in the primary and secondary school exam question setting and grading category, involving three core types of materials: the question-setting two-way specification table, the exam paper, and the grading rubric. The specification table is usually formed before the exam paper, recording assessment objectives, question type distribution, and score weights; the exam paper is generated based on the specification table, containing question content, scores, exam duration, and a signature field for the question setter; the grading rubric follows the exam paper, listing answer key points, grading tiers, and the grading responsible person. The three types of materials have different sources and different update rhythms: the specification table adjusts with the question-setting plan, the exam paper is revised with review comments, and the grading rubric is supplemented with trial grading feedback. When the materials enter the forms and interaction function, each assumes a different role: the specification table provides the field framework and version baseline, the exam paper provides question count and score data, and the grading rubric provides grading basis and signature receipt information. Field characteristics center on name, quantity, date, version number, signature, and receipt status. Any change to one material must be synchronized to the other two, avoiding mismatches in name, quantity, and date for the same record across two materials.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "issuable material draft and handover record" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Fields are complete, the responsible person is clear, the version and date are consistent, and the name, quantity, and date match those of the exam paper and grading rubric | In the node configuration, check the field names and required markers one by one, and confirm that the specification table version number, question setter signature, and date fields are marked as required; after submission, check whether subsequent nodes can obtain the corresponding field values, and you can test-run by referencing fields with `formInput` |
| Exam paper | The question count, scores, and exam duration are consistent with the specification table, the signature fields for the question setter and reviewer are complete, and handover must not proceed when the version is not synchronized | Check the correspondence between the exam paper fields and the specification table fields one by one, and confirm that the question count, scores, date, and signature fields are marked as required; reference the field in subsequent nodes and test-run to check whether the field values obtained by subsequent nodes after submission match what was filled in |
| Grading rubric | Answer key points, grading tiers, grading responsible person signature, and receipt are complete, and the date is consistent with the exam paper and specification table | Check the grading rubric field names and required settings one by one, and confirm that the grading tier, responsible person, and receipt status fields are marked as required; after submission, check whether subsequent nodes can obtain the corresponding field values, and if necessary use `userSelect` in subsequent nodes to select the handover target and test-run |
| Form input node | After triggering, the conversation enters an interactive state and records the workflow state. Submission is not allowed when required items are empty. After submission, field values are passed to subsequent nodes | In the node configuration, check the field names and required markers one by one, test-run a complete submission, and confirm that subsequent nodes can obtain the corresponding field values; if the conversation stops in the interactive state or subsequent nodes cannot obtain values, check the required settings and field references |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the specification table and the exam paper, and it is returned during handover. Cause: The two materials were drafted separately, fields were not checked uniformly, and the version and date were not updated synchronously.
- Phenomenon: The grading rubric and exam paper versions are not synchronized, grading is based on the old version during marking, and responsibility attribution is unclear. Cause: The version number field was not marked as required, subsequent nodes cannot obtain the corresponding field value after submission, and comparison is impossible.
- Phenomenon: The handover record lacks a signature or receipt, and the next step cannot sign for acceptance. Cause: The signature and receipt fields were not marked as required, submission is still possible when required items are empty, and the conversation stopping in the interactive state is not blocked.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check whether the field values obtained by subsequent nodes are consistent with the filled-in content, and confirm that submission is not possible when required items are empty and the conversation does not stop in the interactive state.

Business test: draft one according to the template and complete one handover, see whether missing items are blocked, and check whether the name, quantity, date, and signature of the specification table, exam paper, and grading rubric are consistent.

- In the node configuration, check the field names and required markers one by one, and confirm that the key fields of the specification table, exam paper, and grading rubric are marked as required.
- Reference the field in subsequent nodes and test-run, confirm that subsequent nodes can obtain the corresponding field values after submission, and that the handover record can be signed for acceptance by the next step.
