---
title: HTTP Integrations for National Key Research and Development Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c057-f001
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | HTTP | Intake
meta_description: National R&D Grants: review HTTP for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for National Key Research and Development Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data includes three types of National Key R&D Program project application materials: the project application form, the budget application form, and the cooperation agreement. Sources are the application system and offline signed documents, and the update cadence rolls with application windows and correction notices. The three material types play different roles in Q&A acceptance and missing-item follow-up: the project application form carries research objectives, task breakdown, and assessment indicators, and is the primary basis for missing-item identification; the budget application form carries subject amounts, calculation basis, and matching funds, and is used to check quantities and dates; the cooperation agreement carries participating unit division of labor, signatures, and effective dates, and is used to check signatures and receipts. Field characteristics concentrate in four categories: names, quantities, dates, and signatures. The same record often appears across the three materials with inconsistent name spellings, different quantity calibers, and misaligned dates. When materials enter this function, the acceptance step first forms questions, then the missing-item follow-up step compares the three material types, outputs acceptance records and completed question items, and forwards them to the handler.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Item | Judgment | Verification Action |
| Project Application Form | The names, quantities, and dates of the research objectives, task breakdown, and assessment indicators must be consistent with the Budget Application Form and the Cooperation Agreement | Extract the name and date fields of the same record, compare the three documents item by item, and write discrepancies into the inquiry items |
| Budget Application Form | The subject amounts, calculation basis, and matching funds' quantities and dates must align with the Project Application Form and the Cooperation Agreement | Compare the quantity standards and date ranges, and check whether signatures and receipts are complete |
| Cooperation Agreement | The participating units' division of labor, signatures, and effective date must be synchronized with the Project Application Form and the Budget Application Form | Check the version number and signature page, and confirm whether the receipt is archived together with the materials |

## Three common errors

- Symptom: The names and quantities of the same record do not match between the project application form and the budget application form. Cause: The two materials are filled in separately without cross-checking, and field calibers are not unified.
- Symptom: The cooperation agreement version is not synchronized, and the signature page and body dates are misaligned. Cause: The latest version was not returned after offline signing, and the missing receipt leaves version judgment without basis.
- Symptom: The request returns 401 or the external system receives empty fields. Cause: The value source of `Authorization` was not checked, or the request body placeholder variables were not parsed into actual values.

## How to verify the setup

This function's acceptance: preview the rendered request, check the status code and returned fields, then compare the result against one sample; at the same time, check the values and return structure corresponding to the three identifiers `Authorization`, `variables`, and `responseData`.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering.

- In the variable panel, check the source of each placeholder and confirm that variables in all three places—path parameters, request body, and request headers—are traceable.
- Use one sample request to compare returned fields, confirm that missing items are identified and followed up, and that answers have material basis before forwarding to the handler.
