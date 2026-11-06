---
title: Forms and User Interaction for Journal Review, Proofreading and Editorial Quality: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c068-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Forms | Handover
meta_description: Journal Editing: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Journal Review, Proofreading and Editorial Quality: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on the journal three-stage review and three-proof correction and editorial quality, and sorts out the fields and version characteristics of the material drafting and responsibility handover steps. The materials entering this function include the three-stage review form, proofs, and proofreading records, and each material carries a different role: the three-stage review form records the hierarchical opinions and signatures of the initial review, re-review, and final review; the proofs present the text and layout status after typesetting; and the proofreading records summarize the changes and red-check results of each proofreading round. The material sources are internal circulation within the editorial office and external author receipts, and the update rhythm changes version by version as the review rounds and proofreading rounds advance, with field characteristics concentrated in name, quantity, date, signature, and receipt. In the three-stage review form and proofreading records, it often happens that the name, quantity, and date of the same record do not match across the two materials, the proof version is not synchronized, and signatures or receipts are missing at handover. When the material enters the form input node, the submitter enters field values item by item according to the template, and subsequent nodes or manual work complete the signable material draft and handover record based on this.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "signable material draft and handover record" is then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-stage review form | Fields and dates must be consistent with the proofs and proofreading records, and signatures must be complete | Check the name, quantity, date, and signatures of the initial review, re-review, and final review, and check whether the required markers cover the key fields |
| Proofs | The version number and date must be synchronized with the proofreading records, and the layout status must be clear | Check the proof version and date, confirm that they correspond to the change entries in the proofreading records, and avoid unsynchronized versions |
| Proofreading records | The name, quantity, date, and red-check results of each proofreading round must match the three-stage review form | Check the proofreading round entries and signature receipts, reference the `formInputResult` fields and run a trial, and confirm that subsequent nodes can retrieve the values |
| Form input node | Field names correspond one-to-one with the material fields, required items are marked, and fields can be passed after submission | Check the field names and required settings one by one in the node configuration, use `userSelect` to trial-select and submit, and check the references in subsequent nodes |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the three-stage review form and the proofreading records. Cause: The two materials were drafted separately, the fields were not checked against the same template, and no consistency comparison was made at handover.
- Symptom: The proof version is not synchronized, and the proofreading records still reference changes from the old version. Cause: The version number and date were not updated with the proofreading round, and no version check action was triggered after form submission.
- Symptom: The handover record lacks signatures or receipts, and the material remains in the interaction state. Cause: The required markers did not cover the signature and receipt fields, and subsequent nodes cannot retrieve the corresponding values after submission.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that `formInputResult` and `selectResult` output correctly, and that submission is impossible when required items are empty.

Business test: draft one according to the template and complete one handover, see whether missing items are blocked, and check whether the name, quantity, date, and signature receipts are complete.

- In the node configuration, check the field names and required markers one by one to ensure they correspond one-to-one with the fields of the three-stage review form, proofs, and proofreading records.
- After submission, go to subsequent nodes to reference the corresponding fields and run a trial, confirm that the field values can be retrieved, and check whether the conversation remains in the interaction state.
