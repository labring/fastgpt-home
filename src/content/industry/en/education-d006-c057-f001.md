---
title: HTTP Integrations for National Key Research and Development Applications: Track Progress and Check Statistics
slug: /en/industry/education-d006-c057-f001
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | HTTP | Progress
meta_description: National R&D Grants: review HTTP for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# HTTP Integrations for National Key Research and Development Applications: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical verification for National Key R&D Program project applications draw on three types of materials: the project application form, the budget application form, and the cooperation agreement. The project application form provides the task breakdown, assessment indicators, and participating units; the budget application form provides the funding categories, disbursement milestones, and matching sources; the cooperation agreement provides the partners' division of labor, intellectual property, and signature pages. When these three types of materials enter this function, their roles differ: the project application form is the backbone of the progress records, the budget application form is the source of amounts for the statistical basis, and the cooperation agreement is the basis for verifying external units and signatures. Field characteristics center on names, quantities, dates, signatures, and receipts; the update rhythm rolls forward as application milestones advance, and before a weekly or monthly report, one week's records must be aligned with the aggregate basis.

## Configuration and implementation checks

This step is executed by the HTTP node in the workflow, which outputs the response body, status code, and returned fields. The progress table and the statistical basis description are parsed from the response by subsequent nodes, or handled by an external system according to the agreed convention to complete the rest. The HTTP module sends requests to the target address; path parameters, request body, and request headers can all use variable placeholders, and the variables come from global variables, system variables, or the output of preceding nodes.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | Names, quantities, dates, and signature pages must correspond item by item with the budget application form | Extract the task breakdown and assessment indicators, compare the participating unit names and start/end dates in the two materials, and mark entries missing signatures or receipts |
| Budget application form | Funding categories and disbursement milestones must be consistent with the division-of-labor basis in the cooperation agreement | Verify the budget category names and amount sources, check whether the quantities and dates for the same record match across the two materials, and list separately any entries whose versions are not synchronized |
| Cooperation agreement | Partner names, intellectual property ownership, and signature receipts must be traceable | Compare whether the unit names in the agreement match those in the project application form, check whether the signature pages and receipts are complete, and add missing items to the pending-supplement list |
| Request address and path parameters | Placeholder variables can be resolved into actual values | View the rendered full address in the request preview, and confirm that the path parameters are consistent with the external interface convention |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the project application form and the budget application form. Cause: The two materials are maintained separately, lacking a unified basis and item-by-item comparison.
- Symptom: The cooperation agreement version is not synchronized, and signature pages or receipts are missing. Cause: External units return them late, and version updates are not marked in the records.
- Symptom: The request returns 401, the external system receives empty fields, and the request times out. Cause: The value source of `Authorization` has not been verified, `variables` have not been parsed, and the `responseData` fields are inconsistent with the interface convention.

## How to verify the setup

This function's acceptance: preview the rendered request, check the status code and returned fields, then compare the result against one sample; confirm that the value sources of `Authorization`, `variables`, and `responseData` are traceable.

Business test: use one week's records to verify the totals, and see whether the basis and exceptions are clearly stated; write the basis into the table header, and make sure the record count matches the statistical count.

- In the variables panel, verify the source of each placeholder, and confirm that the variables in the path parameters, request headers, and request body can be resolved into actual values.
- Use one sample request to compare the response, check that the fields are consistent with the external interface convention, and write exception entries into the basis description.
