---
title: Forms and User Interaction for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c029-f016
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Forms | Intake
meta_description: Vocational Curricula: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

In the formulation of talent cultivation programs in vocational colleges, common materials include talent cultivation programs, course standards, job competency analysis tables, and the accompanying signature pages and receipts. Talent cultivation programs are usually compiled as volumes by major and grade, with fields including major name, program length, cultivation objectives, course modules, class hours and credits, graduation requirements, formulation date, and approval signatures; course standards are written one by one by course, with fields including course name, course code, class hours, assessment method, and signatures of the compiler and reviewer; job competency analysis tables list competency items, corresponding courses, and supporting materials by job cluster or typical work task, with fields including job name, competency entries, supporting courses, analysis date, and signatures of participants. The three types of materials have different sources and different update rhythms: programs are revised according to the major adjustment cycle, course standards are updated on a rolling basis with course reform, and job competency analysis tables are supplemented with enterprise research. When the materials enter question-and-answer intake and missing-item follow-up questions, each plays a different role: the program provides the overall framework and approval chain, the course standards provide the basis for course-level fields, and the job competency analysis table provides the correspondence between jobs and competencies, based on which missing-item follow-up questions locate the fields to be supplemented and the signatures to be supplemented.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Check whether the fields include major name, program length, course modules, class hours and credits, formulation date, and approval signatures, and whether the date and signatures are complete | Check the field names and required markers one by one in the node configuration, and after a trial run confirm that subsequent nodes can obtain the corresponding field values |
| Course standards | Check the course name, course code, class hours, assessment method, and signatures of the compiler and reviewer, and whether the version number and the program reference are synchronized | Check the required settings one by one, and reference the field in a subsequent node for a trial run to confirm that the field is passed normally after submission |
| Job competency analysis table | Check the job name, competency entries, supporting courses, analysis date, and signatures of participants, and whether the number of competency items corresponds to the course modules of the program | Check the field names in the node configuration, and use `formInputResult` and `selectResult` to reference the fields for a trial run to confirm that the values are correct |
| Intake record and items to be completed | Check whether missing items are identified and followed up on, whether the answers are based on materials, and whether they can be transferred to a handler | Ask a question missing key information, see whether it first asks a follow-up question before answering, and then check whether the record and items can be transferred to a handler |

## Three common errors

- Phenomenon: The same major name is written inconsistently in the program and the course standards, and the quantities and dates do not match. Cause: The two materials are maintained separately, without field-level comparison and unified naming.
- Phenomenon: The course standard version is not synchronized, and the course code referenced by the program does not match the current standard. Cause: After revision, it was not written back to the program, and the version number and effective date were not checked in a linked manner.
- Phenomenon: Approval signatures or receipts are missing, but the intake record still shows that it can be submitted. Cause: Key material fields were not marked as required, and the signature and receipt items were not validated after submission.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, and check whether the field values obtained by subsequent nodes are consistent with what was filled in, focusing on the values of `formInputResult` and `selectResult` and whether submission is possible when required items are empty.

Business test: Ask a question missing key information, see whether it first asks a follow-up question before answering, and check whether the follow-up items correspond to the missing fields of the talent cultivation program, course standards, and job competency analysis table.

- Check the field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the fields are passed normally after submission and that the conversation does not get stuck in the interaction state.
