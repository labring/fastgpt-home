---
title: Forms and User Interaction for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c014-f016
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Forms | Review
meta_description: Pastoral Education: review forms for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results

## What this category's data looks like

School moral education and homeroom teacher work involves three types of materials: themed class meeting plans, student comprehensive quality records, and home visit records, submitted by homeroom teachers and the moral education office on a weekly or semester basis, with fields including activity name, student name, date, quantity, signature or receipt. Themed class meeting plans are the starting point for anomaly clues, student comprehensive quality records are used to compare the same student's performance and dates across different materials, and home visit records provide parent signatures and receipts as review evidence. After the three types of materials enter the form input node, each assumes the roles of filling, comparison, and trace retention, and the anomaly list and review conclusions are handled accordingly by subsequent nodes or manually.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, outputting the field values filled in by the user (passed to subsequent nodes after submission). The anomaly list and review conclusions are completed by subsequent nodes or manually; the form does not automatically identify material content, nor does it judge the authenticity of materials. After triggering, the conversation enters the interaction state and records the workflow state. After the user fills in the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Name, date, signature are compared item by item with home visit records and comprehensive quality records; the name and date of the same activity in the two materials must be consistent | Check field names and required settings one by one, reference the `formInputResult` field in subsequent nodes and run a trial |
| Student comprehensive quality record | If the quantity and date of the same student in the two materials do not match, it is listed as an anomaly; missing signature or receipt must be marked | Check the required markers, and after submission confirm that subsequent nodes can obtain the `selectResult` output value |
| Home visit record | Whether the parent signature and receipt are complete; records whose versions are not synchronized must be marked with the source date | Check field names one by one in the node configuration, and after submission run a trial of subsequent node value retrieval |
| Anomaly list and review conclusion | Each anomaly must be supported by the original record, and can only be handed over to the responsible person for handling after the reviewer signs | Reference the `formInputResult` and `selectResult` fields, and check whether the source material can be traced after submission |

## Three common errors

- Phenomenon: The name and date of the same activity in the class meeting plan and the home visit record do not match. Cause: The two materials are filled in separately, without cross-checking.
- Phenomenon: The quantity in the comprehensive quality record is inconsistent with the quantity in the class meeting plan. Cause: The versions are not synchronized, and the old record has not been replaced.
- Phenomenon: The home visit record lacks a parent signature or receipt. Cause: The required marker does not cover the signature field, and submission is not blocked.

## How to verify the setup

Acceptance of this function: fill out the form once and submit it, and check whether the `formInputResult` and `selectResult` field values obtained by subsequent nodes are consistent with what was filled in.

Business test: create an anomaly record, see whether the source material can be traced, and confirm the reviewer's signature and the handling destination.

- Check field names and required markers one by one in the node configuration, and ensure that key material fields are marked as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a trial, confirming that the corresponding field values can be obtained after submission.
