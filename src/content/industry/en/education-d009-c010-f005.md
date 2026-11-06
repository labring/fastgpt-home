---
title: Multi-Turn Conversation and Prompts for School Timetables and After-School Scheduling: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c010-f005
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Conversation | Multilingual
meta_description: School Timetables: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Timetables and After-School Scheduling: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses primary and secondary school timetable and after-school service scheduling scenarios. Materials include the master timetable, teacher assignment table, and after-school service project table, sourced from the academic affairs office, grade groups, and after-school service management positions, updated at the beginning of the semester, end of the month, and adjustment weeks. The master timetable fields include class, day of the week, period, course name, assigned teacher, venue, start and end dates, and signature column; the teacher assignment table fields include teacher, class, course name, weekly class hours, teaching start and end, and signature; the after-school service project table fields include project name, participating classes, responsible teacher, week number, date, and receipt. When these three types of materials enter multilingual materials and terminology handling, the master timetable serves as the main terminology anchor, the teacher assignment table serves as the cross-reference for person names and course names, and the after-school service project table serves as the cross-reference for project names and dates. The multi-turn dialogue and prompt stages are responsible for fixing the terminology wording from the preceding text, and the model then produces the unified terminology table and cross-reference draft.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, outputting the historical message range and answer constraints for reference. The model then completes the unified terminology table and cross-reference draft. The memory turns control how many preceding dialogue turns can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | The same course name and teacher name are written consistently throughout, and the dates and signature column can be traced back to the original text | Check the current memory turns value in the application settings, run a trial with two consecutive questions, check whether the second question inherits the reference from the first question, and verify the terminology wording in the preceding text in `messages` |
| Teacher assignment table | The names, weekly class hours, and dates of the same teacher and course records match between the master timetable and the assignment table | Sample three terms to check whether the wording is consistent throughout, compare the teacher names and course names in the two materials, and record the conversation range corresponding to `chatId` |
| After-school service project table | The names, quantities, and dates of the same project name and participating classes match between the project table and the master timetable, and no receipt is missing | Check the project name, week number, date, and receipt column, check whether the versions are synchronized, and if necessary use `variables` to mark items pending verification |
| Unified terminology table and cross-reference draft | The same term is consistent throughout, the translated name can be traced back to the original text, and sampling three terms shows consistent wording throughout | Sample three terms and compare them one by one against the master timetable, teacher assignment table, and after-school service project table, confirming that there are no unsynchronized versions and no missing signature receipts |

## Three common errors

- Phenomenon: The same course name is written differently in the master timetable and the teacher assignment table. Cause: The two materials are maintained separately, no terminology cross-reference has been done, and the versions are not synchronized.
- Phenomenon: The number of after-school service projects does not match between the two materials. Cause: After the project table was updated, it was not written back to the master timetable, and the dates and quantities were not rechecked.
- Phenomenon: The second question answers something unrelated when using a reference. Cause: The memory turns value does not match the range of preceding text required by the question, and the preceding terminology is not stably referenced.

## How to verify the setup

Acceptance of this feature: Ask two consecutive follow-up questions, see whether the second question inherits the reference from the first question, and check the current memory turns value in the application settings.

Business test: Sample three terms to check whether the wording is consistent throughout, and confirm that the translated names can be traced back to the original text.

- Check the current memory turns value in the application settings, run a trial with two consecutive questions, and compare the usage records of the two runs.
- Sample three terms and compare them one by one against the master timetable, teacher assignment table, and after-school service project table, and record the preceding text range corresponding to `messages` and `chatId`.
