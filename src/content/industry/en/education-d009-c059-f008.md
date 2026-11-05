---
title: Workflow Orchestration for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c059-f008
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Workflows | Multilingual
meta_description: Research Finance: review workflows for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data covers three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. The materials come from the research group, the finance department, and the counterparty to the contract, and their update cadence changes with the project cycle and the financial month-end closing. Budget adjustment applications record the account, amount, and approval date; reimbursement forms record expense details, quantities, and the handler's signature; contract invoices record terms, amounts, and invoice dates. During multilingual materials and terminology processing, the three types of materials enter workflow orchestration and each takes on a different role: budget adjustment applications provide the basis for adjustment and the approval chain, reimbursement forms provide actual expenditures and voucher numbers, and contract invoices provide contract constraints and invoice receipts. Field characteristics center on names, quantities, dates, and signatures. The same record must keep a consistent wording across different materials, and the translated name must be able to point back to the source text before it can be released externally.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. "Unified terminology glossary and comparison draft" is continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the account name, adjustment amount, approval date, and signature are consistent with the corresponding records in the contract invoice and reimbursement form | Check the options and branch connections one by one in the node, reference `variables` and `nodeId`, and view the node status in the run records |
| Reimbursement form | Whether the expense name, quantity, handler date, and receipt match the same record in the budget adjustment application and contract invoice | Reference the selection result variable in a subsequent node and run a trial once, and check whether the material's field wording is consistent with the other two materials |
| Contract invoice | Whether the contract terms, invoiced amount, invoice date, and signature are in sync with the versions in the budget adjustment application and reimbursement form | Trigger an interaction once, view the node status in the run records, and check whether the material's translated name can point back to the source text |
| Unified terminology glossary and comparison draft | The same term is written consistently throughout, the translated name can point back to the source text, and three terms are sampled to check whether the wording is consistent throughout | Reference `variables` in a subsequent node and run a trial once, and check the field correspondence between the terminology glossary and the comparison draft |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials were entered separately, without terminology comparison and field back-reference checks.
- Symptom: The contract invoice version is not in sync, and old terms remain in the comparison draft. Cause: After the material was updated, the interaction state record was not triggered, and the branch direction was not adjusted with the version.
- Symptom: The reimbursement form lacks a signature or receipt, yet the process still continues downward. Cause: The options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Feature acceptance: Run a trial for each option one by one, check the branch direction and interaction state in the run records, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and check whether the references to `variables` and `nodeId` are consistent.

Business testing: Sample three terms to check whether the wording is consistent throughout, confirm that the translated name can point back to the source text, and verify that the fields of the terminology glossary and the comparison draft correspond correctly.

- Check the options and branch connections one by one in the node, trigger an interaction once, then view the node status in the run records, and confirm that the state is recorded when entering the node.
- Reference the selection result variable in a subsequent node and run a trial once, and check whether the names, quantities, dates, and signatures of the budget adjustment application, reimbursement form, and contract invoice match.
