---
title: Workflow Orchestration for University Laboratory Safety Classification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c064-f008
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Workflows | Checks
meta_description: Lab Safety Categories: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for University Laboratory Safety Classification: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of materials: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table is updated by the Laboratory and Equipment Management Office on an academic-year basis, with fields including laboratory number, name, hazard level, and responsible person; the hazard source list is reported by each laboratory monthly or quarterly, with fields including hazard source name, quantity, storage location, and control measures; the safety responsibility statement is signed by the department and the laboratory head, with fields including responsibility period, signature, date, and receipt. When the three types of materials enter this feature, their roles differ: the grading and classification table serves as the master ledger, the hazard source list serves as the basis for verifying quantities and names, and the safety responsibility statement serves as the basis for verifying signatures and dates. Material versions are often misaligned due to differing update rhythms, so their respective version numbers and effective dates must be confirmed before verification.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "discrepancy list" is then completed by subsequent nodes continuing execution along the branch. When a node is triggered, the conversation enters an interaction state and the workflow state is recorded; after the user completes the selection, execution continues along the branch corresponding to the chosen option.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Check whether the laboratory number, name, hazard level, and responsible person are consistent with the hazard source list | Compare the laboratory numbers and names in the two materials one by one, and flag records with inconsistent names |
| Hazard source list | Check whether the hazard source name, quantity, storage location, and date are consistent with the corresponding records in the grading and classification table | Extract the hazard source names and quantities, compare them item by item against the grading and classification table, and record quantity discrepancies |
| Safety responsibility statement | Check whether the responsibility period, signature, date, and receipt are complete and consistent with the responsible person in the grading and classification table | Check the signature field and date field, and flag records missing a signature or missing a receipt |
| User selection node | Check whether options and branch connections correspond one-to-one, and whether the interaction state is recorded | Check the options and branch connections one by one in the node, and trigger it once to view the node state in the run records |

## Three common errors

- Symptom: the name or quantity of the same laboratory does not match between the grading and classification table and the hazard source list. Cause: the two materials were filled in by different personnel at different times, without version comparison.
- Symptom: the safety responsibility statement is missing a signature or receipt, and the responsibility period is inconsistent with the date in the grading and classification table. Cause: the signing process was not closed-loop, receipts were not archived, and versions were not synchronized.
- Symptom: after selecting an option, the default branch is still taken, and the process stalls after the interaction completes. Cause: options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Feature acceptance: test-run each option one by one, and check the branch direction and interaction state in the run records; confirm that each option corresponds to one branch, that `variables` has been passed to subsequent nodes, and that `nodeId` is queryable in the run records.

Business testing: use one real record to find fields inconsistent with the ledger, and submit the discrepancy list to the reviewer for confirmation and write-back.

- Check the options and branch connections one by one in the node, and trigger it once to view the node state in the run records
- Reference the selection result variable in a subsequent node and test-run it once to confirm that the branch direction is consistent with the interaction state record
