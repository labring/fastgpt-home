---
title: Forms and User Interaction for Peer Review Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c067-f016
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Forms | Intake
meta_description: Peer Review: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Peer Review Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

The daily materials of a peer review organization mainly consist of review invitations, expert review comments, and author revision notes; the three differ in fields, dates, and signature requirements. Review invitations focus on the invitee, manuscript number, response deadline, and receipt; expert review comments focus on the review conclusion, itemized scores, date, and signature; author revision notes focus on point-by-point responses, revision locations, and submission date. Material sources are mostly email receipts, system exports, and manual compilation, and the update cadence changes with manuscript circulation; revision notes often appear in multiple rounds of versions. When entering the form input node, the three types of materials each play a different role: review invitations provide the basis for acceptance, expert review comments provide the basis for judgment, and author revision notes provide the basis for completion. In terms of field characteristics, name, quantity, date, signature, and receipt are all indispensable; any one missing will prevent the subsequent handler from processing directly.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "acceptance record and completion questions" are completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Fields must cover the invitee, manuscript number, response deadline, and receipt; the date and signature must be consistent with the corresponding records in the expert review comments | Check the field names and required markers one by one in the node configuration, reference the `formInputResult` fields in a trial run, and confirm that subsequent nodes can retrieve the invitee and response deadline |
| Expert review comments | Fields must cover the review conclusion, itemized scores, date, and signature; the name, quantity, and date of the same manuscript number must not mismatch across the two materials | Check the required settings, use `userSelect` to select the review conclusion and submit, and check whether the field values retrieved by subsequent nodes are consistent with the original text of the comments |
| Author revision notes | Fields must cover point-by-point responses, revision locations, and submission date; when versions are not synchronized or the signature or receipt is missing, it must be marked as pending completion | Check the required settings one by one, and after submission check whether the conversation exits the interaction state, and confirm that subsequent nodes can retrieve the revision locations and submission date |
| Acceptance record and completion questions | Missing items are identified and followed up on, and answers are based on materials; the name, quantity, and date of the same record across the two materials must match | Reference the `formInputResult` and `selectResult` field values in subsequent nodes in a trial run, and check whether the follow-up questions point to the missing signature or receipt |

## Three common errors

- Symptom: the name and date of the same manuscript number mismatch between the review invitation and the expert review comments. Cause: the two materials are entered at different stages, and no field-level comparison was performed.
- Symptom: the author revision notes have multiple rounds of versions, but the acceptance record still references an old version. Cause: versions are not synchronized, and there is a lack of verification based on the submission date.
- Symptom: the review invitation lacks a receipt and the expert review comments lack a signature, yet they still enter the handling stage. Cause: the required markers do not cover the signature and receipt fields.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` outputs are consistent with the filled-in content, and that the conversation exits the interaction state.

Business test: submit a question that lacks key information, and see whether it first follows up before answering.

- Check the field names and required markers one by one in the node configuration, and confirm that the signature, receipt, and date fields are marked as required.
- After submission, check that subsequent nodes reference the field values and run a trial, and confirm that the conversation does not remain in the interaction state.
