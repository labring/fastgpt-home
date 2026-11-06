---
title: Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c006-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Forms | Review
meta_description: Kindergarten Quality: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the kindergarten operation behavior and quality self-assessment scenario. Materials include three types: self-assessment reports, issue lists, and rectification plans. Self-assessment reports are updated by semester or academic year, with fields covering operating conditions, safety and hygiene, care and education, faculty and staff, internal management, and a signature section; issue lists are formed on a per-instance basis, with fields covering issue description, class involved, responsible person, discovery date, and rectification deadline; rectification plans are updated on a rolling basis following the issue lists, with fields covering measures, completion time, and acceptance person. After materials enter the form input node, each takes on a field collection role: the self-assessment report provides the overall conclusion and signature information, the issue list provides exception entries and pointers to original records, and the rectification plan provides follow-up handling and receipt clues. The update cadence commonly follows a cycle of semester self-assessment, monthly inspection, and rectification closure. Field characteristics are multi-table crossover, dense dates, and clear signature and receipt requirements; the same record is prone to mismatches in name, quantity, and date due to different versions.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Check whether the self-assessment report fields, dates, and signatures are consistent with the issue list and rectification plan, and whether the same record's name, quantity, and date match up | Check field names one by one in the node configuration, confirm that the self-assessment report fields correspond one-to-one with the form fields, and check the required markers |
| Issue list | Check whether the issue list's discovery date, responsible person, and rectification deadline are synchronized with the versions of the self-assessment report and rectification plan, and whether missing signatures or receipts can be detected | Reference the issue list fields in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved after submission; `formInput` can be used to reference the form input |
| Rectification plan | Check whether the rectification plan's measures, completion time, and acceptance person correspond item by item with the issue list, and whether receipts are complete | Reference the rectification plan fields in subsequent nodes and run a test to confirm that field passing works normally; if selection items are involved, check that the `userSelect` values are consistent with the materials |
| Form input node | Check field passing after submission, whether submission is possible when required items are empty, and whether the conversation stays in the interactive state | Fill it out once and submit, reference `formInputResult` and `selectResult` in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved |

## Three common errors

- Symptom: the same record's name, quantity, and date do not match between the self-assessment report and the issue list. Cause: the two materials are entered separately, no field-level cross-check is performed, and versions are not synchronized.
- Symptom: the rectification plan has been updated, but the issue list still shows the old deadline, and signatures or receipts are missing. Cause: the materials have different update cadences, and after submission the field values are not written back or re-collected.
- Symptom: after submission, subsequent nodes cannot retrieve values, and submission is possible even when required items are empty. Cause: field names are inconsistent with the references in subsequent nodes, and required markers were not checked one by one.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` references work normally, that submission is not possible when required items are empty, and that the conversation does not stay in the interactive state.

Business test: create one exception record, see whether the source material can be traced, and check whether the name, quantity, date, and signature of the three materials—self-assessment report, issue list, and rectification plan—are consistent.

- Check field names one by one in the node configuration, confirm that they correspond one-to-one with the self-assessment report, issue list, and rectification plan fields, and check the required settings one by one.
- Reference `formInputResult` and `selectResult` in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved after submission, then hand them to the responsible person for handling.
