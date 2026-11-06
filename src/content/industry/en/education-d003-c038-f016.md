---
title: Forms and User Interaction for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c038-f016
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Forms | Intake
meta_description: Continuing Education: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for continuing education credit recognition usually come from training organizers and employers, and enter the intake stage after being aggregated by batch or year, with an update cadence synchronized with training plans and recognition cycles. Core materials include the course filing form, the study certificate, and the credit recognition form: the course filing form carries the course name, credit hours, start date, and the organizer's signature; the study certificate carries the trainee's name, study period, completion status, and the issuing party's receipt; the credit recognition form carries the recognition conclusion, recognition date, and handler's signature. When these three types of materials enter this feature, they play different roles: the filing form is used to verify the source of the course and credit hours, the study certificate is used to verify the individual's completion record, and the recognition form is used to verify the final recognition criteria. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record in two materials is prone to inconsistent name spellings, different quantity criteria, and dates that do not match across months or batches. When versions are not synchronized, old and new forms coexist, and if a signature or receipt is missing, it cannot be confirmed that the material has taken effect. These discrepancies need to be identified first at the intake stage and then filled in through follow-up questions, so that an intake record that can be handed to the handler is formed.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, credit hours, start date, and organizer's signature are complete, and whether the course criteria are consistent with the study certificate | In the node configuration, check the field names and required settings one by one; after submission, have subsequent nodes reference the field and run a trial to confirm that the value comes from `formInput`; for records with mismatched names or quantities, ask follow-up questions first before answering |
| Study certificate | Whether the trainee's name, study period, completion status, and issuing party's receipt are complete, and whether the dates connect with the recognition form | Check the required markers one by one and confirm that key material fields are marked as required; after submission, check whether subsequent nodes can retrieve the corresponding field values, and if necessary use `userSelect` to let the user confirm the course and batch from existing options |
| Credit recognition form | Whether the recognition conclusion, recognition date, and handler's signature are complete, and whether the same record matches the filing form and study certificate | Have subsequent nodes reference the field and run a trial to check consistency across name, quantity, and date; if a signature or receipt is missing, ask follow-up questions to complete it first, then hand it to the handler |
| Form input node | Whether it can be submitted when required items are empty, whether field values are passed to subsequent nodes after submission, and whether the conversation stays in the interaction state | Check the required settings and field names one by one, and after submission run a trial of subsequent nodes retrieving the values; confirm that the interaction state continues to execute downward after submission |

## Three common errors

- Symptom: the same record has different course name spellings in the course filing form and the study certificate. Cause: the two materials are filled in at different stages, name normalization has not been done, and no follow-up questions were asked first at intake.
- Symptom: the credit hours or recognition date do not match between the two materials. Cause: versions are not synchronized, old and new forms coexist, and quantity criteria and dates across batches have not been checked.
- Symptom: the credit recognition form lacks the handler's signature or the study certificate lacks a receipt. Cause: the signature document was not collected during material circulation, and signatures and receipts were not listed as required items at intake.

## How to verify the setup

This feature's acceptance: fill in the form once and submit it, check whether the field values retrieved by subsequent nodes match what was filled in, and confirm that field names correspond, required settings take effect, and the interaction state can continue to execute downward.

Business test: submit a question missing key information and see whether it asks follow-up questions first before answering, rather than directly giving a conclusion.

- In the node configuration, check the field names and required settings one by one, confirm that they correspond one-to-one with the material fields to be collected, and after submission have subsequent nodes reference the field and run a trial.
- For the same record, check the name, quantity, date, and signature across the course filing form, study certificate, and credit recognition form; when inconsistencies or missing items are found, ask follow-up questions to complete them first, then hand it to the handler.
