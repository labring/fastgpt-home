---
title: Forms and User Interaction for Enterprise Employee Skills Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c035-f016
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Forms | Intake
meta_description: Employee Skills: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Enterprise Employee Skills Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

In the filing and implementation stages of enterprise self-directed skilled-talent evaluation, common materials include the enterprise evaluation filing form, evaluation specifications, and candidate roster. The filing form comes from enterprise declaration and competent-department acceptance, the evaluation specifications are updated with occupation (trade) and level, and the roster is generated on a rolling basis by batch. Field characteristics center on names, quantities, dates, and signatures: the filing form states the evaluation institution, occupation name, level, and filing date; the evaluation specifications define application conditions, assessment methods, and scoring weights; the roster lists candidate names, ID numbers, declared levels, and batches. When the three types of materials enter Q&A intake and missing-item follow-up, their roles differ: the filing form is used to confirm the evaluation entity and filing validity period, the evaluation specifications are used to check application conditions and assessment arrangements, and the roster is used to check consistency of headcount and batch. Fields change with batch and version, and the update rhythm is synchronized with the declaration cycle, so item-by-item comparison is required at intake.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Object | Judgment | Verification Action |
| Enterprise Evaluation Filing Form | Whether the institution name, occupation name, level, filing date, and signature in the filing form are consistent with the evaluation specification | Check the field names one by one in the node configuration, and confirm that the name, quantity, date, and signature fields correspond one-to-one with the columns in the filing form |
| Evaluation Specification | Whether the application conditions, assessment methods, and scoring weights in the evaluation specification correspond to the roster batch | Reference this field in subsequent nodes and run a trial to check whether the specification version and roster batch are synchronized |
| Candidate Roster | Whether the names, ID numbers, application levels, and number of people in the roster are consistent with those recorded in the filing form | Check the required settings one by one, confirm that name, ID number, and number of people are required fields, and check the batch date and signature column |

## Three common errors

- Phenomenon: The same candidate name is written differently in the roster and the filing form, and the quantities do not match. Cause: The two materials are maintained separately, and names and quantities were not compared item by item at intake.
- Phenomenon: The evaluation specifications have been updated, but the roster is still filled in according to the old version of the application conditions. Cause: The versions were not synchronized, and the specification version and batch date were not checked at intake.
- Phenomenon: The filing form lacks a signature or receipt, but it still enters subsequent processing. Cause: The required markers do not cover the signature and receipt fields, and no interception occurs after submission.

## How to verify the setup

Acceptance of this function: fill in once and submit, check the field values obtained by subsequent nodes, and confirm that the `formInputResult` fields and `userSelect` option values are passed correctly.

Business test: submit a question missing key information, see whether it first asks a follow-up before answering, and confirm that the missing items are identified and followed up on, and that the answer has a material basis.

- Check the field names one by one in the node configuration, and confirm that they correspond one-to-one with the columns of the filing form, evaluation specifications, and roster.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, and confirm that the field values can be obtained after submission.
