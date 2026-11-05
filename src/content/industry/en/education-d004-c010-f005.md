---
title: Multi-Turn Conversation and Prompts for School Timetables and After-School Scheduling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c010-f005
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Conversation | Handover
meta_description: School Timetables: review conversation for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Timetables and After-School Scheduling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of primary and secondary school timetables and after-school service scheduling. The material sources are the master timetable exported from the academic scheduling system, teacher assignment tables, after-school service project tables, and the handover records and receipts for each stage. The update cadence follows the semester cycle: generated in a concentrated manner before the start of the term, and revised on a rolling basis during the term due to class adjustments, substitute teaching, and project additions or removals, with each revision forming a new version. The field characteristics center on class, course name, assigned teacher, number of class hours, project name, service time slot, effective date, version number, responsible person, and receipt status. The master timetable serves as the basis for the time slots and course distribution of all classes in the school, the teacher assignment table serves as the basis for verifying teacher workload and teaching relationships, and the after-school service project table serves as the registration basis for projects, time slots, and number of participants. When the three materials enter the drafting and handover stage, each serves as a field source and comparison baseline; the drafter consolidates them into a signable draft, which is then signed off by the responsible person to form a handover record. If any field shows a discrepancy in name, quantity, or date between two materials, it should be intercepted before signing.

## Configuration and implementation checks

This part is executed by the memory turn count and prompt configuration in the application settings, which output the referenced historical message range and answer constraints. The signable material draft and handover record are then completed by the model. The external entry point and authorization are handled by the publishing service and file permissions; the memory turn count and prompt configuration do not generate an access entry, nor do they perform identity or file authentication.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether class, course name, number of class hours, effective date, version number, and signature are consistent with the teacher assignment table | In the application settings, check the current memory turn count value, use `chatId` to associate multiple rounds of follow-up questions in the same session, and compare the name, quantity, and date of the two materials item by item |
| Teacher assignment table | Whether assigned teacher, number of class hours, effective date, and version number match the master timetable and the after-school service project table | Use `messages` to review the fields given earlier in the conversation, check whether the name, quantity, and date of the same record are consistent across different materials, and return it if a signature or receipt is missing |
| After-school service project table | Whether project name, service time slot, number of participants, effective date, version number, and receipt status are complete | Use `variables` to record the version number and date, check the corresponding fields between the project table and the master timetable and teacher assignment table, and confirm that the receipt is attached |
| Signable material draft and handover record | Fields are complete, the responsible person is clear, the version and date are consistent, and the next stage has signed off | Draft one according to the template and complete one handover, check whether missing items are intercepted, and confirm that the signature and receipt are complete |

## Three common errors

- Symptom: The course name or number of class hours of the same record does not match between the master timetable and the teacher assignment table. Cause: The two materials are maintained separately by different stages, and no field-level comparison was performed during drafting.
- Symptom: The version number and effective date of the after-school service project table lag behind the master timetable. Cause: After revision, only one material was updated, the version was not synchronized, and the date was not checked during handover.
- Symptom: The handover record lacks the responsible person's signature or the next stage's receipt. Cause: The signing process only checks whether fields are complete and does not list signature and receipt as release conditions.

## How to verify the setup

Acceptance of this feature: Run a trial with two consecutive follow-up questions. In the first question, provide the master timetable fields; in the second question, use a referential follow-up to ask about the number of class hours for the same record. See whether the second question carries forward the reference from the first question, and check whether `chatId`, `messages`, and `variables` are correctly referenced.

Business test: Draft one according to the template and complete one handover, and see whether missing items are intercepted.

- In the application settings, check the current memory turn count value, confirm that it matches the prior context range required by the question, and run a trial with two consecutive question rounds.
- Compare the usage records of two runs to confirm that after adjusting the turn count, the run consumption changes accordingly and the answers do not become slower.
