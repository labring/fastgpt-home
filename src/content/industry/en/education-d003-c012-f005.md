---
title: Multi-Turn Conversation and Prompts for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c012-f005
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Conversation | Intake
meta_description: Teaching Reviews: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for District Teaching Research and Classroom Reviews: Handle Questions and Collect Missing Information

## What this category's data looks like

District and county teaching research activities and classroom observation and evaluation involve three types of materials: teaching research activity notices, classroom observation records, and classroom evaluation minutes. Notices come from teaching research office documents and are updated weekly or by activity batch; fields include activity name, time, location, participating schools, and agenda. Classroom observation records are filled out by observers after class; fields include class, subject, topic, observation points, and signature. Classroom evaluation minutes are compiled by the host school; fields include review points, conclusions, and receipt. When the three types of materials enter Q&A intake, their roles differ: notices provide the basis for dates and scope, classroom observation records provide the basis for classroom facts, and classroom evaluation minutes provide the basis for review conclusions and signed receipts. A common field characteristic is that multiple materials use different names, quantities, and dates for the same activity; when versions are not synchronized, old drafts are still cited, and when signatures or receipts are missing, conclusions cannot be assigned responsibility. Intake records need to map question items to material sources; after missing items are identified, follow-up questions are asked before answering.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The intake records and the completed follow-up question items are then completed by the model. Memory turns control how many previous dialogue turns can be referenced at most when answering; the value should match the prior context range required by the question. If too small, the prior context cannot be used; if too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Whether the activity name, date, participating schools, and agenda are consistent with the classroom observation records and classroom evaluation minutes | In the application settings, check the memory turns value, run a trial with two consecutive question turns, and check whether the second turn can carry forward the reference from the first turn; compare the historical range in `messages` with the notice fields |
| Classroom observation record | Whether class, subject, topic, observation points, and signature are complete, and whether the date matches the notice | Use `chatId` to locate the same session and check the quantities and dates in the record; when signatures or receipts are missing, ask follow-up questions before answering |
| Classroom evaluation minutes | Whether review points, conclusions, receipt, and signature are complete, and whether the version is synchronized | Check the material version brought in through `variables`, and check whether the minutes conclusions are overwritten by old drafts; when fields do not match, list them as follow-up question items |
| Intake records and completed follow-up question items | Whether missing items are identified and followed up on, and whether answers have material basis | Ask a question missing key information and see whether follow-up questions are asked before answering; before transferring to the host, check the question items against the material sources |

## Three common errors

- Phenomenon: the name, quantity, and date of the same activity do not match between the notice and the minutes. Cause: the two materials are updated separately and fields are not checked against the same version.
- Phenomenon: old drafts are still cited, and the review conclusions are inconsistent with the current notice. Cause: versions are not synchronized, and the historical message range brings in expired content.
- Phenomenon: classroom observation records lack signatures or receipts, and conclusions cannot be assigned responsibility. Cause: the material collection step does not check the signature and receipt fields.

## How to verify the setup

Acceptance for this feature: with two consecutive follow-up question turns, see whether the second question carries forward the reference from the first question; check the referenced historical message range and answer constraints in `messages`.

Business test: ask a question missing key information and see whether follow-up questions are asked before answering.

- In the application settings, check the current memory turns value and match it with the prior context range required by the question.
- Use `chatId` and `variables` to locate the same session and material version, and compare the fields, dates, and signatures of the notice, classroom observation record, and classroom evaluation minutes.
