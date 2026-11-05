---
title: Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c059-f005
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Conversation | Review
meta_description: Research Finance: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Trace Exceptions and Review Results

## What this category's data looks like

Research funding budget adjustments and reimbursements typically appear in the technology center as three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the account, amount, adjustment reason, and approval comments; reimbursement forms record expense details, amounts, handler and approval signatures; contract invoices record the supplier name, contract number, invoice number, invoice date, and amount. The materials mostly come from business system exports or scanned uploads, and the update cadence advances with the approval process, with field characteristics centered on names, quantities, dates, and signatures. When the three types of materials enter the anomaly tracing and manual review function, budget adjustment applications provide the basis for adjustment, reimbursement forms provide proof of actual expenditure, and contract invoices provide external transaction evidence; together the three support the generation of the anomaly list and review conclusions.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, which output the historical message range and answer constraints to reference. The memory turns control how many previous dialogue turns can be referenced at most when answering; too small a value fails to use prior context, while too large a value brings in irrelevant content and increases consumption. The anomaly list and review conclusions are then completed by the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the name, quantity, date, and signature are consistent with the reimbursement form | In the application settings, check the current memory turns value, run a trial with two consecutive questions, and check whether the historical range in `messages` covers the prior references |
| Reimbursement form | Whether the name, quantity, and date of the same record do not match across the two materials | Compare the usage records of two runs to confirm whether the historical message range and answer constraints corresponding to `chatId` match |
| Contract invoice | Whether the version is synchronized and whether signatures or receipts are missing | Use two consecutive follow-up questions to verify whether the second turn can carry forward the references from the first turn, and check whether `variables` carry the necessary fields |
| Anomaly list and review conclusions | Whether the anomaly is supported by original records and whether the reviewer has signed | Create an anomaly record, see whether it can be traced back to the source material, and check whether the signatures and receipts are complete |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are entered at different stages, and the fields have not undergone consistency validation.
- Symptom: The contract invoice version is not synchronized, and the old and new versions appear simultaneously in the review materials. Cause: The update cadence is inconsistent, and the historical message range covers an expired version.
- Symptom: The reimbursement form lacks a signature or receipt, yet the anomaly list is still generated. Cause: The prompt does not constrain the required-field judgment for signatures and receipts, and the model answers directly.

## How to verify the setup

Acceptance for this feature: with two consecutive follow-up questions, see whether the second question carries forward the references from the first question, and check whether the historical range in `messages` matches the memory turns value.

Business test: create an anomaly record, see whether it can be traced back to the source material, and confirm that the review conclusion is supported by original records and that the reviewer's signature is complete.

- In the application settings, check the current memory turns value and confirm that it matches the prior context range required by the question.
- Run a trial with two consecutive questions, check whether the second turn correctly carries forward the references from the first turn, and compare the usage records of the two runs.
