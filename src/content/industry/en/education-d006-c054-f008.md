---
title: Workflow Orchestration for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c054-f008
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Workflows | Progress
meta_description: Self-Study Exams: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Self-Study Exam Records and Graduation Review: Track Progress and Check Statistics

## What this category's data looks like

Self-taught examination registration and graduation review materials mainly consist of registration archives, course qualification certificates, and graduation application forms. They are sourced from provincial examination offices and main examining institutions' archives, and are updated by examination session and batch. Registration archives record candidates' basic information and enrollment status; course qualification certificates record individual subject scores and qualification dates; graduation application forms carry the completion status of the professional plan and signed receipts. When materials enter the workflow, registration archives serve as the identity and qualification base, course qualification certificates serve as the basis for counting by course dimension, and graduation application forms serve as the carrier for graduation conclusions and signature verification. Field characteristics are concentrated in name, admission ticket number, course code, qualification date, signature, and receipt fields. Progress records and statistical reconciliation require aggregating the three types of materials under the same criteria to form a progress table and statistical criteria description, which then enter weekly or monthly reports.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. The "progress table and statistical criteria description" is completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, the corresponding option is followed to continue execution along the branch.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | Name, admission ticket number, enrollment status, and date must correspond item by item with course qualification certificates and graduation application forms; signature and receipt fields must not be missing | Check options and branch connections one by one in the node, reference `variables` and `nodeId` to locate records, and trigger once to view the node status in the run records |
| Course qualification certificates | Course code, qualification date, and quantity must be consistent across the three materials; the same course must not appear with two different dates or different names | Reference the selection result variable in subsequent nodes and run a trial once to check whether the course dimension counts of course qualification certificates and registration archives match |
| Graduation application forms | Professional plan completion status, signature, and receipt must be synchronized with registration archives and course qualification certificates; when versions are not synchronized, the latest archived version shall prevail | Check the signature and receipt fields of the graduation application form, and verify whether the name, quantity, and date of the same record are consistent across the two materials |
| Progress table and statistical criteria description | Record counts and statistical counts must match; criteria must be written in the header; exceptional cases must be listed separately | Use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and include them in weekly or monthly reports |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between registration archives and course qualification certificates. Cause: The two materials were archived in different batches and were not checked item by item under the same criteria.
- Phenomenon: The version of the graduation application form is not synchronized, and signatures or receipts are missing. Cause: After materials were updated, the interaction status record was not triggered, and the branch direction was inconsistent with the latest archive.
- Phenomenon: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: Options and branch connections were not checked one by one, and the selection result variable was not passed to subsequent nodes.

## How to verify the setup

Acceptance of this function: run trials for each option one by one, check the branch direction and interaction status in the run records, and confirm that `variables` and `nodeId` are correctly referenced in subsequent nodes.

Business test: use one week of records to verify the totals, check whether the criteria and exceptions are clearly stated, and include the progress table and statistical criteria description in weekly or monthly reports.

- Check options and branch connections one by one in the node, and trigger once to view the node status and interaction status in the run records.
- Reference the selection result variable in subsequent nodes and run a trial once to check whether the course dimension counts of course qualification certificates and registration archives match.
