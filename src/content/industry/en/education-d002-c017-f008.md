---
title: Workflow Orchestration for Undergraduate Program Establishment and Adjustment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c017-f008
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Workflows | Checks
meta_description: Undergraduate Programs: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Undergraduate Program Establishment and Adjustment: Compare Documents and Locate Differences

## What this category's data looks like

The materials for undergraduate program establishment and dynamic adjustment mainly consist of three types: program establishment application forms, talent cultivation plans, and expert review opinions. They come from the academic affairs system, departmental submissions, and review meeting records, and their update cadence changes with the application cycle and annual adjustment nodes. The three types of materials have different field characteristics: the application form contains the program name, code, length of schooling, planned enrollment number, person-in-charge signature, and date; the cultivation plan contains the curriculum system, credits and class hours, graduation requirements, and version number; the expert review opinions contain the review conclusion, expert list, signatures, and receipt dates. When the materials enter the workflow, the application form serves as the main record, while the cultivation plan and review opinions serve as comparison sources, respectively taking on the roles of field verification and signature/receipt verification.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "discrepancy list" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Program establishment application form | Whether the program name, code, length of schooling, planned enrollment number, person-in-charge signature, and date are consistent with the ledger | Compare field by field against the ledger, record discrepancies in name, quantity, and date; check the options and branch connections in the node, and reference `variables` to view the selection result variable |
| Talent cultivation plan | Whether the curriculum system, credits and class hours, graduation requirements, version number, and date are synchronized with the application form | Compare the version number and date, mark items whose versions are not synchronized; reference `nodeId` in subsequent nodes to locate the branch source |
| Expert review opinions | Whether the review conclusion, expert list, signatures, and receipt dates are complete and consistent with the application form | Check for missing signatures and receipts, record date discrepancies; trigger once to view the node status in the run records |
| Discrepancy list | Whether the name, quantity, and date of the same object are consistent across the two materials | Summarize the discrepancy fields of each material, submit them to the reviewer for confirmation, and write them back to the ledger |

## Three common errors

- Phenomenon: The program name and planned enrollment number of the same record do not match between the application form and the cultivation plan. Cause: The two places have different maintenance entry points, and no field-level comparison was performed.
- Phenomenon: The version number of the cultivation plan is inconsistent with the date of the review opinions. Cause: The version was not synchronized, and old-version materials circulated with the new application.
- Phenomenon: Expert review opinions lack signatures or receipts. Cause: The review meeting records were not archived, and receipts were not submitted with the materials.

## How to verify the setup

Acceptance of this function: test-run each option one by one, check the branch direction and interaction status in the run records, confirm that each option corresponds to one branch, and that the selection result variable has been passed to subsequent nodes, which can be located by referencing `variables` and `nodeId`.

Business test: use one real record to find fields inconsistent with the ledger, and compare the program name, quantity, date, and signature/receipt.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run records
- Reference the selection result variable in a subsequent node and test-run once to confirm that the process has not stopped and has not repeatedly entered the interaction
