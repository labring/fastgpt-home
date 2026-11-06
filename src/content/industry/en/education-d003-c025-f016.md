---
title: Forms and User Interaction for Graduate Education Process Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c025-f016
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Forms | Intake
meta_description: Graduate Education: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Graduate Education Process Management: Handle Questions and Collect Missing Information

## What this category's data looks like

Graduate training process management covers materials such as training plans, thesis proposals, and mid-term assessment forms. The sources are documents and forms submitted by supervisors and training units at key milestones, and the update cadence follows semesters and assessment cycles. Training plans focus on course and research direction fields, thesis proposals focus on topic rationale and schedule, and mid-term assessment forms focus on progress, outcomes, and signature sections. When these three types of materials enter the question acceptance and missing-item follow-up function, each plays a different role: the training plan provides baseline fields, the thesis proposal provides milestone dates and review comments, and the mid-term assessment form provides stage conclusions and signature receipts. Field characteristics include name, quantity, date, signature, and version number. It is common for the same record to have mismatched name, quantity, or date across two materials, for versions to be out of sync, and for signatures or receipts to be missing. During acceptance, missing items are first identified and followed up on; answers must be based on materials, and then the matter is transferred to the handler.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values entered by the user (passed to subsequent nodes after submission). The "acceptance record and completed follow-up items" are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | Fields and dates must be cross-consistent with the thesis proposal and mid-term assessment form, and the signature section must be complete | Check field names and required markers one by one in the node configuration, and after submission check the field values obtained by subsequent nodes |
| Thesis proposal | The topic name, quantity, and date match the training plan, and review signatures and receipts are not missing | Use `formInput` to reference the fields and run a trial, and check whether the date and signature section are empty |
| Mid-term assessment form | The stage conclusion, outcome quantity, and date are in sync with the thesis proposal version, and signatures and receipts are complete | Use `userSelect` to select the assessment batch and submit, then check whether subsequent nodes can obtain the corresponding field values |
| Form input node | Required markers cover key material fields, and field passing is not lost after submission | Check the required settings one by one, reference the field in subsequent nodes and run a trial, and confirm that the conversation does not remain in the interactive state |

## Three common errors

- Symptom: The same record has mismatched name, quantity, or date between the training plan and the thesis proposal. Cause: Fields were not cross-checked, and the two materials were filled in separately without synchronized comparison.
- Symptom: The mid-term assessment form version is out of sync, with the old signature section and the new conclusion coexisting. Cause: The material was not resubmitted after updating, and version differences were not identified during acceptance.
- Symptom: The thesis proposal is missing a signature or receipt but still proceeds to subsequent processing. Cause: Required markers did not cover the signature and receipt fields, so subsequent nodes could not obtain the corresponding values after submission.

## How to verify the setup

Acceptance for this function: fill it out once and submit, check the field values obtained by subsequent nodes, and confirm that the field names referenced by `formInputResult` and `selectResult` correspond one-to-one with the material fields.

Business test: submit a question missing key information and see whether it asks follow-up questions before answering; after missing items are identified and followed up on, the answer must be based on materials, and then the matter is transferred to the handler.

- Check field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the field in subsequent nodes and run a trial to confirm that field passing works normally after submission and that the conversation does not remain in the interactive state.
