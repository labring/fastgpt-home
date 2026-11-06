---
title: Forms and User Interaction for National Key Research and Development Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c057-f016
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Forms | Access
meta_description: National R&D Grants: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for National Key Research and Development Applications: Manage Authorized Access and External Services

## What this category's data looks like

National Key R&D Program project application materials mainly consist of the project application form, the budget application form, and the cooperation agreement. Sources are exports from the application system, scanned copies stamped by the unit, and signed pages of cooperation agreements, with an update cadence that rolls with application rounds and notices from the competent authorities. The project application form contains the project name, principal investigator, start and end dates, participating units, and signature page; the budget application form contains subject names, quantities, amounts, and the budget period; the cooperation agreement contains partner names, task division, stamp, and receipt. When these three types of materials enter authorized access and external services, their roles differ: the project application form defines the entity and period, the budget application form defines the quantity and date basis, and the cooperation agreement defines the signing and receipt evidence. Before external services, the visible scope must be segmented by visitor identity; parents or superiors can only see fields and attachments relevant to themselves, and unauthorized records are not visible.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Whether the project name, start and end dates, and signature page are consistent across the three types of materials; if the signature or receipt is missing, it cannot be made external | Check the field names and required markers one by one in the node configuration, reference the fields with `formInputResult`, and run a trial |
| Budget application form | Whether the subject names, quantities, and budget period match the corresponding records in the project application form, and whether the versions are synchronized | Check the required settings one by one, and after submission verify the field values obtained by subsequent nodes |
| Cooperation agreement | Whether the partner names, task division, stamp, and receipt are complete, and whether the dates are consistent with the budget application form | Use `userSelect` to select a restricted identity for a trial run, and check whether the visible scope matches the settings |
| Authorization scope | Whether the visitor identity matches the visible scope, and whether unauthorized records are not visible | After submission, verify the field values obtained by subsequent nodes and confirm that unauthorized fields are not passed out |

## Three common errors

- Symptom: The name, quantity, and date of the same project do not match across two materials. Cause: The versions are not synchronized, and cross-checking was not performed after each was filled in independently.
- Symptom: The cooperation agreement lacks a signature or receipt but has already entered external services. Cause: The required markers do not cover the signature page fields, and submission was not blocked.
- Symptom: After submission, subsequent nodes cannot obtain the values, and the conversation stays in the interactive state. Cause: The field names and references are inconsistent, or required items can still be submitted when empty.

## How to verify the setup

Acceptance of this feature: fill in once and submit, verify the field values obtained by subsequent nodes, and confirm that the fields referenced by `formInputResult` and `selectResult` are consistent with the required items.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized records are not visible.

- Check the form field names and required markers one by one in the node configuration, and confirm they correspond one-to-one with the fields of the project application form, budget application form, and cooperation agreement.
- Reference the field in subsequent nodes and run a trial, confirm that the field values can be obtained after submission, and that unauthorized fields are not passed to the external entry point.
