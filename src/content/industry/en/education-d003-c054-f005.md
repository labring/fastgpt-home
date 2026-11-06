---
title: Multi-Turn Conversation and Prompts for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c054-f005
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Conversation | Intake
meta_description: Self-Study Exams: review conversation for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the Q&A intake scenario for self-taught examination registration records and graduation review. The materials come from three categories: registration records, course pass certificates, and graduation application forms. Registration records mainly consist of name, exam registration number, ID number, major name, course pass records, and transfer/exemption annotations, with dates concentrated at registration and change nodes; course pass certificates mainly consist of course code, course name, pass date, score, and seal, and are used to verify single-subject pass status; graduation application forms mainly consist of name, major, number of courses, signature, review date, and receipt, and are used to determine whether graduation requirements are complete. In terms of update cadence, registration records change with transfers and exemptions, course pass certificates are issued by exam session, and graduation application forms are submitted by application batch. When the three types of materials enter intake, they respectively serve the roles of identity and registration record basis, single-subject pass evidence, and graduation conclusion with signature receipt. Field characteristics are multiple sources, multiple dates, and multiple signature positions. The name, quantity, and date of the same record in different materials are prone to mismatch. When versions are not synchronized or signatures/receipts are missing, follow-up questions must be asked first.

## Configuration and implementation checks

This part is executed by the memory turns and prompt configuration in the application settings, and outputs the referenced historical message range and answer constraints. The intake record and the completed follow-up questions are then handled by the model, while the external entry point and authorization are handled by the publishing service and file permissions. Memory turns control how many previous dialogue turns can be referenced at most when answering. If the value is too small, the preceding context cannot be used; if too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether name, exam registration number, major name, course pass records, transfer/exemption annotations and dates are consistent, and whether signatures or receipts are complete | Check the current values in the application settings, run a trial with two consecutive question turns, check whether the second turn can carry forward the references from the first turn, and inspect the preceding context range brought into `messages` and `variables` |
| Course pass certificates | Whether course code, course name, pass date, score, and seal correspond to the registration records, and whether the name and date of the same course match across the two materials | Run a trial with two consecutive question turns, use the second question to follow up with a reference to a certain course, observe whether `messages` retains the course clue from the first question, and check the conversation record corresponding to `chatId` |
| Graduation application forms | Whether name, major, number of courses, signature, review date, and receipt are consistent with the registration records and course pass certificates, and whether versions are synchronized | Compare the usage records of two runs to confirm that usage changes accordingly after adjusting the number of turns, and check whether the application batch and material version brought into `variables` are consistent |
| Intake records and completed follow-up questions | Whether missing items are identified and followed up on, whether answers are based on materials, and whether follow-up questions are asked before answering | Ask a question missing key information, observe whether follow-up questions are asked before answering, and check whether the material names, dates, and signature positions cited in the answer are traceable |

## Three common errors

- Symptom: The course name and pass date of the same record do not match between the registration records and the course pass certificate. Cause: The versions of the two materials are not synchronized, or they were not merged by the same course code during entry.
- Symptom: The number of courses in the graduation application form is inconsistent with the number of pass records in the registration records. Cause: Transfer/exemption annotations are not synchronized, or missing signatures and receipts lead to insufficient basis for the conclusion.
- Symptom: When the second question uses a reference, the answer is off-topic, responses become slower, and consumption rises. Cause: The memory turns are too large and bring in irrelevant content, or too small and cannot use the preceding context, and the opening message is treated as preceding context.

## How to verify the setup

Feature acceptance: Ask two consecutive follow-up questions and see whether the second question carries forward the references from the first question; check the preceding context range retained in `messages` and the conversation record corresponding to `chatId` to confirm that the answer constraints take effect.

Business test: Ask a question missing key information and see whether follow-up questions are asked before answering.

- Check the current value of memory turns in the application settings, confirm that it matches the preceding context range required by the question, and run a trial with two consecutive question turns.
- Compare the usage records of two runs to confirm that usage changes accordingly after adjusting the number of turns, and check whether the material version and signature receipt brought into `variables` are consistent.
