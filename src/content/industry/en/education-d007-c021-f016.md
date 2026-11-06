---
title: Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c021-f016
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Forms | Review
meta_description: Graduation Eligibility: review forms for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Enrollment Changes and Graduation Eligibility: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on materials in the scenarios of student status changes and graduation qualification audits, covering three core types of materials: leave-of-absence and return-to-school applications, major transfer applications, and graduation audit checklists. Leave-of-absence and return-to-school applications usually come from student submissions or exports from the academic affairs system, with fields including student ID, name, change type, effective date, department opinion, and signature field; major transfer applications are filled out by students and reviewed by both the transferring-out and transferring-in departments, with fields including original major, target major, application reason, signatures of both parties, and date; graduation audit checklists are compiled by academic affairs, with fields including course name, credits, grade, audit conclusion, and signature of the person in charge. The three types of materials update at different rhythms: application-type materials update as process nodes advance, while audit checklists are generated in centralized batches by semester. When materials enter the form input node, each plays a different role: application-type materials serve as the source basis for exception tracing, and audit checklists serve as the comparison benchmark, jointly supporting the generation of the exception list and review conclusions. In terms of field characteristics, names, quantities, dates, signatures, and receipts are high-frequency verification points, and version synchronization and signature completeness directly affect subsequent handling.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusions" are completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-school application | Fields and dates must be consistent with the same record's name, quantity, and date in the major transfer application and graduation audit checklist, and signatures and receipts must be complete | Check field names one by one in the node configuration, confirm they correspond one-to-one with the material fields, and check whether the required markers cover the key fields |
| Major transfer application | The original major and target major names and application date must match those in the leave-of-absence and return-to-school application and the audit checklist, and signatures of both parties and receipts must not be missing | Check the required settings, and after a trial run confirm that subsequent nodes can obtain the corresponding field values, using `formInput` to reference fields and verify transmission |
| Graduation audit checklist | Course name, credits, grade, and audit conclusion must be version-synchronized with the application-type materials, and the signature of the person in charge must be complete | Reference this field in a subsequent node and run a trial, using `userSelect` to check whether the selection items match the material fields |
| Exception list and review conclusions | Each exception must be supported by an original record, and only after the reviewer signs can it be handed to the person in charge for handling | Create an exception record, trace it back to the source material, check the name, quantity, date, and signature, and confirm that the field values can be traced back |

## Three common errors

- Symptom: The name and date of the same record do not match between the leave-of-absence and return-to-school application and the graduation audit checklist. Cause: The two materials are entered separately by different steps, no field-level comparison is performed, and versions are not synchronized.
- Symptom: The major transfer application lacks a signature or receipt but still enters the review process. Cause: The required markers do not cover the signature and receipt fields, and empty values are not intercepted on submission.
- Symptom: After submission, subsequent nodes cannot obtain the field values, and the conversation stays in the interactive state. Cause: The field names are inconsistent with the references in subsequent nodes, or required items can still be submitted when empty.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that the fields referenced by `formInputResult` and `selectResult` can be transmitted correctly.

Business test: create an exception record, see whether it can be traced to the source material, and check whether the name, quantity, date, and signature are consistent.

- Check field names one by one in the node configuration, confirm they correspond one-to-one with the fields of the leave-of-absence and return-to-school application, major transfer application, and graduation audit checklist, and check that the required markers cover the key fields.
- Reference this field in a subsequent node and run a trial, confirm that the field values can be obtained after submission, and that the exception record can be traced to the source material and the signature and receipt can be checked.
