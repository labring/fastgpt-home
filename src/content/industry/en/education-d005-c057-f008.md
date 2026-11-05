---
title: Workflow Orchestration for National Key Research and Development Applications: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Versions
meta_description: National R&D Grants: review workflows for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the National Key R&D Program project application scenario, where materials include three types: the project application form, the budget application form, and the cooperation agreement. The project application form provides research objectives, task decomposition, and assessment indicators; the budget application form provides funding categories, calculation basis, and annual disbursement; the cooperation agreement provides the division of labor among participating units, intellectual property, and signing information. The three types of materials are revised multiple times during the application cycle, with dense fields, and dates, names, quantities, amounts, signatures, and receipts must be aligned item by item. After the materials enter the workflow, the user first selects a node to confirm which type of material is currently being processed and the version source, then proceeds to subsequent nodes to complete the version ledger and change records. The update rhythm advances according to the application stages: pre-application, formal application, budget review, and agreement signing may each trigger changes, and it is necessary to keep the current version unique, old versions traceable, and references synchronized.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "version ledger and change records" are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the names, dates, quantities, and signatures are consistent with the budget application form and cooperation agreement | Compare item by item the names, quantities, dates, and signature fields of the same record across the three materials, and check the version number and reference locations |
| Budget application form | Whether the funding categories, calculation basis, and annual disbursement align with the task period in the project application form | Check the correspondence between budget categories and task decomposition, and verify whether the date range and disbursement nodes are consistent with the application form |
| Cooperation agreement | Whether the names of participating units, division of labor, intellectual property clauses, and signing receipts are complete | Check the agreement signature page, seals, and receipts, and confirm that the names of participating units are consistent with the application form and budget form |
| User selection node | Whether each option corresponds to one branch, and whether the interaction state and selection result variables are recorded and passed on | Check the options and branch connections one by one in the node, trigger it once to view the node state in the run records, reference `variables` in subsequent nodes, and do a trial run |

## Three common errors

- Phenomenon: The same participating unit is written differently in the project application form and the cooperation agreement. Cause: The materials are maintained separately, field-level comparison is not performed against the current version as the baseline, and reference synchronization is missing.
- Phenomenon: The date in the budget application form does not match the task period in the project application form. Cause: The versions are not synchronized, old content continues to be referenced, and the change records do not cover this field.
- Phenomenon: The cooperation agreement lacks a signature or receipt, and the application materials are returned. Cause: The signing step is not included in the version ledger, the receipt status is not updated with changes, and it cannot be traced during verification.

## How to verify the setup

Feature acceptance: Try each option one by one, check the branch direction and interaction state in the run records, and confirm that `nodeId` and `variables` can be referenced in subsequent nodes.

Business test: Change one piece of content, see whether the version number and references are updated synchronously, and confirm that the current version is unique and old versions are traceable.

- Check the options and branch connections one by one in the user selection node, trigger it once, and then view the node state and branch direction in the run records.
- Reference `variables` in subsequent nodes and do a trial run to confirm that the selection result has been passed on; at the same time, check the names, quantities, dates, and signature receipts of the project application form, budget application form, and cooperation agreement.
