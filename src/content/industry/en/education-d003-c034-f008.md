---
title: Workflow Orchestration for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c034-f008
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Workflows | Intake
meta_description: Skills Certification: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

The intake materials for social evaluation of vocational skill level certification mainly consist of the evaluation implementation plan, candidate registration form, and assessor dispatch form. Their sources are submission by the applying unit and internal circulation archiving, and their update cadence changes with batch rolling, version iteration, and supplementary-document receipts. The evaluation implementation plan contains the occupational direction, level, assessment method, date, and approval signature; the candidate registration form contains identity information, declared level, material checklist, and the person's own signature; the assessor dispatch form contains the assessor's name, number, dispatch date, and institutional seal. When the three types of materials enter workflow orchestration, their roles differ: the implementation plan provides the rules and branching basis, the registration form provides individual question items and missing-item clues, and the dispatch form provides an entry point for checking consistency of personnel and dates. Field characteristics are concentrated in names, quantities, dates, signatures, and receipts, and the same record across materials is prone to mismatches or unsynchronized versions.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "intake record and items to be completed" are continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| User selection node | Each option corresponds to one branch; options and branch connections are checked one by one | Check the options and branch connections one by one in the node; after a trial run, inspect the branch direction and interaction status in the run record |
| Evaluation implementation plan | Name, quantity, date, and signature are consistent between the plan and the registration form; the version is synchronized and there is a receipt | Compare the occupational direction, level, date, and approval signature of the plan and the registration form; check the version number and receipt |
| Candidate registration form | Declared level, material checklist, and signature are complete, and there is no conflict with the dispatch form dates | Check the registration form fields and signature item by item; spot-check whether the dates and quantities match those in the dispatch form |
| Assessor dispatch form | Assessor name, number, dispatch date, and institutional seal are complete and consistent with the plan | Check the dispatch form seal and date; reference `variables` and `nodeId` to locate values retrieved by subsequent nodes |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record do not match between the implementation plan and the registration form. Cause: the two are entered separately and no cross-material comparison is performed, and the versions are not synchronized.
- Phenomenon: after the interaction is completed, the process stops or still follows the default branch. Cause: options and branch connections were not checked one by one, and the selection result variable was not passed correctly.
- Phenomenon: materials lack a signature or receipt, and the same session repeatedly enters the interaction. Cause: the intake status is not updated with supplementary documents, and receipts are not archived, causing repeated triggering.

## How to verify the setup

This feature's acceptance: run a trial for each option one by one, check the branch direction and interaction status in the run record, confirm that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` in a subsequent node to run once more.

Business test: submit a question that lacks key information and see whether it asks a follow-up question before answering.

- Check the options and branch connections one by one in the node; after triggering once, inspect the node status and branch direction in the run record.
- Reference the selection result variable in a subsequent node and run a trial to check whether the intake record and items to be completed continue to be generated according to the branch.
