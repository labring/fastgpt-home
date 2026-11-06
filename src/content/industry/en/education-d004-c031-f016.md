---
title: Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c031-f016
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Forms | Handover
meta_description: Apprenticeships: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Modern apprenticeship and order class management involves three types of materials: school-enterprise cooperation agreements, order class training plans, and master apprenticeship records. The school-enterprise cooperation agreement specifies the responsibilities of both parties, the number of trainees, and the term; the order class training plan sets out the courses, positions, and assessment methods; the master apprenticeship record registers the apprenticeship content, duration, and evaluation for each session. The material sources are the school's academic affairs office, the enterprise's human resources department, and the apprenticeship master, and the update rhythm changes with the semester, position rotation, and apprenticeship progress. The fields of the three types of materials overlap: student name, position name, apprenticeship date, signature, and receipt appear repeatedly in multiple materials. When the materials enter the form input node, each plays a different role: the cooperation agreement provides the number of trainees and term fields, the training plan provides the course and position fields, and the apprenticeship record provides the date and master signature fields, together forming the field sources for the issuable material draft and handover record.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The issuable material draft and handover record are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Fields are complete, the responsible person is clear, the version and date are consistent, and the number of trainees and term are consistent between the agreement and the training plan | Check the field names and required settings one by one in the node configuration, reference the fields with `formInputResult`, and run a trial |
| Order class training plan | The course, position, and assessment fields are complete, the date is synchronized with the agreement version, and the signature and receipt are not missing | Reference this field in a subsequent node and run a trial, and check whether the field value can be retrieved after submission |
| Master apprenticeship record | The apprenticeship date, master signature, and receipt are complete, and the name and quantity of the same record are consistent in the two materials | Check the required settings one by one, select the record with `userSelect`, and check the field transfer |
| Handover record | The responsible person is clear, the version and date are consistent, and missing items are blocked by the required marker | Fill it in once and submit, and check whether the field values retrieved by subsequent nodes are complete |

## Three common errors

- Symptom: The name, quantity, and date of the same apprenticeship record do not match between the agreement and the training plan. Cause: The two materials are drafted separately, lacking a unified field source and a checking step.
- Symptom: The training plan version is not synchronized, and the old course version coexists with the new agreement version. Cause: The version field is not updated with the material, and the version and date are not checked during handover.
- Symptom: The master apprenticeship record lacks a signature or receipt, and the material cannot be issued. Cause: Key fields are not marked as required, and subsequent nodes cannot retrieve the corresponding values after submission.

## How to verify the setup

Acceptance of this feature: fill it in once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields referenced by `formInputResult` and `selectResult` can retrieve values.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference this field in a subsequent node and run a trial, and confirm that the field transfer after submission is normal and the conversation does not get stuck in the interaction state.
