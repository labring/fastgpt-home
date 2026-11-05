---
title: Forms and User Interaction for Graduate Admissions Interviews and Selection: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c024-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Forms | Handover
meta_description: Graduate Admissions: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Admissions Interviews and Selection: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Graduate admissions re-examination and admission is the stage in which the admitting unit organizes the re-examination after the preliminary examination, evaluates scores, determines the proposed admission list, and handles the handover. Material sources include the re-examination plan, candidate score sheets, transfer/adjustment lists, proposed admission records, and handover receipts, updated by batch and round, with fields covering candidate number, name, major, preliminary and re-examination scores, ranking, date, signature, and version number. When the re-examination plan enters this feature, it serves as the source of field templates, the candidate score sheets and transfer/adjustment lists serve as the objects for item-by-item entry, and the handover records serve as the destination vouchers; together, the three support the issuable material draft.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The issuable material draft and handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Plan fields, date, and signature are complete; version and batch are consistent | Check field names and required markers one by one in the node configuration, and confirm the plan version number and date |
| Candidate score sheet | Scores, ranking, date, and signature are complete; the name and quantity of the same record match across the two materials | Check the required settings one by one, reference the `formInputResult` field in subsequent nodes, and run a trial |
| Transfer/adjustment list | Transfer/adjustment candidate fields, date, and receipt are complete; it can be blocked when the version is not synchronized | Reference the `selectResult` output in subsequent nodes and run a trial, and check whether missing items are blocked |
| Handover record | The responsible person is clear, signature and receipt are complete, and version and date are consistent | Reference the `formInputResult` field in subsequent nodes and run a trial, and check the handover destination |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the re-examination plan and the candidate score sheet. Cause: Field names were not mapped one-to-one to the material fields to be collected, and each was named separately during entry.
- Symptom: The transfer/adjustment list version is not synchronized, and the old version is still referenced. Cause: After submission, when fields are passed to subsequent nodes, the version number and date were not checked.
- Symptom: The handover record lacks a signature or receipt, and the conversation stays in the interaction state. Cause: Required items can be submitted even when empty, and the responsible person is not specified in the fields.

## How to verify the setup

Feature acceptance: Fill in once and submit, check the field values obtained by subsequent nodes, confirm that the `formInputResult` and `selectResult` fields can be obtained, and that empty required items are blocked.

Business test: Draft one according to the template and complete one handover, see whether missing items are blocked, and check the fields, dates, and signatures of the re-examination plan, candidate score sheet, and transfer/adjustment list.

- Check field names and required markers one by one in the node configuration, and confirm they map one-to-one to the material fields to be collected.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, and confirm that the corresponding field values can be obtained after submission.
