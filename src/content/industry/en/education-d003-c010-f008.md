---
title: Workflow Orchestration for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c010-f008
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Workflows | Intake
meta_description: School Timetables: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Timetables and After-School Scheduling: Handle Questions and Collect Missing Information

## What this category's data looks like

In the primary and secondary school timetable and after-school service scheduling scenario, the category materials entering the acceptance stage usually include the master timetable, teacher assignment table, and after-school service project table. The master timetable is updated by semester and week, with fields including class, course, period, venue, and assigned teacher; the teacher assignment table is maintained by teaching relationship, with fields including teacher, class, subject, weekly class hours, and signature; the after-school service project table is updated by project cycle, with fields including project name, participating classes, number of people, time slot, person in charge, and receipt. The three types of materials play different roles in acceptance: the master timetable is used to confirm time slots and class occupancy, the teacher assignment table is used to verify teaching relationships and class hours, and the after-school service project table is used to verify projects and number of people. After the materials enter the workflow, the acceptance node first collects question items, then branches according to user selections, and subsequent nodes complete the question items accordingly and form an acceptance record.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Acceptance record and completed question items" are continued by subsequent nodes according to the branch. When the node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether class, course, period, venue, and assigned teacher are consistent with the teacher assignment table and after-school service project table | Compare item by item the course name and assigned teacher for the same class and same period, check dates and signatures, and reference `nodeId` to run a trial once in a subsequent node |
| Teacher assignment table | Whether teacher, class, subject, and weekly class hours match the master timetable and after-school service project table | Check the class and weekly class hour counts of the same teacher in the two materials, check whether signatures or receipts are complete, and reference `variables` in a subsequent node to verify transmission |
| After-school service project table | Whether project name, participating classes, number of people, time slot, and person in charge are consistent with the master timetable and teacher assignment table | Check the name and number of people of the same project in the two materials, and check whether versions are synchronized and whether signatures or receipts are missing |
| Acceptance record | Whether missing items are identified and followed up, and whether answers are based on materials | Ask a question missing key information, observe whether it follows up before answering, and check whether the follow-up items correspond to material fields |

## Three common errors

- Phenomenon: The course names for the same class do not match between the master timetable and the teacher assignment table. Cause: The two materials are maintained by different steps, names are not unified, and versions are not synchronized.
- Phenomenon: The number of people in the after-school service project table is inconsistent with the number registered in the master timetable. Cause: The project table is updated by project cycle, while the master timetable is updated by week, so the update rhythms differ.
- Phenomenon: The teacher assignment table lacks signatures or receipts, making it impossible to confirm during acceptance. Cause: The material circulation step did not collect signed documents, and receipts were not archived.

## How to verify the setup

Acceptance of this function: run trials option by option, check the branch directions and interaction states in the run records, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` for verification.

Business test: ask a question missing key information and see whether it follows up before answering.

- In the node, check the options and branch connections one by one, trigger once, and view the node status in the run records.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the branch direction is consistent with the interaction state record.
