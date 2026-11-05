---
title: Context and Token Budgets for Course Selection, Timetables and Classroom Allocation: Find Supporting Evidence
slug: /en/industry/education-d001-c019-f002
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Context & Tokens | Evidence
meta_description: Course Scheduling: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Course Selection, Timetables and Classroom Allocation: Find Supporting Evidence

## What this category's data looks like

This page focuses on the category of course selection and scheduling and classroom resource scheduling. The materials come from three types of files in this kindergarten: course offering plans, timetables, and course selection rules, updated on a rolling basis by semester and week. Course offering plans carry course names, weeks, and teacher signatures; timetables carry classrooms, time slots, and class correspondences; course selection rules carry capacity, priority, and receipt requirements. When these three types of materials enter the business basis query function, course offering plans and timetables serve as the sources for courses and spaces respectively, and course selection rules serve as the source of constraints, jointly supporting the generation of basis entries that can be traced back to the original text. Field verification focuses on dates, quantities, signatures, and version numbers. When versions are not synchronized or signatures are missing, entries cannot be matched to the original text.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), outputting the length of a single answer and the range of context that can be accommodated. "Basis entries that can be traced back to the original text" are then completed by the model, and entry and authorization are handled by the publishing service and file permissions. The response limit uses a slider to control the length of a single answer. If set too low, the answer will be truncated; if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Course names, weeks, and teacher signatures must be aligned item by item with the timetable, and the version number must be the current version | Check the switch and slider position in application settings, and compare the course names, weeks, and signature dates in the course offering plan and timetable |
| Timetable | Classrooms, time slots, and class quantities must be consistent with the capacity in the course selection rules, and dates must not be misaligned across semesters | Ask a question that requires a long answer and look at the ending, and check whether the classroom capacity and dates in the timetable and course selection rules are consistent |
| Course selection rules | Capacity, priority, and receipt requirements must correspond to the weeks in the course offering plan; without a receipt, the entry cannot be traced back | Compare the usage of two runs, and check whether the receipts in the course selection rules and the weeks in the course offering plan are synchronized |
| Response limit | Matches the answer length required by the page; `maxResponse` controls the length of a single answer | Check the slider position in application settings, and use `maxContext` and `quoteMaxToken` to record the context range and quote budget respectively |

## Three common errors

- Symptom: The name and weeks of the same course do not match in the two materials. Cause: The course offering plan and timetable are updated separately, versions are not synchronized, and the entry cannot be traced back to the original text.
- Symptom: Classroom capacity and the quantity in the course selection rules are inconsistent. Cause: The timetable and course selection rules have not been checked item by item, and there is cross-semester misalignment in the date and quantity fields.
- Symptom: Basis entries lack signatures or receipts. Cause: Teacher signatures are missing from the course offering plan, receipts for the course selection rules have not been archived, and the source is incomplete when replying to parents.

## How to verify the setup

This function's acceptance: ask a question that requires a long answer, check whether the ending is complete, and confirm that `maxResponse` matches the answer length required by the page.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check the range and budget recorded respectively by `maxContext` and `quoteMaxToken`.

- Check the response limit switch and slider position in application settings, and ask a question that requires a long answer to see whether the ending is complete.
- Compare the names, quantities, dates, and signatures in the course offering plan, timetable, and course selection rules, and confirm that the version is the current version.
