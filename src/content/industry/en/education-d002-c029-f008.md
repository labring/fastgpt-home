---
title: Workflow Orchestration for Vocational College Curriculum Planning: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c029-f008
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Workflows | Checks
meta_description: Vocational Curricula: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Vocational College Curriculum Planning: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three core types of materials: talent cultivation programs, course standards, and job competency analysis forms. Talent cultivation programs are drafted under the leadership of the academic affairs department and revised on a rolling basis by academic year; their fields include program name, number of courses, class hours and credits, and signature fields. Course standards are updated in sync with the programs; their fields include course name, number of class hours, assessment method, date, and signature. Job competency analysis forms come from enterprise research; their fields include job name, number of competency items, research date, and receipt. After the three types of materials enter the workflow, the talent cultivation program serves as the main record, while the course standards and job competency analysis forms serve as comparison materials, each carrying name, quantity, date, and signature fields for item-by-item comparison by subsequent nodes.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option. The "discrepancy list" is completed by subsequent nodes continuing execution along the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Whether the program name, number of courses, class hours and credits, signature fields, and date are consistent with the ledger | Check the options and branch connections one by one in the node; after triggering once, view the node status in the run record |
| Course standard | Whether the course name, number of class hours, assessment method, date, and signature are consistent with the corresponding records in the talent cultivation program | Reference the selection result variable in a subsequent node and run a trial once; check the branch direction |
| Job competency analysis form | Whether the job name, number of competency items, research date, and receipt are consistent with the corresponding records in the course standard | Use `nodeId` in the node to locate the branch; check whether the options and branch connections correspond one by one |
| Discrepancy list | Whether the name, quantity, and date of the same object are consistent across the two materials, and whether the versions are in sync | Reference `variables` in a subsequent node and run a trial; confirm the branch direction and interaction state record |

## Three common errors

- Symptom: The course name and number of class hours for the same record do not match between the talent cultivation program and the course standard. Cause: The versions of the two materials are not in sync, and the course standard still uses the old fields.
- Symptom: The research date and receipt of the job competency analysis form are missing, and the signature field is blank. Cause: The receipt was not collected during the material circulation step, so the fields were incomplete when entering the workflow.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

This feature's acceptance: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and after the interaction is completed, continue execution according to the corresponding option.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature, and after locating the discrepancy, hand it to the reviewer for confirmation and write it back.

- Check the options and branch connections one by one in the node; after triggering once, view the node status in the run record.
- Reference `variables` and `nodeId` in a subsequent node and run a trial once; confirm that the selection result variable has been passed and the branch direction is correct.
