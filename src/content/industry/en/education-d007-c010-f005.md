---
title: Multi-Turn Conversation and Prompts for School Timetables and After-School Scheduling: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c010-f005
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Conversation | Review
meta_description: School Timetables: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Timetables and After-School Scheduling: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses primary and secondary school timetable and after-school service scheduling scenarios. The source materials are the master timetable exported from the academic affairs system, the teacher assignment table, the after-school service project table, and paper-signed receipts. The update cadence is centralized publication at the start of the semester, with sporadic revisions during the semester based on schedule adjustments and project changes. The three types of materials each emphasize different fields: the master timetable contains class, period, course name, assigned teacher, and effective date; the teacher assignment table contains teacher name, classes taught, weekly class hours, and a signature column; the after-school service project table contains project name, number of participants, venue, start and end dates, and the responsible person's signature. When the materials enter the multi-turn dialogue and prompt stage, each plays a different role: the master timetable provides the baseline for classes and periods, the teacher assignment table is used to verify teaching relationships and class hour totals, and the after-school service project table is used to verify project names, participant counts, and dates. During exception tracing, first locate the inconsistent fields, then return to the original materials to verify signatures and receipts, forming an exception list and review conclusions.

## Configuration and implementation checks

This step is executed by the memory turn count and prompt configuration in the application settings, outputting the reference range of historical messages and answer constraints. The exception list and review conclusions are then completed by the model. The memory turn count controls how many previous dialogue turns can be referenced at most when answering, and its value must match the range of prior context required by the question.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether class, period, course name, assigned teacher, and effective date correspond one by one with the teacher assignment table | Check the memory turn count value in the application settings, run a trial with two consecutive follow-up questions, check whether the second round can carry forward the references from the first round, and record `messages` and `chatId` |
| Teacher assignment table | Whether teacher name, classes taught, weekly class hours, and signature column are consistent with the names and quantities in the master timetable | Compare the teacher names and class hour totals in the two materials, mark records that do not match, trace back to the original signed receipts, and confirm whether the versions are synchronized |
| After-school service project table | Whether project name, number of participants, venue, start and end dates, and responsible person's signature are consistent with the master timetable and receipts | Verify project names and participant counts, check whether dates conflict with the effective dates in the master timetable, and list records missing signatures or receipts separately |
| Exception list and review conclusions | Whether each exception is supported by original records and whether the reviewer has signed | Attach each exception to the original material number one by one, check the reviewer's signature column, and confirm that the conclusions can be handed over to the responsible person for handling |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the master timetable and the teacher assignment table. Cause: The two materials are maintained separately, no field-level comparison is performed, and versions are not synchronized.
- Phenomenon: The after-school service project table lacks signatures or receipts, and exception records cannot be traced. Cause: No supplementary signature was made after changes, paper receipts were not archived, and there is no evidence in the review step.
- Phenomenon: In consecutive follow-up questions, the second question uses references, and the answer is off-topic. Cause: The memory turn count is too small to use prior context, or the opening message is treated as prior context and brings in irrelevant content.

## How to verify the setup

Acceptance of this feature: Ask two consecutive follow-up questions and see whether the second question carries forward the references from the first question; at the same time, check whether `messages` and `chatId` correctly continue with the dialogue, and whether `variables` are injected according to the configuration.

Business test: Create an exception record, see whether it can be traced back to the source material, and confirm that the reviewer's signature and receipts are complete.

- Check the current value of the memory turn count in the application settings, match it with the range of prior context required by the question, and compare the usage records of two runs.
- Run a trial with two consecutive follow-up questions, check how the second round carries forward references, and verify the actual values of `messages`, `chatId`, and `variables` in the dialogue.
