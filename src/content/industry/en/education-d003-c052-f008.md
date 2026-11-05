---
title: Workflow Orchestration for College Admissions and Application Placement: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c052-f008
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Workflows | Intake
meta_description: College Admissions: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for College Admissions and Application Placement: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the general higher education institution admissions enrollment filing category come from the enrollment plans, filing rules, and admission rosters that provincial admissions offices and higher education institution admissions offices transfer batch by batch during the admission cycle. The enrollment plan provides the institution-major group, planned number, and subject selection requirements; the filing rules provide the filing ratio, tie-breaking handling, and adjustment criteria; the admission roster provides the candidate number, filing score, major, and admission conclusion. The update rhythm advances by batch, with each batch containing two time points: pre-filing verification and post-filing receipt, and the fields include date and signature. When the three types of materials enter this function, their roles differ: the enrollment plan and filing rules serve as the basis for follow-up questions, while the admission roster serves as the answer anchor; the acceptance record and the completed question items are continued and completed by subsequent nodes according to branches.

## Configuration and implementation checks

This link is executed by workflow nodes (user selection and branching), outputting the branch direction and interaction status record. The acceptance record and the completed question items are continued and completed by subsequent nodes according to branches. When a node is triggered, the conversation enters an interaction state and records the workflow status; after the user completes the selection, the branch corresponding to the selected option is followed for continued execution.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | Whether the institution-major group name, planned number, subject selection requirements, and publication date are consistent with the filing rules, and whether the admissions office signature is missing | Compare item by item the name, quantity, and date of the same major group in the two materials, check the signature field and receipt, and reference `nodeId` to locate the node |
| Filing rules | Whether the filing ratio, tie-breaking handling, and adjustment criteria correspond to the conclusions in the admission roster, and whether the version is synchronized | Check the rule version number and roster conclusions by batch; when the date and signature are inconsistent, record the pending supplementary item in the follow-up branch |
| Admission roster | Whether the candidate number, filing score, major, and admission conclusion match the enrollment plan and filing rules, and whether the receipt is missing | Compare cell by cell the name, quantity, and date of the same record across the three materials; when a signature or receipt is missing, trigger a follow-up question, and `variables` carries the selection result |
| Acceptance record | Whether missing items are identified and followed up, and whether the answer has a material basis | Ask a question that lacks key information, first check whether the follow-up branch is triggered, then check the completed question items and the material source |

## Three common errors

- Phenomenon: The major name or planned number for the same candidate does not match across two materials. Cause: The admission roster and enrollment plan are entered in different batches, and the names and quantities have not undergone same-source verification.
- Phenomenon: The filing rule version is not synchronized, and the basis for the follow-up question conflicts with the roster conclusion. Cause: After the rules are updated, the old version is still referenced, and the date and signature fields are not re-signed with the version.
- Phenomenon: The acceptance record lacks a signature or receipt, and no conclusion can be reached even after follow-up. Cause: The material circulation link does not return the signed document, and the completed question items lack a verifiable basis.

## How to verify the setup

This function's acceptance: run through each option, check the branch direction and interaction status in the run record, and confirm that the options are consistent with the branch connections and that the selection result variable has been passed to subsequent nodes.

Business test: ask a question that lacks key information, see whether it first follows up and then answers, and check the completed question items and material basis.

- In the node, check the options and branch connections one by one, trigger once, and view the interaction status and branch direction in the run record.
- In a subsequent node, reference the selection result variable and run once, and check whether `variables` and `nodeId` are passed according to the branch.
