---
title: Forms and User Interaction for Peer Review Organization: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c067-f016
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Forms | Handover
meta_description: Peer Review: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Peer Review Organization: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Material drafting and responsibility handover for peer review organizations involves three types of materials: review invitations, expert review comments, and author revision notes. Review invitations record the reviewer, manuscript number, invitation date, and response deadline; expert review comments record review dimensions, specific items, conclusions, and signatures; author revision notes record point-by-point responses, revision locations, version numbers, and dates. The three types of materials are filled in by different responsible persons during the drafting stage. When entering the handover stage, it is necessary to check whether the name, quantity, and date of the same record are consistent across the two materials, whether the versions are synchronized, and whether signatures or receipts are complete. Materials are updated according to the manuscript circulation rhythm, and each round of review produces a new version. Field characteristics are itemized, with dates and responsible person signatures. Missing items or version misalignment will block issuance.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). "Issuable material drafts and handover records" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation material | Whether the reviewer, manuscript number, invitation date, response deadline, and responsible signature are complete, and whether the date and version are consistent | Check field names and required markers one by one in the node configuration, and test-run referenced fields |
| Expert review comment material | Whether the review dimensions, specific items, conclusions, signature, and date are complete, and whether the name and quantity of the same record match across the two materials | Check the required settings, reference field values in subsequent nodes, and test-run |
| Author revision note material | Whether the point-by-point responses, revision locations, version number, date, and receipt are complete, and whether the version is synchronized | Check field names and required markers, and inspect field passing after submission |
| Form field configuration | Fields correspond one-to-one with the material fields to be collected, and key fields are marked as required | Check field names and required settings one by one in the node configuration |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the review invitation and the expert review comments. Cause: The two materials are drafted separately, fields are not checked uniformly, and items are not compared one by one during handover.
- Symptom: The version number of the author revision notes is not synchronized with the expert review comments, and the old version is still referenced after issuance. Cause: The version field is not updated with the material, and the handover record does not record version changes.
- Symptom: The material lacks a signature or receipt, and the next step cannot sign for acceptance. Cause: The required markers do not cover the signature and receipt fields, and subsequent nodes cannot retrieve the corresponding values after submission.

## How to verify the setup

Acceptance for this feature: fill in once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInput` node output is consistent with the `userSelect` selection items, and that field passing has no omissions.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required markers one by one in the node configuration to ensure they correspond one-to-one with the material fields.
- Reference the `formInputResult` and `selectResult` field values in subsequent nodes and test-run to confirm that the corresponding values can be retrieved after submission.
