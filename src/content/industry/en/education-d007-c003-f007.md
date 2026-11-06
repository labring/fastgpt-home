---
title: Conversation Records and Traceability for Kindergarten Healthcare and Meal Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c003-f007
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Chat Records | Review
meta_description: Child Health and Meals: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Healthcare and Meal Management: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the kindergarten health care and meal management category. The materials come from quantified recipes, ingredient acceptance sheets, retention sample registration forms, disinfection record sheets, and absence cause registration forms, updated daily or per meal, with fields covering ingredient name and specification, retention sample time and batch, disinfection time period, and absence cause classification. When these materials enter this feature, each plays a different role: recipes and procurement categories are used to compare category consistency, retention sample time and batch are used to verify the correspondence between documents and physical items, disinfection time periods are used to check whether records have missing segments, and absence cause classification is used to determine whether the classification falls within the established categories. The conversation log and audit step precipitates the exception clues corresponding to these materials into traceable conversation records, providing the original basis for subsequent manual review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "exception list and review conclusions" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient name and specification | When the recipe and procurement categories are inconsistent, the exception entry must point to the specific meal and ingredient row | Pull records by application and session dimension, check `chatId` and the role field in the returned list, and confirm that the exception entry can correspond to the recipe and procurement categories |
| Retention sample time and batch | When the document and retention sample batch do not match, the exception entry must be traceable to the original row in the retention sample registration form | Open a single record in the returned records, check the reference information and time field, and confirm that the retention sample time and batch are consistent with the registration form |
| Disinfection time period | When the disinfection record is missing a time period, the exception entry must indicate the specific missing time period | Page through by total record count to retrieve all, check the alternating order of roles, and confirm that the missing disinfection time period clue has not been truncated |
| Absence cause classification | When the classification does not match the established categories, the exception entry must retain the original description | Check the `dataId` and `value` fields, and confirm that the classification judgment can be traced back to the original description |

## Three common errors

- Symptom: the document and retention sample batch do not match. Cause: retention sample registration is updated per meal, while the acceptance sheet is registered per batch, and the two sets of numbers are not aligned.
- Symptom: the recipe and procurement categories are inconsistent. Cause: the recipe is scheduled weekly, procurement is adjusted daily, and category substitutions are not written back to the recipe.
- Symptom: the disinfection record is missing a time period. Cause: disinfection time periods are registered in separate tables by area, and some time periods are missed during aggregation.

## How to verify the setup

Feature acceptance: page through by total record count total to retrieve all, sample one record to check role, reference information, and time, and confirm that response `code` of 200 is consistent with the list length.

Business test: create an exception record and see whether it can be traced to the source material.

- Pull two pages consecutively and compare the total record count and offset to confirm that the number of records matches the total.
- Open a single record to check the reference and duration fields, and confirm that the number of references is recorded separately by array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
