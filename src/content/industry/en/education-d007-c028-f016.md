---
title: Forms and User Interaction for Vocational College Program Registration: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c028-f016
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Forms | Review
meta_description: Vocational Programs: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational College Program Registration: Trace Exceptions and Review Results

## What this category's data looks like

Filing materials for vocational college program setup consist mainly of the program setup filing form, talent demand justification, and faculty and equipment list. Sources are the college's academic affairs office, secondary schools, and industry research, updated with application batches and correction notices. The three types of materials play different roles when entering the form input node: the filing form provides main record fields such as program name, code, and program length; the talent demand justification provides research date, number of positions, and signature; the faculty and equipment list provides number of teachers, number of equipment sets, and receipt. Field characteristics fall into four categories: name, quantity, date, and signature. It is common for the same record to have mismatched name, quantity, or date across two materials, unsynchronized versions, or missing signatures or receipts. Exception tracing requires tracing back from form field values to the original materials, and the review conclusion is confirmed by signature after manual comparison.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether the name, code, program length, and signature date are consistent with the talent demand justification | Compare the program name, code, and date of the two materials field by field; if a signature or receipt is missing, record an exception |
| Talent demand justification | Whether the research date, number of positions, and signature are synchronized with the filing form version | Check the justification date against the filing form application date; if the quantity does not match or the version is not synchronized, flag it |
| Faculty and equipment list | Whether the number of teachers, number of equipment sets, and receipt match the filing form fields | Check the list quantities against the values filled in the filing form; if a receipt or signature is missing, add it to the exception list |
| `formInputResult` field configuration | Field names correspond one-to-one with material fields, and required markers cover key material fields | In the node configuration, check field names and required settings one by one, and use `userSelect` to test-run value retrieval |

## Three common errors

- Symptom: The program name, quantity, or date of the same record does not match between the filing form and the talent demand justification. Cause: The two materials are filled in by different personnel, and no field-level comparison was performed.
- Symptom: The faculty and equipment list version is not synchronized, and old quantities remain in the form field values. Cause: The form was not resubmitted after the material was updated, so subsequent nodes retrieve old values.
- Symptom: The filing form lacks a signature or receipt, and the review conclusion cannot be finalized. Cause: Required items at submission did not cover the signature field, and the interaction state was skipped.

## How to verify the setup

Fill out the form once and submit it, check whether the field values retrieved by subsequent nodes match what was filled in, and check whether the `formInput` output and `userSelect` reference are readable.

Business test: create an exception record, see whether the source material can be traced, and compare the name, quantity, date, and signature of the filing form, talent demand justification, and faculty and equipment list.

- In the node configuration, check field names and required markers one by one to ensure key material fields are marked as required.
- Reference the `formInputResult` fields in subsequent nodes and test-run to confirm that the corresponding field values can be retrieved after submission.
