---
title: Forms and User Interaction for Research Project Task Agreement Signing: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c058-f016
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Forms | Review
meta_description: Research Agreements: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Task Agreement Signing: Trace Exceptions and Review Results

## What this category's data looks like

In the scenario of signing research project task books, the materials include three types: the project task book, the subject task breakdown table, and the budget book. The project task book is drafted by the project leader based on the project approval, and states the research objectives, assessment indicators, participating units, and start and end dates; the subject task breakdown table is prepared by each subject leader, breaking the research content down into specific tasks, responsible persons, and milestones; the budget book is compiled by the finance or research management department, listing subjects, amounts, and calculation bases. The three types of materials enter the signing stage one after another: the task book first sets the framework, the breakdown table then refines the division of labor, and the budget book finally locks in the funding. In terms of update rhythm, the task book may undergo multiple rounds of revision before signing, the breakdown table changes as tasks are adjusted, and the budget book is checked separately according to subject categories. Field characteristics are concentrated in the project name, subject name, responsible person, start and end dates, number of tasks, funding subjects, and signature fields. When the materials enter this function, each plays a role as a field source: the task book provides the main record, the breakdown table provides task-level details, and the budget book provides the funding categories, and the three must be aligned item by item during exception tracing.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusions" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the project name, responsible person, start and end dates, and signature fields are consistent with the approval | Check the field names and dates item by item, check whether signatures or receipts are complete, and verify the field names in the `formInput` node configuration |
| Subject task breakdown table | Whether the task names, responsible persons, and milestone dates match the task book | Compare names and dates one by one by task, mark records that do not match, and test-run the `userSelect` referenced fields |
| Budget book | Whether the funding subjects, amounts, and calculation bases are consistent with the task book categories | Check the subjects and amounts, check whether versions are synchronized and whether signatures or receipts are missing, and confirm field transfer after `formInput` submission |
| formInput submitted fields | Whether required items are complete and whether the field values can be retrieved by subsequent nodes | Check the field names and required markers one by one in the node configuration, and after a test run reference the field in subsequent nodes |

## Three common errors

- Symptom: The name or quantity of the same subject does not match between the task book and the breakdown table. Cause: The two materials were revised separately, no field-level alignment was done, and the exception lacks support from original records.
- Symptom: The budget book amount is inconsistent with the task book categories, or the versions are not synchronized. Cause: After subject adjustments, only one material was changed, and the reviewer did not check by version.
- Symptom: Signatures or receipts are missing, and the exception record cannot be traced back to the source material. Cause: The signing process did not collect all signed documents, and the review conclusion lacks signature confirmation.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with what was filled in, submission must not be possible when required items are empty, and confirm that the `formInputResult` and `selectResult` referenced field values are correct.

Business test: create an exception record, see whether it can be traced back to the source material, and check whether the reviewer's signature is complete.

- Check the field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the material fields to be collected
- Reference the field in subsequent nodes and test-run it, confirm that the corresponding field value can be retrieved after submission, and that the conversation does not remain in the interactive state
