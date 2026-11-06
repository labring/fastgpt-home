---
title: Multi-Turn Conversation and Prompts for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c063-f005
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Conversation | Intake
meta_description: Research Misconduct: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for the investigation and handling of academic misconduct reports usually include three types: report materials, investigation reports, and expert appraisal opinions. Their sources are the intake registration, investigation and evidence collection, and expert review stages, and their update cadence advances with the investigation progress and correction receipts. Report materials provide the reported conduct, the paper involved, and preliminary evidence; investigation reports record the investigation process, factual findings, and handling recommendations; expert appraisal opinions provide academic judgments and their basis. Field characteristics center on names, quantities, dates, and signatures: the names, quantities, and dates of the same record in two materials must be consistent, versions must be synchronized, and signatures and receipts must be complete. When the materials enter the question-and-answer intake and missing-item follow-up function, report materials are used to identify the elements of the question items, investigation reports are used to verify facts and conclusions, and expert appraisal opinions are used to support academic judgments; together, the three form the material basis for follow-up questions and answers.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. The "intake record and the question items to be completed" are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turns | Matches the range of preceding text required by the question | Check the current value in the application settings, and run a trial with two consecutive questions to observe whether the second round can carry forward the references from the first round, confirming that the `messages` range corresponds to `chatId` |
| Report materials | Names, quantities, dates, and signatures must be consistent with the investigation report | Compare item by item the reported paper names, evidence quantities, and intake dates in the report materials and the investigation report, check whether signatures and receipts are complete, and list discrepancies as question items to be completed |
| Investigation report | Versions must be synchronized, and conclusions must correspond to the expert appraisal opinions | Check the version number of the investigation report against the version cited in the expert appraisal opinions, inspect whether the dates and signatures of the factual findings and handling recommendations are complete, and transfer missing items to the case handler |
| Expert appraisal opinions | Academic judgments have a material basis, and signatures and receipts are complete | Check that the paper names and quantities in the appraisal opinions are consistent with the investigation report, inspect the expert signatures and receipts, and confirm the material range referenced in `variables` |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the report materials and the investigation report. Cause: intake registration and investigation and evidence collection were entered separately, without cross-checking.
- Phenomenon: The versions of the investigation report and the expert appraisal opinions are not synchronized, and the conclusion cites an old version. Cause: after correction, the cited version was not updated, and the historical message range still carries old content.
- Phenomenon: The report materials lack signatures or receipts, and the intake record is incomplete. Cause: the material circulation stage did not verify signatures and receipts, and missing items were not identified and followed up.

## How to verify the setup

Acceptance of this function: ask two consecutive follow-up questions, see whether the second question carries forward the references from the first question, check whether `messages` corresponds to `chatId`, and confirm that the memory turns value matches the range of preceding text required by the question.

Business test: submit a question that lacks key information, see whether it first asks a follow-up question before answering, and whether the follow-up items fall on the names, quantities, dates, and signatures in the report materials, investigation report, and expert appraisal opinions.

- Check the current memory turns value in the application settings, run a trial with two consecutive questions, and record how the second round carries forward the references from the first round and changes in runtime consumption.
- Compare item by item the names, quantities, dates, and signatures in the report materials, investigation report, and expert appraisal opinions, list discrepancies as question items to be completed, and transfer them to the case handler.
