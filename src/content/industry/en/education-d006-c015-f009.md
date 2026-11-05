---
title: Tool Calls and Plugins for School Mental Health Screening and Referrals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c015-f009
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Tool Calls | Progress
meta_description: Student Mental Health: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for School Mental Health Screening and Referrals: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the category of mental health screening and referral in primary and secondary schools. The materials come from three source documents: the psychological screening plan, interview records, and referral forms, updated weekly or monthly. After entering tool calls and plugins, the screening plan carries the criteria and roster source, the interview records carry the process and signature basis, and the referral forms carry the destination and receipt basis. The fields of the three materials include student identifier, screening date, interview date, referral date, responsible person, and signature field. When the materials enter this feature, the tool call node first takes values according to the introduction and parameters, and then they are handed to subsequent nodes or manual verification, forming a progress table and statistical criteria description.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call, the node executes), outputting the tool call result (the input and return in the call record). The "progress table and statistical criteria description" is then completed by subsequent AI nodes or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the fields, dates, and signatures match the interview records and referral forms | Open the plan and interview records, verify the same student identifier, screening date, responsible person, and signature field, and write discrepancies into the criteria description |
| Interview records | Whether the name, quantity, and dates of the same record are consistent across the plan and referral forms | Compare the dates and quantities of interview records and referral forms one by one, and mark separately those missing signatures or receipts |
| Referral forms | Whether the version is synchronized and the receipts are complete | Verify the referral form version number and receipt field, and check whether it is the same version as the plan and interview records |
| Tool call node | Whether the tool introduction, parameter introduction, and whether it is required are clearly written | Open the node introduction and parameter configuration, run a test with a question missing a required field to see whether it asks first, and verify the call records of `toolChoice` and `functionCall` |

## Three common errors

- Symptom: The name and date of the same student do not match between the plan and the interview records. Cause: The two materials were entered separately, without verification against a unified student identifier and date criteria.
- Symptom: The referral form version is not synchronized, and receipts are missing. Cause: After the plan was updated, it was not synchronized to the referral form, and the signature and receipt fields were not completed along with the version.
- Symptom: The statistical total does not match the number of records. Cause: Exceptions were not written into the header criteria, and the quantity of the same record is inconsistent across the two materials.

## How to verify the setup

Feature acceptance: Run a test with a question missing a required parameter, verify the input and return in the call record, and confirm whether it asks first or calls according to the introduction; at the same time, verify the call records of `toolChoice` and `functionCall`.

Business test: Use one week of records to verify the total, and check whether the criteria and exceptions are clearly written.

- Open the tool node introduction and parameter configuration, verify the three items of introduction, parameter introduction, and whether it is required, and run a test with a question missing a field.
- Compare one week of records one by one by student identifier, date, signature, and receipt, and write discrepancies into the header criteria description.
