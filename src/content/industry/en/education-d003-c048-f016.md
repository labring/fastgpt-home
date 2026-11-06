---
title: Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c048-f016
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Forms | Intake
meta_description: Joint Education: review forms for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of the establishment and annual reports of Chinese-foreign cooperative education institutions; the materials include the establishment application, cooperation agreement, articles of association, and annual report receipt. The establishment application submits the education level, majors, enrollment scale, and signature page; the cooperation agreement states the names of both parties, capital contribution, term, and seals; the articles of association set out the governance structure, decision-making procedures, and amendment records; the annual report receipt reflects the submission time and acceptance number. The material sources are the filings by the reporting unit and the sealed documents of both parties; the update cadence changes with the application batches and annual submissions; the field characteristics are concentrated in four categories: names, quantities, dates, and signatures; the same record is often scattered across multiple materials; after entering the form input node, each takes on the role of field collection and does not take on material content recognition or authenticity judgment.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "acceptance records and items to be completed" are then handled by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state; after the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether the fields, dates, and signatures correspond to the cooperation agreement and articles of association, and whether the names, quantities, and dates are consistent | Check the field names one by one in the node configuration, confirm that the key material fields are marked as required, then reference the field in subsequent nodes and run a test |
| Cooperation agreement | Whether the names of both parties, capital contribution, term, and seals are complete, and whether the version is in sync with the articles of association | Check the required settings one by one, and after submission check whether subsequent nodes can retrieve the corresponding field values |
| Articles of association | Whether the governance structure, decision-making procedures, amendment records, and signature receipt are complete, and whether the dates match | Reference the field in subsequent nodes and run a test to confirm that the field value can be read |
| formInputResult and selectResult | Whether the required markers and selection items cover the key material fields, and whether the field values can be passed after submission | Check the field names and required settings of `formInputResult` and `selectResult` in the node configuration, and after a test run check the field values retrieved by subsequent nodes |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the establishment application and the cooperation agreement. Cause: The two materials are filed separately, without cross-checking and version synchronization.
- Symptom: After the articles of association are amended, the cooperation agreement is not synchronized, and the versions are inconsistent. Cause: The materials have different update cadences, and there is a lack of unified version marking and receipts.
- Symptom: Key materials lack signatures or receipts but still enter subsequent steps. Cause: The required items do not cover the signature and receipt fields, and after submission subsequent nodes cannot retrieve the values.

## How to verify the setup

Fill it out once and submit, check the field values retrieved by subsequent nodes, and confirm that the fields corresponding to `formInputResult` and `selectResult` can be referenced.

Business test: Submit a question that lacks key information and see whether it asks follow-up questions before answering.

- Check the field names and required settings one by one in the node configuration, and confirm that the key material fields are marked as required.
- Reference the corresponding fields in subsequent nodes and run a test to confirm that the field values can be read after submission.
