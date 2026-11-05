---
title: Workflow Orchestration for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c008-f008
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Workflows | Intake
meta_description: School Admissions: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page is for primary and secondary school admissions organizations. The materials come from admissions plans, application material checklists, and admission lists. Admissions plans are published by academic year and include time nodes, batches, and admission rules; application material checklists are updated with the application stage and include household registration, property, student status fields, and signature fields; admission lists are finalized after the batch ends and include name, ID number, admission status, and receipt. When the three types of materials enter workflow orchestration, their roles differ: the admissions plan provides the basis for branches and the source of question items, the application material checklist handles missing-item identification and follow-up targets, and the admission list serves as the object for result comparison and signature receipt verification. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record across materials often shows inconsistencies in name spelling, quantity definitions, and date order, and unsynchronized versions and missing signature receipts are also common.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction status records. The "intake records and completed question items" are continued by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| User selection node | Each option corresponds to one branch; the options and branch connections are checked one by one in the node | Check the options and branch connections one by one in the node, run a test, and then view the node status in the run record |
| Admissions plan | Whether the batch, date, and admission rule fields in the plan are consistent with the dates and signatures in the application material checklist and admission list | Extract the date and rule fields of the same record, and compare the date order and signature fields across the two materials |
| Application material checklist | Whether the name, quantity, and date fields in the checklist match the corresponding records in the admission list | Compare the two materials item by item by name and quantity, and mark records missing signatures or receipts |
| Admission list | Whether the name, ID number, admission status, and receipt in the list are version-synchronized with the admissions plan and application material checklist | Check the list version number and receipt signature, and confirm they are the same version as the plan and checklist |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the application material checklist and the admission list. Cause: The two materials are maintained separately, and cross-material field comparison and unified definitions have not been done.
- Phenomenon: After the admissions plan is updated, the application material checklist and admission list still reference the old version. Cause: Versions are not synchronized, and there is no step to check the version number and effective date.
- Phenomenon: The admission list is missing a signature or receipt but still enters subsequent processing. Cause: Signature and receipt fields are not included in missing-item identification, and the follow-up step does not cover this question item.

## How to verify the setup

Feature acceptance: run a test for each option and check the branch direction and interaction status in the run record; reference `variables` and `nodeId` in subsequent nodes to confirm that the selection result variable has been passed in and execution continues along the corresponding branch.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering; if it answers directly without asking a follow-up question, then missing-item identification and follow-up questions are not in effect.

- In the user selection node, check the options and branch connections one by one, run a test once, and view the node status and branch direction in the run record.
- In subsequent nodes, reference the selection result variable, check whether `variables` and `nodeId` are passed in according to the branch, and compare the name, quantity, date, and signature fields of the admissions plan, application material checklist, and admission list.
