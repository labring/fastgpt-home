---
title: Multi-Turn Conversation and Prompts for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c018-f005
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Conversation | Intake
meta_description: Program Revision: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

The materials for Q&A intake for undergraduate program revision come from three types: program plans, course syllabi, and credit structure tables. The program plan provides the major name, length of study, total credits, and revision date; the course syllabus carries the course name, credits, class hours, and the signature of the author; the credit structure table records the credits and proportions of each module, the reviewer's signature, and the receipt. The update rhythms of the three types of materials are not synchronized. It is common for the name, quantity, and date of the same course to fail to match across two materials, for versions not to be synchronized, and for signatures or receipts to be missing. When entering intake and missing-item follow-up questions, the program plan serves as the main record to anchor the major and version, while the course syllabi and credit structure table serve as the basis for checking, used to compare field consistency and identify missing items, forming a list of questions to be completed.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, outputting the referenced historical message range and answer constraints. The intake records and the follow-up questions to be completed are then completed by the model, and the external entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the major name, length of study, total credits, and revision date are complete and consistent with the course syllabi and credit structure table | Check the memory turns value in the application settings, run a trial with two consecutive questions, check whether the second question inherits the reference from the first question, and verify the correspondence between `chatId` and `messages` |
| Course syllabus | Whether the course name, credits, class hours, and author's signature match the program plan and credit structure table | Compare the name, quantity, and date of the same course across the three materials, record entries missing signatures or receipts, and check whether `variables` bring in the correct context |
| Credit structure table | Whether the credits and proportions of each module, the reviewer's signature, and the receipt are complete and version-synchronized | Compare the usage records of two runs, confirm that consumption changes accordingly after adjusting the turns, and generate follow-up questions to complete missing items |

## Three common errors

- Phenomenon: The name and credits of the same course do not match between the program plan and the course syllabus. Cause: The two materials were revised at different times, versions are not synchronized, and field-level comparison was not performed during intake.
- Phenomenon: The date in the credit structure table is inconsistent with the program plan revision date, and the review signature or receipt is missing. Cause: The material circulation step did not return the receipt, and the intake record did not mark the missing item.
- Phenomenon: When the second question uses a reference, the answer does not address the question, responses become slower, and consumption rises. Cause: The memory turns value does not match the preceding context range required by the question, bringing in irrelevant content.

## How to verify the setup

Acceptance of this feature: Ask two consecutive follow-up questions, see whether the second question inherits the reference from the first question, and check the performance of the three identifiers `chatId`, `messages`, and `variables` in the historical message range and answer constraints.

Business test: Ask a question that lacks key information and see whether it first asks a follow-up question before answering.

- Check the current memory turns value in the application settings and confirm that it matches the preceding context range required by the question.
- Run a trial with two consecutive questions, compare the usage records of the two runs, and check whether the opening message is treated as preceding context.
