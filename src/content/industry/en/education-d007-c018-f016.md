---
title: Forms and User Interaction for Undergraduate Curriculum Planning: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c018-f016
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Forms | Review
meta_description: Program Revision: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Undergraduate Curriculum Planning: Trace Exceptions and Review Results

## What this category's data looks like

Undergraduate program revision involves three types of materials: the program plan, course syllabi, and the credit structure table. The program plan is reviewed and approved by the college teaching committee, course syllabi are written by the course team and reviewed by the department chair, and the credit structure table is compiled by the academic affairs department. The revision cycle is usually once per academic year, and materials come from multiple parallel versions: the program plan defines total credits and course modules, course syllabi define course objectives and assessment methods, and the credit structure table defines the credit allocation for each module. The three types of materials must corroborate each other in names, quantities, dates, and signatures. When the materials enter the form input node, each plays its own role in field collection: the program plan provides course names and total credits, course syllabi provide course objectives and class hours, and the credit structure table provides module credits and study requirements, for subsequent nodes to compare.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusions" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course names, total credits, approval date, and signature are consistent with the course syllabi and credit structure table | Check the field names one by one in the node configuration, confirm that the course name and total credits fields are consistent with the program plan; reference this field in subsequent nodes and run a test |
| Course syllabi | Whether the course objectives, class hours, and assessment methods correspond to the course names and credits in the program plan | Check the required settings one by one, confirm that the course objectives and class hours fields are marked as required; use `formInput` to reference the field values and check whether subsequent nodes can retrieve them |
| Credit structure table | Whether the module credit quantities, study requirements, dates, and receipts match the program plan and course syllabi | Reference the `selectResult` output in subsequent nodes and run a test, check whether the module credits and study requirements are consistent with the program plan |
| Form input node | Whether it can be submitted when required items are empty, and whether subsequent nodes can retrieve the field values after submission | Check the required settings one by one, confirm that the key material fields are marked as required; fill it in once and submit, and check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: The name and credit quantity of the same course do not match between the program plan and the course syllabus. Cause: The two materials were filled in by different people at different times, without cross-checking.
- Symptom: The version of the credit structure table is not synchronized, and it still references the module division of the old version of the program plan. Cause: Version updates during the revision process were not communicated to all material maintainers.
- Symptom: The course syllabus lacks the department chair's signature or the credit structure table lacks a receipt. Cause: Signatures and receipts were not set as required during the submission step, and were not supplemented after the materials circulated.

## How to verify the setup

Feature acceptance: fill it in once and submit, and check the field values retrieved by subsequent nodes. Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirm that the field values are consistent with the submitted content.

Business testing: create an exception record and see whether the source material can be traced. Check whether the course name, credit quantity, and date in the exception record can find corresponding original records in the program plan, course syllabi, and credit structure table.

- Check the field names one by one in the node configuration, confirm that they correspond one-to-one with the material fields of the program plan, course syllabi, and credit structure table, and check the required settings one by one.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirm that after submission subsequent nodes can retrieve the corresponding field values, and that the conversation does not get stuck in the interactive state.
