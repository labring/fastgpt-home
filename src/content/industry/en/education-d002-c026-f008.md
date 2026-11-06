---
title: Workflow Orchestration for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c026-f008
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Workflows | Checks
meta_description: Degree Certificates: review workflows for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences

## What this category's data looks like

In the degree conferral and certificate information reporting scenario, the core materials include degree application forms, thesis review forms, defense resolutions, and ledger records used for comparison. These materials come respectively from training units, review experts, defense committees, and administrative departments; their update cadence is concentrated around degree evaluation meetings and the certificate reporting window; and their field characteristics are mainly names, student IDs, thesis titles, review conclusions, defense dates, signatures, and receipts. When materials enter this feature, the degree application form serves as the baseline for identity and application information, the thesis review form provides review conclusions and expert signatures, the defense resolution records the voting result and defense date, and the ledger serves as the comparison reference, used to locate field discrepancies such as names, quantities, and dates, and to form a discrepancy list for the reviewer to confirm and write back.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The "discrepancy list" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the name, date, and signature fields are consistent with the ledger | In the node, check the options and branch connections one by one, confirm the comparison branches for the name, date, and signature fields, and reference `variables` and `nodeId` to locate the run record |
| Thesis review form | Whether the review conclusion, quantity, and expert signature are consistent with the ledger | Trigger once, view the node status in the run record, and check the discrepancy branches for the material's name, quantity, date, and signature fields |
| Defense resolution | Whether the defense date, voting result, and signature receipt are consistent with the ledger | In subsequent nodes, reference the selection result variable and run a test once to confirm the discrepancy flow for the defense resolution's date, signature, and receipt fields |
| Ledger record | Whether the name, quantity, and date of the same object are consistent across the two materials | Use the ledger as the comparison baseline, check the name, quantity, and date field by field, record inconsistent fields, and generate a discrepancy list |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: The two materials come from different sources and no field-level comparison was performed, so the discrepancies were not located.
- Symptom: The defense resolution version was not synchronized, the old version's signature is missing, or the receipt is not attached. Cause: The material update cadence is inconsistent, and version management lacks a unified verification step.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed correctly.

## How to verify the setup

Feature acceptance: run a test for each option one by one, check the branch direction and interaction state in the run record, and confirm that `variables`, `nodeId`, and the selection result variable are correctly referenced in subsequent nodes.

Business test: use one real record to find fields inconsistent with the ledger, and check the name, quantity, date, and signature receipt of that record in the degree application form, thesis review form, and defense resolution.

- In the node, check the options and branch connections one by one, and trigger once to view the node status and branch direction in the run record.
- In subsequent nodes, reference the selection result variable and run a test once to confirm that the discrepancy list continues execution according to the branch and is handed to the reviewer for confirmation and write-back.
