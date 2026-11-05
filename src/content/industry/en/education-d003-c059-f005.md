---
title: Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c059-f005
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Conversation | Intake
meta_description: Research Finance: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data looks like this: Q&A intake for research funding budget adjustments and reimbursements revolves around three types of materials: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications come from the adjustment reasons and subject comparisons submitted by the research group, reimbursement forms come from the expense details filled in by the handler, and contract invoices come from the vouchers kept by the supplier and finance. When the three types of materials enter the intake stage, budget adjustment applications play the role of explaining the reasons and subject changes, reimbursement forms play the role of expense aggregation and amount verification, and contract invoices play the role of corroborating transaction authenticity and signed receipts. Materials are updated on a rolling basis with the application batch, and version replacement may occur within the same batch. Field characteristics are concentrated in subject name, amount, quantity, occurrence date, signature, and receipt location; when comparing across materials, these fields are the main basis for identifying missing items and inconsistencies.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the memory turns and prompt configuration in the application settings, outputting the historical message range and answer constraints to reference. The intake records and the follow-up questions to be completed are then handled by the model, while the external entry point and authorization are handled by the publishing service and file permissions. Memory turns control how many previous dialogue turns can be referenced at most when answering; if the value is too small, the preceding context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | The subject name, adjustment reason, and occurrence date must match the reimbursement form and contract invoice, and the signature and receipt locations must not be blank | Check the memory turns value in the application settings, run a trial with two consecutive questions, and check whether the second question's reference carries over from the first question; compare the historical range in `messages` with the session corresponding to `chatId` |
| Reimbursement form | The name, quantity, amount, and date of the expense details must be consistent with the contract invoice; when the version is not synchronized, the latest receipt shall prevail | Retrieve the materials from the same batch and compare field by field, confirm that missing items are completed after follow-up questioning; record the field values brought in by `variables` |
| Contract invoice | The transaction name, quantity, date, and signed receipt must match the budget adjustment application and reimbursement form; if the signature or receipt is missing, it is regarded as pending completion | Check the signature and receipt locations, compare the dates and quantities of the three materials; observe changes in the runtime consumption record after adjusting the turns |
| Intake records and follow-up questions to be completed | Missing items are identified and followed up on, answers are based on materials, and the case can be transferred to the handler | Run a trial with two consecutive follow-up questions, confirm that the second question carries over the reference from the first question; check that the opening message is not treated as preceding context |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the budget adjustment application and the reimbursement form. Cause: The two materials are filled in at different stages, lacking cross-material field comparison and follow-up questioning.
- Phenomenon: The contract invoice version is not synchronized, and an old receipt is referenced during intake. Cause: After the material is updated, the historical messages within the intake scope are not replaced, and the preceding context still points to the old version.
- Phenomenon: When the second question uses a reference, the answer does not address the question, and responses become slower with increased consumption. Cause: The memory turns value does not match the preceding context range required by the question, bringing in irrelevant content.

## How to verify the setup

Acceptance of this feature: with two consecutive follow-up questions, see whether the second question carries over the reference from the first question; check the historical message range referenced in `messages` against the session corresponding to `chatId`, and confirm that the fields brought in by `variables` are consistent with the answer constraints.

Business test: ask a question missing key information and see whether it follows up before answering; confirm that missing items are identified and followed up on, and that after the answer is based on materials, the case is transferred to the handler.

- Check the current memory turns value in the application settings, match it with the preceding context range required by the question, and then run a trial with two consecutive questions.
- Compare the usage records of two runs before and after adjusting the turns, confirm that runtime consumption changes with the turns, and check that the opening message is not treated as preceding context.
