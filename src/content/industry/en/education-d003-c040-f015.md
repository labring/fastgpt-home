---
title: Knowledge Base Retrieval for New Employee Onboarding and Training: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c040-f015
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Retrieval | Intake
meta_description: Employee Onboarding: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for New Employee Onboarding and Training: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses question acceptance and missing-item follow-up for enterprise new employee onboarding training scenarios, involving materials including onboarding training plans, course sign-in sheets, and job descriptions. Onboarding training plans usually contain training topics, dates, instructors, target participants, and approval signatures; course sign-in sheets contain course names, dates, participant names, and sign-in handwriting; job descriptions contain job titles, responsibility items, qualification requirements, and department confirmation fields. Materials enter the knowledge base as versioned files, with update cadence following training batches and job adjustments, and field characteristics being multiple headers, multiple dates, and multiple signature positions. When entering this function, the onboarding training plan assumes the role of training arrangements and process basis, the course sign-in sheet assumes the role of participation facts and attendance verification, and the job description assumes the role of job requirements and responsibility boundaries. Together, the three support missing-item identification and follow-up questions. For example, when a question lacks a job title or batch, material fragments first fill the gap, and then an acceptance record and completed question items are generated.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). "Acceptance record and completed question items" are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Check whether the training topic, date, target participants, and approval signature are complete, and whether missing items trigger follow-up questions | In the knowledge base search test, retrieve with synonymous questions, switch `searchMode` to compare candidates, record the number of candidates and scores, and check whether date and signature fields are recalled |
| Course sign-in sheet | Check whether the course name, date, participant names, and sign-in handwriting are consistent with the plan, and whether the quantity and dates match | Test once each with synonymous questions, compare candidates and scores, enable `usingReRank` to see the ranking of the top few, and verify whether names and dates are hit at the same time |
| Job description | Check whether the job title, responsibility items, qualification requirements, and department confirmation field are complete, and whether the version is synchronized | Adjust `limit` to observe changes in the number of candidates, verify and record the tokens of the quoted text and the number of array items separately, and check whether responsibility items are fully recalled |
| Acceptance record and completed question items | Check whether missing items are identified and followed up, and whether answers are based on materials | In the search test, ask a question missing key information, see whether it first asks a follow-up question before answering, and compare whether the candidate fragments and `similarity` scores support the follow-up question |

## Three common errors

- Phenomenon: The dates of the same record in the onboarding training plan and the course sign-in sheet do not match. Cause: Material versions are not synchronized, update cadence is inconsistent, and retrieval hits fragments from different batches.
- Phenomenon: The job description lacks a department confirmation signature or receipt. Cause: Material archiving is incomplete, missing fields are not identified, and follow-up questions are not triggered.
- Phenomenon: The quantity for the same course name is inconsistent between the plan and the sign-in sheet. Cause: The two materials are maintained separately, and field alignment is not performed during merged retrieval.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and similarity scores, then toggle rerank on and off to see the ranking of the top few, and record the number of candidates and scores.

Business test: ask a question missing key information, see whether it first asks a follow-up question before answering, and verify whether the follow-up items come from material fragments.

- In the knowledge base search test, switch `searchMode` to compare the number of candidates and scores for semantic, full-text, and hybrid modes.
- Compare the order of the top few before and after enabling `usingReRank`, adjust `limit` to observe changes in the number of candidates, and record the tokens of the quoted text separately.
