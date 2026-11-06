---
title: Tool Calls and Plugins for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c043-f009
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Tool Calls | Checks
meta_description: Training Admissions: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy localization in enrollment consultation conversion at training institutions, involving three types of materials: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures come from the marketing department and are updated by semester, with fields including course name, number of class hours, start date, and signature field; consultation records come from consultants and are entered daily, with fields including student name, intended course, consultation date, and receipt status; trial class schedules come from academic affairs and are adjusted weekly, with fields including trial class time, instructor, and sign-in signature. When these materials enter the tool calling and plugin feature, enrollment brochures serve as the baseline reference, consultation records serve as the objects to be verified, and trial class schedules serve as the cross-verification source. The tool calling node decides whether to initiate a verification call based on the tool introduction, parameter introduction, and whether parameters are required, and returns the inputs and returns in the call record for subsequent AI nodes or manual verification to generate a discrepancy list. In terms of update cadence, brochures are by semester, consultation records are by day, and trial class schedules are by week; during verification, attention must be paid to version synchronization and the completeness of signatures and receipts.

## Configuration and implementation checks

This step is executed by the tool calling node in the workflow (the model decides whether to call, and the node executes), outputting the tool call result (the inputs and returns in the call record). The "discrepancy list" is then completed by subsequent AI nodes or manual verification. The model judges whether to call the tool this time based on the tool introduction, parameter introduction, and whether parameters are required; when there are no required parameters, the model may fabricate parameter values on its own, and when there are required parameters but no suitable values in the context, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Check the course name, number of class hours, start date, and signature field, and compare item by item with consultation records and trial class schedules | Open the tool node introduction field and confirm the description can independently explain the purpose; check the parameter introduction and whether required; verify the diamond connector and node status on the canvas, and confirm that `toolChoice` and `functionCall` are reflected in the call record |
| Consultation record | Check the student name, intended course, consultation date, and receipt status, and compare item by item with enrollment brochures and trial class schedules | Run a test with a question missing a required field to see whether it asks a follow-up first; check whether values that do not exist in the materials appear in the returned result; check whether results are mixed up after multiple tools are chained |
| Trial class schedule | Check the trial class time, instructor, and sign-in signature item by item against enrollment brochures and consultation records | Open each parameter configuration one by one and check the introduction and whether required; confirm that required parameters correspond to business material fields; check in the call record whether the inputs and returns are consistent |
| Tool calling node connector | Confirm that the diamond interface is connected to the target tool and the node status is normal | Verify the diamond connector and node status on the canvas; check whether the three items of tool introduction, parameter introduction, and whether required are complete |

## Three common errors

- Phenomenon: The same student name is written differently in consultation records and trial class schedules. Cause: The two materials are entered by different personnel, and name unification has not been done.
- Phenomenon: The number of courses does not match between enrollment brochures and consultation records. Cause: Brochures are updated by semester, consultation records are entered daily, and versions are not synchronized.
- Phenomenon: Trial class schedules lack sign-in signatures or receipts. Cause: Academic affairs did not enter them in time, and the signature step was omitted during material circulation.

## How to verify the setup

Acceptance of this feature: run a test with a question missing a required parameter, check the inputs and returns in the call record, and confirm whether it asks a follow-up or calls according to the introduction; at the same time, check whether `toolChoice` and `functionCall` are reflected in the call record.

Business test: use a real record to find fields inconsistent with the ledger, and compare the names, quantities, dates, and signatures in enrollment brochures, consultation records, and trial class schedules.

- Open the tool node introduction field, check whether the description can be understood when taken out on its own, and check the parameter introduction and whether required.
- Run a test with a question missing a required field, observe whether the model asks a follow-up first rather than directly fabricating parameter values; verify the diamond connector and node status on the canvas.
