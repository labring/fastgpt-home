---
title: Workflow Orchestration for School Teacher Training Credits: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c013-f008
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Workflows | Checks
meta_description: Teacher Credits: review workflows for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Teacher Training Credits: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on credit management for primary and secondary school teacher training. The material sources are training notices, credit recognition forms, and participant lists, and the update cadence advances by project batch and semester milestones. Field characteristics center on teacher name, ID number, course name, number of class hours, training date, and signature and receipt columns. When entering the material verification and discrepancy location function, the training notice serves as the baseline for course and date, the credit recognition form serves as the basis for credit quantity and recognition conclusion, and the participant list serves as the basis for personnel scope and attendance. The three must complete field-level comparison within the same workflow, locating issues in the same record across two materials such as inconsistent names, quantities, or dates, unsynchronized versions, or missing signatures or receipts, forming a discrepancy list for the reviewer to confirm and write back.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch direction and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Course name, training date, and number of class hours must match the credit recognition form item by item | Check the course name, start and end dates, and number of class hours in the notice, verify options and branch connections one by one in the node, and record `nodeId` and `variables` |
| Credit recognition form | Teacher name, credit quantity, recognition date, and signature column must match the participant list item by item | Check the name, credit quantity, recognition date, and signature column in the recognition form, and trigger one viewing of the node status in the run records |
| Participant list | Teacher name, attendance date, and receipt status must match the training notice item by item | Check the name, attendance date, and receipt status in the list, reference the selection result variable in subsequent nodes, and run a test once |
| Discrepancy list | When the name, quantity, or date of the same record does not match across two materials, each item must be listed individually | Generate entries by object, field, material source, and discrepancy type, and submit them to the reviewer for confirmation and write-back |

## Three common errors

- Phenomenon: The same teacher name is written differently in the credit recognition form and the participant list, causing the record to fail to match. Cause: The name format was not unified when the two materials were entered, and field-level comparison was missing.
- Phenomenon: The date in the training notice does not match the date in the credit recognition form, and the number of class hours deviates accordingly. Cause: The versions were not synchronized, the old notice was still in circulation, and the interaction status record was not triggered.
- Phenomenon: The credit recognition form lacks a signature or the participant list lacks a receipt, and the discrepancy list cannot be closed. Cause: The signature and receipt fields were not validated during material collection, and missing items were not located before review.

## How to verify the setup

This function's acceptance: run a test for each option one by one, check the branch direction and interaction status in the run records, confirm that `variables` has been passed to subsequent nodes and that `nodeId` corresponds to the correct branch, record the number of references according to the array length, and verify `quoteMaxToken` separately for reference text tokens.

Business test: use one real record to find fields inconsistent with the ledger, compare the training notice, credit recognition form, and participant list by the same teacher name and training date, locate discrepancies in name, quantity, and date, and write them into the discrepancy list.

- In the user selection node, verify options and branch connections one by one to ensure each option corresponds to one branch, and trigger one viewing of the node status in the run records
- Reference the selection result variable in subsequent nodes and run a test once to confirm that the process continues downward after the interaction is completed, and that unselected options do not enter the default branch
