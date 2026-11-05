---
title: Forms and User Interaction for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c034-f016
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Forms | Handover
meta_description: Skills Certification: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the social evaluation scenario of vocational skill level certification, materials are divided by stage into three categories: the evaluation implementation plan, the candidate registration form, and the assessor dispatch form. The evaluation implementation plan is drafted by the evaluation agency based on the certification plan, and includes the certification occupation, level, time, location, assessment method, and responsible person; the candidate registration form is filled in by the candidate or the registration point, and includes identity information, declared occupation and level, years of work experience, and educational certificate; the assessor dispatch form is issued by the evaluation agency after consultation with the assessor's affiliated organization, and includes the assessor's name, certificate number, dispatch date, and signature field. The three types of materials have different update rhythms: the implementation plan adjusts with the certification batch, the registration form updates on a rolling basis as candidates are added or removed, and the dispatch form changes with assessor scheduling. When the materials enter the form input function, their respective roles are: the implementation plan provides batch and responsibility fields, the registration form provides candidate identity and declaration fields, and the dispatch form provides assessor and signature fields, together forming a signable material draft and handover record.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Fields are complete, responsible persons are clear, and version and date are consistent | Check whether the recognized occupation, level, time, location, assessment method, responsible person, version number, and issue date are filled in item by item, and whether the signature column is left blank |
| Candidate registration form | The name, quantity, and date of the same record do not match in the two materials | Check the candidate's name, declared occupation and level, years of work experience, and education certificate number, and compare them item by item with the batch name and date in the implementation plan |
| Assessor dispatch form | Missing signature or receipt | Check the assessor's name, certificate number, dispatch date, signature column, and receipt column, and confirm consistency with the assessment method and number of people in the implementation plan |
| Form fields and required markers | Key material fields are marked as required | Check the field names and required settings one by one in the node configuration, reference the `formInputResult` and `selectResult` fields, and run a trial |

## Three common errors

- Symptom: The same candidate's name is written differently in the registration form and the implementation plan, and the quantity and date do not match. Cause: The two places were entered separately without field mapping verification, and the versions were not synchronized.
- Symptom: The assessor dispatch form lacks a signature or receipt, and the material cannot enter the next stage for acceptance. Cause: The signature field was not set as required, and empty values were not blocked on submission.
- Symptom: After submission, subsequent nodes cannot retrieve the field values, and the conversation remains stuck in the interaction state. Cause: The field names are inconsistent with subsequent references, or required items are still submitted when empty.

## How to verify the setup

This function's acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` field values are passed correctly, that empty required items are blocked, and that the conversation does not get stuck in the interaction state.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked and whether the receipt and signature are complete.

- In the node configuration, check the field names and required settings one by one to ensure they correspond one-to-one with the material fields
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission
