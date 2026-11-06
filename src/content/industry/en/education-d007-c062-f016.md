---
title: Forms and User Interaction for Research Ethics Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c062-f016
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Forms | Review
meta_description: Research Ethics: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Ethics Review: Trace Exceptions and Review Results

## What this category's data looks like

In the research ethics review scenario, the materials center on ethics review applications, informed consent form templates, and risk assessment forms. Applications are initiated by researchers and updated with project versions; consent form templates are adjusted according to regulations and institutional requirements; risk assessment forms are supplemented by research type and stage. When the three enter exception tracing and manual review, they respectively take on the roles of application basis, subject notification evidence, and risk judgment records. Field characteristics center on subject names, sample or subject counts, signing dates, version numbers, signatures, and receipts. In terms of update rhythm, applications and consent forms often change one after the other due to protocol revisions, while risk assessment forms may lag behind. Exception tracing requires landing the exception list and review conclusions on the original records, comparing fields, dates, and signatures item by item, and forming review conclusions that can be handed to the responsible person for handling.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusions are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures must be consistent with the original records | Check the subject names, counts, signing dates, version numbers, signatures, and receipts in the application, and compare them item by item against the original materials |
| Informed consent form template | Fields, dates, and signatures must be consistent with the application and the original records | Check the subject names, counts, signing dates, version numbers, signatures, and receipts in the consent form, and check whether the version is synchronized |
| Risk assessment form | Fields, dates, and signatures must be consistent with the application and the consent form | Check the subject names, counts, assessment dates, and signatures in the risk form, and confirm there are no conflicts with the application and the consent form |
| Form input node | Field names, required markers, and post-submission field passing can be verified | Check field names and required settings one by one in the node configuration, reference the fields with `formInputResult` in subsequent nodes and do a trial run, and confirm that the `userSelect` selected value can be retrieved |

## Three common errors

- Symptom: The name or count of the same subject does not match between the application and the consent form. Cause: The two materials are filled in separately without field-level comparison, and exception tracing lacks support from the original records.
- Symptom: The consent form template version is not synchronized, and the signing date conflicts with the application version number. Cause: After the protocol is revised, only the application is updated, and the template is not updated with the version, so during review it cannot be determined which one prevails.
- Symptom: The risk assessment form lacks a signature or receipt, and no one signs the review conclusion. Cause: Signatures are missed during material circulation, manual review does not check signatures and receipts item by item, and the exception list cannot be handed to the responsible person for handling.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, check the field values retrieved by subsequent nodes, confirm that the fields corresponding to `formInputResult` and `selectResult` can be passed correctly, that submission is not possible when required items are empty, and that the conversation does not get stuck in the interactive state.

Business test: create an exception record, see whether the source material can be traced, and check whether the names, counts, dates, versions, and signatures of the application, consent form template, and risk assessment form are consistent.

- In the form input node configuration, check field names and required markers one by one to ensure they correspond one-to-one with the material fields to be collected.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and do a trial run to confirm that the corresponding field values can be retrieved after submission.
