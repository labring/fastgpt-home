---
title: Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c015-f005
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Conversation | Review
meta_description: Student Mental Health: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Mental Health Screening and Referrals: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. Plans come from the start-of-semester census arrangements and contain scale names, administration dates, classes, and headcounts; interview records are filled in by psychological teachers one session at a time and contain student names, interview dates, and interviewer signatures; referral forms are initiated by homeroom teachers or psychological teachers and contain referral reasons, recipients, and receipt signatures. The three types of materials update at different rhythms: plans by semester, records by session, and referral forms by event. When entering the exception tracing and manual review function, plans are used to check screening criteria and rosters, interview records are used to check exception descriptions and dates, and referral forms are used to check flow and signatures. Multi-turn dialogue and prompts organize historical messages accordingly, supporting the generation of exception lists and review conclusions, which are ultimately handled by the person in charge.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the app settings, outputting the referenced historical message range and answer constraints. The exception list and review conclusions are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering; if the value is too small, prior context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turns | Matches the prior context range required by the question | Check the current value in the app settings, and test-run with two consecutive follow-up questions |
| Psychological screening plan | Scale names, administration dates, and class headcounts align item by item with interview records and referral forms | Sample the same student and compare whether the names, quantities, and dates in the three materials are consistent |
| Interview records | Interview dates, interviewer signatures, and exception descriptions correspond to the plan roster | Check records missing signatures or receipts, and confirm whether they can be traced to the source materials |
| Referral forms | Referral reasons, recipients, and receipt signatures are synchronized with the interview record version | Check entries whose versions are not synchronized or whose dates do not match, and mark them for review |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the plan and the interview record. Cause: The two materials are entered separately, without field-level comparison.
- Phenomenon: The referral form version is not synchronized, and the receipt is missing. Cause: Signatures were not backfilled during the flow, and the old version is still referenced.
- Phenomenon: When the second question uses a reference, the answer does not address the question. Cause: The memory turns are too small, the prior context is not referenced, and the answer lacks continuity.

## How to verify the setup

This function's acceptance: with two consecutive follow-up questions, see whether the second question carries forward the reference from the first question; check the historical range corresponding to `messages` and `chatId`, and confirm that the constraints in `variables` take effect.

Business test: create an exception record and see whether it can be traced to the source materials

- Check the memory turns value in the app settings, and compare the usage records of two runs
- Sample an exception record, and compare the names, quantities, dates, and signatures of the plan, interview record, and referral form
