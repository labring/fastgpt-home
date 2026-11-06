---
title: Forms and User Interaction for Academic Journal Business Partnerships: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c070-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Forms | Access
meta_description: Journal Partnerships: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Academic Journal Business Partnerships: Manage Authorized Access and External Services

## What this category's data looks like

Academic journal business cooperation management involves three types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. A business cooperation agreement contains the partner name, scope of cooperation, signing date, and signatures of both parties; an advertising review form contains the advertiser, submission date, review conclusion, and reviewer signature; distribution cooperation materials contain distribution channels, quantities, start and end dates, and receipts. The sources of materials are partner submissions, internal reviews, and distribution feedback, and the update cadence rolls with the cooperation cycle and advertising schedule. When entering the forms and interactions feature, the business cooperation agreement takes on the role of entering the scope of authorization, the advertising review form takes on the role of registering external service content, and the distribution cooperation materials take on the role of verifying quantities and dates. The fields of the three types of materials must keep names, quantities, and dates consistent in the authorized access and external service entry points, avoiding the same record failing to match across two materials, and signatures or receipts must be retained for verification.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and scope of authorization are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Field names, signing date, and signatures of both parties must be consistent with the same record in the advertising review form and distribution cooperation materials | Check field names one by one in the node configuration, compare the names, quantities, dates, and signatures of the three materials, and confirm there are no missing signatures or receipts |
| Advertising review form | Advertiser, submission date, review conclusion, and reviewer signature must be synchronized with the versions of the business cooperation agreement and distribution cooperation materials | Check the required settings one by one, check whether the versions are synchronized, and confirm that the dates of the same record match across the two materials |
| Distribution cooperation materials | Distribution channels, quantities, start and end dates, and receipts must match the same record in the business cooperation agreement and advertising review form | Reference this field in subsequent nodes and run a test, check the quantities and dates, and confirm the receipts are complete |
| formInput | Submission is not allowed when required items are empty, and after submission the field values must be retrievable by subsequent nodes | Reference this field in subsequent nodes and run a test, and check whether the field value is passed correctly |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the business cooperation agreement and the advertising review form. Cause: The two materials are entered separately, and no comparison of the same record is performed.
- Symptom: The version of the distribution cooperation materials is not synchronized, and the authorization scope and external service entry point display old content. Cause: The form was not resubmitted after the materials were updated.
- Symptom: The advertising review form lacks a signature or receipt, and subsequent nodes cannot retrieve values after submission. Cause: Required items are not fully marked, or the conversation remains in the interactive state.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInput` output is consistent with the `userSelect` selection.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Check the field names, dates, and signatures of the business cooperation agreement, advertising review form, and distribution cooperation materials, and confirm that the names, quantities, and dates of the same record are consistent.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirm that submission is not allowed when required items are empty, and that the field values can be retrieved after submission.
