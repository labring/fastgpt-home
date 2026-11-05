---
title: Workflow Orchestration for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c058-f008
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Workflows | Intake
meta_description: Research Agreements: review workflows for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Research Project Task Agreement Signing: Handle Questions and Collect Missing Information

## What this category's data looks like

In the signing stage of scientific research project task books, materials come from three documents: the project task book, the subject task breakdown table, and the budget book. They are submitted by the applicant unit before signing, and the update rhythm changes with version iterations and supplementary signing receipts. Field characteristics are concentrated in subject name, responsible person, start and end dates, budget subject amounts, signature fields, and receipt numbers. When materials enter workflow orchestration, the task book assumes the role of the main record, the breakdown table assumes the role of mapping subjects to tasks, and the budget book assumes the role of mapping funds to subjects. In the three materials, fields, dates, and signatures often show mismatches in the same record name, quantity, and date, versions are not synchronized, and signatures or receipts are missing. Acceptance records and follow-up questions for completion are continued and completed by subsequent nodes according to branches.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction status records. "Acceptance records and follow-up questions for completion" are then continued and completed by subsequent nodes according to branches. When a node is triggered, the conversation enters an interactive state and records the workflow status. After the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Whether the subject name, responsible person, start and end dates, and signature fields are consistent with the breakdown table and budget book | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` to view the run records |
| Subject task breakdown table | Whether the corresponding subject and task names, quantities, and dates match those in the task book and budget book | Trigger once, view the node status in the run records, and check whether the interaction status is recorded |
| Budget book | Whether the budget subject amounts, dates, signatures, and receipts are synchronized with the task book and breakdown table | Reference the selection result variable in a subsequent node and run a trial once to check the branch direction |
| Follow-up questions for completion | Whether missing items are identified and followed up on, and whether answers are based on materials | Ask a question missing key information and see whether it follows up first before answering |

## Three common errors

- Phenomenon: The subject name, quantity, and date of the same record do not match between the task book and the breakdown table. Cause: The two materials are maintained separately, and field comparison is not performed for the same record.
- Phenomenon: The budget book version is not synchronized, and old subject amounts are still referenced. Cause: After the version update, the interaction was not triggered again, and the branch still follows the default path.
- Phenomenon: Missing signature fields or receipts still proceed to the next step. Cause: Missing items are not identified and followed up on, and answers lack material basis.

## How to verify the setup

Acceptance of this function: Run trials option by option, check the branch direction and interaction status in the run records, and confirm that `variables` and `nodeId` references are correct.

Business test: Ask a question missing key information and see whether it follows up first before answering.

- Check the options and branch connections one by one in the node, and confirm that each option corresponds to one branch.
- Reference the selection result variable in a subsequent node and run a trial once to confirm that the selection result has been passed to the subsequent node.
