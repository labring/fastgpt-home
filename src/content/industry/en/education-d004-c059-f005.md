---
title: Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c059-f005
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Conversation | Handover
meta_description: Research Finance: review conversation for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this: Research funding budget adjustment and reimbursement material drafting and responsibility handover involve three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications come from the internal approval flow of the project team, reimbursement forms come from the filing step after expenses occur, and contract invoices come from procurement and financial archiving. The update cadence advances with the project cycle and reimbursement batches. Field characteristics center on name, quantity, date, signature, and receipt. When a budget adjustment application enters this feature, it serves as the draft to be prepared, the reimbursement form serves as the source of expense details, and the contract invoice serves as the basis for verifying amounts and dates. The three types of materials reference one another during drafting and handover; the name, quantity, and date of the same record must be consistent across materials, versions and dates must be synchronized, and signatures and receipts must be complete.

## Configuration and implementation checks

Configuration and implementation checks: This step is carried out by the memory turn count and prompt configuration in the app settings, which output the range of historical messages referenced and the answer constraints. The material drafts and handover records that can be issued are then completed by the model. The memory turn count controls how many previous turns of dialogue can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Fields are complete, the responsible person is clear, versions and dates are consistent, and the name and quantity can be matched in the reimbursement form | Check the memory turn count value in the app settings, run a trial with two consecutive questions, confirm that the second question inherits the reference from the first question, and check the reference scope of `messages` and `variables` |
| Reimbursement form | The amount, date, and signature can be verified in the contract invoice, and the receipt is not missing | Compare the usage records of two runs, confirm the consumption change after adjusting the turn count, and check whether the historical message range corresponding to `chatId` covers the required preceding text |
| Contract invoice | The name, quantity, and date are consistent with the budget adjustment application, and it can be blocked when the version is not synchronized | Run a trial with two consecutive questions, confirm that the second question answers what is asked when using a reference, and check whether the material fields referenced in `messages` are complete |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the budget adjustment application and the reimbursement form. Cause: During drafting, fields were not compared one by one according to the template, and the memory turn count was too small to use the preceding text.
- Symptom: The dates of the contract invoice and the reimbursement form are inconsistent, and the version is not synchronized. Cause: After the material was updated, it was not synchronized to the handover record, and the historical message range did not cover the latest version.
- Symptom: The handover record is missing a signature or receipt. Cause: Complete fields and a clear responsible person were not blocked during the drafting step, and an excessively large turn count brought in irrelevant content that interfered with judgment.

## How to verify the setup

Acceptance of this feature: Ask two consecutive follow-up questions and see whether the second question inherits the reference from the first question, confirming that the memory turn count value matches the required preceding text range.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the current memory turn count value in the app settings, run a trial with two consecutive questions, and confirm that the second question inherits the reference from the first question.
- Compare the usage records of two runs, confirm the consumption change after adjusting the turn count, and check the reference scope of `messages`, `variables`, and `chatId`.
