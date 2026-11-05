---
title: Workflow Orchestration for Exam Organization and Misconduct Handling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c039-f008
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Workflows | Checks
meta_description: Exam Administration: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Exam Organization and Misconduct Handling: Compare Documents and Locate Differences

## What this category's data looks like

This category involves three types of materials: the examination manual, the examination room record sheet, and the disciplinary fact record. The examination manual comes from the examination administration department and is updated per examination session; its fields include process nodes, time requirements, and responsible positions. The examination room record sheet is filled out on site by invigilators and is generated per examination session; its fields include examination room number, number of candidates expected, number of candidates present, list of absentees, and invigilator signature. The disciplinary fact record is filled out by invigilators or inspection personnel and is generated per incident; its fields include candidate name, admission ticket number, time of the disciplinary violation, circumstances of the disciplinary violation, basis for determination, and signed receipt. When the three types of materials enter workflow orchestration, their roles differ: the examination manual serves as the rule reference, the examination room record sheet serves as the process ledger, and the disciplinary fact record serves as the object to be verified. Together, the three support the consistency determination of the name, quantity, and date of the same record across two materials.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Examination manual | Whether the fields, dates, and signatures are consistent with the examination session requirements | Check the options and branch connections one by one in the node, compare the process nodes and time requirements, and record the version number and effective examination session |
| Examination room record sheet | Whether the name, quantity, and date of the same record match across the two materials | Trigger a user selection node once, view the node status in the run record, and verify the number of candidates expected, the number of candidates present, and the list of absentees |
| Disciplinary fact record | Whether the time of the disciplinary violation, circumstances, basis for determination, and signed receipt are complete | Reference the selection result variable in a subsequent node and run a trial once, and verify the admission ticket number, time of the disciplinary violation, and signed receipt |
| Discrepancy list | Whether the branch direction and interaction state record are complete | Verify the passing of `variables` and `nodeId` in the branch, confirm that the discrepancy fields have been marked and handed to the reviewer for confirmation |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the examination room record sheet and the disciplinary fact record. Cause: The two materials are entered separately, lacking field-by-field comparison and discrepancy marking.
- Phenomenon: The version of the examination manual is not synchronized, and old process nodes are still referenced. Cause: After the material is updated, the version number and effective examination session are not checked in the node.
- Phenomenon: The disciplinary fact record lacks a signature or receipt but still enters subsequent branches. Cause: The branch conditions do not treat the signed receipt as a mandatory verification item, and the interaction state record does not intercept it.

## How to verify the setup

Feature acceptance: Run trials option by option, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and check whether `variables` and `nodeId` can be referenced in subsequent nodes.

Business test: Use a real record to find fields inconsistent with the ledger, verify the name, quantity, date, and signature across the examination manual, examination room record sheet, and disciplinary fact record, form a discrepancy list, hand it to the reviewer for confirmation, and write it back.

- Check the options and branch connections one by one in the node, trigger a user selection node once, view the node status in the run record, and confirm that the process continues downward after the interaction is completed.
- Reference the selection result variable in a subsequent node and run a trial once, verify the passing of `variables` and `nodeId`, and confirm that the discrepancy fields have been marked and handed to the reviewer for confirmation and write-back.
