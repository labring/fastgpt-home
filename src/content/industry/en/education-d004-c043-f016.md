---
title: Forms and User Interaction for Training Provider Admissions and Inquiry Follow-Up: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c043-f016
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Forms | Handover
meta_description: Training Admissions: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Training Provider Admissions and Inquiry Follow-Up: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the enrollment consultation conversion stage at training institutions, materials mainly come from three categories: enrollment brochures, consultation records, and trial class arrangements. Enrollment brochures contain course names, class types, number of class hours, start dates, fee specifications, and signature/seal fields; consultation records contain student names, contact information, intended courses, consultation dates, and consultant signatures; trial class arrangements contain trial class times, instructors, classrooms, and receipt/confirmation fields. These materials are updated frequently during enrollment season, and versions and dates are prone to mismatch. When entering the form input node, the three types of materials each play different roles: enrollment brochures provide course and fee fields that can be issued, consultation records provide student and intention fields, and trial class arrangements provide time and receipt fields. The field characteristics are a mix of text, dates, single-choice, and signature fields, and they need to be collected item by item according to the template. Missing items are blocked before submission, ensuring that subsequent handover has a basis to rely on.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The draft materials that can be issued and the handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, class type, number of class hours, start date, and signature/seal field are consistent with the consultation record | Check the field names one by one in the node configuration, and check whether the required markers cover the signature/seal field and date |
| Consultation record | Whether the student name, intended course, consultation date, and consultant signature are complete | Check the required settings one by one, and after submission use `formInput` to reference the field values in a trial run |
| Trial class arrangement | Whether the trial class time, instructor, classroom, and receipt field match the brochure date | Reference the fields obtained by `userSelect` in subsequent nodes and run a trial, checking whether the receipt field is empty |
| Handover record | Whether the responsible person, version number, and date are consistent in both materials | Draft one according to the template and complete one handover, checking whether missing items are blocked |

## Three common errors

- Symptom: The course name and number of class hours for the same record do not match between the enrollment brochure and the consultation record. Cause: The two materials were drafted separately and the fields were not checked against the same template.
- Symptom: The trial class arrangement date is inconsistent with the brochure start date, and the version is not synchronized. Cause: Only one place was updated, while the other still uses the old version.
- Symptom: The handover record lacks the consultant signature or receipt, and the next step cannot be signed for. Cause: The required markers do not cover the signature field, and missing items are not blocked.

## How to verify the setup

Acceptance for this feature: fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that `formInputResult` and `selectResult` can obtain the corresponding values.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirming that values can be obtained after submission.
