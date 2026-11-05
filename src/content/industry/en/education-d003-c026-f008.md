---
title: Workflow Orchestration for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c026-f008
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Workflows | Intake
meta_description: Degree Certificates: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses Q&A intake and missing-item follow-up in the degree conferral and certificate information reporting scenario. The source materials are three types: degree application forms, thesis review forms, and defense resolutions, and the update cadence advances on a rolling basis with batch intake and supplementary reporting. The degree application form carries the applicant's basic information, discipline and major, and training-stage fields; the thesis review form carries the review conclusion, review date, and reviewer signature; the defense resolution carries the defense conclusion, voting result, defense date, and committee signatures. When the three material types enter workflow orchestration, their roles differ: the degree application form is used to locate the record subject and key fields, while the thesis review form and defense resolution are used to cross-check the consistency of the name, quantity, date, and signatures of the same record. Field characteristics manifest as follows: for the same record, the name spelling, number of copies, and date nodes across materials are prone to mismatch, and version desynchronization and missing signatures or receipts are also common; therefore, the intake stage needs to first identify missing items and ask follow-up questions, then forward to the handler.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "Intake records and items to be completed" are continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Check whether the applicant name, discipline and major, application date, and training-stage signature are complete, and whether the same record has inconsistent name spellings | In the node, check the options and branch connections one by one, trigger one interaction, view the node status in the run record, and reference `variables` and `nodeId` in subsequent nodes and run a trial |
| Thesis review form | Check the review conclusion, review date, reviewer signature, and number of copies, and whether the date and quantity of the same record as in the degree application form mismatch | In the node, check the options and branch connections one by one, trigger one interaction, view the node status in the run record, and reference `variables` and `nodeId` in subsequent nodes and run a trial |
| Defense resolution | Check the defense conclusion, voting result, defense date, and committee signatures, and whether signatures or receipts are missing or the version is not synchronized | In the node, check the options and branch connections one by one, trigger one interaction, view the node status in the run record, and reference `variables` and `nodeId` in subsequent nodes and run a trial |
| User selection node | Each option corresponds to one branch, the selection result variable has been passed to subsequent nodes, and the process does not stall after the interaction is completed | In the node, check the options and branch connections one by one, trigger one interaction, view the node status in the run record, and reference `variables` and `nodeId` in subsequent nodes and run a trial |

## Three common errors

- Symptom: the name, number of copies, and date of the same record do not match between the degree application form and the thesis review form. Cause: the two materials are filled in at different stages, the field definitions are not unified, and no cross-comparison is performed at intake.
- Symptom: the version of the defense resolution is not synchronized, and the old conclusion and the new voting result exist at the same time. Cause: after the material is updated, it is not written back to the intake record, and the workflow branch still continues execution according to the old version's fields.
- Symptom: the thesis review form or defense resolution is missing a signature or receipt but still enters the next stage. Cause: missing-item identification does not ask follow-up questions at the intake stage, and the branch direction is not routed according to the missing-item situation.

## How to verify the setup

This feature's acceptance: run a trial for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, that `variables` and `nodeId` have been passed to subsequent nodes, and that the process continues execution after the interaction is completed.

Business test: submit a question that is missing key information, see whether it asks follow-up questions first before answering, and check whether the intake record and the items to be completed list the missing items and whether the answer has a material basis.

- In the node, check the options and branch connections one by one, trigger one interaction, and view the node status and branch direction in the run record.
- Reference `variables` and `nodeId` in subsequent nodes and run a trial once, and check whether the interaction state record is consistent with the missing-item follow-up in the intake record.
