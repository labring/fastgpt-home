---
title: Context and Token Budgets for School Timetables and After-School Scheduling: Find Supporting Evidence
slug: /en/industry/education-d001-c010-f002
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Context & Tokens | Evidence
meta_description: School Timetables: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Timetables and After-School Scheduling: Find Supporting Evidence

## What this category's data looks like

This page focuses on primary and secondary school timetables and after-school service scheduling. The materials include the master timetable, teacher assignment table, and after-school service project table. The master timetable records class, week number, period, course name, assigned teacher, and venue. It is usually updated by semester and includes the academic affairs office seal and date. The teacher assignment table records teacher name, subject taught, class, weekly class hours, and signed confirmation. It is adjusted by semester or by school month. The after-school service project table records project name, list of participating students, number of class hours, charging method, parent receipt, and school seal. It is updated on a rolling basis according to the project cycle. When these three types of materials enter this function, the master timetable and assignment table serve as the source basis, and the after-school service project table serves as supplementary basis. Based on this, the model generates basis entries that can be traced back to the original text, for replying to parents or writing into plans.

## Configuration and implementation checks

This step is executed by application settings (response limit, etc.), which determine the length of a single answer and the range of context that can be accommodated. "Basis entries that can be traced back to the original text" are then completed by the model. The response limit is controlled by a slider to set the length of a single answer. If set too low, the answer will be truncated; if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Fields include class, week number, period, course name, assigned teacher, and venue; date and academic affairs office seal are complete | Check whether the course names, weekly class hours, and dates in the master timetable and teacher assignment table are consistent, and inspect the signature field |
| Teacher assignment table | Fields include teacher name, subject taught, class, weekly class hours, and signed confirmation; version is the current semester | Check whether the teacher names, classes, and class hours in the assignment table and master timetable match, and inspect signatures and dates |
| After-school service project table | Fields include project name, list of participating students, number of class hours, charging method, parent receipt, and school seal | Check whether the project names, quantities, and dates in the project table, master timetable, and assignment table are consistent, and inspect receipts and seals |
| Response limit | Matches the answer length required by the page, and uses a slider to control the length of a single answer | In application settings, check the switch and slider position, and confirm that `maxResponse` matches the answer length |

## Three common errors

- Symptom: The name or quantity of the same course does not match across two materials. Cause: The master timetable and assignment table were not updated in sync, or the name was entered inconsistently.
- Symptom: The dates and class hours in the after-school service project table and the master timetable are inconsistent. Cause: The versions were not synchronized, and the master timetable was not updated after the project cycle was adjusted.
- Symptom: Materials lack signatures or receipts, and basis entries cannot be traced back to the original text. Cause: The signature field is blank or the parent receipt was not archived, and the original and electronic versions are inconsistent.

## How to verify the setup

This function's acceptance check: ask a question that requires a long answer and see whether the ending is complete; if it breaks off in the middle of a sentence, increase the response limit slider and retry, and confirm that `maxResponse` matches the answer length.

Business test: ask a basis question that spans materials and see whether the answer gives a traceable source; check the tokens of the quoted text against the `quoteMaxToken` budget, and record the number of array items separately, without comparing it for equality with `quoteMaxToken`.

- In application settings, check the response limit switch and slider position, and confirm that `maxResponse` matches the answer length required by the page.
- Ask a question that requires a long answer and see whether the ending is complete; compare usage across two runs to confirm the change in single-run usage after adjusting the limit.
