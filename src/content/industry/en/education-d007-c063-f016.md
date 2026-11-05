---
title: Forms and User Interaction for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c063-f016
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Forms | Review
meta_description: Research Misconduct: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Academic Misconduct Reports and Investigations: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the category of investigation and handling of academic misconduct reports; the materials include report materials, investigation reports, and expert appraisal opinions. Report materials are submitted by the reporter and include the reported person, incident description, and evidence list; investigation reports are issued by the investigation team and include the investigation process, factual findings, and handling recommendations; expert appraisal opinions are provided by peer experts and include the appraisal matters, basis of analysis, and conclusions. Materials enter successively according to case stage, and the update rhythm changes with supplementary evidence, review opinions, and signed receipts. Field characteristics are concentrated in names, quantities, dates, signatures, and version numbers, and the same record must remain consistent across different materials. This function is used to collect the fields required for exception tracing and manual review as structured input, so that subsequent nodes or humans can form an exception list and review conclusion based on it, and hand it to the responsible person for handling.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The exception list and review conclusion are completed by subsequent nodes or humans. After the form input node is triggered, the conversation enters an interactive state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields must be aligned item by item with the investigation report and expert appraisal opinion: name of the reported person, number of evidence items, incident date, reporter signature and receipt | Check the field names one by one in the node configuration, confirm that the report material fields correspond one-to-one with the material fields to be collected, and use `formInput` to reference the fields in a trial run |
| Investigation report | When the name, quantity, or date of the same record do not match across the two materials, the discrepancy must be marked in the Check column and noted as version not synchronized | Check the required settings one by one, confirm that the key fields of the investigation report are marked as required, and that after submission subsequent nodes can retrieve the corresponding field values |
| Expert appraisal opinion | When signature or receipt is missing, write in the Check column as signature pending, not configuration complete; the appraisal matters and conclusion date must be consistent with the investigation report | Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, checking whether the appraisal opinion field values can be passed through |
| Exception record | Only when the exception has supporting original records and the reviewer's signature may it be handed to the responsible person for handling | Create an exception record, see whether it can be traced back to the source material, and check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: the fields were not aligned item by item, so after submission subsequent nodes retrieve isolated values and cannot trace back to the source material.
- Symptom: the versions of the investigation report and expert appraisal opinion are not synchronized, and the review conclusion cites an old version. Cause: the form did not collect version numbers, so subsequent nodes cannot determine which version of the material the field values belong to.
- Symptom: the report materials or appraisal opinion lack signatures and receipts, yet still enter handling. Cause: key material fields were not marked as required, so submission is possible even when required items are empty, and the conversation remains in the interactive state.

## How to verify the setup

Acceptance of this function: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the results referenced by `formInputResult` and `selectResult` are consistent with what was filled in.

Business test: create an exception record, see whether it can be traced back to the source material, and check the names, quantities, dates, and signatures of the report materials, investigation report, and expert appraisal opinion.

- Check the field names one by one in the node configuration, confirm that the form fields correspond one-to-one with the material fields to be collected, and check the required markers.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirm that field passing works normally after submission, and that the exception record can be traced back to the source material.
