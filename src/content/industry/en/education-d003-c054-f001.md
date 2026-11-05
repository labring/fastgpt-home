---
title: HTTP Integrations for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c054-f001
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | HTTP | Intake
meta_description: Self-Study Exams: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data comes from three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records are exported from the provincial-level system and contain name, exam registration number, course status, and dates; course qualification certificates are issued by the main examining institution and contain course name, qualification date, and seal; graduation application forms are filled out by candidates and preliminarily reviewed by the study assistance center, and contain major name, number of courses, signature, and receipt. In terms of update cadence, registration records are synchronized monthly, qualification certificates are supplemented by batch, and application forms circulate with the application season. When materials enter this function, registration records serve as the master record, qualification certificates serve as the course basis, and application forms serve as the credential for graduation destination; the fields, dates, and signatures of the three must be cross-compared, and missing items trigger follow-up questions.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The "acceptance records and items to be completed" are parsed from the response by subsequent nodes, or handled and completed by an external system according to the agreement. The request URL, request headers, and request body can all use variable placeholders, and the variables come from global variables, system variables, or the output of preceding nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether the name, exam registration number, course status, and dates are consistent with the qualification certificates | Check the source of each placeholder in the variables panel, and compare the fields and dates of the registration records and course qualification certificates |
| Course qualification certificates | Whether the course name, qualification date, and seal match the number of courses in the application form | Use a sample request to compare the response, and check the number of courses, dates, and signatures of the qualification certificates and graduation application forms |
| Graduation application forms | Whether the major name, number of courses, signature, and receipt are complete | Check the request header names and value sources, and check whether the application form signature and receipt have missing items |
| Request body | Whether the fields are consistent with the agreement of the external interface | View the complete rendered URL in the request preview, and check whether the request body fields are consistent with the external interface agreement |

## Three common errors

- Symptom: The name, quantity, or date of the same course does not match between the registration records and the qualification certificate. Cause: The two materials are exported from different systems, versions are not synchronized, and field definitions are inconsistent.
- Symptom: The graduation application form is missing a signature or receipt but still enters the acceptance process. Cause: The preliminary review step does not verify the signature and receipt, and no missing-item interception is performed when materials circulate.
- Symptom: The request returns 401 or the external system receives empty fields. Cause: The request header authentication information is not passed in as required by the external system, or the placeholder variables are not parsed into actual values.

## How to verify the setup

Acceptance for this function: View the complete rendered URL in the request preview, check the status code and returned fields, then compare the result against a sample; check whether the three placeholders `Authorization`, `variables`, and `responseData` are traceable.

Business test: Submit a question missing key information and see whether it asks a follow-up question first before answering.

- Check the source of each placeholder in the variables panel, and confirm that the placeholders in the request URL, request headers, and request body can be parsed into actual values.
- Use a sample request to compare the response, check that the request body fields are consistent with the external interface agreement, and check whether the returned fields contain the acceptance records and items to be completed.
