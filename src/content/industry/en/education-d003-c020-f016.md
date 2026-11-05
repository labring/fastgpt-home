---
title: Forms and User Interaction for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c020-f016
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Forms | Intake
meta_description: Grades and Credits: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Grade Entry and Credit Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the grade entry and credit recognition scenario, with materials sourced from academic affairs system exports and departmental submissions. Transcripts are entered by the course instructor or academic affairs staff, with fields including course name, credits, grade, assessment method, entry date, and signature; deferred examination applications are submitted by students, with fields including course name, reason for deferral, application date, and approval signature; make-up examination arrangements are published by the course-offering unit, with fields including course name, make-up examination time, location, and receipt. The update cadence is centralized entry at the end of the semester, centralized recognition at the beginning of the semester, and sporadic daily supplementary entry. When the three types of materials enter Q&A intake, their roles differ: the transcript is the basis for recognition, the deferred examination application is the credential for status change, and the make-up examination arrangement is the reference for subsequent processing. Field characteristics fall into four categories: name, quantity, date, and signature. It is common for the same record to fail to match across two materials, for versions to be out of sync, or for signatures and receipts to be missing, requiring follow-up questions about missing items before transfer to the handling staff.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). "Intake records and follow-up questions for completion" are handled by subsequent nodes or manually. The form does not automatically recognize material content, nor does it judge the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, grade, entry date, and signature are complete, and whether they match the same-named course in the deferred examination application and make-up examination arrangement | Check field names one by one in the node configuration, confirm that the transcript fields correspond one-to-one with the material fields to be collected, and use `formInput` to reference the fields in a trial run |
| Deferred examination application | Whether the deferred course name, application date, and approval signature are complete, and whether they are consistent with the course name, quantity, and date in the transcript | Check the required settings one by one, confirm that the key material fields are marked as required, and use `userSelect` to select the deferred course and submit |
| Make-up examination arrangement | Whether the make-up course name, make-up examination time, location, and receipt are complete, and whether they match the course name and date in the transcript and deferred examination application | Reference this field in a subsequent node and run a trial, confirming that the subsequent node can retrieve the corresponding field value after submission |
| Intake records and follow-up questions for completion | Whether missing items are identified and followed up on, and whether answers are based on materials | Ask a question missing key information, see whether it follows up first before answering, then transfer to the handling staff |

## Three common errors

- Symptom: The name, quantity, and date of the same course fail to match between the transcript and the deferred examination application, and after follow-up the answer is still based on a single material. Cause: The form only collects field values and does not automatically compare material content; missing-item identification depends on subsequent nodes or manual work.
- Symptom: The make-up examination arrangement version is out of sync, the old version's time and the new version's receipt coexist, and the intake record references the old version. Cause: Materials have different update cadences, the version is not marked after form submission, and subsequent nodes retrieve old field values.
- Symptom: The transcript is missing a signature or the deferred examination application is missing a receipt, yet it is still treated as complete material and transferred to the handling staff. Cause: The required markers do not cover the signature and receipt fields, and subsequent nodes cannot retrieve the corresponding field values after submission.

## How to verify the setup

Feature acceptance: Fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with what was filled in, and confirm that `formInputResult` and `selectResult` are available in both the node configuration and subsequent references.

Business test: Ask a question missing key information, see whether it follows up first before answering; confirm that missing items are identified and followed up on, that answers are based on materials, and then transfer to the handling staff.

- Check field names one by one in the node configuration, confirming that the form fields correspond one-to-one with the material fields to be collected for the transcript, deferred examination application, and make-up examination arrangement.
- Check the required settings one by one, confirming that the key material fields are marked as required; reference this field in a subsequent node and run a trial, confirming that the corresponding field value can be retrieved after submission.
