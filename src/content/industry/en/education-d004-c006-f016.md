---
title: Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c006-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Forms | Handover
meta_description: Kindergarten Quality: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers three types of materials: self-assessment reports, issue lists, and rectification plans. The sources are the kindergarten's daily observations, class records, and special inspections, and the update cadence rolls forward by semester or rectification cycle. When the materials enter the form input node, the self-assessment report is responsible for presenting conclusions, the issue list is responsible for enumerating facts, and the rectification plan is responsible for arranging responsibilities and deadlines. Field characteristics center on name, quantity, date, signature, and receipt, and the same record must remain consistent across the three materials. The form input node is only responsible for collecting field values; it does not automatically recognize material content, nor does it judge whether materials are authentic.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts that can be issued and the handover records are completed by subsequent nodes or manually afterward. After triggering, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Name, quantity, date, and signature correspond consistently with the issue list and rectification plan | Check the field names one by one in the node configuration, confirm they correspond one-to-one with the report fields, and use `formInput` to reference the fields in a test run |
| Issue list | When the name, quantity, or date of the same record does not match across the two materials, it must be blocked | Check the required settings one by one, mark key fields as required, and empty-value submissions should be blocked |
| Rectification plan | The responsible person is clear, the version and date are consistent, and signatures or receipts are complete | Reference the `formInputResult` fields in subsequent nodes and run a test to confirm the field values can be retrieved |
| Handover record | The next stage can retrieve the corresponding field values and complete sign-off | Use `userSelect` to select the handover type and submit, then check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the self-assessment report and the issue list. Cause: The two materials are filled in separately, and the fields are not uniformly referenced and checked.
- Symptom: The rectification plan version is not synchronized, and the date and signature are missing. Cause: The handover record is not updated along with the materials, and the receipt is not collected.
- Symptom: After submission, subsequent nodes cannot retrieve the values. Cause: The field names are not aligned or required items are submitted while empty, and the interaction state does not end properly.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` references are valid.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one in the node configuration, and confirm they correspond one-to-one with the material fields.
- Reference the fields in subsequent nodes and run a test to check that the field values can be retrieved and that the conversation no longer remains in the interaction state.
