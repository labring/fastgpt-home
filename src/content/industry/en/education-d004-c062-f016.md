---
title: Forms and User Interaction for Research Ethics Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c062-f016
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Forms | Handover
meta_description: Research Ethics: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Ethics Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Research ethics review involves three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. Their sources are the institutional ethics committee and the project team, and their update cadence rolls with protocol revisions or annual reviews. Their field characteristics center on subject names, sample quantities, signing dates, version numbers, and responsible person signature fields. When the materials enter the form input node, each plays a different role: the ethics review application serves as the main document carrying the project's basic information, the informed consent form template serves as an attachment carrying the subject notification and signature fields, and the risk assessment form serves as a supporting document carrying the risk level and disposition signature. The three must keep names, quantities, and dates consistent on the same record, with versions synchronized and no missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The issuable material drafts and handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The name, quantity, date, and signature fields must be consistent with the informed consent form template and the risk assessment form; the version number and date must be synchronized | In the node configuration, check the field names one by one, confirm that the application number, subject name, sample quantity, signing date, version number, and responsible person signature field correspond one-to-one with the material fields; mark key fields as required; reference the `formInputResult` fields in subsequent nodes and do a test run |
| Informed consent form template | The subject name, sample quantity, and signing date must be consistent with the ethics review application; if the version is not synchronized or the signature receipt is missing, it is unqualified | Check whether the template field names and the application field names have the same name and meaning; set the signing date and version number as required; after submission, check whether subsequent nodes can retrieve the corresponding `formInputResult` field values |
| Risk assessment form | The risk level, disposition date, and responsible person signature must match the ethics review application and the informed consent form template; if the receipt is missing, block it | Check the field names for risk level and disposition date; mark the responsible person signature and receipt fields as required; after submission, confirm that subsequent nodes retrieve the field values, and if items are missing, the conversation does not continue |
| `formInputResult` and `selectResult` | The form input node only outputs the field values filled in by the user; it does not automatically recognize material content, nor does it judge whether materials are authentic | In the node configuration, check that the `formInputResult` field names correspond one-to-one with the material fields; use `userSelect` to select the material type; after submission, do a test run to confirm that subsequent nodes retrieve the field values |

## Three common errors

- Symptom: The subject name, sample quantity, and date for the same record do not match between the ethics review application and the informed consent form template. Cause: The field names do not have the same name and meaning, each was filled in separately during drafting, and no consistency check was performed.
- Symptom: The version is not synchronized, the risk assessment form still uses the old version, and the signing date does not match the application version number. Cause: The version number and date were not set as required, and no comparison was made in subsequent nodes after submission.
- Symptom: Signatures or receipts are missing, yet the materials still enter the next stage. Cause: The responsible person signature field and receipt field were not marked as required, so submission is possible even when required items are empty.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` field names correspond one-to-one with the material fields, that `userSelect` selects correctly, that submission is impossible when required items are empty, and that the conversation does not remain in the interactive state.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node configuration, check the field names one by one, and mark the subject name, sample quantity, signing date, version number, and responsible person signature field as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and do a test run to confirm that the corresponding field values are retrieved, and that the conversation does not continue when items are missing.
