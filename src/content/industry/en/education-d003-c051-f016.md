---
title: Forms and User Interaction for College Entrance Exam Application Eligibility: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c051-f016
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Forms | Intake
meta_description: Entrance Exam Eligibility: review forms for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for College Entrance Exam Application Eligibility: Handle Questions and Collect Missing Information

## What this category's data looks like

The materials for general college entrance examination registration qualification review mainly consist of the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrant workers. The sources are the information filled in by the candidate and certificates issued through channels such as schools, public security, and residence permits. The update cadence advances with registration batches and review milestones. The field characteristics center on name, ID number, household registration address, student status number, enrollment start and end dates, parents' residence and social insurance information, and signature receipts. When materials enter this feature, their roles differ: the registration form handles the collection of basic identity and examination subject fields, the household registration and student status certificates serve as the basis for checking the consistency of household registration and student status, and the materials for children accompanying migrant workers serve as supplementary proof of residence, social insurance, and complete years of student status. Together, the three support qualification review intake, but the form is only responsible for collecting and passing on the field values filled in by the user. The recognition of material content, authenticity judgment, and qualification conclusions are completed by subsequent nodes or manually.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" are then completed by subsequent nodes or manually. After triggering, the conversation enters the interaction state and records the workflow state. Only after the user fills in the required items and submits are the form information passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Whether name, ID number, examination subjects, signature, and receipt date are complete, and whether they match the same record name and date on the household registration and student status certificates | Check field names and required settings one by one in the node configuration; after submission, have subsequent nodes reference the field values and run a trial |
| Household registration and student status certificates | Whether the household registration address, student status number, and enrollment start and end dates are consistent with those filled in on the registration form, and whether the versions are synchronized | Check field names and required markers, and verify whether the name, quantity, and date of the same record match across the two materials |
| Materials for children accompanying migrant workers | Whether fields for parents' residence permit, social insurance contributions, and complete years of student status are missing, and whether signatures or receipts are missing | Check required items and field passing after submission; when items are missing, ask follow-up questions first before answering, then transfer to the handler |
| `formInputResult` and `selectResult` | Whether field values can be retrieved by subsequent nodes, and whether submission is possible when required items are empty | Reference the corresponding fields in subsequent nodes and run a trial to confirm that field values are passed normally after the interaction state ends |

## Three common errors

- Phenomenon: The same candidate's name, ID number, or enrollment date does not match between the registration form and the household registration and student status certificates. Cause: The two materials are filled in separately, lacking field-level comparison and follow-up questioning.
- Phenomenon: The residence permit or social insurance version in the materials for children accompanying migrant workers is not synchronized, and the old version is still circulating in the process. Cause: After the materials were updated, they were not resubmitted, and the intake record still references the old field values.
- Phenomenon: The registration form or certificates lack signatures or receipts but still enter subsequent processing. Cause: Key material fields were not marked as required, and after submission the nodes cannot retrieve values and no follow-up questions are asked.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields corresponding to `formInputResult` and `selectResult` can be referenced, and that submission is not possible when required items are empty.

Business test: submit a question missing key information and see whether follow-up questions are asked before answering, and whether missing items are identified and followed up on before being transferred to the handler.

- Check field names and required settings one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the form fields in subsequent nodes and run a trial to confirm that field passing is normal after submission and that the conversation does not remain in the interaction state.
