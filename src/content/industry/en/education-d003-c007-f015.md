---
title: Knowledge Base Retrieval for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c007-f015
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Retrieval | Intake
meta_description: School Enrollment: review retrieval for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Enrollment Records and Status Changes: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the scenarios of primary and secondary school student status establishment and changes, involving three types of materials: student status records, transfer applications, and suspension/resumption materials. Student status records capture students' basic information and enrollment status; transfer applications carry the application and approval fields for cross-school mobility; suspension/resumption materials mark the start and end dates and signatures of student status changes. The materials come from the daily acceptance and archiving of schools and student status management departments, and the update cadence is triggered by the beginning of the semester, the end of the semester, and change events. Field characteristics include student name, ID document number, student status number, change type, effective date, handler signature, school seal, and receipt. When entering the knowledge base retrieval and recall function, the three types of materials each serve as candidate segment sources, and after being split by field they participate in semantic and full-text recall, providing material evidence for acceptance records and follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after pattern, merge, rerank, filter, and upper-limit truncation). Acceptance records and follow-up questions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status record | Whether name, student status number, date of birth, enrollment status, and signature/seal are consistent with the transfer application | In the search test, switch `searchMode` to hybrid, check whether the student status number and date fields in the candidate segments are complete, and record the number of candidates and scores |
| Transfer application | Whether the application date, transferring-out and transferring-in schools, handler signature, and receipt correspond to the student status record | Compare the order of the first few candidates before and after enabling `usingReRank`, and confirm whether the application date and signature fields are hit at the same time |
| Suspension/resumption materials | Whether the suspension start and end dates, resumption date, approval signature, and student status record change records are synchronized | Adjust the `similarity` threshold to observe candidate changes, and check whether the date and signature fields fall within the same segment |
| Acceptance records and follow-up questions | Whether missing items are identified and asked about, and whether the answer cites candidate segments as material evidence | Test once each with synonymous rewritten questions, compare candidates and scores, and check whether the follow-up items correspond to missing fields |

## Three common errors

- Phenomenon: The name or student status number of the same student does not match between the student status record and the transfer application. Cause: The two materials were entered at different times, and no field-level comparison was performed.
- Phenomenon: The version of the suspension/resumption materials is not synchronized, and the old version's dates are still in the candidate segments. Cause: After the materials were updated, they were not re-split and stored, so recall still hits the old segments.
- Phenomenon: The transfer application lacks a handler signature or receipt, but the answer gives a complete conclusion. Cause: The candidate segments do not cover the signature field, yet they are still cited after similarity filtering.

## How to verify the setup

Acceptance of this function: test once each with synonymous rewritten questions, compare candidate segments and similarity scores, then toggle rerank on and off to see the ordering of the first few results; record the number of candidates and scores, and when a citation limit is involved, check the tokens of the cited text, record the array count separately, and check the values of `searchMode`, `similarity`, and `usingReRank`.

Business test: ask a question missing key information and see whether it asks a follow-up question before answering.

- In the knowledge base search test, switch the retrieval mode, compare whether the candidate segments contain both semantic and full-text results, and record the number of candidates and scores.
- Compare the order of the first few candidates before and after enabling rerank, and check whether the date and signature fields in the student status records, transfer applications, and suspension/resumption materials are complete.
