---
title: Forms and User Interaction for Kindergarten Safety and Emergency Drills: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c005-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Forms | Access
meta_description: Kindergarten Safety: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Safety and Emergency Drills: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses kindergarten safety protection and emergency drill materials, covering four categories: hazard items and rectification deadlines, drill participant counts and sign-ins, access control and school bus inspection items, and responsible person signatures. The material sources are daily inspections within the kindergarten, drill plans and sign-in sheets, access control and school bus inspection records, and responsible person confirmation forms. The update cadence is daily inspections, per-drill, weekly access control and school bus inspections, and per-event sign-offs. The field characteristics are hazard description, rectification deadline, drill participant count, sign-in list, access control inspection items, school bus inspection items, and responsible person signature. When the materials enter the form input node, their respective roles are: hazard items and rectification deadlines are used to determine closed-loop status, drill participant counts and sign-ins are used to verify whether records match the plan, access control and school bus inspection items are used to identify missing items, and responsible person signatures are used to confirm the completeness of sign-offs.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard items and rectification deadlines | Whether the hazard is closed within the rectification deadline, and whether unclosed items are still visible | Check the field names for hazard description and rectification deadline one by one in the node configuration, and after submission check whether subsequent nodes can retrieve the field values |
| Drill participant counts and sign-ins | Whether the drill record matches the plan, and whether the sign-in count is consistent with the planned count | Check the field names for drill participant count and sign-in list in the node configuration, and check the required settings one by one |
| Access control and school bus inspection items | Whether inspection items are missing, and whether access control and school bus inspection items are filled in item by item | Check the field names for access control and school bus inspection items in the node configuration, and after submission run a test to see whether subsequent nodes reference the field |
| Responsible person signature | Whether the responsible person signature is complete, and whether the sign-off scope matches the authorization scope | Check the field name for responsible person signature in the node configuration, and access once with a restricted identity to see whether the visible scope matches the setting |

## Three common errors

- Symptom: Unclosed hazards are still visible to parents. Cause: The rectification deadline field is not marked as required, so after submission subsequent nodes cannot retrieve the value, and the visible scope is not narrowed according to closed-loop status.
- Symptom: Drill records do not match the plan. Cause: The field names for drill participant count and sign-in are inconsistent, so subsequent nodes cannot reference the corresponding field values, and manual verification lacks a basis.
- Symptom: Access control and school bus inspection items are missing. Cause: Inspection item fields were not checked one by one, required markers are missing, and after submission subsequent nodes cannot retrieve complete field values.

## How to verify the setup

This feature acceptance: fill in once and submit, check the field values retrieved by subsequent nodes, confirm that the field values output by `formInput` are consistent with the filled-in content, and that the fields selected by `userSelect` can be passed to subsequent nodes.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and unauthorized access is not visible.

- Check the field names one by one in the node configuration, and confirm they correspond one-to-one with the material fields to be collected.
- Check the required settings one by one, and reference the field in subsequent nodes and run a test to confirm that the value can be retrieved after submission.
