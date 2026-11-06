---
title: Forms and User Interaction for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c063-f016
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Forms | Handover
meta_description: Research Misconduct: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the category of academic misconduct report investigation and handling, focusing on the stages of material drafting and responsibility handover. Sources include three types: report materials, investigation reports, and expert appraisal opinions, which are updated on a rolling basis along nodes such as acceptance, verification, determination, and transfer. Field characteristics are mainly name, quantity, date, signature, version, and receipt, and each must be placed item by item in the form. When materials enter the form input node, report materials assume the role of clue and fact source, investigation reports assume the role of verification conclusions and responsibility division, and expert appraisal opinions assume the role of professional judgment and basis. The name, quantity, and date of the three types of materials in the same record must be consistent, the version must be synchronized, and signatures and receipts must be complete, so that a signable material draft and handover record can be formed.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The signable material draft and handover record are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields must cover the reporter, the reported person, the matter name, quantity, date, and signature; the name and quantity must be consistent with the investigation report | Check field names one by one in the node configuration, and confirm that the required markers fall on the key material fields |
| Investigation report | Fields must cover the investigation conclusion, responsible person, version, date, and signature; the version must be synchronized with the expert appraisal opinion | Reference this field in a subsequent node and run a trial to confirm that the field value can be retrieved after submission |
| Expert appraisal opinion | Fields must cover the appraiser, appraisal basis, conclusion, date, and receipt; the date must be consistent with the investigation report | Check the required settings one by one, and confirm that submission is blocked when a signature or receipt is missing |
| Handover record | Fields must cover the transferor, receiver, transfer date, version, and receipt; the responsible person must be clear | After submission at the form input node, the subsequent node retrieves the `formInputResult` and `selectResult` field values |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the report materials and the investigation report. Cause: The fields do not correspond one to one, and no item-by-item check was performed during drafting.
- Symptom: The versions of the investigation report and the expert appraisal opinion are not synchronized, and the dates are inconsistent. Cause: The version and date fields were not included as required, and no comparison was made before submission.
- Symptom: The handover record lacks a signature or receipt, and the materials cannot be issued. Cause: The required markers do not cover the signature and receipt fields, and missing items were not blocked.

## How to verify the setup

Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` field values can be referenced.

Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check field names and required settings one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the field values can be retrieved after submission.
