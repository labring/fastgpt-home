---
title: Forms and User Interaction for School Mental Health Screening and Referrals: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c015-f016
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Forms | Access
meta_description: Student Mental Health: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Mental Health Screening and Referrals: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: screening plans, interview records, and referral forms. Screening plans are usually updated per semester by school psychological teachers or district/county teaching and research departments, and include screening subjects, tools, time, and authorization scope; interview records are filled in on each occasion by homeroom teachers or psychological teachers, and include date, participants, observation points, and signature; referral forms are initiated by psychological teachers, and include referral subject, reason, recipient, and receipt. When the three types of materials enter the form input node, their roles differ: the screening plan determines the field scope and required items, the interview record provides the date and signature fields collected on each occasion, and the referral form serves as the external service entry point and authorization scope statement. In terms of update cadence, the plan is adjusted per semester or school year, while records and referral forms are generated per instance; field names, counts, dates, and signatures must remain consistent across the two materials.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After this node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Screening plan | The screening subjects, tools, time, and authorization scope in the plan must correspond item by item with the field names, counts, and dates in the interview records and referral forms; signatures or receipts must not be missing | Check the field names one by one in the node configuration, and confirm that the plan fields correspond one-to-one with the record and referral form fields |
| Interview record | The date, participants, observation points, and signature in the record must be consistent with the screening plan and referral form; the name, count, and date of the same record in the two materials must not mismatch | Check the required settings one by one, confirm that key material fields are marked as required, and check whether the signature field can be collected |
| Referral form | The referral subject, reason, recipient, and receipt in the referral form must match the screening plan and interview records; the version must be synchronized, and it cannot be released if the signature or receipt is missing | Reference this field in subsequent nodes and run a test to confirm that subsequent nodes can retrieve the corresponding field value |

## Three common errors

- Phenomenon: The name, count, and date of the same record do not match between the screening plan and the interview record. Cause: The fields in the two places were not synchronized to the same version, and each was filled in separately during collection.
- Phenomenon: A referral form missing a signature or receipt is still treated as externally usable material. Cause: The required markers do not cover the signature and receipt fields, and submission is not blocked.
- Phenomenon: After submission, subsequent nodes cannot retrieve the value, and the conversation remains in the interaction state. Cause: The field name is inconsistent with the reference in subsequent nodes, or required items can still be submitted when empty.

## How to verify the setup

Acceptance for this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields output by `formInput` correspond one-to-one with the screening plan, interview records, and referral forms.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized access is not visible; if necessary, use `userSelect` to select an identity and check the external service entry point.

- Check the field names one by one in the node configuration, and confirm that the field names and required markers of the screening plan, interview records, and referral forms are consistent
- Reference the `formInputResult` fields in subsequent nodes and run a test to confirm that the field values can be passed after submission, and that the `userSelect` identity matches the visible scope
