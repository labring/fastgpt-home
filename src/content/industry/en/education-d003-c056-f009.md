---
title: Tool Calls and Plugins for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c056-f009
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Tool Calls | Intake
meta_description: Teacher Qualifications: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information

## What this category's data looks like

Teacher qualification exam and certification involve three types of materials: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. The registration form contains name, ID number, exam subjects, exam district, and date, and requires the applicant's signature; the Mandarin proficiency certificate contains grade, certificate number, issuance date, and seal; the medical examination form contains the examination conclusion, date, and physician's signature. The material sources are candidate uploads and acceptance by the certification authority, and the update cadence changes with batches and supplementary documents. When entering this function, the registration form is used to verify identity and registration information, the Mandarin proficiency certificate is used to verify grade and number, and the medical examination form is used to verify the conclusion and validity period. The field characteristics are three types of easily missing items: dates, signatures, and quantities. The name, quantity, and date of the same record in two materials may not match. When versions are not synchronized or a receipt is missing, follow-up questions must be asked first.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), and outputs the tool call result (the input parameters and return in the call record). "Acceptance records and items to be completed" is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether the name, ID number, exam subjects, exam district, date, and signature are consistent with the acceptance record | Open the tool node parameter configuration, check the parameter description and whether it is required, and run a test with a query missing the ID number to see whether it asks a follow-up question first |
| Mandarin proficiency certificate | Whether the grade, certificate number, issuance date, and seal match the name on the registration form | Open each parameter configuration one by one, check the description and whether it is required, run a test with a query missing the certificate number, and check whether the return contains values that do not exist in the materials |
| Medical examination form | Whether the examination conclusion, date, and physician's signature are complete, and whether they are consistent with the name on the registration form | Check the diamond-shaped connections and node status on the canvas, and confirm that the tool calling node connection is connected to the target tool |
| Tool calling node | Based on the tool description, parameter description, and whether it is required, the model determines whether to call the tool this time | Run a test with a query missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description |

## Three common errors

- Symptom: The name and date of the same record do not match between the registration form and the Mandarin proficiency certificate. Cause: The versions of the two materials are not synchronized, and the fields have not been cross-checked.
- Symptom: Values that do not exist in the business materials appear in the returned result. Cause: When required parameters are missing, the model may fabricate parameter values on its own.
- Symptom: The model does not call the tool and directly gives an answer. Cause: The tool description does not state when it should be used, or it does not ask a follow-up question first when required parameters are missing.

## How to verify the setup

Acceptance for this function: run a test with a query missing a required parameter, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; check the values of `toolChoice` and `functionCall`, and check whether `toolChoice` is triggered according to the description.

Business test: submit a query missing key information and see whether it asks a follow-up question before answering.

- Open the description field in the tool node and check whether this description can be understood when read on its own, and whether it clearly states the purpose, when it should be used, and what result it returns.
- Open each parameter configuration one by one, check the description and whether it is required, and ensure they correspond to fields that actually exist in the business materials.
