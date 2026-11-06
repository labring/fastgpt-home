---
title: Workflow Orchestration for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c038-f008
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Workflows | Intake
meta_description: Continuing Education: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

In the continuing education hour recognition scenario, materials usually include three types: course filing forms, study certificates, and hour recognition forms. Course filing forms come from the filing step of the training institution, and their fields include course name, number of class hours, course start date, and institution seal; study certificates are obtained by learners after completing study, and their fields include name, course name, number of hours, completion date, and signature of the issuing unit; hour recognition forms are filled out in summary by the accepting party, and their fields include applicant, course name, recognized hours, recognition date, and handler and reviewer signatures. The three types of materials enter with batch applications, and the update rhythm is synchronized with the training cycle. Common field differences are concentrated in name wording, hour quantities, and date conventions, and whether signatures and receipts are complete also needs to be compared item by item. When materials enter this function, they respectively serve as the basis for the course, the fact of study, and the recognition conclusion, providing a comparison baseline for subsequent missing-item identification and follow-up questions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. "Intake records and items to be completed" are then continued and completed by subsequent nodes according to the branches. When a node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, number of class hours, course start date, and institution seal are consistent with the study certificate | Compare the name, quantity, and date of the two materials field by field, check whether the seal position is complete, and record discrepancy items |
| Study certificate | Whether the name, course name, number of hours, completion date, and signature of the issuing unit are complete | Check whether signatures and receipts are missing, compare the hour quantity and date conventions, and mark items requiring follow-up |
| Hour recognition form | Whether the applicant, course name, recognized hours, recognition date, and handler and reviewer signatures correspond | Check whether the recognized hours are consistent with the quantity in the study certificate, and check whether the handler and reviewer signatures are complete |
| User selection node | Whether options and branch connections correspond one by one, whether the interaction status is recorded, and whether the selection result variable is passed to subsequent nodes | Check options and branch connections one by one in the node, trigger it once and view the node status in the run record, reference `variables` in subsequent nodes and run a trial, and confirm the `nodeId` correspondence |

## Three common errors

- Phenomenon: For the same record, the course name and hour quantity in the course filing form and the study certificate do not match. Cause: the two materials are filled out in different steps, and the conventions have not been unified.
- Phenomenon: The version of the hour recognition form is not synchronized, and the recognized hours are inconsistent with the latest study certificate. Cause: after the materials were updated, they were not compared again, and the old version is still in use.
- Phenomenon: The study certificate lacks the signature of the issuing unit or the receipt, but the intake record still flows as complete materials. Cause: missing-item identification was not intercepted in the follow-up step, and signature verification was skipped.

## How to verify the setup

This function's acceptance: run trials for each option one by one, check the branch direction and interaction status in the run record, confirm that options and branch connections correspond one by one, that the selection result variable has been passed to subsequent nodes, and that the `variables` and `nodeId` references are correct.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- In the user selection node, check options and branch connections one by one, trigger it once, and then view the node status and branch direction in the run record.
- In subsequent nodes, reference the selection result variable and run a trial once, confirm the `variables` value and the `nodeId` correspondence, and check whether missing-item follow-up occurs before answering.
