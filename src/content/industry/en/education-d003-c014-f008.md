---
title: Workflow Orchestration for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c014-f008
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Workflows | Intake
meta_description: Pastoral Education: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers three types of materials: thematic class meeting plans, student comprehensive quality records, and home visit records. A thematic class meeting plan contains the class meeting theme, time, location, host, activity flow, and signature fields; a student comprehensive quality record contains fields such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, along with the date and the homeroom teacher's signature; a home visit record contains the student's name, home visit date, home visit teacher, home visit purpose, home visit content, parent signature, and receipt. The sources of the three types of materials are the homeroom teacher's daily reporting, grade group aggregation, and moral education office archiving. The update rhythm is that class meeting plans are submitted weekly, comprehensive quality records are updated per semester, and home visit records are registered per visit. When the materials enter the workflow, the thematic class meeting plan assumes the role of activity basis, the student comprehensive quality record assumes the role of process evaluation, and the home visit record assumes the role of evidence for home-school communication. Together, the three support the determination of question acceptance and missing-item follow-up.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Accepted records and items to be completed" are then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Whether the fields, date, and signature are complete, and whether the class meeting theme, time, location, host, activity flow, and signature fields are aligned item by item | Check the options and branch connections one by one in the node, inspect the plan fields and signature fields, and use `variables` and `nodeId` to locate the branch direction |
| Student comprehensive quality record | Whether fields such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice are consistent with the date and the homeroom teacher's signature | Trigger a run to view the node status in the run record, check the record fields and date, and confirm that the selection result variable has been passed to subsequent nodes |
| Home visit record | Whether the student's name, home visit date, home visit teacher, home visit purpose, home visit content, parent signature, and receipt correspond | Reference this variable in a subsequent node and run a trial once, check the home visit date and receipt, and verify whether the name, quantity, and date of the same record match across the two materials |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across the two materials. Cause: The thematic class meeting plan and the student comprehensive quality record are each reported separately, lacking a cross-check step.
- Symptom: Versions are not synchronized, and an old version of the class meeting plan coexists with a new version of the quality record. Cause: The materials have different update rhythms, and the version and effective date were not marked during archiving.
- Symptom: Missing signature or receipt, with the parent signature field of the home visit record left blank. Cause: The registration step did not list the signature and receipt as required fields, and no follow-up question was asked first during acceptance.

## How to verify the setup

Acceptance of this function: Run trials option by option, check the branch direction and interaction state in the run record, and confirm that `variables`, `nodeId`, and the selection result variable are passed consistently.

Business test: Submit a question that lacks key information, see whether it asks a follow-up question before answering, and whether the missing item is identified and followed up on, and after the answer has material basis, it is transferred to the handler.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch
- Reference the selection result variable in a subsequent node and run a trial once, and view the node status in the run record
