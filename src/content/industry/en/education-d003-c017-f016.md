---
title: Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c017-f016
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Forms | Intake
meta_description: Undergraduate Programs: review forms for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers three types of materials: program setup application forms, talent training plans, and expert review opinions. The application form carries the program name, code, length of study, degree-granting category, application date, and signature of the person in charge; the training plan gives the curriculum system, credit structure, practical components, and revision date; the expert review opinions record the review conclusion, expert list, professional titles, affiliations, and signature receipts. The materials come from on-campus teaching units and off-campus experts, and are updated according to the application cycle and annual adjustment milestones. In the same record, names, quantities, and dates often fail to match across different materials, versions are not synchronized, and signatures or receipts are missing. When entering the form input node, each of the three types of materials corresponds to its own field group: the application form determines the basic program identifiers, the training plan determines the course and credit fields, and the expert review opinions determine the review and signature fields; missing items are filled in through follow-up questions to form an intake record.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use. The "intake record and follow-up items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether fields, dates, and signatures are complete: program name, code, length of study, degree category, application date, signature of the person in charge | Check the field names and required markers one by one in the node configuration, and after submission reference the `formInputResult` fields in subsequent nodes and run a trial |
| Talent training plan | Whether fields, dates, and signatures are complete: curriculum system, credit structure, practical components, revision date, review signature | Check whether the names, quantities, and dates of the plan fields match those of the application form fields; missing items enter follow-up questioning |
| Expert review opinions | Whether fields, dates, and signatures are complete: review conclusion, expert list, professional titles, affiliations, signatures, and receipts | Check the chronological relationship between the review date and the application date; generate follow-up items when signatures or receipts are missing |
| formInputResult and selectResult | Whether required markers and selection fields cover the key material fields | Check the required settings one by one, and reference the `formInputResult` and `selectResult` output values in subsequent nodes and run a trial |

## Three common errors

- Symptom: the same program name is written differently in the application form and the training plan, and quantities and dates do not match. Cause: the two materials are filled in separately, without field-level comparison and follow-up questioning.
- Symptom: the training plan has been revised, but the application form still references the old version's courses and credits. Cause: versions are not synchronized, and the revision date and version identifier are not checked at submission.
- Symptom: the expert review opinions lack signatures or receipts, yet the intake record is still submitted. Cause: the signature and receipt fields are not marked as required, and missing items are not identified and followed up.

## How to verify the setup

Acceptance of this feature: fill in once and submit, check the field values obtained by subsequent nodes, confirm that the `formInputResult` and `selectResult` outputs match what was filled in, and confirm that submission is not possible when a required field is empty.

Business test: submit a question that lacks key information, see whether it asks follow-up questions before answering, and after completing the missing items in the program setup application form, talent training plan, and expert review opinions, forward it to the person in charge for handling.

- Check the field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be obtained after submission.
