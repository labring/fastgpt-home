---
title: Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c031-f016
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Forms | Review
meta_description: Apprenticeships: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Modern Apprenticeships and Employer-Sponsored Classes: Trace Exceptions and Review Results

## What this category's data looks like

This page focuses on exception tracing and manual review in modern apprenticeship and order class management, involving three types of materials: school-enterprise cooperation agreements, order class training plans, and master-apprentice mentoring records. School-enterprise cooperation agreements are signed jointly by the school and the enterprise, and include the cooperation period, positions, headcount, and signatures/seals; order class training plans are prepared by the teaching department, and include courses, class hours, rotation arrangements, and approval signatures; master-apprentice mentoring records are filled in weekly or monthly by the mentoring master, and include apprentice names, positions, mentoring content, attendance, and signatures from both parties. When these three types of materials enter the form input node, each plays its own role in field comparison and source tracing: the agreement provides the cooperation framework and headcount baseline, the plan provides the training milestones and date baseline, and the mentoring records provide process execution and signature evidence. In terms of update cadence, agreements are updated by academic year or cooperation period, plans change with teaching schedule adjustments, and mentoring records are continuously generated weekly or monthly. Field characteristics include names, quantities, dates, version numbers, signatures, and receipts, which are key to checking consistency during exception tracing.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, and outputs the field values filled in by the user (passed to subsequent nodes after submission). The "exception list and review conclusion" is completed by subsequent nodes or manually afterward. After the form input node is triggered, the conversation enters an interactive state and records the workflow state. After the user completes the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Check whether the cooperation period, position names, order class headcount, and signatures/seals in the agreement are consistent with the order class training plan | In the node configuration, check the field names one by one, confirm that the agreement fields correspond one-to-one with the form fields, and check the required markers |
| Order class training plan | Check whether the course names, class hour quantities, rotation dates, and approval signatures in the plan correspond to the master-apprentice mentoring records | Reference this field in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved by subsequent nodes after submission |
| Master-apprentice mentoring record | Check whether the apprentice names, positions, mentoring dates, attendance quantities, and signatures from both parties in the mentoring records match the agreement and plan | In the node configuration, check the required settings, confirm that key material fields are marked as required, and check field passing after submission |
| Exception list and review conclusion | Check whether the exception entries are supported by original records, whether the reviewer's signature is complete, and whether the version number is synchronized with the current materials | Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that exception records can be traced back to the source materials |

## Three common errors

- Phenomenon: The same apprentice name is written differently in the agreement and the mentoring records, and the quantities and dates do not match. Cause: The two materials are maintained separately, no field-level comparison is done, and the values retrieved by subsequent nodes after submission cannot be matched.
- Phenomenon: The order class training plan has been updated, but the master-apprentice mentoring records still use the old version, and the dates and positions are inconsistent. Cause: The version is not synchronized, the form does not mark the version number, and during review it is impossible to determine which material should prevail.
- Phenomenon: Exception records lack the reviewer's signature or receipt, yet still enter the handling stage after submission. Cause: Required items do not cover signature fields, and submission is still possible when required items are empty, resulting in review conclusions lacking evidence.

## How to verify the setup

Feature acceptance: Fill out and submit once, check the field values retrieved by subsequent nodes, confirm that the `formInputResult` and `selectResult` field values are passed correctly, that submission is not possible when required items are empty, and that the conversation does not remain in the interactive state.

Business test: Create an exception record and see whether it can be traced back to the source materials, and check whether the exception entries are supported by original records and whether the reviewer's signature is complete.

- In the node configuration, check the field names one by one, confirm that they correspond one-to-one with the fields of the school-enterprise cooperation agreement, order class training plan, and master-apprentice mentoring records, and check the required markers.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial to confirm that the corresponding field values can be retrieved by subsequent nodes after submission, and that the exception list and review conclusion can be handed to the responsible person for handling.
