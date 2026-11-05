---
title: Workflow Orchestration for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c056-f008
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Workflows | Intake
meta_description: Teacher Qualifications: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information

## What this category's data looks like

Teacher qualification exam and certification materials include written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. Registration form fields include name, ID number, application category, subject, date, and signature; the Mandarin proficiency certificate includes grade, certificate number, test date, issuing authority, and seal; the medical examination form includes examination items, conclusion, examination date, and physician signature. These materials are updated according to exam and certification batches; the registration form is refilled for each application, the Mandarin proficiency certificate is valid long-term but versions may not be synchronized, and the medical examination form has a clear validity period. When entering the Q&A intake and missing-item follow-up function, the registration form serves as the primary source of identity and application information, while the Mandarin proficiency certificate and medical examination form serve as qualification supporting evidence; the name, quantity, and date in the same record across the three materials need to be cross-checked, and when a signature or receipt is missing, ask follow-up questions first before answering.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction status records. The "intake record and items to be completed" are continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow status; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether name, application category, subject, date, and signature are complete and consistent with the Mandarin proficiency certificate and medical examination form | Check the options and branch connections one by one in the node, trigger once to view the node status in the run record, and reference the selection result variable in a subsequent node for a trial run |
| Mandarin proficiency certificate | Whether grade, certificate number, test date, issuing authority, and seal are complete, and whether the version is synchronized with the registration form | Check whether the certificate number and test date correspond to the registration form, check whether the seal and version are synchronized, and follow the follow-up branch when items are missing |
| Medical examination form | Whether examination items, conclusion, examination date, and physician signature are complete and within the validity period | Check whether the examination date and conclusion match the dates on the registration form and Mandarin proficiency certificate, and when a signature or receipt is missing, ask follow-up questions first before answering |
| Selection result variable | Has been passed to subsequent nodes and the branch direction is consistent with the selection | Reference this variable in a subsequent node and run a trial once, checking the branch direction and interaction status in the run record |

## Three common errors

- Phenomenon: The name and date of the same record do not match between the registration form and the Mandarin proficiency certificate. Cause: The two materials are filled in separately without cross-checking.
- Phenomenon: The version of the Mandarin proficiency certificate is not synchronized, and the old version seal coexists with the new version registration information. Cause: The materials are updated at different paces, and no follow-up question was triggered.
- Phenomenon: The medical examination form lacks a physician signature or receipt, but still enters the subsequent process. Cause: After the interaction is completed, the process stops and does not continue follow-up according to the branch.

## How to verify the setup

This function acceptance: run trials option by option, check the branch direction and interaction status in the run record, confirm that the selection result variable has been passed to subsequent nodes, and check whether the `variables` and `nodeId` references are correct.

Business test: submit a question missing key information and see whether it asks follow-up questions first before answering.

- Check the options and branch connections one by one in the node, and trigger once to view the node status in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, checking whether `variables` and `nodeId` correspond.
