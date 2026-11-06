---
title: Forms and User Interaction for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c060-f016
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Forms | Review
meta_description: Research Progress: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Annual Progress and Acceptance: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted at annual milestones, with fields including project name, responsible person, planned progress, actual completion, fund usage, attachment list, and signature block; mid-term review materials are consolidated at the mid-point of project execution, with fields including phase objectives, milestone completion status, change notes, review comments, and receipt; acceptance reports are formed at project closure, with fields including results list, indicator comparison, fund final accounts, acceptance conclusion, and multi-party signatures. The three types of materials play different roles in exception tracing and manual review: annual progress reports provide raw records sliced by year, mid-term review materials provide phase comparison and change trails, and acceptance reports provide final results and signature evidence. The update rhythm is annual submission, mid-term consolidation, and finalization at closure; field characteristics are coexistence of multiple versions, easily drifting naming and quantity conventions, and frequent missing items in signatures and receipts.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Project name, planned progress, actual completion, fund usage, date, and signature block must correspond item by item; the name, quantity, and date of the same record in the annual progress report and the acceptance report should be consistent | In the node configuration, check the field names and required markers one by one, reference the `formInputResult` fields and run a trial, and confirm that subsequent nodes can retrieve the corresponding field values |
| Mid-term review materials | Phase objectives, milestone completion status, change notes, review comments, and receipt must correspond item by item; when versions are not synchronized, the latest receipt prevails and differences are recorded | Check the required settings, confirm that key material fields are marked as required, and after submission check whether the field values passed by `formInput` are complete |
| Acceptance report | Results list, indicator comparison, fund final accounts, acceptance conclusion, and multi-party signatures must correspond item by item; records missing signatures or receipts should enter the exception list | Reference the `formInputResult` fields in subsequent nodes and run a trial, and check whether the signature and receipt fields are passed in with the submission |
| Exception list and review conclusion | Exceptions must be supported by raw records, and only after the reviewer signs can they be handed over to the responsible person for disposition | Use `userSelect` to choose the disposition destination, and check whether the review conclusion fields and signature fields are complete |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the annual progress report and the acceptance report. Cause: the two materials are filled in separately, without field-level comparison and version synchronization.
- Symptom: the versions of mid-term review materials are not synchronized, and the old change notes are still referenced. Cause: the latest receipt was not checked at submission, and form fields were not marked as required, causing omissions.
- Symptom: the acceptance report lacks signatures or receipts, and the exception list cannot be closed. Cause: the signature and receipt fields were not set as required, and subsequent nodes cannot retrieve the corresponding values after submission.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values retrieved by subsequent nodes, confirm that the field names passed by `formInput` match the filled-in content, submission is not allowed when required items are empty, and the conversation does not remain in the interactive state.

Business test: create an exception record, see whether it can be traced back to the source material, and check whether the fields, dates, and signatures of the annual progress report, mid-term review materials, and acceptance report match.

- In the node configuration, check the field names and required markers one by one to ensure that key material fields are marked as required.
- Reference the `formInputResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission, then use `userSelect` to choose the disposition destination.
