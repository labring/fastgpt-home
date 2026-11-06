---
title: Workflow Orchestration for National Key Research and Development Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c057-f008
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Workflows | Review
meta_description: National R&D Grants: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for National Key Research and Development Applications: Trace Exceptions and Review Results

## What this category's data looks like

National Key R&D Program project application materials mainly consist of project applications, budget applications, and cooperation agreements. Their sources are exports from the application system and offline signed documents, and their update cadence follows application batches, budget adjustments, and agreement renewals. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures: project name, task name, participating organization name, budget subject amount, start and end dates, signature page, and receipt. When materials enter workflow orchestration, their roles differ: the project application serves as the main record providing research content and assessment indicators, the budget application serves as the numerical source providing subjects and total amounts, and the cooperation agreement serves as evidence of ownership and division of labor providing signatories and validity period. For the same field across the three types of materials, differences in name wording, differences in quantity definitions, and misaligned dates are common, and unsynchronized versions and missing signatures or receipts are also relatively common. Therefore, anomaly tracing needs to attach each anomaly back to the original record page.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "anomaly list and review conclusions" are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application | Project name, task name, and participating organization name are compared verbatim with the cooperation agreement and budget application, and dates and signature page are complete | Check the options and branch connections one by one in the node, reference `variables` and `nodeId`, and run a test once |
| Budget application | Budget subject amounts and quantity definitions are consistent with the project application and cooperation agreement, and start and end dates do not conflict with signing dates | Trigger the user selection node once and check the node status and branch direction in the run record |
| Cooperation agreement | Signatory names, validity period, signature or receipt match the project application and budget application, and version numbers are consistent | Reference the selection result variable `variables` in a subsequent node and run a test once to confirm the branch did not go to default |
| Anomaly record | There is support from the original record, it can be traced to the specific material page and field, and the reviewer's signature is complete | Create an anomaly record, trace back along `nodeId` to the source material, and check the signature |

## Three common errors

- Phenomenon: the same project name is written differently in the project application and the cooperation agreement. Cause: abbreviations were not unified during entry, so tracing cannot directly match the source material page.
- Phenomenon: budget quantities do not match between the two materials. Cause: after the budget application was revised, the project application was not synchronized, and unsynchronized versions led to misaligned values.
- Phenomenon: the cooperation agreement lacks a signature or receipt. Cause: the offline signed document was not returned, the reviewer cannot sign to confirm, and the anomaly list cannot be closed.

## How to verify the setup

Acceptance of this function: run tests option by option, check the branch direction and interaction status in the run record, confirm that the selection result variable `variables` has been passed to subsequent nodes, and that the branch connection corresponding to `nodeId` is correct.

Business test: create an anomaly record, see whether it can be traced to the source material, and check whether the anomaly list and review conclusions are supported by original records and the reviewer's signature.

- In the user selection node, check the options and branch connections one by one, confirm that each option corresponds to one branch, and avoid still taking the default branch after selecting an option.
- Trigger the user selection node once, check the node status in the run record, and confirm that the process continues after the interaction is completed and that the same session does not repeatedly enter the interaction.
