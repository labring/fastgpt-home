---
title: Context and Token Budgets for School Mental Health Screening and Referrals: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c015-f002
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Context & Tokens | Checks
meta_description: Student Mental Health: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Mental Health Screening and Referrals: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. Materials come from three categories: psychological screening plans, interview records, and referral forms. The psychological screening plan is updated by the school psychological teacher at the beginning of each semester or for special screenings, and its fields include screening tool name, screening date, class size, and warning level; interview records are filled in entry by entry by the homeroom teacher or psychological teacher, and their fields include interviewee name, interview time, problem description, and signature field; referral forms are issued by the psychological teacher or referral institution, and their fields include referral subject, referral date, receiving unit, and receipt field. When materials enter this function, the screening plan serves as the baseline ledger, while interview records and referral forms serve as materials to be checked, comparing names, quantities, dates, and signatures item by item. The update rhythm is one centralized verification after each screening round, and referral forms are supplemented after the receipt is returned. Field characteristics are mainly short text fields, and date formats and name spellings are prone to discrepancies.

## Configuration and implementation checks

This step is executed by application settings (response limit, etc.), which outputs the length of a single answer and the range of context that can be accommodated. The discrepancy list is then completed by the model, and entry and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the screening tool name, screening date, class size, and signature field are consistent with the ledger | In application settings, check the response limit switch and slider position to confirm that a single answer can cover the plan fields; compare the dates and class sizes of the screening plan and the ledger |
| Interview records | Whether the interviewee name, interview time, problem description, and signature field correspond to the psychological screening plan | Compare the names, dates, and quantities of interview records and the screening plan item by item; check whether the signature field is missing; use `maxResponse` to observe whether the end of a long answer is complete |
| Referral forms | Whether the referral subject, referral date, receiving unit, and receipt field are consistent with the interview records | Check the names, dates, and quantities of referral forms and interview records; check whether the receipt field is missing; record the `quoteMaxToken` reference content budget, and record the number of array entries separately |
| Context and token | Whether the length of a single answer matches the range of context that can be accommodated with the amount of material fields | Use `maxContext` to check the range of context that can be accommodated; ask a question requiring a long answer to see whether the end is complete; compare usage changes between two runs |

## Three common errors

- Phenomenon: the same record has different name spellings in the screening plan and interview records. Cause: name formats were not unified during entry, and the two materials were filled in independently.
- Phenomenon: the referral form date does not match the interview record date. Cause: referral forms are supplemented after the receipt is returned, and versions were not synchronized, causing the date field to lag.
- Phenomenon: interview records or referral forms lack a signature or receipt. Cause: no signature and receipt verification point was set in the material circulation process, and no check was performed at submission.

## How to verify the setup

This function's acceptance check: ask a question requiring a long answer and see whether the end is complete; if it breaks off in the middle of a sentence, raise the response limit slider position and retry, and compare usage changes between the two runs.

Business test: use one real record to find fields inconsistent with the ledger, submit them to the reviewer for confirmation, and write them back.

- In application settings, check the response limit switch and slider position to confirm they match the answer length required by the page.
- Compare the names, quantities, dates, and signatures of the screening plan, interview records, and referral forms item by item, record inconsistent fields, and submit them to the reviewer for confirmation.
