---
title: Context and Token Budgets for Daily Kindergarten Care Management: Find Supporting Evidence
slug: /en/industry/education-d001-c001-f002
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Context & Tokens | Evidence
meta_description: Kindergarten Care: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Daily Kindergarten Care Management: Find Supporting Evidence

## What this category's data looks like

This page is for daily life management in kindergarten childcare. Materials include the daily life schedule, morning and afternoon health check records, and child health observation records. The daily life schedule is updated weekly or monthly, with fields including time period, activity name, and responsible person; morning and afternoon health check records are filled in daily, with fields including child name, body temperature, throat and hand observation, date, and teacher signature; child health observation records are filled in as needed or daily, with fields including observation time, symptom description, handling method, and parent receipt. When these materials enter the query function, the schedule provides the basis for time periods and responsible persons, the morning and afternoon health check records provide the basis for the day's health and attendance, and the observation records provide the basis for continuous individual observation. The material version is based on the currently stamped or signed version of the kindergarten, and the update rhythm is synchronized with kindergarten schedule adjustments, seasonal changes, and individual child situations. During querying, the question must be broken down into material fields in order to refer back to the original entries.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), outputting the length of a single answer and the range of context that can be accommodated. "Basis entries that can refer back to the original text" are then completed by the model. The response limit uses a slider to control the length of a single answer. If set too low, the answer will be truncated; if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | The time period, activity name, and responsible person fields can match the original text with the current version date | In application settings, check the position of the response limit slider, and ask a question requiring a long answer to see whether the ending is complete |
| Morning and afternoon health check records | The child name, body temperature, date, and teacher signature fields are consistent with the names and quantities in the observation records | Compare usage from two runs to confirm that the single answer length matches `maxResponse` |
| Child health observation records | The observation time, symptom description, handling method, and parent receipt fields can refer back to the original text | Check the tokens of the quoted text and the number of array entries; `quoteMaxToken` is the quoted content budget, and the number of array entries is recorded separately |
| Context range | The range of context that can be accommodated covers the materials needed for cross-material questions | Check the `maxContext` and `quoteMaxToken` settings to confirm that cross-material entries can be fully quoted |

## Three common errors

- Phenomenon: the same child name does not match in quantity between the morning and afternoon health check records and the health observation records. Cause: the two materials are filled in at different times, or class transfer or leave was not updated in both places at the same time.
- Phenomenon: the time period in the daily life schedule does not match the current version date. Cause: after schedule adjustment, the old version was not withdrawn, or the new table entered querying before being signed and confirmed.
- Phenomenon: observation records lack a parent receipt or teacher signature. Cause: the receipt was not collected in time, or the signature column was left blank, so the basis entries cannot refer back to the original text.

## How to verify the setup

This function's acceptance: ask a question requiring a long answer, see whether the ending is complete, and confirm that the response limit matches the answer length required by the page.

Business test: ask a cross-material basis question, see whether the answer gives a referable source, and check the settings corresponding to the three identifiers `maxResponse`, `maxContext`, and `quoteMaxToken`.

- In application settings, check the response limit switch and slider position to confirm that they match the answer length required by the page.
- Compare usage from two runs to confirm the change in single-run usage after adjusting the limit, and check whether the ending of the answer is complete.
