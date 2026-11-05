---
title: Forms and User Interaction for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c038-f016
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Forms | Review
meta_description: Continuing Education: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on the continuing education credit recognition category. Materials include course filing forms, study certificates, and credit recognition forms. The course filing form is submitted by the training institution before the course starts, with fields including course name, number of class hours, teaching date, and signature of the person in charge; the study certificate is obtained by the learner after completing the study, with fields including learner name, course name, study start and end dates, and institution seal; the credit recognition form is filled out in summary by the employer or recognition institution, with fields including recognized credit hours, recognition date, and reviewer signature. The three types of materials are updated by batch: the filing form changes with course plan adjustments, the study certificate is generated as learners complete the course, and the recognition form is adjusted with review conclusions. When the materials enter the exception tracing and manual review function, the filing form provides the course baseline, the study certificate provides the learning facts, and the recognition form provides the recognition conclusion. The fields of the three must mutually corroborate one another in name, quantity, date, and signature.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The course name, number of class hours, teaching date, and signature of the person in charge must be consistent item by item with the study certificate and credit recognition form | Check the field names one by one in the node configuration, confirm that the filing form fields correspond one-to-one with the form fields; after submission, check whether subsequent nodes can retrieve the course name and number of class hours |
| Study certificate | The learner name, course name, study start and end dates, and institution seal must be consistent with the corresponding records in the filing form and recognition form | Check the required settings one by one, confirm that the key fields of the study certificate have been marked as required; reference this field in subsequent nodes and run a test to confirm that the field value can be passed |
| Credit recognition form | The recognized credit hours, recognition date, and reviewer signature must match the filing form and study certificate; missing signature or receipt is regarded as an exception | Reference the recognition form fields in subsequent nodes and run a test, check whether the reviewer signature and receipt are passed in with the field values; use `formInputResult` and `selectResult` to verify the field mapping |

## Three common errors

- Symptom: The same learner's course name is written differently in the filing form and the study certificate, causing the exception list to fail to associate them. Cause: The two materials are filled in at different stages, the name is not unified, and the versions are not synchronized.
- Symptom: The recognized credit hours recorded in the credit recognition form do not match the class hours in the study certificate, and the review conclusion lacks support from the original records. Cause: The quantity fields were not compared item by item, and the recognition form did not write back the study certificate number.
- Symptom: The credit recognition form lacks a reviewer signature or receipt, and the exception record cannot be traced back to the source material. Cause: The signature and receipt fields were not set as required, and after submission subsequent nodes cannot retrieve the corresponding field values.

## How to verify the setup

Acceptance for this feature: fill out the form once and submit it, check whether the field values retrieved by subsequent nodes are consistent with the filled-in content, and confirm that `formInputResult` and `selectResult` are passed correctly.

Business test: create an exception record, see whether it can be traced back to the source material, and check whether the name, quantity, date, and signature in the course filing form, study certificate, and credit recognition form are consistent.

- Check the field names one by one in the node configuration, and confirm that the form fields correspond one-to-one with the fields of the course filing form, study certificate, and credit recognition form.
- Check the required settings one by one, confirm that the key material fields have been marked as required; reference this field in subsequent nodes and run a test to confirm that after submission subsequent nodes can retrieve the corresponding field values.
