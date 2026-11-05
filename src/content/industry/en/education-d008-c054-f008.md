---
title: Workflow Orchestration for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c054-f008
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Workflows | Access
meta_description: Self-Study Exams: review workflows for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services

## What this category's data looks like

Self-taught examination registration records and graduation review involve three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records are updated by the provincial examination office after each unified examination, with fields including examination registration number, name, ID number, major name, course name, score, date obtained, host institution, signature, and seal. Course qualification certificates are issued course by course, with fields including course code, course name, qualification date, score, certificate number, and handler's signature. Graduation application forms are filled out by candidates and initially reviewed by the study assistance center, with fields including name, major, intended graduation time, number of courses, exempted courses, signature, and receipt. After the three types of materials enter the workflow, each has a different role: registration records are the underlying account of identity and scores, course qualification certificates are the per-course evidence, and graduation application forms are the entry form that initiates the review. The update rhythm is centralized updates after unified examinations and centralized submissions during graduation application season. The field characteristic is that the same record is scattered across multiple materials, and names, quantities, dates, and signatures need to be cross-checked.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Externally available entry points and authorization scope" are then completed by subsequent nodes continuing execution according to the branch. When a node is triggered, the conversation enters an interaction state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | The name, ID number, and major name in the registration records match the course qualification certificates and graduation application forms item by item, and dates and signatures are complete | Check the options and branch connections one by one in the node, trigger once, then view the node status in the run record to confirm that the registration record fields correspond to the branch direction |
| Course qualification certificates | The course code, course name, qualification date, and score of the course qualification certificates match the same course records in the registration records, with no missing signature or receipt | Reference the selection result variable `variables` in subsequent nodes and run a trial once, checking whether the course qualification certificate fields match the registration records |
| Graduation application forms | The name, major, intended graduation time, and number of courses in the graduation application forms match the summary of the registration records and course qualification certificates, and signatures and receipts are complete | Access once with a restricted identity, check whether the visible scope of the graduation application forms conforms to the settings, and verify in the run record the branch direction corresponding to `nodeId` |
| Authorization scope | The visitor's identity matches the visible scope, unauthorized content is not visible, and the scope open to parents or superiors conforms to the settings | Trigger the node with a restricted identity, check the interaction state record and branch direction, and confirm that the visible scope does not exceed the authorization settings |

## Three common errors

- Symptom: The same candidate's name is written differently in the registration records and the graduation application form. Cause: The two materials are entered in different steps, lacking character-by-character comparison and version synchronization.
- Symptom: The number of courses in the course qualification certificates does not match the number reported in the graduation application form. Cause: Exempted courses are not reflected in the qualification certificates, and the summary criteria are not unified.
- Symptom: The graduation application form lacks the handler's signature or receipt. Cause: The initial review step did not return the signed document, and the version was not synchronized to the review node.

## How to verify the setup

This feature's acceptance: run trials option by option, check the branch direction and interaction state in the run record, and confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes.

Business test: access once with a restricted identity, see whether the visible scope conforms to the settings, and confirm that unauthorized content is not visible.

- Check the options and branch connections one by one in the node, trigger once, then view the node status and `nodeId` in the run record.
- Reference the selection result variable `variables` in subsequent nodes and run a trial once, checking whether the fields of the registration records, course qualification certificates, and graduation application forms are consistent.
