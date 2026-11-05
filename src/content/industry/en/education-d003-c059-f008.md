---
title: Workflow Orchestration for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c059-f008
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Workflows | Intake
meta_description: Research Finance: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information

## What this category's data looks like

This page's category materials are three types: research funding budget adjustment applications, reimbursement forms, and contract invoices. The sources are project team submissions and finance system exports, and the update rhythm is batch submission and synchronization by process node. Field characteristics include name, quantity, date, signature, and receipt. When a budget adjustment application enters this function, it serves as the intake starting point, while reimbursement forms and contract invoices serve as supplementary verification materials. The name, quantity, and date of the same record across materials must be aligned item by item; when versions are not synchronized or signatures/receipts are missing, the intake record must mark the missing items and follow up.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. "Intake records and follow-up questions for completion" are continued and completed by subsequent nodes according to the branch. When a node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Fields, dates, and signatures must align with the reimbursement form and contract invoice | Check the name, quantity, date, and signature in the application; when items are missing, mark them in the intake record and follow up; reference `variables` to record the selection result |
| Reimbursement form | The name, quantity, and date of the same record do not match across the two materials | Compare the name, quantity, and date of the reimbursement form and contract invoice item by item; when versions are not synchronized or signatures/receipts are missing, mark the missing items and follow up |
| Contract invoice | When signatures or receipts are missing, follow-up is required | Check the completeness of the contract invoice's signatures and receipts, verify the options and branch connections at the node corresponding to `nodeId`, and confirm the direction of the follow-up branch |
| User selection node | Each option corresponds to one branch | Trigger once, check the node status in the run record, and confirm that the interaction state is recorded and the selection result variable has been passed to subsequent nodes |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match across the two materials. Cause: Materials are submitted in batches, fields are not aligned item by item, and missing items are not marked at intake.
- Phenomenon: Versions are not synchronized, and the contents of the reimbursement form and contract invoice are inconsistent. Cause: The update rhythms differ, the old version is still circulating in the process, and follow-up is not triggered.
- Phenomenon: Signatures or receipts are missing, but the process still continues. Cause: After the interaction state is recorded, follow-up is not performed according to the missing-item branch, and the selection result variable is not passed to subsequent nodes.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch direction and interaction state in the run record, confirm that `variables` and `nodeId` correspond correctly, and that the selection result variable has been passed to subsequent nodes.

Business test: submit a question missing key information, and see whether it follows up first before answering, and whether the answer is based on materials.

- In the node, check the options and branch connections one by one, trigger once, and view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch direction is consistent with the interaction state record.
