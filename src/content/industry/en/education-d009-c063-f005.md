---
title: Multi-Turn Conversation and Prompts for Academic Misconduct Reports and Investigations: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c063-f005
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Conversation | Multilingual
meta_description: Research Misconduct: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Academic Misconduct Reports and Investigations: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data covers three types of materials: report materials, investigation reports, and expert appraisal opinions. Report materials enter through real-name or anonymous channels, containing the reported person's information, factual statements, and evidence lists; date and receipt fields must be traceable. Investigation reports are written by the investigation team, containing the acceptance number, investigation process, determination conclusions, and signature fields. Expert appraisal opinions are issued by external experts, containing appraisal matters, basis, conclusions, and expert signatures. The three types of materials often differ in field naming, date formats, and quantity expressions; the name, quantity, and date of the same record may not match across two materials, and unsynchronized versions or missing signatures and receipts are also common. When materials enter the multi-turn dialogue and prompts feature, report materials provide the original referents, investigation reports provide structured fields, and expert appraisal opinions provide terminology and the basis for conclusions; together the three support the generation of a unified terminology glossary and a comparison draft. The update rhythm advances with the investigation stages; new versions may be produced at each node of acceptance, investigation, appraisal, and deliberation.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the range of historical messages referenced and the answer constraints. Memory turns control how many previous dialogue turns can be referenced at most when answering; too small a value fails to use the preceding text, while too large a value brings in irrelevant content and increases consumption. The unified terminology glossary and comparison draft are then completed by the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | The reported person's name, factual statements, evidence quantity, and dates must correspond item by item with the investigation report and expert appraisal opinions, and receipts and signatures must not be missing | Check the memory turns value in the application settings, run a trial with two consecutive follow-up questions, and check whether the second question picks up the referents of the first; confirm the range of historical messages in `messages` |
| Investigation report | The acceptance number, investigation process, determination conclusions, and signature fields must be consistent with the corresponding fields of the report materials and expert appraisal opinions, and versions must be synchronized | Compare the usage records of two runs to confirm the consumption change after adjusting the turns; check the range of historical messages referenced by this report under `chatId` |
| Expert appraisal opinions | The appraisal matters, basis, conclusions, and expert signatures must be consistent with the terminology used in the report materials and investigation report, and quantities and dates must not conflict | Sample three terms and check whether their usage is consistent throughout, confirm the translated names can refer back to the original text; check the values of the terminology comparison draft in `variables` |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The two types of materials are entered separately, and field naming and date formats are not unified.
- Phenomenon: The expert appraisal opinions have been updated, but the investigation report still cites the old conclusions. Cause: Versions are not synchronized, and the range of historical messages covers outdated content.
- Phenomenon: Report materials lack receipts, and investigation reports lack signatures. Cause: The signature fields in the acceptance and deliberation stages were not filled in, and the material circulation records are incomplete.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions and see whether the second question picks up the referents of the first; check the memory turns value in the application settings, and confirm that the range of historical messages in `messages` matches the range of preceding text required by the question.

Business testing: Sample three terms and check whether their usage is consistent throughout, confirm the translated names can refer back to the original text, and check the values of the terminology comparison draft under `chatId` and `variables`.

- Check the current value of memory turns in the application settings, run a trial with two consecutive questions, and confirm that the second round correctly picks up the referents of the first round.
- Compare the usage records of two runs, confirm that the run consumption changes accordingly after adjusting the turns, and check that the opening message is not treated as preceding text.
