---
title: Workflow Orchestration for University Laboratory Safety Classification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c064-f008
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Workflows | Intake
meta_description: Lab Safety Categories: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for University Laboratory Safety Classification: Handle Questions and Collect Missing Information

## What this category's data looks like

University laboratory safety grading and classification revolves around three types of materials: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table provides the laboratory name, room number, category level, and determination date; the hazard source list sets out the names, quantities, storage locations, and update dates of chemicals, gas cylinders, equipment, and biological samples; the safety responsibility statement records the responsible person and signature, and the receipt date. The sources of the materials are department submissions, laboratory self-inspections, and management department consolidation; the update rhythm is centralized revision each academic year, with reporting and updating as changes occur when hazard sources change. When entering this function, the grading and classification table serves as the basis for determining the laboratory entity's level, the hazard source list serves as the basis for comparing risk items and quantities, and the safety responsibility statement serves as the compliance basis for responsibility attribution and signature receipts; together, the three support the generation of intake records and follow-up questions to be completed.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "intake records and follow-up questions to be completed" are continued and completed by subsequent nodes according to the branches.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the name, room number, category level, and determination date are consistent with the hazard source list, and whether signatures and receipts are complete | Compare the laboratory names and room numbers in the two materials row by row, check the determination date and signature column, and use `variables` to record the comparison results |
| Hazard source list | Whether the hazard source name, quantity, storage location, and update date match the grading and classification table, and whether the versions are synchronized | Extract the same hazard source record, check the three items of name, quantity, and date, and check the correspondence between the version number and `nodeId` |
| Safety responsibility statement | Whether the responsible person and signature, and the receipt date, are complete, and whether it covers all laboratories listed in the grading and classification table | Check signatures and receipts one by one by laboratory, register missing items as follow-up questions to be completed, and record the status as parsed |
| User selection node | Whether each option corresponds to one branch, whether the interaction status is recorded, and whether the selection result variable is passed to subsequent nodes | Check the options and branch connections one by one in the node, trigger it once and then check the run record, and reference `variables` and `nodeId` in subsequent nodes for a trial run |

## Three common errors

- Phenomenon: The name, quantity, and date of the same laboratory do not match between the grading and classification table and the hazard source list. Cause: The two materials are reported separately, and no merging and checking by the same name and same number has been done.
- Phenomenon: The hazard source list has been updated, but the grading and classification table still references the old version. Cause: The versions are not synchronized, and the step of comparing update dates and version numbers is missing.
- Phenomenon: The safety responsibility statement lacks a signature or receipt, but it still enters the handling step. Cause: At intake, signatures and receipts were not listed as mandatory fields to check.

## How to verify the setup

Acceptance of this function: run trials option by option, check the branch directions and interaction status in the run records, and confirm that each option corresponds to one branch, that the status is recorded, and that `variables` and `nodeId` have been passed to subsequent nodes.

Business test: submit a question that lacks key information and see whether it asks a follow-up question first before answering.

- In the user selection node, check the options and branch connections one by one, trigger it once, and then view the node status and branch directions in the run record.
- Reference `variables` and `nodeId` in subsequent nodes for a trial run once, and confirm that the selection result has been passed and that the process continues to execute.
