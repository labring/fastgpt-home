---
title: Forms and User Interaction for Teacher Qualification Exams and Certification: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c056-f016
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Forms | Access
meta_description: Teacher Qualifications: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Teacher Qualification Exams and Certification: Manage Authorized Access and External Services

## What this category's data looks like

Teacher qualification exams and certification involve three types of materials: written and interview registration forms, Putonghua certificates, and medical examination forms. The written and interview registration forms come from the exam registration system and are updated with each exam session; their fields include name, ID number, subjects registered, exam district, date, and signature. Putonghua certificates are issued by testing institutions and are valid long-term, but the certificate number and grade need to be verified. Medical examination forms are issued by designated hospitals; their validity is tied to the medical examination conclusion, and they include name, date, physician signature, and hospital receipt. When these three types of materials enter the form input node, each serves as a source of fields for identity verification and qualification judgment: the registration form provides registration information, the Putonghua certificate provides proof of language ability, and the medical examination form provides the health conclusion. The form only collects the entered values; it does not recognize the content of the materials or judge whether the materials are authentic.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values entered by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Fields match the exam session, and the date and signature are complete | Verify that the registration form field names correspond one-to-one with the form fields, and check the required markers and signature receipt |
| Putonghua certificate | Certificate number, grade, and issue date can be verified | Set the certificate number and grade fields in the form fields, and reference them by subsequent nodes after submission |
| Medical examination form | Medical examination conclusion, date, and physician signature are complete | Verify that the medical examination form fields correspond to the form fields, and check whether the date and signature are missing |
| Form input node | After required items are submitted, the field values can be retrieved by subsequent nodes | Configure the `formInputResult` fields and test-run with `userSelect`, then verify the values retrieved by subsequent nodes |

## Three common errors

- Symptom: the name or date for the same record does not match between the registration form and the medical examination form. Cause: the two materials are entered separately, without field-level comparison and version synchronization.
- Symptom: the Putonghua certificate number differs in quantity or grade between the two materials. Cause: the certificate version was not synchronized, and the old version information was not updated with the new certificate.
- Symptom: the medical examination form lacks a physician signature or hospital receipt, but it still proceeds to subsequent nodes after submission. Cause: the required markers do not cover the signature and receipt fields.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, verify the field values retrieved by subsequent nodes, and confirm that the `formInput` output is consistent with the `userSelect` selection result.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Check the form field names one by one against the material fields for one-to-one correspondence, and check whether the required markers cover the key material fields.
- Reference the submitted fields in subsequent nodes and test-run to confirm that the field values can be passed and that the conversation does not get stuck in the interaction state.
