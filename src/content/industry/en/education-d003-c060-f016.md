---
title: Forms and User Interaction for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c060-f016
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Forms | Intake
meta_description: Research Progress: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information

## What this category's data looks like

In the annual progress and acceptance scenario for research projects, materials come from annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted on an annual cycle, mid-term review materials are formed at the mid-point of project execution, and acceptance reports are consolidated at the project completion stage. The fields of the three types of materials include project name, undertaking unit, start and end dates, indicator completion status, fund usage, signatures, and receipts. When entering the form input node, the annual progress report serves as the source of annual execution status, the mid-term review materials serve as the source for stage comparison, and the acceptance report serves as the source of the final conclusion. The name, quantity, and date of the same record may not match across the three materials, versions are not synchronized, and signatures or receipts may be missing. Form fields must correspond one-to-one with the material fields to be collected, key material fields must be marked as required, and after submission the field values are passed to subsequent nodes for use.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and items to be completed" are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Correspond one-to-one with the material fields to be collected, covering the fields, dates, and signatures of the annual progress report, mid-term review materials, and acceptance report | Check the field names one by one in the node configuration, and confirm that the field names are consistent with the material fields |
| Required marking | Key material fields are marked as required, and submission is not possible when items are missing | Check the required settings one by one, and confirm that key material fields are marked as required |
| Field passing after submission | Subsequent nodes can obtain the corresponding field values, and intake records and items to be completed can be generated based on them | Reference the field in a subsequent node and run a test to confirm that the subsequent node can obtain the corresponding field value |
| `formInputResult` and `selectResult` | The interaction node outputs field values, and selection items are carried by `userSelect` | Check whether the field references of `formInputResult` and `selectResult` are consistent with subsequent nodes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: The two materials are maintained separately, versions are not synchronized, and fields have not been cross-checked.
- Symptom: Mid-term review materials lack signatures or receipts, but still enter subsequent processing after submission. Cause: Key material fields are not marked as required, and missing items are not identified and followed up.
- Symptom: The conversation stops in the interactive state, and subsequent nodes cannot obtain field values. Cause: Submission is possible even when required items are empty, or after submission the field passing is not referenced and test-run in subsequent nodes.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values obtained by subsequent nodes, and confirm that the field values of `formInputResult` and `selectResult` can be passed to subsequent nodes.

Business test: ask a question that lacks key information, see whether it first follows up before answering, and confirm that missing items are identified and followed up, and that the answer is based on materials.

- Check the field names one by one in the node configuration, and confirm that the form fields correspond one-to-one with the fields, dates, and signatures of the annual progress report, mid-term review materials, and acceptance report.
- Check the required settings one by one, confirm that key material fields are marked as required, and reference the field in a subsequent node and run a test to confirm that the subsequent node can obtain the corresponding field value.
