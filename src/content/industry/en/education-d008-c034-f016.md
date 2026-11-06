---
title: Forms and User Interaction for Public Vocational Skills Level Assessment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c034-f016
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Forms | Access
meta_description: Skills Certification: review forms for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Public Vocational Skills Level Assessment: Manage Authorized Access and External Services

## What this category's data looks like

For external services of social evaluation of vocational skill level certification, the materials mainly consist of evaluation implementation plans, candidate registration forms, and assessor dispatch forms. The sources are evaluation agencies and employing units, and the update cadence is adjusted by batch or annually. The evaluation implementation plan defines the occupation, level, assessment method, and authorization scope; the candidate registration form carries identity, education, years of work experience, and application conditions; the assessor dispatch form records assessor qualifications, dispatch dates, and recusal information. When these three types of materials enter the form input function, each plays a different role: the implementation plan provides the authorization boundary and fields that can be opened, the registration form provides candidate-side fields and required items, and the dispatch form provides assessor-side fields and signature receipts. Field characteristics include name, ID number, occupation, level, date, signature, and receipt status. The same record must keep names, quantities, and dates consistent across the three materials, and version synchronization and signature completeness are common verification points.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry point and authorization scope are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Whether the authorization scope and fields that can be opened match the visitor's identity, and whether the occupation, level, and date in the plan are consistent with the registration form and dispatch form | Check the field names one by one in the node configuration, and compare the names, quantities, and dates in the plan against the registration form and dispatch form; reference fields with `formInputResult` and run a trial |
| Candidate registration form | Whether the candidate-side fields correspond to the application conditions in the implementation plan, and whether the required markers cover the key material fields | Check the required settings one by one, and inspect name, ID number, occupation, level, date, and signature receipt; use `userSelect` to select an identity and run a trial |
| Assessor dispatch form | Whether the assessor qualifications, dispatch dates, and recusal information match the implementation plan and registration form, and whether signatures or receipts are missing | Reference the dispatch form fields in subsequent nodes and run a trial, and check the names, quantities, and dates of the same record across the three materials; use `formInput` to retrieve field values |
| Field transfer after submission | Whether subsequent nodes can retrieve the corresponding field values, whether submission is possible when required items are empty, and whether the conversation stays in the interactive state | Reference the field in subsequent nodes and run a trial, access once with a restricted identity, and see whether the visible scope matches the settings |

## Three common errors

- Phenomenon: The same candidate's name is written differently in the registration form and dispatch form, and the quantities and dates do not match. Cause: The two materials are entered separately, without cross-form comparison and unification.
- Phenomenon: After the evaluation implementation plan is updated, the registration form and dispatch form still use the old fields. Cause: The version was not synchronized, and the node configuration was not adjusted with the plan.
- Phenomenon: The assessor dispatch form lacks a signature or receipt, but it still proceeds to subsequent nodes after submission. Cause: The required markers do not cover the signature field, and manual review is absent.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` can retrieve the corresponding values.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and ensure unauthorized content is not visible.

- Check the field names and required markers one by one in the node configuration, and compare the names, quantities, dates, and signature receipts in the evaluation implementation plan, candidate registration form, and assessor dispatch form.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, access once with a restricted identity, and confirm that the visible scope is consistent with the authorization scope.
