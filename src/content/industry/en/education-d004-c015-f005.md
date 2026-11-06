---
title: Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c015-f005
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Conversation | Handover
meta_description: Student Mental Health: review conversation for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of primary and secondary school mental health screening and referral, organizing the field, date, and signature characteristics of three types of materials: screening plans, interview records, and referral forms. Screening plans typically include screening subjects, tool names, implementation time, responsible person, and reviewer; interview records include interviewee identifiers, interview time, interviewer, main topics, and follow-up recommendations; referral forms include referral source, receiving party, reason for referral, urgency level, handover person, and receipt. Materials are mostly updated by semester or batch, and the same record must maintain consistent names, quantities, and dates across the plan, record, and referral form, with versions synchronized upon revision, and signatures and receipts must not be missing. When materials enter multi-turn dialogue and prompt features, the screening plan provides field templates and judgment criteria, the interview record provides round-by-round context and referential objects, and the referral form provides handover destination and acknowledgment requirements; the number of memory rounds determines the range of historical messages referenced in answers, and prompts constrain answer format and field completeness.

## Configuration and implementation checks

This step is executed by the memory rounds and prompt configuration in the application settings, outputting the referenced range of historical messages and answer constraints. Draftable material drafts and handover records are then completed by the model. The number of memory rounds controls how many previous rounds of dialogue are referenced at most when answering; too small a value fails to use prior context, while too large a value brings in irrelevant content and increases consumption.

| Object | Check | Verification action |
| --- | --- | --- |
| Mental health screening plan | Fields complete: screening subjects, tool names, implementation time, responsible person, and reviewer all present; dates and versions consistent; signatures complete | Check the memory rounds value in the application settings, run a trial with two consecutive questions, and check whether the plan fields are fully referenced |
| Interview record | The same record's names, quantities, and dates match between the interview record and the referral form; interviewer signature and time are clear | Use `chatId` and `messages` to check the range of historical messages, and confirm that the second round of follow-up can carry forward the references from the first round |
| Referral form | Receiving party, reason for referral, urgency level, handover person, and receipt all present; versions and dates synchronized; missing items are blocked | Use `variables` to check the referral form field variables, compare the usage records of two runs, and confirm that consumption changes after adjusting the rounds |

## Three common errors

- Phenomenon: The same record's names, quantities, and dates do not match between the screening plan and the referral form. Cause: During drafting, the unified field template was not used for verification, and an overly large range of historical messages brought in old version content.
- Phenomenon: The versions of the interview record and referral form are not synchronized, and signatures or receipts are missing. Cause: The prompt did not constrain version and signature fields, and too many memory rounds introduced irrelevant historical messages.
- Phenomenon: When the second question uses references, the answer does not address the question, and responses become slower with increased consumption. Cause: Too few memory rounds fail to use prior context, or too many bring in irrelevant content and increase consumption.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions, see whether the second question carries forward the references from the first question, and check whether the three identifiers `chatId`, `messages`, and `variables` are correctly referenced within the range of historical messages.

Business test: Draft one document according to the template and complete one handover, and see whether missing items are blocked.

- Check the current memory rounds value in the application settings, and confirm it matches the range of prior context required by the question.
- Compare the usage records of two runs, and confirm that consumption changes accordingly after adjusting the rounds.
