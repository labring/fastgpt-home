---
title: Tool Calls and Plugins for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c054-f009
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Tool Calls | Intake
meta_description: Self-Study Exams: review tool calls for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on the self-taught examination registration records and graduation review category. The materials include three types: registration records, course qualification certificates, and graduation application forms. Registration records come from the provincial registration record system export, are updated by exam session, and the fields include name, admission ticket number, major, course name, score, and date obtained; course qualification certificates are issued by the main examining institution, are updated by course batch, and the fields include course code, course name, qualification date, and seal; graduation application forms are filled in by the candidate and initially reviewed by the handler, are updated by graduation batch, and the fields include name, ID number, major, number of courses, signature, and receipt. When these three types of materials enter the Q&A intake and missing-item follow-up function, registration records serve as the main record providing the course and score baseline, course qualification certificates serve as cross-verification evidence, and graduation application forms serve as the basis for application intent and signature receipt; missing-item follow-up identifies and asks about gaps accordingly.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The intake record and the completed follow-up questions are then handled by subsequent AI nodes or manual review.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether the fields include name, admission ticket number, major, course name, score, and date obtained, and whether they align item by item with the course qualification certificates | Open the registration record export, check field completeness and date format, and compare course names and dates obtained with the course qualification certificates |
| Course qualification certificates | Whether the course code, course name, qualification date, and seal are complete, and whether the name, quantity, and date of the same course are consistent with the registration records | Check the seal and date of each certificate one by one, and mark course names or quantities that are inconsistent with the registration records |
| Graduation application forms | Whether the name, ID number, major, number of courses, signature, and receipt are complete, and whether the number of courses is consistent with the number of passed courses in the registration records | Check the signature and receipt on the application form, and verify the number of courses against the statistical results of the registration records |
| Tool calling node | Whether the tool description, parameter description, and whether it is required correspond to the business material fields, and whether the diamond interface is connected to the target tool | Check the diamond connection and node status on the canvas, run a trial with a question missing required parameters, and observe the call records of `toolChoice` and `functionCall` |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match between the registration records and the course qualification certificate. Cause: The two sets of materials come from different sources and are updated on different schedules, and no item-by-item comparison was performed.
- Symptom: The version of the graduation application form is not synchronized, and the number of courses is inconsistent with the statistical results of the registration records. Cause: The application form is updated by graduation batch, while the registration records are updated by exam session, and the versions are not aligned.
- Symptom: The graduation application form lacks a signature or receipt, but the intake record still proceeds to the next step. Cause: Missing-item identification does not cover the signature and receipt fields, and follow-up is not triggered.

## How to verify the setup

Acceptance of this function: run a trial with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it follows up or calls according to the description; at the same time, check `toolChoice`, `functionCall`, and the connection status of the tool calling node.

Business test: submit a question missing key information and see whether it follows up first before answering.

- Open the description field and parameter configuration of the tool node item by item, and check whether the three items—description, parameter description, and whether it is required—correspond to the fields of the registration records, course qualification certificates, and graduation application forms.
- Check the diamond interface connection and node status on the canvas, run a trial with a question missing required parameters, and keep the call record.
