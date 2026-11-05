---
title: Multi-Turn Conversation and Prompts for Continuing Education Training Hour Recognition: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c038-f005
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Conversation | Multilingual
meta_description: Continuing Education: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Continuing Education Training Hour Recognition: Handle Multilingual Materials and Terminology

## What this category's data looks like

Continuing education credit hour recognition materials usually include three types: course filing forms, study certificates, and credit hour recognition forms, coming from educational institutions, employers, and competent authorities, updated by batch or by year. Fields cover course name, number of credit hours, start and end dates, learner name, ID document number, signature, and receipt. When multilingual materials enter this feature, the course filing form provides the original-language baseline for course names and credit hours, the study certificate carries the actual completion records and dates, and the credit hour recognition form summarizes the recognition conclusions and signature status. Across the three types of materials, terminology must be aligned to the same course, the same learner, and the same period; translated names must be able to refer back to the original text, and names, quantities, dates, and signatures must remain traceable across the forms.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced range of historical messages and the answer constraints. The unified terminology glossary and the comparison draft are then completed by the model, while the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The course name and number of credit hours are written consistently across multilingual versions, and the translated name can refer back to the original text | Check the memory turns value in the application settings, use two consecutive follow-up questions to confirm whether the course reference is carried over, and check the course name and credit hour fields in `messages` |
| Study certificate | The actual completion dates and quantities match the filing form and the recognition form; missing signatures or receipts must be flagged | Sample three terms and check whether their wording is consistent throughout the whole text, compare the date and quantity fields in the session corresponding to `chatId`, and record the number of items in the reference array and the reference text tokens |
| Credit hour recognition form | The recognition conclusion and signature status are consistent between the two materials, and version synchronization is verifiable | Check the version identifier and signature fields in `variables`, confirm that the name, quantity, and date of the same record are not misaligned, and list missing receipts separately |

## Three common errors

- Symptom: The name or number of credit hours of the same course does not match between two materials. Cause: The multilingual materials were translated separately without first unifying the terminology glossary, so the translated names cannot refer back to the original text.
- Symptom: The dates and quantities in the study certificate and the recognition form are misaligned. Cause: Versions were not synchronized, old drafts and new drafts were mixed, and field updates were not synchronized.
- Symptom: The recognition form is missing signatures or receipts. Cause: The material circulation step did not backfill them, the signature status was not updated with the version, and they were omitted during verification.

## How to verify the setup

Feature acceptance: use two consecutive follow-up questions, see whether the second question carries over the reference from the first question, and confirm that the memory turns range matches the answer constraints.

Business test: sample three terms and check whether their wording is consistent throughout the whole text, whether the translated names can refer back to the original text, and whether names, quantities, dates, and signatures are aligned across the three types of materials.

- Check the current value of memory turns in the application settings, match it with the preceding context range required by the question, and compare the usage records of two runs.
- Run a trial with two consecutive question turns, check whether the reference in the second turn is answered correctly, and verify whether the fields in `chatId`, `messages`, and `variables` are consistent.
