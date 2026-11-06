---
title: Workflow Orchestration for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c003-f008
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Workflows | Intake
meta_description: Child Health and Meals: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for this category fall into four types: food procurement and acceptance documents (including name, specification, batch), retention sample records (retention time and batch), disinfection records (disinfection period and area), and absence and cause registration (cause categorization). These materials are produced separately by the health office and the canteen, updated daily, with fields keyed primarily by time, batch, and category. When entering the Q&A intake and missing-item follow-up function, procurement documents and retention sample records take on the batch verification role, recipes and procurement categories take on the consistency verification role, disinfection records take on the period completeness role, and absence registration takes on the cause categorization role. When materials are incomplete, the intake step first forms items pending follow-up, and subsequent nodes then continue processing by branch.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. "Intake records and completed follow-up items" are then completed by subsequent nodes continuing execution by branch. Triggering the user selection node puts the conversation into an interactive state and records the workflow state; after the selection is completed, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Food ingredient name and specification | Whether the procurement document and recipe category are consistent | Compare the procurement document and recipe entries one by one, checking name, specification, and category; check the options and branch connections one by one in the node to confirm the branch direction |
| Retention sample time and batch | Whether the document and retention sample batch match | Compare the document against the batch number and retention sample time, and mark inconsistent items; reference `variables` in a subsequent node and run a trial once to check whether the selection result variable is passed in |
| Disinfection period | Whether the disinfection record is missing a period | Check the disinfection record against the period list and mark missing periods; trigger a node once and view the node status and `nodeId` in the run record |
| Absence cause categorization | Whether the cause categorization is identifiable | Check the cause categorization field against the registration form, and list missing items for follow-up; reference the selection result variable in a subsequent node to confirm that execution continues by branch |

## Three common errors

- Symptom: the document and retention sample batch do not match. Cause: retention sample records are registered by batch, while procurement documents are registered by date; no batch mapping was made between the two, so missing items were not identified at intake.
- Symptom: the recipe and procurement category are inconsistent. Cause: recipes are organized by week, while procurement orders are placed by day; category names and specification standards differ, and entries were not checked one by one during comparison.
- Symptom: the disinfection record is missing a period. Cause: disinfection periods are registered separately by area, the registration form does not cover all periods, and missing periods were not asked about at intake.

## How to verify the setup

This function's acceptance: run trials for each option one by one, and check the branch direction and interaction state in the run record; confirm that each option corresponds to one branch, that the process continues after the interaction is completed, and that the same session does not enter the interaction repeatedly.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering; the follow-up items should fall on food ingredient name and specification, retention sample time and batch, disinfection period, and absence cause categorization.

- In the node, check the options and branch connections one by one, confirm that each option corresponds to one branch, and trigger once to view the node status in the run record.
- In a subsequent node, reference `variables` and `nodeId` and run a trial once to confirm that the selection result variable has been passed in and that execution continues by branch.
