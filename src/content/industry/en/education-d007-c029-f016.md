---
title: Forms and User Interaction for Vocational College Curriculum Planning: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c029-f016
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Forms | Review
meta_description: Vocational Curricula: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational College Curriculum Planning: Trace Exceptions and Review Results

## What this category's data looks like

The formulation of talent cultivation programs in vocational colleges involves three types of materials: talent cultivation programs, course standards, and job competency analysis tables. Talent cultivation programs are drafted under the leadership of the academic affairs office, course standards are written by the teaching and research offices of each major, and job competency analysis tables are jointly filled in by professional teachers and industry personnel. The materials are updated by academic year, with a revision cycle usually of one year, and are revised on an ad hoc basis when there are major adjustments or policy changes. Field characteristics include course name, class hours and credits, semester offered, signature column, and date column. When the three types of materials enter the form input node, each plays a different role: the talent cultivation program provides the overall framework and course list, the course standard provides specific content and teaching requirements, and the job competency analysis table provides the correspondence between job tasks and competencies. During exception tracing, the same record in the three types of materials must be compared field by field to confirm whether the names, quantities, and dates are consistent, whether the versions are synchronized, and whether the signatures and receipts are complete.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusions are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Whether the course name, class hours and credits, semester offered, date, and signature column are consistent with the course standard | Compare the two materials field by field, check the signatures and dates, and record inconsistent items |
| Course standard | Whether the course content, class hour allocation, assessment method, version number, and receipt correspond to the job competency analysis table | Check the version number and receipt, and inspect for missing signatures or lack of synchronization |
| Job competency analysis table | Whether the job tasks, competency requirements, and corresponding course names and quantities match the talent cultivation program | Match job tasks and courses one by one, and check the quantities and dates |
| Form input node | Field names correspond one-to-one with material fields, and required markers cover key material fields | Check field names and required settings one by one in the node configuration, reference fields with `formInputResult`, and run a trial |

## Three common errors

- Symptom: The name and class hours of the same course do not match between the talent cultivation program and the course standard. Cause: The two materials were filled in separately by different personnel, no cross-check was performed, and the versions were not synchronized.
- Symptom: The number of jobs in the job competency analysis table is inconsistent with the number of courses in the talent cultivation program. Cause: The materials were not updated synchronously after revision, and receipts or signature confirmations are missing.
- Symptom: After submission, subsequent nodes cannot retrieve field values, or submission is still possible when required items are empty. Cause: Field names are inconsistent with references in subsequent nodes, and required markers do not cover key fields.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit it, check the field values retrieved by subsequent nodes, confirm that `formInputResult` and `selectResult` references are correct, and confirm that submission is not possible when required items are empty.

Business test: create an exception record, see whether it can be traced back to the source material, and check the names, quantities, dates, and signatures in the talent cultivation program, course standard, and job competency analysis table.

- In the node configuration, check one by one that the form field names correspond one-to-one with the material fields, and check whether the required markers cover key material fields.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission and that the conversation does not remain in the interaction state.
