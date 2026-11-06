---
title: Multi-Turn Conversation and Prompts for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c060-f005
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Conversation | Intake
meta_description: Research Progress: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones, with fields including task name, number of indicators, completion date, and signature of the person in charge; mid-term review materials are updated at the mid-term milestone, with fields including phase objectives, fund usage, participating personnel, and review comments; acceptance reports are formed at project closure, with fields including results list, indicator comparison, acceptance conclusion, and unit seal and receipt. When these three types of materials enter the Q&A intake and missing-item follow-up function, the annual progress report provides the current-period task and indicator baseline, the mid-term review materials provide phase deviations and rectification clues, and the acceptance report provides the basis for final results and signature receipts. Material sources are the project management system and paper scans, and the update rhythm rolls forward as milestones advance. The same record often shows inconsistent names, quantities, and dates across different materials, versions are not synchronized, or signature receipts are missing, requiring intake records and follow-up questions to locate gaps and route them to the responsible person.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The intake records and follow-up questions are then completed by the model. Memory turns control how many previous turns of dialogue can be referenced at most when answering; too small a value fails to use prior context, while too large a value brings in irrelevant content and increases consumption.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether the task name, number of indicators, completion date, and signature of the person in charge are consistent with the mid-term review materials | Check the name, quantity, and date of the same task in the two materials, and inspect the signature field; run a trial with two consecutive questions, asking about annual progress in the first turn and using a referential follow-up in the second turn to ask about missing items, and observe whether the prior context range in `messages` matches |
| Mid-term review materials | Whether the phase objectives, fund usage, and review comments correspond to the acceptance report, and whether versions are synchronized | Compare the phase objectives with the acceptance results list, and check the fund figures and review comment dates; check the current value of memory turns in the application settings, and confirm that the historical message range corresponding to `chatId` covers the mid-term milestone |
| Acceptance report | Whether the results list, indicator comparison, acceptance conclusion, unit seal, and receipt are complete | Check the fields, dates, seal, and receipt of the results list and indicator comparison; run a trial with two consecutive questions, using a referential follow-up in the second turn to ask about a missing signature or receipt, and confirm whether, when the material version in `variables` is not synchronized, it first asks a follow-up before answering |
| Intake records and follow-up questions | Missing items are identified and followed up, and answers are grounded in materials | Ask a question that lacks key information and see whether it first asks a follow-up before answering; compare `messages` and `variables` to confirm that the follow-up items come from material fields and are not generated out of thin air |

## Three common errors

- Symptom: the name and quantity of the same task do not match between the annual progress report and the mid-term review materials. Cause: the two materials are filled in separately, without field-level comparison and version synchronization.
- Symptom: the completion date in the acceptance report is inconsistent with the annual progress report, and the signature or receipt is missing. Cause: paper scans are entered late, receipts are not archived, and versions are not synchronized.
- Symptom: when a referential expression is used in the second question, the answer does not address the question, and responses become slower with increased consumption. Cause: the memory turns value does not match the prior context range, bringing in irrelevant content or treating the opening message as prior context.

## How to verify the setup

Acceptance of this function: with two consecutive follow-up questions, see whether the second question carries forward the reference from the first question; check the referenced historical message range in `messages` and `chatId`, and confirm that the answer constraints take effect.

Business test: ask a question that lacks key information and see whether it first asks a follow-up before answering; compare `variables` to confirm that the follow-up items are grounded in materials.

- Check the current value of memory turns in the application settings and match it with the prior context range required by the question; run a trial with two consecutive questions to confirm that the second turn correctly carries forward the reference from the first turn.
- Compare the usage records of two runs to confirm that consumption changes accordingly after adjusting the number of turns; check `messages` and `chatId` to avoid treating the opening message as prior context.
