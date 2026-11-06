---
title: Forms and User Interaction for Journal Review, Proofreading and Editorial Quality: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c068-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Forms | Review
meta_description: Journal Editing: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Journal Review, Proofreading and Editorial Quality: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review materials in the scenarios of journal three-stage review, three-stage proofreading, and editorial quality. The category covers three core types of editorial materials: three-stage review sheets, proofs, and proofreading records. Material sources include review comments and signature pages formed during the editor's initial review, re-review, and final review stages, as well as proofs and proofreading record receipts retained at each proofreading round. The update cadence refreshes round by round as manuscripts move through the workflow and proofreading rounds advance; after each round of three-stage review or proofreading is completed, a new version of the materials is produced. Field characteristics center on four items: name, quantity, date, and signature. Three-stage review sheets record the manuscript name, review stage, and reviewer signature date; proofs record the proofreading round, page numbers, and proofreader signature; proofreading records record error entries, revision quantity, and review receipt. When materials enter this function, three-stage review sheets take on the role of the review stage and signature chain, proofs take on the role of version and page number comparison, and proofreading records take on the role of error entry and receipt verification. Together, the three support exception tracing and manual review.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusions are completed by subsequent nodes or manually. The form does not automatically identify material content, nor does it determine whether materials are authentic.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-stage review sheet | Whether the fields, dates, and signatures align item by item with the proofs and proofreading records | Check the field names one by one in the node configuration, confirm that the manuscript name, review stage, and reviewer signature date of the three-stage review sheet are consistent with the proofs and proofreading records, and use `formInput` to submit and run a trial |
| Proof | Whether the version is synchronized, and whether the page numbers and proofreading round correspond to the three-stage review sheet and proofreading records | Check the proof version number, proofreading round, and page numbers item by item against the proofreading record entries; when a version is found not to be synchronized, mark the discrepancy in the form, use `userSelect` to select the exception type, and submit |
| Proofreading record | Whether the error entries, revision quantity, dates, and receipt signatures are consistent with the three-stage review sheet and proofs | Check the name, quantity, dates, and receipt signature of the proofreading record one by one; when a signature or receipt is missing, record the missing item in the form, and after submission confirm that subsequent nodes can retrieve the corresponding field values |
| Form input node | Whether required markers cover key material fields, and whether field values can be passed after submission | Check the required settings one by one, confirm that key material fields are marked as required, and after submission check whether subsequent nodes successfully reference the `formInputResult` field values |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the three-stage review sheet and the proof. Cause: The two materials are filled in separately, without item-by-item cross-checking.
- Symptom: The proof version is not synchronized, and the proofreading record still points to the old version's page numbers. Cause: The new proofreading round's materials did not replace the old version, and the form did not record the version discrepancy.
- Symptom: The proofreading record lacks a signature or receipt, and the exception entry has no original record to support it. Cause: The receipt was not archived in sync with the proofreading round, and the reviewer cannot sign to confirm.

## How to verify the setup

This function's acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` field values can be passed to subsequent nodes, and that the `userSelect` selection items can be passed normally.

Business test: create an exception record, see whether the source material can be traced, and check whether the name, quantity, date, and signature of the three-stage review sheet, proof, and proofreading record are consistent.

- Check one by one whether the form field names correspond one-to-one with the material fields of the three-stage review sheet, proof, and proofreading record, and confirm that required markers cover key material fields.
- After submission, check whether subsequent nodes can retrieve the corresponding field values; when values cannot be retrieved, check the field references and required settings.
