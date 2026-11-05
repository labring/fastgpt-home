---
title: Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c011-f005
page_type: 行业问题页
application_area: education
meta_title: School Exams | Conversation | Access
meta_description: School Exams: review conversation for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for School Exam Question Setting and Grading: Manage Authorized Access and External Services

## What this category's data looks like

When materials for exam question setting and grading in primary and secondary schools enter the technology center, they usually include three types: the two-way specification table for question setting, the exam paper, and the grading rubric. The two-way specification table for question setting carries the assessment objectives, question type distribution, and score allocation; the exam paper carries the question text, options, and answering requirements; the grading rubric carries the scoring points, deduction explanations, and grading standards. The three types of materials are updated by exam batch and subject version, with fields concentrated in name, quantity, date, signature, and receipt. After the two-way specification table for question setting enters the function, it serves as the basis for scope definition, the exam paper serves as the main content, and the grading rubric serves as the judgment constraint. If the names, quantities, and dates among the materials do not match across different files, or if versions are not synchronized, or signatures and receipts are missing, all of these will affect the credibility of the external entry point and the authorization scope. When external services are opened to parents or higher authorities, the visitor identity and visible scope need to match, and unauthorized content must not be visible.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the referenced historical message range and answer constraints. "The externally available entry point and authorization scope" are determined by the publishing service and file permissions, and the model only processes the filtered materials. Memory turns control how many previous rounds of dialogue can be referenced at most when answering; if the value is too small, the preceding context cannot be used, and if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Whether the name, quantity, date, and signature are consistent with the exam paper and grading rubric | Check the current value in the application settings, and run a trial with two consecutive questions, recording `chatId` and `messages` |
| Exam paper | Whether the number of questions, score values, and exam date match the specification table and grading rubric | Compare the usage records of two runs, and check whether the `variables` passed in are consistent |
| Grading rubric | Whether the scoring points, deduction explanations, signature, and receipt are complete and the versions are synchronized | Access once with a restricted identity, and see whether the visible scope matches the setting |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: The two materials are maintained separately, without cross-checking and version synchronization.
- Phenomenon: The grading rubric lacks a signature or receipt, but the external entry point is still visible. Cause: The authorization scope was not tightened according to signature status and receipt completeness.
- Phenomenon: When the second question uses a reference, the answer does not address the question, and the response becomes slower and consumption rises. Cause: The memory turns and prompt configuration do not match the preceding context range.

## How to verify the setup

Acceptance for this function: ask two consecutive follow-up questions, and see whether the second question inherits the reference from the first question; at the same time, check the values of the three identifiers `chatId`, `messages`, and `variables` in the run records.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting.

- Check the current value of memory turns in the application settings, and confirm that it matches the preceding context range required by the question.
- Compare the usage records of two runs, and confirm that usage changes accordingly after adjusting the number of turns.
