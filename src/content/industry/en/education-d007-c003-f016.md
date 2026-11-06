---
title: Forms and User Interaction for Kindergarten Healthcare and Meal Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c003-f016
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Forms | Review
meta_description: Child Health and Meals: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Healthcare and Meal Management: Trace Exceptions and Review Results

## What this category's data looks like

Kindergarten health care and meal management materials include food procurement orders, retention sample records, disinfection records, menus, and absence cause registration forms. Procurement orders indicate ingredient names and specifications, retention sample records indicate retention time and batch, disinfection records indicate disinfection time periods, and absence registration forms indicate cause classification. These materials are filled in by the health room, cafeteria, and class teachers on a daily or per-meal basis, with an update rhythm of daily procurement, retention sampling per meal, disinfection per time period, and daily absence reporting. When entering the exception tracing and manual review function, procurement orders and retention sample records play the role of batch comparison, menus play the role of category verification, disinfection records play the role of time period completeness verification, and absence cause registration plays the role of classification consistency verification. Field characteristics are concentrated in four categories: ingredient names and specifications, retention time and batch, disinfection time period, and absence cause classification, which are used to form an exception list and review conclusions.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusions" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | Whether the categories in the procurement order and menu are consistent, and whether the specifications can correspond | Check the field names one by one in the node configuration, and check the required settings. After submission, have subsequent nodes reference the field and run a trial |
| Retention time and batch | Whether the document batch in the retention sample record matches that in the procurement order | Compare the retention time and batch fields one by one, and confirm that exceptions can be traced back to the original records |
| Disinfection time period | Whether the disinfection record is missing time periods, and whether the time periods cover the areas that should be disinfected that day | Check the disinfection time period field, mark missing time periods, and write them into the exception list |
| Absence cause classification | Whether the cause classification in the absence registration form is consistent with the classification criteria | Check the cause classification field, initiate manual review for inconsistent items, and sign |

## Three common errors

- Phenomenon: The batch on the retention sample record does not match the batch on the procurement order, and the same batch of ingredients cannot be found during review. Cause: The retention time and batch fields were filled in without comparing them one by one against the procurement order.
- Phenomenon: The category written in the menu is inconsistent with the actual category in the procurement order, and the exception list cannot be attributed to a specific ingredient. Cause: The ingredient name and specification fields were not entered according to the same criteria.
- Phenomenon: The disinfection record is missing time periods, and during exception tracing it cannot be determined whether disinfection was completed for that time period. Cause: The disinfection time period field was not marked as required, and subsequent nodes cannot retrieve the value after submission.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the field values output by `formInput` are consistent with what was filled in, and that the `userSelect` options can be passed correctly.

Business test: create an exception record and see whether it can be traced back to the source material, that is, from the exception list back to the procurement order, retention sample record, disinfection record, or absence registration form.

- In the form input node configuration, check the field names and required settings one by one to ensure that ingredient names and specifications, retention time and batch, disinfection time period, and absence cause classification all have corresponding fields.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that after submission the subsequent nodes can retrieve the corresponding field values, and that the conversation does not remain in the interactive state.
