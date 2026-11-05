---
title: Workflow Orchestration for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c061-f008
page_type: 行业问题页
application_area: education
meta_title: Research IP | Workflows | Intake
meta_description: Research IP: review workflows for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information

## What this category's data looks like

Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the name, completers, date, and signature; patent disclosure documents contain the technical solution, inventors, filing date, and seal; software copyright materials contain the version number, development completion date, and receipt. The sources of materials are submissions by researchers, acceptance by management departments, and returns from agencies, and the update cadence fluctuates with application batches, examination opinions, and correction notices. Field characteristics center on names, quantities, dates, signatures, and version numbers. The same record often has mismatched names, quantities, and dates across two materials, unsynchronized versions, and missing signatures or receipts. When entering the Q&A intake and missing-item follow-up function, the three types of materials each take on the role of field verification and missing-item identification: the registration form is used to compare basic achievement information, the disclosure document is used to verify technical content and dates, and the software copyright materials are used to verify versions and receipts. Once a missing item is identified, a follow-up question is triggered.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branches), outputting branch directions and interaction state records. The intake records and the completed question items are then continued and completed by subsequent nodes according to the branches. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature are consistent with the disclosure document | Check the options and branch connections one by one in the node, and view the node status in the run records |
| Patent disclosure document | Whether the inventors, filing date, and seal match the registration form | Reference `variables` in a subsequent node and run a test once to verify the fields of this material |
| Software copyright materials | Whether the version number, development completion date, and receipt are synchronized | Trigger a user selection node once and view the `nodeId` and branch direction in the run records |
| User selection node | Each option corresponds to one branch, and the selection result variable has been passed to subsequent nodes | Check the options and branch connections one by one in the node, and reference this variable in a subsequent node to run a test |

## Three common errors

- Symptom: after selecting an option, it still follows the default branch. Cause: the options and branch connections were not checked one by one, and the branch direction does not match the interaction state record.
- Symptom: the name, quantity, and date of the same record do not match across two materials. Cause: the fields of the achievement registration form and the patent disclosure document were not synchronized, and missing-item identification did not follow up.
- Symptom: the version is not synchronized, and the signature or receipt is missing. Cause: the update cadence of the software copyright materials and the registration form is inconsistent, and the process stops after the interaction is completed.

## How to verify the setup

Acceptance of this function: run a test for each option one by one, check the branch direction and interaction state in the run records, confirm that each option corresponds to one branch, that the selection result variable has been passed to subsequent nodes, and reference `variables` and `nodeId` in a subsequent node to run a test once.

Business test: submit a question that lacks key information and see whether it asks a follow-up question before answering; after the missing item is identified and followed up on, and the answer has a material basis, it is transferred to the handler.

- Check the options and branch connections one by one in the node, trigger a user selection node once, and view the node status and branch direction in the run records.
- Reference the selection result variable in a subsequent node and run a test once to verify whether this variable has been passed to subsequent nodes, and confirm that the intake records and the completed question items are continued by subsequent nodes according to the branches.
