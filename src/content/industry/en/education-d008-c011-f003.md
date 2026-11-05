---
title: Sharing and Embedding for School Exam Question Setting and Grading: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c011-f003
page_type: 行业问题页
application_area: education
meta_title: School Exams | Sharing & Embeds | Access
meta_description: School Exams: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for School Exam Question Setting and Grading: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the primary and secondary school exam question setting and grading scenario. Materials include the question-setting two-way specification table, exam papers, and scoring rubrics. Sources are school-based question-setting teams and teaching research departments, and the update cadence advances with exam batches and review signatures. When the three types of materials enter the sharing and embedding feature, their roles differ: the two-way specification table is used to define the scope of assessment and the allocation of question counts, exam papers are used to present questions and the score structure, and scoring rubrics are used to explain the basis for awarding scores and the steps. Field characteristics center on name, quantity, date, and signature. If the same record's name, quantity, or date does not match across two materials, or if versions are not synchronized, or signatures and receipts are missing, the external authorization scope will not match expectations. A sharing link only carries display parameters and authentication results; the visible scope of materials is still determined by file permissions.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The externally available entry point and authorization scope must be completed by external visitors seeing the corresponding content according to their identity; the link itself does not generate business materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Name, quantity, date, and signature must be consistent with the exam paper and scoring rubric | In the link configuration, check the time limit and identity verification, access once with an unauthenticated session, and check the visible scope of this table |
| Exam paper | The version must be synchronized with the scoring rubric; if signatures or receipts are missing, it must not be made external | Check the value of the per-minute access limit, and try once with an over-limit request to view the exam paper display items |
| Scoring rubric | The switch states for quoted excerpts and full quoted text must match the authorization scope | Check the quoted display item switches one by one, and confirm that a logged-out session cannot see the full quoted text |
| Sharing link | Expiration time, per-minute access limit, credit limit, and identity verification must be set according to usage needs | Check the expiration time and identity verification callback for the link corresponding to `shareId`, and access once with a restricted identity |

## Three common errors

- Symptom: The same record's name and quantity do not match between the two-way specification table and the exam paper. Cause: The two materials were revised separately and were not checked against the same synchronized version.
- Symptom: The scoring rubric version is not synchronized; the exam paper has been updated while the rubric is still an old draft. Cause: Dates and signature receipts were not compared item by item before publishing.
- Symptom: The full quoted text can be seen even when not logged in. Cause: The quoted display item switches and identity verification callback were not configured according to the authorization scope.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, check the allow decision and quoted display, and record the expiration time and identity verification callback corresponding to `shareId`.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- In the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification callback, and record `shareId`.
- Check the switches for quoted excerpts, full quoted text, and source original text download one by one, and access once each with an unauthenticated session and an over-limit request.
