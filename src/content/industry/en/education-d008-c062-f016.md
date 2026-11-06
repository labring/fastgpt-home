---
title: Forms and User Interaction for Research Ethics Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c062-f016
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Forms | Access
meta_description: Research Ethics: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Ethics Review: Manage Authorized Access and External Services

## What this category's data looks like

The external services for research ethics review involve three core types of materials: ethics review applications, informed consent form templates, and risk assessment forms. The ethics review application includes the project name, responsible person, review category, submission date, and signature field; the informed consent form template includes the study name, participant information, signing date, and receipt; the risk assessment form includes the risk level, prevention and control measures, assessment date, and review signature. The materials are submitted by researchers, consolidated by the ethics secretary, and reviewed by committee members, updated in batches, with versions synchronized as modifications are made. When entering the form input node, the three types of materials are each collected as independent field groups; the application determines the review entry point, the consent form template corresponds to participant authorization, and the risk form corresponds to safety assessment. After submission, the field values are passed to subsequent nodes for manual comparison and authorization determination.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures are complete, and the study name matches that in the consent form template | Check the project name, submission date, and signature field in the application; verify field names and required markers one by one in `formInput` |
| Informed consent form template | Participant information, signing date, and receipt match the application record | Compare whether the study name, quantity, and date in the template are consistent with the application; use `userSelect` to select the version before submitting |
| Risk assessment form | Risk level, prevention and control measures, assessment date, and review signature are complete | Check whether the risk form fields are consistent with the names and dates in the application and consent form; check for missing signatures or receipts |
| Field transfer after submission | Subsequent nodes can retrieve the corresponding field values | Reference the field in subsequent nodes and run a test to confirm that both `formInputResult` and `selectResult` values can be retrieved |

## Three common errors

- Symptom: The study name, quantity, and date for the same record do not match between the application and the consent form template. Cause: The two materials were filled in separately without cross-checking.
- Symptom: The consent form template version was not synchronized, and the old version was still submitted. Cause: After the version update, it was not synchronously replaced in the form fields.
- Symptom: Applications or risk forms with missing signatures or missing receipts still enter the subsequent process. Cause: Required markers do not cover the signature and receipt fields.

## How to verify the setup

Acceptance of this feature: Fill out and submit once, check the field values retrieved by subsequent nodes, and confirm that the outputs of `formInputResult` and `selectResult` are consistent with what was filled in.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- Check field names and required settings one by one in the node configuration to ensure that signature, date, and receipt fields are marked as required.
- Reference the field in subsequent nodes and run a test to confirm that the field values are correctly transferred after submission.
