---
title: Tool Calls and Plugins for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c059-f009
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Tool Calls | Intake
meta_description: Research Finance: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the research funding budget adjustment and reimbursement scenario, with materials drawn from three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the account, amount, reason for adjustment, and approval signature; reimbursement forms record expense details, quantity, date, and handler signature; contract invoices record name, quantity, date, invoicing information, and receipt. Materials are submitted by the project team or finance role in batches, and the update cadence follows the budget cycle and reimbursement milestones. The field characteristic is that the name, quantity, and date of the same record must be aligned across multiple materials, and versions and signature receipts must be kept in sync. When entering this feature, the budget adjustment application serves as the basis for adjustment, the reimbursement form serves as the source of expense details, and the contract invoice serves as the object of voucher verification; together the three form the context for Q&A intake and missing-item follow-up.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the inputs and returns in the call record). The intake record and the follow-up questions to be completed are then handled by subsequent AI nodes or manual review. The model decides whether to call based on the tool description, parameter descriptions, and whether parameters are required; when there are no required parameters it may fabricate values on its own, and when there are required parameters but no suitable value in the context it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Fields include adjustment account, amount, reason, approval signature, and date; the name, quantity, and date must be consistent with the reimbursement form and contract invoice, and versions must be in sync | Open the tool node description fields and check the parameter descriptions and whether they are required; run a trial with a question that lacks an approval signature to see whether it asks a follow-up question first |
| Reimbursement form | Fields include expense details, quantity, date, handler signature, and receipt; the name, quantity, and date of the same record must be aligned with the budget adjustment application and contract invoice | Open the parameter configurations one by one and check the two items: description and whether required; check the diamond connectors and node status on the canvas |
| Contract invoice | Fields include name, quantity, date, invoicing information, and receipt; the name, quantity, and date of the same record must be consistent with the budget adjustment application and reimbursement form, and signature receipts must be complete | Run a trial with a question that lacks an invoicing date to see whether it asks a follow-up question first; check whether the returned result contains values that do not exist in the materials |
| Tool calling node connections | The diamond interface is already connected to the target tool, and the node status is consistent with the canvas | Check the diamond connectors and node status on the canvas to confirm that the tool calling node can be selected by the model |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: material versions are not in sync and fields are not aligned.
- Symptom: the contract invoice lacks a signature or receipt, yet the reimbursement form still enters intake. Cause: the missing item was not identified and no follow-up question was asked first.
- Symptom: the returned result contains values that do not exist in the business materials. Cause: when there are no required parameters, the model fabricates parameter values on its own.

## How to verify the setup

Feature acceptance: run a trial with a question that lacks a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time check `toolChoice`, `functionCall`, and the tool description fields to confirm that the model does not give an answer directly.

Business test: raise a question that lacks key information and see whether it asks a follow-up question before answering.

- Open the tool node description fields and check whether the description can be understood when taken on its own; open the parameter configurations one by one and check the two items: description and whether required.
- Run a trial with a question that lacks that field to see whether it asks a follow-up question first rather than fabricating directly; check the diamond connectors and node status on the canvas.
