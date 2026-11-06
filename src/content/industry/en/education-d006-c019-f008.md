---
title: Workflow Orchestration for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics
slug: /en/industry/education-d006-c019-f008
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Workflows | Progress
meta_description: Course Scheduling: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Course Selection, Timetables and Classroom Allocation: Track Progress and Check Statistics

## What this category's data looks like

This category's materials for course selection, scheduling, and classroom resource allocation include three sources: the course offering plan, the timetable, and the course selection rules, which enter the workflow at three rhythms: before the semester, during selection week, and weekly updates. The course offering plan provides course names, credits, and start dates, and is the starting point for course rows in the progress table; the timetable provides classrooms, time slots, and week numbers, and is the source of the session and capacity fields in the statistical scope; the course selection rules provide enrollment caps, prerequisites, and exception clauses, and determine whether the statistics include auditing and retaking. When the three materials enter this feature, their roles differ: the course offering plan and the timetable serve as the backbone of the progress records, while the course selection rules serve as the basis for determining the statistical scope description, with field characteristics concentrated in course codes, classroom numbers, dates, headcounts, and signature fields. Workflow nodes are triggered after the materials are complete, leaving field discrepancies among the three materials to be verified by subsequent nodes along branches.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The "progress table and statistical scope description" is then completed by subsequent nodes continuing execution along branches. When a node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the chosen option.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the course name, credits, start date, and signature field correspond one by one with the timetable, and whether the dates fall within the same semester week numbers | Check the options and branch connections one by one in the node, pair course offering plan rows with timetable rows by course code, and record date inconsistencies |
| Timetable | Whether the classroom number, time slot, week numbers, and capacity are consistent with the enrollment caps and exception clauses in the course selection rules, and whether the version numbers are synchronized | Trigger a user selection node once, view the node status in the run record, and confirm that the timetable version and the course selection rules version entered in the same batch |
| Course selection rules | Whether the enrollment caps, prerequisites, and exception clauses are written into the statistical scope header, and whether entries missing signatures or receipts are listed separately | Reference the selection result variable in a subsequent node and run a trial once, checking whether the rule entries match the progress table totals |

## Three common errors

- Symptom: The name and headcount of the same course do not match between the course offering plan and the timetable. Cause: The two materials are updated separately, pairing verification by course code is not performed, and versions are not synchronized.
- Symptom: The statistical totals differ from the progress table record count by several entries. Cause: The exception clauses of the course selection rules are not written into the header, and whether auditing and retaking are included in the scope is not clearly stated.
- Symptom: The timetable lacks signatures or receipts, and the course selection rules have no version number. Cause: Signature fields and receipts are not retained during material circulation, making traceability impossible after entering the workflow.

## How to verify the setup

Feature acceptance: Run trials option by option, check the branch directions and interaction states in the run records, confirm that `variables`, `nodeId`, and option branches correspond, and that the process continues after the interaction is completed.

Business test: Use one week of records to check the totals, see whether the scope and exceptions are clearly stated, and check whether the totals match the progress table after `variables` are referenced in subsequent nodes.

- Check the options and branch connections one by one in the node, record the branch direction corresponding to each option in the run record, and verify `nodeId` and branch references.
- Reference the selection result variable in a subsequent node and run a trial once, use one week of records to check the totals, and check whether the scope and exceptions are written into the header.
