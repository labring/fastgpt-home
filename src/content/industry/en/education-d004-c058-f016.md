---
title: Forms and User Interaction for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c058-f016
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Forms | Handover
meta_description: Research Agreements: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the scenario of signing research project task statements, materials typically include three types: the project task statement, the topic task breakdown table, and the budget statement. The source is the template suite from the project application and approval stage, and the update cadence changes with topic adjustments, budget approval, and signature circulation. The project task statement carries the overall objectives, duration, responsible person, and total budget; the topic task breakdown table breaks down the research content into topics, tasks, and responsible persons, including start and end dates and assessment milestones; the budget statement lists amounts and calculation bases by category. When these three types of materials enter the form input node, their respective roles are carriers of the fields to be collected: the task statement provides project-level fields, the breakdown table provides topic-level fields, and the budget statement provides funding-level fields. Field names, dates, and signature items must be aligned one by one to avoid the same record having inconsistent names, quantities, or dates across different materials.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts that can be issued and the handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task statement | Fields are complete, the responsible person is clear, and the version and date are consistent | Check the field names one by one in the node configuration, confirm that the project name, responsible person, duration, total budget, and signature items are all marked as required, and verify the version number and date |
| Topic task breakdown table | The topic name, responsible person, start and end dates, and assessment milestones are consistent with the task statement | Check the required settings one by one, compare the topic names, quantities, and dates in the breakdown table and the task statement, and confirm there are no missing signatures or receipts |
| Budget statement | The category amounts, calculation bases, and total are consistent with the total budget in the task statement | Reference this field in subsequent nodes and run a test, check the correspondence between the budget categories and the total budget in the task statement, and confirm the versions are synchronized |
| formInput | After submission, the field values can be passed to subsequent nodes | Reference the `formInputResult` field in subsequent nodes and run a test, confirm that subsequent nodes can retrieve the corresponding field values, and that submission is blocked when required items are empty |

## Three common errors

- Symptom: The same topic name is written differently in the task statement and the breakdown table, and the quantities and dates also do not match. Cause: The field definitions were not unified during drafting, and the two materials were maintained separately.
- Symptom: The budget statement version has been updated, but the task statement still references the old version's amounts and categories. Cause: The versions were not synchronized, and the version verification action during handover was missing.
- Symptom: After submission, subsequent nodes cannot retrieve the values, or submission is possible even when required items are empty. Cause: The field names do not correspond one-to-one with the material fields, and required markers were omitted.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInput` output is consistent with the form entries, that submission is blocked when required items are empty, and that the conversation does not remain in the interactive state.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one in the node configuration, and confirm they correspond one-to-one with the fields in the project task statement, topic task breakdown table, and budget statement.
- Reference the `formInputResult` field in subsequent nodes and run a test, check whether the submitted field values can be retrieved, and check the correspondence between the `userSelect` options and the material fields.
