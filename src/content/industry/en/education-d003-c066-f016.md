---
title: Forms and User Interaction for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c066-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Forms | Intake
meta_description: Journal Submissions: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information

## What this category's data looks like

In the preliminary review stage of academic journal submissions, the materials entering the system usually include three types: the submitted manuscript, the author information form, and the plagiarism check report. The manuscript is submitted by the author and contains the title, abstract, main text, references, and submission date; the author information form contains the order of authorship, affiliation, correspondence address, funding project, and signature field; the plagiarism check report contains the testing institution, testing date, similarity rate range, and receipt number. The three types of materials update at different rhythms: the manuscript may undergo multiple rounds of revision, the author information form is refilled when authorship changes, and the plagiarism check report is reissued before peer review. In terms of field characteristics, the title, author names, affiliation names, manuscript number, testing date, signature, and receipt are key anchors for cross-material comparison. When entering the question-and-answer intake and missing-item follow-up stage, the manuscript serves as the basis for content judgment, the author information form serves as the basis for identity and authorship, and the plagiarism check report serves as the basis for formal compliance; together, the three support missing-item identification and follow-up questions.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" is then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and the workflow state is recorded; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the title, manuscript number, and submission date match the author information form and plagiarism check report; whether the main text and references are complete | Check the field names one by one in the node configuration, corresponding one-to-one with the manuscript fields; after a test run, check whether subsequent nodes can retrieve the title and manuscript number |
| Author information form | Whether the order of authorship, affiliation name, funding project, signature, and receipt are consistent with the manuscript; if the signature or receipt is missing, it is judged as a missing item | Check the required settings one by one, and set authorship, affiliation, and signature as required; after submission, reference the field and run a test |
| Plagiarism check report | Whether the testing institution, testing date, similarity rate range, and receipt number are synchronized with the manuscript version; whether the date and number match | Reference the plagiarism check report fields in subsequent nodes and run a test, checking whether the testing date and receipt number can be retrieved |
| Form fields and required markers | Key material fields have been marked as required, field names correspond one-to-one with material fields, and field values can be referenced after submission | Check field names and required settings one by one; reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test |

## Three common errors

- Symptom: The title and order of authorship for the same record do not match between the manuscript and the author information form. Cause: The two materials are filled in separately, versions are not synchronized, and they are not backfilled during missing-item follow-up.
- Symptom: The testing date of the plagiarism check report is inconsistent with the manuscript revision date, and the receipt number is missing. Cause: The plagiarism check report is reissued before peer review, and the old version remains in the form.
- Symptom: The author information form lacks a signature or receipt but still enters the intake record. Cause: The required marker does not cover the signature field, and after submission subsequent nodes cannot retrieve the corresponding field value.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` fields can be retrieved by field name.

Business test: Submit a question missing key information and see whether it first asks a follow-up question before answering, and whether the follow-up content points to the missing material and field.

- Check field names and required settings one by one in the node configuration, and confirm that key material fields have been marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test, confirming that field values can be passed after submission and that the conversation does not remain in the interaction state.
