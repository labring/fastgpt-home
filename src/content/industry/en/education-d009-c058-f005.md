---
title: Multi-Turn Conversation and Prompts for Research Project Task Agreement Signing: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c058-f005
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Conversation | Multilingual
meta_description: Research Agreements: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Project Task Agreement Signing: Handle Multilingual Materials and Terminology

## What this category's data looks like

Materials at the signing stage of research project task books are mainly project task books, subject task breakdown tables, and budget books. Sources are declaration system exports, offline countersigned drafts, and email receipts, and the update rhythm rolls forward with version submission for review, return for revision, and resubmission for approval. The three types of materials play different roles when entering multilingual materials and terminology processing: the project task book provides backbone fields such as subject name, undertaking unit, and assessment indicators; the subject task breakdown table provides sub-subjects, task numbers, start and end dates, and responsible persons; the budget book provides subject names, amounts, and annual allocation. Field characteristics are concentrated in four places: names, quantities, dates, and signature receipts. If the name, quantity, or date of the same record does not match across two materials, or if versions are not synchronized, or signatures and receipts are missing, the unified terminology table and the comparison draft will lose their ability to refer back.

## Configuration and implementation checks

This link is executed by the memory turns and prompt configuration in the application settings, and outputs the historical message range and answer constraints referenced. The unified terminology table and comparison draft are then completed by the model, and the external entry point and authorization are handled by the publishing service and file permissions. Memory turns control how many previous dialogue turns can be referenced at most when answering. If the value is too small, the preceding text cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the name, quantity, date, and signature are consistent with the budget book | Check the memory turns value in the application settings, sample three terms to check whether the writing is consistent throughout, and use `chatId` to locate the same session |
| Subject task breakdown table | Whether the sub-subject name, task number, and start and end dates match the project task book | Run a trial with two consecutive question turns, with the second turn containing a reference, and observe whether `messages` carries over from the first turn |
| Budget book | Whether the subject name, amount, and annual allocation are consistent with the quantity and date in the task book | Compare the usage records of two runs, and check whether the fields passed in `variables` cover the three types of materials |
| Unified terminology table and comparison draft | Whether the same term is consistent throughout and the translated name can refer back to the original text | Sample three terms to check the writing throughout, and confirm that names, quantities, and dates do not conflict between the two types of materials |

## Three common errors

- Symptom: the same term is written differently in the task book and the budget book. Cause: versions are not synchronized, old draft terms are not replaced along with the new draft, and the comparison draft fails to refer back to the original text.
- Symptom: the number of sub-subjects does not match between the two materials. Cause: the breakdown table and the task book were modified separately, and the date and quantity fields were not cross-checked.
- Symptom: the second question answers off-topic when a reference is used. Cause: the memory turns value is too small to use the preceding text, or the opening message is brought in as preceding text.

## How to verify the setup

Acceptance of this feature: ask two consecutive follow-up questions and see whether the second question carries over the reference from the first question; check the memory turns value in the application settings, and use `chatId` and `messages` to locate the reference range.

Business test: sample three terms to check whether the writing is consistent throughout, and check whether names, quantities, and dates match between the project task book and the budget book.

- Check the current memory turns value in the application settings, and match it with the preceding text range required by the question.
- Sample three terms to check the writing throughout, and confirm that the same term is consistent throughout and the translated name can refer back to the original text.
