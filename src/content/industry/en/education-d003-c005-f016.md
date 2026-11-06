---
title: Forms and User Interaction for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c005-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Forms | Intake
meta_description: Kindergarten Safety: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Safety and Emergency Drills: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses kindergarten safety protection and emergency drill scenarios. The materials come from daily campus inspections, drill organization, and access control and school bus management, and their update cadence rolls with semesters, drill cycles, and rectification milestones. Category materials include four types: hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus check items, and responsible person signatures. After hazard items and rectification deadlines enter the form, they serve as fields pending acceptance and await subsequent nodes to verify closed-loop status; after drill headcount and sign-in enter the form, they form the basis for comparison with the planned headcount; after access control and school bus check items enter the form, they are used to identify missing items; after responsible person signatures enter the form, they serve as the prerequisite credential for transfer and handling. When materials enter this function, their roles differ: some serve as required acceptance items, some as follow-up trigger items, and some as the basis for handler handover. Field characteristics are mainly structured short text plus dates, headcounts, and checkbox items, facilitating subsequent node references and manual review.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "acceptance record and completed question items" are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard items and rectification deadlines | Whether a rectification deadline is marked and a closed loop is formed, and whether items not closed in a loop trigger follow-up | Check field names one by one in the node configuration, confirm that the hazard description and deadline fields correspond one-to-one with the materials, and use `formInput` to run a trial submission and then check the values retrieved by subsequent nodes |
| Drill headcount and sign-in | Whether the sign-in headcount is consistent with the planned headcount, and whether missing items are identified and followed up | Check the required settings one by one, confirm that the headcount and sign-in fields are marked as required, and after submission have subsequent nodes reference the field and run a trial |
| Access control and school bus check items | Whether check items are missing, and whether missing items are followed up and completed during the acceptance stage | Reference the field in subsequent nodes and run a trial, confirm that the field values for access control and school bus check items can be retrieved, and missing items are completed by the follow-up step |
| Responsible person signature | Whether the signature field serves as the credential for handler handover, and whether a missing signature is first followed up before answering | Check the field name and required marker, and confirm that after submission the signature field can be passed to the handler processing node |

## Three common errors

- Phenomenon: The hazard record only writes a description without a rectification deadline, so it is impossible to determine later whether it is closed in a loop. Cause: During the acceptance stage, the deadline was not set as required, missing items were not followed up, and the materials were transferred directly.
- Phenomenon: The drill sign-in headcount is inconsistent with the planned headcount, and the record does not match the plan. Cause: The form only collects the sign-in field and does not trigger follow-up verification against the planned headcount, so the discrepancy is carried into subsequent steps.
- Phenomenon: Access control and school bus check items have missing entries, yet the acceptance record still shows as complete. Cause: The check item fields were not checked one by one, missing items were not identified and followed up, and the handler received incomplete materials.

## How to verify the setup

This function's acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that required items cannot be submitted when empty, that field values can be referenced after submission, and that the interaction state can continue to execute downward.

Business test: submit a question missing key information and see whether it first follows up before answering, confirming that missing items are identified and followed up and that answers have a material basis.

- In the node configuration, check field names and required markers one by one, and confirm that hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus check items, and responsible person signature all have corresponding fields.
- In subsequent nodes, reference the `formInputResult` and `selectResult` fields and run a trial, confirm that the corresponding field values can be retrieved after submission, and that missing items are completed by the follow-up step before being transferred to the handler for processing.
