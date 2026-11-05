---
title: Forms and User Interaction for Vocational College Program Registration: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c028-f016
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Forms | Handover
meta_description: Vocational Programs: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational College Program Registration: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Filing of program setup in vocational colleges is handled centrally before admissions each year. Materials are drafted by academic affairs staff and program leaders, countersigned by the secondary school, human resources, equipment management, and other positions, and then submitted. Core materials include the program setup filing form, the talent demand justification report, and the faculty and equipment list. Fields cover program name and code, program length, enrollment scale, justification date, number of faculty and title structure, equipment name and number of units/sets, signatures, and receipts. When materials enter the form input node, the filing form serves as the main record, while the justification report and list serve as attachment fields and sources of quantities; the same program name, headcount, and date must remain consistent across the three materials, versions must be updated in sync with revisions, and at handover the next stage signs for receipt and keeps the receipt.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values entered by the user (passed to subsequent nodes after submission). The material drafts that can be issued and the handover records are completed by subsequent nodes or manually. After the node is triggered, the conversation enters an interactive state and the workflow state is recorded; only after the required items are submitted can the field values be referenced.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether the program name and code, program length, enrollment scale, justification date, and signature fields are complete | Check field names and required settings item by item, and compare whether the same record in the justification report and list is consistent |
| Talent demand justification report | Whether the justification conclusion, research date, and correspondence to industry positions are consistent with the filing form | Check whether the report date and the filing form date, as well as the wording of the program name, come from the same source, and inspect signatures and receipts |
| Faculty and equipment list | Whether the number of faculty, title structure, equipment name, and number of units/sets match the filing form | Compare the quantities in the filing form item by item against the list, and check the version number and handover receipt records |
| Form fields | One-to-one correspondence with the material fields to be collected | Check field names one by one in the node configuration, and reference `formInputResult` in a trial run to retrieve values |

## Three common errors

- Symptom: the same program has different name wording in the filing form and the justification report. Cause: naming conventions were not unified during drafting, and the two materials were revised separately without synchronization.
- Symptom: the number of faculty and the number of equipment units/sets do not match between the two materials. Cause: after the list was updated, the filing form was not synchronized, and the version number and date were not checked together.
- Symptom: at handover, signatures or receipts are missing, and the next stage cannot sign for receipt. Cause: required markers do not cover the signature and receipt fields, and the workflow can still proceed even when field values are empty after submission.

## How to verify the setup

This feature acceptance: fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` references are valid.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the form field names and required markers one by one, and confirm that the signature, receipt, and date fields have been set as required
- Reference `formInputResult` in subsequent nodes to retrieve field values and run a trial, and check the consistency of the program name, quantities, and dates in all three places
