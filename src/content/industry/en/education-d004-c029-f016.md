---
title: Forms and User Interaction for Vocational College Curriculum Planning: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c029-f016
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Forms | Handover
meta_description: Vocational Curricula: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational College Curriculum Planning: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers three types of materials involved in the development of talent cultivation programs in vocational colleges: talent cultivation programs, course standards, and job competency analysis tables. Talent cultivation programs come from academic affairs offices and professional teaching and research offices, and are updated by academic year or professional adjustment cycle; their fields include program name, cultivation objectives, course modules, credit hours and credits, and signature and date. Course standards come from course leaders and industry enterprises, and are revised according to the pace of course reform; their fields include course name, objectives, content, assessment method, version number, and signature and date. Job competency analysis tables come from professional construction committees and enterprise research, and are updated according to job changes; their fields include job name, competency items, supporting courses, and research date. When these three types of materials enter the form input node, each serves as an independent entry object, and the submitter enters them item by item according to the template; after submission, the field values are passed to subsequent nodes for use in material drafting and handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values entered by the user (passed to subsequent nodes after submission). The "issuable material drafts and handover records" are completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Program name, cultivation objectives, course modules, credit hours and credits, and signature and date are complete, and are consistent with the course standards and job competency analysis table | Check the field names one by one in the node configuration, check the required markers, reference the field after submission and run a trial |
| Course standard | Course name, objectives, content, assessment method, version number, and signature and date are complete, and correspond to the course modules of the talent cultivation program | Check the field names one by one in the node configuration, check the required markers, reference the field after submission and run a trial |
| Job competency analysis table | Job name, competency items, supporting courses, research date, and signature and receipt are complete, and are consistent with the supporting relationships of the course standards | Check the field names one by one in the node configuration, check the required markers, reference the field after submission and run a trial |
| formInputResult and selectResult | Field values can be passed to subsequent nodes, and the selection items correspond one-to-one with the material fields | Reference the field in subsequent nodes and run a trial, and check the field passing after submission |

## Three common errors

- Symptom: The same program name is written differently in the talent cultivation program and the course standard. Cause: The two are filled in separately, and the field names and value ranges are not aligned, so subsequent nodes receive inconsistent values after submission.
- Symptom: The course credit hours do not match between the two materials. Cause: The versions are not synchronized; the old course standard was not updated along with the revision of the talent cultivation program, and the field values are still old data.
- Symptom: The job competency analysis table lacks a signature or receipt. Cause: The required markers do not cover the signature and receipt fields, so submission is not blocked, and the handover record is incomplete.

## How to verify the setup

This feature's acceptance: fill it out once and submit, check the field values received by subsequent nodes, and check whether the field passing of `formInputResult` and `selectResult` is correct.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the field in subsequent nodes and run a trial to confirm that the field values can be retrieved after submission and correspond one-to-one with the material fields.
