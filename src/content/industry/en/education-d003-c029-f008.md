---
title: Workflow Orchestration for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c029-f008
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Workflows | Intake
meta_description: Vocational Curricula: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of formulating talent cultivation plans in vocational colleges. The materials include three categories: talent cultivation plans, course standards, and job competency analysis tables. The talent cultivation plan is the main document, while the course standards and job competency analysis tables enter the workflow as supporting evidence. The material sources are the college's academic affairs office, secondary schools, and specialized teaching and research offices. The update cadence changes with specialty adjustments, curriculum reforms, and annual revisions, and submissions commonly cluster before the start of the semester. Field characteristics center on names, quantities, dates, and signatures: plan names, course names, and job names must be consistent; class hour quantities and credit quantities must match; preparation dates, approval dates, and implementation dates must be coherent; and the signatures and receipts of the preparer, reviewer, and person in charge must be complete. When these three material categories enter this function, the talent cultivation plan assumes the role of the main record, while the course standards and job competency analysis tables assume the role of comparison and supplementary evidence, used to identify missing items and trigger follow-up questions.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are then completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes a selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation plan | Whether the name, quantity, date, and signature are consistent with the course standards and job competency analysis table | Check item by item the plan name, class hour quantity, preparation and approval dates, signatures, and receipts; verify the options and branch connections one by one in the node |
| Course standards | Whether the course name, class hour quantity, and version date match the talent cultivation plan | Reference `variables` to compare course names and quantities, check whether the version is synchronized, and trigger follow-up questions when items are missing |
| Job competency analysis table | Whether the job name, competency entries, signatures, and receipts are complete | Check the job name and the number of competency entries, check signatures and receipts, and record `nodeId` to locate the source when items are missing |
| User selection node | Whether each option corresponds to one branch, and whether the selection result variable is passed to subsequent nodes | Verify the options and branch connections one by one in the node, and trigger one run to view the node status in the run records |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the talent cultivation plan and the course standards. Cause: The two materials were revised separately and entered intake without cross-checking.
- Phenomenon: The course standard version is not synchronized, and the old version's class hour quantity is still referenced. Cause: After the version update, the main document was not written back, and the material version number and date were not linked.
- Phenomenon: The job competency analysis table lacks a signature or receipt but is still allowed through after intake. Cause: Missing-item identification did not cover the signature field, and the follow-up step was not triggered.

## How to verify the setup

This function's acceptance: trial-run each option one by one, check the branch direction and interaction state in the run records, confirm that the selection result variable has been passed to subsequent nodes, and check the reference relationships of `variables` and `nodeId`.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Verify the options and branch connections one by one in the node, and trigger one run to view the node status in the run records.
- Reference the selection result variable in a subsequent node and trial-run once to confirm that the branch direction is consistent with the interaction state record.
