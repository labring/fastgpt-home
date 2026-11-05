---
title: Multi-Turn Conversation and Prompts for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c018-f005
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Conversation | Multilingual
meta_description: Program Revision: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Undergraduate Curriculum Planning: Handle Multilingual Materials and Terminology

## What this category's data looks like

Undergraduate program revision involves three types of materials: the program plan, course syllabi, and the credit structure table. Fields include course name, credits, class hours, semester offered, revision date, and signature field. The program plan defines total credits and modules, the course syllabi state course objectives and assessment methods, and the credit structure table lists the credit distribution of each module. Materials come from departmental submissions and academic affairs consolidation, the update cadence rolls by revision batch, and multiple versions coexist within the same batch. During multilingual materials and terminology handling, the program plan serves as the terminology master source, the course syllabi and credit structure table serve as comparison drafts, and the terminology table refers back to the original text item by item based on the program plan. After materials enter the multi-turn dialogue and prompt feature, the historical message range determines whether earlier terminology can be carried forward by subsequent follow-up questions, and the answer constraints determine the translated-name wording and the back-reference requirements.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Memory rounds | Matches the range of prior context required by the question | Check the current value in the application settings, run a trial with two consecutive follow-up questions, and observe whether the second round inherits the references from the first round |
| Program of study | Course names, credits, revision dates, and signature fields are consistent across the three types of materials | Extract three terms and check the field wording and signature receipts in the program of study, course syllabus, and credit structure table one by one |
| Course syllabus | The same course name and credit count can refer back to the original text of the program of study | Compare against the master source of the program of study and check whether the course name, credits, and date in the syllabus are word-for-word consistent |
| Credit structure table | The credit counts and dates of each module match the program of study | Check the module credits and revision dates in the credit structure table and the program of study to confirm the versions are synchronized and no signatures are missing |

## Three common errors

- Symptom: the name or credits of the same course do not match between two materials. Cause: the terminology table does not refer back item by item with the program plan as the master source, and the comparison drafts each continue to use the old wording.
- Symptom: the revision date and signature field are inconsistent between two versions of the materials. Cause: the versions are not synchronized, the old version was not withdrawn, and missing signatures or receipts were not discovered.
- Symptom: the second question answers something irrelevant when references are used. Cause: the memory turns are too small to use the earlier text, or the opening message is treated as earlier text and brings in irrelevant content.

## How to verify the setup

Acceptance for this feature: with two consecutive follow-up questions, see whether the second question carries forward the references from the first question; check how `chatId`, `messages`, and `variables` are written in the historical message range and answer constraints.

Business test: extract three terms and check whether their wording is consistent throughout the whole document, and confirm that the translated names can refer back to the original text.

- Check the current value of memory turns in the application settings, match it with the range of earlier text required by the question, and compare the usage records of two runs.
- Extract three terms and check the fields, dates, and signatures of the program plan, course syllabi, and credit structure table one by one, and confirm that the same record has consistent wording and synchronized versions.
