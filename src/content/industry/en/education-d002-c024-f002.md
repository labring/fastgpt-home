---
title: Context and Token Budgets for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c024-f002
page_type: 行业问题页
application_area: education
meta_title: Graduate Admissions | Context & Tokens | Checks
meta_description: Graduate Admissions: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Graduate Admissions Interviews and Selection: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the graduate admissions re-examination and admission scenario; materials include the re-examination plan, the candidate score table, and the transfer list. The re-examination plan is usually published by the admissions unit before the batch starts, and contains the process, weights, time nodes, and signature fields; the candidate score table is updated in batches by preliminary examination and re-examination stages, with fields including candidate number, name, subject scores, total score, and date; the transfer list is compiled after the transfer system closes, with fields including transfer candidate number, original applying unit, proposed admission major, and receipt. When the three types of materials enter the same verification process, the re-examination plan provides the rule baseline, the score table provides individual values, and the transfer list provides the list and destinations; together they support the consistency determination of the name, quantity, and date of the same object across two materials. The material update rhythm is affected by batches and the public announcement period; field naming and signature status often differ across sources, so fields must be compared item by item against the ledger to locate inconsistencies.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. The "discrepancy list" is then completed by the model. Application settings only determine the length of a single answer and the context range; entry and authorization are handled by the publishing service and file permissions, and no business deliverable is generated.

| Object | Check | Verification action |
| --- | --- | --- |
| Re-examination plan | Consistent with the candidate score table and transfer list on name, date, and signature fields, and covers the category's verification dimensions | In application settings, check the response limit switch and slider position, and confirm that the single-answer length can accommodate the complete field comparison; use `maxResponse` to observe whether the end of a long answer is complete |
| Candidate score table | The name, quantity, and date of the same candidate number are consistent across the two materials, and the version is synchronized with the ledger | Compare field by field against the ledger and record inconsistent fields; when checking `maxContext` and `quoteMaxToken`, record the number of quote array entries and the quote text tokens respectively, and do not make an equality comparison |
| Transfer list | Consistent with the re-examination plan and candidate score table on transfer candidate number, proposed admission major, and receipt signature | Ask a question that requires a long answer and look at the ending to confirm that the ending of a longer answer is complete; compare the usage of two runs to observe the change in single-run usage after adjusting the limit |
| Discrepancy list | The consistency determination of the name, quantity, and date of the same object across the two materials can be written back | Submit to the reviewer for confirmation and write-back, and record entries missing signatures or receipts |

## Three common errors

- Symptom: the name or date of the same candidate does not match across the two materials. Cause: source tables have different update rhythms, and fields were not compared item by item against the ledger.
- Symptom: the transfer list and score table versions are not synchronized. Cause: materials are released in batches during the batch public announcement period, and the same version was not locked during verification.
- Symptom: the re-examination plan or transfer list is missing signatures or receipts. Cause: signature fields and receipts were not archived together with the materials and were omitted during verification.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer and see whether the ending is complete; if it breaks off in the middle of a sentence, check the response limit slider position, and check whether the values of `maxResponse`, `maxContext`, and `quoteMaxToken` match the answer length required by the page.

Business test: use one real record to find a field inconsistent with the ledger, record the name, quantity, and date discrepancies, and submit to the reviewer for confirmation and write-back.

- In application settings, check the response limit switch and slider position, and confirm they match the answer length required by the page.
- Compare the usage of two runs, observe the change in single-run usage after adjusting the limit, and record the number of quote array entries and the quote text tokens.
