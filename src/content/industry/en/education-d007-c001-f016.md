---
title: Forms and User Interaction for Daily Kindergarten Care Management: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c001-f016
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Forms | Review
meta_description: Kindergarten Care: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Daily Kindergarten Care Management: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on three types of materials in kindergarten childcare daily life management: the daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule is updated weekly or daily, and contains activity time periods, segment names, teacher and childcare worker assignments, dates, and signature fields; the morning and afternoon check records are filled in twice per day, and contain the child's name, body temperature, throat and skin condition, abnormality markers, handling opinions, and the inspector's signature; the child health observation records are filled in as needed or daily, and contain observation time, symptom description, water and food intake, nap status, and the recorder's and reviewer's signatures. When these three types of materials enter the exception tracing and manual review function, they respectively play the roles of source basis, process evidence, and review conclusion support: the schedule confirms the segments and responsible persons, the morning and afternoon check records provide the time point when an abnormality is found and the original signs, and the health observation records supplement continuous observation and handling clues. Field characteristics are concentrated in dates, child names, quantities, status descriptions, and signature receipts, and the update rhythm is driven by daily checks and weekly scheduling.

## Configuration and implementation checks

The form input node (interaction node) in the workflow only outputs the field values filled in by the user (passed to subsequent nodes after submission); the exception list and review conclusions must be handled afterward by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Check whether the date, segment names, teacher and childcare worker assignments, and signature fields correspond to the morning and afternoon check records and child health observation records | Compare the schedule date with the morning and afternoon check record date item by item, check whether the segment names are consistent with the activity descriptions in the health observation records, and check whether the signature fields are complete |
| Morning and afternoon check records | Check whether the child's name, body temperature, abnormality markers, handling opinions, and inspector's signature are consistent with the name, quantity, and date in the health observation records | Configure the field names in the form input node to correspond one-to-one with the morning and afternoon check record fields, mark key fields as required, and after submission check whether subsequent nodes can obtain the `formInputResult` field values |
| Child health observation records | Check whether the observation time, symptom description, water and food intake, and recorder's and reviewer's signatures are synchronized with the morning and afternoon check records and the schedule version | Compare the child names, symptom quantities, and dates in the health observation records and morning and afternoon check records one by one, check whether the reviewer's signature and receipt are complete, and if necessary use `userSelect` to select the reviewer |
| Form input node | Check whether the form fields correspond one-to-one with the material fields, whether the required markers cover key material fields, and whether field passing is usable after submission | Check the field names and required settings one by one in the node configuration, reference `formInputResult` in subsequent nodes and run a trial, and confirm that the corresponding field values can be obtained after submission |

## Three common errors

- Phenomenon: The same child's name is written differently in the morning and afternoon check records and the health observation records, and the dates differ by one day. Cause: The two materials are filled in separately, name and date alignment is not done, and versions are not synchronized.
- Phenomenon: The number of segments in the daily life schedule does not match the number of activities in the morning and afternoon check records, and signatures or receipts are missing. Cause: After scheduling adjustments, updates were not synchronized, and the signature fields were not confirmed item by item.
- Phenomenon: After submission, subsequent nodes cannot obtain values, or required items can be submitted even when empty, and the conversation stops in the interaction state. Cause: The form fields do not correspond one-to-one with the material fields, and the required markers do not cover key fields.

## How to verify the setup

This function's acceptance: fill in the form once and submit it, check whether the field values obtained by subsequent nodes are consistent with the filled-in content, focusing on `formInput` passing and required-item interception.

Business test: create an exception record, see whether the source material can be traced, and check whether the dates, names, quantities, and signatures of the daily life schedule, morning and afternoon check records, and child health observation records match.

- In the form input node configuration, check one by one whether the field names correspond one-to-one with the fields of the daily life schedule, morning and afternoon check records, and child health observation records, and mark key material fields as required.
- Reference the `formInputResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be obtained after submission; use `userSelect` to select the reviewer and check whether the signatures and receipts are complete.
