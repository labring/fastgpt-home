---
title: Workflow Orchestration for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c054-f008
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Workflows | Intake
meta_description: Self-Study Exams: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Self-Study Exam Records and Graduation Review: Handle Questions and Collect Missing Information

## What this category's data looks like

The intake materials for self-taught examination registration records and graduation review mainly come from three types: registration records, course qualification certificates, and graduation application forms. Registration records are updated by the provincial registration database by examination session, with fields including name, admission ticket number, ID number, major name, course code, score, and date obtained; course qualification certificates are issued by the main examining institution by batch, with fields including course name, credits, qualification date, certificate number, and handler signature; graduation application forms are filled in by candidates, preliminarily reviewed by the study assistance center, and re-reviewed by the main examining institution, with fields including applied major, intended graduation time, photo, signature, and receipt. When these three types of materials enter Q&A intake and missing-item follow-up, registration records serve as the identity and course ledger, course qualification certificates serve as single-subject qualification evidence, and graduation application forms serve as graduation intent and approval trail; if any one is missing, the review chain will stop at the follow-up stage.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. "Intake records and items to be completed" are then continued and completed by subsequent nodes according to the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether name, admission ticket number, ID number, major name, course code, score, and date obtained correspond item by item with the course qualification certificate | Check the options and branch connections one by one in the node, and reference `variables` in a subsequent node to run a trial once |
| Course qualification certificate | Whether course name, credits, qualification date, certificate number, and handler signature are complete, and whether the name, quantity, and date of the same course are consistent across the two materials | Trigger once, view the node status in the run record, and confirm that `nodeId` corresponds to the branch direction |
| Graduation application form | Whether applied major, intended graduation time, photo, signature, and receipt are complete, and whether the version is synchronized with the latest registration records | Reference this variable in a subsequent node and run a trial once, and check whether missing-item follow-up asks first before answering |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match between the registration records and the course qualification certificate. Cause: The two materials were entered in different batches, the field definitions were not aligned, and the missing-item follow-up did not first check the ledger.
- Symptom: The version of the graduation application form is not synchronized, and the old major name or old course code is still used. Cause: The materials are updated at different paces, the latest registration records were not compared during intake, and the follow-up direction deviated.
- Symptom: The course qualification certificate lacks a handler signature or the graduation application form lacks a receipt. Cause: The preliminary review stage only collects electronic copies, the signature and receipt fields were not included in the missing-item determination, and the follow-up did not cover them.

## How to verify the setup

Acceptance of this function: run trials on each option one by one, check the branch direction and interaction status in the run record, and confirm that `variables` have been passed to subsequent nodes and that `nodeId` corresponds to the correct branch.

Business test: submit a question missing key information and see whether it asks first before answering.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, and check whether missing-item follow-up asks first before answering.
