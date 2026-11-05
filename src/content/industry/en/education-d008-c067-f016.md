---
title: Forms and User Interaction for Peer Review Organization: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c067-f016
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Forms | Access
meta_description: Peer Review: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Peer Review Organization: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the authorized access and external service scenarios of peer review organizations. The materials include three types: review invitations, expert review comments, and author revision notes. A review invitation records the manuscript title, the date sent for review, and the expert's signature; expert review comments record the comment items, the return date, and the signature; author revision notes record the revision items, the explanation date, and the receipt. The material sources are emails between the editorial office and experts, and system export records. The update cadence advances with review rounds, with each round producing a new version. Field characteristics are concentrated in four categories: name, quantity, date, and signature, which need to be compared item by item. When the materials enter the form input node, each assumes a different role: the review invitation provides the trigger basis for the authorized entry point, the expert review comments constitute the content body of the externally visible scope, and the author revision notes serve as the object for checking the receipt and signature.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Form fields | Field names correspond one-to-one with the material fields to be collected | Check the field names one by one in the node configuration, and confirm that the name, quantity, date, and signature of the review invitation, expert review comments, and author revision notes each exist as independent items |
| Required markers | Key material fields are marked as required; missing signature or receipt cannot pass | Check the required settings one by one, and confirm that the signature and receipt fields are required and that empty values cannot be submitted |
| Field passing after submission | Subsequent nodes can retrieve the corresponding field values | Reference the field in a subsequent node and run a test, and confirm that the values retrieved by `formInputResult` and `selectResult` are consistent with the submitted content |
| Authorization scope and visible scope | Visitor identity matches the visible scope; unauthorized items are not visible | Access once with a restricted identity, and check that the visible items of the review invitation, expert review comments, and author revision notes are consistent with the settings |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the review invitation and the expert review comments. Cause: The two materials are entered separately, and the fields are not checked for consistency.
- Symptom: The version of the author revision notes is not synchronized, and an old receipt is still referenced. Cause: The update cadence advances with rounds, and the version number is not updated in sync with the materials.
- Symptom: The expert review comments lack a signature or the author revision notes lack a receipt. Cause: The required markers do not cover the signature and receipt fields, so empty values can be submitted.

## How to verify the setup

Acceptance of this feature: Fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields passed by `formInputResult` and `selectResult` are consistent with the submitted content.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized items are not visible.

- Check the correspondence between the form field names and the fields of the review invitation, expert review comments, and author revision notes one by one.
- Check that the required markers cover the signature and receipt fields, and run a test with an empty-value submission to confirm that the conversation does not remain in the interactive state.
