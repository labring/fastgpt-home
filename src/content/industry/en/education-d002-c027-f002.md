---
title: Context and Token Budgets for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c027-f002
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Context & Tokens | Checks
meta_description: Graduate Destinations: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Graduate Employment Contracts and Destination Statistics: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of university employment signing and graduation destination statistics. The materials include three types: employment agreements, graduation destination registration forms, and employer certificates. Employment agreements are signed by students and employers, with fields including employer name, position, signing date, and signatures and seals of both parties; graduation destination registration forms are compiled by departments, with fields including student ID, name, destination type, employer name, and reporting date; employer certificates are issued by employers, with fields including offered position, onboarding date, and employer contact. The three types of materials enter the verification process in batches, and the update cadence changes with signing progress and department submission cycles. The name, quantity, and date of the same record in different materials must be compared item by item. When materials enter this feature, the employment agreement serves as the signing basis, the graduation destination registration form serves as the statistical ledger, and the employer certificate serves as supporting attachment; together they support discrepancy localization and write-back review.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), outputting the length of a single answer and the range of context it can accommodate. The "discrepancy list" is then completed by the model. The response limit is controlled by a slider for the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase; the quoted content budget and the number of quotes are recorded separately and are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Employer name, position, signing date, and signatures and seals must be consistent with the registration form | Compare the employer name and signing date in the agreement and the registration form field by field, check whether the signatures and seals of both parties are complete, and check whether `maxResponse` can accommodate the output of a long list |
| Graduation destination registration form | Student ID, name, destination type, employer name, and reporting date must be consistent with the agreement | Using the registration form as the ledger, compare the name, quantity, and date in the agreement and the employer certificate item by item, mark discrepant fields, and record the range of context that `maxContext` can accommodate |
| Employer certificate | Offered position, onboarding date, and employer contact must be consistent with the agreement | Check whether the position and onboarding date in the certificate match the agreement, check whether the receipt and signature are missing, and confirm whether the quoted text budget corresponding to `quoteMaxToken` is sufficient |
| Discrepancy list | The name, quantity, and date of the same object in the two materials are consistent | Summarize the discrepant fields across the three materials, submit them to the reviewer for confirmation, then write them back to the ledger, and record the values of the number of quotes and the quoted content budget separately |

## Three common errors

- Phenomenon: the employer name for the same record is written differently in the agreement and the registration form. Cause: the name was not entered according to a unified naming standard during data entry, so the fields do not match during comparison.
- Phenomenon: the onboarding dates in the agreement and the employer certificate differ by several days. Cause: the versions of the two materials were not synchronized; one was updated first while the other remained an old draft.
- Phenomenon: the graduation destination registration form lacks an employer receipt or student signature. Cause: signatures and receipts were omitted during material submission, making confirmation impossible during verification.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer, check whether the ending is complete, and confirm whether the response limit and truncation behavior match the answer length required by the page.

Business test: use a real record to find fields inconsistent with the ledger, compare name, quantity, and date item by item, and record the discrepancies.

- In application settings, check the response limit switch and slider position, and confirm they match the answer length required by the page.
- Compare usage from two runs, confirm the change in single-run usage after adjusting the limit, and check that the number of quotes and the quoted content budget are recorded separately.
