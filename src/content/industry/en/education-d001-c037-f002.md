---
title: Context and Token Budgets for Vocational Training Subsidy Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c037-f002
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Context & Tokens | Evidence
meta_description: Training Subsidies: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Vocational Training Subsidy Applications: Find Supporting Evidence

## What this category's data looks like

The industry question page for vocational training subsidy applications draws its materials from this park's training ledger, including three types: training class filing records, attendance records, and completion assessment forms. Class filing records register the class name, occupational type of work, class start date, instructor, and approval signature; attendance records register student names, attendance status, and personal signatures on a daily basis; completion assessment forms register the assessment date, score, assessor signature, and institution receipt. The three types of materials are collected monthly, and versions are updated in sync when there are class adjustments or supplementary entries. After entering this function, the filing records provide the class and type-of-work scope, the attendance records provide the attendance and date scope, and the assessment forms provide the completion and signature scope; together, the three support evidence entries that can be traced back to the original text.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. "Evidence entries that can be traced back to the original text" are then completed by the model. The response limit is controlled by a slider for the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing records | The class name, occupational type of work, class start date, approval signature, and current version match the original text | In application settings, check the switch and slider position, trace back to the original filing entry and record the version number, and check whether `maxContext` can accommodate the scope of the referenced materials |
| Attendance records | Student names, attendance status, attendance date, and personal signature are consistent with the filed class | Compare attendance dates with the filed class start date day by day, trace back to the original attendance entry, and check whether `quoteMaxToken` covers the tokens of the quoted text |
| Completion assessment forms | The assessment date, score, assessor signature, and institution receipt correspond to the filed class | Check the assessment date against the attendance end date, trace back to the original assessment form entry, and check whether `maxResponse` matches the answer length for that question |
| maxContext, quoteMaxToken, maxResponse | The context range, quoted content budget, and single-answer length are each recorded independently | In application settings, check the slider positions, verify the tokens of the quoted text separately, and record the number of array entries separately |

## Three common errors

- Symptom: The same class has mismatched names in the filing records and attendance records. Cause: The two materials were entered separately and were not aggregated under a unified class number.
- Symptom: The attendance date and assessment date do not match across months. Cause: Versions were not updated in sync during supplementary entry, and the old version of the materials is still being referenced.
- Symptom: The completion assessment form lacks an assessor signature or institution receipt. Cause: The signature column and receipt column were not checked item by item when the materials were archived.

## How to verify the setup

Acceptance for this function: ask a question that requires a long answer, see whether the ending is complete, and check whether `maxResponse` and `quoteMaxToken` match the length and quotation budget of that question.

Business test: ask a cross-material evidence question, see whether the answer gives a traceable source, and check whether `maxContext` can accommodate the scope of the referenced materials.

- In application settings, check the response limit switch and slider position, and confirm that the single-answer length matches the page requirements.
- Ask a question that requires a long answer, see whether the ending is complete, and compare the usage changes between two runs.
