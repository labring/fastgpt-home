---
title: Multi-Turn Conversation and Prompts for Grade Entry and Credit Recognition: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c020-f005
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Conversation | Multilingual
meta_description: Grades and Credits: review conversation for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Grade Entry and Credit Recognition: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the grade entry and credit recognition category; the materials include three types: transcripts, deferred examination applications, and make-up examination arrangements. The transcript is the primary basis for credit recognition, with fields including course name, credits, grade, grade point, semester, and signature field; the deferred examination application records the reason for deferral, original examination date, approval opinion, and receipt; the make-up examination arrangement gives the make-up course, time, location, invigilator, and signature. The three types of materials come from different sources: transcripts are exported from the academic affairs system, deferred examination applications are submitted by students and then approved and archived, and make-up examination arrangements are published by the course-offering unit. In terms of update cadence, transcripts are updated with grade release batches, deferred examination applications are updated with approval milestones, and make-up examination arrangements are published in a concentrated manner before the examination. When the materials enter the multi-turn dialogue and prompt feature, the transcript serves as the terminology baseline, while the deferred examination application and make-up examination arrangement serve as comparison drafts, used to check whether the same course, same date, and same signature are written consistently across the materials, and based on this to produce a unified terminology list and comparison drafts.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, outputting the historical message range and answer constraints for reference. The "unified terminology list and comparison drafts" is then completed by the model. The memory turns control how many previous dialogue turns can be referenced at most when answering; the value only needs to match the preceding context range required by the question.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | The course name, credits, grade, grade point, semester, and signature field are written consistently across the materials | Check the memory turns value in the application settings, run a trial with two consecutive follow-up questions, and check whether the second question picks up the reference from the first question |
| Deferred examination application | The reason for deferral, original examination date, approval opinion, and receipt fields match the same record in the transcript | Compare the usage records of two runs to confirm that the run consumption changes accordingly after the turns are adjusted |
| Make-up examination arrangement | The make-up course, time, location, invigilator, and signature are consistent with the dates in the transcript and deferred examination application | View the historical message range in `messages`, and check the `variables` values of the session corresponding to `chatId` |
| Unified terminology list and comparison drafts | The same term is consistent throughout the whole text, and the translated name can refer back to the source text | Sample three terms to check whether their wording is consistent throughout the whole text, and check that the tokens of the quoted text and the number of array entries are recorded separately |

## Three common errors

- Symptom: the same course has different name spellings in the transcript and the make-up examination arrangement. Cause: the two materials come from different sources, the terminology is not unified, and the versions are not synchronized.
- Symptom: the original examination date in the deferred examination application does not match the date recorded in the transcript. Cause: the approval receipt was not archived, and the fields were not checked against the same record.
- Symptom: the make-up examination arrangement lacks the invigilator signature or receipt. Cause: signatures were not collected at the publishing step, and no completeness check was done before the materials entered the dialogue.

## How to verify the setup

Feature acceptance: with two consecutive follow-up questions, see whether the second question picks up the reference from the first question; if the turns are too few, the preceding context cannot be used, and if too many, irrelevant content is brought in and consumption increases.

Business test: sample three terms to check whether their wording is consistent throughout the whole text, and check whether the translated names can refer back to the source text.

- Check the current memory turns value in the application settings, and match it with the preceding context range required by the question
- Run a trial with two consecutive question sentences, and check whether the second round correctly picks up the reference from the first round
