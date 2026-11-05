---
title: Forms and User Interaction for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c003-f016
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Forms | Handover
meta_description: Child Health and Meals: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the kindergarten health care and meal management scenario. Material sources include quantified recipes, food procurement orders, retention sample records, disinfection records, and absence cause registration. The update cadence is daily, per meal, or per time period, and the field characteristics center on ingredient names and specifications, retention sample times and batches, disinfection time periods, and absence cause classification. When entering the form input node, the recipes and procurement orders play the role of category comparison, the retention sample records play the role of batch and time verification, the disinfection records play the role of time period completeness, and the absence registration plays the role of cause classification. These materials are filled in item by item by field in the interaction node, and after submission they are passed to subsequent nodes as field values, based on which subsequent nodes or personnel draft issuable materials and form handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The issuable material drafts and handover records are then completed by subsequent nodes or personnel. After the node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | Correspond item by item with the quantified recipes and procurement categories; specifications are not mixed together | Check the field names one by one in the node configuration to ensure that ingredient names and specifications each occupy an independent field |
| Retention sample times and batches | The document batch matches the retention sample batch, and the time falls within the corresponding meal | Check the required settings one by one; mark retention sample time and batch as required and test-run the submission |
| Disinfection time periods | The disinfection records cover the specified time periods, with no time period gaps | Reference this field in a subsequent node and test-run to confirm that the time period value can be retrieved |
| Absence cause classification | The absence registration is filled in according to the classification options and is not mixed with other causes | Check the values of the `formInputResult` and `selectResult` fields to confirm that the classification value is passed correctly |

## Three common errors

- Symptom: The document and retention sample batches do not match. Cause: Retention sample time and batch were not marked as required, so missing items were not blocked at submission, and subsequent nodes could not retrieve the corresponding values.
- Symptom: The recipes and procurement categories are inconsistent. Cause: The ingredient name and specification fields were not compared item by item, and after submission the field values were passed directly to subsequent nodes, so the discrepancy was not discovered.
- Symptom: The disinfection records are missing time periods. Cause: The disinfection time period field was not completely filled in the interaction node, so the conversation stopped in the interaction state or subsequent nodes could not retrieve the time period value after submission.

## How to verify the setup

Acceptance of this feature: fill it in once and submit, then check whether the field values retrieved by subsequent nodes are consistent with the form entries, focusing on verifying the passing results of the `formInputResult` and `selectResult` fields.

Business test: draft one copy according to the template and complete one handover to see whether missing items are blocked.

- Check the field names one by one in the node configuration to confirm that they correspond one-to-one with the material fields to be collected.
- Check the required settings one by one, and reference the field in a subsequent node and test-run to confirm that the corresponding field value can be retrieved after submission.
