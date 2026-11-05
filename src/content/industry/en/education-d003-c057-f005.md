---
title: Multi-Turn Conversation and Prompts for National Key Research and Development Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c057-f005
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Conversation | Intake
meta_description: National R&D Grants: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for National Key Research and Development Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

In the National Key R&D Program project application scenario, the intake materials are mainly the project application form, budget application form, and cooperation agreement, accompanied by signature pages, receipts, and version records. These materials come from submission through the application system and offline supplementary submission, and their update cadence advances with application rounds, budget adjustments, and cooperation agreement signing milestones. Field characteristics are concentrated in three categories: first, names and numbers, such as project name, task name, entity name, and project number; second, quantities and amounts, such as budget subjects, self-raised and special funds, and number of participating entities; third, dates and signatures, such as application date, cooperation start and end dates, seals, and signature pages. When the materials enter the Q&A intake and missing-item follow-up function, the project application form serves as the master record and factual source document, the budget application form provides the amount and subject cross-reference, and the cooperation agreement provides the participants and signing information; together the three support missing-item identification and follow-up questioning, the historical dialogue scope is provided by the memory turns and prompt configuration in the application settings, and the intake record and the questions to be completed are continued by the model.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, which output the referenced historical message scope and answer constraints. Memory turns control how many previous dialogue turns can be referenced at most when answering; too small a value fails to use the preceding context, while too large a value brings in irrelevant content and increases consumption. "The intake record and the questions to be completed" are continued by the model, and the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether it is consistent with the budget application form and cooperation agreement on project name, task name, number of participating entities, and application date | Check the memory turns in the application settings, run a trial with two consecutive follow-up questions, and check whether the preceding context scope in `messages` covers the project name and date |
| Budget application form | Whether it matches the project application form on budget subjects, amounts, self-raised and special funds, and preparation date | Compare the subjects and amounts of the two materials, and confirm whether the budget fields referenced in `variables` are correctly carried over across turns |
| Cooperation agreement | Whether it is complete with the project application form on participating entity names, cooperation start and end dates, signatures, and receipts | Check whether the cooperation agreement signature page and receipt have missing items, and confirm whether in the session corresponding to `chatId` the follow-up asks for the missing item first before answering |
| Intake record and questions to be completed | Whether missing items are identified and followed up on, and whether answers are based on materials | Run a trial with two consecutive questions, see whether the second question carries over the reference from the first question, and check the changes in usage records as the number of turns is adjusted |

## Three common errors

- Symptom: the same project name is written inconsistently in the project application form and the budget application form. Cause: the two materials are maintained by different filers, versions are not synchronized, and no field-level comparison is done at intake.
- Symptom: the number of participating entities does not match between the cooperation agreement and the project application form. Cause: after the cooperation agreement is signed, it is not backfilled into the application form, and the quantity and dates continue to use the old version.
- Symptom: when the second question uses a reference, the answer is off-topic, and responses become slower with increased consumption. Cause: the memory turns value does not match the scope required by the preceding context, bringing in irrelevant content or treating the opening message as preceding context.

## How to verify the setup

This function's acceptance: with two consecutive follow-up questions, see whether the second question carries over the reference from the first question; check whether the historical scope in `messages` is consistent with the prompt constraints, and confirm that `chatId` and `variables` are correctly passed within the session.

Business test: ask a question missing key information, and see whether it asks for the missing item first before answering; compare the fields, dates, and signatures of the project application form, budget application form, and cooperation agreement to confirm that the follow-up items have a material basis.

- Check the current value of memory turns in the application settings, run a trial with two consecutive questions, observe whether the second question carries over the reference from the first question, and compare the usage records of the two runs.
- Compare the names, quantities, dates, and signatures of the project application form, budget application form, and cooperation agreement item by item; first list those missing signatures or receipts as items to be completed, then forward them to the responsible person for handling.
