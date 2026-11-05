---
title: Multi-Turn Conversation and Prompts for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c019-f005
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Conversation | Intake
meta_description: Course Scheduling: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the course selection, scheduling, and classroom resource allocation category. The materials come from three types of files: course offering plans, scheduling tables, and course selection rules. They are updated by semester and round, and the fields include course name, classroom number, capacity, start and end dates, signature, and receipt. When entering the Q&A intake and missing-item follow-up function, the course offering plan serves as the baseline for courses and capacity, the scheduling table serves as the basis for time and classroom occupancy, and the course selection rules serve as the basis for admission and conflict determination. If the names, quantities, or dates in the three materials do not match, or if versions are not synchronized or signatures and receipts are missing, the intake record will stop at the missing item and ask follow-up questions before answering.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the referenced historical message range and answer constraints. The intake record and the completed follow-up questions are then handled by the model, while the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the course name, capacity, course start date, and signature are consistent with the scheduling table | Check the memory turns value in the application settings, retrieve `messages` and `chatId` to observe the preceding context range, and compare the quantity and dates of courses with the same name in the two materials |
| Scheduling table | Whether the classroom number, time slot, version number, and receipt are synchronized with the course selection rules | Run a trial with two consecutive follow-up questions, use a reference in the second question, and check whether the classroom and time slot brought in by `variables` carry over from the first question |
| Course selection rules | Whether the admission conditions, conflict determination, effective date, and signature are complete | Compare the usage records of two runs, confirm that after adjusting the number of turns the preceding context range and consumption change in sync, and check the rule version |
| Intake record | Whether missing items are identified and followed up on, and whether answers are based on materials | Ask a question that lacks key information, see whether it asks follow-up questions before answering, and check which material the follow-up items correspond to |

## Three common errors

- Symptom: The name, quantity, or date of the same course does not match in the two materials. Cause: The course offering plan and scheduling table are updated separately, and no field-level comparison was performed.
- Symptom: The course selection rules have been revised, but intake still answers according to the old version. Cause: The version was not synchronized, and the materials did not mark the effective date and receipt.
- Symptom: After follow-up questions, answers become slower and consumption increases. Cause: The number of memory turns is too large and brings in irrelevant content, and the opening message is treated as preceding context.

## How to verify the setup

Acceptance for this function: run two consecutive follow-up questions, see whether the second question carries over the reference from the first question, and check the preceding context range and answer constraints corresponding to the three identifiers `messages`, `chatId`, and `variables`.

Business test: ask a question that lacks key information, and see whether it asks follow-up questions before answering

- Check the current memory turns value in the application settings, match it with the preceding context range required by the question, and compare the usage records of two runs.
- Run a trial with two consecutive questions, check whether the reference in the second round is correctly carried over, and check whether the material signatures and receipts are complete.
