---
title: Multi-Turn Conversation and Prompts for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c027-f005
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Conversation | Review
meta_description: Graduate Destinations: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of university employment signing and graduation destination statistics. The materials include three types: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement carries the signing parties, position, and seals; the graduation destination registration form records the destination category, employer name, and date; the employer certificate provides the acceptance intention and receipt. Materials enter the anomaly tracing and manual review function in batches, each serving the roles of comparison baseline, fields to be verified, and source of supporting evidence. Field characteristics center on names, quantities, dates, signatures, and receipts. The update cadence advances with signing batches and review cycles, and it is common for the same record to fail to match across two materials, for versions to be out of sync, or for signatures or receipts to be missing.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The anomaly list and review conclusions are then completed by the model, while the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Check whether the signing parties, position, date, and signature are consistent with the registration form | Retrieve the original agreement image, compare names, quantities, dates, and seals, and record discrepancies |
| Graduation destination registration form | Check whether the destination category, employer name, date, and receipt are consistent with the agreement | Retrieve the original registration form, compare field by field, and flag version out-of-sync or missing receipt |
| Employer certificate | Check whether the acceptance intention, seal, and receipt date support the registration form | Retrieve the scanned certificate, check the seal and date, and confirm the supporting evidence is valid |
| Memory turns and prompt | Match the prior context range required by the question, and ensure the answer constraints cover the review criteria | Check the current values in the application settings, and test with two consecutive rounds of questions |

## Three common errors

- Symptom: The employer name, quantity, or date for the same record does not match between the agreement and the registration form. Cause: The two materials are filled in at different stages, lacking a unified comparison baseline and review receipt.
- Symptom: Material versions are out of sync, and an old registration form is still being referenced. Cause: The update cadence is disconnected from the review cycle, and the currently valid version is not locked by batch.
- Symptom: Signatures or receipts are missing, and anomalous records cannot be traced back to the source material. Cause: The evidence chain is incomplete, and the reviewer has not signed off on the anomaly list.

## How to verify the setup

This feature's acceptance: Ask two consecutive follow-up questions and see whether the second question carries forward the reference from the first; in the dialogue, check the reference scope and answer constraints of `chatId`, `messages`, and `variables`.

Business test: Create an anomalous record, see whether it can be traced back to the source material, and confirm that the anomaly is supported by the original record and signed by the reviewer.

- Check the current value of memory turns in the application settings, test with two consecutive rounds of questions, and confirm that the second question correctly carries forward the reference from the first.
- Compare the usage records of two runs, confirm that the run consumption changes accordingly after adjusting the number of turns, and check that the opening message is not treated as prior context.
