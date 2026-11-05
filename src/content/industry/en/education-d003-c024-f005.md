---
title: Multi-Turn Conversation and Prompts for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c024-f005
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Conversation | Intake
meta_description: Graduate Admissions: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Graduate Admissions Interviews and Selection: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses Q&A handling and missing-item follow-up for graduate admissions re-examination and admission scenarios. The source materials are internal documents circulated by the admitting unit, including re-examination plans, candidate score sheets, transfer lists, and receipt-type files, updated by batch and round, with fields including candidate name, ID, applied major, preliminary and re-examination scores, ranking, transfer preference, date, and signature field. When the re-examination plan enters this function, it assumes the role of rule basis, used to determine whether a question falls within the scope of handling and to provide the direction for follow-up questions; the candidate score sheet assumes the role of fact verification, and the scores, rankings, and dates in answers must be traceable to the corresponding records in that sheet; the transfer list assumes the role of list consistency, used to compare whether the name, quantity, and date of the same candidate in the score sheet and the list match, and to identify entries missing signatures or receipts. Handling records and supplemented questions are formed accordingly; after missing items are identified, follow-up questions are asked before answering.

## Configuration and implementation checks

This part is executed by the memory rounds and prompt configuration in the application settings, outputting the reference range of historical messages and answer constraints. Handling records and supplemented questions are then completed by the model, while external entry and authorization are handled by the publishing service and file permissions. Memory rounds control how many previous rounds of dialogue are referenced at most when answering; the value only needs to match the range of prior context required by the question.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Whether it is consistent with the candidate score sheet and transfer list in name, quantity, date, and signature field | Check the memory rounds value in the application settings, run a trial with two consecutive questions, inspect the range of historical messages referenced when the second round inherits the first round's references, and check the records corresponding to `messages` and `chatId` |
| Candidate score sheet | Whether the name, quantity, and date of the same candidate record match between the score sheet and the transfer list | Compare the fields of the same record in the two materials, confirm version synchronization, check entries missing signatures or receipts, and observe whether the fields brought in by `variables` are consistent with the materials |
| Transfer list | Whether the list version is synchronized and whether receipts and signatures are complete | Compare the re-examination plan date with the list update date, check receipt acknowledgment status, and use consecutive follow-up questions to verify whether the second round still points to the same candidate record |

## Three common errors

- Phenomenon: The name, quantity, or date of the same candidate does not match between the score sheet and the transfer list. Cause: The two materials are updated separately, without same-record comparison and version synchronization.
- Phenomenon: When the second question uses a reference, the answer does not address the question, and the follow-up direction deviates from the original question. Cause: The memory rounds value does not match the required range of prior context, and the prior context is not correctly brought in.
- Phenomenon: List entries missing signatures or receipts are still accepted as complete records. Cause: Before acceptance, the signature field and receipt field are not checked, and missing items are not identified and followed up.

## How to verify the setup

Acceptance for this function: Ask two consecutive follow-up questions and see whether the second question inherits the reference from the first question; check the values of `chatId`, `messages`, and `variables` within the range of historical messages to confirm that the second question still points to the same candidate record.

Business test: Ask a question missing key information and see whether it asks a follow-up before answering; after missing items are identified, the question items should be completed before being forwarded to the handling person.

- Check the current memory rounds value in the application settings, compare it with the range of prior context required by the question, and run a trial with two consecutive questions while recording the inheritance situation.
- Compare the name, quantity, date, and signature field of the same record across the re-examination plan, candidate score sheet, and transfer list, and confirm version synchronization and complete receipts.
