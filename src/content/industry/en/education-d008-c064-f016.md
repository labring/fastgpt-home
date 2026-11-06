---
title: Forms and User Interaction for University Laboratory Safety Classification: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c064-f016
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Forms | Access
meta_description: Lab Safety Categories: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for University Laboratory Safety Classification: Manage Authorized Access and External Services

## What this category's data looks like

University laboratory safety grading and classification materials come from laboratory grading and classification tables, hazard source lists, and safety responsibility statements, and their update cadence changes with adjustments to experimental projects, personnel changes, and semester inspections. The grading and classification table records the laboratory name, room number, hazard level, and responsible person; the hazard source list registers hazardous chemical names, quantities, storage locations, and dates; the safety responsibility statement states the responsibility clauses, signatures, and receipt dates. When the materials enter the form input function, the grading and classification table provides the externally visible laboratory identity and level fields, the hazard source list provides the quantity and date fields, and the safety responsibility statement provides the signature and receipt fields. The field names, quantities, and dates of the three must be filled in item by item by the user at submission, so that subsequent nodes can determine visible content according to the authorization scope.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Whether the name, room number, hazard level, and responsible person fields are consistent with the same record in the hazard source list and safety responsibility statement | Check the field names one by one in the node configuration, use `formInput` to reference the submitted values, then retrieve and compare them in subsequent nodes |
| Hazard source list | Whether the hazardous chemical name, quantity, storage location, and date match across the grading and classification table and the safety responsibility statement | Check the required settings one by one, run a trial once, and check whether subsequent nodes can retrieve the quantity and date field values |
| Safety responsibility statement | Whether the responsibility clause signature and receipt date are complete, and whether the version is synchronized with the grading and classification table | Reference the `selectResult` output in subsequent nodes and run a trial to check whether the signature and receipt date have missing items |
| External entry point and authorization scope | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, see whether the visible scope matches the settings, and check the `formInputResult` and `selectResult` values in subsequent nodes |

## Three common errors

- Symptom: The name and quantity of the same laboratory do not match between the grading and classification table and the hazard source list. Cause: The two materials are updated separately, and the fields are not checked against the same record.
- Symptom: The safety responsibility statement lacks a signature or receipt, and the version is not synchronized with the grading and classification table. Cause: The material update cadence is inconsistent, and the old version has not been replaced.
- Symptom: After submission, subsequent nodes cannot retrieve the values, or submission is possible even when required fields are empty. Cause: The required settings were not checked one by one, and the field references were not trial-run.

## How to verify the setup

Acceptance of this function: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` outputs match what was filled in.

Business test: access once with a restricted identity and see whether the visible scope matches the settings.

- Check the field names and required markers one by one in the node configuration to ensure they correspond one-to-one with the fields of the grading and classification table, hazard source list, and safety responsibility statement.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission.
