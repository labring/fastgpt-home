---
title: Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c048-f016
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Forms | Review
meta_description: Joint Education: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results

## What this category's data looks like

The establishment and annual report materials of Chinese-foreign cooperative education institutions mainly consist of the establishment application, cooperation agreement, and articles of association. They come from the filing system and offline submission, and their update cadence follows the establishment approval milestones and the annual report cycle. When the materials enter the form input node, the establishment application serves as the original record for fields such as institution name, education level, and enrollment scale; the cooperation agreement serves as the cross-reference for the names of both Chinese and foreign parties, contribution amounts, and signing dates; and the articles of association serve as the confirmation for governance structure, signatures, and receipts. Exception tracing and manual review revolve around the fields, dates, and signatures of the three types of materials. If the name, quantity, or date of the same record does not match across two materials, if versions are not synchronized, or if signatures or receipts are missing, an exception list must be produced and handed to the responsible person for handling.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Fields such as institution name, education level, and enrollment scale are checked item by item against the cooperation agreement and articles of association, and dates and signatures are complete | Check the field names one by one in the node configuration, mark key material fields as required, reference the field in subsequent nodes after submission, and run a trial |
| Cooperation agreement | The names of both Chinese and foreign parties, contribution amounts, and signing dates are consistent across the three materials, and versions and receipts are traceable | Use `formInput` to collect agreement fields, use `userSelect` to select the material version, check the required settings and submit, and inspect the field values obtained by subsequent nodes |
| Articles of association | The governance structure, signature page, and receipt are complete, and do not conflict with the names and dates in the establishment application and cooperation agreement | Map them one-to-one with the material fields to be collected in the form fields, and after submission check whether subsequent nodes can obtain the corresponding field values |
| Exception list and review conclusion | Exceptions are supported by original records, and after the reviewer signs, they are handed to the responsible person for handling | Create an exception record, trace it from the form field values to the source materials, and check the review conclusion and signature |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the establishment application and the cooperation agreement. Cause: The two materials are entered separately, no field-level comparison is performed, and exception tracing lacks support from original records.
- Symptom: The version of the articles of association is not synchronized, and the old signature page is mixed with the new receipt. Cause: After the material is updated, the version is not marked in the form fields, and the field values obtained by subsequent nodes point to the old version.
- Symptom: Missing signatures or receipts still enter review. Cause: Key material fields are not marked as required, so submission is possible even when required items are empty, and the review conclusion lacks a signature basis.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that the field values output by `formInputResult` and `selectResult` can correspond to the original records of the establishment application, cooperation agreement, and articles of association.

Business test: create an exception record, see whether it can be traced to the source materials, and check whether the exception list and review conclusion are supported by original records and the reviewer's signature.

- In the node configuration, check the field names one by one, map them one-to-one with the material fields to be collected in the establishment application, cooperation agreement, and articles of association, and check the required settings one by one.
- After submission, reference the field in subsequent nodes and run a trial to confirm that subsequent nodes can obtain the corresponding field values and that the conversation does not remain in the interaction state.
