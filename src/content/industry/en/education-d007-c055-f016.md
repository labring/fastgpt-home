---
title: Forms and User Interaction for Adult College Entrance Applications and Admissions: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c055-f016
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Forms | Review
meta_description: Adult Admissions: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Adult College Entrance Applications and Admissions: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three core types of materials: registration forms, care bonus point materials, and admission rosters. The registration form is filled out by the candidate, with fields including name, ID number, application level, subject category, mailing address, and signature confirmation date; the care bonus point materials are issued by the candidate or the relevant department, with fields including bonus item, certificate number, issuance date, handler's signature, and receipt; the admission roster is compiled by the admissions institution, with fields including candidate number, admitted major, admission date, and responsible person's signature. The three types of materials are updated in batches along with registration, review, and admission batches. For the same record, the name, quantity, and date in the registration form and the bonus point materials often fail to match due to manual transcription or unsynchronized versions, and missing signatures or receipts also occur from time to time. When the materials enter the form input node, each assumes the role of field collection, providing original record support for subsequent exception tracing.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusions are completed by subsequent nodes or manually. After the node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration form | Check against the care bonus point materials whether the name, quantity, and date are consistent, and whether the signature and receipt are complete | Compare field names item by item, check the required markers in the node configuration, and after submission reference the `formInputResult` fields for a trial run |
| Care bonus point materials | Check against the admission roster whether the bonus item, certificate number, and issuance date correspond, and whether the handler's signature is missing | Check the material fields and required settings one by one, and reference `formInputResult` in subsequent nodes to obtain the corresponding field values |
| Admission roster | Check against the registration form whether the candidate number, admitted major, and admission date match, and whether the responsible person's signature is in place | Check the field names and required markers, and after submission check whether the field values passed by `formInput` can be obtained by subsequent nodes |
| Form input node | The fields correspond one-to-one with the material fields to be collected, and key material fields have been marked as required | Check the field names and required settings one by one in the node configuration, and use `userSelect` to verify the passing of selection-type field values |

## Three common errors

- Symptom: the name or date of the same candidate does not match between the registration form and the bonus point materials. Cause: manual transcription or unsynchronized versions, and the original records were not updated with the batch.
- Symptom: the admission roster lacks the responsible person's signature or the bonus point materials lack a receipt. Cause: the review step did not check the signature column item by item, and omissions occurred during material circulation.
- Symptom: after submission, subsequent nodes cannot obtain the field values, or submission is possible even when required items are empty. Cause: field names are not aligned or required markers are not set, and the conversation stays in the interaction state.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values obtained by subsequent nodes, confirm that the field values passed by `formInput` are consistent with the filled-in content, and that the `userSelect` selection values can be referenced.

Business test: create an exception record, see whether the source material can be traced, and confirm that the fields, dates, and signatures of the registration form, bonus point materials, and admission roster can be traced back.

- Check the field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the registration form, bonus point materials, and admission roster.
- After submission, reference the `formInputResult` fields for a trial run, check whether subsequent nodes can obtain the corresponding field values, and record the number of references and the `quoteMaxToken` budget.
