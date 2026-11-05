---
title: Forms and User Interaction for Research Ethics Review: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c062-f016
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Forms | Intake
meta_description: Research Ethics: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Ethics Review: Handle Questions and Collect Missing Information

## What this category's data looks like

In the research ethics review scenario, the materials entering the Q&A intake and missing-item follow-up feature are mainly of three types: ethics review applications, informed consent form templates, and risk assessment forms. Ethics review applications are submitted by researchers according to the project cycle, and their fields include project name, research start and end dates, and principal investigator signature; informed consent form templates are updated along with protocol versions, and their fields include version number, version date, and subject signature field; risk assessment forms are adjusted along with risk levels, and their fields include assessment date, risk level, and reviewer signature. The three types of materials play different roles in the feature: the ethics review application is the main intake document, while the informed consent form template and risk assessment form are supporting evidence. The material sources are researcher submissions and the institutional template library, and the update cadence is synchronized when the protocol is revised or during annual review. The field characteristics are that names, quantities, dates, signatures, and version numbers need to be consistent across materials.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "intake record and items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Project name, research start and end dates, and principal investigator signature are consistent item by item with the informed consent form template and risk assessment form | Check the field names one by one in the node configuration, and after submitting with `formInput`, verify the values retrieved by subsequent nodes |
| Informed consent form template | Version number, version date, and subject signature field are synchronized with the version filled in the ethics review application | Check the required settings one by one, and after selecting the version with `userSelect`, test-run the field passing |
| Risk assessment form | Assessment date, risk level, and reviewer signature match the dates in the ethics review application and informed consent form template | Reference this field in subsequent nodes and test-run it, and check whether the signature and receipt are complete |
| Form input node | Required markers cover key material fields, and after submission the conversation no longer remains in the interaction state | Check the required items one by one, and after submission check whether subsequent nodes can retrieve the corresponding field values |

## Three common errors

- Symptom: the same project name is written differently in the ethics review application and the informed consent form template. Cause: the form fields do not correspond one-to-one with the material fields, and the submitted values are not checked against the template fields.
- Symptom: the version number and version date do not match between the two materials. Cause: after the protocol was revised, the template was not updated synchronously, and the required markers did not cover the version fields.
- Symptom: cases are still accepted even though the reviewer signature or subject receipt is missing. Cause: key material fields were not marked as required, and after submission subsequent nodes cannot retrieve the signature values.

## How to verify the setup

Feature acceptance: fill out an ethics review application, informed consent form template, and risk assessment form once and submit them, verify the field values retrieved by subsequent nodes, and confirm that `formInputResult` and `selectResult` pass correctly and that the conversation no longer remains in the interaction state.

Business test: submit a question that lacks key information and see whether it asks follow-up questions before answering.

- Check the field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and test-run them, and check whether the corresponding field values can be retrieved after submission.
