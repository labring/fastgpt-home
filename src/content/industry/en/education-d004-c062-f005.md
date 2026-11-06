---
title: Multi-Turn Conversation and Prompts for Research Ethics Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c062-f005
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Conversation | Handover
meta_description: Research Ethics: review conversation for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Ethics Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the research ethics review scenario, materials revolve around ethics review applications, informed consent form templates, and risk assessment forms. Sources are project team drafts and institutional templates, and the update cadence follows protocol revisions and annual re-reviews. An ethics review application must list the study name, principal investigator, version number, and signature field; an informed consent form template must match the study name, number of subjects, and date; a risk assessment form must be consistent with the risk level and data collection method in the application. When materials enter multi-turn dialogue and prompt configuration, they respectively play the roles of a draft to be written, a template to be compared, and a field table to be verified, based on which the model generates a signable draft and handover record. After the fields are complete, the responsible person is clear, and the version and date are consistent, it is handed to the next stage for acceptance.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, and outputs the reference range of historical messages and answer constraints. The signable material draft and handover record are then completed by the model. The memory turns control how many previous turns of dialogue can be referenced at most when answering. If the value is too small, the preceding text cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The study name, principal investigator, version number, date, and signature field are complete and consistent with the informed consent form template | Check the current memory turns in the application settings, run a trial with two consecutive follow-up questions, check whether the second question picks up the reference from the first question, and record the fields in `chatId` and `messages` |
| Informed consent form template | The number of subjects, study name, date, and application record align item by item, and the version number is synchronized | Compare the name, number, and date in the two materials, check whether `variables` bring in the correct values, and intercept when the signature or receipt is missing |
| Risk assessment form | The risk level and data collection method are consistent with the application, and the date and version are synchronized | Draft one according to the template and complete one handover, check whether missing items are blocked, and whether the receipt is retained |

## Three common errors

- Phenomenon: The name, number, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: No field-level comparison was made during drafting, and the version was not synchronized.
- Phenomenon: The handover record lacks a signature or receipt, and the next stage cannot accept it. Cause: The template did not set a signature field and receipt field, and the responsible person and date were not filled in.
- Phenomenon: When the second question uses a reference, the answer does not address the question, and the response becomes slower with increased consumption. Cause: The value of the memory turns does not match the range of preceding text required by the question, and the opening message is treated as preceding text.

## How to verify the setup

This feature acceptance: Ask two consecutive follow-up questions, see whether the second question picks up the reference from the first question, and check whether `chatId`, `messages`, and `variables` are brought in as expected.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the current memory turns in the application settings, run a trial with two consecutive follow-up questions, and confirm that the second round correctly picks up the reference from the first round.
- Compare the usage records of two runs and check whether the run consumption changes accordingly after adjusting the number of turns.
