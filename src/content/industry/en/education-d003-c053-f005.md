---
title: Multi-Turn Conversation and Prompts for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c053-f005
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Conversation | Intake
meta_description: Admissions Health Exams: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for College Admissions Health Examination Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the university admissions physical examination organization scenario, with materials drawn from three categories: physical examination forms, re-examination applications, and restricted-major notifications. Physical examination forms are generated in batches by the school hospital or a designated examination station, and contain name, candidate number, past medical history, conclusions for each subject, the chief examiner's opinion, and date and signature; re-examination applications are submitted by candidates or departments, and contain the original abnormal items, the reason for application, the items proposed for re-examination, and the receipt; restricted-major notifications are issued by the admissions office based on the physical examination conclusions, and contain the restriction clauses, the notification date, and the candidate's acknowledgment of receipt. The three categories of materials update at different rhythms: physical examination forms are entered centrally by batch, re-examination applications are received as they come in, and restricted-major notifications are generated in bulk before admission. When entering the Q&A intake and missing-item follow-up function, the physical examination form plays the role of the factual draft, the re-examination application plays the role of the to-do trigger, and the restricted-major notification plays the role of the conclusion reference; together the three support the intake record and the items to be completed.

## Configuration and implementation checks

This link is executed by the memory turns and prompt configuration in the application settings, and outputs the historical message range and answer constraints to be referenced. "The intake record and the items to be completed" are then completed by the model. Memory turns control how many previous turns of dialogue can be referenced at most when answering; if the value is too small, the preceding text cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases; the prompt constrains the answer to be based on the materials and to ask follow-up questions first when items are missing.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether the name, candidate number, conclusions for each subject, chief examiner's opinion, date, and signature are complete, and whether they can be matched with the original abnormal items cited in the re-examination application | Check the memory turns value in the application settings, run a trial with two consecutive turns of questions, check whether the second turn can carry forward the reference from the first turn, and compare the historical range carried in `messages` |
| Re-examination application | Whether the reason for application, the items proposed for re-examination, the receipt date, and the signature are complete, and whether the name, quantity, and date of the same record are consistent between the physical examination form and the re-examination application | Run a trial with a follow-up question containing a reference, observe whether the model first asks about the missing items before answering, and compare the conversation record corresponding to `chatId` field by field against the two materials |
| Restricted-major notification | Whether the restriction clauses, notification date, and candidate's acknowledgment of receipt are present, and whether the conclusion cited in the notification is version-synchronized with the chief examiner's opinion on the physical examination form | Check whether the prompt requires the answer to be accompanied by the material basis, and check whether the material fields passed in via `variables` cover the notification clauses and acknowledgment-of-receipt information |
| Intake record and items to be completed | Whether missing items are identified and followed up on, whether the answer has a material basis, and whether it can be transferred to the person handling it | Compare the usage records of two runs, confirm that usage changes accordingly after the turns are adjusted, and that the opening message is not treated as preceding text |

## Three common errors

- Symptom: the name, number of items, and date of the same candidate do not match between the physical examination form and the re-examination application. Cause: the two are entered separately, and no field-level comparison was performed.
- Symptom: the conclusion cited in the restricted-major notification is not version-synchronized with the chief examiner's opinion on the physical examination form. Cause: after the notifications were generated in bulk, the physical examination form was revised again, and the revision was not written back.
- Symptom: the re-examination application is missing the receipt or signature, yet the intake record is still circulated as complete material. Cause: missing-item identification does not cover the receipt and signature fields.

## How to verify the setup

This function's acceptance: ask two consecutive follow-up questions and see whether the second question carries forward the reference from the first question; at the same time, check whether the historical range carried in `messages` is consistent with the conversation record under `chatId`, and whether the material fields passed in via `variables` are referenced in the answer.

Business test: raise a question that is missing key information and see whether it asks follow-up questions first before answering.

- Check the current value of memory turns in the application settings, match it with the preceding-text range required by the question, and run a trial with two consecutive turns of questions to confirm that the reference is carried forward.
- Compare the usage records of two runs, confirm that usage changes accordingly after the turns are adjusted, and that the opening message is not treated as preceding text.
