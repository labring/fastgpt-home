---
title: Multi-Turn Conversation and Prompts for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c063-f005
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Conversation | Handover
meta_description: Research Misconduct: review conversation for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports, focusing on the drafting of materials and handover of responsibility, and involves three types of documents: report materials, investigation reports, and expert appraisal opinions. Report materials come from original leads submitted by real-name or anonymous reporters; investigation reports are written by the investigation team after verification; expert appraisal opinions are issued by external experts. When materials enter this function, report materials serve as the factual starting point, investigation reports as the process record, and expert appraisal opinions as the basis for professional judgment; together they support a signable draft of materials and a handover record. The update cadence advances with the investigation stages, and each round of supplementation or revision must synchronize the version and date. Field characteristics include reporter information, reported person information, reported matters, investigation process, determination conclusions, handling recommendations, signatures and receipts, etc., requiring that the name, quantity, and date of the same record remain consistent across all materials.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and the output references the historical message range and answer constraints. "A signable draft of materials and handover record" is then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering; if the value is too small, prior context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields are complete: reporter, reported person, reported matters, date, signature or receipt | Check the current memory turns value in the application settings, and check whether the material fields are complete |
| Investigation report | The name, quantity, and date of the same record are consistent with the report materials, and the version and date are synchronized | Run a trial with two consecutive questions, using the second turn to refer back to the first turn, and check whether the answer is off-topic |
| Expert appraisal opinion | The expert signature, appraisal date, and appraisal conclusion are consistent with those cited in the investigation report | Compare the usage records of two runs to confirm the usage change after adjusting the turns |
| Handover record | The responsible person is clear, the version and date are consistent, and the next stage has signed for receipt | Check whether `chatId`, `messages`, and `variables` are correctly passed through the process |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the report materials and the investigation report. Cause: During drafting, item-by-item verification was not based on the original materials, and the version was not synchronized.
- Phenomenon: The expert appraisal opinion lacks a signature or receipt, and the handover record has no signed receipt. Cause: The responsibility handover stage did not set signature and receipt fields, and the process was skipped.
- Phenomenon: When the second question uses a reference, the answer is off-topic, responses become slower, and consumption rises. Cause: The memory turns value does not match the prior context range required by the question, bringing in irrelevant content.

## How to verify the setup

This function's acceptance check: ask two consecutive follow-up questions and see whether the second question carries forward the reference from the first; at the same time, check whether `chatId`, `messages`, and `variables` are passed as expected.

Business test: draft one document according to the template and complete one handover, and see whether missing items are blocked.

- Check the current memory turns value in the application settings, and match it with the prior context range required by the question.
- Run a trial with two consecutive questions to confirm that the second turn can correctly carry forward the reference from the first turn.
