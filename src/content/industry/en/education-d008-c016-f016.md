---
title: Forms and User Interaction for School Safety Inspections and Incident Reporting: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c016-f016
page_type: 行业问题页
application_area: education
meta_title: Campus Safety | Forms | Access
meta_description: Campus Safety: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Safety Inspections and Incident Reporting: Manage Authorized Access and External Services

## What this category's data looks like

School safety hazard inspection and campus incident reporting materials fall into three categories: safety inspection checklists, hazard rectification ledgers, and emergency incident reports. Safety inspection checklists are submitted weekly or monthly by duty teachers, security guards, and logistics staff, with fields including inspection point, hazard description, inspection date, and inspector signature; hazard rectification ledgers are updated per instance, with fields including hazard name, rectification measures, responsible department, completion date, and acceptance signature; emergency incident reports are submitted immediately upon the incident, with fields including incident name, occurrence time, number of people involved, handling process, reporter signature, and receipt. When the three types of materials enter the form input node, each assumes a different role: safety inspection checklists provide the daily inspection baseline, hazard rectification ledgers provide closed-loop progress, and emergency incident reports provide the basis for immediate reporting. In terms of field characteristics, names, quantities, dates, and signatures often require cross-checking between the two types of materials, and version synchronization and receipt retention are key to the update rhythm.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Safety inspection checklist | Whether the fields, dates, and signatures correspond to the hazard rectification ledger | Check the field names one by one in the node configuration, and use `formInput` for a trial run to confirm that subsequent nodes can retrieve the inspection date and inspector signature |
| Hazard rectification ledger | Whether the name, quantity, and date of the same record are consistent across the two materials | Check the hazard name and completion date item by item against the safety inspection checklist, use `userSelect` to select the responsible department and then run a trial to confirm the field values are passed |
| Emergency incident report | Whether the signature or receipt is missing, and whether the version is synchronized | Check the reporter signature and receipt fields, confirm that the required marker has been set, and after submission check whether subsequent node references retrieve the values |
| External entry point and authorization scope | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, check whether the visible scope matches the setting, and confirm that the field values submitted by `formInput` do not exceed the authorization scope |

## Three common errors

- Symptom: The name, quantity, and date of the same hazard do not match across the two materials. Cause: The form fields do not correspond one-to-one with the material fields, and after submission the subsequent nodes retrieve old-version values.
- Symptom: The safety inspection checklist and the hazard rectification ledger versions are not synchronized, and the rectification completion dates are inconsistent. Cause: After the form input node is triggered, the conversation enters the interaction state, but the required items and version are not checked before submission.
- Symptom: The emergency incident report is missing a signature or receipt, yet the external entry point is still visible. Cause: The required marker does not cover the signature field, the authorization scope is not tightened by identity, and unauthorized access is not intercepted.

## How to verify the setup

Acceptance of this feature: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the field names, dates, and signatures passed by `formInputResult` and `selectResult` are consistent with the materials.

Business test: Access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized access is invisible and that the external entry point matches the authorization scope.

- Check the field names and required markers one by one in the node configuration, and confirm that key material fields have been marked as required.
- Reference the form fields in subsequent nodes and run a trial to confirm that the field values can be retrieved after submission and that the conversation does not get stuck in the interaction state.
