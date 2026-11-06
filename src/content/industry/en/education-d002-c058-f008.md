---
title: Workflow Orchestration for Research Project Task Agreement Signing: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c058-f008
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Workflows | Checks
meta_description: Research Agreements: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Task Agreement Signing: Compare Documents and Locate Differences

## What this category's data looks like

In the signing stage of research project task statements, materials come from the project task statement, the subject task breakdown table, and the budget book, and the update cadence advances with version iterations and approval receipts. The task statement contains the project name, undertaking unit, start and end dates, and signature fields; the breakdown table contains the subject name, participants, task milestones, and quantitative indicators; the budget book contains subject amounts, annual allocation, preparation date, and seals. When these three types of materials enter workflow orchestration, their roles differ: the task statement serves as the primary object providing baseline fields, while the breakdown table and budget book serve as comparison sources, verifying item by item against the same record's name, quantity, and date, and checking whether signatures and receipts are complete.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution along the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task statement | Whether the project name, undertaking unit, start and end dates, and signature fields are consistent with the breakdown table and budget book | Check the options and branch connections one by one in the node, trigger once and then view the node status in the run record, and compare the name, dates, and signatures |
| Subject task breakdown table | Whether the subject name, participants, task milestones, and quantitative indicators are consistent with the corresponding records in the task statement | Reference `variables` in subsequent nodes and run a trial once, compare the name and quantity field by field, and mark the fields that do not match |
| Budget book | Whether the subject amounts, annual allocation, preparation date, and seals are synchronized with the versions of the task statement and breakdown table | Check the options and branch connections in the node, check the version number and receipt, and confirm the entries missing signatures or receipts |
| Discrepancy list | Whether the name, quantity, and date of the same object in the two materials are consistent, and whether the versions are synchronized | Trigger the user selection node once, view the node status in the run record, and record the branch direction and interaction state |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the task statement and the breakdown table. Cause: The breakdown table was modified before the task statement, the versions were not synchronized, and verification was not performed field by field during comparison.
- Symptom: The budget book date is inconsistent with the start and end dates of the task statement, and the signature fields are blank. Cause: The preparation date was not updated with the version, the receipt was not archived, and the missing signature was not identified.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the interaction state was not correctly read by subsequent nodes.

## How to verify the setup

This feature's acceptance: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and run a trial once in a subsequent node referencing `variables` and `nodeId`.

Business test: use one real record to find fields inconsistent with the ledger, check the name, quantity, date, and signature receipt, record the discrepancy list, and submit it to the reviewer for confirmation and write-back.

- Check the options and branch connections one by one in the node, trigger once and then view the node status in the run record, and confirm that the interaction state is recorded.
- Reference `variables` in subsequent nodes and run a trial once, and compare the name, quantity, date, and signature receipt of the task statement, breakdown table, and budget book.
