---
title: Forms and User Interaction for Academic Journal Business Partnerships: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c070-f016
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Forms | Review
meta_description: Journal Partnerships: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Academic Journal Business Partnerships: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review in academic journal business cooperation management, involving three types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements typically include the partner name, cooperation period, revenue-sharing ratio, and signatures and seals of both parties, with updates mainly on an annual or project-cycle basis; advertising review forms record the advertiser, advertising content, review date, reviewer signature, and receipt; distribution cooperation materials register the distribution channel, distribution quantity, distribution date, and recipient signature or receipt. The three types of materials must corroborate each other in fields, dates, and signatures. When the materials enter the form input node, each plays a different role: the business cooperation agreement provides the cooperation entity and period baseline, the advertising review form provides the advertising content and review conclusion, and the distribution cooperation materials provide the distribution quantity and date evidence, jointly supporting the generation of the exception list and review conclusion.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Whether the fields, dates, and signatures are consistent with the advertising review form and distribution cooperation materials | Check the partner name, cooperation period, signatures, and seals, compare field names one by one in the form fields, and confirm the required markers |
| Advertising review form | Whether the advertiser, advertising content, review date, reviewer signature, and receipt are complete | Check the review date and signature, reference the `formInputResult` field in the form input node and run a trial, and confirm that subsequent nodes can retrieve the corresponding field values |
| Distribution cooperation materials | Whether the distribution channel, distribution quantity, distribution date, and recipient signature or receipt correspond to the business cooperation agreement | Check the quantity and date, select the material type through `userSelect` in the form input node, and check field passing after submission |
| Exception record | Whether the exception is supported by original records and whether the reviewer has signed | Create an exception record, trace it back to the source materials, check the name, quantity, date, and signature, and confirm the review conclusion |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the business cooperation agreement and the distribution cooperation materials. Cause: The two materials are entered separately, without field-level comparison and version synchronization.
- Phenomenon: The advertising review form lacks the reviewer signature or receipt, and the distribution cooperation materials lack the recipient signature. Cause: Key material fields are not marked as required, and empty values are not intercepted on submission.
- Phenomenon: After submission, subsequent nodes cannot retrieve field values, or the conversation stays in the interaction state. Cause: Field names are not checked one by one, required items can be submitted even when empty, and field passing has not been trial-run.

## How to verify the setup

Acceptance of this feature: Fill out the form once and submit it, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` field values are passed correctly, and that submission is not possible when required items are empty.

Business test: Create an exception record, see whether it can be traced back to the source materials, and check the name, quantity, date, and signature of the business cooperation agreement, advertising review form, and distribution cooperation materials.

- In the node configuration, check the form field names one by one against the material fields to confirm a one-to-one correspondence, and confirm that key material fields have been marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that after submission the subsequent nodes can retrieve the corresponding field values.
