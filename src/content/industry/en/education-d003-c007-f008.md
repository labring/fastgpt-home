---
title: Workflow Orchestration for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c007-f008
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Workflows | Intake
meta_description: School Enrollment: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on primary and secondary school student status establishment and changes. The materials come from three categories: student status archives, transfer applications, and leave-of-absence/resumption materials. Student status archives are registered by the school and contain students' basic information, guardians, photos, and student status numbers, with fields anchored by dates and signatures; transfer applications are submitted by parents or guardians and contain the transferring-in and transferring-out schools, grade, change type, and seals from both parties; leave-of-absence/resumption materials contain the application reason, start and end dates, medical certificates, and approval signatures. The update rhythm follows semesters and change nodes: new student record creation is concentrated in autumn, transfers mostly occur at the beginning and end of semesters, and leave-of-absence/resumption occurs along with personal leave and sick leave. When the three categories of materials enter this feature, student status archives provide the main record, while transfer applications and leave-of-absence/resumption materials provide the basis for changes; field characteristics manifest as names, quantities, dates, signatures, and receipts requiring cross-comparison, and missing items and version inconsistencies are the main objects identified during the acceptance stage.

## Configuration and implementation checks

A. This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction status records. "Acceptance records and items to be completed" are continued and completed by subsequent nodes according to the branches. When a node is triggered, the conversation enters an interactive state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status archive | Whether the name, date, and signature are consistent with the transfer application | Compare the name, student status number, date of birth, and approval signature in the two materials field by field, and record discrepancies |
| Transfer application | Whether the transferring-out and transferring-in schools, grade, change type, and sealed receipt are complete | Check the school names, grade, change type, and seals from both parties in the application form; list missing items in the follow-up question list |
| Leave-of-absence/resumption materials | Whether the application reason, start and end dates, medical certificate, and approval signature match | Compare the date range, reason description, and signature in the leave-of-absence/resumption application and the medical certificate; if the receipt is missing, mark it for follow-up questioning |
| Options and branches | Whether each option corresponds to one branch connection | Check the options and branch connections one by one in the node, trigger once, and view the node status in the run record |

## Three common errors

- Symptom: The same student's name or student status number does not match between the student status archive and the transfer application. Cause: The two materials were entered by different handlers, versions were not synchronized, and field-level comparison was not performed during acceptance.
- Symptom: The start and end dates of the leave-of-absence/resumption materials are inconsistent with the date range of the medical certificate. Cause: The application reason or dates were not backfilled into the other material after modification, and missing signatures or receipts resulted in insufficient basis.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, or the same session repeatedly entered the interaction, causing the status not to refresh.

## How to verify the setup

Feature acceptance: trial-run each option one by one, check the branch direction and interaction status in the run record, confirm that options and branches correspond one-to-one, and reference `variables` and `nodeId` in subsequent nodes for one trial run.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering; for example, provide only the name without the student status number and change type, and observe whether it first asks about the missing items before entering acceptance.

- Check the options and branch connections one by one in the node, trigger one interaction, and view the node status and branch direction in the run record.
- Reference `variables` and `nodeId` in subsequent nodes, trial-run once to confirm that the selection result variable has been passed, and record the tokens and array length of the referenced text.
