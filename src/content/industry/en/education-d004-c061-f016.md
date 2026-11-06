---
title: Forms and User Interaction for Research Outcome Registration and Intellectual Property: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c061-f016
page_type: 行业问题页
application_area: education
meta_title: Research IP | Forms | Handover
meta_description: Research IP: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Outcome Registration and Intellectual Property: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms come from the research group or the completer, submitted according to the pace of achievement output, with fields including achievement name, completer, completion date, achievement form, and signature column; patent disclosure documents come from the inventor, updated with the application plan, with fields including technology name, inventor, key points of the technical solution, proposed application date, and signature column; software copyright materials come from the development team, organized according to version release milestones, with fields including software name, version number, development completion date, first publication date, and seal column. When these three types of materials enter the forms and interaction stage, they respectively assume the roles of registration, disclosure, and copyright declaration. At the intersections of fields, names, quantities, and dates must remain consistent, and positions for responsible person signatures and receipts must be reserved, so that subsequent nodes or personnel can draft signable materials and handover records accordingly.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The signable material drafts and handover records are completed by subsequent nodes or personnel. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Fields correspond one-to-one with the achievement registration form; name, completer, completion date, and achievement form are complete; the responsible person is clear | Check the field names one by one in the node configuration, check the required settings, and reference the `formInputResult` field in subsequent nodes for a trial run |
| Patent disclosure document | Fields correspond one-to-one with the patent disclosure document; technology name, inventor, key points of the technical solution, and proposed application date are complete; the signature column and receipt position are clear | Check the field names one by one in the node configuration, check the required settings, and reference the `formInputResult` field in subsequent nodes for a trial run |
| Software copyright materials | Fields correspond one-to-one with the software copyright materials; software name, version number, development completion date, and first publication date are complete; the seal column is clear | Check the field names one by one in the node configuration, check the required settings, and reference the `formInputResult` field in subsequent nodes for a trial run |
| Handover record | The handing-over parties, handover date, version number, and receipt status are traceable; missing items are blocked by required markers | Reference the `selectResult` output in subsequent nodes for a trial run, and check whether the handover record field values are passed through in place |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the achievement registration form and the patent disclosure document. Cause: The two materials are drafted separately, the field sources and version numbers are not unified, and no cross-check is performed after submission.
- Symptom: The version of the software copyright materials is not synchronized, and two sets of values appear for the development completion date and the first publication date. Cause: After a version update, only one material is changed while the other retains the old value, and there is a lack of consistency checks between version and date.
- Symptom: The handover record lacks a signature or receipt, and the next step cannot be signed for. Cause: The required markers do not cover the signature and receipt fields, the subsequent nodes cannot retrieve the corresponding values after submission, and the process stops in the interaction state.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` field values can be passed through in place, and that submission is not possible when required items are empty.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one in the node configuration, and ensure that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirming that the field values can be retrieved after submission.
