---
title: Context and Token Budgets for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c019-f002
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Context & Tokens | Checks
meta_description: Course Scheduling: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Course Selection, Timetables and Classroom Allocation: Compare Documents and Locate Differences

## What this category's data looks like

Material verification and discrepancy localization for course selection, scheduling, and classroom resource allocation revolve around three types of materials: course offering plans, scheduling tables, and course selection rules. Course offering plans are issued by the academic affairs office and include course names, number of classes, start and end dates, and approval signatures; scheduling tables are maintained by the scheduling role and include weeks, periods, classroom numbers, and capacities; course selection rules are updated by the rule maintainer and include selection batches, enrollment caps, and effective dates. Materials are centrally distributed at the beginning of the semester and updated on a rolling basis during the semester due to schedule adjustments, classroom changes, and rule revisions, with fields mainly consisting of names, quantities, dates, signatures, and receipts. When the three types of materials enter this function, the course offering plan serves as the baseline ledger, the scheduling table serves as the object to be verified, and the course selection rules serve as the constraint source, jointly supporting the generation and write-back of the discrepancy list.

## Configuration and implementation checks

This step is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. The "discrepancy list" is then completed by the model. The response limit uses a slider to control the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Check whether the course name, number of classes, start and end dates, and approval signature are consistent with the ledger | Compare fields one by one, record inconsistent items, confirm whether signatures and receipts are complete, and when budget references are involved, check `quoteMaxToken` |
| Scheduling table | Check whether the weeks, periods, classroom numbers, and capacities correspond to the course offering plan | Locate records by course and class, mark fields where names, quantities, or dates do not match, and in long-answer scenarios pay attention to `maxResponse` and `maxContext` |
| Course selection rules | Check whether the selection batches, enrollment caps, and effective dates are synchronized with the scheduling table | Check the version number and update date, confirm that the rules are not lagging behind scheduling changes, and list items missing signatures or receipts separately |

## Three common errors

- Symptom: The number of classes for the same course does not match between the course offering plan and the scheduling table. Cause: The scheduling table is split by teaching class, while the course offering plan is aggregated by administrative class, and the definitions are not unified.
- Symptom: The effective date of the course selection rules is earlier than the classroom change date in the scheduling table. Cause: After the rules were revised, they were not synchronized and written back, and the version remained at the previous round.
- Symptom: Some records in the discrepancy list lack approval signatures or receipts. Cause: The signature step was completed in a paper process and was not returned to the electronic materials, so it was omitted during verification.

## How to verify the setup

Acceptance of this function: ask a question that requires a long answer, check whether the ending is complete, confirm that the response limit matches `maxResponse`, and that the answer is not cut off in the middle of a sentence.

Business test: use a real record to find fields inconsistent with the ledger, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- In the application settings, check the response limit switch and slider position, and confirm that the single-answer length matches the page requirements.
- Compare usage from two runs to confirm that the change in single-run usage after adjusting the limit is within the expected range.
