---
title: Forms and User Interaction for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c012-f016
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Forms | Intake
meta_description: Teaching Reviews: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the district and county teaching research activity and lesson observation/evaluation scenario. The source materials are the three-piece set of teaching research activity notices, lesson observation records, and lesson evaluation minutes, updated by activity batch or week. Field characteristics center on activity name, subject, grade, instructor, observer, evaluator, date, period, signature, and receipt. The activity notice plays the role of initiation and scope definition, specifying time, location, and participant list; the lesson observation record plays the role of process documentation, registering observation points and attendance period by period; the lesson evaluation minutes play the role of conclusion consolidation, recording review opinions and improvement items. When the three types of materials enter the form input step, the submitter first enters them item by item according to the fields. If required items are incomplete, submission is not possible. After submission, the field values are used by subsequent nodes or manual comparison to check whether the names, quantities, and dates among the notice, records, and minutes are consistent, and to check whether signatures or receipts are in place, thereby forming an acceptance record and pending follow-up items.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "acceptance record and completed follow-up items" are then completed by subsequent nodes or manually. After the node is triggered, the conversation enters the interaction state and records the workflow state. Only after the required items are filled in and submitted can the field values be referenced by subsequent nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Whether the activity name, subject, grade, date, participant list, and signature column align item by item with the lesson observation record and lesson evaluation minutes | Check the field names one by one in the node configuration, confirm that the activity name and date fields in the notice can be compared with the other two materials; reference the `formInputResult` field and run a trial, observing whether subsequent nodes can retrieve the corresponding values after submission |
| Lesson observation record | Whether the period, instructor, observer, observation points, and attendance count are consistent with the notice's participant list and the lesson evaluation minutes | Check the required settings one by one, confirm that the period and observer are marked as required; reference the `selectResult` output in subsequent nodes and run a trial, checking whether the selected value can be retrieved after submission |
| Lesson evaluation minutes | Whether the review opinions, improvement items, evaluator, and date match the notice and lesson observation record, and whether signatures or receipts are complete | Check the evaluator and date field names in the node configuration, confirm that missing signatures or receipts can be treated as pending follow-up items; after the trial submission, check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: The name, quantity, and date of the same activity do not match across two materials. Cause: During submission, the notice fields were not checked item by item, and after submission the field values directly entered subsequent nodes, so discrepancies were not identified.
- Symptom: The notice has been updated to a new version, but the lesson observation record and lesson evaluation minutes still use old-version fields. Cause: The versions were not synchronized, the form field names and material field names were not checked one by one, and after submission the referenced values were misaligned.
- Symptom: The lesson evaluation minutes lack a signature or receipt but are still accepted as complete materials. Cause: Key material fields were not marked as required, missing items were not identified and followed up, and the conversation stopped in the interaction state.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that `formInputResult` and `selectResult` are passed correctly, and that submission is not possible when required items are empty.

Business test: submit a question missing key information, see whether it first follows up before answering, and whether the follow-up items fall on the fields and signature/receipt of the notice, lesson observation record, and lesson evaluation minutes.

- Check the field names and required settings one by one in the node configuration, confirm that key material fields are marked as required, and that submission is not possible when items are missing.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, check whether the corresponding field values can be retrieved after submission, and record the tokens and array count of the referenced text.
