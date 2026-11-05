---
title: Forms and User Interaction for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c056-f016
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Forms | Intake
meta_description: Teacher Qualifications: review forms for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for teacher qualification exams and certification mainly consist of written and interview registration forms, Putonghua certificates, and medical examination forms. Sources are candidate submissions, test institution issuances, and medical examination receipts from designated hospitals. The update cadence advances in batches according to registration batches, test sessions, and medical examination validity periods. When entering Q&A intake and missing-item follow-up, the registration form carries identity and subject information, the Putonghua certificate carries grade and number, and the medical examination form carries conclusion and signature. Together, the three support the intake record and the items to be completed. Field characteristics center on name, ID number, subject name, grade, date, and signature. If the name, quantity, or date of the same record does not match across two materials, or if versions are not synchronized, or a signature or receipt is missing, missing-item identification loses its basis.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The intake record and the items to be completed are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether name, ID number, subject name, and date correspond item by item with the Putonghua certificate and medical examination form | Check field names one by one in the node configuration, and check the required markers; after submission, have subsequent nodes reference the field and run a trial |
| Putonghua certificate | Whether grade, number, and issuance date are consistent with the records in the registration form and medical examination form, and whether versions are not synchronized | Check the required settings one by one, and confirm that the certificate number and date fields are marked as required; after submission, check the field values obtained by subsequent nodes |
| Medical examination form | Whether the medical examination conclusion, date, and signature are complete, and whether the signature or receipt is missing | Check field names and required markers one by one in the node configuration; after submission, check whether subsequent nodes can obtain the corresponding field values |
| formInput | Whether the field values filled in by the user are passed to subsequent nodes upon submission, and whether the interaction state ends normally | Reference the field in subsequent nodes and run a trial to confirm the field value can be read; if necessary, check the value of `userSelect` |

## Three common errors

- Symptom: the date of the same record does not match between the registration form and the medical examination form. Cause: the two materials are submitted in batches, versions are not synchronized, and field names are not checked item by item.
- Symptom: the Putonghua certificate number differs in quantity or name across the two materials. Cause: required markers were not used for validation at submission, and the field values obtained by subsequent nodes are missing items.
- Symptom: the medical examination form still enters intake when the signature or receipt is missing. Cause: key material fields were not marked as required, and missing-item follow-up was not triggered after submission.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values obtained by subsequent nodes, confirm that the `formInput` output is consistent with the `userSelect` value, and that the interaction state ends normally.

Business test: submit a question missing key information, see whether it first follows up before answering, then check whether the intake record and the items to be completed have a material basis.

- Check field names and required markers one by one in the node configuration to ensure key material fields are marked as required.
- Reference the field in subsequent nodes and run a trial to confirm that the field value can be read after submission and that missing items can be followed up.
