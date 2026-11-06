---
title: Forms and User Interaction for Kindergarten Play Activity Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c002-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Forms | Intake
meta_description: Kindergarten Play: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Play Activity Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

Kindergarten game activity organization materials mainly consist of observation records, area plans, material placement lists, activity objectives, and reflection records. They come from daily entries by class teachers and summaries by grade groups, with updates advancing weekly and reviews monthly. Observation records correspond to area plans, the quantity of materials placed is related to the achievement of activity objectives, and reflections turn into next week's plans, forming a closed loop. When materials enter the form input node, each has a different role: observation records and area plans serve as the main acceptance materials, the quantity of materials placed serves as the basis for checking missing-item follow-up questions, and the achievement of activity objectives and reflections turning into next week's plans serve as the direction for follow-up questions. Common inconsistencies include insufficient materials, objectives not matching observations, and plans not updated. Missing items must be identified first during acceptance before follow-up questions are asked.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). Acceptance records and the follow-up questions for completion are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Observation records correspond to area plans; if objectives do not match observations, it is considered a missing item | Check the field names one by one in the node configuration, confirm that the observation records and area plans fields are marked as required, and after submission, subsequent nodes reference `formInputResult` to retrieve the field values |
| Quantity of materials placed | The quantity of materials placed is related to the achievement of activity objectives; if materials are insufficient, it is considered a missing item | Check the required settings one by one, confirm that the quantity of materials placed field is marked as required, and after submission, subsequent nodes reference `formInputResult` to retrieve the field values |
| Achievement of activity objectives and reflections turning into next week's plans | The achievement of activity objectives corresponds to reflections turning into next week's plans; if the plan is not updated, it is considered a missing item | Reference this field in subsequent nodes and run a test to confirm that the field values for achievement of activity objectives and reflections turning into next week's plans can be retrieved; if necessary, use `userSelect` for follow-up questions |

## Three common errors

- Phenomenon: Acceptance is still submitted when materials are insufficient. Cause: The quantity of materials placed field is not marked as required, missing items are not identified and followed up, and the acceptance records and follow-up questions for completion are incomplete.
- Phenomenon: Objectives do not match observations. Cause: The observation records and area plans fields do not correspond, the direction of follow-up questions deviates from the achievement of activity objectives, and the field values retrieved by subsequent nodes cannot support judgment.
- Phenomenon: The plan is not updated. Cause: The reflections turning into next week's plans field is not included in follow-up questions, the conversation stops in the interactive state, and the acceptance records and follow-up questions for completion are not transferred to the responsible person for handling.

## How to verify the setup

Acceptance of this feature: Fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that `formInputResult` and `selectResult` can retrieve the corresponding field values, and that submission is not possible when required items are empty.

Business test: Ask a question that lacks key information and see whether follow-up questions are asked before answering.

- Check the field names one by one in the node configuration, and confirm that the observation records and area plans, quantity of materials placed, and achievement of activity objectives and reflections turning into next week's plans fields correspond one-to-one with the material fields to be collected.
- Check the required settings one by one, confirm that the key material fields are marked as required, and after submission, reference the field in subsequent nodes and run a test to confirm that the field values can be retrieved.
