---
title: Workflow Orchestration for Vocational College Skills Competition Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c033-f008
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Workflows | Intake
meta_description: Skills Competitions: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Vocational College Skills Competition Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

Competition organization materials for vocational college skills competitions mainly consist of competition regulations, registration forms, and training plans. The sources are the college's academic affairs office, competition office, and training teams, and the update cadence follows rolling revisions by competition event cycle and registration milestones. Competition regulations carry the event name, group, date, and signature/seal requirements; registration forms carry the lists of contestants and instructors, quantities, signatures, and acknowledgements; training plans carry stage arrangements, class hours, and confirmation signatures. When these three types of materials enter the Q&A acceptance and missing-item follow-up function, they serve respectively as the rule basis, personnel basis, and process basis, for workflow nodes to compare fields, dates, and signatures item by item during interaction, identify mismatches in names, quantities, and dates, unsynchronized versions, missing signatures or acknowledgements, and other missing items, and form follow-up questions to be completed.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The acceptance records and the follow-up questions to be completed are continued and completed by subsequent nodes according to the branches. When triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Whether the event name, group, date, and signature/seal fields are complete, and whether they are consistent with the corresponding items in the registration form and training plan | Check the regulation fields item by item, check the options and branch connections one by one in the node, and reference the selection result variable in a subsequent node and run a trial once |
| Registration form | Whether the quantities of contestants and instructors, signatures, and acknowledgements are complete, and whether the names and dates match those in the regulations and training plan | Compare quantities and dates one by one against the regulations and training plan, trigger once, and view the node status in the run records |
| Training plan | Whether the stage arrangements, class hours, and confirmation signatures are complete, and whether the version is synchronized with the regulations and registration form | Check the plan version and signatures, reference `variables` in a subsequent node and run a trial, and confirm the branch direction corresponding to `nodeId` |
| User selection node | Whether options and branches correspond one-to-one, whether the interaction state is recorded, and whether the selection result variable is passed to subsequent nodes | Check the options and branch connections one by one in the node, trigger once and view the node status in the run records, and reference `variables` in a subsequent node for a trial run |

## Three common errors

- Phenomenon: The name and quantity of the same contestant do not match between the registration form and the training plan. Cause: The two materials were revised separately, without unifying the field definitions and dates according to the regulations.
- Phenomenon: The regulations have been updated, but the registration form and training plan still use the old version. Cause: The versions are not synchronized, and the node comparison picks up fields from different sources.
- Phenomenon: The registration form lacks signatures or acknowledgements, and the training plan lacks confirmation signatures. Cause: The signature/seal verification was not checked item by item during material collection, and missing items were not identified and followed up.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch directions and interaction states in the run records, confirm that options and branches correspond one-to-one, that the selection result variable has been passed to subsequent nodes, and that `variables` and `nodeId` can be referenced by subsequent nodes.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- Check the options and branch connections one by one in the node, trigger once and view the node status in the run records, and confirm that the process continues downward after the interaction is completed.
- Reference the selection result variable in a subsequent node and run a trial once, and check whether the fields, dates, and signatures of the competition regulations, registration form, and training plan are compared item by item.
