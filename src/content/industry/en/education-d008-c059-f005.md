---
title: Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c059-f005
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Conversation | Access
meta_description: Research Finance: review conversation for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Manage Authorized Access and External Services

## What this category's data looks like

Research funding budget adjustment and reimbursement materials commonly come in three groups: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record the account, amount, adjustment reason, and approval date; reimbursement forms record expense details, quantity, date, and handler signature; contract invoices record the counterparty name, amount, invoice date, and receipt. The material sources are submissions by project leaders, exports from the financial system, and archival filing, and the update cadence advances with approval milestones, with concentrated changes at month-end and before project completion. When the three groups of materials enter this feature, each has its own role: budget adjustment applications serve as the basis for determining the authorized visible scope, reimbursement forms serve as the primary material for field and signature verification, and contract invoices serve as the object for cross-comparison of names, quantities, and dates. Field characteristics center on four categories—names, quantities, dates, and signatures—and version synchronization and receipt completeness are common verification points.

## Configuration and implementation checks

This part is executed by the memory turn count and prompt configuration in the app settings, outputting the reference historical message range and answer constraints. The externally available entry points and authorized scope are determined by the published service and file permissions; the model only processes filtered materials, while the published service and file permissions handle identity and file authentication.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turn count | Matches the range of prior context required by the question | Check the current value in the app settings and confirm the reference range of `messages` |
| Continuous follow-up | The second turn correctly carries forward the references from the first turn | Run a trial with two consecutive question turns and observe whether `chatId` maintains the same session |
| Budget adjustment application | The account, amount, adjustment reason, and approval date are consistent with the reimbursement form | Compare the names, quantities, and dates of the two materials item by item, and check whether signatures and receipts are complete |
| Contract invoice | The counterparty name, amount, and invoice date are consistent with the corresponding records on the reimbursement form | Check whether the versions are synchronized and confirm that the names and dates recorded in `variables` are not misaligned |

## Three common errors

- Symptom: The name and quantity of the same expense do not match between the reimbursement form and the contract invoice. Cause: The two materials were entered separately, without cross-verification and version synchronization.
- Symptom: The budget adjustment application has been updated, but the reimbursement form still references the old account and amount. Cause: The versions were not synchronized, and the material update cadence was inconsistent.
- Symptom: The reimbursement form lacks the handler signature or the contract invoice lacks the receipt. Cause: The approval milestone was not closed-loop, and signature and receipt completeness were not verified at archival time.

## How to verify the setup

Feature acceptance: run two consecutive follow-up turns, see whether the second question carries forward the references from the first question, and check whether the reference ranges of `messages` and `chatId` match the settings.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- Check the current memory turn count value in the app settings, run a trial with two consecutive question turns, and compare the usage records of the two runs.
- Access the external entry point once with a restricted identity, and check the visible scope of the budget adjustment application, reimbursement form, and contract invoice as well as whether signatures and receipts are complete.
