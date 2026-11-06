---
title: Forms and User Interaction for Enterprise Employee Skills Assessment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c035-f016
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Forms | Access
meta_description: Employee Skills: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Enterprise Employee Skills Assessment: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on enterprise independent skilled-talent evaluation, and the materials include three categories: enterprise evaluation filing forms, evaluation specifications, and candidate rosters. Filing forms come from enterprise applications and competent-authority receipts, are updated by batch, and their fields include unit name, filing number, evaluation occupation, date, and signature/seal; evaluation specifications come from enterprise technical standards and question-bank descriptions, are revised as the occupation catalog is adjusted, and their fields include occupation name, level, module, and scoring rules; rosters come from registration-system exports, are updated on a rolling basis by exam period, and their fields include name, ID number, declared occupation, level, and signature column. When these three categories of materials enter the form input node, the filing forms and specifications define the scope of authorization, while the rosters serve as the basis for comparing visitor identity and the visible list; after the field values are submitted, they are used by subsequent nodes or by humans for entry opening and scope trimming.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry and authorization scope are then completed by subsequent nodes or by humans. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | The filing number, evaluation occupation, date, and signature/seal must be consistent with the evaluation specifications; if the receipt is missing, the authorization scope cannot be opened | Check the filing number and signature/seal item by item, reference the filing number field in `formInput`, and run a trial |
| Evaluation specifications | The occupation name, level, and module must be aligned item by item with the declared information in the roster; if the version is not synchronized, the visible scope will be misaligned | Check the specification version number and effective date, and limit the occupation and level options in `userSelect` |
| Candidate roster | The name, ID number, declared occupation, and level must match the filing form and the specifications; if the signature is missing, the person does not enter the visible list | Extract several records for three-way comparison, reference the ID number field in `formInput`, and run a trial |
| External entry and authorization scope | Visitor identity matches the visible scope; unauthorized access is not visible; restricted identities can only see the roster for the corresponding batch | Access once with a restricted identity, and check whether the field values obtained by subsequent nodes fall within the set scope |

## Three common errors

- Phenomenon: the same candidate's occupation name and level do not match between the roster and the filing form. Cause: the two materials were entered in different steps, the versions were not synchronized, and submission occurred without a three-way comparison.
- Phenomenon: after the evaluation specifications are revised, the roster still uses the old levels and modules. Cause: the specification version number and effective date were not checked together with the form fields, and old-version data continued to flow.
- Phenomenon: the filing form lacks a signature or receipt, yet the authorization scope is still opened. Cause: key material fields were not marked as required, and after submission subsequent nodes cannot obtain the signature/seal field value.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values obtained by subsequent nodes, and confirm that the field names referenced by `formInputResult` and `selectResult` are consistent with the submitted values.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, confirm that unauthorized records are not visible, and that batches missing signatures or receipts do not enter the open scope.

- In the node configuration, check the form field names one by one so that the filing form, evaluation specifications, and roster fields correspond one to one, and mark key material fields as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the field values can be obtained after submission and that the conversation does not remain in the interaction state.
