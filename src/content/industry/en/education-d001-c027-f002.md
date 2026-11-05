---
title: Context and Token Budgets for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence
slug: /en/industry/education-d001-c027-f002
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Context & Tokens | Evidence
meta_description: Graduate Destinations: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Graduate Employment Contracts and Destination Statistics: Find Supporting Evidence

## What this category's data looks like

Common materials for university employment signing and graduation destination statistics include employment agreements, graduation destination registration forms, and employer certificates. An employment agreement contains the employer name, Unified Social Credit Code, position, signing date, and signatures and seals of both parties; a graduation destination registration form contains the destination category, employer name, reporting date, student confirmation, and department review; an employer certificate contains the offered position, onboarding date, employer contact, seal, and receipt. Materials enter by graduating class and batch, and the update cadence advances with signing, termination, reassignment, and verification. When entering this feature, the employment agreement serves as the primary basis for signing, the graduation destination registration form serves as the basis for destination classification, and the employer certificate serves as supplementary evidence; the fields, dates, and signatures of the three must correspond to one another, the name, quantity, and date of the same record should be consistent, versions must be synchronized, and signatures and receipts must not be missing.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which determine the length of a single answer and the range of context that can be accommodated. "Evidence items that can be traced back to the original text" are then completed by the model. The response limit is controlled by a slider that sets the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The employer name, position, signing date, and signatures and seals must be consistent with the registration form | Compare the employer name, signing date, and signature page of the employment agreement and the graduation destination registration form item by item, and record the locations of discrepancies |
| Graduation destination registration form | The destination category, reporting date, student confirmation, and department review must be complete | Check the destination category and reporting date on the registration form, and inspect whether student confirmation and department review are missing |
| Employer certificate | The offered position, onboarding date, employer seal, and receipt must be traceable | Inspect the position, onboarding date, seal, and receipt on the certificate, and confirm that they match the agreement and registration form |
| Response limit | Matches the answer length required by the page | Check the switch and slider position in application settings, and use `maxResponse`, `maxContext`, and `quoteMaxToken` to observe the single-output and citation budgets |

## Three common errors

- Symptom: The employer name and signing date of the same record do not match between the employment agreement and the graduation destination registration form. Cause: The two materials are filled in at different stages, and no cross-check was performed.
- Symptom: The registration form version is not synchronized, and the old destination category and reporting date are still used. Cause: After reassignment or termination, the material version was not updated, and the old version continued to circulate.
- Symptom: The employer certificate lacks a seal or receipt and cannot be traced back to the original text. Cause: When collecting materials, only the body text was collected, and whether signatures and receipts were complete was not checked.

## How to verify the setup

Feature acceptance: Ask a question that requires a long answer, see whether the ending is complete, and confirm that the response limit matches the length required by the page.

Business test: Ask a cross-material evidence question, see whether the answer provides a traceable source, and check the `quoteMaxToken` citation budget and the number of array items and record them separately.

- Check the response limit switch and slider position in application settings, and ask a long-answer question to see whether the ending is complete.
- Compare usage across two runs to confirm the change in single-run usage and truncation behavior after adjusting the limit.
