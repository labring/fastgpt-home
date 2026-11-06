---
title: Context and Token Budgets for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence
slug: /en/industry/education-d001-c043-f002
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Context & Tokens | Evidence
meta_description: Training Admissions: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Training Provider Admissions and Inquiry Follow-Up: Find Supporting Evidence

## What this category's data looks like

This page addresses the enrollment consultation conversion scenario at training institutions. The materials include three types: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, start dates, and refund terms, and are the source of basis for replying to parents and drafting proposals; consultation records carry parents' concerns, communication dates, and receipt signatures, and are used to check whether the name and quantity in the same record are consistent; trial class schedules give trial time, teacher, and classroom fields, and are used to compare the commitments in the brochure with the actual scheduling. The three types of materials update at different rhythms: brochures are revised quarterly, consultation records are generated per instance, and trial class schedules are arranged weekly. When entering this feature, brochures and trial class schedules serve as the source of basis entries, consultation records serve as the cross-check target, and the model accordingly produces basis entries that can be traced back to the original text; entry and authorization are handled by the publishing service and file permissions.

## Configuration and implementation checks

This part is executed by application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. "Basis entries that can be traced back to the original text" are then completed by the model. The response limit uses a slider to control the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | The name, class type, start date, and refund terms must be consistent with the current version, and must match the consultation records and trial class schedules | Check the switch and slider position in application settings, confirm that the brochure fields are consistent with the name, quantity, and date in the consultation records, and separately mark entries missing signatures or receipts |
| Consultation record | The name, quantity, and date of the same record in the brochure and trial class schedule should be consistent, and a receipt signature should be attached | Ask a question that requires a long answer and see whether the ending is complete; at the same time, compare the date and quantity fields in the two materials, and check the actual values of `maxResponse` and `maxContext` |
| Trial class schedule | The trial time, teacher, and classroom fields must be consistent with the brochure commitments; schedules whose versions are not synchronized should be recorded separately | Compare the usage of two runs, check `quoteMaxToken` and the tokens of the quoted text, record the number of array entries separately, and confirm that the quoted content budget and the number of entries are not compared for equality |

## Three common errors

- Symptom: the name and quantity of the same record do not match between the brochure and the consultation record. Cause: the two materials are maintained separately, no cross-check is performed, and the receipt signature is missing.
- Symptom: the date in the trial class schedule is inconsistent with the start date in the brochure. Cause: versions are not synchronized, the brochure was not revised after the schedule was updated, and signatures or receipts were not completed.
- Symptom: the answer breaks off in the middle of a sentence. Cause: the response limit slider is set too low, the length of a single answer is limited, and the actual answer ending is incomplete.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer, see whether the ending is complete, check the values of `maxResponse` and `maxContext`, and confirm that the answer is not truncated.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check `quoteMaxToken` and the tokens of the quoted text.

- Check the response limit switch and slider position in application settings, and confirm that they match the answer length required by the page.
- Compare the usage of two runs, confirm the change in single-run usage after adjusting the limit, and record the number of quoted entries and the `quoteMaxToken` budget.
