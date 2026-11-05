---
title: Forms and User Interaction for Exam Organization and Misconduct Handling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c039-f016
page_type: 行业问题页
application_area: education
meta_title: Exam Administration | Forms | Handover
meta_description: Exam Administration: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Exam Organization and Misconduct Handling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In exam organization and violation handling scenarios, materials mainly fall into three categories: exam manuals, exam room record sheets, and violation fact records. Their sources are exam arrangements and on-site records, and their update cadence advances with exam batches. Field characteristics center on candidate information, time and location, factual descriptions, signatures, and receipts. Exam manuals carry rules and procedures, exam room record sheets carry the on-site process, and violation fact records carry specific facts and handling basis. When these three types of materials enter the form input node, each plays a field collection role: the manual provides referenceable entries, the record sheet provides process data, and the fact record provides facts to be confirmed, together forming the basic fields for a signable material draft and handover record.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "signable material draft and handover record" is then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Exam manual | Fields and dates must be aligned item by item with the exam room record sheet and violation fact record, and signatures and receipts must be complete | Check field names one by one in the node configuration, and confirm that the names, quantities, and dates of manual entries match those in the record sheet and fact record |
| Exam room record sheet | The name, quantity, and date of the same record in the manual and fact record must be consistent, and versions must be synchronized | Check the required settings one by one, reference fields with `formInputResult` and run a trial, and confirm that subsequent nodes can retrieve the corresponding field values after submission |
| Violation fact record | The factual description, date, and signature must correspond to the manual and record sheet; missing signatures or receipts must be blocked | Reference this field in a subsequent node and run a trial, use `userSelect` to select the record source, and confirm that submission is not allowed when required items are empty |
| Handover record | Responsible persons are clear, versions and dates are consistent, and receipts are traceable | Check the handover fields and signature receipts, and confirm that the conversation does not remain in the interactive state due to missing items |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the manual and the fact record. Cause: Fields were not checked one by one, and the two places were filled in separately, causing the standards to diverge.
- Symptom: Material versions are not synchronized, and old record sheets are mixed with new fact records. Cause: After submission, versions and dates were not checked, and no blocking occurred at handover.
- Symptom: The violation fact record lacks a signature or receipt, and handover cannot be signed for. Cause: Required markers did not cover the signature and receipt fields, and missing items were not blocked.

## How to verify the setup

Acceptance for this feature: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields corresponding to `formInputResult` and `selectResult` can be referenced and that submission is not allowed when required items are empty.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required settings one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the exam manual, exam room record sheet, and violation fact record.
- Reference this field in a subsequent node and run a trial, confirm that subsequent nodes can retrieve the corresponding field values after submission, and that the conversation does not remain in the interactive state due to missing items.
