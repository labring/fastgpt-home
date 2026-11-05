---
title: Forms and User Interaction for Continuing Education Training Hour Recognition: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c038-f016
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Forms | Handover
meta_description: Continuing Education: review forms for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Continuing Education Training Hour Recognition: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The drafting of materials and handover of responsibility for continuing education credit recognition involves three types of materials: the course filing form, the study certificate, and the credit recognition form. The course filing form is submitted by the training institution before the course starts, and its fields include course name, number of credit hours, start and end dates, and instructor signature; the study certificate is issued by the teaching party after the course ends, and its fields include student name, course name, actual credit hours, course completion date, and seal; the credit recognition form is filled out by the applicant as a summary, and its fields include recognized credit hours, corresponding certificate number, handler signature, and recognition date. The three types of materials are updated by batch, and within the same batch the names, quantities, and dates must be aligned item by item. When entering the form input node, the course filing form provides the course and credit hour baseline, the study certificate provides the evidence of actual completion, and the credit recognition form bears the responsibility for summary and signature; together, the three support the draft materials that can be issued and the handover records.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The draft materials that can be issued and the handover records are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, number of credit hours, start and end dates, and instructor signature are consistent with the study certificate | Check the field names one by one in the node configuration, and compare the names, quantities, dates, and signatures of the two materials |
| Study certificate | Whether the student name, course name, actual credit hours, course completion date, and seal are complete | Check the required settings one by one, and confirm that the key material fields have been marked as required |
| Credit recognition form | Whether the recognized credit hours, corresponding certificate number, handler signature, and recognition date are aligned with the aforementioned materials | Reference this field in subsequent nodes and run a test to confirm that the corresponding field value can be retrieved |
| Form fields | Whether the field names correspond one-to-one with the material fields to be collected | Check the field names one by one in the node configuration, and use `formInput` references in a test run |

## Three common errors

- Symptom: The course name and number of credit hours for the same record do not match between the course filing form and the study certificate. Cause: The two materials were drafted separately, and the names and quantities were not checked against the same baseline.
- Symptom: The certificate number referenced in the credit recognition form corresponds to an old version of the study certificate, and the date and signature are missing. Cause: The versions were not synchronized, and the receipt and signature were not checked during handover.
- Symptom: After submission, subsequent nodes cannot retrieve the values, or required items can be submitted even when empty, and the conversation remains in the interactive state. Cause: The required markers and field passing were not checked item by item.

## How to verify the setup

Fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that `formInputResult` and `selectResult` references can read the corresponding fields, and that empty required items are blocked.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the field names and required settings one by one in the node configuration, and confirm that the key material fields have been marked as required.
- Reference this field in subsequent nodes and run a test to confirm that the corresponding field value can be retrieved after submission, and that the conversation does not remain in the interactive state due to missing items.
