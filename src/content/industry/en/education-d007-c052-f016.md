---
title: Forms and User Interaction for College Admissions and Application Placement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c052-f016
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Forms | Review
meta_description: College Admissions: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for College Admissions and Application Placement: Trace Exceptions and Review Results

## What this category's data looks like

General higher education institution admissions enrollment and filing involves three core types of materials: enrollment plans, filing rules, and admission rosters. Enrollment plans are published by provincial admissions and examination institutions before filing, and include institution professional groups, planned numbers, and subject selection requirements; filing rules are updated with batches and provinces, and include filing ratios, tie-breaking sorting, and withdrawal conditions; admission rosters are returned by higher education institutions after each batch's admission is completed, and include candidate number, name, score, major, signature, and receipt. When the three types of materials enter the exception tracing and manual review function, their roles differ: enrollment plans and filing rules serve as comparison baselines, while admission rosters serve as the object being verified. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. It is common for the same record to fail to match across two materials, or for versions to be out of sync, or for signatures and receipts to be missing. The form input node is only responsible for collecting the field values filled in by the reviewer; it does not automatically recognize material content, nor does it determine whether materials are authentic.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Check item by item against filing rules and admission roster for institution professional group names, planned numbers, subject selection requirements, publication date, and signature | Check the field names one by one in the node configuration, confirm that plan fields correspond one-to-one with roster fields, and check the values retrieved by subsequent nodes after a trial run |
| Filing rules | Check against enrollment plan and admission roster for filing ratio, tie-breaking sorting, withdrawal conditions, effective date, and version number | Check the field names one by one in the node configuration, confirm that rule fields correspond one-to-one with roster fields, and check the values retrieved by subsequent nodes after a trial run |
| Admission roster | Check against enrollment plan and filing rules for candidate number, name, score, major, date, signature, and receipt | Check the field names one by one in the node configuration, confirm that roster fields correspond one-to-one with plan and rule fields, and check the values retrieved by subsequent nodes after a trial run |
| Form fields | Correspond one-to-one with the material fields to be collected, and key material fields have been marked as required | Check the field names and required settings one by one in the node configuration, reference the field with `formInputResult`, and run a trial |

## Three common errors

- Symptom: the major name for the same candidate does not match between the admission roster and the enrollment plan. Cause: the two materials are filled in by different steps, names are not unified, and item-by-item comparison is lacking.
- Symptom: the filing rule version is not synchronized, and the roster is still generated according to the old ratio. Cause: after the rule was updated, the new version was not returned, and the form did not record the version number and effective date.
- Symptom: the admission roster lacks a signature or receipt, and the review conclusion cannot be archived. Cause: key material fields were not marked as required, and after submission subsequent nodes cannot retrieve the corresponding values.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with what was filled in, reference fields with `formInputResult` and run a trial, and use `userSelect` to check the passing of selected options.

Business test: create an exception record, see whether the source material can be traced, and check the names, quantities, dates, and signatures of the enrollment plan, filing rules, and admission roster.

- Check the field names one by one in the node configuration, confirm that they correspond one-to-one with the fields of the enrollment plan, filing rules, and admission roster, and mark key material fields as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirm that the corresponding field values can be retrieved after submission, and that the conversation does not remain in the interactive state.
