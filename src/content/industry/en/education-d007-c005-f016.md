---
title: Forms and User Interaction for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c005-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Forms | Review
meta_description: Kindergarten Safety: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses kindergarten safety protection and emergency drill scenarios. Materials cover hazard items and rectification deadlines ledgers, drill participant counts and sign-in sheets, access control and school bus inspection item records, responsible person signature pages, as well as exception lists and review conclusions. Sources are three types of records: daily inspections, drill execution, and access control and school bus inspections. Update cadence is daily inspections, per-drill, and weekly summaries. When materials enter the form input node, hazard items and rectification deadlines serve as the objects to be traced, drill participant counts and sign-ins serve as the basis for headcount verification, access control and school bus inspection items serve as the source for missing-item screening, and responsible person signatures serve as the confirmation credential for review. Exception lists and review conclusions are compiled by subsequent nodes or manually based on field values, forming a finished product that can be handed to the responsible person for handling.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). "Exception lists and review conclusions" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard items and rectification deadlines | Whether the hazard is closed-loop, whether the rectification deadline is consistent with the original record | In the node configuration, check the field names one by one, confirm that the hazard item and rectification deadline fields correspond one-to-one with the original ledger, and check the required markers |
| Drill participant counts and sign-ins | Whether the drill record matches the plan, whether the sign-in count corresponds to the plan count | In subsequent nodes, reference the `formInputResult` field and do a trial run, check whether the sign-in count is consistent with the plan count, and investigate mismatches between the drill record and the plan |
| Access control and school bus inspection items | Whether inspection items are missing, whether responsible person signatures are complete | In subsequent nodes, reference the `selectResult` output and do a trial run, check access control and school bus inspection items one by one, confirm there are no missing items and that responsible person signatures have been filled in |
| Responsible person signature | Whether the signature corresponds to the review conclusion, whether it can be traced back to the source material | In the node configuration, check the signature field name and required settings, and after submission confirm that subsequent nodes can retrieve the field value |

## Three common errors

- Symptom: The hazard item is filled in the form but the rectification deadline is empty, and subsequent nodes cannot retrieve the rectification deadline field value. Cause: The hazard item and rectification deadline fields are not marked as required, so after submission the field value is missing, the hazard is not closed-loop, and tracing is impossible.
- Symptom: The drill participant count is inconsistent with the sign-in sheet count, and the exception list does not match the plan. Cause: The drill participant count and sign-in fields were not checked item by item against the plan, the drill record does not match the plan, and the review conclusion lacks a basis.
- Symptom: An access control or school bus inspection item is missing from the form, and the missing inspection item is only discovered during review. Cause: The inspection item field names were not checked one by one, the required markers did not cover all inspection items, and after submission the missing item was carried into subsequent nodes.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` field values are passed correctly, that submission is not possible when required items are empty, and that the conversation does not remain in the interactive state.

Business test: create an exception record, see whether it can be traced back to the source material, and confirm that hazard items and rectification deadlines, drill participant counts and sign-ins, access control and school bus inspection items, and responsible person signatures can all be traced.

- In the node configuration, check the field names one by one, confirm they correspond one-to-one with the material fields to be collected, and check the required settings one by one.
- In subsequent nodes, reference the `formInputResult` and `selectResult` fields and do a trial run, confirm that after submission subsequent nodes can retrieve the corresponding field values, and investigate the three common errors: values cannot be retrieved after submission, submission is possible when required items are empty, and the conversation remains in the interactive state.
