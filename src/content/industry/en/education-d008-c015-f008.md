---
title: Workflow Orchestration for School Mental Health Screening and Referrals: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c015-f008
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Workflows | Access
meta_description: Student Mental Health: review workflows for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for School Mental Health Screening and Referrals: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. Materials include screening plans, interview records, and referral forms. The screening plan contains scale names, screening dates, classes, and number of students; interview records contain student pseudonyms, interview times, and interviewer signatures; referral forms contain referral targets, referral reasons, and recipient acknowledgments. After the three types of materials enter the workflow, their roles differ: the screening plan provides the basis for entry points and authorization scope, while interview records and referral forms serve as the source of fields to be verified by subsequent branch nodes. Materials are updated by semester; the screening plan is revised before each round of screening, and interview records and referral forms are supplemented in real time with individual cases. Field characteristics require that dates, names, quantities, signatures, and acknowledgments must be consistent. If the name, quantity, or date of the same record does not match across two materials, verification is triggered. Authorized access and external services require that visitor identity matches the visible scope; unauthorized access must not be visible. When opening to parents or superiors, only the fields permitted by the corresponding branch are displayed.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. "External entry points and authorization scope" are completed by subsequent nodes continuing execution along the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The scale names, screening dates, classes, and number of students in the screening plan must be consistent item by item with the corresponding fields in interview records and referral forms; the authorization scope must match identity, and unauthorized access must not be visible | In the node, check the options and branch connections one by one, and confirm the entry point and authorization scope corresponding to the screening plan; trigger once, view the node status in the run record, and reference `variables` for a trial run |
| Interview record | The student pseudonyms, interview times, and interviewer signatures in interview records must match the names, dates, and quantities in the screening plan and referral forms; if a signature is missing, it cannot enter the external branch | In subsequent nodes, reference `variables` and run a trial once to check whether the interview record fields are correctly passed along the branch direction; view the selection result variable of the node corresponding to `nodeId` |
| Referral form | The referral targets, referral reasons, and recipient acknowledgments in the referral form must be consistent with the dates and names in the screening plan and interview records; if the version is not synchronized or the acknowledgment is missing, it cannot be external | In the node, check the options and branch connections corresponding to the referral form; trigger once, view the node status and `nodeId` in the run record, and confirm that the acknowledgment field continues execution along the branch |

## Three common errors

- Symptom: The pseudonym and date of the same student do not match between the screening plan and the interview record. Cause: The two materials were entered separately, and the name, quantity, and date were not checked against the same record.
- Symptom: The referral form version is not synchronized, and the recipient sees an old version of the reason. Cause: After the material was updated, the branch was not re-triggered, and the run record still points to the old node status.
- Symptom: An interview record or referral form lacks a signature or acknowledgment but still enters the external branch. Cause: The options and branch connections were not checked one by one, and subsequent nodes did not validate the signature field.

## How to verify the setup

Acceptance of this feature: run trials for each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and reference `variables` in subsequent nodes to check the node status of `nodeId`.

Business test: access once with a restricted identity and see whether the visible scope matches the settings.

- In the node, check the options and branch connections one by one, and confirm the entry points and authorization scopes corresponding to the screening plan, interview record, and referral form.
- Trigger the user selection node once, view the node status in the run record, and reference `variables` in subsequent nodes for a trial run to check whether the selection result variable has been passed to subsequent nodes.
