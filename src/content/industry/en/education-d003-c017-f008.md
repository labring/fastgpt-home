---
title: Workflow Orchestration for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c017-f008
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Workflows | Intake
meta_description: Undergraduate Programs: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information

## What this category's data looks like

Undergraduate program setup and dynamic adjustment involves three types of materials: program setup application forms, talent training plans, and expert demonstration opinions. Application forms come from college submissions, submitted centrally by academic year, with fields including program name, code, degree-granting category, length of study, and signature and date of the person in charge; training plans are updated synchronously by the teaching and research office along with the application, with fields including course modules, credits and class hours, and the proportion of practical components; expert demonstration opinions are issued by off-campus expert groups, with fields including demonstration conclusions, expert list, signatures, and receipts. When the three types of materials enter question-answering intake, their roles differ: the application form serves as the main record to locate the program entry, the training plan verifies course and credit fields, and the expert demonstration opinions verify signatures and demonstration dates. The update rhythm is concentrated during application season and rolling during adjustment season, and the field characteristics are multi-table crossover with dense signatures and dates, making it prone to inconsistencies in the same record's name, quantity, and date.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the program name, code, length of study, and signature and date of the person in charge are complete, and whether they are consistent with the same record in the training plan and expert demonstration opinions | Check the options and branch connections one by one in the node, trigger once to view the node status in the run records, reference `variables` in subsequent nodes, and run a trial once |
| Talent training plan | Whether the course modules, credits and class hours, and proportion of practical components match the program name, quantity, and date filled in the application form, and whether the version is synchronized | Compare the name and date fields of the two materials, check the version number and update date, and confirm there is no unsynchronized old draft |
| Expert demonstration opinions | Whether the demonstration conclusions, expert list, signatures, and receipts are complete, and whether the demonstration date connects with the application form date | Check the signature fields and receipts item by item, record missing items as the basis for follow-up questions, and check the branch direction corresponding to `nodeId` |
| Intake records and items to be completed | Whether missing items are identified and followed up on, whether answers have material basis, and whether they are transferred to the handler | Check the follow-up items and material sources in the interaction state records, and confirm that the branch direction points to handler processing |

## Three common errors

- Phenomenon: The name, quantity, and date of the same program do not match between the application form and the training plan. Cause: The two materials are filled in successively by different roles, and intake proceeds without cross-comparison.
- Phenomenon: The version of the expert demonstration opinions is not synchronized, and signatures on an old draft are treated as valid basis. Cause: The update rhythm is rolling adjustment, and the version number and update date are not verified together with the materials.
- Phenomenon: The expert demonstration opinions lack signatures or receipts, and follow-up questions are not triggered before answering continues. Cause: Missing-item identification does not cover the signature and receipt fields, and the interaction state does not record the missing item.

## How to verify the setup

Acceptance for this feature: run trials option by option, check the branch directions and interaction states in the run records, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Check the options and branch connections one by one in the node, trigger the user selection node once, and view the node status and branch direction in the run records.
- Reference `variables` and `nodeId` in subsequent nodes and run a trial once, checking whether the follow-up items have material basis and whether they are transferred to the handler.
