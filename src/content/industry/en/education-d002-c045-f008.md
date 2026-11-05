---
title: Workflow Orchestration for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c045-f008
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Workflows | Checks
meta_description: Training Compliance: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Off-Campus Training Registration and Compliance: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of off-campus training compliance filing and penalty response. Materials come from three categories: school operating licenses, course filing materials, and fee disclosure. The school operating license contains the institution name, address, validity period, and issuance date; the course filing materials contain the course name, number of class hours, teaching time slots, and filing date; the fee disclosure contains the item name, fee-charging unit, amount, and disclosure start date. Materials enter as scanned copies or structured ledgers, with an update rhythm of centralized submission at the beginning of the semester, supplementary entry for changes during the semester, and temporary extraction during penalty response. When entering this function, the school operating license serves as the baseline object, while the course filing materials and fee disclosure serve as comparison objects. Each of the three carries fields, dates, and signature information for subsequent nodes to verify item by item along branches.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The "discrepancy list" is completed by subsequent nodes continuing execution along branches. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the institution name, address, validity period, and issuance date are consistent with the ledger, and whether signatures and receipts are complete | In the node, verify the options and branch connections one by one, reference `nodeId` to locate the branch where this material is located, and record discrepancies in the three items: name, date, and signature |
| Course filing materials | Whether the course name, number of class hours, and filing date match the school operating license and fee disclosure, and whether the versions are synchronized | In subsequent nodes, reference `variables` to retrieve the filing field values, run a trial once, and verify the name, quantity, and date of the same record in the two materials |
| Fee disclosure | Whether the fee item name, fee-charging unit, amount, and disclosure start date are consistent with the filing materials, and mark if signatures or receipts are missing | Trigger a user selection node once, check the node status in the run record, compare the disclosure date with the filing date, and output inconsistent fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the school operating license and the course filing materials. Cause: The two materials are entered separately without field-level comparison, and the versions are not synchronized.
- Symptom: The fee disclosure lacks signatures or receipts but still enters the subsequent process. Cause: The node does not use signatures and receipts as branch judgment conditions, and the interaction state record is incomplete.
- Symptom: After selecting an option, the default branch is still followed, and the discrepancy list is not generated as expected. Cause: The options and branch connections were not verified one by one, and the selection result variable was not correctly referenced.

## How to verify the setup

This function's acceptance: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, the selection result variable has been passed to subsequent nodes, and `variables` and `nodeId` can be located in the record.

Business test: use one real record to find fields inconsistent with the ledger, verify the name, quantity, date, and signature of the school operating license, course filing materials, and fee disclosure, and output a discrepancy list.

- In the node, verify the options and branch connections one by one, trigger a user selection node once, check the node status in the run record, and confirm that the process continues downward after the interaction is completed.
- In subsequent nodes, reference the selection result variable and run a trial once, compare the fields, dates, and signatures of the school operating license, course filing materials, and fee disclosure, and mark records missing signatures or receipts.
