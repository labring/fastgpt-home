---
title: Forms and User Interaction for Grade Entry and Credit Recognition: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c020-f016
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Forms | Handover
meta_description: Grades and Credits: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Grade Entry and Credit Recognition: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on the grade entry and credit recognition category, with materials drawn from three types: transcripts, deferred examination applications, and make-up examination arrangements. A transcript carries the course name, credits, grade, instructor signature, and date; a deferred examination application carries the deferred course, reason, approval signature, and application date; a make-up examination arrangement carries the make-up course, time, location, invigilator signature, and version number. The update rhythm follows the semester: the entry stage produces transcripts, the deferred examination stage produces applications, and the make-up examination stage produces arrangements. When the materials enter the form input node, their respective roles are: the transcript provides the basis for credit recognition, the deferred examination application provides proof of deferred examination eligibility, and the make-up examination arrangement provides the make-up examination execution record. Field characteristics center on course name, credit count, date, signature, and version number; the same record must remain consistent across the three types of materials, otherwise the handover record cannot be closed.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The material drafts and handover records that can be issued are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credits, grade, instructor signature, and date are complete, and consistent with the same record in the deferred examination application and make-up examination arrangement | Check the field names one by one in the node configuration, and after a trial run check the field values referenced by subsequent nodes |
| Deferred examination application | Deferred course, reason, approval signature, and application date are complete, and the version number is in sync with the transcript and make-up examination arrangement | Check the required settings one by one, and after a trial run check the field values obtained by subsequent nodes |
| Make-up examination arrangement | Make-up course, time, location, invigilator signature, and version number are complete, and the date matches the transcript and deferred examination application | Reference this field in a subsequent node and run a trial, and check the results passed by `formInputResult` and `selectResult` |
| Handover record | The responsible person is clear, the version and date are consistent, the receipt has been signed, and missing items are blocked by the required marker | Draft one according to the template and complete one handover, and check whether missing items are blocked |

## Three common errors

- Symptom: the name and credit count of the same course do not match between the transcript and the make-up examination arrangement. Cause: the two materials were drafted separately and the fields were not checked against the same record.
- Symptom: the version of the deferred examination application was not synced, and the transcript still references the old version number. Cause: after the version was updated, the field values were not resubmitted in the form input node.
- Symptom: the handover record is missing a signature or receipt, yet subsequent nodes can still obtain the field values. Cause: key material fields were not marked as required, and the receipt was not checked after submission.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values obtained by subsequent nodes, and confirm that `formInputResult` and `selectResult` are passed through correctly.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration, and ensure that key material fields are marked as required.
- Reference this field in a subsequent node and run a trial, and check that the field values can be obtained after submission and that the conversation does not get stuck in the interaction state.
