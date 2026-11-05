---
title: Context and Token Budgets for School Mental Health Screening and Referrals: Find Supporting Evidence
slug: /en/industry/education-d001-c015-f002
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Context & Tokens | Evidence
meta_description: Student Mental Health: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for School Mental Health Screening and Referrals: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools, and the materials include three types: psychological screening plans, interview records, and referral forms. The psychological screening plan provides the screening tool, schedule, and determination criteria; the interview record carries the description of the student's status and the interviewer's signature; the referral form records the referral destination, the parent receipt, and the receiving party's signature. When these three types of materials enter this feature, their roles differ: the screening plan and referral form serve as source bases, while the interview record serves as process corroboration, jointly supporting basis entries that can be traced back to the original text. The materials are updated with semester milestones, and multiple versions commonly exist in parallel; fields include student name, class, screening date, scale name, item number, signature, and receipt status. Names, quantities, and dates are prone to inconsistency across materials; when versions are not synchronized, basis entries will point to old criteria, and if signatures or receipts are missing, the entries cannot be closed out.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which determine the length of a single answer and the range of context that can be accommodated. "Basis entries that can be traced back to the original text" are then completed by the model, while entry and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The screening tool, schedule, and determination criteria must be consistent with the current version, and the entries must match the original text | Check the plan version number and effective date, and spot-check whether the item numbers can be traced back to the original text |
| Interview record | The interviewer's signature, interview date, and student name must match the screening plan and referral form | Compare the name and date of the same student in the two materials, and check whether the signature fields are complete |
| Referral form | The referral destination, parent receipt, and receiving party's signature must be complete, and the entries can be traced back to the original text | Check the receipt and signature fields, and confirm that the referral date and screening date are logically consistent |
| Response limit | Use the slider to control the length of a single answer, matching the answer length required by the page | Check the switch and slider position in application settings, and observe whether the ending of a long answer is complete |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the screening plan and the referral form. Cause: The two were entered at different times, and no cross-check was performed.
- Phenomenon: The version of the screening plan referenced by the basis entry is inconsistent with the current version. Cause: The old version was not archived, and queries were not filtered by effective date.
- Phenomenon: The referral form lacks the parent receipt or the receiving party's signature. Cause: The referral process was not closed out, and material collection was delayed.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer, see whether the ending is complete, and check whether the `maxResponse` and `maxContext` settings match the answer length required by the page.

Business test: ask a basis question that spans materials, see whether the answer gives a traceable source, and record the number of citations and the `quoteMaxToken` budget for separate verification.

- Check the response limit switch and slider position in application settings, and ask a question that requires a long answer to see whether the ending is complete.
- Compare the name, date, and signature of the same student in the screening plan, interview record, and referral form, and confirm that the entries can be traced back to the original text.
