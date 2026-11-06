---
title: Workflow Orchestration for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c034-f008
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Workflows | Review
meta_description: Skills Certification: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Public Vocational Skills Level Assessment: Trace Exceptions and Review Results

## What this category's data looks like

The materials for anomaly tracing and manual review of social evaluation for occupational skill level certification mainly come from the evaluation implementation plan, candidate registration forms, and assessor dispatch forms. The implementation plan is published by the evaluation agency before certification and contains the occupation direction, level, time and location, and composition of the assessment team; the registration form is filled in by the candidate and reviewed by the agency, and contains identity information, declaration conditions, and signature confirmation; the dispatch form is issued by the agency before the exam and contains the assessor's name, certificate number, date of attendance, and receipt. The three types of materials have different update rhythms: the plan is adjusted by batch, the registration form is corrected by candidates, and the dispatch form changes with personnel. When entering this function, the plan provides the certification framework and batch number, the registration form provides the candidate and declaration conditions, and the dispatch form provides the assessor's attendance and signature information; together, the three support the anomaly list and the traceability of the original records for the review conclusion.

## Configuration and implementation checks

This step is executed by workflow nodes (user selection and branching), outputting branch directions and interaction state records. The anomaly list and review conclusion are completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interactive state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Whether the occupation name, level, and date in the plan are consistent with the corresponding fields in the registration form and dispatch form, and whether signatures and receipts are complete | Compare the name, quantity, and date in the plan against the registration form and dispatch form item by item, check the signature fields and receipts, and record inconsistencies |
| Candidate registration form | Whether the declaration conditions and signature in the registration form match the plan batch and the assessor arrangements in the dispatch form, and whether the versions are synchronized | Check the options and branch connections one by one in the node, reference `variables` and `nodeId` to trace the source materials, and mark missing signatures or receipts |
| Assessor dispatch form | Whether the assessor's name, certificate number, and date of attendance in the dispatch form conflict with the plan and registration form, and whether the receipt is complete | Trigger a user selection, check the node status in the run record, and reference the selection result `variables` in a subsequent node to do a trial run |
| Anomaly record | Whether the anomaly is supported by original records, whether the reviewer's signature is complete, and whether it can be traced back to the source materials | Create an anomaly record and trace it back along `nodeId` to the specific fields and dates in the plan, registration form, and dispatch form |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the plan and the registration form. Cause: After a batch adjustment, the plan was changed first, while the registration form still used the old version and was not updated in sync.
- Symptom: The dispatch form lacks the assessor's signature or receipt. Cause: Personnel changed before the exam, the dispatch form version was not synchronized, and the receipt step was skipped.
- Symptom: After selecting an option, the default branch is still followed, and the process stops after the interaction is completed. Cause: The options and branch connections were not checked one by one, and the interaction state was not recorded correctly.

## How to verify the setup

For this function's acceptance: try running each option one by one, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and that the selection result variable has been passed to subsequent nodes.

Business test: create an anomaly record, see whether it can be traced back to the source materials, and check whether the fields, dates, and signatures in the plan, registration form, and dispatch form support the anomaly.

- Check the options and branch connections one by one in the node, trigger a user selection, and view the node status in the run record.
- Reference the selection result variable in a subsequent node and do a trial run to confirm that the branch direction is consistent with the interaction state record.
