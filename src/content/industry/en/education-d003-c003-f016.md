---
title: Forms and User Interaction for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c003-f016
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Forms | Intake
meta_description: Child Health and Meals: review forms for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Healthcare and Meal Management: Handle Questions and Collect Missing Information

## What this category's data looks like

Kindergarten health care and meal management involves daily materials such as food ingredient procurement and acceptance, sample retention registration, disinfection records, and absence cause tracking. These materials enter this page in the form of paper documents, spreadsheets, or photo records, with an update cadence of daily or per meal. In the Q&A intake and missing-item follow-up scenario, the materials each play different roles: food ingredient names and specifications are used to check whether the procurement category is consistent with the menu, sample retention time and batch are used to trace whether the sample retention for that meal matches the registration document, disinfection time periods are used to confirm whether disinfection in each area covers the required time window, and absence cause classification is used to determine whether an absence needs to be reported or followed up. When materials enter the form input node, the user fills them in field by field; the system does not automatically recognize material content, nor does it judge the authenticity of materials.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Food ingredient names and specifications | Whether the procurement category is consistent with the menu, and whether the specifications match the acceptance form | Check the field names one by one in the node configuration, confirm they correspond one-to-one with the procurement form and menu fields; reference the `formInputResult` field and run a test |
| Sample retention time and batch | Whether the document and the sample retention batch match, and whether the time covers that meal | Check the required settings one by one, confirm the sample retention time and batch fields are marked as required; reference this field in subsequent nodes and run a test |
| Disinfection time periods | Whether the disinfection record is missing time periods, and whether the time periods for each area are complete | Check whether the disinfection time period field is consistent with the record table; use `userSelect` to select a time period and submit, then check whether subsequent nodes can retrieve the corresponding field value |
| Absence cause classification | Whether the absence cause classification is consistent with the reporting criteria | Check whether the classification field options are consistent with the health care registration form; after submission, confirm that subsequent nodes can retrieve the classification value |

## Three common errors

- Symptom: the document and the sample retention batch do not match. Cause: the sample retention time and batch fields are not marked as required, so after submission subsequent nodes cannot retrieve the batch value, and the intake record lacks key traceability information.
- Symptom: the menu and procurement category are inconsistent. Cause: the food ingredient names and specifications fields do not correspond one-to-one with the menu fields, so when the user fills them in according to the procurement form, subsequent nodes cannot compare the differences between the two.
- Symptom: the disinfection record is missing time periods. Cause: the disinfection time period fields were not checked one by one, so submission is possible even when some area time periods are not filled in, and the conversation stops in the interactive state or subsequent nodes cannot retrieve the complete time period values.

## How to verify the setup

This feature's acceptance: fill it in once and submit, check the field values retrieved by subsequent nodes, and confirm that both the `formInputResult` and `selectResult` fields can be passed correctly, and that submission is not possible when required items are empty.

Business test: submit a question that lacks key information, see whether it first asks a follow-up question before answering, and confirm that the missing item is identified and followed up before being transferred to the handler.

- Check the field names one by one in the node configuration, confirm they correspond one-to-one with the material fields to be collected, and check the required settings one by one.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirming that after submission subsequent nodes can retrieve the corresponding field values.
