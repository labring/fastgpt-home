---
title: Forms and User Interaction for Self-Study Exam Records and Graduation Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c054-f016
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Forms | Review
meta_description: Self-Study Exams: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Self-Study Exam Records and Graduation Review: Trace Exceptions and Review Results

## What this category's data looks like

This category's data looks like this: exception tracing and manual review for self-taught examination registration records and graduation review revolve around three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records are updated by the provincial examination office after each examination registration, and contain name, examination registration number, ID number, major name, course qualification records, and transfer/exemption marks; the fields are mainly dates and signatures. Course qualification certificates are issued by the main examining institution in batches after grading is completed, and contain course code, course name, qualification date, and the seal of the main examining institution. Graduation application forms are filled out by candidates during the graduation application period, and contain major name, number of courses, exempted courses, candidate signature, and examination office receipt. When these three types of materials enter the form input node, registration records are responsible for verifying identity and historical records, course qualification certificates are responsible for verifying the number of courses and qualification dates, and graduation application forms are responsible for verifying the candidate's declared information and signature receipt. In terms of update rhythm, registration records roll forward with examination registration batches, course qualification certificates are batched according to the grading cycle, and graduation application forms are submitted centrally during the graduation application period. Field characteristics appear as four types: names, quantities, dates, and signatures. During exception tracing, the values of the same record in different materials need to be compared item by item.

## Configuration and implementation checks

Configuration and implementation checks: this step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually afterward. After the node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether name, examination registration number, ID number, and course qualification records are consistent item by item with the course qualification certificates and graduation application forms, and whether dates and signatures are complete | Configure registration record fields in the form input node and mark them as required, use `formInput` to reference field names, and after submission check the field values obtained by subsequent nodes |
| Course qualification certificates | Whether course code, course name, qualification date, and seal of the main examining institution match the registration records and graduation application forms, and whether there are discrepancies in quantity and date | Check the course qualification certificate field names and required settings one by one in the form input node, use `userSelect` to select the course qualification certificate type, and after a trial run check field passing |
| Graduation application forms | Whether major name, number of courses, exempted courses, candidate signature, and examination office receipt are consistent with the registration records and course qualification certificates; if the signature or receipt is missing, suspend the process | Configure graduation application form fields in the form input node and mark them as required; after submission, subsequent nodes reference the field values, and a human compares the three materials |
| Form input node | Whether the required markers and field passing are usable, and whether subsequent nodes can obtain the corresponding field values after submission | Check the required settings one by one, reference the `formInputResult` fields in subsequent nodes and run a trial, and confirm that the conversation no longer remains in the interaction state |

## Three common errors

- Symptom: the same candidate's name is written differently in the registration records and the graduation application form. Cause: during entry, it was not unified according to the ID card, so the names in the two materials do not match, and they cannot be directly associated during tracing.
- Symptom: the qualification date on the course qualification certificate is inconsistent with the date recorded in the registration records. Cause: the grading batch and the registration record update batch were not synchronized, and the versions were not synchronized, resulting in two dates for the same course.
- Symptom: the graduation application form lacks the candidate signature or the examination office receipt. Cause: when submitting, the required items were not all marked, so materials missing a signature or receipt could still be submitted, and the review conclusion lacks a basis.

## How to verify the setup

How to verify the setup: acceptance for this function: fill out the form once and submit it, then check whether the field values obtained by subsequent nodes are consistent with the filled-in content, focusing on the passing of the two fields `formInputResult` and `selectResult`.

Business test: create an exception record, see whether the source material can be traced, and check the names, quantities, dates, and signatures of the registration records, course qualification certificates, and graduation application forms.

- Check the field names and required markers one by one in the form input node, ensuring they correspond one-to-one with the material fields of the registration records, course qualification certificates, and graduation application forms.
- Reference the form fields in subsequent nodes and run a trial to confirm that the field values can be obtained after submission; the exception list and review conclusion are handed to the responsible person for handling.
