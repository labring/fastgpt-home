---
title: Context and Token Budgets for School Moral Education and Class Teacher Work: Find Supporting Evidence
slug: /en/industry/education-d001-c014-f002
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Context & Tokens | Evidence
meta_description: Pastoral Education: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Moral Education and Class Teacher Work: Find Supporting Evidence

## What this category's data looks like

This page focuses on business basis queries in school moral education and homeroom teacher work scenarios; the materials include themed class meeting plans, student comprehensive quality records, and home visit records. A themed class meeting plan contains activity objectives, segments, date, and homeroom teacher signature; a student comprehensive quality record contains evaluation dimensions, grade, record date, and teacher signature; a home visit record contains home visit time, subject, content summary, parent receipt, and teacher signature. These materials are updated by semester or by month, and after entering the feature they respectively serve as basis sources: the themed class meeting plan is used to check activity arrangements, the student comprehensive quality record is used to check evaluation entries, and the home visit record is used to check communication facts. The same record may have mismatched names, quantities, or dates across two materials, versions may not be synchronized, and signatures or receipts may be missing. During a query, basis entries that can be traced back to the original text must be provided, and it must be stated that the basis comes from the relevant materials, the version is the current one, and the entries match the original text.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. "Basis entries that can be traced back to the original text" are then completed by the model. The response limit uses a slider to control the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Fields include activity objectives, segments, date, and homeroom teacher signature; the date and signature must be traceable back to the original text | In application settings, check the response limit switch and slider position, confirm that the single answer length matches the plan length, and check whether `maxResponse` is consistent with the page requirements |
| Student comprehensive quality record | Fields include evaluation dimensions, grade, record date, and teacher signature; the name, quantity, and date of the same record across two materials must be consistent | Ask a question that requires a long answer and see whether the ending is complete, record the `quoteMaxToken` reference content budget, record the array item count separately, and do not compare for equality |
| Home visit record | Fields include home visit time, subject, content summary, parent receipt, and teacher signature; the version must be the current one, and missing signatures or receipts must be identifiable | Compare the usage of two runs, confirm the change in single-run usage after adjusting the limit, and check the range of context that `maxContext` can accommodate |
| Cross-material basis entries | The basis comes from the relevant materials, the version is the current one, and the entries match the original text | Ask a cross-material basis question, see whether the answer gives a traceable source, and check whether the answer breaks off in the middle of a sentence |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the themed class meeting plan and the student comprehensive quality record. Cause: the two materials are updated separately, and no cross-check has been done.
- Symptom: the home visit record version is not synchronized, and old-version content is cited. Cause: after the material is updated, the current version is not marked, and the query still points to the old entry.
- Symptom: the themed class meeting plan lacks the homeroom teacher signature, or the home visit record lacks the parent receipt. Cause: when archiving, the signature and receipt fields are not checked, resulting in incomplete basis entries.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer, see whether the ending is complete, and check whether the response limit slider position matches `maxResponse` and the page requirements.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and confirm that the basis comes from the relevant materials, the version is the current one, and the entries match the original text.

- In application settings, check the response limit switch and slider position, and confirm that the single answer length matches the answer length required by the page.
- Compare the usage of two runs, confirm the change in single-run usage after adjusting the limit, and check whether the answer length clearly exceeds what is needed or whether the length of similar questions fluctuates between long and short.
