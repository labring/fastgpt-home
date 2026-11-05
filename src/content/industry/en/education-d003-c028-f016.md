---
title: Forms and User Interaction for Vocational College Program Registration: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c028-f016
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Forms | Intake
meta_description: Vocational Programs: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Vocational College Program Registration: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the vocational college program filing scenario, where materials mainly consist of program filing forms, talent demand justification, and faculty and equipment lists. The filing form is typically completed by the institution and includes the program name, code, length of schooling, enrollment scale, signature, and date; the talent demand justification is issued by industry research or partner enterprises and includes job titles, demand quantities, research dates, and seals; the faculty and equipment list is compiled by academic affairs and practical training departments and includes teacher names, titles, equipment names, number of units, purchase dates, and signatures. Materials are updated according to the academic-year application cycle, and the names, quantities, and dates in the same record across the three materials must be aligned item by item. When entering the form input function, the three types of materials each play different roles: the filing form provides basic program information fields, the talent demand justification provides demand basis fields, and the faculty and equipment list provides condition assurance fields; after submission, the field values are available for reference by subsequent nodes.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values entered by the user (passed to subsequent nodes after submission). The "acceptance record and items to be completed" are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program filing form | Whether the program name, code, length of schooling, enrollment scale, signature, and date are complete, and whether they can be matched item by item with the talent demand justification and the faculty and equipment list | Check the field names one by one in the node configuration, inspect the required markers, and after a trial run reference the `formInputResult` fields in subsequent nodes |
| Talent demand justification | Whether the job titles, demand quantities, research dates, seals, and receipts are consistent with the filing form, and whether the version is synchronized | Compare the names, quantities, and dates across the three materials item by item, verify signatures and receipts, and record inconsistencies |
| Faculty and equipment list | Whether teacher names, titles, equipment names, number of units, purchase dates, and signatures match the filing form | Reference the `formInputResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission |
| `formInputResult` and `selectResult` | Whether key material fields are marked as required, and whether the selection options cover the three sources: filing form, justification, and list | Check the required settings and selection options one by one, and after submission check the values retrieved by subsequent nodes |

## Three common errors

- Symptom: The same program name is written differently in the filing form and the talent demand justification, and the quantities and dates do not match. Cause: The two materials were filled out separately without cross-checking.
- Symptom: The faculty and equipment list version is not synchronized, and the old number of units is still referenced. Cause: The attachment was not replaced after updating, and the version and receipt were not recorded.
- Symptom: The filing form lacks a signature or receipt, but it still enters the subsequent process after submission. Cause: The required markers do not cover the signature and receipt fields, and the interaction state does not promptly follow up.

## How to verify the setup

Fill out the form once and submit it, then check whether the field values retrieved by subsequent nodes match what was entered, focusing on the values of `formInputResult` and `selectResult`.

Business test: Submit a question missing key information and see whether it first asks follow-up questions before answering, and whether the follow-up items cover the missing items in the filing form, talent demand justification, and faculty and equipment list.

- Check the field names and required markers one by one in the node configuration, and confirm that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved after submission.
