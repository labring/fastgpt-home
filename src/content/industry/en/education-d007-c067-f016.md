---
title: Forms and User Interaction for Peer Review Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c067-f016
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Forms | Review
meta_description: Peer Review: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Peer Review Organization: Trace Exceptions and Review Results

## What this category's data looks like

In the exception tracing and manual review stage, peer review organizations have three core types of materials: review invitations, expert review comments, and author revision notes. A review invitation usually contains the manuscript number, invitation date, expert name, reply deadline, and receipt signature; expert review comments contain the comment body, review date, expert signature, and version number; author revision notes contain point-by-point responses, revision date, revised manuscript version, and author signature. These materials are updated by batch or by manuscript cycle, and the same manuscript may produce multiple versions across multiple rounds of review. When the materials enter the form input node, each plays a different role: the review invitation is used to check whether the invitation and receipt form a closed loop, expert review comments are used to check whether the comments and signature are complete, and author revision notes are used to check whether the revisions and versions correspond. Field characteristics center on four categories: name, quantity, date, and signature. Exception tracing means locating the original material in reverse from the form field values.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Reviewer invitation | The invitation date, expert name, and receipt signature must correspond item by item with the original invitation record. If the signature or receipt is missing, it is regarded as an anomaly pending traceability. | Check the field names and required settings one by one in the node configuration. After submission, reference the `formInputResult` field in subsequent nodes and run a test to confirm that the invitation date and signature values can be retrieved. |
| Expert review comments | The review date, comment version number, and expert signature must be consistent with the same period as the comment body. If the version is not synchronized or the date does not match, mark it as an anomaly. | Check the comment field names and required markers, reference `formInputResult` in subsequent nodes to retrieve the comment version and date, and run a test to confirm that the field values are traceable. |
| Author revision notes | The revision date, revised manuscript version, and author signature must correspond one by one with the point-by-point responses. If the same record name or quantity does not match between the two materials, include it in the anomaly list. | Check the revision note field names and required settings. After submission, subsequent nodes or manual review should compare the field values against the original materials to confirm traceability to the source. |
| Review conclusion | The reviewer signature and disposition opinion must be filled in manually, and the conclusion must be able to point back to any of the above material rows. | Check in the form whether the reviewer signature field is required. After submission, confirm that the field value is passed to subsequent nodes for the responsible person to handle. |

## Three common errors

- Symptom: The name or quantity of the same manuscript number does not match between the review invitation and the expert review comments. Cause: The two materials are entered in different stages and are not aligned using the same record identifier.
- Symptom: The version number in the author revision notes is inconsistent with the version referenced in the expert review comments, and the dates also deviate. Cause: The versions are not synchronized, and the review record is not written back after the revised manuscript is updated.
- Symptom: The review conclusion column lacks the reviewer signature or receipt, and the exception list cannot be closed. Cause: The signature and receipt are not set as required, so subsequent nodes cannot retrieve the corresponding field values after submission.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes match what was filled in, confirm that the `formInputResult` and `selectResult` field values can be passed, and that the conversation does not remain in the interactive state because a required item is empty.

Business test: create an exception record, see whether the source material can be traced, confirm that the exception is supported by the original record and that the reviewer signature is complete, then hand it to the person in charge for handling.

- In the node configuration, check the form field names and required markers one by one to ensure that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that the corresponding field values can be retrieved after submission.
