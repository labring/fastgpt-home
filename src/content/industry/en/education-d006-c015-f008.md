---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Progress
meta_description: Student Mental Health: review workflows for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Track Progress and Check Statistics

## What this category's data looks like

Materials for mental health screening and referral in primary and secondary schools include psychological screening plans, interview records, and referral forms. The plan specifies the scale, screening date, and the signature of the responsible teacher; the interview record contains the student's name, interview date, and interviewer's signature; the referral form lists the referral subject, referral date, and the recipient's receipt. The three types of materials enter progress records and statistical verification on a weekly or monthly basis, each with a different role: the plan provides the screening criteria, the interview record provides the process counts, and the referral form provides the destination and receipt. Field characteristics are name, quantity, date, signature, and version number. The source is submissions from the school psychology center and homeroom teachers, and the update rhythm is synchronized with the screening cycle and referral progress. When entering workflow orchestration, the plan, interview record, and referral form serve respectively as the basis for branch judgment and as execution input for subsequent nodes, and the user selects nodes to record the interaction state.

## Configuration and implementation checks

This stage is executed by workflow nodes (user selection and branching), outputting the branch direction and interaction state records. The "Progress Table and Statistical Criteria Description" is continued and completed by subsequent nodes according to the branch. When the user selection node is triggered, the conversation enters the interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The screening date, scale name, responsible teacher's signature, and version number in the plan must be aligned item by item with the interview records and referral forms | Check the options and branch connections one by one in the node, and check whether `variables` carry out the plan version and date |
| Interview record | The student's name, interview date, interviewer's signature, and quantity in the interview record must be consistent with the plan roster and the referral form receipt | Trigger once, view the node status in the run record, and check the branch corresponding to `nodeId` and the interview record fields |
| Referral form | The referral subject, referral date, recipient's receipt, and signature in the referral form must be consistent with the interview records and the plan criteria | Reference the selection result `variables` in subsequent nodes and run a trial once, and check the referral form quantity and date |
| Progress table and statistical criteria description | The header must state the statistical criteria and exception notes, and the recorded counts must match the statistical counts | Use one week of records to check the totals, and check whether the criteria and exceptions are clearly stated |

## Three common errors

- Phenomenon: The same student's name, quantity, and date do not match between the plan and the interview record. Cause: The two materials are entered separately and are not checked against a unified criterion.
- Phenomenon: The referral form version is not synchronized, and old-version receipts are mixed into the statistics. Cause: After the material is updated, the version is not reselected in the branch.
- Phenomenon: The interview record or referral form lacks a signature or receipt. Cause: The submission stage does not check the signature field, and subsequent nodes directly aggregate.

## How to verify the setup

Acceptance of this feature: Run trials option by option, check the branch direction and interaction state in the run records, confirm that each option corresponds to one branch, that the selection result variables have been passed to subsequent nodes, and check the `variables` and `nodeId` records.

Business test: Use one week of records to check the totals, and see whether the criteria and exceptions are clearly stated.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Trigger the user selection node once, and view the node status and branch direction in the run record.
