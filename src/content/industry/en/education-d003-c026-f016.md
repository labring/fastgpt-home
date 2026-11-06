---
title: Forms and User Interaction for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c026-f016
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Forms | Intake
meta_description: Degree Certificates: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Degree Awards and Certificate Information Reporting: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the Q&A acceptance and missing-item follow-up stage in degree conferral and certificate information reporting. The source materials are the degree application form, thesis review form, and defense resolution submitted by the training institution, updated according to the batch reporting rhythm. The degree application form carries the applicant's basic information and course credit fields; the thesis review form carries the review conclusion, review date, and reviewer signature; the defense resolution carries the defense conclusion, voting result, and defense committee signatures. When the three types of materials enter the form input node, each plays the role of field collection and source traceability: the application form provides identity and qualification items, the review form provides academic evaluation items, and the defense resolution provides procedural compliance items. The name, quantity, and date of the same record in the three materials should be mutually corroborated, and signatures and receipts constitute the basis for completeness judgment. Field characteristics manifest as varying degrees of structuring; date and signature fields are prone to being blank or having unsynchronized versions, requiring item-by-item comparison at the acceptance stage before entering the follow-up process.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The acceptance record and the completed follow-up questions are then completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, dates, and signatures are mutually corroborated with the thesis review form and defense resolution, and whether the names and quantities are consistent | Check the field names one by one in the node configuration, compare the names, quantities, and dates of the three materials, check whether signatures and receipts are complete, and confirm that the required markers cover the key material fields |
| Thesis review form | Whether the review conclusion, review date, and reviewer signature are complete, and whether the version is synchronized with the defense resolution | Check the required settings one by one, check whether the review date matches the defense resolution date, and confirm whether follow-up questions are triggered when the version is not synchronized |
| Defense resolution | Whether the defense conclusion, voting result, and defense committee signatures are complete, and whether the receipt is retained | Reference the `formInputResult` field in subsequent nodes and test-run, check whether the field values can be retrieved after submission, and check whether missing signatures or receipts are first questioned before answering |
| Form input node | Whether it can be submitted when required items are empty, and whether subsequent nodes can retrieve the corresponding field values after submission | Use `formInputResult` and `selectResult` to configure field references, test-run to confirm that the conversation does not stop in the interaction state, and that field values are correctly passed |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record in the degree application form and thesis review form do not match. Cause: The two materials are filled in separately, not compared item by item at acceptance, and missing items are not identified and questioned.
- Phenomenon: The thesis review form version is not synchronized, and the defense resolution references the old review conclusion. Cause: After the version update, the fields were not re-checked, and the subsequent nodes still retrieve the old values.
- Phenomenon: The defense resolution lacks defense committee signatures or receipts but still enters the processing stage. Cause: Key material fields are not marked as required, and missing signatures and receipts are not identified and questioned.

## How to verify the setup

Acceptance of this function: Fill in once and submit, check the field values retrieved by subsequent nodes, confirm that the field values referenced by `formInputResult` and `selectResult` are correctly passed, and that the conversation does not stop in the interaction state due to empty required items.

Business test: Ask a question missing key information, see whether it first questions before answering, and check whether the answer has material basis.

- Check the field names and required markers one by one in the node configuration, confirm that key material fields are marked as required, and that missing items can be identified and questioned.
- Reference the `formInputResult` field in subsequent nodes and test-run, check the field value passing after submission, and confirm that the acceptance record and the completed follow-up questions are then completed by subsequent nodes or manually.
