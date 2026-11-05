---
title: Forms and User Interaction for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c026-f016
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Forms | Access
meta_description: Degree Certificates: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on three types of materials in the degree conferral and certificate information reporting scenario: the degree application form, the thesis review form, and the defense resolution. The degree application form is produced through student submission and departmental preliminary review, with fields including name, student ID, major, application date, and signature; the thesis review form is issued by review experts, with fields including review comments, review conclusion, review date, and signature; the defense resolution is formed by the defense committee, with fields including defense date, resolution conclusion, committee member signatures, and receipt. The sources of the materials are dispersed across departments, reviewers, and defense secretaries, and the update cadence advances batch by batch along with review, defense, and the degree committee. When the three types of materials enter the authorized access and external services function, the degree application form serves as the entry point for identity and application information, the thesis review form serves as the credential for the review conclusion, and the defense resolution serves as the credential for the final resolution, jointly determining the visible scope opened to parents or superiors.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | The field names, application date, and signature must be consistent with the same record in the thesis review form and defense resolution, and key fields are marked as required | Check the field names and required settings one by one in the node configuration, fill in and submit once using a restricted identity, and check the field values obtained by subsequent nodes |
| Thesis review form | The review conclusion, review date, and signature must match the same record in the defense resolution, and the version must be synchronized | Reference the `formInputResult` field in subsequent nodes and run a trial, and check whether the review conclusion and date are consistent with the defense resolution |
| Defense resolution | The defense date, resolution conclusion, committee member signatures, and receipt must be complete, and the names and quantities must be consistent with the degree application form and thesis review form | Check the signature and receipt fields in the node configuration, use `userSelect` to select a restricted identity and run a trial once, and see whether the visible scope matches the setting |
| Authorized access and external services | The visitor's identity matches the visible scope, unauthorized access is not visible, and the scope opened to parents or superiors must be consistent with the material conclusions | Access once using a restricted identity, check whether the visible scope matches the setting, and check the field values passed by `formInputResult` and `selectResult` |

## Three common errors

- Symptom: The name and date of the same record do not match between the degree application form and the defense resolution. Cause: The two materials are filled in separately, versions are not synchronized, and there is a lack of item-by-item verification of field names and dates.
- Symptom: The review conclusion and defense date are inconsistent between the thesis review form and the defense resolution. Cause: Review and defense advance in batches, materials are not aggregated by the same record, and versions are not synchronized.
- Symptom: The defense resolution lacks committee member signatures or receipt, and the degree application form lacks the application date. Cause: Required markings do not cover key fields, subsequent nodes cannot obtain values after submission, and manual supplementary signing was not done.

## How to verify the setup

This function's acceptance: fill in once and submit, check the field values obtained by subsequent nodes, and confirm that the field values passed by `formInput` are consistent with what was filled in.

Business test: access once using a restricted identity, see whether the visible scope matches the setting, and unauthorized access is not visible.

- Check the field names and required settings one by one in the node configuration, and confirm that they correspond one-to-one with the fields of the degree application form, thesis review form, and defense resolution.
- Reference `formInputResult` in subsequent nodes and run a trial, check that the field values can be obtained after submission, and that the visible scope of the restricted identity selected by `userSelect` matches the setting.
