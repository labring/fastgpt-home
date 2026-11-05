---
title: Forms and User Interaction for University Laboratory Safety Classification: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c064-f016
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Forms | Handover
meta_description: Lab Safety Categories: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for University Laboratory Safety Classification: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The core categories of university laboratory safety grading and classification materials are the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table originates from the laboratory's own hazard sources and nature of use; its update cadence adjusts with changes in experimental projects and hazardous chemical inventory; its fields include laboratory name, room number, classification category, number of hazard sources, responsible person, and date. The hazard source list originates from on-site inspections and ledgers, and updates dynamically with procurement, use, and disposal; its fields include hazardous chemical name, specification, quantity, storage location, risk level, and signature. The safety responsibility statement originates from being signed between the department and the laboratory, and is re-signed with personnel changes and duty adjustments; its fields include responsible person, scope of duties, signature, and date. After these three types of materials enter the workflow, the grading and classification table and the hazard source list are used by the form input node to collect fields, and the safety responsibility statement is used by subsequent nodes or by hand to generate a signable draft and handover record accordingly.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "signable material draft and handover record" is then completed by subsequent nodes or by hand. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Fields are complete, the responsible person is clear, and version and date are consistent; check whether laboratory name, room number, classification category, number of hazard sources, responsible person, and date correspond item by item | Check the field names one by one in the node configuration, confirm that the grading and classification table fields correspond one-to-one with the form fields, and check the required markers |
| Hazard source list | Whether the name, quantity, and date of the same record match between the grading and classification table and the hazard source list; check hazardous chemical name, specification, quantity, storage location, risk level, and signature | Check the required settings one by one, confirm that the key fields of the hazard source list have been marked as required, and reference this field in subsequent nodes and run a trial |
| Safety responsibility statement | Whether signature and receipt are complete; check whether responsible person, scope of duties, signature, and date are consistent with the grading and classification table and the hazard source list | Reference the safety responsibility statement fields in subsequent nodes and run a trial, confirming that after submission the subsequent nodes can obtain the corresponding field values |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the grading and classification table and the hazard source list. Cause: The two materials were drafted separately, and no field-by-field check was performed before submission.
- Symptom: Versions are not synchronized; after the responsibility statement is signed, the grading and classification table is changed again. Cause: The materials have different update cadences, and version and date were not checked during handover.
- Symptom: Signature or receipt is missing, and the material cannot be issued. Cause: It can still be submitted when required items are empty, and the conversation stays in the interaction state without continuing.

## How to verify the setup

This feature's acceptance: fill it out once and submit, and check the field values obtained by subsequent nodes; reference the `formInputResult` field in subsequent nodes and run a trial, confirming that after submission the corresponding values can be obtained, whether empty required items can be blocked, and whether the conversation stays in the interaction state.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names one by one in the node configuration, confirm they correspond one-to-one with the material fields to be collected, and check the required settings one by one.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirming that after submission the subsequent nodes can obtain the corresponding field values.
