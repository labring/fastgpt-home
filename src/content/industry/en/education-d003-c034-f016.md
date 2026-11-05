---
title: Forms and User Interaction for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c034-f016
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Forms | Intake
meta_description: Skills Certification: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

Common materials in the intake stage of social assessment of vocational skill level certification include three types: the assessment implementation plan, the candidate registration form, and the assessor dispatch form. The assessment implementation plan states the occupational direction, level, assessment method, and time and location; the candidate registration form records the candidate's basic information, declared occupation and level, years of work experience, and references; the assessor dispatch form records the assessor's name, qualification certificate number, dispatch date, and signature. The material sources are submission by the declaring institution, internal review circulation, and historical archiving, and the update cadence rolls forward with batch declarations and review milestones. When the three types of materials enter the form input node, each plays a different role: the implementation plan provides the assessment framework fields, the registration form provides the candidate identity and qualification fields, and the dispatch form provides the assessor and signature fields. The field characteristics are three types: text, date, and signature. For the same record, the name, quantity, and date in the plan and the registration form must be aligned item by item, and the version and receipt must be checked in sync.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then handled by subsequent nodes or manually. After this node is triggered, the conversation enters an interactive state and records the workflow state; only after the user fills in the required items and submits are the form information passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Assessment implementation plan | Whether the occupational direction, level, assessment method, time and location, version number, and signature receipt are consistent with the candidate registration form | Check the field names and required markers one by one in the node configuration; after submission, check whether subsequent nodes referencing `formInputResult` can retrieve the plan field values |
| Candidate registration form | Whether the candidate name, declared occupation and level, years of work experience, references, and date match the assessment implementation plan and the assessor dispatch form | Check the registration form fields and required settings; after a trial run, confirm that subsequent nodes retrieve the registration form field values, and missing items are followed up by subsequent nodes |
| Assessor dispatch form | Whether the assessor name, qualification certificate number, dispatch date, and signature or receipt are complete and in sync with the assessment implementation plan version | Check the dispatch form field names and required items; after submission, check whether subsequent nodes can retrieve the dispatch form field values, and trigger a follow-up when the signature is missing |
| Form input node | After being triggered, the conversation enters an interactive state and records the workflow state; required items should not be submitted when empty, and after submission the field values should be passed to subsequent nodes | Check the required settings one by one, reference `formInputResult` and `selectResult` in subsequent nodes and run a trial, and confirm that the corresponding field values are retrieved |

## Three common errors

- Symptom: the same candidate name is written differently in the registration form and the assessment implementation plan, and the date or number of people does not match. Cause: the two materials are filled in at different stages, and no field-level alignment check was performed.
- Symptom: the assessor dispatch form version is not synced, and intake still proceeds even though the signature or receipt is missing. Cause: the material update cadence is out of step with the review milestones, and missing items are not identified.
- Symptom: after submission, subsequent nodes cannot retrieve the field values, or submission is possible even when required items are empty. Cause: field names and required markers were not checked one by one, and field passing was not verified with a trial run.

## How to verify the setup

Acceptance of this feature: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with the filled-in content, and check whether the `formInputResult` and `selectResult` references take effect.

Business test: submit a question missing key information and see whether it first follows up before answering; missing items are identified and followed up, the answer has a material basis, and it is then forwarded to the handler.

- Check the form field names and required markers one by one in the node configuration, ensuring they correspond one-to-one with the fields of the assessment implementation plan, candidate registration form, and assessor dispatch form.
- Reference `formInputResult` and `selectResult` in subsequent nodes and run a trial, confirming that the corresponding field values can be retrieved after submission, and missing items are followed up by subsequent nodes or manually.
