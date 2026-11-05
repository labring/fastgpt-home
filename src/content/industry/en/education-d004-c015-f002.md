---
title: Context and Token Budgets for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c015-f002
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Context & Tokens | Handover
meta_description: Student Mental Health: review context & tokens for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on three types of materials in primary and secondary school mental health screening and referral: the psychological screening plan, interview records, and referral forms. The plan is drafted before the start of on-campus screening and contains screening dimensions, schedule, and responsible persons; interview records are filled in item by item by the psychological teacher after screening and contain student codes, observation items, dates, and signatures; referral forms are issued when further assessment is found necessary and contain the reason for referral, the receiving party, and a receipt section. Materials are updated by semester and batch, and the field characteristic is multi-table intersection: the same student code, screening date, and referral count must remain consistent across the three materials, and the version number and signature section are indispensable. When entering this feature, the plan serves as a long-text draft, while interview records and referral forms serve as short-table drafts, each carrying context fragments, which the model assembles into a signable draft and handover record.

## Configuration and implementation checks

This step is executed by application settings (response limit, etc.), which determine the length of a single answer and the range of context that can be accommodated. "Signable material drafts and handover records" are then completed by the model. The response limit is controlled by a slider that sets the length of a single answer; if set too low, answers will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Fields include screening dimensions, date, responsible person, and version number, consistent with the interview record date | In application settings, check the response limit switch and slider position, confirm the end of the long plan is complete, and record the values of `maxResponse` and `maxContext` |
| Interview records | Student code, observation items, date, and signature match the plan batch, and no receipt is missing | Draft one according to the template and complete one handover, check whether missing items are blocked, and verify `quoteMaxToken` and the tokens of the quoted text |
| Referral form | Reason for referral, receiving party, receipt section, and date are consistent with the interview records, and versions are synchronized | Ask a question requiring a long answer and look at the end, compare usage across two runs, and confirm there is no conflict between the referral form count and date |

## Three common errors

- Symptom: The code or date for the same student does not match between the plan and the interview records. Cause: The version was not locked during drafting, the two fields were filled in separately, and no cross-check was done before handover.
- Symptom: The referral form lacks the receiving party's signature or receipt, and the version number is inconsistent with the plan batch. Cause: Materials were drafted separately, the handover record was not bound to the same version, and the receipt step was missed.
- Symptom: The answer breaks off mid-sentence, and the end of the long plan is incomplete. Cause: The response limit slider position is too low; it needs to be raised and retried, and the change in single-run usage compared.

## How to verify the setup

Feature acceptance: Ask a question requiring a long answer, see whether the end is complete, and in application settings check the response limit slider position and the values of `maxResponse`, `maxContext`, and `quoteMaxToken`.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- In application settings, check the response limit switch and slider position, raise it, and resubmit the long question to see whether the end is complete.
- Compare usage across two runs, record the change in single-run usage after adjusting the limit, and confirm that the truncation behavior matches the length.
