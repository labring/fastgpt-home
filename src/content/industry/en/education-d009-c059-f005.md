---
title: Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c059-f005
page_type: 行业问题页
application_area: education
meta_title: Research Finance | Conversation | Multilingual
meta_description: Research Finance: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Budget Adjustments and Reimbursement: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses research funding budget adjustment and reimbursement scenarios, with materials covering three categories: budget adjustment applications, reimbursement forms, and contract invoices. Budget adjustment applications record transfers between accounts, amounts, and approval dates; reimbursement forms carry expense details, quantities, and handler signatures; contract invoices provide transaction names, invoice dates, and stamped receipts. Material sources are submissions from research groups, exports from financial systems, and archived scans, with update cadence advancing along with approval milestones and reimbursement batches. When materials enter the multi-turn dialogue and prompts feature, budget adjustment applications serve as the baseline for budget definitions, reimbursement forms serve as the object of line-by-line verification, and contract invoices serve as external evidence pointing back to the source text. Field characteristics center on names, quantities, dates, signatures, and receipts, and in multilingual materials and terminology handling, translated names must remain traceable back to the source text.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the historical message range and answer constraints for reference. The "unified terminology glossary and comparison draft" is then completed by the model. The external entry point and authorization are handled by the publishing service and file permissions; memory turns and prompts do not generate access entry points and do not perform identity or file authentication.

| Object | Check | Verification action |
| --- | --- | --- |
| Budget adjustment application | Whether the account name, transfer amount, approval date, and signature are consistent with the reimbursement form | Check the memory turns in the application settings, use `chatId` to locate the same session, and compare the name, quantity, and date between the application and the reimbursement form |
| Reimbursement form | Whether the expense details, quantity, handling date, and receipt match the contract invoice | Use `messages` to review the continuous follow-up record, and check whether the name, quantity, and date between the reimbursement form and the invoice match item by item |
| Contract invoice | Whether the transaction name, invoice date, stamp, and receipt are synchronized with the version of the budget adjustment application | Use `variables` to mark the material version, sample three terms to check whether their spelling is consistent throughout the document, and verify whether the signature and receipt are complete |

## Three common errors

- Symptom: The name, quantity, or date of the same expenditure does not match between the reimbursement form and the contract invoice. Cause: The two materials were entered separately, without field-level comparison and terminology unification.
- Symptom: The budget adjustment application has been updated, but the reimbursement form still references the old version of accounts and amounts. Cause: The version was not synchronized, and the historical message range covered outdated content.
- Symptom: The contract invoice lacks a signature or receipt, yet the reimbursement form has already entered external publishing. Cause: The completeness of stamps and receipts was not verified before the materials entered the dialogue.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions and see whether the second question inherits the reference from the first; use `chatId` and `messages` to confirm the historical message range, and use `variables` to mark the terminology version.

Business testing: Sample three terms to check whether their spelling is consistent throughout the document and whether the translated names can point back to the source text, and verify the name, quantity, date, and signature of the budget adjustment application, reimbursement form, and contract invoice.

- Check the memory turns value in the application settings, match it with the preceding context range required by the question, and avoid bringing in irrelevant content.
- Run a trial with two consecutive question sentences, compare the usage records of the two runs, and confirm that the reference in the second question is inherited correctly.
