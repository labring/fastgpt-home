---
title: Forms and User Interaction for University Laboratory Safety Classification: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c064-f016
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Forms | Review
meta_description: Lab Safety Categories: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for University Laboratory Safety Classification: Trace Exceptions and Review Results

## What this category's data looks like

The category materials for university laboratory safety grading and classification mainly come from three ledgers: the laboratory grading and classification table, the hazard source list, and the safety responsibility statement. The grading and classification table registers the category, hazard source names and quantities, and responsibility level by room or laboratory unit; the hazard source list records hazard source names, quantities, storage locations, and control measures item by item; the safety responsibility statement states the responsible person, signature, and date. The three materials are usually updated by academic year or semester, and immediate revision is triggered when new equipment is added, renovation or expansion occurs, or the responsible person changes. When the materials enter the exception tracing and manual review scenario, the grading and classification table provides the unit and category to which the exception belongs, the hazard source list provides the specific items and quantities involved in the exception, and the safety responsibility statement provides the basis for responsibility attribution and signature receipt. Field characteristics are concentrated in four types: name, quantity, date, and signature. If any field does not match across materials, it will affect whether the exception can be traced back to the source material.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Align item by item with the hazard source list on name, quantity, date, and signature | Check whether the hazard source names, quantities, registration dates, and responsible person signatures of the same laboratory unit are consistent in the two materials, and mark discrepancies where inconsistent |
| Hazard source list | Correspond with the safety responsibility statement on responsible person and signature receipt | Check whether the responsible person corresponding to the list item is the same as the signer of the responsibility statement, and list items missing a signature or receipt separately |
| Safety responsibility statement | Version and date can cover the current grading and classification cycle | Check the signing date of the responsibility statement and the update date of the grading and classification table, and mark those whose versions are not synchronized as pending review |
| formInput form fields | Field names correspond one-to-one with the material fields to be collected | Check the field names one by one in the node configuration, reference the fields with `formInputResult` and run a trial, and confirm that subsequent nodes obtain the corresponding field values |

## Three common errors

- Phenomenon: the name, quantity, or date of the same hazard source does not match in the two materials. Cause: the grading and classification table and the hazard source list are maintained separately, and updates were not synchronized.
- Phenomenon: the responsibility statement signature or receipt is missing, and the exception cannot be assigned to the responsible person. Cause: the signature column was not checked when the materials were archived, and items missing signatures still entered circulation.
- Phenomenon: after submission, subsequent nodes cannot obtain values, and the exception list cannot be generated. Cause: required items can be submitted even when empty, or the field names are inconsistent with the references in subsequent nodes.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, check the field values obtained by subsequent nodes, and confirm that the `formInputResult` and `selectResult` references can obtain the corresponding field values.

Business test: create an exception record, see whether it can be traced back to the source material, and check the four types of fields: name, quantity, date, and signature.

- Check the form field names against the material field names one by one, and confirm that the required markers fall on key material fields.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the field values can be passed after submission.
