---
title: Forms and User Interaction for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c019-f016
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Forms | Intake
meta_description: Course Scheduling: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information

## What this category's data looks like

In the course selection, scheduling, and classroom resource allocation scenario, the materials entering the Q&A intake stage are mainly of three types: the course offering plan, the scheduling table, and the course selection rules. The course offering plan usually comes from the academic affairs office, is published by semester and updated as courses are adjusted, and its fields include course name, offering unit, credits, instructor, and planned number of classes; the scheduling table is maintained by the scheduling post by week, and its fields include course name, class, teacher, classroom number, day and period, and start and end weeks; the course selection rules are confirmed jointly by academic affairs and the departments, and their fields include selection batch, capacity cap, priority conditions, add/drop deadline, and signature and receipt. When the three enter the form input node, their roles differ: the course offering plan provides the course and class base, the scheduling table provides time and space occupancy, and the course selection rules provide the constraints on which intake and follow-up are based. In terms of update rhythm, the course offering plan is set first, the scheduling table then rolls forward, and the course selection rules are locked before the batch. Field characteristics are multiple names, multiple dates, and multiple signature slots; the name, number of classes, and dates of the same course in different materials are prone to mismatch, and when versions are not synchronized or signatures and receipts are missing, the intake record and the items to be completed need to first identify the missing items before following up.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). After the form is triggered, the conversation enters the interaction state and the workflow state is recorded; only after the user fills in the required items and submits are the field values passed onward. The "intake record and the items to be completed" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Check the course name, offering unit, credits, planned number of classes, and publication date according to the category's check dimensions, and compare them item by item with the scheduling table | Check the field names and required markers one by one in the node configuration; after submission, have subsequent nodes reference the field and run a trial |
| Scheduling table | Check the course name, class, teacher, classroom number, day and period, start and end weeks, and version date according to the category's check dimensions | Check whether the name, quantity, and dates of the same course in the two materials are consistent, and whether missing items are followed up |
| Course selection rules | Check the selection batch, capacity cap, priority conditions, add/drop deadline, and signature receipt according to the category's check dimensions | Check whether the signature or receipt is complete, whether the version is synchronized, and whether key information is missing and is followed up before answering |
| Form input node | After triggering, it enters the interaction state and records the workflow state; it cannot be submitted if a required item is empty | Use `formInputResult` and `selectResult` to configure the fields, and check that subsequent nodes can retrieve the corresponding field values after submission |

## Three common errors

- Symptom: the name and number of classes of the same course do not match between the course offering plan and the scheduling table. Cause: the two materials are maintained separately and are not compared item by item against the same record.
- Symptom: the course selection rules have been updated, but the scheduling table still uses the old version, causing deviation in the basis for intake. Cause: versions are not synchronized, and there is no unified update and confirmation node.
- Symptom: the course selection rules lack a signature or receipt, so the validity of the constraints cannot be confirmed after intake. Cause: the signature slot is not marked as required and is not blocked at submission.

## How to verify the setup

Acceptance of this feature: fill it in once and submit, and check whether the field values retrieved by subsequent nodes are consistent with what was filled in the form, focusing on `formInputResult` and `selectResult`, and the required markers.

Business test: submit a question that lacks key information and see whether it follows up before answering; after the information is completed, transfer it to the handler for processing.

- Check the field names and required markers one by one in the node configuration; after submission, have subsequent nodes reference the field and run a trial.
- Compare the names, quantities, dates, versions, and signature receipts of the course offering plan, scheduling table, and course selection rules according to the category's check dimensions.
