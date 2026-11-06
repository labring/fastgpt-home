---
title: Forms and User Interaction for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c061-f016
page_type: 行业问题页
application_area: education
meta_title: Research IP | Forms | Review
meta_description: Research IP: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Research Outcome Registration and Intellectual Property: Trace Exceptions and Review Results

## What this category's data looks like

The data for this category looks like this
Research achievement registration and intellectual property management involves three core types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms come from research groups or research management departments and are updated by batch or project milestone; fields include achievement name, completers, date, signature, and receipt. Patent disclosure documents are submitted by inventors and updated as the application progresses; fields include invention name, technical solution, inventor, application date, and seal. Software copyright materials are organized by developers and updated by version iteration; fields include software name, version number, development completion date, ownership, and seal. When these three types of materials enter the exception tracing and manual review scenario, the achievement registration form serves as the registration baseline, while patent disclosure documents and software copyright materials serve as cross-verification sources, used to discover inconsistencies in the same record regarding name, quantity, and date, as well as issues such as versions not being synchronized, missing signatures, or missing receipts.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, date, and signature receipt correspond to the patent disclosure document and software copyright materials | Check field names and required markers item by item; after submission, check whether subsequent nodes can obtain the corresponding field values |
| Patent disclosure document | Whether the invention name, application date, and inventor signature are consistent with the achievement registration form, and whether the version is synchronized | Check field names one by one in the node configuration, reference fields with `formInputResult`, and run a trial |
| Software copyright materials | Whether the software name, version number, development completion date, and seal are consistent with the registration form, and whether the receipts are complete | Use `userSelect` to select the material type and submit, then check the field values obtained by subsequent nodes |
| Form input node | Whether it can be submitted when required items are empty, whether the conversation stays in the interactive state, and whether the fields are passed to subsequent nodes | Fill it out once and submit, check the field values obtained by subsequent nodes, and inspect the required settings |

## Three common errors

- Symptom: The name, quantity, and date of the same achievement do not match between the registration form and the disclosure document. Cause: The two materials are entered separately, no cross-check is performed, and the field values are submitted independently.
- Symptom: The version of the software copyright materials is not synchronized, and the registration form still references the old version number. Cause: After the version update, the form was not resubmitted, and subsequent nodes obtained outdated field values.
- Symptom: The patent disclosure document lacks the inventor's signature or receipt, but the review conclusion is still submitted. Cause: The required markers do not cover the signature and receipt fields, so empty values can also be submitted.

## How to verify the setup

Acceptance for this feature: Fill out the form once and submit it, check whether the field values obtained by subsequent nodes are consistent with the filled-in content, and check whether the `formInputResult` and `selectResult` references take effect.

Business test: Create an exception record, see whether the source material can be traced, and confirm that the exception is supported by the original record and the reviewer's signature.

- Check field names and required markers one by one in the node configuration to ensure that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be obtained after submission.
