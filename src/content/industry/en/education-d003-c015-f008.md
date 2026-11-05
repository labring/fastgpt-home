---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Intake
meta_description: Student Mental Health: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario. The materials include three types: psychological screening plans, interview records, and referral forms. The psychological screening plan provides screening dimensions, tools, and judgment criteria, and is the draft basis for intake Q&A; the interview record carries the Q&A intake process and traces of missing-item follow-up; the referral form carries the destination handled by the referral handler and must align with the fields of the aforementioned materials. Materials are mostly updated by semester or batch, come from the school psychology center and grade groups, and the update cadence is synchronized with the screening cycle. Field characteristics center on name, quantity, date, signature, and receipt: the name, quantity, and date of the same record in the three materials must be consistent, versions must be synchronized, and signatures and receipts must be complete. When materials enter this function, the plan serves as the basis for judgment, the interview record serves as the carrier for completing the question items, and the referral form serves as the destination evidence; together the three support the intake record and the completed question items.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch direction and interaction state records. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option. "The intake record and the completed question items" are completed by subsequent nodes continuing execution along the branch; the node itself does not make choices for the user, nor does it produce a business deliverable.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The screening dimensions, tools, and judgment criteria must be consistent with the name, quantity, and date in the interview record and referral form, and versions must be synchronized | Check the fields and dates of the plan against the interview record and referral form one by one, check whether signatures and receipts are complete, and check the options and branch connections one by one in the node |
| Interview record | Missing items in the interview record must be identified and followed up on, answers must have material basis, and dates and signatures must align with the plan and referral form | Reference the selection result variable in a subsequent node and run a trial once, check whether follow-up questions precede answers, and check whether the name, quantity, and date of the same record in the two materials do not match |
| Referral form | The fields, dates, and signatures of the referral form must be consistent with the plan and interview record, receipts must be complete, and versions must be synchronized | Trigger the user selection node once, view the node status in the run record, and check the branch direction and interaction state record handled by the referral handler |
| User selection node | Each option corresponds to one branch, the interaction state is recorded, and the selection result variable has been passed to subsequent nodes | Check the options and branch connections one by one in the node, reference this variable in a subsequent node and run a trial once, and check the branch direction in the run record |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the screening plan and the interview record. Cause: The two materials were entered separately, without field alignment and cross-checking.
- Symptom: The referral form version is not synchronized and is inconsistent with the plan's criteria. Cause: After the plan was updated, it was not written back to the referral form, and version management lacks a synchronization node.
- Symptom: The interview record lacks a signature or the referral form lacks a receipt, making the intake record incomplete. Cause: The signing and receipt steps were not included in branch checking, and after omission the process directly entered subsequent nodes.

## How to verify the setup

This function's acceptance: run trials option by option, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch and that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` in a subsequent node and run a trial for each.

Business test: submit a question that lacks key information, see whether it follows up before answering, check that missing items are identified and followed up on and that answers have material basis, then refer to the handler for processing.

- Check the options and branch connections one by one in the node, trigger the user selection node once, and view the node status and branch direction in the run record.
- Reference the selection result variable in a subsequent node and run a trial once, and check the passing of `variables` and `nodeId` and whether follow-up questions precede answers.
