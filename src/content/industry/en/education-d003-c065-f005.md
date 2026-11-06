---
title: Multi-Turn Conversation and Prompts for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c065-f005
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Conversation | Intake
meta_description: Lab Chemicals: review conversation for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Laboratory Hazardous Chemical Purchasing and Records: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for the laboratory hazardous chemical procurement and ledger category commonly include three types: procurement application forms, requisition registration forms, and inventory ledgers. A procurement application form contains the product name, specifications, quantity, supplier, application date, and approval signature; a requisition registration form contains the requisitioner, requisition date, purpose, quantity, and custodian signature; an inventory ledger contains the balance quantity, inbound date, outbound date, and inventory count signature. The material sources are internal laboratory circulation and periodic inventory counts, and the update cadence changes with procurement batches and requisition frequency. After entering this function, the procurement application form is used to check the application reason and approval chain, the requisition registration form is used to check the requisition destination and signature receipt, and the inventory ledger is used to check the balance and date reconciliation. The three types of materials often show inconsistencies in the same record across name, quantity, and date, with versions not synchronized or signature receipts missing, so missing items must first be identified during the acceptance stage and then followed up to be completed.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. The "acceptance records and items to be completed" are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering; if the value is too small, the preceding context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application form | Whether the application reason, product name, quantity, application date, and approval signature are complete, and whether the name, quantity, and date are consistent with the requisition registration form and inventory ledger | Check the memory turns value in the application settings, run a trial with two consecutive questions, check whether the second round can carry forward the references from the first round, and check the preceding context range in `messages` |
| Requisition registration form | Whether the requisitioner, requisition date, purpose, quantity, and custodian signature are complete, and whether the quantity and date match the procurement application form and inventory ledger | Compare the usage records of two runs, confirm the consumption change after adjusting the turns, and check whether the historical messages in the session corresponding to `chatId` are correctly referenced |
| Inventory ledger | Whether the balance quantity, inbound and outbound dates, and inventory count signature are complete, whether the version is synchronized, and whether it is consistent with the procurement application form and requisition registration form | Check whether the fields brought in by `variables` are consistent with the materials, and when signatures or receipts are missing, ask follow-up questions before answering |
| Acceptance records and items to be completed | Whether missing items are identified and followed up, and whether the answer is based on materials | Ask a question missing key information, see whether it asks follow-up questions before answering, and then transfer it to the handler |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the procurement application form and the requisition registration form. Cause: The two materials are filled in separately, without cross-checking and version synchronization.
- Phenomenon: The inventory ledger lacks an inventory count signature or the requisition registration form lacks a custodian receipt. Cause: Signatures were not fully collected during the circulation stage, and missing items were not identified when the materials entered acceptance.
- Phenomenon: The second question answers off-topic when using references, or the answer becomes slower and consumption rises. Cause: The memory turns value does not match the preceding context range, bringing in irrelevant content.

## How to verify the setup

Acceptance for this function: ask two consecutive follow-up questions, see whether the second question carries forward the references from the first question, and check whether the historical message range and answer constraints referenced in `messages` match.

Business test: ask a question missing key information, and see whether it asks follow-up questions before answering.

- Check the current memory turns value in the application settings, and match it with the preceding context range required by the question.
- Run a trial with two consecutive questions, compare the usage records of the two runs, and confirm that consumption changes accordingly after adjusting the turns.
