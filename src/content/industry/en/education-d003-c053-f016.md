---
title: Forms and User Interaction for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c053-f016
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Forms | Intake
meta_description: Admissions Health Exams: review forms for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

In the intake stage, college admissions physical examination organization faces three core types of materials: the physical examination form, the re-examination application, and the restricted-major notification. The physical examination form is filled in by the candidate or the physical examination institution, and contains fields such as past medical history, color vision, visual acuity, hearing, and heart, lung, liver, and spleen; the date and the signature of the chief examining physician are key anchors, and it is updated centrally with the admissions batch. The re-examination application is submitted by the candidate, and contains the original physical examination conclusion, the items applied for re-examination, the application date, and the candidate's signature, and its rhythm rolls with the re-examination window. The restricted-major notification is issued by admissions or the physical examination organization, and contains the name of the restricted major, the basis clause, the notification date, and the receipt signature, and its version is synchronized with the annual admissions policy. When the three types of materials enter the Q&A intake and missing-item follow-up process, the physical examination form is the master record, the re-examination application is a derived record, and the restricted-major notification is a constraint record; field names, quantities, and dates need to be aligned across materials, and missing items are identified during intake and followed up to be completed, then transferred to the handler.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and completed question items" are then completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Category check dimensions: whether fields such as past medical history, color vision, visual acuity, hearing, and heart, lung, liver, and spleen are complete, and whether the physical examination date and the signature of the chief examining physician are in place | In the node configuration, check the field names and required markers one by one; after submission, reference the field in a subsequent node and run a trial |
| Re-examination application | Category check dimensions: whether the original physical examination conclusion, the items applied for re-examination, the application date, and the candidate's signature are consistent with the corresponding records in the physical examination form | In the node configuration, check the field names and required markers one by one; after submission, reference the field in a subsequent node and run a trial |
| Restricted-major notification | Category check dimensions: whether the name of the restricted major, the basis clause, the notification date, and the receipt signature correspond to the conclusion of the physical examination form | In the node configuration, check the field names and required markers one by one; after submission, reference the field in a subsequent node and run a trial |
| `formInputResult` and `selectResult` | Check: after submission, subsequent nodes can obtain the corresponding field values, and required items cannot be submitted when empty | Reference the field in a subsequent node and run a trial, and check whether the dialogue stops in the interaction state |

## Three common errors

- Phenomenon: the same candidate's name or the number of physical examination items does not match between the physical examination form and the re-examination application. Cause: the two materials are entered separately, without cross-material field comparison and receipt verification.
- Phenomenon: the basis clause of the restricted-major notification is inconsistent with the conclusion date of the physical examination form. Cause: versions are not synchronized, and the old notification was not replaced after the annual update of the admissions policy.
- Phenomenon: the re-examination application lacks the candidate's signature or the restricted-major notification lacks the receipt. Cause: required markers do not cover the signature and receipt fields, and submission is not blocked.

## How to verify the setup

Acceptance of this function: fill it in once and submit, check the field values obtained by subsequent nodes, and confirm that `formInputResult` and `selectResult` are passed correctly.

Business test: submit a question missing key information and see whether it first follows up and then answers.

- In the node configuration, check the field names and required markers one by one to ensure that key material fields are marked as required.
- Reference the field in a subsequent node and run a trial, and check field passing and dialogue state after submission.
