---
title: Workflow Orchestration for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c009-f008
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Workflows | Checks
meta_description: Dropout Prevention: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Compulsory Education Dropout Prevention: Compare Documents and Locate Differences

## What this category's data looks like

In the compulsory education dropout prevention and school retention scenario, materials mainly come from three categories: dropout risk ledgers, return-to-school persuasion records, and home visit records. The ledger is established centrally at the beginning of each semester, persuasion records are updated immediately with each persuasion action, and home visit records are archived in batches according to the pace of household visits. Field characteristics center on student name, class, date, number of persuasion attempts, signature, and receipt status. The ledger is the primary object, serving as the anchor for student identity and risk level; persuasion records are process materials, providing the time and result of each action; home visit records are supporting materials, supplementing family communication and signed receipts. After the three types of materials enter the workflow, they are first aligned by student name and date, then field by field the name, quantity, and date are checked for consistency, and version synchronization and signature/receipt completeness are checked.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. The "discrepancy list" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether the student name, class, risk level, date, and signature fields are complete and consistent with the persuasion records | Check options and branch connections one by one in the user selection node, reference `variables` to view the selection result variable, and trigger one interaction status record |
| Persuasion records | Whether the name, quantity, and date for the same student match across the two materials, and whether the versions are synchronized | Reference `nodeId` in subsequent nodes to locate the record, compare name, quantity, and date field by field, and mark discrepant fields |
| Home visit records | Whether signatures and receipts are missing, and whether dates are consistent with the ledger and persuasion records | Align the three materials by student name and date, check the signature and receipt fields, and output a discrepancy list |
| Discrepancy list | Whether discrepant fields can be located to specific materials and records | Submit the discrepancy list to the reviewer for confirmation and write back, recording the review result |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match across the two materials. Cause: During entry, the unified field template was not used for verification, resulting in inconsistent field values.
- Phenomenon: Versions are not synchronized, and the old ledger is mixed with the new persuasion records. Cause: After materials were updated, the workflow was not triggered to realign, and the branch still used old data.
- Phenomenon: Signatures or receipts are missing, and home visit records cannot provide supporting evidence. Cause: After the household visit, signatures were not added promptly, receipts were not archived, and fields were empty when the materials entered the workflow.

## How to verify the setup

This function's acceptance: run through each option, check the branch direction and interaction status in the run records, and confirm that `variables` and `nodeId` are correctly referenced in subsequent nodes.

Business test: use one real record to find fields inconsistent with the ledger, submit the discrepancy list to the reviewer for confirmation, and write back.

- Check options and branch connections one by one in the user selection node, trigger one interaction status, and view the node status in the run records.
- Reference the selection result variable in a subsequent node and run once, align the three materials by student name and date, and mark discrepant fields for name, quantity, and date.
