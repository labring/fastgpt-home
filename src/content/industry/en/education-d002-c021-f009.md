---
title: Tool Calls and Plugins for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c021-f009
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Tool Calls | Checks
meta_description: Graduation Eligibility: review tool calls for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on the scenario of student status changes and graduation eligibility review, consolidating three types of materials: leave-of-absence and return-to-school applications, major transfer applications, and graduation review checklists. Leave-of-absence and return-to-school applications usually include student name, student ID, change type, effective date, and approval signature; major transfer applications include original major, target major, application date, and departmental opinion; graduation review checklists include course name, credits, grade, review conclusion, and receipt. The material sources are academic affairs system exports, departmental submissions, and historical ledgers. The update cadence advances with semester batches, and field formats differ across departmental templates. When these three types of materials enter the tool call node, they respectively serve as the basis for status changes, proof of major change, and the graduation eligibility roster, for subsequent comparison of whether names, quantities, dates, and signatures are consistent.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "discrepancy list" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-school application | Check against the ledger whether student name, change type, effective date, and approval signature are consistent | Open the call record and check whether the name and date fields in the input parameters correspond to the ledger fields in the returned result |
| Major transfer application | Check whether the original major, target major, application date, and departmental opinion signature are complete | Run a test with a question missing the target major to see whether the node asks a follow-up first instead of directly fabricating a value |
| Graduation review checklist | Check whether course name, credits, grade, review conclusion, and receipt are consistent with the ledger | Check whether the tool description can be understood on its own, and open and verify the parameter description and required-or-not items one by one |
| Tool call node connection | The diamond interface is connected to the target tool, and the node status is readable | Check the diamond connection and node status on the canvas, and confirm that `toolChoice` and `functionCall` are traceable in the call record |

## Three common errors

- Symptom: the effective date for the same student does not match between the leave-of-absence and return-to-school application and the ledger. Cause: the two material versions were not synchronized, and the old application was not written back to the ledger.
- Symptom: course names in the graduation review checklist are inconsistent with the grade book. Cause: the name field entry standards differ, and fields were not checked one by one against the same object.
- Symptom: the major transfer application lacks a departmental signature or receipt. Cause: the approval process was not completed, and the material entered the comparison step early.

## How to verify the setup

Acceptance for this feature: run a test with a question missing a required parameter, check the input parameters and return in the call record, confirm whether it asks a follow-up or calls according to the description, and check whether `toolChoice` and `functionCall` appear in the record.

Business test: use a real record to find fields inconsistent with the ledger, record name, quantity, and date discrepancies, and submit them to the reviewer for confirmation and write-back.

- Open the tool node description field and check whether the description can be understood on its own in terms of purpose, when to use it, and returned result.
- Open the parameter configuration one by one, check the parameter description and required-or-not items, and run a test with a question missing that field to see whether it asks a follow-up first.
