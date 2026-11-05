---
title: Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c017-f016
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Forms | Access
meta_description: Undergraduate Programs: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Manage Authorized Access and External Services

## What this category's data looks like

Undergraduate program setup and dynamic adjustment involves three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The sources are academic affairs departments, secondary schools, and external experts, and the update cadence changes with application batches and annual adjustment notices. Program setup application form fields include program name, code, program length, degree-granting category, enrollment scale, faculty and conditions; talent cultivation plan fields include cultivation objectives, curriculum system, credits and class hours, and practical components; expert review opinion fields include review date, expert list, conclusion, and signature. When entering the form input node, the three types of materials each play a field collection role: the application form provides basic program identity and condition data, the cultivation plan provides course and credit data, and the review opinions provide review conclusion and signature information, for subsequent nodes to retrieve by field.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the field names, dates, and signatures are consistent with the talent cultivation plan and expert review opinions | Check the field names and required settings one by one in the node configuration, and after submission have subsequent nodes reference the field and run a trial |
| Talent cultivation plan | Whether the course names, quantities, credits, and class hours match the application form and review opinions | Check the courses and credits item by item against the two materials, and after submitting with `formInput`, check the values retrieved by subsequent nodes |
| Expert review opinions | Whether the review date, expert list, conclusion, and signature or receipt are complete and version-synchronized | Check the signature and receipt, use `userSelect` to select the review conclusion and submit, and check whether subsequent nodes retrieve the corresponding value |
| External entry point and authorization scope | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, and check whether the visible scope is consistent with the setting |

## Three common errors

- Symptom: The name, quantity, and date of the same program do not match between the application form and the cultivation plan. Cause: The two materials are filled in separately, without cross-checking and version synchronization.
- Symptom: The expert review opinions lack a signature or receipt, and the material cannot serve as an effective basis. Cause: The submission step did not set the signature and receipt as required, and did not verify them in subsequent nodes.
- Symptom: After submission, subsequent nodes cannot retrieve values, or required items can still be submitted when empty. Cause: The field names do not correspond one-to-one with the material fields, and the required markers were not checked one by one.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that fields can be passed correctly after submission via `formInputResult` and `selectResult`.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting.

- Check the field names and required markers one by one in the node configuration, ensuring they correspond one-to-one with the three types of material fields.
- Reference the submitted fields in subsequent nodes and run a trial, confirming that the corresponding field values are retrieved and that the conversation does not get stuck in the interactive state.
