---
title: Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c006-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Forms | Access
meta_description: Kindergarten Quality: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Kindergarten Operations and Quality Self-Assessment: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses kindergarten operation behavior and quality self-assessment. The material sources include three types: self-assessment reports, issue lists, and rectification plans. The update cadence advances with the kindergarten operation cycle and rectification milestones, and the field characteristics center on names, quantities, dates, signatures, and receipts. The self-assessment report carries the overall conclusion and indicator scores, the issue list itemizes pending corrections and responsibility assignments, and the rectification plan corresponds to measures, deadlines, and acceptance personnel. When these three types of materials enter this feature, the self-assessment report serves as the main record providing baseline information, the issue list provides itemized details, and the rectification plan provides follow-up actions and time arrangements. Their roles differ, but field consistency must be maintained in authorized access and external services.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Whether the name, quantity, date, and signature match the issue list and rectification plan | Check the field names one by one in the node configuration, confirm that the self-assessment report fields are consistent with the issue list and rectification plan; check the required settings and the signature and receipt fields |
| Issue list | Whether the name, quantity, and date of the same record are consistent across the two materials | Reference this field in subsequent nodes and run a test, check that the issue list corresponds item by item with the self-assessment report and rectification plan; check whether the versions are synchronized |
| Rectification plan | Whether the rectification measures, deadlines, and acceptance personnel are consistent with the issue list, and whether signatures or receipts are missing | Check the rectification plan field names and required markers, confirm that subsequent nodes can retrieve the corresponding field values after submission; check whether the receipt fields are complete |
| Form input node | Whether it can be submitted when required items are empty, and whether the conversation stays in the interactive state | Check the `formInput` node configuration, confirm the required markers and field passing; use `userSelect` to select a restricted identity and run a test once |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the self-assessment report and the issue list. Cause: The two materials are filled in separately, the fields are not checked uniformly, and the versions are not synchronized.
- Symptom: The rectification plan lacks signatures or receipts, and confirmation cannot be proven during external services. Cause: The required markers do not cover the signature and receipt fields, and no one reviews after submission.
- Symptom: After submission, subsequent nodes cannot retrieve the values, and the conversation stays in the interactive state. Cause: The field names are inconsistent with the references in subsequent nodes, or required items are empty but still submitted.

## How to verify the setup

Feature acceptance: Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInput` output is consistent with the `userSelect` selection result.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- Check the field names and required settings one by one in the node configuration, and confirm that the name, quantity, date, signature, and receipt fields of the self-assessment report, issue list, and rectification plan correspond one to one.
- Reference this field in subsequent nodes and run a test, check whether field passing succeeds after submission, and check whether the versions are synchronized.
