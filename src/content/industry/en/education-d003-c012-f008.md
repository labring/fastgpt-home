---
title: Workflow Orchestration for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c012-f008
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Workflows | Intake
meta_description: Teaching Reviews: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses district and county teaching research activities and lesson observation and evaluation scenarios. Materials include teaching research activity notices, lesson observation records, and lesson evaluation minutes. Notices are published by the organizing party by activity batch and include the activity name, date, location, participants, and agenda; lesson observation records are filled in by observers by session and include the instructor, class, subject, observation points, and time; lesson evaluation minutes are compiled by the recorder and include review points, improvement suggestions, signatures, and receipts. The material update rhythm is: notices are issued before the activity, records are filled in during the activity, and minutes are supplemented after the activity, with multiple rounds of revision. When entering this function, notices are used to confirm the basic activity information and intake scope, lesson observation records are used to verify sessions and observation items, and lesson evaluation minutes are used to verify review conclusions and signature status. Together, the three support question-item identification and missing-item follow-up.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and supplemented question items" are continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Whether the activity name, date, location, participants, and agenda are complete, and whether they are consistent with the names and dates in the lesson observation records and lesson evaluation minutes | Check the notice fields item by item; use `variables` to reference the activity identifier in the notice, run a trial in a subsequent node, and check whether the referenced value matches the original notice text |
| Lesson observation record | Whether the instructor, class, subject, session, observation points, and date are complete, whether they match the activity name and date in the notice, and whether the signature is missing | Check the record fields item by item; in the run records, check the branch direction of the node corresponding to `nodeId` to confirm whether missing items trigger the follow-up branch |
| Lesson evaluation minutes | Whether the review points, improvement suggestions, signatures, and receipts are complete, whether the version is synchronized with the lesson observation records, and whether the name, quantity, and date of the same record are consistent | Check the minutes fields item by item; in a subsequent node, reference the selection result variable in `variables` and run a trial to confirm whether the question items supplemented after follow-up enter the minutes |
| Intake records and supplemented question items | Whether missing items are identified and followed up, whether the answers are based on materials, and whether they are transferred to the handler | Trigger a user selection node once, check the interaction state and branch direction; verify whether the follow-up items correspond to missing items in the notice, records, and minutes |

## Three common errors

- Phenomenon: The same activity name is inconsistent between the notice and the minutes. Cause: After multiple rounds of revision, the versions were not synchronized, and the old notice was not replaced, causing the name to fail to match during intake.
- Phenomenon: The number of sessions in the lesson observation records and lesson evaluation minutes does not match. Cause: The recorder filled them in using different templates, the quantity criteria were not unified, and missing items were not identified.
- Phenomenon: The lesson evaluation minutes lack a signature or receipt. Cause: The signature process was not completed when supplementary entry was made after the activity, and the signature status was empty when the materials entered intake.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch directions and interaction states in the run records, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and that the process continues after the interaction is completed.

Business test: submit a question that lacks key information, see whether it first follows up and then answers, whether the follow-up items correspond to missing items in the notice, records, and minutes, and whether the answer is based on materials.

- In the user selection node, check the options and branch connections one by one, trigger it once, and then check the node status and branch direction in the run records.
- In a subsequent node, reference the selection result variable and run a trial once, and verify whether the question items supplemented after follow-up enter the intake records and are transferred to the handler.
