---
title: HTTP Integrations for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c026-f001
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | HTTP | Intake
meta_description: Degree Certificates: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on Q&A intake and missing-item follow-up for degree conferral and certificate information reporting. The source materials are the degree application form, thesis review form, and defense resolution submitted by the training institution, along with the accompanying receipt and signature page. The update cadence advances by batch reporting; after each round of intake, missing items are identified first, and then the follow-up questions to be completed are generated. The three types of materials each play a different role: the degree application form provides the applicant's identity, discipline, and proposed degree fields; the thesis review form provides the review conclusion, reviewers, and review date; the defense resolution provides the defense conclusion, voting result, chair's signature, and resolution date. The field characteristics are concentrated in four categories: name, quantity, date, and signature, and the same record must remain consistently referenced across the three materials. When the materials enter this function, the HTTP node in the workflow first sends the extracted fields to an external system for verification, and the returned missing-item list is then converted into follow-up content. The intake record and the follow-up questions to be completed are parsed from the response by subsequent nodes, or the external system handles them as agreed and then completes them.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The intake record and the follow-up questions to be completed are parsed from the response by subsequent nodes, or the external system handles them as agreed and then completes them. Variables can be used as placeholders in all three places: path parameters, request body, and request headers. The variables come from global variables, system variables, or the output of preceding nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the identity, discipline, and proposed degree fields are complete, and whether the date and signature are in place | Check the field names and value sources, and compare whether the signature page and receipt are attached |
| Thesis review form | Whether the review conclusion, reviewers, and review date point to the same record as the application form | Check whether the name, quantity, and date match, and check whether the version is in sync |
| Defense resolution | Whether the defense conclusion, voting result, chair's signature, and resolution date are complete | Check the chronological relationship between the resolution date and the review date, and check for missing signatures or receipts |
| HTTP request | Whether the placeholder variables can be resolved into actual values, and whether the authentication information is passed in according to the external system's requirements | View the fully rendered address in the request preview, and check the request header names and value sources |

## Three common errors

- Symptom: the same applicant's name is written inconsistently in the degree application form and the thesis review form. Cause: the two materials are entered in different steps, and name normalization and cross-comparison were not performed.
- Symptom: the defense resolution date is earlier than the thesis review form date, or the version is not in sync. Cause: materials are uploaded in batches, an old version overwrites a new version, and the date fields are not checked for chronological order.
- Symptom: the external system receives empty fields, or materials with missing signatures and receipts still enter intake. Cause: the request body fields are inconsistent with the external interface agreement, and the signature page is not included in required-field validation.

## How to verify the setup

This function's acceptance: preview the rendered request, check the status code and returned fields, and then compare the result against one sample; use `variables` to check the source of each placeholder, use `responseData` to check the returned field structure, and use `Authorization` to check whether the authentication information is passed in according to the external system's requirements.

Business test: submit a question missing key information and see whether it asks a follow-up question before answering.

- In the variables panel, check the source of each placeholder and confirm that the variables in all three places—path parameters, request body, and request headers—can be traced to global variables, system variables, or the output of preceding nodes.
- Compare the response using one sample request, check that the request body fields are consistent with the external interface agreement, and record the tokens of the referenced text and the number of array items.
