---
title: Forms and User Interaction for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c045-f016
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Forms | Handover
meta_description: Training Compliance: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

For off-campus training compliance filing and penalty response, materials usually come from three types of ledgers: school operating licenses, course filing materials, and fee disclosure. The school operating license includes the license number, school address, validity period, and signature; the course filing materials include the course name, class hours, instructor, and filing date; the fee disclosure includes items, amounts, refund rules, and disclosure date. The update rhythm changes with filing changes, course adjustments, and new versions of fee disclosures. When materials enter the form input node, their respective roles are field sources: license documents provide subject qualification fields, course documents provide teaching fields, and fee documents provide funding fields, jointly supporting signable material drafts and handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The signable material drafts and handover records are completed by subsequent nodes or manually. After triggering, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Whether the license number, school address, validity period, and signature are consistent with the original | Check the field names one by one in the node configuration, and check the required markers |
| Course filing materials | Whether the course name, class hours, instructor, and filing date are consistent with the ledger | Reference the fields in subsequent nodes and run a trial to confirm the values |
| Fee disclosure | Whether the items, amounts, refund rules, and disclosure date are consistent with the disclosure document | Reference the fields in subsequent nodes and run a trial to confirm the values |
| Handover record | Whether the responsible person, version, date, and receipt are complete | Configure the fields with `formInputResult` and `selectResult` and run a trial |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match in two materials. Cause: The field sources are not synchronized, and values are not taken uniformly according to the ledger.
- Symptom: The version is not synchronized, and the old version of the course filing materials is still referenced. Cause: The update rhythm is not bound to the form fields, and the version is not checked after submission.
- Symptom: Signatures or receipts are missing, and the handover record is incomplete. Cause: The required markers do not cover the signature and receipt fields, and empty items are not blocked at submission.

## How to verify the setup

Acceptance of this feature: Fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that fields such as `formInputResult` and `selectResult` can be passed correctly.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one, and confirm that key material fields are marked as required.
- Reference the field in subsequent nodes and run a trial to confirm that the corresponding field value can be obtained after submission.
