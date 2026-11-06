---
title: Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c017-f016
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Forms | Handover
meta_description: Undergraduate Programs: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category involves three types of materials: the program setup application form, the talent cultivation plan, and expert review opinions. The program setup application form is drafted by the department and contains fields such as program name, code, length of study, degree-granting category, faculty, and conditions; the talent cultivation plan is written by the teaching and research office and contains fields such as curriculum system, class hours and credits, practical components, and graduation requirements; the expert review opinions are issued by the expert panel and contain the review conclusion, list of experts, signatures, and date. The three types of materials are updated by application batch. When the materials enter the form input node, each plays a different role: the application form provides the basic program information fields, the cultivation plan provides the course and credit fields, and the review opinions provide the conclusion and signature fields. The fields must remain consistent in name, quantity, and date, and must be marked with version and responsible person for subsequent handover and receipt.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The draft materials that can be issued and the handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Fields are complete, the responsible person is clear, version and date are consistent, and the program name and code align item by item with the talent cultivation plan and expert review opinions | Check field names and required settings one by one in the node configuration, reference the fields in subsequent nodes after submission and run a trial, and confirm that the corresponding field values are retrieved |
| Talent cultivation plan | Course names, class hours and credits, and the number of practical components are consistent with the application form and review opinions, and the version number and date are synchronized | Check the required settings one by one, reference the fields in subsequent nodes after submission and run a trial, and confirm that subsequent nodes can retrieve the corresponding field values |
| Expert review opinions | The list of experts, review conclusion, signatures, and receipt are complete, and the date is consistent with the application form and cultivation plan | Check the required settings one by one, reference the fields in subsequent nodes after submission and run a trial, and confirm that subsequent nodes can retrieve the corresponding field values |
| formInputResult and selectResult | Required markers cover the key material fields, and the field values can be used by subsequent nodes after submission | Check the field names and required markers in the node configuration, reference the field in subsequent nodes and run a trial, and confirm that no value retrieval failure occurs after submission |

## Three common errors

- Symptom: The same program name is written differently in the application form and the cultivation plan, and the quantity and date do not match. Cause: Fields were not uniformly named, each was filled in separately during drafting, and no item-by-item comparison was made before handover.
- Symptom: The cultivation plan version is not synchronized, and old-version courses are mixed with the new-version application form. Cause: The version number and date were not updated with the materials, and the handover record did not indicate the version.
- Symptom: The expert review opinions lack signatures or receipt, and the materials cannot be issued. Cause: Required markers did not cover the signature and receipt fields, and missing items were not blocked at submission.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, confirm that the fields corresponding to `formInputResult` and `selectResult` can be referenced, that submission is blocked when required fields are empty, and that the conversation does not remain in the interaction state.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, and confirm that the corresponding field values can be retrieved after submission
