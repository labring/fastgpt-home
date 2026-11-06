---
title: Forms and User Interaction for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c015-f016
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Forms | Handover
meta_description: Student Mental Health: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on the scenario of mental health screening and referral in primary and secondary schools, and outlines the drafting and handover of three types of materials: psychological screening plans, interview records, and referral forms. Screening plans are updated by psychological teachers or homeroom teachers according to the rhythm of the beginning, middle, and end of the semester. Fields include screening target, tool name, implementation date, and responsible person's signature. Interview records are generated along with screening results. Fields include student name, interview time, interviewer, main manifestations, and preliminary judgment. Referral forms are initiated after the interview. Fields include referral target, reason for referral, receiving unit, referral date, signatures of both parties, and receipt. When these three types of materials enter the form input node, they respectively play the roles of source of plan fields, factual record of the interview, and handover evidence. After submission, the field values are passed to subsequent nodes for use in generating material drafts and handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). "Issuable material drafts and handover records" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The four items—screening target, tool name, implementation date, and responsible person's signature—are complete, and the date and version are consistent | Check the field names one by one in the node configuration, confirm that the required markers cover the key fields, and after submission check whether subsequent nodes can retrieve the plan field values |
| Interview record | Student name, interview time, interviewer, main manifestations, and preliminary judgment match the target and date in the screening plan | Check whether the name, quantity, and date in the same record are consistent between the plan and the interview record, and block submission when a signature or receipt is missing |
| Referral form | Referral target, reason for referral, receiving unit, referral date, signatures of both parties, and receipt are complete, and the version is synchronized with the screening plan | Check the required settings one by one, use `formInput` to reference the referral form fields in a trial run, and confirm that subsequent nodes can retrieve the corresponding field values |
| Form field passing | Subsequent nodes can retrieve the corresponding field values, submission is not allowed when required items are empty, and the conversation does not get stuck in the interaction state | Reference the field in a subsequent node and run a trial, and use `userSelect` to check whether selection-type fields are passed completely |

## Three common errors

- Symptom: The name and date of the same student do not match between the screening plan and the interview record. Cause: The two materials were drafted separately, the fields were not checked for consistency, and the versions were not synchronized.
- Symptom: A referral form is still issued when the signatures of both parties or the receipt is missing. Cause: The required markers did not cover the signature and receipt fields, and the submission step did not block it.
- Symptom: After submission, subsequent nodes cannot retrieve the field values, and the conversation stops in the interaction state. Cause: The form field names are inconsistent with the reference names in subsequent nodes, or submission is still possible when required items are empty.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` are passed completely.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration, and confirm that the key material fields have been marked as required.
- Reference the field in a subsequent node and run a trial, and check whether the field values can be retrieved after submission.
