---
title: Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c031-f016
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Forms | Access
meta_description: Apprenticeships: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on three types of materials in modern apprenticeship and order class management: school-enterprise cooperation agreements, order class training plans, and master-apprentice mentoring records. School-enterprise cooperation agreements come from paper or electronic documents signed by schools and enterprises, and are updated by academic year or project cycle; order class training plans are revised on a rolling basis as majors are adjusted; master-apprentice mentoring records are filled in weekly or monthly by the mentoring master. When these three types of materials enter the authorized access and external services scenario, school-enterprise cooperation agreements play the role of the basis for external display and authorization scope, order class training plans play the role of explaining training content and progress, and master-apprentice mentoring records play the role of process traceability and external reporting materials. Field characteristics are concentrated in names, quantities, dates, and signatures, and the update rhythm and completeness of signature receipts directly affect the visibility scope of the external entrance.

## Configuration and implementation checks

This part is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entrance and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Fields and signatures are complete, and names, quantities, and dates are consistent across the three types of materials | Check field names one by one in the node configuration, use `formInput` to reference fields and run a trial, and confirm that subsequent nodes receive the corresponding field values |
| Order class training plan | The version has been synchronized, names and dates match the school-enterprise cooperation agreement, and key fields have been marked as required | Check the required settings one by one, use `userSelect` to select a restricted identity and submit, and check whether the visibility scope matches the settings |
| Master-apprentice mentoring record | Receipts and signatures are not missing, and quantities and dates match the training plan | Reference this field in subsequent nodes and run a trial to confirm that field transmission is normal after submission and that unauthorized identities cannot see it |
| External entrance and authorization scope | The visitor identity matches the visibility scope, and unauthorized access is not visible | Access once with a restricted identity and check whether the open objects and authorization scope are consistent with the settings |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the school-enterprise cooperation agreement and the master-apprentice mentoring record. Cause: The two materials are filled in separately, without field verification and unified naming.
- Symptom: The version of the order class training plan has not been synchronized, and the content still displayed externally is the old version. Cause: After revision, the material version referenced by the external entrance was not updated.
- Symptom: The master-apprentice mentoring record lacks signatures or receipts, making it impossible to prove process traceability during external reporting. Cause: In the submission step, key fields were not marked as required, and receipts were not checked.

## How to verify the setup

This feature acceptance: fill in once and submit, check the field values received by subsequent nodes, and confirm that the fields corresponding to `formInputResult` and `selectResult` can be transmitted normally.

Business test: access once with a restricted identity and see whether the visibility scope matches the settings.

- Check field names and required markers one by one in the node configuration, and confirm that they correspond one-to-one with the material fields to be collected.
- Reference this field in subsequent nodes and run a trial to confirm that field transmission is normal after submission and that unauthorized identities cannot see it.
