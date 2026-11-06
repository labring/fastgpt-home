---
title: HTTP Integrations for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c017-f001
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | HTTP | Intake
meta_description: Undergraduate Programs: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information

## What this category's data looks like

The acceptance materials for undergraduate program setup and dynamic adjustment include three types: program setup application forms, talent cultivation plans, and expert review opinions. Application forms come from the academic affairs office acceptance window and are updated according to the academic year application batch; cultivation plans are revised on a rolling basis by colleges along with the cultivation cycle; review opinions are entered afterward following expert group meetings. When these three types of materials enter this function, their roles differ: the application form provides the proposed program name, code, degree-granting category, and responsible person's signature; the cultivation plan provides the course structure, credits and class hours, and semesters in which courses are offered; the review opinions provide the expert list, review date, and signatures. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. The same record must be aligned item by item across the three materials. Version synchronization and receipt retention are the basis for acceptance and completing follow-up questions.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, outputting the response body, status code, and returned fields. The acceptance record and the follow-up questions to be completed are parsed from the response by subsequent nodes, or handled and completed by an external system according to the agreement. The request URL and path parameters, request headers, and request body can all use variable placeholders, and the variables come from global variables, system variables, or outputs from preceding nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the name, quantity, date, and signature are aligned item by item with the cultivation plan and review opinions | In the request preview, check the complete rendered URL and request body fields, compare the program name, program code, and degree-granting category in the application form and cultivation plan, and verify the responsible person's signature and date |
| Talent cultivation plan | Whether the course structure, credits and class hours, and semesters in which courses are offered are consistent with the application form and review opinions | Check the request header names and value sources, compare the number of courses, total credits, and review date in the cultivation plan and review opinions, and check whether the version number is synchronized |
| Expert review opinions | Whether the expert list, review date, and signatures are complete and correspond to the application form | In the variable panel, check the source of each placeholder, check the number of experts, signatures, and receipts in the review opinions, and confirm that there are no name or date conflicts with the application form record |
| Acceptance record and follow-up questions | Whether missing items are identified and followed up, and whether answers are supported by materials | Use one sample request to compare the response, check whether the `responseData` field contains the missing-item list and follow-up questions, and check the value sources of `variables` and `Authorization` |

## Three common errors

- Symptom: The name or code of the same program does not match between the application form and the cultivation plan. Cause: The two materials were filled in separately by different handlers, without field-by-field comparison and receipt confirmation.
- Symptom: The cultivation plan version is not synchronized, and the review opinions still reference the old course structure. Cause: The version number was not updated after revision, and the version and date were not checked during acceptance.
- Symptom: The expert review opinions lack signatures or receipts, but the acceptance record still shows received. Cause: Scanned copies and paper copies are mixed, and the signature page was not verified item by item.

## How to verify the setup

Acceptance for this function: preview the rendered request, check the status code and returned fields, then compare the result against one sample; check whether `responseData` contains missing items and follow-up questions, and check the sources of `variables` and `Authorization`.

Business test: submit a question missing key information and see whether it asks a follow-up question first before answering.

- In the request preview, check the complete rendered URL and request body fields, and confirm that placeholder variables are resolved into actual values.
- In the variable panel, check the source of each placeholder, and confirm that `variables` and `Authorization` are traceable.
