---
title: Workflow Orchestration for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c014-f008
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Workflows | Checks
meta_description: Pastoral Education: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Moral Education and Class Teacher Work: Compare Documents and Locate Differences

## What this category's data looks like

This category's daily outputs in school moral education and homeroom teacher work include three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans include the activity theme, meeting date, and homeroom teacher signature; student comprehensive quality records include student name, evaluation dimension, record date, and review signature; home visit records include the student visited, home visit date, participating teachers, and parent receipt. The three types of materials come from different sources: themed class meeting plans are submitted weekly by homeroom teachers, student comprehensive quality records are aggregated by semester milestones, and home visit records are entered in batches according to home visit progress. Field characteristics are concentrated in four categories: name, quantity, date, and signature receipt. The same record often appears simultaneously in plan attachments and ledgers. When materials enter the workflow, themed class meeting plans serve as the source of activity facts, student comprehensive quality records serve to verify student dimensions, and home visit records serve as proof of home-school communication. Together, the three form the comparison draft for discrepancy localization.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the name, quantity, date, and homeroom teacher signature correspond item by item with the ledger | Check options and branch connections one by one in the node, compare the plan theme, meeting date, and signature field, and use `variables` to record the comparison results |
| Student comprehensive quality record | Whether the student name, evaluation dimension, record date, and review signature are consistent between the two copies | Trigger a user selection node once, view the node status in the run record, and check the four items: name, dimension, date, and signature |
| Home visit record | Whether the student visited, home visit date, participating teachers, and parent receipt are complete | Reference the selection result variable in a subsequent node and run a trial once, check for missing receipts and date discrepancies, and use `nodeId` to locate the node |
| Discrepancy list | Whether the discrepancy fields have been aggregated according to the branch direction and submitted to the reviewer for confirmation | Continue execution according to the branch, write back the review comments, and check the correspondence between the discrepancy entries in `variables` and the ledger fields |

## Three common errors

- Phenomenon: The dates of the same home visit record differ by several days between the plan attachment and the ledger. Cause: The two materials were entered separately, versions were not synchronized, and no unified comparison was made during node interaction.
- Phenomenon: Student comprehensive quality records lack a review signature or home visit records lack a parent receipt. Cause: No signature receipt validation was set at the material submission stage, and after entering the workflow they directly follow the default branch.
- Phenomenon: The name of the themed class meeting plan is inconsistent with the ledger name, and the quantities do not match. Cause: Options and branch connections were not checked item by item, and the selection result variable was not correctly passed to subsequent nodes.

## How to verify the setup

Acceptance of this feature: Run trials for each option one by one, check the branch direction and interaction status in the run record, and confirm that `variables` and `nodeId` references are correct.

Business test: Use one real record to find fields inconsistent with the ledger, and locate discrepancies in name, quantity, date, or signature.

- Check options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger a user selection node once, and view the node status and interaction completion in the run record.
